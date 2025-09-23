import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EvidenceBadge } from '@/components/ui/evidence-badge';
import { Calendar, Target, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import type { TherapeuticProtocol } from '@/types/protocols';

interface ProtocolCardProps {
  protocol: TherapeuticProtocol;
  confidence?: number;
  onSelect?: (protocolId: string) => void;
  isSelected?: boolean;
  showDetails?: boolean;
}

export function ProtocolCard({ 
  protocol, 
  confidence, 
  onSelect, 
  isSelected = false,
  showDetails = false 
}: ProtocolCardProps) {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(protocol.id);
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getConfidenceIcon = (score: number) => {
    if (score >= 80) return CheckCircle2;
    if (score >= 60) return AlertCircle;
    return AlertCircle;
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-text-dark">
              Protocolo para {protocol.condition}
            </CardTitle>
            <CardDescription className="mt-1">
              {protocol.supplement_combination.length} suplementos em sinergia
            </CardDescription>
          </div>
          {confidence && (
            <div className="flex items-center gap-2">
              {React.createElement(getConfidenceIcon(confidence), {
                className: `h-5 w-5 ${getConfidenceColor(confidence)}`
              })}
              <span className={`text-sm font-semibold ${getConfidenceColor(confidence)}`}>
                {confidence}%
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Supplements combination */}
        <div>
          <h4 className="font-medium text-text-dark mb-2 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Combinação Terapêutica
          </h4>
          <div className="flex flex-wrap gap-2">
            {protocol.supplement_combination.map((supplement, index) => (
              <div key={index} className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs">
                  {supplement.nome}
                </Badge>
                <EvidenceBadge 
                  evidence={supplement.evidencia.toLowerCase() as 'strong' | 'moderate' | 'limited'}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Synergy description */}
        {protocol.synergy_description && (
          <div>
            <h4 className="font-medium text-text-dark mb-1 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
              Sinergia
            </h4>
            <p className="text-sm text-text-light">{protocol.synergy_description}</p>
          </div>
        )}

        {/* Expected efficacy */}
        {protocol.expected_efficacy && (
          <div>
            <h4 className="font-medium text-text-dark mb-1 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Eficácia Esperada
            </h4>
            <p className="text-sm text-text-light">{protocol.expected_efficacy}</p>
          </div>
        )}

        {/* Implementation timeline */}
        {showDetails && protocol.implementation_phases && (
          <div>
            <h4 className="font-medium text-text-dark mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Implementação Clínica
            </h4>
            <div className="space-y-1">
              {protocol.implementation_phases.fase_inicial && (
                <div className="text-xs">
                  <span className="font-medium">Fase inicial:</span> {protocol.implementation_phases.fase_inicial}
                </div>
              )}
              {protocol.implementation_phases.titulacao && (
                <div className="text-xs">
                  <span className="font-medium">Titulação:</span> {protocol.implementation_phases.titulacao}
                </div>
              )}
              {protocol.implementation_phases.avaliacao_resposta && (
                <div className="text-xs">
                  <span className="font-medium">Avaliação:</span> {protocol.implementation_phases.avaliacao_resposta}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action button */}
        {onSelect && (
        <Button
          onClick={handleSelect}
          variant={isSelected ? "primary" : "outline"}
          size="sm"
          className="w-full"
        >
          {isSelected ? 'Protocolo Selecionado' : 'Selecionar Protocolo'}
        </Button>
        )}
      </CardContent>
    </Card>
  );
}