import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Activity, BarChart3, Brain, Target, TrendingUp, Zap } from 'lucide-react';
import { QuantitativeAnalysisPanel } from '@/components/quantitative/QuantitativeAnalysisPanel';

interface QuantitativeWidgetProps {
  supplementIds: string[];
  className?: string;
}

export const QuantitativeWidget: React.FC<QuantitativeWidgetProps> = ({
  supplementIds,
  className
}) => {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);

  const analysisTypes = [
    {
      key: 'pbpk',
      name: 'PBPK',
      description: 'Modelo farmacocinético baseado em fisiologia',
      icon: Activity,
      color: 'bg-primary/10 text-primary',
      features: ['Concentração-tempo', 'Biodisponibilidade', 'Personalização']
    },
    {
      key: 'monte_carlo',
      name: 'Monte Carlo',
      description: 'Simulação de variabilidade populacional',
      icon: BarChart3,
      color: 'bg-secondary/10 text-secondary',
      features: ['1000+ simulações', 'Intervalos de confiança', 'Estatísticas robustas']
    },
    {
      key: 'synergy_ml',
      name: 'Sinergias ML',
      description: 'Machine learning para predição de interações',
      icon: Brain,
      color: 'bg-accent/10 text-accent',
      features: ['Random Forest', 'Predições inteligentes', 'Scores de confiança']
    },
    {
      key: 'optimization',
      name: 'Otimização',
      description: 'Otimização matemática multi-objetivos',
      icon: Target,
      color: 'bg-success/10 text-success',
      features: ['Eficácia máxima', 'Custo-benefício', 'Segurança garantida']
    }
  ];

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Análise Quantitativa Avançada
          </CardTitle>
          <CardDescription>
            Modelos matemáticos e machine learning para otimização precisa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {analysisTypes.map((analysis) => {
              const Icon = analysis.icon;
              return (
                <div
                  key={analysis.key}
                  className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded ${analysis.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="font-medium text-sm">{analysis.name}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {analysis.description}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {analysis.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs px-1.5 py-0.5">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-medium">Capacidades Avançadas</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Modelos farmacocinéticos PBPK personalizados</li>
                  <li>• Simulações Monte Carlo com 1000+ iterações</li>
                  <li>• Predições ML de sinergias com Random Forest</li>
                  <li>• Otimização matemática multi-objetivos</li>
                </ul>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setShowFullAnalysis(true)}
            className="w-full"
            disabled={!supplementIds || supplementIds.length === 0}
          >
            <Brain className="w-4 h-4 mr-2" />
            Executar Análise Completa
          </Button>

          {(!supplementIds || supplementIds.length === 0) && (
            <p className="text-xs text-muted-foreground text-center">
              Selecione suplementos para análise quantitativa
            </p>
          )}
        </CardContent>
      </Card>

      <Dialog open={showFullAnalysis} onOpenChange={setShowFullAnalysis}>
        <DialogContent className="max-w-7xl h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Análise Quantitativa Avançada</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <QuantitativeAnalysisPanel 
              supplementIds={supplementIds}
              onClose={() => setShowFullAnalysis(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};