import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendData } from '@/types/checkin';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SymptomTrendsProps {
  data: TrendData[];
}

export const SymptomTrends = ({ data }: SymptomTrendsProps) => {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tendências dos Sintomas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Não há dados suficientes para mostrar tendências.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Complete mais check-ins para ver seus gráficos de progresso.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatXAxisLabel = (value: string) => {
    try {
      return format(new Date(value), 'dd/MM', { locale: ptBR });
    } catch {
      return `S${value}`;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium mb-2">
            Semana {label} - {formatXAxisLabel(payload[0]?.payload?.date || '')}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}/10
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Main Symptoms Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Tendências dos Sintomas Principais
            <Badge variant="outline">{data.length} semanas</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="week" 
                  tickFormatter={(value) => `S${value}`}
                  className="text-muted-foreground"
                />
                <YAxis 
                  domain={[1, 10]} 
                  className="text-muted-foreground"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="energy_level" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Energia"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="fatigue_level" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Fadiga"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood_level" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Humor"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="sleep_quality" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="Sono"
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Stress and Focus Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Estresse e Concentração</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="week" 
                  tickFormatter={(value) => `S${value}`}
                  className="text-muted-foreground"
                />
                <YAxis 
                  domain={[1, 10]} 
                  className="text-muted-foreground"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="stress_level" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={2}
                  name="Estresse"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="focus_level" 
                  stroke="hsl(var(--info))" 
                  strokeWidth={2}
                  name="Foco"
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};