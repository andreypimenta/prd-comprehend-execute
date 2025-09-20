import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProgressOverview } from '@/components/progress/ProgressOverview';
import { SymptomTrends } from '@/components/progress/SymptomTrends';
import { ComplianceChart } from '@/components/progress/ComplianceChart';
import { CheckinHistory } from '@/components/progress/CheckinHistory';
import { useCheckin } from '@/hooks/useCheckin';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Calendar, TrendingUp, BarChart3, History, Plus } from 'lucide-react';

const Progress = () => {
  const navigate = useNavigate();
  const { 
    checkinHistory, 
    loading, 
    error, 
    getProgressSummary, 
    getTrendData,
    hasCheckinThisWeek 
  } = useCheckin();

  const progressSummary = getProgressSummary();
  const trendData = getTrendData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-destructive mb-4">Erro ao carregar dados: {error}</p>
            <Button onClick={() => window.location.reload()}>
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (checkinHistory.length === 0) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Bem-vindo ao seu Painel de Progresso
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Acompanhe sua jornada de saúde através de check-ins semanais. 
              Complete seu primeiro check-in para começar a visualizar seus progressos e tendências.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/checkin')}
              className="gap-2"
            >
              <Plus className="w-5 h-5" />
              Fazer Primeiro Check-in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Seu Progresso
            </h1>
            <p className="text-muted-foreground">
              Acompanhe sua evolução e aderência aos suplementos
            </p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            {!hasCheckinThisWeek() && (
              <Button 
                onClick={() => navigate('/checkin')}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Novo Check-in
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          </div>
        </div>

        {/* Overview */}
        {progressSummary && (
          <div className="mb-8">
            <ProgressOverview summary={progressSummary} />
          </div>
        )}

        {/* Detailed Analytics */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Tendências
            </TabsTrigger>
            <TabsTrigger value="compliance" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Aderência
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="w-4 h-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <SymptomTrends data={trendData} />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceChart data={trendData} />
          </TabsContent>

          <TabsContent value="history">
            <CheckinHistory checkins={checkinHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Progress;