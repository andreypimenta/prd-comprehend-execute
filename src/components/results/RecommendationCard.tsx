import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, Zap, Shield, DollarSign, Plus, Check } from "lucide-react";
import type { Recommendation } from "@/types/supplements";

interface RecommendationCardProps {
  recommendation: Recommendation & {
    supplements?: {
      id: string;
      name: string;
      description: string;
      benefits: string[];
      dosage_unit: string;
      timing: string;
      evidence_level: string;
      price_min?: number;
      price_max?: number;
    };
  };
  isSelected?: boolean;
  onToggleSelection?: (recommendationId: string, supplementId: string) => void;
  disabled?: boolean;
}

export function RecommendationCard({ 
  recommendation, 
  isSelected = false, 
  onToggleSelection, 
  disabled = false 
}: RecommendationCardProps) {
  const supplement = recommendation.supplements;
  
  if (!supplement) {
    return null;
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'Indefinida';
    }
  };

  const getTimingLabel = (timing: string) => {
    switch (timing) {
      case 'morning':
        return 'Pela manhã';
      case 'evening':
        return 'À noite';
      case 'with_meal':
        return 'Com refeição';
      case 'any':
        return 'Qualquer horário';
      default:
        return 'Conforme orientação';
    }
  };

  const getEvidenceLabel = (evidenceLevel: string) => {
    switch (evidenceLevel) {
      case 'strong':
        return 'Evidência Forte';
      case 'moderate':
        return 'Evidência Moderada';
      case 'limited':
        return 'Evidência Limitada';
      default:
        return 'Não especificado';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg">{supplement.name}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {supplement.description}
            </p>
          </div>
          
          <div className="flex flex-col items-end space-y-2 ml-4">
            <Badge
              variant="secondary"
              className={`${getPriorityColor(recommendation.priority)} text-white`}
            >
              Prioridade {getPriorityLabel(recommendation.priority)}
            </Badge>
            
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Confiança</div>
              <div className="font-semibold text-lg">{recommendation.confidence}%</div>
            </div>
          </div>
        </div>

        <Progress value={recommendation.confidence} className="h-2 mt-2" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Dosagem Recomendada */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">Dosagem Recomendada</span>
          </div>
          <div className="text-lg font-semibold">
            {recommendation.recommended_dosage} {supplement.dosage_unit}
          </div>
          <div className="text-sm text-muted-foreground flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1" />
            {getTimingLabel(supplement.timing)}
          </div>
        </div>

        {/* Principais Benefícios */}
        {supplement.benefits && supplement.benefits.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2 text-muted-foreground">
              Principais Benefícios
            </h4>
            <ul className="space-y-1">
              {supplement.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="text-sm flex items-start">
                  <span className="text-primary mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Por que foi recomendado */}
        <div>
          <h4 className="font-medium text-sm mb-2 text-muted-foreground">
            Por que foi recomendado
          </h4>
          <p className="text-sm bg-primary/5 rounded p-2">
            {recommendation.reasoning}
          </p>
        </div>

        {/* Informações Adicionais */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>{getEvidenceLabel(supplement.evidence_level)}</span>
          </div>
          
          {supplement.price_min && supplement.price_max && (
            <div className="flex items-center space-x-1">
              <DollarSign className="w-3 h-3" />
              <span>R$ {supplement.price_min} - R$ {supplement.price_max}</span>
            </div>
          )}
        </div>

        {/* Selection Button */}
        {onToggleSelection && (
          <div className="pt-4 border-t">
            <Button
              onClick={() => onToggleSelection(recommendation.id, supplement.id)}
              disabled={disabled}
              variant={isSelected ? "primary" : "outline"}
              className="w-full"
              size="sm"
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Selecionado
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Selecionar para usar
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}