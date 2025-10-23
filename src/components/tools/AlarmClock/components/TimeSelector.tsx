import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Label } from '../../../ui/label';
import { Button } from '../../../ui/button';

interface TimeSelectorProps {
  selectedHour: string;
  selectedMinute: string;
  onHourChange: (hour: string) => void;
  onMinuteChange: (minute: string) => void;
  onSetAlarm: () => void;
  onTestSound: () => void;
  isAlarmSet: boolean;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedHour,
  selectedMinute,
  onHourChange,
  onMinuteChange,
  onSetAlarm,
  onTestSound,
  isAlarmSet,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Configurar Alarme</h3>
      <div className="flex gap-4 items-center">
        <div className="flex flex-col gap-2">
          <Label htmlFor="hour-select">Hora</Label>
          <Select value={selectedHour} onValueChange={onHourChange}>
            <SelectTrigger id="hour-select" className="w-[80px]">
              <SelectValue placeholder="HH" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="minute-select">Minuto</Label>
          <Select value={selectedMinute} onValueChange={onMinuteChange}>
            <SelectTrigger id="minute-select" className="w-[80px]">
              <SelectValue placeholder="MM" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>
                  {minute}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={onSetAlarm} variant={isAlarmSet ? 'destructive' : 'default'}>
          {isAlarmSet ? 'Desativar Alarme' : 'Ativar Alarme'}
        </Button>
        <Button onClick={onTestSound} variant="outline">
          Testar Som
        </Button>
      </div>
    </div>
  );
};

export default TimeSelector;
