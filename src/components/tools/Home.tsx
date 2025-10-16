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
  ArrowRight
} from 'lucide-react';

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
];

export const Home = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 mb-2">
          <span className="text-5xl">🔧</span>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Schmidt Tools
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Hub de ferramentas gratuitas para desenvolvedores e profissionais de tech.
          <br />
          Rápido, seguro e sem cadastro.
        </p>
      </div>

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

      <div className="tool-card text-center space-y-3">
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
  );
};
