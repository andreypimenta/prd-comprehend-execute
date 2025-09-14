// components/dashboard/DashboardOverview.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DonutChart } from '@/components/charts/DonutChart';
import { ProgressRing } from '@/components/charts/ProgressRing';
import type { DashboardData } from '@/types/dashboard';
import { TrendingUp, Target, Brain, Users } from 'lucide-react';

interface DashboardOverviewProps {
  data: DashboardData;
}

export function DashboardOverview({ data }: DashboardOverviewProps) {
  const { recommendations, analysis } = data;

  const categoryData = recommendations.categories.map(cat => ({
    label: cat.category,
    value: cat.count,
    color: cat.color
  }));

  const priorityData = [
    {
      label: 'Alta Prioridade',
      value: recommendations.highPriority,
      color: 'hsl(142, 76%, 36%)'
    },
    {
      label: 'Média Prioridade', 
      value: recommendations.mediumPriority,
      color: 'hsl(48, 96%, 53%)'
    },
    {
      label: 'Baixa Prioridade',
      value: recommendations.lowPriority,
      color: 'hsl(220, 13%, 69%)'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Score Geral */}
      <Card className="lg:col-span-1">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-lg">Score Geral</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <ProgressRing
            value={analysis.totalScore}
            size={120}
            strokeWidth={10}
            color="hsl(var(--primary))"
          />
          
          <div className="grid grid-cols-1 gap-3 w-full text-center">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Alta Prioridade</span>
              <Badge variant="default" className="bg-green-500">
                {recommendations.highPriority}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Confiança Média</span>
              <Badge variant="secondary">
                {Math.round(recommendations.averageConfidence)}%
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total de Suplementos</span>
              <Badge variant="outline">
                {recommendations.total}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição por Categoria */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Distribuição por Categoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DonutChart
            data={categoryData}
            centerText={`${recommendations.total} Total`}
            size={180}
          />
        </CardContent>
      </Card>

      {/* Distribuição por Prioridade */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Distribuição por Prioridade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {priorityData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{item.value}</span>
                  <Badge 
                    variant={item.label.includes('Alta') ? 'default' : item.label.includes('Média') ? 'secondary' : 'outline'}
                    className={item.label.includes('Alta') ? 'bg-green-500' : ''}
                  >
                    {Math.round((item.value / recommendations.total) * 100)}%
                  </Badge>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(item.value / recommendations.total) * 100}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Principais Recomendações */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Principais Recomendações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.supplements.slice(0, 3).map((rec, index) => (
              <div key={rec.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </span>
                    <Badge variant="default" className="bg-green-500">
                      {rec.confidence}%
                    </Badge>
                  </div>
                </div>
                
                <h4 className="font-semibold text-base mb-2">{rec.supplement.name}</h4>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {rec.reasoning}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {rec.recommendedDosage} {rec.supplement.category === 'vitamin' ? 'UI' : 'mg'}
                  </span>
                  <span className="text-muted-foreground">
                    {rec.supplement.timing === 'morning' ? 'Pela manhã' : 
                     rec.supplement.timing === 'evening' ? 'À noite' : 'Com refeição'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}