import { useState } from 'react';
import { CopyButton } from '@/components/CopyButton';
import { toast } from 'sonner';
import pako from 'pako';
import { Download, Sparkles } from 'lucide-react';
import { trackToolUsage } from '@/utils/tracking';

type FormatType = 'text' | 'base64' | 'xml' | 'gzip';

interface ConversionInfo {
  inputSize: number;
  outputSize: number;
  reduction?: number;
}

export const UniversalConverter = () => {
  const [inputFormat, setInputFormat] = useState<FormatType>('text');
  const [outputFormat, setOutputFormat] = useState<FormatType>('base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [conversionInfo, setConversionInfo] = useState<ConversionInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getFileSize = (text: string): string => {
    const bytes = new Blob([text]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const detectFormat = (): FormatType => {
    if (!input.trim()) return 'text';

    if (input.trim().startsWith('<') || input.trim().startsWith('<?xml')) {
      return 'xml';
    }

    const base64Regex = /^[A-Za-z0-9+/=]+$/;
    if (base64Regex.test(input.trim())) {
      try {
        const decoded = atob(input.trim());
        const uint8Array = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) {
          uint8Array[i] = decoded.charCodeAt(i);
        }
        
        try {
          pako.ungzip(uint8Array);
          return 'gzip';
        } catch {
          return 'base64';
        }
      } catch {
        return 'text';
      }
    }

    return 'text';
  };

  const handleAutoDetect = () => {
    const detected = detectFormat();
    setInputFormat(detected);
    
    const formatNames: Record<FormatType, string> = {
      text: 'Texto Puro',
      base64: 'Base64',
      xml: 'XML',
      gzip: 'GZIP (Base64)'
    };
    
    toast.success(`Formato detectado: ${formatNames[detected]}`);
  };

  const validateXML = (xmlString: string): boolean => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlString, 'text/xml');
      const parserError = doc.querySelector('parsererror');
      return !parserError;
    } catch {
      return false;
    }
  };

  const formatXML = (xmlString: string): string => {
    const PADDING = '  ';
    const reg = /(>)(<)(\/*)/g;
    let formatted = xmlString.replace(reg, '$1\n$2$3');
    let pad = 0;

    return formatted.split('\n').map((line) => {
      let indent = 0;
      if (line.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (line.match(/^<\/\w/) && pad > 0) {
        pad -= 1;
      } else if (line.match(/^<\w[^>]*[^/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      const padding = PADDING.repeat(pad);
      pad += indent;

      return padding + line;
    }).join('\n');
  };

  const textToBase64 = (text: string): string => {
    return btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  };

  const base64ToText = (base64: string): string => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return decodeURIComponent(
      Array.from(bytes)
        .map(byte => '%' + ('00' + byte.toString(16)).slice(-2))
        .join('')
    );
  };

  const textToGzip = (text: string): string => {
    const compressed = pako.gzip(text);
    let binary = '';
    for (let i = 0; i < compressed.length; i++) {
      binary += String.fromCharCode(compressed[i]);
    }
    return btoa(binary);
  };

  const gzipToText = (base64: string): string => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decompressed = pako.ungzip(bytes);
    return new TextDecoder().decode(decompressed);
  };

  const handleConvert = () => {
    if (!input.trim()) {
      toast.error('Por favor, insira algum conteúdo');
      return;
    }

    setIsProcessing(true);
    setError('');
    setOutput('');
    setConversionInfo(null);

    setTimeout(() => {
      try {
        let result = '';
        const inputBytes = new Blob([input]).size;

        if (inputFormat === 'text' && outputFormat === 'base64') {
          result = textToBase64(input);
        } else if (inputFormat === 'base64' && outputFormat === 'text') {
          try {
            result = base64ToText(input);
          } catch {
            throw new Error('Base64 malformado. Verifique se copiou corretamente.');
          }
        } else if (inputFormat === 'xml' && outputFormat === 'base64') {
          if (!validateXML(input)) {
            throw new Error('XML malformado. Verifique tags de abertura e fechamento.');
          }
          result = textToBase64(input);
        } else if (inputFormat === 'base64' && outputFormat === 'xml') {
          try {
            result = base64ToText(input);
            if (!validateXML(result)) {
              toast('⚠️ O conteúdo decodificado não parece ser um XML válido', { duration: 4000 });
            } else {
              result = formatXML(result);
            }
          } catch {
            throw new Error('Base64 malformado. Verifique se copiou corretamente.');
          }
        } else if (inputFormat === 'text' && outputFormat === 'gzip') {
          result = textToGzip(input);
        } else if (inputFormat === 'gzip' && outputFormat === 'text') {
          try {
            result = gzipToText(input);
          } catch {
            throw new Error('Erro ao descomprimir. Arquivo pode estar corrompido.');
          }
        } else if (inputFormat === 'xml' && outputFormat === 'gzip') {
          if (!validateXML(input)) {
            throw new Error('XML malformado. Verifique tags de abertura e fechamento.');
          }
          result = textToGzip(input);
        } else if (inputFormat === 'gzip' && outputFormat === 'xml') {
          try {
            result = gzipToText(input);
            if (!validateXML(result)) {
              throw new Error('O conteúdo descomprimido não é um XML válido.');
            }
            result = formatXML(result);
          } catch (e) {
            if ((e as Error).message.includes('XML')) {
              throw e;
            }
            throw new Error('Erro ao descomprimir. Arquivo pode estar corrompido.');
          }
        } else if (inputFormat === outputFormat) {
          if (inputFormat === 'xml' && validateXML(input)) {
            result = formatXML(input);
          } else {
            result = input;
          }
        } else {
          throw new Error('Conversão não suportada diretamente. Tente converter em etapas.');
        }

        setOutput(result);
        trackToolUsage('universal_converter');
        const outputBytes = new Blob([result]).size;
        
        const info: ConversionInfo = {
          inputSize: inputBytes,
          outputSize: outputBytes
        };

        if (outputFormat === 'gzip' && outputBytes < inputBytes) {
          info.reduction = ((1 - outputBytes / inputBytes) * 100);
        } else if (outputFormat === 'gzip' && outputBytes >= inputBytes) {
          toast('ℹ️ O arquivo comprimido ficou maior devido ao overhead do GZIP para textos pequenos', { duration: 5000 });
        }

        setConversionInfo(info);
        toast.success('Conversão realizada com sucesso!', { duration: 3000 });
      } catch (e) {
        const errorMsg = (e as Error).message || 'Erro ao processar. Verifique o formato de entrada.';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setIsProcessing(false);
      }
    }, 100);
  };

  const handleDownload = () => {
    if (!output) return;

    const extensions: Record<FormatType, string> = {
      text: '.txt',
      base64: '.base64.txt',
      xml: '.xml',
      gzip: '.gz.base64.txt'
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `converter-output-${timestamp}${extensions[outputFormat]}`;

    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Download iniciado!');
  };

  const characterCount = input.length;
  const fileSizeWarning = new Blob([input]).size > 10 * 1024 * 1024;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Conversor Universal</h1>
        <p className="text-muted-foreground">
          Converta entre Base64, XML, GZIP e Texto Puro com detecção automática de formato.
        </p>
      </div>

      <div className="tool-card space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium mb-2">
                Formato de Entrada
              </label>
              <select
                value={inputFormat}
                onChange={(e) => setInputFormat(e.target.value as FormatType)}
                className="tool-input"
              >
                <option value="text">Texto Puro</option>
                <option value="base64">Base64</option>
                <option value="xml">XML</option>
                <option value="gzip">GZIP (Base64)</option>
              </select>
            </div>
            <button
              onClick={handleAutoDetect}
              className="tool-button-outline flex items-center gap-2 whitespace-nowrap"
              disabled={!input.trim()}
            >
              <Sparkles className="h-4 w-4" />
              Detectar Automaticamente
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Cole seu conteúdo aqui...
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cole seu conteúdo aqui..."
              className="tool-textarea"
              style={{ height: '250px' }}
            />
            <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
              <span>{characterCount.toLocaleString()} caracteres</span>
              {fileSizeWarning && (
                <span className="text-warning">⚠️ Arquivo grande - processamento pode ser lento</span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Formato de Saída
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as FormatType)}
              className="tool-input"
            >
              <option value="text">Texto Puro</option>
              <option value="base64">Base64</option>
              <option value="xml">XML</option>
              <option value="gzip">GZIP (Base64)</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleConvert}
              disabled={!input.trim() || isProcessing}
              className="tool-button px-8 py-3 text-lg"
            >
              {isProcessing ? 'Convertendo...' : 'Converter'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {output && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">
                Resultado
              </label>
              <div className="flex gap-2">
                <CopyButton text={output} />
                <button
                  onClick={handleDownload}
                  className="tool-button-outline flex items-center gap-2 px-3 py-1.5"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Resultado aparecerá aqui..."
              className="tool-textarea"
              style={{ height: '250px' }}
            />

            {conversionInfo && (
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Tamanho entrada:</span>
                    <p className="font-semibold">{getFileSize(input)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tamanho saída:</span>
                    <p className="font-semibold">{getFileSize(output)}</p>
                  </div>
                  {conversionInfo.reduction !== undefined && (
                    <div>
                      <span className="text-muted-foreground">Redução:</span>
                      <p className="font-semibold text-success">
                        {conversionInfo.reduction.toFixed(1)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
