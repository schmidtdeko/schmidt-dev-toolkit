import { Alarm } from '../../types/alarmClock/alarm.types';
import { playAlarmSound, stopAlarmSound, getAlarmSounds } from './audioManager';

let activeAlarm: Alarm | null = null;
let alarmTimeoutId: NodeJS.Timeout | null = null;
let onAlarmTriggerCallback: ((alarm: Alarm) => void) | null = null;
let onAlarmStopCallback: (() => void) | null = null;

export const setAlarm = (alarm: Alarm) => {
  clearAlarm(); // Clear any existing alarm first
  activeAlarm = { ...alarm, isEnabled: true };

  scheduleAlarm(activeAlarm);
};

export const clearAlarm = () => {
  if (alarmTimeoutId) {
    clearTimeout(alarmTimeoutId);
    alarmTimeoutId = null;
  }
  stopAlarmSound();
  activeAlarm = null;
  if (onAlarmStopCallback) {
    onAlarmStopCallback();
  }
};

export const getActiveAlarm = (): Alarm | null => activeAlarm;

export const setAlarmTriggerCallback = (callback: (alarm: Alarm) => void) => {
  onAlarmTriggerCallback = callback;
};

export const setAlarmStopCallback = (callback: () => void) => {
  onAlarmStopCallback = callback;
};

const scheduleAlarm = (alarm: Alarm) => {
  const now = new Date();
  const [alarmHour, alarmMinute] = alarm.time.split(':').map(Number);

  let alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmHour, alarmMinute, 0);

  // If the alarm time is in the past, schedule it for the next day
  if (alarmTime.getTime() <= now.getTime()) {
    alarmTime.setDate(alarmTime.getDate() + 1);
  }

  const timeToAlarm = alarmTime.getTime() - now.getTime();

  if (timeToAlarm > 0) {
    alarmTimeoutId = setTimeout(() => {
      triggerAlarm(alarm);
    }, timeToAlarm);
    console.log(`Alarme agendado para ${alarmTime.toLocaleString()}`);
  } else {
    console.error("Erro: Tempo para o alarme é inválido.");
  }
};

const triggerAlarm = (alarm: Alarm) => {
  if (!alarm.isEnabled) return;

  const sound = getAlarmSounds().find(s => s.id === alarm.soundId);
  if (sound) {
    playAlarmSound(sound.file, alarm.volume, alarm.loop);
  }

  if (alarm.vibration && navigator.vibrate) {
    navigator.vibrate([500, 200, 500, 200, 500]); // Vibrate pattern
  }

  if (onAlarmTriggerCallback) {
    onAlarmTriggerCallback(alarm);
  }

  // Update active alarm to reflect last triggered time
  activeAlarm = { ...alarm, lastTriggered: new Date().toISOString() };
};

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.warn("Este navegador não suporta notificações.");
    return;
  }

  if (Notification.permission === "granted") {
    return;
  }

  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Permissão para notificações concedida.");
    } else {
      console.warn("Permissão para notificações negada.");
    }
  }
};

export const showAlarmNotification = (alarmTime: string) => {
  if (Notification.permission === "granted") {
    new Notification("Alarme - Schmidt Tools", {
      body: `Seu alarme de ${alarmTime} está tocando!`,
      icon: '/favicon.ico', // Use a custom icon
    });
  }
};
