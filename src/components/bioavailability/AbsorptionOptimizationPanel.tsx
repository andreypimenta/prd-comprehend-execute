import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Target, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { useAbsorptionOptimization } from '@/hooks/useAbsorptionOptimization';
import { AbsorptionComparator } from './AbsorptionComparator';
import { DoseCalculator } from './DoseCalculator';
import { RecommendationCards } from './RecommendationCards';
import { CostBenefitTable } from './CostBenefitTable';
import { OptimizationTimeline } from './OptimizationTimeline';

interface AbsorptionOptimizationPanelProps {
  supplementId: string;
  supplementName: string;
}

export const AbsorptionOptimizationPanel = ({ supplementId, supplementName }: AbsorptionOptimizationPanelProps) => {
  const { getOptimizationData, loading } = useAbsorptionOptimization();
  const { toast } = useToast();
  const [optimizationData, setOptimizationData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadOptimizationData();
  }, [supplementId]);

  const loadOptimizationData = async () => {
    const data = await getOptimizationData(supplementId);
    if (data) {
      setOptimizationData(data);
    }
  };

  const handleApplyOptimization = () => {
    toast({
      title: "Otimização Aplicada!",
      description: "Suas recomendações foram atualizadas com as formas otimizadas.",
    });
  };

  const handleToggleTimelineItem = (index: number) => {
    if (!optimizationData) return;
    
    const newTimeline = [...optimizationData.timeline];
    newTimeline[index].completed = !newTimeline[index].completed;
    
    setOptimizationData({
      ...optimizationData,
      timeline: newTimeline
    });

    toast({
      title: newTimeline[index].completed ? "Fase Concluída!" : "Fase Marcada como Pendente",
      description: newTimeline[index].title,
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Analisando Otimizações de Absorção...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!optimizationData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Otimização de Absorção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Descubra como ter até 185x melhor absorção com formas otimizadas
          </p>
          <Button onClick={loadOptimizationData} disabled={loading}>
            Otimizar para meu perfil
          </Button>
        </CardContent>
      </Card>
    );
  }

  const maxImprovement = Math.max(...optimizationData.forms.map((f: any) => f.bioavailabilityFactor));

  return (
    <div className="space-y-6">
      {/* Hero section */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
                Otimização de Absorção
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {supplementName} - Maximize sua eficácia
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-primary text-white text-lg px-4 py-2">
                Até {maxImprovement}x
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                melhor absorção
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleApplyOptimization}
              className="bg-primary hover:bg-primary/90"
            >
              <Target className="h-4 w-4 mr-2" />
              Aplicar Otimização
            </Button>
            <Button variant="outline">
              Comparar Produtos
            </Button>
            <Button variant="outline">
              Adicionar ao Protocolo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main content tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          <TabsTrigger value="cost">Custo-Benefício</TabsTrigger>
          <TabsTrigger value="timeline">Cronograma</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AbsorptionComparator forms={optimizationData.forms} />
          
          {/* Quick results preview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center p-4">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{maxImprovement}x</p>
              <p className="text-sm text-muted-foreground">melhoria máxima</p>
            </Card>
            <Card className="text-center p-4">
              <p className="text-2xl font-bold text-green-600">96%</p>
              <p className="text-sm text-muted-foreground">absorção otimizada</p>
            </Card>
            <Card className="text-center p-4">
              <p className="text-2xl font-bold text-blue-600">2-3</p>
              <p className="text-sm text-muted-foreground">semanas p/ resultados</p>
            </Card>
            <Card className="text-center p-4">
              <p className="text-2xl font-bold text-purple-600">R$ 720</p>
              <p className="text-sm text-muted-foreground">economia anual</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calculator">
          <DoseCalculator forms={optimizationData.forms} />
        </TabsContent>

        <TabsContent value="recommendations">
          <RecommendationCards recommendations={optimizationData.recommendations} />
        </TabsContent>

        <TabsContent value="cost">
          <CostBenefitTable 
            forms={optimizationData.forms} 
            recommendations={optimizationData.recommendations} 
          />
        </TabsContent>

        <TabsContent value="timeline">
          <OptimizationTimeline 
            timeline={optimizationData.timeline}
            onToggleCompleted={handleToggleTimelineItem}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};