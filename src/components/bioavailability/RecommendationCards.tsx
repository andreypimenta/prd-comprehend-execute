import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { OptimizationRecommendation } from '@/hooks/useAbsorptionOptimization';

interface RecommendationCardsProps {
  recommendations: OptimizationRecommendation;
}

export const RecommendationCards = ({ recommendations }: RecommendationCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Timing Card */}
      <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <Clock className="h-5 w-5" />
            Timing Otimizado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-semibold text-lg text-blue-900 dark:text-blue-100">
              {recommendations.timing.optimal}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {recommendations.timing.reason}
            </p>
          </div>
          <Badge className="bg-blue-600 text-white">
            +{recommendations.timing.improvement}% absorção
          </Badge>
        </CardContent>
      </Card>

      {/* Enhancers Card */}
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <Plus className="h-5 w-5" />
            Tomar Com
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {recommendations.combinations.enhancers.map((enhancer, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-sm font-medium text-green-900 dark:text-green-100">
                  • {enhancer.name}
                </p>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  +{enhancer.improvement}%
                </Badge>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <p className="text-xs text-green-700 dark:text-green-300">
                Combine para máxima absorção
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inhibitors Card */}
      <Card className="border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Não Tomar Com
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {recommendations.combinations.inhibitors.map((inhibitor, index) => (
              <div key={index} className="flex items-center justify-between">
                <p className="text-sm font-medium text-red-900 dark:text-red-100">
                  • {inhibitor.name}
                </p>
                <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                  -{inhibitor.reduction}%
                </Badge>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-red-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <p className="text-xs text-red-700 dark:text-red-300">
                Evite 2h antes/depois
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};