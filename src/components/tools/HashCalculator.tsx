import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { CopyButton } from '@/components/CopyButton';
import { trackToolUsage } from '@/utils/tracking';

type HashAlgorithm = 'MD5' | 'SHA1' | 'SHA256' | 'SHA512';

export const HashCalculator = () => {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA256');
  const [hash, setHash] = useState('');

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!input) {
        setHash('');
        return;
      }

      let result = '';
      switch (algorithm) {
        case 'MD5':
          result = CryptoJS.MD5(input).toString();
          break;
        case 'SHA1':
          result = CryptoJS.SHA1(input).toString();
          break;
        case 'SHA256':
          result = CryptoJS.SHA256(input).toString();
          break;
        case 'SHA512':
          result = CryptoJS.SHA512(input).toString();
          break;
      }
      setHash(result);
      if (result) trackToolUsage('hash_calculator');
    }, 300);

    return () => clearTimeout(debounce);
  }, [input, algorithm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Calculadora de Hash</h1>
        <p className="text-muted-foreground">
          Calcule hashes MD5, SHA-1, SHA-256 e SHA-512 em tempo real.
        </p>
      </div>

      <div className="tool-card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Texto de entrada
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite o texto para calcular o hash..."
            className="tool-textarea"
            rows={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Algoritmo
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(['MD5', 'SHA1', 'SHA256', 'SHA512'] as HashAlgorithm[]).map((algo) => (
              <label key={algo} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="algorithm"
                  value={algo}
                  checked={algorithm === algo}
                  onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
                  className="w-4 h-4 text-primary focus:ring-2 focus:ring-ring"
                />
                <span className="text-sm">{algo}</span>
              </label>
            ))}
          </div>
        </div>

        {hash && (
          <>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">
                Hash gerado
              </label>
              <CopyButton text={hash} />
            </div>
            <div className="p-4 bg-muted rounded-md">
              <code className="font-mono text-sm break-all">{hash}</code>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
