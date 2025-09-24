import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Calendar, TrendingUp } from 'lucide-react';

interface TimelineItem {
  week: string;
  title: string;
  description: string;
  completed: boolean;
}

interface OptimizationTimelineProps {
  timeline: TimelineItem[];
  onToggleCompleted?: (index: number) => void;
}

export const OptimizationTimeline = ({ timeline, onToggleCompleted }: OptimizationTimelineProps) => {
  const completedCount = timeline.filter(item => item.completed).length;
  const progressPercentage = (completedCount / timeline.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Cronograma de Otimização
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Implemente as melhorias de forma gradual e sustentável
          </p>
          <Badge className="bg-primary text-white">
            {completedCount}/{timeline.length} completo
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress overview */}
        <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-foreground">Progresso Geral</p>
            <p className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</p>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Timeline items */}
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div 
              key={index} 
              className={`flex gap-4 p-4 rounded-lg border transition-all ${
                item.completed 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-card border-border hover:bg-muted/50'
              }`}
            >
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full h-8 w-8 p-0 ${
                    item.completed 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-muted text-muted-foreground hover:bg-primary hover:text-white'
                  }`}
                  onClick={() => onToggleCompleted?.(index)}
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </Button>
                {index < timeline.length - 1 && (
                  <div className={`w-px h-12 mt-2 ${
                    item.completed ? 'bg-green-300' : 'bg-border'
                  }`} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold ${
                    item.completed ? 'text-green-700 dark:text-green-400' : 'text-foreground'
                  }`}>
                    {item.title}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    {item.week}
                  </Badge>
                </div>
                <p className={`text-sm ${
                  item.completed 
                    ? 'text-green-600 dark:text-green-300' 
                    : 'text-muted-foreground'
                }`}>
                  {item.description}
                </p>
                
                {/* Action suggestions based on phase */}
                {!item.completed && (
                  <div className="mt-3 p-3 bg-muted/50 rounded border-l-4 border-primary">
                    <p className="text-xs text-muted-foreground">
                      {index === 0 && "💡 Dica: Comece com 25% da dose na nova forma e aumente gradualmente"}
                      {index === 1 && "⏰ Dica: Use lembretes no celular para o novo horário de administração"}
                      {index === 2 && "🥑 Dica: Adicione abacate no café da manhã ou tome com azeite"}
                      {index === 3 && "📊 Dica: Mantenha um diário de sintomas para avaliar melhoria"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Expected results section */}
        <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-accent" />
            <p className="font-semibold text-foreground">Resultados Esperados</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-accent">Primeiras 2 semanas:</p>
              <p className="text-muted-foreground">Adaptação inicial, possível melhoria de 20-30%</p>
            </div>
            <div>
              <p className="font-medium text-accent">Semanas 3-4:</p>
              <p className="text-muted-foreground">Otimização de timing, melhoria de 40-50%</p>
            </div>
            <div>
              <p className="font-medium text-accent">Semanas 5-6:</p>
              <p className="text-muted-foreground">Sinergia completa, melhoria de 60-80%</p>
            </div>
            <div>
              <p className="font-medium text-accent">Semanas 7-8:</p>
              <p className="text-muted-foreground">Máxima eficácia, até 185x melhor absorção</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};