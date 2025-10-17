import { useState } from 'react';
import { CopyButton } from '@/components/CopyButton';
import { Copy } from 'lucide-react';
import { copyToClipboard } from '@/utils/clipboard';
import { toast } from 'sonner';
import { trackToolUsage } from '@/utils/tracking';

interface PasswordOptions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

const generatePassword = (length: number, options: PasswordOptions): string => {
  let chars = '';
  if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (options.numbers) chars += '0123456789';
  if (options.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (!chars) return '';

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

const getPasswordStrength = (password: string): { label: string; color: string } => {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: 'Fraca', color: 'text-destructive' };
  if (score <= 4) return { label: 'Média', color: 'text-warning' };
  return { label: 'Forte', color: 'text-secondary' };
};

export const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [quantity, setQuantity] = useState(5);
  const [options, setOptions] = useState<PasswordOptions>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [passwords, setPasswords] = useState<string[]>([]);

  const handleGenerate = () => {
    const generated = Array.from({ length: quantity }, () => 
      generatePassword(length, options)
    );
    setPasswords(generated);
    trackToolUsage('password_generator');
  };

  const handleCopyIndividual = async (password: string) => {
    const success = await copyToClipboard(password);
    if (success) {
      toast.success('Senha copiada!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gerador de Senhas Fortes</h1>
        <p className="text-muted-foreground">
          Gere senhas seguras com indicador de força e múltiplas opções de caracteres.
        </p>
      </div>

      <div className="tool-card space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">
              Tamanho da senha: {length}
            </label>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>8</span>
            <span>64</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.uppercase}
              onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
              className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
            />
            <span className="text-sm">Letras maiúsculas (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.lowercase}
              onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
              className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
            />
            <span className="text-sm">Letras minúsculas (a-z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
              className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
            />
            <span className="text-sm">Números (0-9)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
              className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
            />
            <span className="text-sm">Símbolos (!@#$%^&*)</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Quantidade (1-50)
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={quantity}
            onChange={(e) => setQuantity(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
            className="tool-input"
          />
        </div>

        <button onClick={handleGenerate} className="tool-button w-full">
          Gerar
        </button>

        {passwords.length > 0 && (
          <>
            <div className="flex justify-end">
              <CopyButton text={passwords.join('\n')} />
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {passwords.map((password, index) => {
                const strength = getPasswordStrength(password);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-md gap-3"
                  >
                    <code className="font-mono text-sm flex-1 break-all">{password}</code>
                    <span className={`text-xs font-semibold ${strength.color} whitespace-nowrap`}>
                      {strength.label}
                    </span>
                    <button
                      onClick={() => handleCopyIndividual(password)}
                      className="p-2 hover:bg-background rounded-md transition-colors"
                      title="Copiar"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
