import { LucideIcon, FileText, CheckCircle2, RefreshCw, Code, Calculator, Type, CreditCard, KeyRound, Hash, LayoutDashboard, Clock } from 'lucide-react';

export interface ToolConfig {
  name: string;
  path: string;
  icon: LucideIcon;
  category: string;
  description: string;
  keywords: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export const toolsConfig: ToolConfig[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    category: 'Visão Geral',
    description: 'Visão geral das ferramentas e estatísticas de uso.',
    keywords: ['dashboard', 'visão geral', 'estatísticas'],
  },
  {
    name: 'Gerador de CPF',
    path: '/cpf-generator',
    icon: FileText,
    category: 'Geradores',
    description: 'Gere CPFs válidos para testes e desenvolvimento.',
    keywords: ['cpf', 'gerador', 'documento', 'teste'],
  },
  {
    name: 'Gerador de CNPJ',
    path: '/cnpj-generator',
    icon: FileText,
    category: 'Geradores',
    description: 'Gere CNPJs válidos para testes e desenvolvimento.',
    keywords: ['cnpj', 'gerador', 'documento', 'teste'],
  },
  {
    name: 'Validador CPF/CNPJ',
    path: '/validator',
    icon: CheckCircle2,
    category: 'Validadores',
    description: 'Valide números de CPF e CNPJ.',
    keywords: ['cpf', 'cnpj', 'validador', 'verificar'],
  },
  {
    name: 'Placas de Veículo',
    path: '/plate-generator',
    icon: CreditCard,
    category: 'Geradores',
    description: 'Gere placas de veículos no formato Mercosul.',
    keywords: ['placa', 'veículo', 'gerador', 'mercosul'],
  },
  {
    name: 'Formatador JSON',
    path: '/json-formatter',
    icon: Code,
    category: 'Formatadores',
    description: 'Formate e valide JSON de forma legível.',
    keywords: ['json', 'formatador', 'validador', 'código'],
  },
  {
    name: 'JSON ↔ CSV',
    path: '/json-csv-converter',
    icon: RefreshCw,
    category: 'Conversores',
    description: 'Converta JSON para CSV e vice-versa.',
    keywords: ['json', 'csv', 'conversor', 'dados'],
  },
  {
    name: 'Senhas Fortes',
    path: '/password-generator',
    icon: KeyRound,
    category: 'Geradores',
    description: 'Gere senhas seguras e aleatórias.',
    keywords: ['senha', 'gerador', 'segurança', 'aleatório'],
  },
  {
    name: 'Calculadora Hash',
    path: '/hash-calculator',
    icon: Calculator,
    category: 'Calculadoras',
    description: 'Calcule hashes (MD5, SHA-1, SHA-256) de textos.',
    keywords: ['hash', 'md5', 'sha', 'calculadora', 'segurança'],
  },
  {
    name: 'UUID/GUID',
    path: '/uuid-generator',
    icon: Hash,
    category: 'Geradores',
    description: 'Gere UUIDs/GUIDs únicos.',
    keywords: ['uuid', 'guid', 'gerador', 'identificador'],
  },
  {
    name: 'Contador de Caracteres',
    path: '/char-counter',
    icon: Type,
    category: 'Texto',
    description: 'Conte caracteres, palavras e linhas de um texto.',
    keywords: ['contador', 'caracteres', 'palavras', 'texto'],
  },
  {
    name: 'XML Formatter',
    path: '/xml-formatter',
    icon: Code,
    category: 'Formatadores',
    description: 'Formate e valide XML de forma legível.',
    keywords: ['xml', 'formatador', 'validador', 'código'],
  },
  {
    name: 'Calculadora Percentual',
    path: '/percentage-calculator',
    icon: Calculator,
    category: 'Calculadoras',
    description: 'Calcule porcentagens de forma rápida.',
    keywords: ['porcentagem', 'calculadora', 'percentual'],
  },
  {
    name: 'Conversor Universal',
    path: '/universal-converter',
    icon: RefreshCw,
    category: 'Conversores',
    description: 'Converta entre Base64, URL, Hex, Binário e mais.',
    keywords: ['conversor', 'base64', 'url', 'hex', 'binário'],
  },
  {
    name: 'Teste de Digitação',
    path: '/typing-test',
    icon: Type,
    category: 'Texto',
    description: 'Teste e melhore sua velocidade de digitação.',
    keywords: ['digitação', 'teste', 'velocidade', 'texto'],
  },
  {
    name: 'Cron Expression Builder',
    path: '/cron-builder',
    icon: Clock,
    category: 'DevOps',
    description: 'Crie, valide e teste expressões cron visualmente. Veja próximas execuções e use templates prontos.',
    keywords: ['cron', 'cron expression', 'cron generator', 'cron builder', 'cron validator', 'agendamento', 'scheduler', 'devops', 'automação', 'cron job'],
    seoTitle: 'Cron Expression Builder - Gerador de Expressões Cron | Schmidt Tools',
    seoDescription: 'Crie, valide e teste expressões cron facilmente. Visualize próximas execuções, use templates prontos e entenda cron jobs de forma simples e visual.',
  },
];

export const getToolsByCategory = () => {
  const categories: { [key: string]: ToolConfig[] } = {};
  toolsConfig.forEach(tool => {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push(tool);
  });
  return categories;
};
