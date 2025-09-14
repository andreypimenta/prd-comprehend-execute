import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { RecommendationsGrid } from "@/components/dashboard/RecommendationsGrid";
import { ConfidenceChart } from "@/components/dashboard/ConfidenceChart";
import { ExportButton } from "@/components/export/ExportButton";
import type { DashboardData } from '@/types/dashboard';
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'overview' | 'detailed' | 'analysis'>('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch recommendations and build dashboard data
      const { data, error } = await supabase.functions.invoke('analyze', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (data?.hasRecommendations) {
        // Transform data to dashboard format
        const mockDashboardData: DashboardData = {
          user: { name: "João Silva", email: "joao@example.com", profileCompleteness: 85 },
          recommendations: {
            total: data.recommendations?.length || 0,
            highPriority: data.recommendations?.filter((r: any) => r.priority === 'high').length || 0,
            mediumPriority: data.recommendations?.filter((r: any) => r.priority === 'medium').length || 0,
            lowPriority: data.recommendations?.filter((r: any) => r.priority === 'low').length || 0,
            averageConfidence: data.recommendations?.reduce((sum: number, r: any) => sum + r.confidence, 0) / (data.recommendations?.length || 1) || 0,
            categories: [
              { category: 'Vitaminas', count: 3, averageConfidence: 85, color: '#48BB78' },
              { category: 'Minerais', count: 2, averageConfidence: 78, color: '#4299E1' }
            ]
          },
          supplements: data.recommendations?.map((r: any) => ({
            id: r.id,
            supplement: r.supplement,
            recommendedDosage: r.recommended_dosage,
            confidence: r.confidence,
            reasoning: r.reasoning,
            priority: r.priority,
            estimatedCost: 45
          })) || [],
          analysis: {
            generatedAt: new Date().toISOString(),
            totalScore: 85,
            topConcerns: ['Fadiga crônica pode indicar deficiências'],
            keyBenefits: ['Aumento de energia', 'Melhoria do sono']
          }
        };
        setDashboardData(mockDashboardData);
      }
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={{ name: "Usuário", email: "", image: null }} />
        <div className="container mx-auto p-6">
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">Nenhuma análise encontrada</p>
              <p className="text-sm text-muted-foreground mb-6">Complete seu onboarding para ver suas recomendações</p>
              <Button asChild>
                <Link to="/onboarding">Começar Análise</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={{ name: dashboardData.user.name, email: dashboardData.user.email, image: null }} />
      
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Seu Dashboard</h1>
            <p className="text-muted-foreground">
              Análise gerada em {new Date(dashboardData.analysis.generatedAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">{dashboardData.recommendations.total} Recomendações</Badge>
            <ExportButton dashboardData={dashboardData} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
          <div className="flex items-center justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">📊 Visão Geral</TabsTrigger>
              <TabsTrigger value="detailed">🔍 Detalhado</TabsTrigger>
              <TabsTrigger value="analysis">🧬 Análise</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <DashboardOverview data={dashboardData} />
          </TabsContent>

          <TabsContent value="detailed">
            <RecommendationsGrid recommendations={dashboardData.supplements} />
          </TabsContent>

          <TabsContent value="analysis">
            <div className="space-y-6">
              <ConfidenceChart data={dashboardData.recommendations}>
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Principais Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Principais Preocupações</h4>
                        <div className="space-y-2">
                          {dashboardData.analysis.topConcerns.map((concern, index) => (
                            <p key={index} className="text-sm text-muted-foreground">• {concern}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Benefícios Esperados</h4>
                        <div className="space-y-2">
                          {dashboardData.analysis.keyBenefits.map((benefit, index) => (
                            <p key={index} className="text-sm text-muted-foreground">✅ {benefit}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ConfidenceChart>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}