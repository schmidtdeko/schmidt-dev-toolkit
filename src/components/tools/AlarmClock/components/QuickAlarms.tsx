import React from 'react';
import { Button } from '../../../ui/button';
import { cn } from '../../../../lib/utils';

interface QuickAlarmsProps {
  onSetQuickAlarm: (hour: string, minute: string) => void;
  activeAlarmTime: string | null; // HH:MM
}

const quickTimes = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '18:00', '20:00', '22:00',
];

const QuickAlarms: React.FC<QuickAlarmsProps> = ({ onSetQuickAlarm, activeAlarmTime }) => {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Horários Rápidos</h3>
      <div className="grid grid-cols-3 gap-2">
        {quickTimes.map((time) => {
          const [hour, minute] = time.split(':');
          const isActive = activeAlarmTime === time;
          return (
            <Button
              key={time}
              variant={isActive ? 'default' : 'outline'}
              onClick={() => onSetQuickAlarm(hour, minute)}
              className={cn(isActive ? 'bg-primary text-primary-foreground' : '')}
            >
              {time}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAlarms;
