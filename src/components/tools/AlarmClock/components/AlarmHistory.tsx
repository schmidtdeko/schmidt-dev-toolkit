import React from 'react';
import { Button } from '../../../ui/button';
import { AlarmHistoryItem } from '../../../../types/alarmClock/alarm.types';
import { getRelativeTime } from '../../../../utils/alarmClock/timeFormatter';

interface AlarmHistoryProps {
  history: AlarmHistoryItem[];
  onReuseAlarm: (time: string) => void;
  onClearHistory: () => void;
}

const AlarmHistory: React.FC<AlarmHistoryProps> = ({ history, onReuseAlarm, onClearHistory }) => {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Histórico de Alarmes</h3>
      {history.length === 0 ? (
        <p className="text-muted-foreground">Nenhum alarme no histórico.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div>
                <span className="font-medium">{item.time}</span>
                <span className="text-sm text-muted-foreground ml-2">({getRelativeTime(item.triggeredAt)})</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => onReuseAlarm(item.time)}>
                Reutilizar
              </Button>
            </li>
          ))}
        </ul>
      )}
      {history.length > 0 && (
        <Button variant="destructive" onClick={onClearHistory} className="mt-2">
          Limpar Histórico
        </Button>
      )}
    </div>
  );
};

export default AlarmHistory;
