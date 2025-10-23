export type AlarmSound = {
  id: string;
  name: string;
  file: string;
};

export type Alarm = {
  id: string;
  time: string; // HH:MM
  isEnabled: boolean;
  soundId: string;
  volume: number; // 0-1
  loop: boolean;
  vibration: boolean;
  createdAt: string; // ISO string
  lastTriggered?: string; // ISO string
};

export type AlarmHistoryItem = {
  id: string;
  time: string; // HH:MM
  triggeredAt: string; // ISO string
};
