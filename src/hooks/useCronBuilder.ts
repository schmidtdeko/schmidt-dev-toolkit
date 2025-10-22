import { useState, useEffect } from 'react';

// Tipos serão definidos em types/cron.types.ts posteriormente
type CronField = string;

interface CronState {
  minute: CronField;
  hour: CronField;
  dayOfMonth: CronField;
  month: CronField;
  dayOfWeek: CronField;
}

export const useCronBuilder = () => {
  const [cronState, setCronState] = useState<CronState>({
    minute: '*',
    hour: '*',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
  });

  const [expression, setExpression] = useState('');

  useEffect(() => {
    const { minute, hour, dayOfMonth, month, dayOfWeek } = cronState;
    const newExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setExpression(newExpression.trim());
  }, [cronState]);

  return {
    cronState,
    setCronState,
    expression,
  };
};
