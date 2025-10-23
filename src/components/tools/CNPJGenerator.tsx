import { useState } from 'react';
import { generateCNPJ } from '@/utils/cnpj';
import { CopyButton } from '@/components/CopyButton';
import { trackToolUsage } from '@/utils/tracking';

const CNPJGenerator = () => {
  const [quantity, setQuantity] = useState(1);
  const [formatted, setFormatted] = useState(true);
  const [results, setResults] = useState<string[]>([]);

  const handleGenerate = () => {
    const cnpjs = Array.from({ length: quantity }, () => generateCNPJ(formatted));
    setResults(cnpjs);
    trackToolUsage('cnpj_generator');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gerador de CNPJ</h1>
        <p className="text-muted-foreground">
          Gere CNPJs válidos para testes. Todos os CNPJs gerados passam na validação do dígito verificador.
        </p>
      </div>

      <div className="tool-card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Quantidade (1-1000)
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={quantity}
            onChange={(e) => setQuantity(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
            className="tool-input"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="formatted"
            checked={formatted}
            onChange={(e) => setFormatted(e.target.checked)}
            className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
          />
          <label htmlFor="formatted" className="text-sm font-medium cursor-pointer">
            Com formatação (##.###.###/####-##)
          </label>
        </div>

        <button onClick={handleGenerate} className="tool-button w-full">
          Gerar
        </button>

        {results.length > 0 && (
          <>
            <div className="flex justify-end">
              <CopyButton text={results.join('\n')} />
            </div>
            <textarea
              readOnly
              value={results.join('\n')}
              className="tool-textarea"
              rows={10}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CNPJGenerator;
