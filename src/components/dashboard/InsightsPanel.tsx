import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WeeklyCheckin } from '@/types/checkin';
import { generateInsights } from '@/lib/checkin-utils';
import { Lightbulb, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface InsightsPanelProps {
  checkins: WeeklyCheckin[];
  className?: string;
}

export const InsightsPanel = ({ checkins, className }: InsightsPanelProps) => {
  const insights = generateInsights(checkins);

  const getInsightIcon = (insight: string) => {
    if (insight.includes('📈') || insight.includes('✨') || insight.includes('🎉')) {
      return <TrendingUp className="w-4 h-4 text-success" />;
    }
    if (insight.includes('📉') || insight.includes('⚠️')) {
      return <TrendingDown className="w-4 h-4 text-destructive" />;
    }
    return <Lightbulb className="w-4 h-4 text-primary" />;
  };

  const getInsightVariant = (insight: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (insight.includes('📈') || insight.includes('✨') || insight.includes('🎉')) {
      return 'default';
    }
    if (insight.includes('📉') || insight.includes('⚠️')) {
      return 'destructive';
    }
    return 'secondary';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Insights Personalizados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
            {getInsightIcon(insight)}
            <div className="flex-1">
              <p className="text-sm leading-relaxed">
                {insight.replace(/[📈📉✨🎉⚠️👍🔥📅😊🤔]/g, '').trim()}
              </p>
            </div>
            <Badge variant={getInsightVariant(insight)} className="text-xs">
              Insight
            </Badge>
          </div>
        ))}
        
        {checkins.length === 0 && (
          <div className="text-center py-8">
            <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Nenhum insight disponível</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Faça seu primeiro check-in para começar a receber insights personalizados sobre seu progresso!
            </p>
            <Button size="sm" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Fazer Check-in
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};