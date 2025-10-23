import { useState, useEffect, useCallback } from 'react';
import { Alarm } from '../../types/alarmClock/alarm.types';
import { getAlarmSounds, stopAlarmSound } from '../../utils/alarmClock/audioManager';
import {
  setAlarm as setGlobalAlarm,
  clearAlarm as clearGlobalAlarm,
  getActiveAlarm,
  setAlarmTriggerCallback,
  setAlarmStopCallback,
  requestNotificationPermission,
  showAlarmNotification,
} from '../../utils/alarmClock/alarmManager';
import { useAlarmHistory } from './useAlarmHistory';


export const useAlarm = () => {
  const alarmSounds = getAlarmSounds();
  const defaultSound = alarmSounds[0]?.id || '';

  const [currentAlarm, setCurrentAlarm] = useState<Alarm | null>(getActiveAlarm());
  const [isAlarmTriggered, setIsAlarmTriggered] = useState(false);
  const [selectedHour, _setSelectedHour] = useState(new Date().getHours().toString().padStart(2, '0'));
  const [selectedMinute, _setSelectedMinute] = useState(new Date().getMinutes().toString().padStart(2, '0'));
  const [selectedSoundId, setSelectedSoundId] = useState(defaultSound);
  const [volume, setVolume] = useState(0.5);
  const [loop, setLoop] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [showDate, setShowDate] = useState(true); // Manter showDate como configuração funcional
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('24h'); // Manter timeFormat como funcional
  const [isTestingSound, setIsTestingSound] = useState(false); // Novo estado para feedback visual
  const [selectedQuickTime, setSelectedQuickTime] = useState<string | null>(null); // Novo estado para horário rápido selecionado

  const { history, addAlarmToHistory, clearAlarmHistory } = useAlarmHistory();

  // Load functional settings from localStorage on mount
  useEffect(() => {
    try {
      const storedAlarmSettings = localStorage.getItem('schmidt-tools-alarm-settings');
      if (storedAlarmSettings) {
        const { soundId, volume, loop, vibration, showDate, timeFormat } = JSON.parse(storedAlarmSettings);
        setSelectedSoundId(soundId || defaultSound);
        setVolume(volume !== undefined ? volume : 0.5);
        setLoop(loop !== undefined ? loop : true);
        setVibration(vibration !== undefined ? vibration : true);
        setShowDate(showDate !== undefined ? showDate : true);
        setTimeFormat(timeFormat !== undefined ? timeFormat : '24h');
      }
      // Limpar configurações visuais antigas do localStorage
      localStorage.removeItem('schmidt-tools-alarm-visual-settings');
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
      localStorage.removeItem('schmidt-tools-alarm-visual-settings'); // Garantir limpeza
    }
  }, [defaultSound]);

  // Save functional settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('schmidt-tools-alarm-settings', JSON.stringify({ selectedSoundId, volume, loop, vibration, showDate, timeFormat }));
    } catch (error) {
      console.error("Failed to save alarm settings to localStorage", error);
    }
  }, [selectedSoundId, volume, loop, vibration, showDate, timeFormat, selectedQuickTime]);


  const handleAlarmTrigger = useCallback((alarm: Alarm) => {
    setIsAlarmTriggered(true);
    showAlarmNotification(alarm.time);
    addAlarmToHistory(alarm.time);
    setCurrentAlarm(alarm); // Update currentAlarm with lastTriggered
  }, [addAlarmToHistory]);

  const handleAlarmStop = useCallback(() => {
    setIsAlarmTriggered(false);
    setCurrentAlarm(null);
  }, []);

  useEffect(() => {
    setAlarmTriggerCallback(handleAlarmTrigger);
    setAlarmStopCallback(handleAlarmStop);
    // Request notification permission on initial load
    requestNotificationPermission();

    // Check if there's an active alarm already set (e.g., after a refresh)
    const active = getActiveAlarm();
    if (active) {
      setCurrentAlarm(active);
      // Re-schedule if needed (though alarmManager should handle this)
    }

    return () => {
      setAlarmTriggerCallback(null);
      setAlarmStopCallback(null);
    };
  }, [handleAlarmTrigger, handleAlarmStop]);

  const setAlarmTime = useCallback(() => {
    if (currentAlarm && currentAlarm.isEnabled) {
      // If an alarm is already set, clear it
      clearGlobalAlarm();
      setCurrentAlarm(null);
    } else {
      const newAlarm: Alarm = {
        id: Date.now().toString(),
        time: `${selectedHour}:${selectedMinute}`,
        isEnabled: true,
        soundId: selectedSoundId,
        volume,
        loop,
        vibration,
        createdAt: new Date().toISOString(),
      };
      setGlobalAlarm(newAlarm);
      setCurrentAlarm(newAlarm);
      setSelectedQuickTime(null); // Limpar seleção de horário rápido ao ativar alarme
    }
  }, [currentAlarm, selectedHour, selectedMinute, selectedSoundId, volume, loop, vibration]);

  const stopTriggeredAlarm = useCallback(() => {
    stopAlarmSound();
    clearGlobalAlarm();
    setIsAlarmTriggered(false);
    setCurrentAlarm(null);
  }, []);

  const testAlarmSound = useCallback(() => {
    const sound = alarmSounds.find(s => s.id === selectedSoundId);
    if (sound) {
      setIsTestingSound(true); // Inicia o estado de teste
      const audio = new Audio(sound.file);
      audio.volume = volume;
      audio.play()
        .then(() => {
          // Parar o som após 3 segundos
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
            setIsTestingSound(false); // Finaliza o estado de teste
          }, 3000);
        })
        .catch(e => {
          console.error("Erro ao testar o som:", e);
          setIsTestingSound(false); // Finaliza o estado de teste em caso de erro
        });
    }
  }, [alarmSounds, selectedSoundId, volume]);

  return {
    currentAlarm,
    isAlarmTriggered,
    selectedHour,
    setSelectedHour: useCallback((hour: string) => {
      _setSelectedHour(hour);
      setSelectedQuickTime(null); // Limpar seleção de horário rápido ao modificar manualmente
    }, []),
    selectedMinute,
    setSelectedMinute: useCallback((minute: string) => {
      _setSelectedMinute(minute);
      setSelectedQuickTime(null); // Limpar seleção de horário rápido ao modificar manualmente
    }, []),
    selectedSoundId,
    setSelectedSoundId,
    volume,
    setVolume,
    loop,
    setLoop,
    vibration,
    setVibration,
    alarmSounds,
    setAlarmTime,
    stopTriggeredAlarm,
    testAlarmSound,
    history,
    addAlarmToHistory, // Expose for quick alarms to add to history directly if needed
    clearAlarmHistory,
    showDate,
    setShowDate,
    timeFormat,
    setTimeFormat,
    isTestingSound, // Retornar o novo estado
    selectedQuickTime,
    setSelectedQuickTime,
  };
};
