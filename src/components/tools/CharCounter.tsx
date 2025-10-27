import { useState, useEffect } from 'react';

const CharCounter = () => {
  const [text, setText] = useState('');
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (text.length > 0 && !hasTracked) {
      setHasTracked(true);
    }
  }, [text, hasTracked]);

  const stats = {
    charsWithSpaces: text.length,
    charsWithoutSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    paragraphs: text.trim() ? text.trim().split(/\n\s*\n/).length : 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Contador de Caracteres</h1>
        <p className="text-muted-foreground">
          Conte caracteres, palavras, linhas e parágrafos em tempo real.
        </p>
      </div>

      <div className="tool-card space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="stat-card">
            <div className="text-3xl font-bold text-primary">{stats.charsWithSpaces}</div>
            <div className="text-xs text-muted-foreground mt-1">Caracteres<br/>(com espaços)</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold text-primary">{stats.charsWithoutSpaces}</div>
            <div className="text-xs text-muted-foreground mt-1">Caracteres<br/>(sem espaços)</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold text-secondary">{stats.words}</div>
            <div className="text-xs text-muted-foreground mt-1">Palavras</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold text-accent">{stats.lines}</div>
            <div className="text-xs text-muted-foreground mt-1">Linhas</div>
          </div>
          <div className="stat-card">
            <div className="text-3xl font-bold text-accent">{stats.paragraphs}</div>
            <div className="text-xs text-muted-foreground mt-1">Parágrafos</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Digite ou cole seu texto
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comece a digitar aqui..."
            className="tool-textarea"
            rows={15}
          />
        </div>
      </div>
    </div>
  );
};

export default CharCounter;
