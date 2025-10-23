import React from 'react';
import { Label } from '../../../ui/label';
import { Switch } from '../../../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { VisualSettings } from '../../../../types/alarmClock/alarm.types';

interface VisualSettingsProps {
  visualSettings: VisualSettings;
  onVisualSettingChange: (key: keyof VisualSettings, value: VisualSettings[keyof VisualSettings]) => void;
}

const clockColors = [
  { name: 'Azul', value: '#007bff' },
  { name: 'Cinza', value: '#6c757d' },
  { name: 'Verde', value: '#28a745' },
  { name: 'Vermelho', value: '#dc3545' },
  { name: 'Amarelo', value: '#ffc107' },
  { name: 'Ciano', value: '#17a2b8' },
  { name: 'Roxo', value: '#6f42c1' },
];

const VisualSettingsComponent: React.FC<VisualSettingsProps> = ({ visualSettings, onVisualSettingChange }) => {
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">Personalização Visual</h3>

      <div className="flex items-center justify-between">
        <Label htmlFor="dark-mode-toggle">Modo Escuro</Label>
        <Switch
          id="dark-mode-toggle"
          checked={visualSettings.theme === 'dark'}
          onCheckedChange={(checked) => onVisualSettingChange('theme', checked ? 'dark' : 'light')}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="clock-color-select">Cor do Relógio</Label>
        <Select
          value={visualSettings.clockColor}
          onValueChange={(value) => onVisualSettingChange('clockColor', value)}
        >
          <SelectTrigger id="clock-color-select">
            <SelectValue placeholder="Selecione uma cor" />
          </SelectTrigger>
          <SelectContent>
            {clockColors.map((color) => (
              <SelectItem key={color.value} value={color.value}>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }}></span>
                  {color.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="clock-size-select">Tamanho do Relógio</Label>
        <Select
          value={visualSettings.clockSize}
          onValueChange={(value: 'small' | 'medium' | 'large') => onVisualSettingChange('clockSize', value)}
        >
          <SelectTrigger id="clock-size-select">
            <SelectValue placeholder="Selecione o tamanho" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Pequeno</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="large">Grande</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="font-type-select">Tipo de Fonte</Label>
        <Select
          value={visualSettings.fontType}
          onValueChange={(value: 'digital' | 'normal') => onVisualSettingChange('fontType', value)}
        >
          <SelectTrigger id="font-type-select">
            <SelectValue placeholder="Selecione o tipo de fonte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="digital">Digital</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-date-toggle">Mostrar Data</Label>
        <Switch
          id="show-date-toggle"
          checked={visualSettings.showDate}
          onCheckedChange={(checked) => onVisualSettingChange('showDate', checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="time-format-select">Formato da Hora</Label>
        <Select
          value={visualSettings.timeFormat}
          onValueChange={(value: '12h' | '24h') => onVisualSettingChange('timeFormat', value)}
        >
          <SelectTrigger id="time-format-select" className="w-[100px]">
            <SelectValue placeholder="Formato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">24h</SelectItem>
            <SelectItem value="12h">12h</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default VisualSettingsComponent;
