import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressRing } from '@/components/charts/ProgressRing';
import { TrendingUp, TrendingDown, Minus, Calendar, Award } from 'lucide-react';
import { ProgressSummary } from '@/types/checkin';

interface ProgressOverviewProps {
  summary: ProgressSummary;
}

export const ProgressOverview = ({ summary }: ProgressOverviewProps) => {
  const getTrendIcon = (trend: 'improving' | 'stable' | 'worsening') => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'worsening':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: 'improving' | 'stable' | 'worsening') => {
    switch (trend) {
      case 'improving':
        return 'bg-success/10 text-success border-success/20';
      case 'worsening':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const symptoms = [
    { key: 'fatigue_trend', label: 'Fadiga', trend: summary.symptom_trends.fatigue_trend },
    { key: 'energy_trend', label: 'Energia', trend: summary.symptom_trends.energy_trend },
    { key: 'mood_trend', label: 'Humor', trend: summary.symptom_trends.mood_trend },
    { key: 'sleep_trend', label: 'Sono', trend: summary.symptom_trends.sleep_trend },
    { key: 'stress_trend', label: 'Estresse', trend: summary.symptom_trends.stress_trend },
    { key: 'focus_trend', label: 'Foco', trend: summary.symptom_trends.focus_trend },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Overall Progress */}
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Progresso Geral
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="mb-4">
            <ProgressRing
              value={summary.average_compliance}
              size={120}
              strokeWidth={8}
            />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {Math.round(summary.average_compliance)}%
            </p>
            <p className="text-sm text-muted-foreground">Aderência média</p>
          </div>
        </CardContent>
      </Card>

      {/* Check-in Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Estatísticas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Semana atual:</span>
            <Badge variant="secondary">{summary.current_week}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total de check-ins:</span>
            <Badge variant="outline">{summary.total_checkins}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Consistência:</span>
            <Badge 
              className={
                summary.total_checkins >= summary.current_week - 1 
                  ? 'bg-success/10 text-success border-success/20' 
                  : 'bg-warning/10 text-warning border-warning/20'
              }
            >
              {Math.round((summary.total_checkins / Math.max(summary.current_week, 1)) * 100)}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Symptom Trends */}
      <Card className="col-span-full lg:col-span-1">
        <CardHeader>
          <CardTitle>Tendências dos Sintomas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {symptoms.map((symptom) => (
              <div 
                key={symptom.key}
                className="flex items-center justify-between p-3 rounded-lg border bg-card"
              >
                <span className="text-sm font-medium">{symptom.label}</span>
                <Badge 
                  variant="outline" 
                  className={`${getTrendColor(symptom.trend)} flex items-center gap-1`}
                >
                  {getTrendIcon(symptom.trend)}
                  <span className="text-xs capitalize">
                    {symptom.trend === 'improving' ? 'Melhorando' : 
                     symptom.trend === 'worsening' ? 'Piorando' : 'Estável'}
                  </span>
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};