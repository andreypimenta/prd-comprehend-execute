import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/integrations/supabase/types';

type TherapeuticProtocol = Database['public']['Tables']['therapeutic_protocols']['Row'];
type Supplement = Database['public']['Tables']['supplements']['Row'];

interface ExamineProtocolStats {
  totalProtocols: number;
  protocolsByCategory: Record<string, number>;
  evidenceLevels: Record<string, number>;
  totalSupplements: number;
  supplementsByEvidence: Record<string, number>;
}

export const useExamineProtocols = () => {
  const [protocols, setProtocols] = useState<TherapeuticProtocol[]>([]);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ExamineProtocolStats>({
    totalProtocols: 0,
    protocolsByCategory: {},
    evidenceLevels: {},
    totalSupplements: 0,
    supplementsByEvidence: {}
  });

  const fetchProtocols = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('therapeutic_protocols')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProtocols(data || []);
      calculateStats(data || [], supplements);
    } catch (err) {
      console.error('Error fetching protocols:', err);
      setError(err.message);
      toast.error('Erro ao buscar protocolos');
    } finally {
      setLoading(false);
    }
  };

  const fetchSupplements = async () => {
    try {
      const { data, error } = await supabase
        .from('supplements')
        .select('*')
        .order('scientific_evidence', { ascending: true });

      if (error) throw error;

      setSupplements(data || []);
      calculateStats(protocols, data || []);
    } catch (err) {
      console.error('Error fetching supplements:', err);
      setError(err.message);
      toast.error('Erro ao buscar suplementos');
    }
  };

  const calculateStats = (protocolsData: TherapeuticProtocol[], supplementsData: Supplement[]) => {
    // Calculate protocol statistics
    const protocolsByCategory: Record<string, number> = {};
    const evidenceLevels: Record<string, number> = {};

    protocolsData.forEach(protocol => {
      // Extract category from condition or use a default categorization
      const category = categorizeCondition(protocol.condition);
      protocolsByCategory[category] = (protocolsByCategory[category] || 0) + 1;

      // Count evidence levels from supplement combinations
      if (protocol.supplement_combination && Array.isArray(protocol.supplement_combination)) {
        (protocol.supplement_combination as any[]).forEach((supp: any) => {
          if (supp.evidencia) {
            evidenceLevels[supp.evidencia] = (evidenceLevels[supp.evidencia] || 0) + 1;
          }
        });
      }
    });

    // Calculate supplement statistics
    const supplementsByEvidence: Record<string, number> = {};
    supplementsData.forEach(supplement => {
      const evidence = supplement.scientific_evidence || 'D';
      supplementsByEvidence[evidence] = (supplementsByEvidence[evidence] || 0) + 1;
    });

    setStats({
      totalProtocols: protocolsData.length,
      protocolsByCategory,
      evidenceLevels,
      totalSupplements: supplementsData.length,
      supplementsByEvidence
    });
  };

  const categorizeCondition = (condition: string): string => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('cholesterol') || conditionLower.includes('hypertension') || 
        conditionLower.includes('heart') || conditionLower.includes('cardiovascular')) {
      return 'Cardiovascular';
    }
    
    if (conditionLower.includes('anxiety') || conditionLower.includes('memory') || 
        conditionLower.includes('cognitive') || conditionLower.includes('brain')) {
      return 'Neurological';
    }
    
    if (conditionLower.includes('performance') || conditionLower.includes('exercise') || 
        conditionLower.includes('body composition')) {
      return 'Performance';
    }
    
    if (conditionLower.includes('respiratory') || conditionLower.includes('rhinitis') || 
        conditionLower.includes('breathing')) {
      return 'Respiratory';
    }
    
    return 'Other';
  };

  const findProtocolsByCondition = (condition: string): TherapeuticProtocol[] => {
    return protocols.filter(protocol => 
      protocol.condition.toLowerCase().includes(condition.toLowerCase())
    );
  };

  const findSupplementsByEvidence = (evidenceLevel: 'A' | 'B' | 'D'): Supplement[] => {
    return supplements.filter(supplement => 
      supplement.scientific_evidence === evidenceLevel
    );
  };

  const getProtocolRecommendations = (symptoms: string[]): TherapeuticProtocol[] => {
    const relevantProtocols = protocols.filter(protocol => {
      const protocolCondition = protocol.condition.toLowerCase();
      return symptoms.some(symptom => 
        protocolCondition.includes(symptom.toLowerCase()) ||
        symptom.toLowerCase().includes(protocolCondition.split(' ')[0])
      );
    });

    // Sort by evidence level (A > B > D)
    return relevantProtocols.sort((a, b) => {
      const getProtocolEvidenceScore = (protocol: TherapeuticProtocol) => {
        if (!protocol.supplement_combination || !Array.isArray(protocol.supplement_combination)) return 0;
        
        let score = 0;
        (protocol.supplement_combination as any[]).forEach((supp: any) => {
          if (supp.evidencia === 'A') score += 3;
          else if (supp.evidencia === 'B') score += 2;
          else if (supp.evidencia === 'D') score += 1;
        });
        return score;
      };

      return getProtocolEvidenceScore(b) - getProtocolEvidenceScore(a);
    });
  };

  useEffect(() => {
    fetchProtocols();
    fetchSupplements();
  }, []);

  return {
    protocols,
    supplements,
    loading,
    error,
    stats,
    refetch: () => {
      fetchProtocols();
      fetchSupplements();
    },
    findProtocolsByCondition,
    findSupplementsByEvidence,
    getProtocolRecommendations
  };
};