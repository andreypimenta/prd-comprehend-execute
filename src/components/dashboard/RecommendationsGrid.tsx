// components/dashboard/RecommendationsGrid.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SupplementDetails } from './SupplementDetails';
import type { DashboardData } from '@/types/dashboard';
import { ArrowUpDown, Star, Clock, DollarSign } from 'lucide-react';

interface RecommendationsGridProps {
  recommendations: DashboardData['supplements'];
}

export function RecommendationsGrid({ recommendations }: RecommendationsGridProps) {
  const [sortBy, setSortBy] = useState<'confidence' | 'priority' | 'category'>('confidence');
  const [selectedSupplement, setSelectedSupplement] = useState<string | null>(null);

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    switch (sortBy) {
      case 'confidence':
        return b.confidence - a.confidence;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'category':
        return a.supplement.category.localeCompare(b.supplement.category);
      default:
        return 0;
    }
  });

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          Todas as Recomendações ({recommendations.length})
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Ordenar por:</span>
          <div className="flex gap-1">
            <Button
              variant={sortBy === 'confidence' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('confidence')}
            >
              <Star className="h-4 w-4 mr-1" />
              Confiança
            </Button>
            <Button
              variant={sortBy === 'priority' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('priority')}
            >
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Prioridade
            </Button>
            <Button
              variant={sortBy === 'category' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('category')}
            >
              Categoria
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedRecommendations.map((recommendation) => (
          <Card
            key={recommendation.id}
            className="transition-all duration-200 hover:shadow-md cursor-pointer"
            onClick={() => setSelectedSupplement(recommendation.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg mb-2 line-clamp-2">
                  {recommendation.supplement.name}
                </CardTitle>
                <Badge
                  variant={getPriorityVariant(recommendation.priority)}
                  className={recommendation.priority === 'high' ? getPriorityColor(recommendation.priority) : ''}
                >
                  {recommendation.priority === 'high' ? 'Alta' :
                   recommendation.priority === 'medium' ? 'Média' : 'Baixa'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {/* Confidence & Dosage */}
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {recommendation.confidence}%
                  </div>
                  <div className="text-xs text-muted-foreground">Confiança</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold">
                    {recommendation.recommendedDosage}
                    <span className="text-sm text-muted-foreground ml-1">
                      {recommendation.supplement.category === 'vitamin' ? 'UI' : 'mg'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Dosagem</div>
                </div>
              </div>

              {/* Timing */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {recommendation.supplement.timing === 'morning' ? 'Pela manhã' :
                 recommendation.supplement.timing === 'evening' ? 'À noite' : 'Com refeição'}
              </div>

              {/* Benefits */}
              <div className="space-y-1">
                <div className="text-sm font-medium">Principais benefícios:</div>
                <div className="text-sm text-muted-foreground">
                  {recommendation.supplement.benefits.slice(0, 2).map((benefit, index) => (
                    <div key={index} className="flex items-start gap-1">
                      <span>•</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost & Action */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  ~R$ {recommendation.estimatedCost}/mês
                </div>
                <Button variant="link" size="sm" className="p-0 h-auto">
                  Ver detalhes →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Supplement Details Modal */}
      {selectedSupplement && (
        <SupplementDetails
          recommendation={recommendations.find(r => r.id === selectedSupplement)!}
          onClose={() => setSelectedSupplement(null)}
        />
      )}
    </div>
  );
}