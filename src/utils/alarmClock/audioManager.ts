import { AlarmSound } from '../../types/alarmClock/alarm.types';

// Placeholder for actual sound files. In a real app, these would be imported or fetched.
// For now, we'll use simple audio files or generate them.
const alarmSounds: AlarmSound[] = [
  { id: 'bell', name: 'Sino', file: '/sounds/bell.mp3' },
  { id: 'chime', name: 'Carrilhão', file: '/sounds/chime.mp3' },
  { id: 'alarm', name: 'Alarme Clássico', file: '/sounds/alarm.mp3' },
];

let currentAudio: HTMLAudioElement | null = null;

export const getAlarmSounds = (): AlarmSound[] => alarmSounds;

export const playAlarmSound = (soundFile: string, volume: number, loop: boolean) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(soundFile);
  currentAudio.volume = volume;
  currentAudio.loop = loop;
  currentAudio.play().catch(e => console.error("Erro ao tocar o som do alarme:", e));
};

export const stopAlarmSound = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

export const testAlarmSound = (soundFile: string, volume: number) => {
  console.log(`Testando som: ${soundFile} com volume: ${volume}`);
  const testAudio = new Audio(soundFile);
  testAudio.volume = volume;
  testAudio.play().catch(e => console.error("Erro ao testar o som do alarme:", e));
};
