import React from 'react';
import { useAlarm } from '../../../hooks/alarmClock/useAlarm';
import AlarmDisplay from './components/AlarmDisplay';
import TimeSelector from './components/TimeSelector';
import AlarmSettings from './components/AlarmSettings';
import QuickAlarms from './components/QuickAlarms';
import AlarmHistory from './components/AlarmHistory';
import VisualSettingsComponent from './components/VisualSettings';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Separator } from '../../ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { setAlarm as setGlobalAlarm } from '../../../utils/alarmClock/alarmManager';

const AlarmClock: React.FC = () => {
  const {
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
    addAlarmToHistory, // Used for quick alarms to ensure they are added to history
    clearAlarmHistory,
  } = useAlarm();

  const handleSetQuickAlarm = (hour: string, minute: string) => {
    setSelectedHour(hour);
    setSelectedMinute(minute);
    // Automatically set the alarm when a quick alarm is selected
    const newAlarm = {
      id: Date.now().toString(),
      time: `${hour}:${minute}`,
      isEnabled: true,
      soundId: selectedSoundId,
      volume,
      loop,
      vibration,
      createdAt: new Date().toISOString(),
    };
    setGlobalAlarm(newAlarm); // Use the global setAlarm from alarmManager
    // The useAlarm hook will update its state via the callback
  };

  return (
    <div className={`min-h-screen ${visualSettings.theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto p-4 space-y-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Despertador Online</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <AlarmDisplay visualSettings={visualSettings} />
              <Separator />
              <TimeSelector
                selectedHour={selectedHour}
                selectedMinute={selectedMinute}
                onHourChange={setSelectedHour}
                onMinuteChange={setSelectedMinute}
                onSetAlarm={setAlarmTime}
                onTestSound={testAlarmSound}
                isAlarmSet={!!currentAlarm && currentAlarm.isEnabled}
              />
              <Separator />
              <AlarmSettings
                selectedSoundId={selectedSoundId}
                volume={volume}
                loop={loop}
                vibration={vibration}
                alarmSounds={alarmSounds}
                onSoundChange={setSelectedSoundId}
                onVolumeChange={(val) => setVolume(val[0])}
                onLoopChange={setLoop}
                onVibrationChange={setVibration}
                onTestSound={testAlarmSound}
              />
            </div>
            <div className="space-y-6">
              <QuickAlarms
                onSetQuickAlarm={handleSetQuickAlarm}
                activeAlarmTime={currentAlarm?.isEnabled ? currentAlarm.time : null}
              />
              <Separator />
              <AlarmHistory
                history={history}
                onReuseAlarm={(time) => {
                  const [h, m] = time.split(':');
                  setSelectedHour(h);
                  setSelectedMinute(m);
                  // Optionally, activate the alarm immediately or let the user click "Ativar Alarme"
                  // For now, just set the time in the selectors.
                }}
                onClearHistory={clearAlarmHistory}
              />
              <Separator />
              <VisualSettingsComponent
                visualSettings={visualSettings}
                onVisualSettingChange={handleVisualSettingChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Alarm Triggered Modal */}
        <Dialog open={isAlarmTriggered} onOpenChange={() => { /* Prevent closing by clicking outside */ }}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-red-500 text-2xl">⏰ ALARME!</DialogTitle>
              <DialogDescription>
                Seu alarme de {currentAlarm?.time} está tocando!
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-center text-4xl font-bold">
              {currentAlarm?.time}
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={stopTriggeredAlarm}>
                Desligar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AlarmClock;
