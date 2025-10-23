/**
 * Traduz uma expressão cron para linguagem natural em português
 */
export function translateCronExpression(expression: string): string {
  if (!expression || expression.trim() === '') {
    return 'Expressão cron inválida';
  }

  const parts = expression.trim().split(/\s+/);
  
  if (parts.length !== 5) {
    return 'Expressão cron inválida (deve ter 5 campos)';
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

  try {
    const minutePart = translateMinute(minute);
    const hourPart = translateHour(hour);
    const dayPart = translateDay(dayOfMonth, dayOfWeek);
    const monthPart = translateMonth(month);

    // Combinar as partes de forma legível
    let translation = '';

    // Frequência (minuto e hora)
    if (minute === '*' && hour === '*') {
      translation = 'A cada minuto';
    } else if (minute.startsWith('*/') && hour === '*') {
      translation = minutePart;
    } else if (hour.startsWith('*/')) {
      translation = `${hourPart}${minutePart !== 'no minuto 0' ? ', ' + minutePart : ''}`;
    } else if (hour !== '*') {
      translation = `${hourPart}${minutePart !== 'no minuto 0' ? ' e ' + minutePart : ''}`;
    } else {
      translation = `${minutePart} de cada hora`;
    }

    // Dia
    if (dayPart) {
      translation += `, ${dayPart}`;
    }

    // Mês
    if (monthPart) {
      translation += `, ${monthPart}`;
    }

    return translation.charAt(0).toUpperCase() + translation.slice(1);
  } catch (error) {
    return 'Não foi possível traduzir a expressão';
  }
}

function translateMinute(minute: string): string {
  if (minute === '*') return 'a cada minuto';
  if (minute === '0') return 'no minuto 0';
  if (minute.startsWith('*/')) {
    const interval = minute.substring(2);
    return `a cada ${interval} minuto${parseInt(interval) > 1 ? 's' : ''}`;
  }
  if (minute.includes(',')) {
    const minutes = minute.split(',');
    return `nos minutos ${minutes.join(', ')}`;
  }
  if (minute.includes('-')) {
    const [start, end] = minute.split('-');
    return `dos minutos ${start} ao ${end}`;
  }
  return `no minuto ${minute}`;
}

function translateHour(hour: string): string {
  if (hour === '*') return '';
  if (hour === '0') return 'À meia-noite';
  if (hour === '12') return 'Ao meio-dia';
  
  if (hour.startsWith('*/')) {
    const interval = hour.substring(2);
    return `A cada ${interval} hora${parseInt(interval) > 1 ? 's' : ''}`;
  }
  
  if (hour.includes(',')) {
    const hours = hour.split(',');
    const formatted = hours.map(h => `${h}:00`).join(', ');
    return `Às ${formatted}`;
  }
  
  if (hour.includes('-')) {
    const [start, end] = hour.split('-');
    return `Das ${start}:00 às ${end}:00`;
  }
  
  const hourNum = parseInt(hour);
  return `Às ${hourNum}:00`;
}

function translateDay(dayOfMonth: string, dayOfWeek: string): string {
  const dayOfMonthPart = translateDayOfMonth(dayOfMonth);
  const dayOfWeekPart = translateDayOfWeek(dayOfWeek);

  if (dayOfMonthPart && dayOfWeekPart) {
    return `${dayOfMonthPart} e ${dayOfWeekPart}`;
  }
  
  return dayOfMonthPart || dayOfWeekPart || '';
}

function translateDayOfMonth(day: string): string {
  if (day === '*') return '';
  if (day === 'L') return 'no último dia do mês';
  if (day.endsWith('W')) {
    const dayNum = day.substring(0, day.length - 1);
    return `no dia útil mais próximo do dia ${dayNum}`;
  }
  if (day.includes(',')) {
    const days = day.split(',');
    return `nos dias ${days.join(', ')} do mês`;
  }
  if (day.includes('-')) {
    const [start, end] = day.split('-');
    return `dos dias ${start} ao ${end} do mês`;
  }
  return `no dia ${day} do mês`;
}

function translateDayOfWeek(day: string): string {
  if (day === '*') return '';
  if (day === '1-5') return 'em dias úteis';
  if (day === '0,6') return 'aos fins de semana';
  
  const dayNames: { [key: string]: string } = {
    '0': 'domingo',
    '1': 'segunda-feira',
    '2': 'terça-feira',
    '3': 'quarta-feira',
    '4': 'quinta-feira',
    '5': 'sexta-feira',
    '6': 'sábado'
  };

  if (day.includes(',')) {
    const days = day.split(',').map(d => dayNames[d] || d);
    const last = days.pop();
    return days.length > 0 
      ? `às ${days.join(', ')} e ${last}` 
      : `às ${last}`;
  }
  
  if (day.includes('-')) {
    const [start, end] = day.split('-');
    return `de ${dayNames[start]} a ${dayNames[end]}`;
  }
  
  return `às ${dayNames[day] || day}`;
}

function translateMonth(month: string): string {
  if (month === '*') return '';
  
  const monthNames: { [key: string]: string } = {
    '1': 'janeiro',
    '2': 'fevereiro',
    '3': 'março',
    '4': 'abril',
    '5': 'maio',
    '6': 'junho',
    '7': 'julho',
    '8': 'agosto',
    '9': 'setembro',
    '10': 'outubro',
    '11': 'novembro',
    '12': 'dezembro'
  };

  if (month.includes(',')) {
    const months = month.split(',').map(m => monthNames[m] || m);
    const last = months.pop();
    return months.length > 0 
      ? `em ${months.join(', ')} e ${last}` 
      : `em ${last}`;
  }
  
  if (month.includes('-')) {
    const [start, end] = month.split('-');
    return `de ${monthNames[start]} a ${monthNames[end]}`;
  }
  
  return `em ${monthNames[month] || month}`;
}
