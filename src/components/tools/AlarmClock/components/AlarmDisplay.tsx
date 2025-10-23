import React from 'react';
import { useCurrentTime } from '../../../../hooks/alarmClock/useCurrentTime';
import { formatTime, formatDate } from '../../../../utils/alarmClock/timeFormatter';
import { cn } from '../../../../lib/utils';
import { useTheme } from '../../../../contexts/ThemeContext'; // Importar o hook de tema global

interface AlarmDisplayProps {
  // Não recebe mais visualSettings como prop
  showDate?: boolean; // Manter opcionalmente se for útil
  timeFormat?: '12h' | '24h'; // Manter opcionalmente se for útil
}

const AlarmDisplay: React.FC<AlarmDisplayProps> = ({ showDate = true, timeFormat = '24h' }) => {
  const currentTime = useCurrentTime();
  const formattedTime = formatTime(currentTime, timeFormat);
  const formattedDate = formatDate(currentTime);
  const { theme } = useTheme(); // Usar o tema global

  // Estilos padrão que se adaptam ao tema global
  const textColorClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const dateTextColorClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={cn(
          'font-bold text-5xl md:text-6xl font-sans', // Estilos padrão
          textColorClass
        )}
      >
        {formattedTime}
      </div>
      {showDate && (
        <div className={cn(
          'text-lg md:text-xl mt-2 font-sans', // Estilos padrão
          dateTextColorClass
        )}>
          {formattedDate}
        </div>
      )}
    </div>
  );
};

export default AlarmDisplay;
