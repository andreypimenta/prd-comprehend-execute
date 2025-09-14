// components/dashboard/ConfidenceChart.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/charts/BarChart';
import type { DashboardData } from '@/types/dashboard';
import { TrendingUp, Award, AlertCircle } from 'lucide-react';

interface ConfidenceChartProps {
  data: DashboardData['recommendations'];
  children?: React.ReactNode;
}

export function ConfidenceChart({ data, children }: ConfidenceChartProps) {
  // Prepare data for confidence distribution chart
  const confidenceRanges = [
    { name: '90-100%', min: 90, max: 100, count: 0, color: 'hsl(142, 76%, 36%)' },
    { name: '80-89%', min: 80, max: 89, count: 0, color: 'hsl(100, 60%, 45%)' },
    { name: '70-79%', min: 70, max: 79, count: 0, color: 'hsl(60, 90%, 50%)' },
    { name: '60-69%', min: 60, max: 69, count: 0, color: 'hsl(30, 90%, 55%)' },
    { name: '< 60%', min: 0, max: 59, count: 0, color: 'hsl(0, 75%, 60%)' }
  ];

  // This would normally come from the supplements data, but we'll simulate it
  const simulatedConfidences = [95, 88, 82, 75, 70, 68, 62, 55]; // Mock data
  
  simulatedConfidences.forEach(confidence => {
    const range = confidenceRanges.find(r => confidence >= r.min && confidence <= r.max);
    if (range) range.count++;
  });

  const chartData = confidenceRanges
    .filter(range => range.count > 0)
    .map(range => ({
      name: range.name,
      value: range.count,
      color: range.color
    }));

  const highConfidenceCount = simulatedConfidences.filter(c => c >= 80).length;
  const averageConfidence = Math.round(data.averageConfidence);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Confidence Distribution Chart */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Distribuição de Confiança
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={chartData} height={250} />
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl font-bold text-green-600">{highConfidenceCount}</div>
              <div className="text-sm text-green-700">Alta Confiança (80%+)</div>
            </div>
            
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{averageConfidence}%</div>
              <div className="text-sm text-blue-700">Confiança Média</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics & Insights */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-500" />
            Análise de Qualidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quality Score */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Score de Qualidade</div>
                <div className="text-2xl font-bold text-primary">
                  {averageConfidence >= 85 ? 'Excelente' : 
                   averageConfidence >= 70 ? 'Bom' : 
                   averageConfidence >= 60 ? 'Regular' : 'Baixo'}
                </div>
              </div>
              <div className="text-3xl font-bold text-primary">{averageConfidence}%</div>
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Distribuição por Prioridade:</h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Alta Prioridade</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: `${(data.highPriority / data.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{data.highPriority}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Média Prioridade</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-yellow-500 rounded-full"
                      style={{ width: `${(data.mediumPriority / data.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{data.mediumPriority}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Baixa Prioridade</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-gray-500 rounded-full"
                      style={{ width: `${(data.lowPriority / data.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{data.lowPriority}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Note */}
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <strong>Dica:</strong> Foque primeiro nos suplementos de alta prioridade com 80%+ de confiança para obter os melhores resultados.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Content */}
      {children}
    </div>
  );
}