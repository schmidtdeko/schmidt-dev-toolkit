import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, TrendingUp, Users, Clock, Trash2, AlertCircle } from 'lucide-react';
import { 
  getDashboardMetrics, 
  resetTrackingData, 
  isLocalStorageAvailable,
  getDaysSinceFirstVisit,
  getTrackingData 
} from '@/utils/tracking';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Tooltip as UITooltip,
  TooltipContent as UITooltipContent,
  TooltipProvider as UITooltipProvider,
  TooltipTrigger as UITooltipTrigger,
} from '@/components/ui/tooltip';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

export const Dashboard = () => {
  const [metrics, setMetrics] = useState(getDashboardMetrics());
  const [isLocalStorageEnabled, setIsLocalStorageEnabled] = useState(true);
  const [animatedTotalUsage, setAnimatedTotalUsage] = useState(0);
  const [animatedActiveTools, setAnimatedActiveTools] = useState(0);

  useEffect(() => {
    setIsLocalStorageEnabled(isLocalStorageAvailable());
    loadMetrics();
  }, []);

  // Animação de contador
  useEffect(() => {
    const duration = 1000; // 1 segundo
    const steps = 30;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedTotalUsage(Math.floor(metrics.totalUsage * progress));
      setAnimatedActiveTools(Math.floor(metrics.activeTools * progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedTotalUsage(metrics.totalUsage);
        setAnimatedActiveTools(metrics.activeTools);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [metrics.totalUsage, metrics.activeTools]);

  const loadMetrics = () => {
    const newMetrics = getDashboardMetrics();
    setMetrics(newMetrics);
  };

  const handleReset = () => {
    resetTrackingData();
    loadMetrics();
    setAnimatedTotalUsage(0);
    setAnimatedActiveTools(0);
    toast.success('Estatísticas resetadas com sucesso!');
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('pt-BR');
  };

  const formatLoadTime = (seconds: number | null): string => {
    if (seconds === null) return 'N/A';
    if (seconds < 1) return `${(seconds * 1000).toFixed(0)}ms`;
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}m ${secs}s`;
  };

  const formatDaysSince = (firstVisit: string): string => {
    const days = getDaysSinceFirstVisit(firstVisit);
    if (days === 0) return 'Hoje';
    if (days === 1) return 'Há 1 dia';
    return `Há ${days} dias`;
  };

  const trackingData = getTrackingData();
  const mostUsedTool = trackingData 
    ? Object.entries(trackingData.toolUsage)
        .sort((a, b) => b[1].count - a[1].count)[0]
    : null;

  const isFirstVisit = metrics.totalUsage === 0;

  if (!isLocalStorageEnabled) {
    return (
      <div className="space-y-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              LocalStorage Desabilitado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ative o LocalStorage no seu navegador para ver suas estatísticas de uso.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isFirstVisit) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Suas estatísticas de uso</p>
            </div>
          </div>
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Activity className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Bem-vindo ao Schmidt Tools!</CardTitle>
            <CardDescription className="text-base">
              Use uma ferramenta para começar a ver suas estatísticas personalizadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {/* <Button 
              onClick={() => window.location.href = '/percentage-calculator'}
              className="mt-4"
            >
              Explorar Ferramentas
            </Button> */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>O que você vai ver aqui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>📊 Total de vezes que você usou as ferramentas</p>
              <p>🔧 Quais ferramentas você mais utiliza</p>
              <p>📈 Gráficos de distribuição de uso</p>
              <p>⚡ Métricas de performance do site</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Suas estatísticas de uso</p>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Resetar Estatísticas
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Resetar Estatísticas</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza? Isso apagará todo seu histórico de uso das ferramentas. 
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleReset} className="bg-destructive hover:bg-destructive/90">
                Resetar Tudo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <UITooltipProvider>
          <UITooltip>
            <UITooltipTrigger asChild>
              <Card className="cursor-help">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Usos</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(animatedTotalUsage)}</div>
                  <p className="text-xs text-muted-foreground">Todas as ferramentas</p>
                </CardContent>
              </Card>
            </UITooltipTrigger>
            <UITooltipContent>
              <p>Número total de vezes que você usou todas as ferramentas</p>
            </UITooltipContent>
          </UITooltip>

          <UITooltip>
            <UITooltipTrigger asChild>
              <Card className="cursor-help">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ferramentas Ativas</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {animatedActiveTools}/{metrics.totalTools}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Você já usou {animatedActiveTools} ferramentas
                  </p>
                </CardContent>
              </Card>
            </UITooltipTrigger>
            <UITooltipContent>
              <p>Quantas ferramentas diferentes você já experimentou</p>
            </UITooltipContent>
          </UITooltip>

          {metrics.loadTime !== null && (
            <UITooltip>
              <UITooltipTrigger asChild>
                <Card className="cursor-help">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tempo de Carregamento</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatLoadTime(metrics.loadTime)}</div>
                    <p className="text-xs text-muted-foreground">Velocidade do site</p>
                  </CardContent>
                </Card>
              </UITooltipTrigger>
              <UITooltipContent>
                <p>Tempo que o site levou para carregar completamente</p>
              </UITooltipContent>
            </UITooltip>
          )}

          <UITooltip>
            <UITooltipTrigger asChild>
              <Card className="cursor-help">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Primeira Visita</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatDaysSince(metrics.firstVisit)}</div>
                  <p className="text-xs text-muted-foreground">Usando Schmidt Tools</p>
                </CardContent>
              </Card>
            </UITooltipTrigger>
            <UITooltipContent>
              <p>Há quanto tempo você está usando o Schmidt Tools</p>
            </UITooltipContent>
          </UITooltip>
        </UITooltipProvider>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ferramentas Mais Usadas</CardTitle>
            <CardDescription>Top 6 por número de usos</CardDescription>
          </CardHeader>
          <CardContent>
            {metrics.topTools.length > 0 && metrics.topTools.some(t => t.count > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics.topTools.filter(t => t.count > 0)}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    className="fill-foreground"
                  />
                  <YAxis className="fill-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-center">
                <div>
                  <Activity className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Comece usando uma ferramenta!
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Uso</CardTitle>
            <CardDescription>Proporção por ferramenta</CardDescription>
          </CardHeader>
          <CardContent>
            {metrics.topTools.length > 0 && metrics.topTools.some(t => t.count > 0) ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={metrics.topTools.filter(t => t.count > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {metrics.topTools.filter(t => t.count > 0).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-center">
                <div>
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Sem dados ainda
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {mostUsedTool && mostUsedTool[1].count > 0 && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⭐ Sua Ferramenta Favorita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              <span className="font-bold text-primary">
                {mostUsedTool[0].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              {' '}foi usada{' '}
              <span className="font-bold">{mostUsedTool[1].count} vezes</span>
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Sobre o Dashboard</CardTitle>
          <CardDescription>Privacidade e Dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✅ Todos os dados são armazenados localmente no seu navegador</p>
            <p>✅ Nenhuma informação é enviada para servidores externos</p>
            <p>✅ Você pode limpar os dados a qualquer momento</p>
            <p>✅ Os dados persistem entre sessões do navegador</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
