import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Pill, Leaf, Zap, Info } from "lucide-react";
import type { Recommendation } from "@/types/supplements";

interface PersonalizedRecommendationsProps {
  recommendations: Recommendation[];
  onLearnMore?: (recommendation: Recommendation) => void;
}

export function PersonalizedRecommendations({ 
  recommendations, 
  onLearnMore 
}: PersonalizedRecommendationsProps) {
  // Get top 4 recommendations by confidence
  const topRecommendations = recommendations
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 4);

  const getSupplementIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'vitamin':
        return Pill;
      case 'mineral':
        return Zap;
      case 'herb':
        return Leaf;
      default:
        return Heart;
    }
  };

  const getCompatibilityScore = (confidence: number, priority: string) => {
    // Enhanced scoring based on confidence and priority
    let score = confidence;
    if (priority === 'high') score = Math.min(score + 10, 100);
    if (priority === 'low') score = Math.max(score - 5, 0);
    return Math.round(score);
  };

  const getPersonalizedReason = (recommendation: Recommendation) => {
    const supplement = (recommendation as any).supplements;
    if (!supplement) return recommendation.reasoning;

    // Create more personal reasons based on supplement properties
    const symptoms = supplement.target_symptoms || [];
    const benefits = supplement.benefits || [];
    
    if (symptoms.length > 0) {
      return `Para melhorar ${symptoms[0].toLowerCase()} baseado no seu perfil`;
    }
    
    if (benefits.length > 0) {
      return `Recomendado para ${benefits[0].toLowerCase()} conforme seus objetivos`;
    }
    
    return recommendation.reasoning;
  };

  if (topRecommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Recomendado Para Você</h2>
        <p className="text-muted-foreground">
          Suplementos selecionados especialmente baseados no seu perfil único
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {topRecommendations.map((recommendation) => {
          const supplement = (recommendation as any).supplements;
          if (!supplement) return null;

          const Icon = getSupplementIcon(supplement.category);
          const compatibilityScore = getCompatibilityScore(recommendation.confidence, recommendation.priority);
          const personalizedReason = getPersonalizedReason(recommendation);

          return (
            <Card 
              key={recommendation.id} 
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg leading-tight">
                        {supplement.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground capitalize">
                        {supplement.category === 'vitamin' ? 'Vitamina' :
                         supplement.category === 'mineral' ? 'Mineral' :
                         supplement.category === 'herb' ? 'Fitoterápico' : 'Suplemento'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Compatibilidade</span>
                    <Badge 
                      variant={compatibilityScore >= 90 ? "default" : compatibilityScore >= 75 ? "secondary" : "outline"}
                      className="font-bold"
                    >
                      {compatibilityScore}% match
                    </Badge>
                  </div>
                  <Progress value={compatibilityScore} className="h-2" />
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Por que para você:</h4>
                  <p className="text-sm bg-primary/5 rounded-lg p-3 leading-relaxed">
                    {personalizedReason}
                  </p>
                </div>

                {supplement.benefits && supplement.benefits.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">Principal benefício:</h4>
                    <p className="text-sm text-foreground">
                      • {supplement.benefits[0]}
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => onLearnMore?.(recommendation)}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Saber mais
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}