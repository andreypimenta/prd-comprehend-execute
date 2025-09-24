import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Lightbulb, BarChart3, Brain } from "lucide-react";
import { usePersonalizedInsights } from "@/hooks/usePersonalizedInsights";

export function IntelligentInsights() {
  const { insights, loading } = usePersonalizedInsights();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'progress':
        return TrendingUp;
      case 'prediction':
        return Brain;
      case 'optimization':
        return Lightbulb;
      case 'comparison':
        return Users;
      default:
        return BarChart3;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'progress':
        return 'text-green-600 bg-green-50';
      case 'prediction':
        return 'text-blue-600 bg-blue-50';
      case 'optimization':
        return 'text-yellow-600 bg-yellow-50';
      case 'comparison':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'progress':
        return 'Progresso';
      case 'prediction':
        return 'Previsão';
      case 'optimization':
        return 'Otimização';
      case 'comparison':
        return 'Comparação';
      default:
        return 'Insight';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Insights Baseados em Dados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span>Analisando seus dados...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>Insights Baseados em Dados</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Descobertas personalizadas baseadas na análise dos seus dados
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {insights.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Continue usando seus suplementos e fazendo check-ins para receber insights personalizados</p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => {
              const Icon = getInsightIcon(insight.type);
              const colorClasses = getInsightColor(insight.type);
              
              return (
                <div
                  key={insight.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${colorClasses}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          {insight.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(insight.type)}
                          </Badge>
                          <Badge 
                            variant="secondary" 
                            className="text-xs"
                          >
                            {insight.confidence}% confiança
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {insight.description}
                      </p>
                      
                      {/* Additional data visualization based on insight type */}
                      {insight.type === 'progress' && insight.data?.improvement && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">
                              Melhoria de {Math.round(insight.data.improvement)}% detectada
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {insight.type === 'prediction' && insight.data?.timeframe && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">
                              Previsão baseada em {insight.data.sample_size || 'dados similares'}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {insight.type === 'optimization' && insight.data?.recommendation && (
                        <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Lightbulb className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">
                              Sugestão: {insight.data.recommendation}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Como melhorar seus insights:</strong> Faça check-ins semanais regulares 
                e mantenha sua rotina de suplementos para receber análises mais precisas e personalizadas.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}