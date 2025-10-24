import React, { useState, useMemo } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Seo } from '@/components/seo/Seo';
import { toolsConfig } from '@/config/tools';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type DiffView = 'split' | 'unified';

const DiffChecker: React.FC = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [splitView, setSplitView] = useState<DiffView>('split');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);

  const diffCheckerToolConfig = useMemo(() => {
    return toolsConfig.find(tool => tool.path === '/diff-checker');
  }, []);

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
              Cole os textos que você deseja comparar nas caixas abaixo para ver as diferenças.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Visualização:</span>
                <ToggleGroup
                  type="single"
                  defaultValue="split"
                  value={splitView}
                  onValueChange={(value: DiffView) => value && setSplitView(value)}
                  aria-label="Modo de Visualização"
                >
                  <ToggleGroupItem value="split" aria-label="Lado a Lado">Lado a Lado</ToggleGroupItem>
                  <ToggleGroupItem value="unified" aria-label="Unificado">Unificado</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ignore-whitespace"
                  checked={ignoreWhitespace}
                  onCheckedChange={(checked) => setIgnoreWhitespace(Boolean(checked))}
                />
                <Label htmlFor="ignore-whitespace">Ignorar espaços em branco</Label>
              </div>
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
            <div className="rounded-md border">
              <ReactDiffViewer
                oldValue={text1}
                newValue={text2}
                splitView={splitView === 'split'}
                compareMethod={DiffMethod.WORDS}
                ignoreWhitespace={ignoreWhitespace}
                leftTitle="Texto Original"
                rightTitle="Texto Modificado"
                {...({} as any)} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DiffChecker;
