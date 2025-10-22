import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const PercentageCalculator = () => {
  // Card 1: Quanto é X% de Y?
  const [percent1, setPercent1] = useState('');
  const [value1, setValue1] = useState('');

  // Card 2: X é quantos % de Y?
  const [part, setPart] = useState('');
  const [total, setTotal] = useState('');

  // Card 3: Acréscimo/Desconto
  const [baseValue, setBaseValue] = useState('');
  const [percentChange, setPercentChange] = useState('');
  const [changeType, setChangeType] = useState<'increase' | 'decrease'>('decrease');

  // Card 4: Variação Percentual
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');

  const parseNumber = (value: string): number => {
    if (!value) return 0;
    return parseFloat(value.replace(',', '.'));
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + '%';
  };

  // Card 1 calculation
  const result1 = parseNumber(percent1) * parseNumber(value1) / 100;

  // Card 2 calculation
  const result2 = total !== '' && parseNumber(total) !== 0
    ? (parseNumber(part) / parseNumber(total)) * 100
    : 0;

  // Card 3 calculation
  const difference3 = parseNumber(baseValue) * parseNumber(percentChange) / 100;
  const finalValue3 = changeType === 'increase'
    ? parseNumber(baseValue) + difference3
    : parseNumber(baseValue) - difference3;

  // Card 4 calculation
  const difference4 = parseNumber(finalValue) - parseNumber(initialValue);
  const variation4 = initialValue !== '' && parseNumber(initialValue) !== 0
    ? (difference4 / parseNumber(initialValue)) * 100
    : 0;
  const isIncrease = variation4 >= 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Calculadora de Percentual</h1>
        <p className="text-muted-foreground">
          Calcule percentuais, acréscimos, descontos e variações.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Quanto é X% de Y? */}
        <div className="tool-card space-y-4">
          <h2 className="text-lg font-semibold">Quanto é X% de Y?</h2>
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm">Quanto é</span>
            <input
              type="text"
              value={percent1}
              onChange={(e) => setPercent1(e.target.value.replace(/[^0-9,.-]/g, ''))}
              placeholder="15"
              className="tool-input w-20"
            />
            <span className="text-sm">% de</span>
            <input
              type="text"
              value={value1}
              onChange={(e) => setValue1(e.target.value.replace(/[^0-9,.-]/g, ''))}
              placeholder="200"
              className="tool-input w-32"
            />
            <span className="text-sm">?</span>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
            <p className="text-sm text-muted-foreground mb-1">Resultado:</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(result1)}
            </p>
          </div>
        </div>

        {/* Card 2: X é quantos % de Y? */}
        <div className="tool-card space-y-4">
          <h2 className="text-lg font-semibold">X é quantos % de Y?</h2>
          
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              value={part}
              onChange={(e) => setPart(e.target.value.replace(/[^0-9,.-]/g, ''))}
              placeholder="50"
              className="tool-input w-32"
            />
            <span className="text-sm">é quantos % de</span>
            <input
              type="text"
              value={total}
              onChange={(e) => setTotal(e.target.value.replace(/[^0-9,.-]/g, ''))}
              placeholder="200"
              className="tool-input w-32"
            />
            <span className="text-sm">?</span>
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
            <p className="text-sm text-muted-foreground mb-1">Resultado:</p>
            <p className="text-2xl font-bold text-primary">
              {formatPercent(result2)}
            </p>
          </div>
        </div>

        {/* Card 3: Acréscimo/Desconto */}
        <div className="tool-card space-y-4">
          <h2 className="text-lg font-semibold">Acréscimo/Desconto Percentual</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Valor:</label>
              <input
                type="text"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value.replace(/[^0-9,.-]/g, ''))}
                placeholder="200"
                className="tool-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Percentual:</label>
              <input
                type="text"
                value={percentChange}
                onChange={(e) => setPercentChange(e.target.value.replace(/[^0-9,.-]/g, ''))}
                placeholder="10"
                className="tool-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tipo:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="increase"
                    checked={changeType === 'increase'}
                    onChange={(e) => setChangeType(e.target.value as 'increase')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Acréscimo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="decrease"
                    checked={changeType === 'decrease'}
                    onChange={(e) => setChangeType(e.target.value as 'decrease')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Desconto</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
              <p className="text-sm text-muted-foreground">Valor final:</p>
              <p className="text-xl font-bold text-primary">
                {formatCurrency(finalValue3)}
              </p>
            </div>
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-sm text-muted-foreground">Diferença:</p>
              <p className="text-lg font-semibold">
                {formatCurrency(Math.abs(difference3))}
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Variação Percentual */}
        <div className="tool-card space-y-4">
          <h2 className="text-lg font-semibold">Variação Percentual</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Valor inicial:</label>
              <input
                type="text"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value.replace(/[^0-9,.-]/g, ''))}
                placeholder="100"
                className="tool-input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Valor final:</label>
              <input
                type="text"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value.replace(/[^0-9,.-]/g, ''))}
                placeholder="150"
                className="tool-input w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className={`p-3 border rounded-md ${
              isIncrease 
                ? 'bg-green-500/5 border-green-500/20' 
                : 'bg-red-500/5 border-red-500/20'
            }`}>
              <p className="text-sm text-muted-foreground mb-1">Variação:</p>
              <div className="flex items-center gap-2">
                {isIncrease ? (
                  <ArrowUp className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-red-500" />
                )}
                <p className={`text-2xl font-bold ${
                  isIncrease ? 'text-green-500' : 'text-red-500'
                }`}>
                  {formatPercent(Math.abs(variation4))}
                </p>
                <span className={`text-sm ${
                  isIncrease ? 'text-green-500' : 'text-red-500'
                }`}>
                  {isIncrease ? 'Aumento' : 'Redução'}
                </span>
              </div>
            </div>
            <div className="p-3 bg-muted/30 rounded-md">
              <p className="text-sm text-muted-foreground">Diferença:</p>
              <p className="text-lg font-semibold">
                {formatCurrency(Math.abs(difference4))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator;
