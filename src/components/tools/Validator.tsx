import { useState, useEffect } from 'react';
import { validateCPF } from '@/utils/cpf';
import { validateCNPJ } from '@/utils/cnpj';
import { CheckCircle2, XCircle } from 'lucide-react';
import { trackToolUsage } from '@/utils/tracking';

const Validator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ isValid: boolean; type: string } | null>(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!input.trim()) {
        setResult(null);
        return;
      }

      const cleaned = input.replace(/\D/g, '');
      
      if (cleaned.length === 11) {
        const isValid = validateCPF(input);
        setResult({ isValid, type: 'CPF' });
        if (isValid) trackToolUsage('cpf_cnpj_validator');
      } else if (cleaned.length === 14) {
        const isValid = validateCNPJ(input);
        setResult({ isValid, type: 'CNPJ' });
        if (isValid) trackToolUsage('cpf_cnpj_validator');
      } else {
        setResult({ isValid: false, type: 'Formato inválido' });
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [input]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Validador de CPF/CNPJ</h1>
        <p className="text-muted-foreground">
          Valide CPFs e CNPJs em tempo real. Aceita com ou sem formatação.
        </p>
      </div>

      <div className="tool-card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Digite ou cole o CPF/CNPJ
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: 123.456.789-09 ou 12.345.678/0001-90"
            className="tool-textarea"
            rows={3}
          />
        </div>

        {result && (
          <div className={`p-4 rounded-lg border-2 ${
            result.isValid 
              ? 'bg-secondary/10 border-secondary' 
              : 'bg-destructive/10 border-destructive'
          }`}>
            <div className="flex items-center gap-3">
              {result.isValid ? (
                <CheckCircle2 className="h-8 w-8 text-secondary flex-shrink-0" />
              ) : (
                <XCircle className="h-8 w-8 text-destructive flex-shrink-0" />
              )}
              <div>
                <p className="font-semibold text-lg">
                  {result.isValid ? '✅ Válido' : '❌ Inválido'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {result.type}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Validator;
