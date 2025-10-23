import React from 'react';
import { useCurrentTime } from '../../../../hooks/alarmClock/useCurrentTime';
import { formatTime, formatDate } from '../../../../utils/alarmClock/timeFormatter';
import { VisualSettings } from '../../../../types/alarmClock/alarm.types';
import { cn } from '../../../../lib/utils';

interface AlarmDisplayProps {
  visualSettings: VisualSettings;
}

const AlarmDisplay: React.FC<AlarmDisplayProps> = ({ visualSettings }) => {
  const currentTime = useCurrentTime();
  const formattedTime = formatTime(currentTime, visualSettings.timeFormat);
  const formattedDate = formatDate(currentTime);

  const clockSizeClasses = {
    small: 'text-4xl md:text-5xl',
    medium: 'text-5xl md:text-6xl',
    large: 'text-6xl md:text-7xl',
  };

  const fontTypeClasses = {
    digital: 'font-mono', // Tailwind's default mono font
    normal: 'font-sans', // Tailwind's default sans font
  };

  const clockColorClasses = {
    '#007bff': 'text-blue-500',
    '#6c757d': 'text-gray-500',
    '#28a745': 'text-green-500',
    '#dc3545': 'text-red-500',
    '#ffc107': 'text-yellow-500',
    '#17a2b8': 'text-cyan-500',
    '#6f42c1': 'text-purple-500',
    // Add more colors as needed, or map to Tailwind classes
  };

  const getClockColorClass = (color: string) => {
    // This is a simplified mapping. For more robust solution,
    // consider dynamic Tailwind classes or inline styles.
    switch (color) {
      case '#007bff': return 'text-blue-500';
      case '#6c757d': return 'text-gray-500';
      case '#28a745': return 'text-green-500';
      case '#dc3545': return 'text-red-500';
      case '#ffc107': return 'text-yellow-500';
      case '#17a2b8': return 'text-cyan-500';
      case '#6f42c1': return 'text-purple-500';
      default: return 'text-primary'; // Default to primary color
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={cn(
          'font-bold',
          clockSizeClasses[visualSettings.clockSize],
          fontTypeClasses[visualSettings.fontType],
          getClockColorClass(visualSettings.clockColor)
        )}
      >
        {formattedTime}
      </div>
      {visualSettings.showDate && (
        <div className={cn(
          'text-lg md:text-xl mt-2',
          fontTypeClasses[visualSettings.fontType],
          getClockColorClass(visualSettings.clockColor)
        )}>
          {formattedDate}
        </div>
      )}
    </div>
  );
};

export default AlarmDisplay;
