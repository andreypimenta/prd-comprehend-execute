import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProtocolCard } from '@/components/protocols/ProtocolCard';
import { Stethoscope, TrendingUp, Clock, Target } from 'lucide-react';
import { useTherapeuticProtocols } from '@/hooks/useTherapeuticProtocols';

export function ProtocolsOverview() {
  const { 
    protocols, 
    userProtocols, 
    loading, 
    error,
    createProtocolRecommendation 
  } = useTherapeuticProtocols();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Protocolos Terapêuticos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Protocolos Terapêuticos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">Erro ao carregar protocolos: {error}</p>
        </CardContent>
      </Card>
    );
  }

  const handleSelectProtocol = async (protocolId: string) => {
    try {
      await createProtocolRecommendation(
        protocolId, 
        75, 
        'Protocolo selecionado pelo usuário no dashboard'
      );
    } catch (err) {
      console.error('Erro ao selecionar protocolo:', err);
    }
  };

  const getProtocolStats = () => {
    const totalProtocols = protocols.length;
    const activeUserProtocols = userProtocols.filter(up => up.is_active).length;
    const avgConfidence = userProtocols.reduce((acc, up) => acc + up.confidence_score, 0) / 
                          Math.max(userProtocols.length, 1);
    
    return { totalProtocols, activeUserProtocols, avgConfidence };
  };

  const { totalProtocols, activeUserProtocols, avgConfidence } = getProtocolStats();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-dark">{totalProtocols}</p>
                <p className="text-sm text-text-light">Protocolos Disponíveis</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-dark">{activeUserProtocols}</p>
                <p className="text-sm text-text-light">Protocolos Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-dark">{Math.round(avgConfidence)}%</p>
                <p className="text-sm text-text-light">Confiança Média</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Protocols Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Protocolos Terapêuticos
          </CardTitle>
          <CardDescription>
            Protocolos científicos para tratamento integrado de condições de saúde
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recommended" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recommended">Recomendados para Você</TabsTrigger>
              <TabsTrigger value="all">Todos os Protocolos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommended" className="mt-6">
              {userProtocols.length > 0 ? (
                <div className="grid gap-4">
                  {userProtocols.map((userProtocol) => (
                    userProtocol.protocol && (
                      <ProtocolCard
                        key={userProtocol.id}
                        protocol={userProtocol.protocol}
                        confidence={userProtocol.confidence_score}
                        showDetails={true}
                      />
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-text-light">Nenhum protocolo recomendado ainda</p>
                  <p className="text-sm text-text-light mt-2">
                    Complete seu perfil para receber recomendações personalizadas
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-4">
                {protocols.map((protocol) => {
                  const isSelected = userProtocols.some(up => up.protocol_id === protocol.id);
                  return (
                    <ProtocolCard
                      key={protocol.id}
                      protocol={protocol}
                      onSelect={handleSelectProtocol}
                      isSelected={isSelected}
                      showDetails={false}
                    />
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}