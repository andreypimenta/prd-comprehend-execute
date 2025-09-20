import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface SupplementCompliance {
  supplement_id: string;
  supplement_name: string;
  days_taken: number;
  total_days: number;
  missed_days?: string[];
  side_effects?: string;
}

interface ComplianceTrackerProps {
  supplements: Array<{
    id: string;
    name: string;
  }>;
  compliance: Record<string, SupplementCompliance>;
  onChange: (compliance: Record<string, SupplementCompliance>) => void;
}

export const ComplianceTracker = ({ 
  supplements, 
  compliance, 
  onChange 
}: ComplianceTrackerProps) => {
  const [customSupplement, setCustomSupplement] = useState('');

  const handleComplianceChange = (
    supplementId: string, 
    field: keyof SupplementCompliance, 
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

  const addCustomSupplement = () => {
    if (!customSupplement.trim()) return;
    
    const customId = `custom_${Date.now()}`;
    const updated = {
      ...compliance,
      [customId]: {
        supplement_id: customId,
        supplement_name: customSupplement.trim(),
        days_taken: 0,
        total_days: 7,
      },
    };
    onChange(updated);
    setCustomSupplement('');
  };

  const removeCustomSupplement = (supplementId: string) => {
    const updated = { ...compliance };
    delete updated[supplementId];
    onChange(updated);
  };

  const calculateCompliance = (item: SupplementCompliance) => {
    return Math.round((item.days_taken / item.total_days) * 100);
  };

  const getComplianceColor = (percentage: number) => {
    if (percentage >= 85) return 'bg-success text-success-foreground';
    if (percentage >= 70) return 'bg-warning text-warning-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  // Initialize compliance for existing supplements
  const allSupplements = [
    ...supplements,
    ...Object.values(compliance)
      .filter(item => item.supplement_id.startsWith('custom_'))
      .map(item => ({ id: item.supplement_id, name: item.supplement_name }))
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Aderência aos Suplementos</h3>
        <p className="text-muted-foreground">
          Registre quantos dias na última semana você tomou cada suplemento
        </p>
      </div>

      {allSupplements.map((supplement) => {
        const complianceData = compliance[supplement.id] || {
          supplement_id: supplement.id,
          supplement_name: supplement.name,
          days_taken: 0,
          total_days: 7,
        };

        const compliancePercentage = calculateCompliance(complianceData);

        return (
          <Card key={supplement.id} className="w-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{supplement.name}</span>
                <div className="flex items-center gap-2">
                  <Badge className={getComplianceColor(compliancePercentage)}>
                    {compliancePercentage}% aderência
                  </Badge>
                  {supplement.id.startsWith('custom_') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCustomSupplement(supplement.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`days-taken-${supplement.id}`}>
                    Dias tomados (última semana)
                  </Label>
                  <Input
                    id={`days-taken-${supplement.id}`}
                    type="number"
                    min="0"
                    max="7"
                    value={complianceData.days_taken}
                    onChange={(e) => 
                      handleComplianceChange(
                        supplement.id, 
                        'days_taken', 
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`total-days-${supplement.id}`}>
                    Total de dias prescritos
                  </Label>
                  <Input
                    id={`total-days-${supplement.id}`}
                    type="number"
                    min="1"
                    max="7"
                    value={complianceData.total_days}
                    onChange={(e) => 
                      handleComplianceChange(
                        supplement.id, 
                        'total_days', 
                        parseInt(e.target.value) || 7
                      )
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor={`side-effects-${supplement.id}`}>
                  Efeitos colaterais (opcional)
                </Label>
                <Textarea
                  id={`side-effects-${supplement.id}`}
                  placeholder="Descreva qualquer efeito colateral que você notou..."
                  value={complianceData.side_effects || ''}
                  onChange={(e) => 
                    handleComplianceChange(
                      supplement.id, 
                      'side_effects', 
                      e.target.value
                    )
                  }
                  className="mt-1 resize-none"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Add custom supplement */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Nome do suplemento adicional..."
              value={customSupplement}
              onChange={(e) => setCustomSupplement(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomSupplement()}
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={addCustomSupplement}
              disabled={!customSupplement.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Adicione suplementos que não estão na sua lista de recomendações
          </p>
        </CardContent>
      </Card>
    </div>
  );
};