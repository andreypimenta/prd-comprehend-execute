import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProtocolCard } from '@/components/protocols/ProtocolCard';
import { Stethoscope, Target, TrendingUp } from 'lucide-react';
import type { TherapeuticProtocol } from '@/types/protocols';

interface ProtocolRecommendationsProps {
  protocols: (TherapeuticProtocol & { confidence_score?: number })[];
}

export function ProtocolRecommendations({ protocols }: ProtocolRecommendationsProps) {
  if (!protocols || protocols.length === 0) {
    return null;
  }

  const highConfidenceProtocols = protocols.filter(p => (p.confidence_score || 0) >= 70);
  const mediumConfidenceProtocols = protocols.filter(p => {
    const score = p.confidence_score || 0;
    return score >= 50 && score < 70;
  });

  const getProtocolStats = () => {
    const totalProtocols = protocols.length;
    const avgConfidence = protocols.reduce((acc, p) => acc + (p.confidence_score || 0), 0) / totalProtocols;
    const strongEvidenceCount = protocols.reduce((acc, p) => {
      return acc + p.supplement_combination.filter(s => s.evidencia === 'A').length;
    }, 0);

    return { totalProtocols, avgConfidence: Math.round(avgConfidence), strongEvidenceCount };
  };

  const { totalProtocols, avgConfidence, strongEvidenceCount } = getProtocolStats();

  return (
    <div className="space-y-6">
      {/* Protocols Overview Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            Protocolos Terapêuticos Recomendados
          </CardTitle>
          <CardDescription>
            Combinações científicas personalizadas baseadas no seu perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-dark">{totalProtocols}</p>
                <p className="text-sm text-text-light">Protocolos Recomendados</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-dark">{avgConfidence}%</p>
                <p className="text-sm text-text-light">Confiança Média</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-success/5 rounded-lg">
              <div className="p-2 bg-success/10 rounded-lg">
                <Stethoscope className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-dark">{strongEvidenceCount}</p>
                <p className="text-sm text-text-light">Suplementos Evidência A</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* High Confidence Protocols */}
      {highConfidenceProtocols.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Alta Confiança (≥70%)
            </Badge>
            <span className="text-sm text-text-light">
              {highConfidenceProtocols.length} protocolo{highConfidenceProtocols.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="space-y-4">
            {highConfidenceProtocols.map((protocol) => (
              <ProtocolCard
                key={protocol.id}
                protocol={protocol}
                confidence={protocol.confidence_score}
                showDetails={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Medium Confidence Protocols */}
      {mediumConfidenceProtocols.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Confiança Moderada (50-69%)
            </Badge>
            <span className="text-sm text-text-light">
              {mediumConfidenceProtocols.length} protocolo{mediumConfidenceProtocols.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="space-y-4">
            {mediumConfidenceProtocols.map((protocol) => (
              <ProtocolCard
                key={protocol.id}
                protocol={protocol}
                confidence={protocol.confidence_score}
                showDetails={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Implementation Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Diretrizes de Implementação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-text-dark">🎯 Priorização</h4>
              <p className="text-sm text-text-light">
                Comece pelos protocolos de alta confiança. Implemente gradualmente conforme tolerabilidade.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-text-dark">⚡ Sinergia</h4>
              <p className="text-sm text-text-light">
                Os protocolos são otimizados para maximizar a interação benéfica entre suplementos.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-text-dark">📊 Monitoramento</h4>
              <p className="text-sm text-text-light">
                Acompanhe os parâmetros sugeridos para cada protocolo durante a implementação.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-text-dark">🔬 Evidência Científica</h4>
              <p className="text-sm text-text-light">
                Protocolos baseados em evidência científica classificada (A = forte, B = moderada, D = limitada).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}