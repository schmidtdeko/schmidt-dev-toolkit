export const formatTime = (date: Date, timeFormat: '12h' | '24h'): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  if (timeFormat === '12h') {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  }
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
};

export const getRelativeTime = (isoString: string): string => {
  const date = new Date(isoString);
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSeconds < 60) return 'agora mesmo';
  if (diffSeconds < 3600) return `há ${Math.floor(diffSeconds / 60)} minutos`;
  if (diffSeconds < 86400) return `há ${Math.floor(diffSeconds / 3600)} horas`;
  if (diffSeconds < 2592000) return `há ${Math.floor(diffSeconds / 86400)} dias`;
  if (diffSeconds < 31536000) return `há ${Math.floor(diffSeconds / 2592000)} meses`;
  return `há ${Math.floor(diffSeconds / 31536000)} anos`;
};
