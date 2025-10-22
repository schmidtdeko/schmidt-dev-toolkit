import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCronBuilder } from '@/hooks/useCronBuilder';
import { CopyButton } from '@/components/CopyButton';
import { translateCronExpression } from '@/utils/cronTranslator';
import { cronTemplates, getTemplatesByCategory } from '@/utils/cronTemplates';
import { BookTemplate } from 'lucide-react';

const CronBuilder: React.FC = () => {
  const { cronState, setCronState, expression } = useCronBuilder();
  const [translation, setTranslation] = useState('');
  
  const [minuteMode, setMinuteMode] = useState('every');
  const [minuteValue, setMinuteValue] = useState('');
  
  const [hourMode, setHourMode] = useState('every');
  const [hourValue, setHourValue] = useState('');
  
  const [dayMode, setDayMode] = useState('every');
  const [dayValue, setDayValue] = useState('');
  
  const [monthMode, setMonthMode] = useState('every');
  const [monthValue, setMonthValue] = useState('');
  
  const [weekdayMode, setWeekdayMode] = useState('every');
  const [weekdayValue, setWeekdayValue] = useState('');

  useEffect(() => {
    let minuteExpression = '*';
    if (minuteMode === 'specific') {
      minuteExpression = minuteValue || '0';
    } else if (minuteMode === 'every-x') {
      minuteExpression = `*/${minuteValue || '1'}`;
    }
    setCronState(prev => ({ ...prev, minute: minuteExpression }));
  }, [minuteMode, minuteValue, setCronState]);

  useEffect(() => {
    let hourExpression = '*';
    if (hourMode === 'specific') {
      hourExpression = hourValue || '0';
    } else if (hourMode === 'every-x') {
      hourExpression = `*/${hourValue || '1'}`;
    }
    setCronState(prev => ({ ...prev, hour: hourExpression }));
  }, [hourMode, hourValue, setCronState]);

  useEffect(() => {
    let dayExpression = '*';
    if (dayMode === 'specific') {
      dayExpression = dayValue || '1';
    } else if (dayMode === 'last-day') {
      dayExpression = 'L';
    } else if (dayMode === 'weekday') {
      dayExpression = `${dayValue || '1'}W`;
    }
    setCronState(prev => ({ ...prev, dayOfMonth: dayExpression }));
  }, [dayMode, dayValue, setCronState]);

  useEffect(() => {
    let monthExpression = '*';
    if (monthMode === 'specific') {
      monthExpression = monthValue || '1';
    }
    setCronState(prev => ({ ...prev, month: monthExpression }));
  }, [monthMode, monthValue, setCronState]);

  useEffect(() => {
    let weekdayExpression = '*';
    if (weekdayMode === 'specific') {
      weekdayExpression = weekdayValue || '0';
    } else if (weekdayMode === 'weekdays') {
      weekdayExpression = '1-5';
    }
    setCronState(prev => ({ ...prev, dayOfWeek: weekdayExpression }));
  }, [weekdayMode, weekdayValue, setCronState]);

  useEffect(() => {
    if (expression) {
      const translated = translateCronExpression(expression);
      setTranslation(translated);
    }
  }, [expression]);

  const handleTemplateClick = (templateExpression: string) => {
    // Parsear a expressão do template e atualizar os campos
    const parts = templateExpression.split(' ');
    if (parts.length === 5) {
      const [min, hr, day, mon, wkday] = parts;
      
      // Atualizar minuto
      if (min === '*') {
        setMinuteMode('every');
        setMinuteValue('');
      } else if (min.startsWith('*/')) {
        setMinuteMode('every-x');
        setMinuteValue(min.substring(2));
      } else {
        setMinuteMode('specific');
        setMinuteValue(min);
      }
      
      // Atualizar hora
      if (hr === '*') {
        setHourMode('every');
        setHourValue('');
      } else if (hr.startsWith('*/')) {
        setHourMode('every-x');
        setHourValue(hr.substring(2));
      } else {
        setHourMode('specific');
        setHourValue(hr);
      }
      
      // Atualizar dia do mês
      if (day === '*') {
        setDayMode('every');
        setDayValue('');
      } else if (day === 'L') {
        setDayMode('last-day');
        setDayValue('');
      } else if (day.endsWith('W')) {
        setDayMode('weekday');
        setDayValue(day.substring(0, day.length - 1));
      } else {
        setDayMode('specific');
        setDayValue(day);
      }
      
      // Atualizar mês
      if (mon === '*') {
        setMonthMode('every');
        setMonthValue('');
      } else {
        setMonthMode('specific');
        setMonthValue(mon);
      }
      
      // Atualizar dia da semana
      if (wkday === '*') {
        setWeekdayMode('every');
        setWeekdayValue('');
      } else if (wkday === '1-5') {
        setWeekdayMode('weekdays');
        setWeekdayValue('');
      } else {
        setWeekdayMode('specific');
        setWeekdayValue(wkday);
      }
    }
  };

  const templatesByCategory = getTemplatesByCategory();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Cron Expression Builder</h1>
        <p className="text-muted-foreground">
          Crie, valide e teste expressões cron visualmente.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Construtor Visual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Minuto */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <Label htmlFor="minutes" className="md:text-right">Minuto</Label>
                <div className="md:col-span-2">
                  <Select value={minuteMode} onValueChange={setMinuteMode}>
                    <SelectTrigger id="minutes">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="every">A cada minuto (*)</SelectItem>
                      <SelectItem value="specific">Minuto Específico</SelectItem>
                      <SelectItem value="range">Intervalo</SelectItem>
                      <SelectItem value="every-x">A cada X minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  {(minuteMode === 'specific' || minuteMode === 'every-x') && (
                    <Input 
                      type="number"
                      value={minuteValue}
                      onChange={(e) => setMinuteValue(e.target.value)}
                      placeholder={minuteMode === 'specific' ? '0-59' : '1-59'}
                    />
                  )}
                </div>
              </div>

              {/* Hora */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <Label htmlFor="hours" className="md:text-right">Hora</Label>
                <div className="md:col-span-2">
                  <Select value={hourMode} onValueChange={setHourMode}>
                    <SelectTrigger id="hours">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="every">A cada hora (*)</SelectItem>
                      <SelectItem value="specific">Hora Específica</SelectItem>
                      <SelectItem value="every-x">A cada X horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  {(hourMode === 'specific' || hourMode === 'every-x') && (
                    <Input 
                      type="number"
                      value={hourValue}
                      onChange={(e) => setHourValue(e.target.value)}
                      placeholder={hourMode === 'specific' ? '0-23' : '1-23'}
                      min="0"
                      max="23"
                    />
                  )}
                </div>
              </div>

              {/* Dia do Mês */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <Label htmlFor="day-month" className="md:text-right">Dia do Mês</Label>
                <div className="md:col-span-2">
                  <Select value={dayMode} onValueChange={setDayMode}>
                    <SelectTrigger id="day-month">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="every">Todo dia (*)</SelectItem>
                      <SelectItem value="specific">Dia Específico</SelectItem>
                      <SelectItem value="last-day">Último dia do mês (L)</SelectItem>
                      <SelectItem value="weekday">Dia útil mais próximo (W)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  {(dayMode === 'specific' || dayMode === 'weekday') && (
                    <Input 
                      type="number"
                      value={dayValue}
                      onChange={(e) => setDayValue(e.target.value)}
                      placeholder="1-31"
                      min="1"
                      max="31"
                    />
                  )}
                </div>
              </div>

              {/* Mês */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <Label htmlFor="month" className="md:text-right">Mês</Label>
                <div className="md:col-span-2">
                  <Select value={monthMode} onValueChange={setMonthMode}>
                    <SelectTrigger id="month">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="every">Todo mês (*)</SelectItem>
                      <SelectItem value="specific">Mês Específico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  {monthMode === 'specific' && (
                    <Select value={monthValue} onValueChange={setMonthValue}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o mês..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Janeiro</SelectItem>
                        <SelectItem value="2">Fevereiro</SelectItem>
                        <SelectItem value="3">Março</SelectItem>
                        <SelectItem value="4">Abril</SelectItem>
                        <SelectItem value="5">Maio</SelectItem>
                        <SelectItem value="6">Junho</SelectItem>
                        <SelectItem value="7">Julho</SelectItem>
                        <SelectItem value="8">Agosto</SelectItem>
                        <SelectItem value="9">Setembro</SelectItem>
                        <SelectItem value="10">Outubro</SelectItem>
                        <SelectItem value="11">Novembro</SelectItem>
                        <SelectItem value="12">Dezembro</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Dia da Semana */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <Label htmlFor="day-week" className="md:text-right">Dia da Semana</Label>
                <div className="md:col-span-2">
                  <Select value={weekdayMode} onValueChange={setWeekdayMode}>
                    <SelectTrigger id="day-week">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="every">Todo dia da semana (*)</SelectItem>
                      <SelectItem value="specific">Dia Específico</SelectItem>
                      <SelectItem value="weekdays">Dias úteis (1-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  {weekdayMode === 'specific' && (
                    <Select value={weekdayValue} onValueChange={setWeekdayValue}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o dia..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Domingo</SelectItem>
                        <SelectItem value="1">Segunda-feira</SelectItem>
                        <SelectItem value="2">Terça-feira</SelectItem>
                        <SelectItem value="3">Quarta-feira</SelectItem>
                        <SelectItem value="4">Quinta-feira</SelectItem>
                        <SelectItem value="5">Sexta-feira</SelectItem>
                        <SelectItem value="6">Sábado</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resultado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-md flex items-center justify-between">
                <code className="font-mono text-lg">{expression}</code>
                <CopyButton text={expression} />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Tradução</h4>
                <p className="text-sm">
                  {translation || 'Configure os campos acima para gerar a expressão cron'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Templates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookTemplate className="h-5 w-5" />
            Templates Prontos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={Object.keys(templatesByCategory)[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {Object.keys(templatesByCategory).map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(templatesByCategory).map(([category, templates]) => (
              <TabsContent key={category} value={category}>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className="tool-card p-4 hover:border-primary/50 transition-all"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{template.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {category}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {template.description}
                            </p>
                            <code className="text-xs bg-muted px-2 py-1 rounded">
                              {template.expression}
                            </code>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleTemplateClick(template.expression)}
                          >
                            Usar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CronBuilder;
