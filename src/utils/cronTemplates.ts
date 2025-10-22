export interface CronTemplate {
  id: string;
  name: string;
  expression: string;
  description: string;
  category: string;
}

export const cronTemplates: CronTemplate[] = [
  // Frequência Alta
  {
    id: 'every-minute',
    name: 'A cada minuto',
    expression: '* * * * *',
    description: 'Executa a cada minuto',
    category: 'Frequência Alta'
  },
  {
    id: 'every-5-minutes',
    name: 'A cada 5 minutos',
    expression: '*/5 * * * *',
    description: 'Executa a cada 5 minutos',
    category: 'Frequência Alta'
  },
  {
    id: 'every-15-minutes',
    name: 'A cada 15 minutos',
    expression: '*/15 * * * *',
    description: 'Executa a cada 15 minutos',
    category: 'Frequência Alta'
  },
  {
    id: 'every-30-minutes',
    name: 'A cada 30 minutos',
    expression: '*/30 * * * *',
    description: 'Executa a cada 30 minutos',
    category: 'Frequência Alta'
  },

  // Horários Diários
  {
    id: 'midnight',
    name: 'Meia-noite',
    expression: '0 0 * * *',
    description: 'Todo dia à meia-noite (00:00)',
    category: 'Horários Diários'
  },
  {
    id: 'midday',
    name: 'Meio-dia',
    expression: '0 12 * * *',
    description: 'Todo dia ao meio-dia (12:00)',
    category: 'Horários Diários'
  },
  {
    id: 'morning-9am',
    name: 'Manhã (9h)',
    expression: '0 9 * * *',
    description: 'Todo dia às 9h da manhã',
    category: 'Horários Diários'
  },
  {
    id: 'afternoon-3pm',
    name: 'Tarde (15h)',
    expression: '0 15 * * *',
    description: 'Todo dia às 15h',
    category: 'Horários Diários'
  },
  {
    id: 'evening-9pm',
    name: 'Noite (21h)',
    expression: '0 21 * * *',
    description: 'Todo dia às 21h',
    category: 'Horários Diários'
  },
  {
    id: 'twice-daily',
    name: 'Duas vezes ao dia',
    expression: '0 9,18 * * *',
    description: 'Todo dia às 9h e 18h',
    category: 'Horários Diários'
  },

  // Dias Úteis
  {
    id: 'weekdays-9am',
    name: 'Dias úteis 9h',
    expression: '0 9 * * 1-5',
    description: 'Segunda a sexta-feira às 9h',
    category: 'Dias Úteis'
  },
  {
    id: 'weekdays-6pm',
    name: 'Dias úteis 18h',
    expression: '0 18 * * 1-5',
    description: 'Segunda a sexta-feira às 18h',
    category: 'Dias Úteis'
  },
  {
    id: 'monday-8am',
    name: 'Segunda-feira 8h',
    expression: '0 8 * * 1',
    description: 'Toda segunda-feira às 8h',
    category: 'Dias Úteis'
  },

  // Fim de Semana
  {
    id: 'weekend-10am',
    name: 'Fim de semana 10h',
    expression: '0 10 * * 0,6',
    description: 'Sábado e domingo às 10h',
    category: 'Fim de Semana'
  },
  {
    id: 'sunday-8am',
    name: 'Domingo 8h',
    expression: '0 8 * * 0',
    description: 'Todo domingo às 8h',
    category: 'Fim de Semana'
  },

  // Mensal
  {
    id: 'first-day-month',
    name: 'Primeiro dia do mês',
    expression: '0 6 1 * *',
    description: 'Primeiro dia de cada mês às 6h',
    category: 'Mensal'
  },
  {
    id: 'last-day-month',
    name: 'Último dia do mês',
    expression: '0 23 L * *',
    description: 'Último dia de cada mês às 23h',
    category: 'Mensal'
  },
  {
    id: 'day-15-month',
    name: 'Dia 15 do mês',
    expression: '0 12 15 * *',
    description: 'Dia 15 de cada mês ao meio-dia',
    category: 'Mensal'
  },

  // Intervalos
  {
    id: 'every-hour',
    name: 'A cada hora',
    expression: '0 * * * *',
    description: 'A cada hora no minuto 0',
    category: 'Intervalos'
  },
  {
    id: 'every-2-hours',
    name: 'A cada 2 horas',
    expression: '0 */2 * * *',
    description: 'A cada 2 horas',
    category: 'Intervalos'
  },
  {
    id: 'every-6-hours',
    name: 'A cada 6 horas',
    expression: '0 */6 * * *',
    description: 'A cada 6 horas (00:00, 06:00, 12:00, 18:00)',
    category: 'Intervalos'
  }
];

export const getTemplatesByCategory = () => {
  const categories: { [key: string]: CronTemplate[] } = {};
  
  cronTemplates.forEach(template => {
    if (!categories[template.category]) {
      categories[template.category] = [];
    }
    categories[template.category].push(template);
  });
  
  return categories;
};
