import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/utils/clipboard';
import { toast } from 'sonner';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export const CopyButton = ({ text, className = '' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      toast.success('Copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Erro ao copiar');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`tool-button-outline inline-flex items-center gap-2 ${className}`}
      disabled={!text}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copiar
        </>
      )}
    </button>
  );
};
