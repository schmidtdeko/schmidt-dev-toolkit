import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Clock, Code, LayoutGrid } from 'lucide-react';
import { toolsConfig, ToolConfig } from '@/config/tools';
import { cn } from '@/lib/utils';

// Mapeamento de ícones para categorias
const categoryIcons: { [key: string]: React.ElementType } = {
  'Tempo': Clock,
  'DevOps': Code,
  'Geradores': LayoutGrid,
  'Validadores': LayoutGrid,
  'Conversores': LayoutGrid,
  'Formatadores': LayoutGrid,
  'Calculadoras': LayoutGrid,
  'Texto': LayoutGrid,
};

const AllTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(toolsConfig.map(tool => tool.category));
    return ['Todas', ...Array.from(uniqueCategories)];
  }, []);

  const filteredTools = useMemo(() => {
    let currentTools = toolsConfig;

    if (activeCategory !== 'Todas') {
      currentTools = currentTools.filter(tool => tool.category === activeCategory);
    }

    if (searchTerm) {
      currentTools = currentTools.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return currentTools;
  }, [searchTerm, activeCategory]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">Todas as Ferramentas</h1>
      <p className="text-center text-muted-foreground">
        Explore nossa coleção completa de ferramentas úteis para desenvolvedores e profissionais de tecnologia.
      </p>

      {/* Campo de busca */}
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar ferramentas..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filtro por categoria */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map(category => (
          <Badge
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            className={cn(
              "cursor-pointer px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            )}
            onClick={() => setActiveCategory(category)}
          >
            {category} ({toolsConfig.filter(tool => category === 'Todas' || tool.category === category).length})
          </Badge>
        ))}
      </div>

      <Separator />

      {/* Lista de ferramentas */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool: ToolConfig) => {
            const Icon = tool.icon;
            return (
              <Link to={tool.path} key={tool.path} className="group">
                <Card className="h-full flex flex-col justify-between p-4 transition-all duration-200 ease-in-out hover:shadow-lg hover:border-primary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">{tool.name}</CardTitle>
                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                  <div className="px-4 pb-4">
                    <Badge variant="secondary">{tool.category}</Badge>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <p className="text-lg">Nenhuma ferramenta encontrada para "{searchTerm}" na categoria "{activeCategory}".</p>
          <p className="text-sm mt-2">Tente ajustar sua busca ou filtro.</p>
        </div>
      )}
    </div>
  );
};

export default AllTools;
