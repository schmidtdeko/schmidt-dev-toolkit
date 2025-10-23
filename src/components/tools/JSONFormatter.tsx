import { useState } from 'react';
import { CopyButton } from '@/components/CopyButton';
import { toast } from 'sonner';
import { trackToolUsage } from '@/utils/tracking';

const JSONFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
      trackToolUsage('json_formatter');
      toast.success('JSON formatado com sucesso!');
    } catch (e) {
      setError((e as Error).message);
      toast.error('JSON inválido');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
      toast.success('JSON minificado com sucesso!');
    } catch (e) {
      setError((e as Error).message);
      toast.error('JSON inválido');
    }
  };

  const handleValidate = () => {
    try {
      JSON.parse(input);
      setError('');
      toast.success('✅ JSON válido!');
    } catch (e) {
      setError((e as Error).message);
      toast.error('❌ JSON inválido');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Formatador de JSON</h1>
        <p className="text-muted-foreground">
          Formate, minifique ou valide JSON com syntax highlighting.
        </p>
      </div>

      <div className="tool-card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            JSON de entrada
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"nome": "João", "idade": 30}'
            className="tool-textarea"
            rows={8}
          />
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
            <p className="text-sm text-destructive font-mono">{error}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button onClick={handleFormat} className="tool-button">
            Formatar
          </button>
          <button onClick={handleMinify} className="tool-button-secondary">
            Minificar
          </button>
          <button onClick={handleValidate} className="tool-button-outline">
            Validar
          </button>
        </div>

        {output && (
          <>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">
                Resultado
              </label>
              <CopyButton text={output} />
            </div>
            <textarea
              readOnly
              value={output}
              className="tool-textarea"
              rows={12}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default JSONFormatter;
