import { Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  RefreshCw, 
  Code, 
  Calculator, 
  Type,
  CreditCard,
  KeyRound,
  Hash,
  ArrowRight,
  Check,
  Zap,
  Github,
  Users,
  ChevronDown,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const tools = [
  { name: 'Gerador de CPF', path: '/cpf-generator', icon: FileText, category: 'Gerador' },
  { name: 'Gerador de CNPJ', path: '/cnpj-generator', icon: FileText, category: 'Gerador' },
  { name: 'Validador CPF/CNPJ', path: '/validator', icon: CheckCircle2, category: 'Validador' },
  { name: 'Placas de Veículo', path: '/plate-generator', icon: CreditCard, category: 'Gerador' },
  { name: 'Formatador JSON', path: '/json-formatter', icon: Code, category: 'Formatador' },
  { name: 'JSON ↔ CSV', path: '/json-csv-converter', icon: RefreshCw, category: 'Conversor' },
  { name: 'Senhas Fortes', path: '/password-generator', icon: KeyRound, category: 'Gerador' },
  { name: 'Calculadora Hash', path: '/hash-calculator', icon: Calculator, category: 'Calculadora' },
  { name: 'UUID/GUID', path: '/uuid-generator', icon: Hash, category: 'Gerador' },
  { name: 'Contador de Caracteres', path: '/char-counter', icon: Type, category: 'Texto' },
  { name: 'Cron Expression Builder', path: '/cron-builder', icon: Clock, category: 'DevOps' },
];

export const Home = () => {
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center py-4 md:py-6 mb-0 min-h-0">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8 text-center lg:text-left">
              {/* Eyebrow */}
              <div className="animate-fade-in opacity-0" style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}>
                <Badge variant="secondary" className="text-sm px-4 py-1.5">
                  🔧 Ferramentas Profissionais
                </Badge>
              </div>

              {/* Headline */}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in opacity-0"
                style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
              >
                Ferramentas Gratuitas para{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Devs que Valorizam Seu Tempo
                </span>
              </h1>

              {/* Subheadline */}
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-fade-in opacity-0"
                style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
              >
                12 utilitários práticos para desenvolvimento, testes e operações. Sem cadastro, sem anúncios, 100% gratuito e open source.
              </p>

              {/* Badges */}
              <div 
                className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in opacity-0"
                style={{ animationDelay: '450ms', animationFillMode: 'forwards' }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">100% Gratuito</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Sem Cadastro</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Github className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Open Source</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">Usado por Profissionais</span>
                </div>
              </div>

              {/* CTAs */}
              <div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in opacity-0"
                style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
              >
                <Button 
                  size="lg" 
                  onClick={scrollToTools}
                  className="text-base"
                >
                  Explorar Ferramentas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="text-base"
                >
                  <a 
                    href="https://github.com/schmidtdeko" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Ver projeto no GitHub"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    Ver no GitHub
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div 
              className="hidden lg:block animate-fade-in opacity-0"
              style={{ animationDelay: '750ms', animationFillMode: 'forwards' }}
            >
              <div className="relative">
                <div className="grid grid-cols-3 gap-4">
                  {tools.slice(0, 9).map((tool, index) => (
                    <div
                      key={tool.path}
                      className="tool-card group hover:scale-105 transition-all duration-300"
                      style={{ 
                        animationDelay: `${800 + index * 50}ms`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <div className="flex flex-col items-center gap-3 p-4">
                        <div className="p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                          <tool.icon className="h-8 w-8 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-center">{tool.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl -z-10 blur-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <button
          onClick={scrollToTools}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce cursor-pointer"
          aria-label="Rolar para ver as ferramentas"
        >
          <span className="text-sm font-medium">Role para ver as ferramentas</span>
          <ChevronDown className="h-6 w-6" />
        </button> */}
      </section>

      {/* Tools Section */}
      <section id="tools-section" className="py-4 space-y-4 -mt-8">

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="tool-card group hover:scale-[1.02] hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <tool.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{tool.category}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>

          <div className="tool-card text-center space-y-3 mt-8">
            <p className="text-sm text-muted-foreground">
              Todas as ferramentas funcionam 100% no seu navegador.
              <br />
              Nenhum dado é enviado para servidores externos.
            </p>
            <div className="flex justify-center gap-6 text-xs text-muted-foreground">
              <span>✅ Código aberto</span>
              <span>✅ Sem rastreamento</span>
              <span>✅ Sem cadastro</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
