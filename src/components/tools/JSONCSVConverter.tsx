import { useState } from 'react';
import Papa from 'papaparse';
import { CopyButton } from '@/components/CopyButton';
import { toast } from 'sonner';
import { Download } from 'lucide-react';

export const JSONCSVConverter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [csvInput, setCsvInput] = useState('');

  const handleJSONToCSV = () => {
    try {
      const data = JSON.parse(jsonInput);
      const csv = Papa.unparse(data);
      setCsvInput(csv);
      toast.success('Convertido para CSV!');
    } catch (e) {
      toast.error('JSON inválido');
    }
  };

  const handleCSVToJSON = () => {
    try {
      const result = Papa.parse(csvInput, { header: true, skipEmptyLines: true });
      const json = JSON.stringify(result.data, null, 2);
      setJsonInput(json);
      toast.success('Convertido para JSON!');
    } catch (e) {
      toast.error('CSV inválido');
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonInput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON baixado!');
  };

  const downloadCSV = () => {
    const blob = new Blob([csvInput], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV baixado!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Conversor JSON ↔ CSV</h1>
        <p className="text-muted-foreground">
          Converta entre JSON e CSV em ambas as direções. Detecta automaticamente o delimitador.
        </p>
      </div>

      <div className="tool-card">
        <div className="grid md:grid-cols-2 gap-6">
          {/* JSON Side */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">JSON</label>
              <div className="flex gap-2">
                <CopyButton text={jsonInput} />
                <button
                  onClick={downloadJSON}
                  disabled={!jsonInput}
                  className="tool-button-outline inline-flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='[{"nome": "João", "idade": 30}]'
              className="tool-textarea"
              rows={12}
            />
          </div>

          {/* CSV Side */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">CSV</label>
              <div className="flex gap-2">
                <CopyButton text={csvInput} />
                <button
                  onClick={downloadCSV}
                  disabled={!csvInput}
                  className="tool-button-outline inline-flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="nome,idade&#10;João,30"
              className="tool-textarea"
              rows={12}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button onClick={handleJSONToCSV} className="tool-button">
            JSON → CSV
          </button>
          <button onClick={handleCSVToJSON} className="tool-button-secondary">
            CSV → JSON
          </button>
        </div>
      </div>
    </div>
  );
};
