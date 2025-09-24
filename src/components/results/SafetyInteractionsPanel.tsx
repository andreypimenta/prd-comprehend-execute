import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, XCircle, Shield } from "lucide-react";
import { useInteractionAnalysis } from "@/hooks/useInteractionAnalysis";

export function SafetyInteractionsPanel() {
  const { interactions, loading } = useInteractionAnalysis();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'safe':
        return CheckCircle;
      case 'caution':
        return AlertTriangle;
      case 'avoid':
        return XCircle;
      default:
        return Shield;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'safe':
        return 'text-green-600';
      case 'caution':
        return 'text-yellow-600';
      case 'avoid':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'safe':
        return 'Seguro';
      case 'caution':
        return 'Cuidado';
      case 'avoid':
        return 'Evitar';
      default:
        return 'Indefinido';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'safe':
        return 'bg-green-50 border-green-200';
      case 'caution':
        return 'bg-yellow-50 border-yellow-200';
      case 'avoid':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Verificação de Segurança</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span>Analisando interações...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Verificação de Segurança</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {interactions.length === 0 ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              ✅ Nenhuma interação perigosa detectada entre seus suplementos selecionados.
              Sua combinação atual parece segura para uso conjunto.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            {interactions.map((interaction) => {
              const Icon = getSeverityIcon(interaction.severity);
              const colorClass = getSeverityColor(interaction.severity);
              const bgClass = getSeverityBg(interaction.severity);
              
              return (
                <Alert key={interaction.id} className={bgClass}>
                  <div className="flex items-start space-x-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${colorClass}`} />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">
                          {interaction.description}
                        </h4>
                        <Badge 
                          variant="outline" 
                          className={`${colorClass} border-current`}
                        >
                          {getSeverityBadge(interaction.severity)}
                        </Badge>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <p><strong>Suplementos envolvidos:</strong> {interaction.supplement_names.join(', ')}</p>
                        <p><strong>Ação recomendada:</strong> {interaction.action_needed}</p>
                      </div>
                    </div>
                  </div>
                </Alert>
              );
            })}
            
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Dica:</strong> Sempre consulte um profissional de saúde antes de iniciar novos suplementos,
                especialmente se você toma medicamentos ou tem condições de saúde pré-existentes.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}