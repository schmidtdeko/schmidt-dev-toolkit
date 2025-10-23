import { useState, useEffect, useCallback } from 'react';
import { Alarm, VisualSettings } from '../../types/alarmClock/alarm.types';
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

const DEFAULT_VISUAL_SETTINGS: VisualSettings = {
  theme: 'light',
  clockColor: '#007bff',
  clockSize: 'medium',
  fontType: 'normal',
  showDate: true,
  timeFormat: '24h',
};

export const useAlarm = () => {
  const alarmSounds = getAlarmSounds();
  const defaultSound = alarmSounds[0]?.id || '';

  const [currentAlarm, setCurrentAlarm] = useState<Alarm | null>(getActiveAlarm());
  const [isAlarmTriggered, setIsAlarmTriggered] = useState(false);
  const [selectedHour, setSelectedHour] = useState(new Date().getHours().toString().padStart(2, '0'));
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes().toString().padStart(2, '0'));
  const [selectedSoundId, setSelectedSoundId] = useState(defaultSound);
  const [volume, setVolume] = useState(0.5);
  const [loop, setLoop] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [visualSettings, setVisualSettings] = useState<VisualSettings>(DEFAULT_VISUAL_SETTINGS);

  const { history, addAlarmToHistory, clearAlarmHistory } = useAlarmHistory();

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const storedVisualSettings = localStorage.getItem('schmidt-tools-alarm-visual-settings');
      if (storedVisualSettings) {
        setVisualSettings(JSON.parse(storedVisualSettings));
      }
      const storedAlarmSettings = localStorage.getItem('schmidt-tools-alarm-settings');
      if (storedAlarmSettings) {
        const { soundId, volume, loop, vibration } = JSON.parse(storedAlarmSettings);
        setSelectedSoundId(soundId || defaultSound);
        setVolume(volume !== undefined ? volume : 0.5);
        setLoop(loop !== undefined ? loop : true);
        setVibration(vibration !== undefined ? vibration : true);
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
    }
  }, [defaultSound]);

  // Save visual settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('schmidt-tools-alarm-visual-settings', JSON.stringify(visualSettings));
    } catch (error) {
      console.error("Failed to save visual settings to localStorage", error);
    }
  }, [visualSettings]);

  // Save alarm settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('schmidt-tools-alarm-settings', JSON.stringify({ selectedSoundId, volume, loop, vibration }));
    } catch (error) {
      console.error("Failed to save alarm settings to localStorage", error);
    }
  }, [selectedSoundId, volume, loop, vibration]);


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
      const audio = new Audio(sound.file);
      audio.volume = volume;
      audio.play().catch(e => console.error("Erro ao testar o som:", e));
    }
  }, [alarmSounds, selectedSoundId, volume]);

  const handleVisualSettingChange = useCallback(
    (key: keyof VisualSettings, value: VisualSettings[keyof VisualSettings]) => {
      setVisualSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return {
    currentAlarm,
    isAlarmTriggered,
    selectedHour,
    setSelectedHour,
    selectedMinute,
    setSelectedMinute,
    selectedSoundId,
    setSelectedSoundId,
    volume,
    setVolume,
    loop,
    setLoop,
    vibration,
    setVibration,
    visualSettings,
    handleVisualSettingChange,
    alarmSounds,
    setAlarmTime,
    stopTriggeredAlarm,
    testAlarmSound,
    history,
    addAlarmToHistory, // Expose for quick alarms to add to history directly if needed
    clearAlarmHistory,
  };
};
