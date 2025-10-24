import React, { useState, useMemo } from 'react';
import { diffChars, diffWords, diffLines } from 'diff';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Seo } from '@/components/seo/Seo';
import { toolsConfig } from '@/config/tools';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type DiffMode = 'char' | 'word' | 'line';

const DiffChecker: React.FC = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [mode, setMode] = useState<DiffMode>('char');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);

  const diffCheckerToolConfig = useMemo(() => {
    return toolsConfig.find(tool => tool.path === '/diff-checker');
  }, []);

  const differences = useMemo(() => {
    if (!text1 && !text2) return [];
    const options = { ignoreWhitespace: mode !== 'char' && ignoreWhitespace };
    switch (mode) {
      case 'word':
        return diffWords(text1, text2, options as any);
      case 'line':
        return diffLines(text1, text2, options as any);
      case 'char':
      default:
        return diffChars(text1, text2);
    }
  }, [text1, text2, mode, ignoreWhitespace]);

  return (
    <>
      {diffCheckerToolConfig && <Seo toolConfig={diffCheckerToolConfig} />}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Comparador de Textos (Diff Checker)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Cole os textos que você deseja comparar nas caixas abaixo para ver as diferenças em tempo real.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Modo de Comparação:</span>
              <ToggleGroup
                type="single"
                defaultValue="char"
                value={mode}
                onValueChange={(value: DiffMode) => value && setMode(value)}
                aria-label="Modo de Comparação"
              >
                <ToggleGroupItem value="char" aria-label="Comparar por caractere">
                  Caractere
                </ToggleGroupItem>
                <ToggleGroupItem value="word" aria-label="Comparar por palavra">
                  Palavra
                </ToggleGroupItem>
                <ToggleGroupItem value="line" aria-label="Comparar por linha">
                  Linha
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ignore-whitespace"
                checked={ignoreWhitespace}
                onCheckedChange={(checked) => setIgnoreWhitespace(Boolean(checked))}
                disabled={mode === 'char'}
              />
              <Label htmlFor="ignore-whitespace" className={mode === 'char' ? 'text-muted-foreground' : ''}>
                Ignorar espaços em branco (não aplicável ao modo Caractere)
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea
            placeholder="Texto Original"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="h-64 font-mono"
          />
          <Textarea
            placeholder="Texto Modificado"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="h-64 font-mono"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resultado da Comparação</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              if (differences.length === 0 || (differences.length === 1 && !differences[0].added && !differences[0].removed)) {
                return <p className="text-muted-foreground">Nenhuma diferença encontrada ou nenhum texto inserido.</p>;
              }

              if (mode === 'line') {
                let leftLineNumber = 1;
                let rightLineNumber = 1;

                return (
                  <div className="p-4 border rounded-md bg-background font-mono text-sm overflow-x-auto">
                    {differences.map((part, partIndex) => {
                      const lines = part.value.endsWith('\n') ? part.value.slice(0, -1).split('\n') : part.value.split('\n');
                      const prefix = part.added ? '+' : part.removed ? '-' : ' ';
                      const className = part.added
                        ? 'bg-green-500/10'
                        : part.removed
                        ? 'bg-red-500/10'
                        : '';

                      return lines.map((line, lineIndex) => {
                        const currentLeft = part.removed ? leftLineNumber++ : (part.added ? '' : leftLineNumber++);
                        const currentRight = part.added ? rightLineNumber++ : (part.removed ? '' : rightLineNumber++);
                        
                        return (
                          <div key={`${partIndex}-${lineIndex}`} className={`flex ${className}`}>
                            <span className="w-10 text-right pr-2 select-none text-muted-foreground">{currentLeft}</span>
                            <span className="w-10 text-right pr-2 select-none text-muted-foreground">{currentRight}</span>
                            <span className={`w-4 text-center select-none ${part.added ? 'text-green-500' : part.removed ? 'text-red-500' : ''}`}>{prefix}</span>
                            <span className="flex-1 whitespace-pre-wrap break-words">{line}</span>
                          </div>
                        );
                      });
                    })}
                  </div>
                );
              }

              // Inline view for 'char' and 'word' modes
              return (
                <div className="p-4 border rounded-md bg-background font-mono whitespace-pre-wrap break-words">
                  {differences.map((part, index) => {
                    const style = {
                      backgroundColor: part.added ? 'rgba(63, 185, 80, 0.2)' : part.removed ? 'rgba(248, 81, 73, 0.2)' : 'transparent',
                      textDecoration: part.removed ? 'line-through' : 'none',
                    };
                    return (
                      <span key={index} style={style}>
                        {part.value}
                      </span>
                    );
                  })}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DiffChecker;
