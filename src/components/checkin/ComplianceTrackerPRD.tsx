import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Supplement {
  id: string;
  name: string;
  recommendedDosage?: string;
  dosageUnit?: string;
}

interface ComplianceData {
  daysCompliant: number; // 0-7
  missedDoses: number;
  reasonsForMissing?: string[];
}

interface ComplianceTrackerPRDProps {
  supplements: Supplement[];
  compliance: Record<string, ComplianceData>;
  onChange: (compliance: Record<string, ComplianceData>) => void;
}

const MISSED_REASONS = [
  "Esqueci",
  "Acabou o suplemento",
  "Efeitos colaterais",
  "Não senti necessidade",
  "Viagem/rotina alterada",
  "Outro motivo"
];

export const ComplianceTrackerPRD = ({ 
  supplements, 
  compliance, 
  onChange 
}: ComplianceTrackerPRDProps) => {
  const updateCompliance = (
    supplementId: string, 
    field: keyof ComplianceData, 
    value: any
  ) => {
    const updated = {
      ...compliance,
      [supplementId]: {
        ...compliance[supplementId],
        [field]: value,
      },
    };
    onChange(updated);
  };

  const addMissedReason = (supplementId: string, reason: string) => {
    const current = compliance[supplementId] || { daysCompliant: 7, missedDoses: 0 };
    const reasons = current.reasonsForMissing || [];
    
    if (!reasons.includes(reason)) {
      updateCompliance(supplementId, 'reasonsForMissing', [...reasons, reason]);
    }
  };

  const removeMissedReason = (supplementId: string, reason: string) => {
    const current = compliance[supplementId] || { daysCompliant: 7, missedDoses: 0 };
    const reasons = current.reasonsForMissing || [];
    
    updateCompliance(supplementId, 'reasonsForMissing', reasons.filter(r => r !== reason));
  };

  const getAdherencePercent = (data: ComplianceData) => {
    return Math.round((data.daysCompliant / 7) * 100);
  };

  const getAdherenceColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-success/10 text-success border-success/20';
    if (percentage >= 60) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Aderência aos Suplementos</h3>
        <p className="text-muted-foreground">
          Como foi sua aderência aos suplementos esta semana?
        </p>
      </div>

      {supplements.map((supplement) => {
        const complianceData = compliance[supplement.id] || {
          daysCompliant: 7,
          missedDoses: 0,
          reasonsForMissing: []
        };

        const adherencePercent = getAdherencePercent(complianceData);
        const missedDays = 7 - complianceData.daysCompliant;

        return (
          <Card key={supplement.id} className="w-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <div>
                  <span className="text-lg">{supplement.name}</span>
                  {supplement.recommendedDosage && (
                    <div className="text-sm text-muted-foreground">
                      {supplement.recommendedDosage} {supplement.dosageUnit}
                    </div>
                  )}
                </div>
                <Badge className={getAdherenceColor(adherencePercent)}>
                  {adherencePercent}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Days Compliant */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Quantos dias você tomou este suplemento? (0-7)
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((days) => (
                  <Button
                    variant={complianceData.daysCompliant === days ? "primary" : "outline"}
                    size="sm"
                    onClick={() => {
                      updateCompliance(supplement.id, 'daysCompliant', days);
                      updateCompliance(supplement.id, 'missedDoses', 7 - days);
                    }}
                      className="text-sm font-medium"
                    >
                      {days}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Missed Reasons (only show if missed days > 0) */}
              {missedDays > 0 && (
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Por que não tomou em alguns dias?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                    {MISSED_REASONS.map((reason) => {
                      const isSelected = complianceData.reasonsForMissing?.includes(reason) || false;
                      return (
                        <Button
                          key={reason}
                          variant={isSelected ? "primary" : "outline"}
                          size="sm"
                          onClick={() => {
                            if (isSelected) {
                              removeMissedReason(supplement.id, reason);
                            } else {
                              addMissedReason(supplement.id, reason);
                            }
                          }}
                          className="text-xs h-auto py-2 px-3"
                        >
                          {reason}
                        </Button>
                      );
                    })}
                  </div>

                  {/* Selected reasons display */}
                  {complianceData.reasonsForMissing && complianceData.reasonsForMissing.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {complianceData.reasonsForMissing.map((reason) => (
                        <Badge key={reason} variant="secondary" className="text-xs">
                          {reason}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Progress Visualization */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Dias tomados: {complianceData.daysCompliant}/7</span>
                  <span>Doses perdidas: {complianceData.missedDoses}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      adherencePercent >= 80 ? 'bg-success' : 
                      adherencePercent >= 60 ? 'bg-warning' : 'bg-destructive'
                    }`}
                    style={{ width: `${adherencePercent}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};