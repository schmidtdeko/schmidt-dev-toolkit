import { useState } from 'react';
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
import { CopyButton } from '@/components/CopyButton';

type UUIDVersion = 'v4' | 'v1';

const UUIDGenerator = () => {
  const [version, setVersion] = useState<UUIDVersion>('v4');
  const [quantity, setQuantity] = useState(10);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = () => {
    const generated = Array.from({ length: quantity }, () => 
      version === 'v4' ? uuidv4() : uuidv1()
    );
    setUuids(generated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gerador de UUID/GUID</h1>
        <p className="text-muted-foreground">
          Gere UUIDs versão 4 (aleatório) ou versão 1 (baseado em timestamp).
        </p>
      </div>

      <div className="tool-card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-3">
            Versão UUID
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="version"
                value="v4"
                checked={version === 'v4'}
                onChange={(e) => setVersion(e.target.value as UUIDVersion)}
                className="w-4 h-4 text-primary focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm">UUID v4 (aleatório)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="version"
                value="v1"
                checked={version === 'v1'}
                onChange={(e) => setVersion(e.target.value as UUIDVersion)}
                className="w-4 h-4 text-primary focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm">UUID v1 (timestamp)</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Quantidade (1-100)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="tool-input"
          />
        </div>

        <button onClick={handleGenerate} className="tool-button w-full">
          Gerar
        </button>

        {uuids.length > 0 && (
          <>
            <div className="flex justify-end">
              <CopyButton text={uuids.join('\n')} />
            </div>
            <textarea
              readOnly
              value={uuids.join('\n')}
              className="tool-textarea"
              rows={12}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UUIDGenerator;
