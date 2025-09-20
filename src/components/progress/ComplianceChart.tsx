import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendData } from '@/types/checkin';

interface ComplianceChartProps {
  data: TrendData[];
}

export const ComplianceChart = ({ data }: ComplianceChartProps) => {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Aderência aos Suplementos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Não há dados de aderência para mostrar.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Complete seus check-ins para visualizar sua aderência aos suplementos.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map(item => ({
    week: `S${item.week}`,
    compliance: Math.round(item.compliance_percentage || 0),
  }));

  const getBarColor = (value: number) => {
    if (value >= 85) return 'hsl(var(--success))';
    if (value >= 70) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const averageCompliance = chartData.reduce((sum, item) => sum + item.compliance, 0) / chartData.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{label}</p>
          <p style={{ color: payload[0].color }}>
            Aderência: {value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Aderência aos Suplementos
          <div className="flex gap-2">
            <Badge 
              className={
                averageCompliance >= 85 
                  ? 'bg-success/10 text-success border-success/20'
                  : averageCompliance >= 70
                  ? 'bg-warning/10 text-warning border-warning/20'
                  : 'bg-destructive/10 text-destructive border-destructive/20'
              }
            >
              Média: {Math.round(averageCompliance)}%
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="week" 
                className="text-muted-foreground"
              />
              <YAxis 
                domain={[0, 100]}
                className="text-muted-foreground"
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="compliance" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.compliance)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Compliance Legend */}
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success"></div>
            <span>Excelente (85%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <span>Bom (70-84%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <span>Baixo (&lt;70%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};