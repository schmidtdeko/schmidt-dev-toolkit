import { useState } from 'react';
import { CopyButton } from '@/components/CopyButton';
import { toast } from 'sonner';
import { trackToolUsage } from '@/utils/tracking';

export const XMLFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatXML = (xml: string): string => {
    const PADDING = '  ';
    const reg = /(>)(<)(\/*)/g;
    let formatted = '';
    let pad = 0;

    xml = xml.replace(reg, '$1\n$2$3');
    
    xml.split('\n').forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/) && pad > 0) {
        pad -= 1;
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      formatted += PADDING.repeat(pad) + node + '\n';
      pad += indent;
    });

    return formatted.trim();
  };

  const minifyXML = (xml: string): string => {
    return xml
      .replace(/>\s+</g, '><')
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const validateXML = (xml: string): { valid: boolean; error?: string } => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');
      
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        const errorText = parseError.textContent || 'Erro desconhecido';
        const lineMatch = errorText.match(/line (\d+)/);
        const line = lineMatch ? lineMatch[1] : 'desconhecida';
        return { 
          valid: false, 
          error: `Erro na linha ${line}: ${errorText}` 
        };
      }

      // Check for basic XML structure
      if (!xml.trim().startsWith('<')) {
        return { valid: false, error: 'XML deve começar com uma tag' };
      }

      return { valid: true };
    } catch (e) {
      return { 
        valid: false, 
        error: (e as Error).message 
      };
    }
  };

  const handleFormat = () => {
    if (!input.trim()) {
      toast.error('Digite um XML para formatar');
      return;
    }

    const validation = validateXML(input);
    if (!validation.valid) {
      setError(validation.error || 'XML inválido');
      toast.error('❌ XML inválido');
      return;
    }

    try {
      const formatted = formatXML(input);
      setOutput(formatted);
      setError('');
      trackToolUsage('xml_formatter');
      toast.success('XML formatado com sucesso!');
    } catch (e) {
      setError((e as Error).message);
      toast.error('Erro ao formatar XML');
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      toast.error('Digite um XML para minificar');
      return;
    }

    const validation = validateXML(input);
    if (!validation.valid) {
      setError(validation.error || 'XML inválido');
      toast.error('❌ XML inválido');
      return;
    }

    try {
      const minified = minifyXML(input);
      setOutput(minified);
      setError('');
      toast.success('XML minificado com sucesso!');
    } catch (e) {
      setError((e as Error).message);
      toast.error('Erro ao minificar XML');
    }
  };

  const handleValidate = () => {
    if (!input.trim()) {
      toast.error('Digite um XML para validar');
      return;
    }

    const validation = validateXML(input);
    if (validation.valid) {
      setError('');
      toast.success('✅ XML válido!');
    } else {
      setError(validation.error || 'XML inválido');
      toast.error('❌ XML inválido');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Formatador de XML</h1>
        <p className="text-muted-foreground">
          Formate, minifique ou valide XML facilmente.
        </p>
      </div>

      <div className="tool-card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            XML de entrada
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='<root><item id="1"><name>Test</name></item></root>'
            className="tool-textarea"
            rows={8}
            style={{ minHeight: '300px' }}
          />
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
            <p className="text-sm text-destructive font-mono">{error}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleFormat} 
            className="tool-button"
            disabled={!input.trim()}
          >
            Formatar
          </button>
          <button 
            onClick={handleMinify} 
            className="tool-button-secondary"
            disabled={!input.trim()}
          >
            Minificar
          </button>
          <button 
            onClick={handleValidate} 
            className="tool-button-outline"
            disabled={!input.trim()}
          >
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
              style={{ minHeight: '300px' }}
            />
          </>
        )}
      </div>
    </div>
  );
};
