import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Pill, Calendar, Target, TrendingUp } from "lucide-react";
import { useNextActions } from "@/hooks/useNextActions";

export function NextActionsChecklist() {
  const { actions, loading, markActionCompleted } = useNextActions();

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'timing':
        return Clock;
      case 'form':
        return Pill;
      case 'exam':
        return Calendar;
      case 'dosage':
        return Target;
      default:
        return TrendingUp;
    }
  };

  const getActionColor = (improvementPotential: number) => {
    if (improvementPotential >= 30) return 'text-green-600';
    if (improvementPotential >= 20) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const handleActionClick = (action: any) => {
    // Handle different action types
    switch (action.type) {
      case 'timing':
        // Show timing optimization modal/info
        console.log('Timing optimization for:', action.action_data);
        break;
      case 'form':
        // Show form recommendation
        console.log('Form recommendation:', action.action_data);
        break;
      case 'exam':
        // Suggest exam booking
        console.log('Exam recommendation:', action.action_data);
        break;
      case 'dosage':
        // Show dosage optimization
        console.log('Dosage optimization:', action.action_data);
        break;
    }
    markActionCompleted(action.id);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>O Que Fazer Agora</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span>Gerando ações personalizadas...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedActions = actions.filter(a => a.completed).length;
  const totalActions = actions.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>O Que Fazer Agora</span>
          </div>
          {totalActions > 0 && (
            <Badge variant="outline">
              {completedActions}/{totalActions} completas
            </Badge>
          )}
        </CardTitle>
        {totalActions > 0 && (
          <p className="text-sm text-muted-foreground">
            Otimizações para maximizar os benefícios dos seus suplementos
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {actions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Selecione alguns suplementos para receber recomendações personalizadas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {actions.map((action) => {
              const Icon = getActionIcon(action.type);
              const colorClass = getActionColor(action.improvement_potential);
              
              return (
                <div
                  key={action.id}
                  className={`flex items-start space-x-3 p-4 rounded-lg border transition-all ${
                    action.completed 
                      ? 'bg-green-50 border-green-200 opacity-75' 
                      : 'bg-background hover:bg-muted/50 border-border'
                  }`}
                >
                  <Checkbox
                    checked={action.completed}
                    onCheckedChange={() => markActionCompleted(action.id)}
                    className="mt-0.5"
                  />
                  
                  <Icon className={`h-5 w-5 mt-0.5 ${colorClass}`} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-medium text-sm ${action.completed ? 'line-through' : ''}`}>
                        {action.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${colorClass} border-current`}
                      >
                        +{action.improvement_potential}%
                      </Badge>
                    </div>
                    
                    <p className={`text-sm text-muted-foreground mb-3 ${
                      action.completed ? 'line-through' : ''
                    }`}>
                      {action.description}
                    </p>
                    
                    {!action.completed && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleActionClick(action)}
                        className="text-xs"
                      >
                        Implementar
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
            
            {completedActions > 0 && completedActions === totalActions && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  🎉 Parabéns! Você completou todas as otimizações recomendadas.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}