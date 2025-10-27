import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toolsConfig } from '@/config/tools'; // Importar a configuração centralizada
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center py-16 md:py-24 text-center bg-gradient-to-b from-background to-muted/20 rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Schmidt Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Ferramentas online gratuitas para facilitar seu dia a dia
          </p>
          <Link to="/tools">
            <Button size="lg" className="text-lg px-8 py-6">
              Ver Todas as Ferramentas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Ferramentas em Destaque */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Ferramentas em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toolsConfig.slice(0, 8).map((tool) => { // Exibir as 8 primeiras ferramentas como destaque
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
                </Card>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Link to="/tools">
            <Button variant="outline" size="lg" className="text-base px-8 py-6">
              Ver Todas as Ferramentas ({toolsConfig.length})
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
