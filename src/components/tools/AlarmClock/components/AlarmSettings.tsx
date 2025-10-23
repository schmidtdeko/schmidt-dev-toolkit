import React from 'react';
import { Label } from '../../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { Slider } from '../../../ui/slider';
import { Switch } from '../../../ui/switch';
import { AlarmSound } from '../../../../types/alarmClock/alarm.types';
import { Button } from '../../../ui/button';

interface AlarmSettingsProps {
  selectedSoundId: string;
  volume: number;
  loop: boolean;
  vibration: boolean;
  alarmSounds: AlarmSound[];
  onSoundChange: (soundId: string) => void;
  onVolumeChange: (volume: number[]) => void;
  onLoopChange: (checked: boolean) => void;
  onVibrationChange: (checked: boolean) => void;
  onTestSound: () => void;
}

const AlarmSettings: React.FC<AlarmSettingsProps> = ({
  selectedSoundId,
  volume,
  loop,
  vibration,
  alarmSounds,
  onSoundChange,
  onVolumeChange,
  onLoopChange,
  onVibrationChange,
  onTestSound,
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Configurações do Alarme</h3>

      <div className="grid gap-2">
        <Label htmlFor="alarm-sound">Som do Alarme</Label>
        <Select value={selectedSoundId} onValueChange={onSoundChange}>
          <SelectTrigger id="alarm-sound">
            <SelectValue placeholder="Selecione um som" />
          </SelectTrigger>
          <SelectContent>
            {alarmSounds.map((sound) => (
              <SelectItem key={sound.id} value={sound.id}>
                {sound.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={onTestSound} variant="outline" size="sm" className="mt-2">
          Testar Som
        </Button>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="volume-control">Volume ({Math.round(volume * 100)}%)</Label>
        <Slider
          id="volume-control"
          min={0}
          max={1}
          step={0.01}
          value={[volume]}
          onValueChange={onVolumeChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="loop-alarm">Repetir Alarme</Label>
        <Switch id="loop-alarm" checked={loop} onCheckedChange={onLoopChange} />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="vibration-alarm">Vibrar</Label>
        <Switch id="vibration-alarm" checked={vibration} onCheckedChange={onVibrationChange} />
      </div>
    </div>
  );
};

export default AlarmSettings;
