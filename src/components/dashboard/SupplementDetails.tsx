// components/dashboard/SupplementDetails.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { SupplementDetailsProps } from '@/types/dashboard';
import { 
  Star, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';

export function SupplementDetails({ recommendation, onClose }: SupplementDetailsProps) {
  const { supplement } = recommendation;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getEvidenceBadge = (level: string) => {
    switch (level) {
      case 'strong': return { variant: 'default' as const, text: 'Evidência Forte', color: 'bg-green-500' };
      case 'moderate': return { variant: 'secondary' as const, text: 'Evidência Moderada', color: 'bg-blue-500' };
      case 'limited': return { variant: 'outline' as const, text: 'Evidência Limitada', color: 'bg-gray-500' };
      default: return { variant: 'outline' as const, text: 'Não informado', color: 'bg-gray-500' };
    }
  };

  const evidenceBadge = getEvidenceBadge(supplement.evidenceLevel);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            {supplement.name}
            <Badge
              variant="default"
              className={`${recommendation.priority === 'high' ? 'bg-green-500' : recommendation.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-500'}`}
            >
              {recommendation.priority === 'high' ? 'Alta Prioridade' :
               recommendation.priority === 'medium' ? 'Média Prioridade' : 'Baixa Prioridade'}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Score & Confidence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Análise de Confiança
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{recommendation.confidence}%</div>
                    <div className="text-sm text-muted-foreground">Match Score</div>
                  </div>
                  <div className="text-center">
                    <Badge variant={evidenceBadge.variant} className={evidenceBadge.variant === 'default' ? evidenceBadge.color : ''}>
                      <ShieldCheck className="h-4 w-4 mr-1" />
                      {evidenceBadge.text}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reasoning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-500" />
                  Por que foi recomendado?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {recommendation.reasoning}
                </p>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre este suplemento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {supplement.description}
                </p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Benefícios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {supplement.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contraindications & Interactions */}
            {(supplement.contraindications?.length > 0 || supplement.interactions?.length > 0) && (
              <Card className="border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <AlertTriangle className="h-5 w-5" />
                    Precauções Importantes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supplement.contraindications?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-2">Contraindicações:</h4>
                      <ul className="space-y-1">
                        {supplement.contraindications.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {supplement.interactions?.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-2">Interações:</h4>
                      <ul className="space-y-1">
                        {supplement.interactions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-orange-500 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Dosage & Timing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como tomar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Dosagem</span>
                  <span className="font-semibold">
                    {recommendation.recommendedDosage} {supplement.category === 'vitamin' ? 'UI' : 'mg'}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {supplement.timing === 'morning' ? 'Pela manhã' :
                     supplement.timing === 'evening' ? 'À noite' : 
                     supplement.timing === 'with_meal' ? 'Com refeição' : 'Qualquer horário'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Category & Cost */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Categoria</span>
                  <Badge variant="outline">
                    {supplement.category.charAt(0).toUpperCase() + supplement.category.slice(1)}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Custo estimado</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">R$ {recommendation.estimatedCost}/mês</span>
                  </div>
                </div>

                {supplement.priceMin && supplement.priceMax && (
                  <>
                    <Separator />
                    <div className="text-center text-sm text-muted-foreground">
                      Faixa de preço: R$ {supplement.priceMin} - R$ {supplement.priceMax}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Action Button */}
            <Button className="w-full" size="lg">
              <Target className="h-4 w-4 mr-2" />
              Adicionar ao Plano
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}