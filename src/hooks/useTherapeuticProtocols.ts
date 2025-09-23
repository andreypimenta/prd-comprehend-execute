import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type DbTherapeuticProtocol = Database['public']['Tables']['therapeutic_protocols']['Row'];
type DbProtocolRecommendation = Database['public']['Tables']['protocol_recommendations']['Row'];

interface TherapeuticProtocol {
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

interface SupplementInProtocol {
  nome: string;
  agente: string;
  evidencia: 'A' | 'B' | 'D';
  mecanismo: string;
}

interface ImplementationPhases {
  fase_inicial?: string;
  titulacao?: string;
  avaliacao_resposta?: string;
  ajustes?: string;
  descontinuacao?: string;
}

interface MonitoringParameters {
  baseline?: string;
  seguimento_inicial?: string;
  seguimento_regular?: string;
  parametros_laboratoriais?: string[];
  parametros_clinicos?: string;
}

interface IndividualizationFactors {
  fatores_idade?: string;
  fatores_geneticos?: string;
  comorbidades?: string;
  medicamentos?: string;
  estilo_vida?: string;
}

interface ProtocolRecommendation {
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

export function useTherapeuticProtocols() {
  const [protocols, setProtocols] = useState<TherapeuticProtocol[]>([]);
  const [userProtocols, setUserProtocols] = useState<ProtocolRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all available protocols
  const fetchProtocols = async () => {
    try {
      const { data, error } = await supabase
        .from('therapeutic_protocols')
        .select('*')
        .order('condition', { ascending: true });

      if (error) throw error;
      
      // Transform database records to proper TypeScript types
      const transformedData: TherapeuticProtocol[] = (data || []).map(protocol => ({
        ...protocol,
        supplement_combination: Array.isArray(protocol.supplement_combination) 
          ? (protocol.supplement_combination as unknown as SupplementInProtocol[])
          : [],
        implementation_phases: (protocol.implementation_phases as ImplementationPhases) || {},
        monitoring_parameters: (protocol.monitoring_parameters as MonitoringParameters) || {},
        individualization_factors: (protocol.individualization_factors as IndividualizationFactors) || {}
      }));
      
      setProtocols(transformedData);
    } catch (err) {
      console.error('Error fetching protocols:', err);
      setError(err instanceof Error ? err.message : 'Error loading protocols');
    }
  };

  // Fetch user's protocol recommendations
  const fetchUserProtocols = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('protocol_recommendations')
        .select(`
          *,
          protocol:therapeutic_protocols(*)
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('confidence_score', { ascending: false });

      if (error) throw error;
      
      // Transform database records to proper TypeScript types
      const transformedData: ProtocolRecommendation[] = (data || []).map(rec => {
        const protocol = rec.protocol as DbTherapeuticProtocol;
        return {
          ...rec,
          protocol: protocol ? {
            ...protocol,
            supplement_combination: Array.isArray(protocol.supplement_combination) 
              ? (protocol.supplement_combination as unknown as SupplementInProtocol[])
              : [],
            implementation_phases: (protocol.implementation_phases as ImplementationPhases) || {},
            monitoring_parameters: (protocol.monitoring_parameters as MonitoringParameters) || {},
            individualization_factors: (protocol.individualization_factors as IndividualizationFactors) || {}
          } : undefined
        };
      });
      
      setUserProtocols(transformedData);
    } catch (err) {
      console.error('Error fetching user protocols:', err);
      setError(err instanceof Error ? err.message : 'Error loading user protocols');
    }
  };

  // Create a protocol recommendation for user
  const createProtocolRecommendation = async (
    protocolId: string, 
    confidenceScore: number, 
    personalizationNotes?: string
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('protocol_recommendations')
        .insert({
          user_id: user.id,
          protocol_id: protocolId,
          confidence_score: confidenceScore,
          personalization_notes: personalizationNotes
        })
        .select('*')
        .single();

      if (error) throw error;

      // Refresh user protocols
      await fetchUserProtocols();
      
      return data;
    } catch (err) {
      console.error('Error creating protocol recommendation:', err);
      throw err;
    }
  };

  // Update protocol recommendation
  const updateProtocolRecommendation = async (
    recommendationId: string,
    updates: Partial<Pick<ProtocolRecommendation, 'confidence_score' | 'personalization_notes' | 'is_active'>>
  ) => {
    try {
      const { data, error } = await supabase
        .from('protocol_recommendations')
        .update(updates)
        .eq('id', recommendationId)
        .select('*')
        .single();

      if (error) throw error;

      // Refresh user protocols
      await fetchUserProtocols();
      
      return data;
    } catch (err) {
      console.error('Error updating protocol recommendation:', err);
      throw err;
    }
  };

  // Find protocols by condition/symptoms
  const findProtocolsByCondition = (symptoms: string[]): TherapeuticProtocol[] => {
    if (!symptoms || symptoms.length === 0) return [];
    
    return protocols.filter(protocol => {
      const condition = protocol.condition.toLowerCase();
      return symptoms.some(symptom => 
        condition.includes(symptom.toLowerCase()) ||
        symptom.toLowerCase().includes(condition)
      );
    });
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchProtocols(),
          fetchUserProtocols()
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    protocols,
    userProtocols,
    loading,
    error,
    fetchProtocols,
    fetchUserProtocols,
    createProtocolRecommendation,
    updateProtocolRecommendation,
    findProtocolsByCondition,
    refetch: () => Promise.all([fetchProtocols(), fetchUserProtocols()])
  };
}