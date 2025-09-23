import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Clock, TrendingUp, DollarSign, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useBioavailability, type PharmaceuticalFormAnalysis } from '@/hooks/useBioavailability';
import { useUserProfile } from '@/hooks/useUserProfile';

interface BioavailabilityPanelProps {
  supplementId: string;
  supplementName: string;
}

export const BioavailabilityPanel = ({ supplementId, supplementName }: BioavailabilityPanelProps) => {
  const { analyzeBioavailability, getSupplementBioavailability, loading } = useBioavailability();
  const { profile } = useUserProfile();
  const [analysis, setAnalysis] = useState<any>(null);
  const [supplementData, setSupplementData] = useState<any>(null);

  useEffect(() => {
    loadBioavailabilityData();
  }, [supplementId]);

  const loadBioavailabilityData = async () => {
    // First try to get existing data
    const existing = await getSupplementBioavailability(supplementId);
    
    if (existing?.bioavailability_score > 0) {
      setSupplementData(existing);
    } else {
      // If no data exists, analyze it
      const userProfile = profile ? {
        age: profile.age,
        weight: profile.weight,
        gender: profile.gender,
      } : undefined;

      const newAnalysis = await analyzeBioavailability(supplementId, userProfile);
      if (newAnalysis) {
        setAnalysis(newAnalysis);
        // Reload supplement data after analysis
        const updated = await getSupplementBioavailability(supplementId);
        setSupplementData(updated);
      }
    }
  };

  const getBioavailabilityColor = (score: number) => {
    if (score >= 80) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (score >= 60) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    return 'bg-gradient-to-r from-red-500 to-pink-500';
  };

  const getBioavailabilityLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Boa';
    if (score >= 40) return 'Moderada';
    return 'Limitada';
  };

  const getFormColor = (factor: number) => {
    if (factor >= 5) return 'text-green-600 bg-green-50';
    if (factor >= 3) return 'text-blue-600 bg-blue-50';
    if (factor >= 2) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Analisando Biodisponibilidade...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!supplementData && !analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Otimização de Biodisponibilidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Analise as diferentes formas farmacêuticas para maximizar a absorção
          </p>
          <Button onClick={loadBioavailabilityData} disabled={loading}>
            Analisar Biodisponibilidade
          </Button>
        </CardContent>
      </Card>
    );
  }

  const data = supplementData || analysis;
  const forms = data?.pharmaceutical_forms || [];
  const score = data?.bioavailability_score || 0;

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Biodisponibilidade: {supplementName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Score de Biodisponibilidade</span>
              <Badge className={getBioavailabilityColor(score)}>
                {score}/100 - {getBioavailabilityLabel(score)}
              </Badge>
            </div>
            <Progress value={score} className="h-3" />
            
            {data?.optimal_form && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium text-green-700">Melhor Absorção</p>
                  <p className="text-lg font-semibold">{data.optimal_form}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium text-blue-700">Melhor Custo-Benefício</p>
                  <p className="text-lg font-semibold">{data.cost_benefit_form}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <Tabs defaultValue="forms" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forms">Formas</TabsTrigger>
          <TabsTrigger value="timing">Timing</TabsTrigger>
          <TabsTrigger value="interactions">Interações</TabsTrigger>
          <TabsTrigger value="recommendations">Dicas</TabsTrigger>
        </TabsList>

        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparação de Formas Farmacêuticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forms.map((form: PharmaceuticalFormAnalysis, index: number) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{form.name}</h4>
                      <Badge className={getFormColor(form.bioavailabilityFactor)}>
                        {form.bioavailabilityFactor}x absorção
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Taxa:</span>
                        <span className="ml-1 font-medium">{form.absorptionRate}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Dose equiv:</span>
                        <span className="ml-1 font-medium">{form.equivalentDose}mg</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pico:</span>
                        <span className="ml-1 font-medium">{form.peakTimeHours}h</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duração:</span>
                        <span className="ml-1 font-medium">{form.durationHours}h</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {form.mechanismDescription}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Timing Circadiano Otimizado
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data?.circadian_timing && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                    <div>
                      <p className="font-semibold">Horário Ideal</p>
                      <p className="text-2xl font-bold text-blue-600">{data.circadian_timing.optimal}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {data.circadian_timing.with_meal ? 'Com refeição' : 'Estômago vazio'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Razão:</strong> {data.circadian_timing.reason}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  Potencializadores de Absorção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(data?.absorption_enhancers || []).map((enhancer: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      {enhancer}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Inibidores de Absorção
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(data?.absorption_inhibitors || []).map((inhibitor: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                      {inhibitor}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Recomendações Personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysis?.recommendations && (
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <p className="font-medium">Recomendação Principal</p>
                    <p className="text-sm">{analysis.recommendations.primaryRecommendation}</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <p className="font-medium">Timing</p>
                    <p className="text-sm">{analysis.recommendations.timingRecommendation}</p>
                  </div>
                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                    <p className="font-medium">Ajuste de Dose</p>
                    <p className="text-sm">{analysis.recommendations.doseAdjustment}</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <p className="font-medium">Otimização de Custo</p>
                    <p className="text-sm">{analysis.recommendations.costOptimization}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};