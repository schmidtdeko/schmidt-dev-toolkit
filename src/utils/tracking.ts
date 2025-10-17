/**
 * Sistema de tracking de uso das ferramentas
 * Armazena dados no LocalStorage do navegador
 */

export interface ToolUsage {
  count: number;
  lastUsed: string | null;
}

export interface TrackingData {
  toolUsage: {
    [key: string]: ToolUsage;
  };
  firstVisit: string;
  totalSessions: number;
}

const STORAGE_KEY = 'schmidtToolsTracking';

// Lista de todas as ferramentas
const TOOLS = [
  'cpf_generator',
  'cnpj_generator',
  'placa_generator',
  'password_generator',
  'uuid_generator',
  'cpf_cnpj_validator',
  'json_csv_converter',
  'universal_converter',
  'json_formatter',
  'xml_formatter',
  'hash_calculator',
  'char_counter',
  'percentage_calculator'
];

/**
 * Inicializa estrutura de dados se não existir
 */
const initializeTracking = (): TrackingData => {
  const toolUsage: { [key: string]: ToolUsage } = {};
  TOOLS.forEach(tool => {
    toolUsage[tool] = { count: 0, lastUsed: null };
  });

  return {
    toolUsage,
    firstVisit: new Date().toISOString(),
    totalSessions: 1
  };
};

/**
 * Obtém dados de tracking do LocalStorage
 */
export const getTrackingData = (): TrackingData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler tracking data:', error);
    return null;
  }
};

/**
 * Salva dados de tracking no LocalStorage
 */
const saveTrackingData = (data: TrackingData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar tracking data:', error);
  }
};

/**
 * Registra uso de uma ferramenta
 */
export const trackToolUsage = (toolName: string): void => {
  try {
    let data = getTrackingData();
    
    if (!data) {
      data = initializeTracking();
    }

    // Garante que a ferramenta existe na estrutura
    if (!data.toolUsage[toolName]) {
      data.toolUsage[toolName] = { count: 0, lastUsed: null };
    }

    // Incrementa contador e atualiza timestamp
    data.toolUsage[toolName].count += 1;
    data.toolUsage[toolName].lastUsed = new Date().toISOString();

    saveTrackingData(data);
  } catch (error) {
    console.error('Erro ao rastrear uso da ferramenta:', error);
  }
};

/**
 * Reseta todos os dados de tracking
 */
export const resetTrackingData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao resetar tracking data:', error);
  }
};

/**
 * Verifica se LocalStorage está disponível
 */
export const isLocalStorageAvailable = (): boolean => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Calcula métricas do dashboard
 */
export const getDashboardMetrics = () => {
  const data = getTrackingData();
  
  if (!data) {
    return {
      totalUsage: 0,
      activeTools: 0,
      totalTools: TOOLS.length,
      firstVisit: new Date().toISOString(),
      topTools: [],
      loadTime: null
    };
  }

  // Total de usos
  const totalUsage = Object.values(data.toolUsage).reduce(
    (sum, tool) => sum + tool.count,
    0
  );

  // Ferramentas ativas (com pelo menos 1 uso)
  const activeTools = Object.values(data.toolUsage).filter(
    tool => tool.count > 0
  ).length;

  // Top 6 ferramentas mais usadas
  const topTools = Object.entries(data.toolUsage)
    .map(([name, usage]) => ({
      name: formatToolName(name),
      count: usage.count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Tempo de carregamento
  let loadTime = null;
  try {
    const perfData = window.performance.timing;
    if (perfData.loadEventEnd && perfData.navigationStart) {
      const loadMs = perfData.loadEventEnd - perfData.navigationStart;
      loadTime = loadMs / 1000; // converter para segundos
    }
  } catch (error) {
    console.error('Performance API não disponível:', error);
  }

  return {
    totalUsage,
    activeTools,
    totalTools: TOOLS.length,
    firstVisit: data.firstVisit,
    topTools,
    loadTime
  };
};

/**
 * Formata nome da ferramenta para exibição
 */
const formatToolName = (toolName: string): string => {
  const names: { [key: string]: string } = {
    cpf_generator: 'Gerador CPF',
    cnpj_generator: 'Gerador CNPJ',
    placa_generator: 'Gerador Placas',
    password_generator: 'Senhas',
    uuid_generator: 'UUID',
    cpf_cnpj_validator: 'Validador',
    json_csv_converter: 'JSON→CSV',
    universal_converter: 'Conversor Universal',
    json_formatter: 'JSON Formatter',
    xml_formatter: 'XML Formatter',
    hash_calculator: 'Hash',
    char_counter: 'Contador',
    percentage_calculator: 'Percentual'
  };
  return names[toolName] || toolName;
};

/**
 * Calcula dias desde primeira visita
 */
export const getDaysSinceFirstVisit = (firstVisit: string): number => {
  const first = new Date(firstVisit);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - first.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
