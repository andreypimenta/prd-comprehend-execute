import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { WeeklyCheckin } from '@/types/checkin';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Eye, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface CheckinHistoryProps {
  checkins: WeeklyCheckin[];
}

export const CheckinHistory = ({ checkins }: CheckinHistoryProps) => {
  const [expandedCheckin, setExpandedCheckin] = useState<string | null>(null);

  if (checkins.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Nenhum check-in realizado ainda.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Seus check-ins semanais aparecerão aqui.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const getComplianceColor = (percentage?: number) => {
    if (!percentage) return 'bg-muted text-muted-foreground';
    if (percentage >= 85) return 'bg-success/10 text-success border-success/20';
    if (percentage >= 70) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  const toggleExpanded = (checkinId: string) => {
    setExpandedCheckin(expandedCheckin === checkinId ? null : checkinId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Histórico de Check-ins
          <Badge variant="outline">{checkins.length} check-ins</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checkins.map((checkin, index) => (
            <div key={checkin.id} className="border rounded-lg p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-semibold">
                    Semana {checkin.week_number}
                  </div>
                  <Badge variant="outline">
                    {formatDate(checkin.checkin_date)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {checkin.overall_compliance_percentage !== undefined && (
                    <Badge className={getComplianceColor(checkin.overall_compliance_percentage)}>
                      {Math.round(checkin.overall_compliance_percentage)}% aderência
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(checkin.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-3">
                {[
                  { label: 'Energia', value: checkin.energy_level, color: 'text-success' },
                  { label: 'Fadiga', value: checkin.fatigue_level, color: 'text-destructive' },
                  { label: 'Humor', value: checkin.mood_level, color: 'text-primary' },
                  { label: 'Sono', value: checkin.sleep_quality, color: 'text-info' },
                  { label: 'Estresse', value: checkin.stress_level, color: 'text-warning' },
                  { label: 'Foco', value: checkin.focus_level, color: 'text-secondary' },
                ].map((metric) => (
                  <div key={metric.label} className="text-center p-2 bg-muted/50 rounded">
                    <div className={`text-lg font-bold ${metric.color}`}>
                      {metric.value || '-'}
                    </div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Expanded Details */}
              {expandedCheckin === checkin.id && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    {/* Supplement Adherence */}
                    {checkin.supplement_adherence && Object.keys(checkin.supplement_adherence).length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Aderência aos Suplementos</h4>
                        <div className="space-y-2">
                          {Object.values(checkin.supplement_adherence).map((supplement: any, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                              <span className="text-sm">{supplement.supplement_name}</span>
                              <Badge variant="outline">
                                {supplement.days_taken}/{supplement.total_days} dias
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Wellness Metrics */}
                    {(checkin.weight || checkin.exercise_frequency) && (
                      <div>
                        <h4 className="font-medium mb-2">Métricas de Bem-estar</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {checkin.weight && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Peso:</span> {checkin.weight} kg
                            </div>
                          )}
                          {checkin.exercise_frequency && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Exercícios:</span> {checkin.exercise_frequency} dias
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {(checkin.notes || checkin.side_effects) && (
                      <div>
                        <h4 className="font-medium mb-2">Observações</h4>
                        {checkin.notes && (
                          <div className="text-sm mb-2">
                            <span className="text-muted-foreground">Notas:</span>
                            <p className="mt-1 p-2 bg-muted/30 rounded">{checkin.notes}</p>
                          </div>
                        )}
                        {checkin.side_effects && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Efeitos colaterais:</span>
                            <p className="mt-1 p-2 bg-muted/30 rounded">{checkin.side_effects}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};