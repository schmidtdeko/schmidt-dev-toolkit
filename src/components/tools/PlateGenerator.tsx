import { useState } from 'react';
import { CopyButton } from '@/components/CopyButton';

type PlateFormat = 'old' | 'mercosul';

const generatePlate = (format: PlateFormat): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getRandomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const getRandomNumber = () => Math.floor(Math.random() * 10);

  if (format === 'old') {
    // ABC-1234
    return `${getRandomLetter()}${getRandomLetter()}${getRandomLetter()}-${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}${getRandomNumber()}`;
  } else {
    // ABC1D23
    return `${getRandomLetter()}${getRandomLetter()}${getRandomLetter()}${getRandomNumber()}${getRandomLetter()}${getRandomNumber()}${getRandomNumber()}`;
  }
};

const PlateGenerator = () => {
  const [format, setFormat] = useState<PlateFormat>('mercosul');
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);

  const handleGenerate = () => {
    const plates = Array.from({ length: quantity }, () => generatePlate(format));
    setResults(plates);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Gerador de Placas de Veículo</h1>
        <p className="text-muted-foreground">
          Gere placas de veículos no padrão antigo ou Mercosul.
        </p>
      </div>

      <div className="tool-card space-y-4">
        <div>
          <label className="block text-sm font-medium mb-3">
            Formato da Placa
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                value="old"
                checked={format === 'old'}
                onChange={(e) => setFormat(e.target.value as PlateFormat)}
                className="w-4 h-4 text-primary focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm">Padrão Antigo (ABC-1234)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                value="mercosul"
                checked={format === 'mercosul'}
                onChange={(e) => setFormat(e.target.value as PlateFormat)}
                className="w-4 h-4 text-primary focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm">Mercosul (ABC1D23)</span>
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

        {results.length > 0 && (
          <>
            <div className="flex justify-end">
              <CopyButton text={results.join('\n')} />
            </div>
            <div className="max-h-96 overflow-y-auto border border-border rounded-md p-4">
              <ul className="space-y-2">
                {results.map((plate, index) => (
                  <li key={index} className="font-mono text-lg">
                    {plate}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlateGenerator;
