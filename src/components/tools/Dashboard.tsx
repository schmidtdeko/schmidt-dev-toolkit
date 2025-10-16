import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, TrendingUp, Users, Clock } from 'lucide-react';

interface ToolUsage {
  name: string;
  count: number;
}

interface UsageStats {
  totalUsage: number;
  activeTools: number;
  avgSessionTime: string;
  topTools: ToolUsage[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

export const Dashboard = () => {
  const [stats, setStats] = useState<UsageStats>({
    totalUsage: 0,
    activeTools: 12,
    avgSessionTime: '0m',
    topTools: []
  });

  useEffect(() => {
    const usageData = localStorage.getItem('schmidtToolsUsage');
    if (usageData) {
      const parsed = JSON.parse(usageData);
      const topTools = Object.entries(parsed.tools || {})
        .map(([name, count]) => ({ name, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);
      
      const totalUsage = topTools.reduce((sum, tool) => sum + tool.count, 0);
      
      setStats({
        totalUsage,
        activeTools: Object.keys(parsed.tools || {}).length,
        avgSessionTime: parsed.avgSessionTime || '5m',
        topTools
      });
    } else {
      const mockData = [
        { name: 'Gerador CPF', count: 45 },
        { name: 'Formatador JSON', count: 38 },
        { name: 'Senhas', count: 32 },
        { name: 'Hash Calculator', count: 28 },
        { name: 'UUID', count: 22 },
        { name: 'Validador', count: 18 }
      ];
      
      setStats({
        totalUsage: 183,
        activeTools: 12,
        avgSessionTime: '5m',
        topTools: mockData
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Activity className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral de uso das ferramentas</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsage}</div>
            <p className="text-xs text-muted-foreground">Todas as ferramentas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ferramentas Ativas</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTools}</div>
            <p className="text-xs text-muted-foreground">Disponíveis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgSessionTime}</div>
            <p className="text-xs text-muted-foreground">Por sessão</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Navegador local</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ferramentas Mais Usadas</CardTitle>
            <CardDescription>Top 6 por número de usos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topTools}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Uso</CardTitle>
            <CardDescription>Proporção por ferramenta</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.topTools}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.topTools.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sobre o Dashboard</CardTitle>
          <CardDescription>Informações sobre privacidade e dados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✅ Todos os dados são armazenados localmente no seu navegador</p>
            <p>✅ Nenhuma informação é enviada para servidores externos</p>
            <p>✅ Você pode limpar os dados a qualquer momento através das configurações do navegador</p>
            <p>✅ Os dados de uso ajudam a melhorar sua experiência pessoal com as ferramentas</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
