export interface TherapeuticProtocol {
  id: string;
  condition: string;
  supplement_combination: SupplementInProtocol[];
  synergy_description?: string;
  expected_efficacy?: string;
  implementation_phases: ImplementationPhases;
  monitoring_parameters: MonitoringParameters;
  individualization_factors: IndividualizationFactors;
  created_at: string;
  updated_at: string;
}

export interface SupplementInProtocol {
  nome: string;
  agente: string;
  evidencia: 'A' | 'B' | 'D';
  mecanismo: string;
}

export interface ImplementationPhases {
  fase_inicial?: string;
  titulacao?: string;
  avaliacao_resposta?: string;
  ajustes?: string;
  descontinuacao?: string;
}

export interface MonitoringParameters {
  baseline?: string;
  seguimento_inicial?: string;
  seguimento_regular?: string;
  parametros_laboratoriais?: string[];
  parametros_clinicos?: string;
}

export interface IndividualizationFactors {
  fatores_idade?: string;
  fatores_geneticos?: string;
  comorbidades?: string;
  medicamentos?: string;
  estilo_vida?: string;
}

export interface ProtocolRecommendation {
  id: string;
  user_id: string;
  protocol_id: string;
  protocol?: TherapeuticProtocol;
  confidence_score: number;
  personalization_notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Enhanced supplement interface with new fields
export interface EnhancedSupplement extends Supplement {
  mechanism?: string;
  agent_category?: string;
  medical_conditions?: string[];
  synergy_potential?: string;
  priority_level?: 'muito_alta' | 'alta' | 'media' | 'baixa';
  scientific_evidence?: 'A' | 'B' | 'D';
}

// Import base Supplement type
import { Supplement } from './supplements';