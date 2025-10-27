import { LucideIcon, FileText, CheckCircle2, RefreshCw, Code, Calculator, Type, CreditCard, KeyRound, Hash, LayoutDashboard, Clock, HomeIcon, LayoutGrid, Info } from 'lucide-react';

export interface ToolConfig {
  name: string;
  path: string;
  icon: LucideIcon;
  category: string;
  description: string;
  keywords: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string; // Adicionado para permitir imagem de SEO específica por ferramenta
}

export const toolsConfig: ToolConfig[] = [
  {
    name: 'Gerador de CPF',
    path: '/cpf-generator',
    icon: FileText,
    category: 'Geradores',
    description: 'Gere CPFs válidos para testes e desenvolvimento.',
    keywords: ['cpf', 'gerador', 'documento', 'teste'],
    seoTitle: 'Gerador de CPF - Schmidt Dev Toolkit',
    seoDescription: 'Gere CPFs válidos para testes e desenvolvimento com o Gerador de CPF do Schmidt Dev Toolkit.',
  },
  {
    name: 'Gerador de CNPJ',
    path: '/cnpj-generator',
    icon: FileText,
    category: 'Geradores',
    description: 'Gere CNPJs válidos para testes e desenvolvimento.',
    keywords: ['cnpj', 'gerador', 'documento', 'teste'],
    seoTitle: 'Gerador de CNPJ - Schmidt Dev Toolkit',
    seoDescription: 'Gere CNPJs válidos para testes e desenvolvimento com o Gerador de CNPJ do Schmidt Dev Toolkit.',
  },
  {
    name: 'Validador CPF/CNPJ',
    path: '/validator',
    icon: CheckCircle2,
    category: 'Validadores',
    description: 'Valide números de CPF e CNPJ.',
    keywords: ['cpf', 'cnpj', 'validador', 'verificar'],
    seoTitle: 'Validador CPF/CNPJ - Schmidt Dev Toolkit',
    seoDescription: 'Valide números de CPF e CNPJ de forma rápida e eficiente com o Validador CPF/CNPJ do Schmidt Dev Toolkit.',
  },
  {
    name: 'Placas de Veículo',
    path: '/plate-generator',
    icon: CreditCard,
    category: 'Geradores',
    description: 'Gere placas de veículos no formato Mercosul.',
    keywords: ['placa', 'veículo', 'gerador', 'mercosul'],
    seoTitle: 'Gerador de Placas de Veículo - Schmidt Dev Toolkit',
    seoDescription: 'Gere placas de veículos no formato Mercosul para testes e desenvolvimento com o Gerador de Placas de Veículo do Schmidt Dev Toolkit.',
  },
  {
    name: 'Formatador JSON',
    path: '/json-formatter',
    icon: Code,
    category: 'Formatadores',
    description: 'Formate e valide JSON de forma legível.',
    keywords: ['json', 'formatador', 'validador', 'código'],
    seoTitle: 'Formatador JSON - Schmidt Dev Toolkit',
    seoDescription: 'Formate e valide JSON de forma legível e organizada com o Formatador JSON do Schmidt Dev Toolkit.',
  },
  {
    name: 'JSON ↔ CSV',
    path: '/json-csv-converter',
    icon: RefreshCw,
    category: 'Conversores',
    description: 'Converta JSON para CSV e vice-versa.',
    keywords: ['json', 'csv', 'conversor', 'dados'],
    seoTitle: 'Conversor JSON ↔ CSV - Schmidt Dev Toolkit',
    seoDescription: 'Converta JSON para CSV e vice-versa de forma simples e rápida com o Conversor JSON ↔ CSV do Schmidt Dev Toolkit.',
  },
  {
    name: 'Senhas Fortes',
    path: '/password-generator',
    icon: KeyRound,
    category: 'Geradores',
    description: 'Gere senhas seguras e aleatórias.',
    keywords: ['senha', 'gerador', 'segurança', 'aleatório'],
    seoTitle: 'Gerador de Senhas Fortes - Schmidt Dev Toolkit',
    seoDescription: 'Gere senhas seguras e aleatórias para proteger suas contas com o Gerador de Senhas Fortes do Schmidt Dev Toolkit.',
  },
  {
    name: 'Calculadora Hash',
    path: '/hash-calculator',
    icon: Calculator,
    category: 'Calculadoras',
    description: 'Calcule hashes (MD5, SHA-1, SHA-256) de textos.',
    keywords: ['hash', 'md5', 'sha', 'calculadora', 'segurança'],
    seoTitle: 'Calculadora Hash - Schmidt Dev Toolkit',
    seoDescription: 'Calcule hashes (MD5, SHA-1, SHA-256) de textos de forma rápida e segura com a Calculadora Hash do Schmidt Dev Toolkit.',
  },
  {
    name: 'UUID/GUID',
    path: '/uuid-generator',
    icon: Hash,
    category: 'Geradores',
    description: 'Gere UUIDs/GUIDs únicos.',
    keywords: ['uuid', 'guid', 'gerador', 'identificador'],
    seoTitle: 'Gerador de UUID/GUID - Schmidt Dev Toolkit',
    seoDescription: 'Gere UUIDs/GUIDs únicos para seus projetos com o Gerador de UUID/GUID do Schmidt Dev Toolkit.',
  },
  {
    name: 'Contador de Caracteres',
    path: '/char-counter',
    icon: Type,
    category: 'Texto',
    description: 'Conte caracteres, palavras e linhas de um texto.',
    keywords: ['contador', 'caracteres', 'palavras', 'texto'],
    seoTitle: 'Contador de Caracteres - Schmidt Dev Toolkit',
    seoDescription: 'Conte caracteres, palavras e linhas de um texto de forma rápida e precisa com o Contador de Caracteres do Schmidt Dev Toolkit.',
  },
  {
    name: 'XML Formatter',
    path: '/xml-formatter',
    icon: Code,
    category: 'Formatadores',
    description: 'Formate e valide XML de forma legível.',
    keywords: ['xml', 'formatador', 'validador', 'código'],
    seoTitle: 'Formatador XML - Schmidt Dev Toolkit',
    seoDescription: 'Formate e valide XML de forma legível e organizada com o Formatador XML do Schmidt Dev Toolkit.',
  },
  {
    name: 'Calculadora Percentual',
    path: '/percentage-calculator',
    icon: Calculator,
    category: 'Calculadoras',
    description: 'Calcule porcentagens de forma rápida.',
    keywords: ['porcentagem', 'calculadora', 'percentual'],
    seoTitle: 'Calculadora Percentual - Schmidt Dev Toolkit',
    seoDescription: 'Calcule porcentagens de forma rápida e eficiente com a Calculadora Percentual do Schmidt Dev Toolkit.',
  },
  {
    name: 'Conversor Universal',
    path: '/universal-converter',
    icon: RefreshCw,
    category: 'Conversores',
    description: 'Converta entre Base64, URL, Hex, Binário e mais.',
    keywords: ['conversor', 'base64', 'url', 'hex', 'binário'],
    seoTitle: 'Conversor Universal - Schmidt Dev Toolkit',
    seoDescription: 'Converta entre Base64, URL, Hex, Binário e mais com o Conversor Universal do Schmidt Dev Toolkit.',
  },
  {
    name: 'Teste de Digitação',
    path: '/typing-test',
    icon: Type,
    category: 'Texto',
    description: 'Teste e melhore sua velocidade de digitação.',
    keywords: ['digitação', 'teste', 'velocidade', 'texto'],
    seoTitle: 'Teste de Digitação - Schmidt Dev Toolkit',
    seoDescription: 'Teste e melhore sua velocidade de digitação com o Teste de Digitação do Schmidt Dev Toolkit.',
  },
  {
    name: 'Comparador de Textos',
    path: '/diff-checker',
    icon: FileText,
    category: 'Texto',
    description: 'Compare duas versões de texto ou código e veja as diferenças.',
    keywords: ['diff', 'checker', 'comparador', 'texto', 'código', 'diferenças'],
    seoTitle: 'Comparador de Textos (Diff Checker) - Schmidt Dev Toolkit',
    seoDescription: 'Compare duas versões de texto ou código e veja as diferenças destacadas em tempo real.',
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
  {
    name: 'Despertador Online',
    path: '/alarm-clock',
    icon: Clock,
    category: 'Tempo',
    description: 'Configure um alarme que toca no navegador em um horário específico.',
    keywords: ['alarme', 'despertador', 'relógio', 'tempo', 'online'],
    seoTitle: 'Despertador Online - Schmidt Tools',
    seoDescription: 'Configure um alarme que toca no navegador em um horário específico com o Despertador Online do Schmidt Tools.',
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
