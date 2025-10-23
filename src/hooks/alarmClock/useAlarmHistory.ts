import { useState, useEffect } from 'react';
import { AlarmHistoryItem } from '../../types/alarmClock/alarm.types';

const LOCAL_STORAGE_KEY = 'schmidt-tools-alarm-history';
const MAX_HISTORY_ITEMS = 5;

export const useAlarmHistory = () => {
  const [history, setHistory] = useState<AlarmHistoryItem[]>(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error("Failed to parse alarm history from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save alarm history to localStorage", error);
    }
  }, [history]);

  const addAlarmToHistory = (time: string) => {
    const newItem: AlarmHistoryItem = {
      id: Date.now().toString(),
      time,
      triggeredAt: new Date().toISOString(),
    };
    setHistory((prevHistory) => {
      const updatedHistory = [newItem, ...prevHistory].slice(0, MAX_HISTORY_ITEMS);
      return updatedHistory;
    });
  };

  const clearAlarmHistory = () => {
    setHistory([]);
  };

  return { history, addAlarmToHistory, clearAlarmHistory };
};
