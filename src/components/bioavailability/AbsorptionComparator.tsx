import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import type { PharmaceuticalForm } from '@/hooks/useAbsorptionOptimization';

interface AbsorptionComparatorProps {
  forms: PharmaceuticalForm[];
}

export const AbsorptionComparator = ({ forms }: AbsorptionComparatorProps) => {
  const maxFactor = Math.max(...forms.map(f => f.bioavailabilityFactor));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Comparador Visual de Absorção
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Veja as diferenças dramáticas entre formas farmacêuticas
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {forms.map((form, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h4 className="font-semibold text-foreground">{form.name}</h4>
                <Badge 
                  variant="secondary" 
                  className="font-bold text-white"
                  style={{ backgroundColor: form.color }}
                >
                  {form.bioavailabilityFactor}x ({(form.bioavailabilityFactor * 100).toLocaleString()}%)
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {form.absorptionRate}% absorção
                </p>
              </div>
            </div>
            
            {/* Visual bar representation */}
            <div className="relative">
              <div 
                className="h-8 rounded-lg transition-all duration-1000 ease-out"
                style={{ 
                  width: `${(form.bioavailabilityFactor / maxFactor) * 100}%`,
                  backgroundColor: form.color,
                  minWidth: '8%'
                }}
              />
              {form.bioavailabilityFactor >= 100 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-lg animate-pulse" />
              )}
            </div>
            
            <p className="text-xs text-muted-foreground">
              {form.description}
            </p>
            
            {/* Highlight the extreme improvement */}
            {form.bioavailabilityFactor >= 100 && (
              <div className="p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
                <p className="text-sm font-bold text-accent">
                  🚀 Revolução na Absorção: {form.bioavailabilityFactor}x melhor que a forma padrão!
                </p>
              </div>
            )}
          </div>
        ))}
        
        {/* Summary highlight */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg text-foreground">
                Potencial de Melhoria
              </p>
              <p className="text-sm text-muted-foreground">
                Da forma padrão para nanoparticulada
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">
                {maxFactor}x
              </p>
              <p className="text-sm text-accent font-medium">
                +{((maxFactor - 1) * 100).toLocaleString()}% melhoria
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};