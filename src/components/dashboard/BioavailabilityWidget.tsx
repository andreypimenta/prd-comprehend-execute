import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Zap, Clock, Star } from 'lucide-react';

interface BioavailabilityWidgetProps {
  supplements: Array<{
    id: string;
    supplement: {
      name: string;
      bioavailability_score?: number;
      optimal_form?: string;
      cost_benefit_form?: string;
      circadian_timing?: {
        optimal: string;
        with_meal: boolean;
      };
    };
  }>;
}

export const BioavailabilityWidget = ({ supplements }: BioavailabilityWidgetProps) => {
  const supplementsWithBiodata = supplements.filter(s => s.supplement.bioavailability_score);
  
  if (supplementsWithBiodata.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Otimização de Biodisponibilidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Analise seus suplementos para descobrir como maximizar a absorção
          </p>
        </CardContent>
      </Card>
    );
  }

  const avgBioavailability = Math.round(
    supplementsWithBiodata.reduce((sum, s) => sum + (s.supplement.bioavailability_score || 0), 0) / 
    supplementsWithBiodata.length
  );

  const getBioColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  const topOptimized = supplementsWithBiodata
    .sort((a, b) => (b.supplement.bioavailability_score || 0) - (a.supplement.bioavailability_score || 0))
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5" />
          Biodisponibilidade Otimizada
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Average Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Score Médio</span>
            <Badge className={getBioColor(avgBioavailability)}>
              {avgBioavailability}/100
            </Badge>
          </div>
          <Progress value={avgBioavailability} className="h-2" />
        </div>

        {/* Top Optimized Supplements */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-1">
            <Star className="h-4 w-4" />
            Melhor Otimizados
          </h4>
          {topOptimized.map((supp, index) => (
            <div key={supp.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <p className="text-sm font-medium">{supp.supplement.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  {supp.supplement.optimal_form && (
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {supp.supplement.optimal_form}
                    </Badge>
                  )}
                  {supp.supplement.circadian_timing?.optimal && (
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {supp.supplement.circadian_timing.optimal}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">
                  {supp.supplement.bioavailability_score}/100
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-2 border rounded">
            <p className="text-lg font-bold text-primary">{supplementsWithBiodata.length}</p>
            <p className="text-xs text-muted-foreground">Otimizados</p>
          </div>
          <div className="text-center p-2 border rounded">
            <p className="text-lg font-bold text-green-600">
              {supplementsWithBiodata.filter(s => (s.supplement.bioavailability_score || 0) >= 70).length}
            </p>
            <p className="text-xs text-muted-foreground">Alta Absorção</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};