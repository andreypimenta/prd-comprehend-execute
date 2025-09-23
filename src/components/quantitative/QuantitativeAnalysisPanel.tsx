import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, Cell } from 'recharts';
import { Activity, BarChart3, Brain, TrendingUp, Zap, Target, AlertTriangle } from 'lucide-react';
import { useQuantitativeAnalysis, PBPKResult, MonteCarloResult, SynergyResult, OptimizationResult } from '@/hooks/useQuantitativeAnalysis';
import { useUserProfile } from '@/hooks/useUserProfile';
import { toast } from 'sonner';

interface QuantitativeAnalysisPanelProps {
  supplementIds: string[];
  onClose?: () => void;
}

export const QuantitativeAnalysisPanel: React.FC<QuantitativeAnalysisPanelProps> = ({
  supplementIds,
  onClose
}) => {
  const { runAnalysis, loading, error } = useQuantitativeAnalysis();
  const { profile: userProfile } = useUserProfile();
  const [activeTab, setActiveTab] = useState('pbpk');
  const [analysisResults, setAnalysisResults] = useState<{
    pbpk?: PBPKResult[];
    monte_carlo?: MonteCarloResult[];
    synergy_ml?: SynergyResult;
    optimization?: OptimizationResult;
  }>({});

  const runSpecificAnalysis = async (analysisType: 'pbpk' | 'monte_carlo' | 'synergy_ml' | 'optimization') => {
    if (!userProfile) {
      toast.error('Perfil do usuário não encontrado');
      return;
    }

    const result = await runAnalysis({
      supplement_ids: supplementIds,
      user_profile: {
        user_id: userProfile.user_id,
        age: userProfile.age,
        weight: userProfile.weight,
        gender: userProfile.gender,
        symptoms: userProfile.symptoms,
        health_goals: userProfile.health_goals
      },
      analysis_type: analysisType
    });

    if (result && result.success) {
      setAnalysisResults(prev => ({
        ...prev,
        [analysisType]: result.results
      }));
      toast.success(`Análise ${analysisType.toUpperCase()} concluída com sucesso!`);
    } else {
      toast.error(`Falha na análise ${analysisType.toUpperCase()}`);
    }
  };

  const renderPBPKAnalysis = () => {
    const pbpkData = analysisResults.pbpk;
    if (!pbpkData) {
      return (
        <div className="text-center py-8">
          <Button onClick={() => runSpecificAnalysis('pbpk')} disabled={loading}>
            {loading ? <LoadingSpinner className="w-4 h-4 mr-2" /> : <Activity className="w-4 h-4 mr-2" />}
            Executar Análise PBPK
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Análise farmacocinética baseada em fisiologia
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {pbpkData.map((result, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                {result.supplement_name}
              </CardTitle>
              <CardDescription>
                Perfil farmacocinético personalizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Concentração-Tempo</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={result.pbpk_analysis.timeProfile}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" label={{ value: 'Tempo (h)', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Concentração (ng/mL)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="concentration" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Pico de Concentração</div>
                      <div className="text-lg font-semibold">
                        {result.pbpk_analysis.peakConcentration.toFixed(2)} ng/mL
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Tempo do Pico</div>
                      <div className="text-lg font-semibold">
                        {result.pbpk_analysis.peakTime}h
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">AUC</div>
                      <div className="text-lg font-semibold">
                        {result.pbpk_analysis.auc.toFixed(1)}
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Biodisponibilidade</div>
                      <div className="text-lg font-semibold">
                        {(result.pbpk_analysis.adjustedParams.bioavailability * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderMonteCarloAnalysis = () => {
    const mcData = analysisResults.monte_carlo;
    if (!mcData) {
      return (
        <div className="text-center py-8">
          <Button onClick={() => runSpecificAnalysis('monte_carlo')} disabled={loading}>
            {loading ? <LoadingSpinner className="w-4 h-4 mr-2" /> : <BarChart3 className="w-4 h-4 mr-2" />}
            Executar Simulação Monte Carlo
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Análise de variabilidade populacional
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {mcData.map((result, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                {result.supplement_name}
              </CardTitle>
              <CardDescription>
                Simulação com {result.monte_carlo_simulation.iterations} iterações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Distribuição - Concentração Máxima</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Média: {result.monte_carlo_simulation.peakConcentration.mean.toFixed(2)} ng/mL</span>
                      <span>DP: ±{result.monte_carlo_simulation.peakConcentration.std.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>P5: {result.monte_carlo_simulation.peakConcentration.percentile_5.toFixed(2)}</span>
                      <span>P95: {result.monte_carlo_simulation.peakConcentration.percentile_95.toFixed(2)}</span>
                    </div>
                    <Progress 
                      value={85} 
                      className="h-2"
                    />
                    <div className="text-xs text-center text-muted-foreground">
                      IC 95%: Variabilidade populacional
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Área Sob a Curva (AUC)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Média: {result.monte_carlo_simulation.auc.mean.toFixed(1)}</span>
                      <span>DP: ±{result.monte_carlo_simulation.auc.std.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>P5: {result.monte_carlo_simulation.auc.percentile_5.toFixed(1)}</span>
                      <span>P95: {result.monte_carlo_simulation.auc.percentile_95.toFixed(1)}</span>
                    </div>
                    <Progress 
                      value={75} 
                      className="h-2"
                    />
                    <div className="text-xs text-center text-muted-foreground">
                      Exposição sistêmica esperada
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium">Interpretação Clínica</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      A variabilidade observada ({result.monte_carlo_simulation.peakConcentration.std.toFixed(1)} ng/mL) 
                      indica que a resposta individual pode variar significativamente. 
                      Monitoramento personalizado é recomendado.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderSynergyAnalysis = () => {
    const synergyData = analysisResults.synergy_ml;
    if (!synergyData) {
      return (
        <div className="text-center py-8">
          <Button onClick={() => runSpecificAnalysis('synergy_ml')} disabled={loading}>
            {loading ? <LoadingSpinner className="w-4 h-4 mr-2" /> : <Brain className="w-4 h-4 mr-2" />}
            Executar Análise ML de Sinergias
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Predições de machine learning para interações
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {synergyData.synergy_predictions.map((prediction, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  {prediction.supplement_pair.join(' + ')}
                </div>
                <Badge variant={prediction.synergy_score > 0.7 ? 'default' : prediction.synergy_score > 0.5 ? 'secondary' : 'outline'}>
                  Score: {(prediction.synergy_score * 100).toFixed(0)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {prediction.predicted_efficacy_boost.toFixed(1)}x
                  </div>
                  <div className="text-sm text-muted-foreground">Aumento de Eficácia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">
                    {(prediction.confidence_level * 100).toFixed(0)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Confiança ML</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-info">
                    Baixo
                  </div>
                  <div className="text-sm text-muted-foreground">Risco de Interação</div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h5 className="font-medium mb-2">Mecanismo de Sinergia</h5>
                <p className="text-sm text-muted-foreground">
                  {prediction.mechanism_description}
                </p>
              </div>

              <div className="mt-4">
                <h5 className="font-medium mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Características ML
                </h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Similaridade de Categoria: {prediction.features.category_similarity}</div>
                  <div>Sobreposição de Mecanismo: {(prediction.features.mechanism_overlap * 100).toFixed(0)}%</div>
                  <div>Complementaridade: {(prediction.features.bioavailability_complementarity * 100).toFixed(0)}%</div>
                  <div>Compatibilidade Temporal: {prediction.features.timing_compatibility === 1 ? 'Alta' : 'Moderada'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderOptimizationAnalysis = () => {
    const optData = analysisResults.optimization;
    if (!optData) {
      return (
        <div className="text-center py-8">
          <Button onClick={() => runSpecificAnalysis('optimization')} disabled={loading}>
            {loading ? <LoadingSpinner className="w-4 h-4 mr-2" /> : <Target className="w-4 h-4 mr-2" />}
            Executar Otimização Matemática
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Otimização multi-objetivo de dosagens
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Protocolo Otimizado
            </CardTitle>
            <CardDescription>
              Score de otimização: {(optData.optimization_score * 100).toFixed(0)}% | 
              Confiança: {(optData.confidence_score * 100).toFixed(0)}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optData.optimized_dosages.map((dosage, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{dosage.supplement_name}</div>
                    <div className="text-sm text-muted-foreground">Suplemento otimizado</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {dosage.optimized_dose.toFixed(0)} {dosage.unit}
                    </div>
                    <div className="text-sm text-muted-foreground">Dose otimizada</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Eficácia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-2">
                {(optData.predicted_outcomes.efficacy_score * 100).toFixed(0)}%
              </div>
              <Progress value={optData.predicted_outcomes.efficacy_score * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Custo-Benefício</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success mb-2">
                {(optData.predicted_outcomes.cost_score * 100).toFixed(0)}%
              </div>
              <Progress value={optData.predicted_outcomes.cost_score * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Segurança</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info mb-2">
                {(optData.predicted_outcomes.safety_score * 100).toFixed(0)}%
              </div>
              <Progress value={optData.predicted_outcomes.safety_score * 100} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {optData.predicted_outcomes.synergy_effects.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Efeitos Sinérgicos Detectados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {optData.predicted_outcomes.synergy_effects.map((synergy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{synergy.supplements.join(' + ')}</div>
                      <div className="text-sm text-muted-foreground">
                        Score: {(synergy.synergy_score * 100).toFixed(0)}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        +{((synergy.efficacy_boost - 1) * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Aumento</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p>Erro na análise quantitativa: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Análise Quantitativa Avançada</h2>
          <p className="text-muted-foreground">
            Modelos PBPK, simulações Monte Carlo e machine learning para otimização
          </p>
        </div>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pbpk" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            PBPK
          </TabsTrigger>
          <TabsTrigger value="monte_carlo" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Monte Carlo
          </TabsTrigger>
          <TabsTrigger value="synergy" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Sinergias ML
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Otimização
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pbpk">
          {renderPBPKAnalysis()}
        </TabsContent>

        <TabsContent value="monte_carlo">
          {renderMonteCarloAnalysis()}
        </TabsContent>

        <TabsContent value="synergy">
          {renderSynergyAnalysis()}
        </TabsContent>

        <TabsContent value="optimization">
          {renderOptimizationAnalysis()}
        </TabsContent>
      </Tabs>
    </div>
  );
};