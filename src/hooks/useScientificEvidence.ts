import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ScientificEvidenceData {
  pubmed_studies: any[];
  clinical_trials: any[];
  cochrane_reviews: any[];
  pharmgkb_data: any;
  integrated_evidence_score: number;
  evidence_classification: string;
  last_evidence_update: string;
}

interface ScientificEvidence {
  id: string;
  supplement_id: string;
  database_source: string;
  study_id: string;
  title?: string;
  authors?: string[];
  publication_date?: string;
  study_type?: string;
  sample_size?: number;
  intervention?: string;
  outcome_measures?: string[];
  results_summary?: string;
  quality_score?: number;
  doi?: string;
  pmid?: string;
  raw_data?: any;
  created_at: string;
  updated_at: string;
}

export const useScientificEvidence = (supplementId?: string) => {
  const [evidence, setEvidence] = useState<ScientificEvidence[]>([]);
  const [supplementEvidence, setSupplementEvidence] = useState<ScientificEvidenceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch detailed scientific evidence for a supplement
  const fetchSupplementEvidence = async (suppId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: dbError } = await supabase
        .from('supplements')
        .select(`
          pubmed_studies,
          clinical_trials,
          cochrane_reviews,
          pharmgkb_data,
          integrated_evidence_score,
          evidence_classification,
          last_evidence_update
        `)
        .eq('id', suppId)
        .single();

      if (dbError) throw dbError;

      setSupplementEvidence({
        pubmed_studies: Array.isArray(data.pubmed_studies) ? data.pubmed_studies : [],
        clinical_trials: Array.isArray(data.clinical_trials) ? data.clinical_trials : [],
        cochrane_reviews: Array.isArray(data.cochrane_reviews) ? data.cochrane_reviews : [],
        pharmgkb_data: data.pharmgkb_data || {},
        integrated_evidence_score: data.integrated_evidence_score || 0,
        evidence_classification: data.evidence_classification || 'D',
        last_evidence_update: data.last_evidence_update || new Date().toISOString()
      });
    } catch (err) {
      console.error('Error fetching supplement evidence:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar evidências');
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed evidence records from scientific_evidence table
  const fetchDetailedEvidence = async (suppId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: dbError } = await supabase
        .from('scientific_evidence')
        .select('*')
        .eq('supplement_id', suppId)
        .order('quality_score', { ascending: false });

      if (dbError) throw dbError;

      const typedEvidence = (data || []).map(item => ({
        ...item,
        authors: Array.isArray(item.authors) ? item.authors : [],
        outcome_measures: Array.isArray(item.outcome_measures) ? item.outcome_measures : [],
        raw_data: item.raw_data || {}
      }));

      setEvidence(typedEvidence);
    } catch (err) {
      console.error('Error fetching detailed evidence:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar evidências detalhadas');
    } finally {
      setLoading(false);
    }
  };

  // Collect evidence from scientific databases
  const collectEvidence = async (supplementName: string, suppId: string, conditions: string[] = []) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('scientific-evidence-collector', {
        body: {
          supplement_name: supplementName,
          supplement_id: suppId,
          conditions
        }
      });

      if (functionError) throw functionError;

      if (data?.success) {
        toast.success(`Coletadas ${data.evidence_count} evidências de ${data.databases_searched} bases científicas`);
        
        // Refresh evidence data
        await Promise.all([
          fetchSupplementEvidence(suppId),
          fetchDetailedEvidence(suppId)
        ]);
      } else {
        throw new Error(data?.error || 'Erro ao coletar evidências');
      }
    } catch (err) {
      console.error('Error collecting evidence:', err);
      setError(err instanceof Error ? err.message : 'Erro ao coletar evidências científicas');
      toast.error('Erro ao coletar evidências científicas');
    } finally {
      setLoading(false);
    }
  };

  // Get evidence statistics
  const getEvidenceStats = () => {
    if (!supplementEvidence) return null;

    return {
      totalStudies: (supplementEvidence.pubmed_studies?.length || 0) +
                   (supplementEvidence.clinical_trials?.length || 0) +
                   (supplementEvidence.cochrane_reviews?.length || 0),
      pubmedCount: supplementEvidence.pubmed_studies?.length || 0,
      clinicalTrialsCount: supplementEvidence.clinical_trials?.length || 0,
      cochraneCount: supplementEvidence.cochrane_reviews?.length || 0,
      hasPharmGKB: supplementEvidence.pharmgkb_data && Object.keys(supplementEvidence.pharmgkb_data).length > 0,
      evidenceScore: supplementEvidence.integrated_evidence_score || 0,
      evidenceGrade: supplementEvidence.evidence_classification || 'D',
      lastUpdate: supplementEvidence.last_evidence_update
    };
  };

  // Auto-fetch evidence when supplementId changes
  useEffect(() => {
    if (supplementId) {
      Promise.all([
        fetchSupplementEvidence(supplementId),
        fetchDetailedEvidence(supplementId)
      ]);
    }
  }, [supplementId]);

  return {
    evidence,
    supplementEvidence,
    loading,
    error,
    fetchSupplementEvidence,
    fetchDetailedEvidence,
    collectEvidence,
    getEvidenceStats
  };
};