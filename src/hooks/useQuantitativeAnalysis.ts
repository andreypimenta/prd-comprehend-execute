import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface QuantitativeAnalysisParams {
  supplement_ids: string[];
  user_profile: any;
  analysis_type: 'pbpk' | 'monte_carlo' | 'synergy_ml' | 'optimization';
}

interface PBPKResult {
  supplement_id: string;
  supplement_name: string;
  pbpk_analysis: {
    timeProfile: Array<{ time: number; concentration: number }>;
    peakTime: number;
    peakConcentration: number;
    auc: number;
    adjustedParams: any;
  };
}

interface MonteCarloResult {
  supplement_id: string;
  supplement_name: string;
  monte_carlo_simulation: {
    peakConcentration: {
      mean: number;
      std: number;
      percentile_5: number;
      percentile_95: number;
      distribution: number[];
    };
    auc: {
      mean: number;
      std: number;
      percentile_5: number;
      percentile_95: number;
      distribution: number[];
    };
    iterations: number;
    confidence_interval: number;
  };
}

interface SynergyResult {
  synergy_predictions: Array<{
    supplement_pair: string[];
    synergy_score: number;
    confidence_level: number;
    predicted_efficacy_boost: number;
    mechanism_description: string;
    safety_assessment: any;
    features: any;
  }>;
}

interface OptimizationResult {
  optimized_dosages: Array<{
    supplement_id: string;
    supplement_name: string;
    optimized_dose: number;
    unit: string;
  }>;
  predicted_outcomes: {
    efficacy_score: number;
    cost_score: number;
    safety_score: number;
    synergy_effects: Array<{
      supplements: string[];
      synergy_score: number;
      efficacy_boost: number;
    }>;
  };
  optimization_score: number;
  confidence_score: number;
}

interface QuantitativeAnalysisResult {
  success: boolean;
  analysis_id?: string;
  analysis_type: string;
  results: PBPKResult[] | MonteCarloResult[] | SynergyResult | OptimizationResult;
  timestamp: string;
  error?: string;
}

interface StoredAnalysis {
  id: string;
  supplement_ids: string[];
  analysis_type: string;
  results: any;
  statistical_significance: number;
  created_at: string;
}

export const useQuantitativeAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async (params: QuantitativeAnalysisParams): Promise<QuantitativeAnalysisResult | null> => {
    setLoading(true);
    setError(null);

    try {
      console.log('Running quantitative analysis:', params);

      const { data, error: invokeError } = await supabase.functions.invoke('quantitative-analyzer', {
        body: params
      });

      if (invokeError) {
        throw invokeError;
      }

      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }

      console.log('Quantitative analysis completed:', data);
      return data;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to run quantitative analysis';
      console.error('Quantitative analysis error:', err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getStoredAnalyses = async (analysisType?: string): Promise<StoredAnalysis[]> => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('quantitative_analysis')
        .select('*')
        .order('created_at', { ascending: false });

      if (analysisType) {
        query = query.eq('analysis_type', analysisType);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      return data || [];

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stored analyses';
      console.error('Fetch analyses error:', err);
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getSynergyPredictions = async (supplementIds?: string[]): Promise<any[]> => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('synergy_predictions')
        .select('*')
        .order('synergy_score', { ascending: false });

      if (supplementIds && supplementIds.length > 0) {
        query = query.overlaps('supplement_pair', supplementIds);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      return data || [];

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch synergy predictions';
      console.error('Fetch synergy predictions error:', err);
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProtocolOptimizations = async (): Promise<any[]> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('protocol_optimizations')
        .select('*')
        .order('confidence_score', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      return data || [];

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch protocol optimizations';
      console.error('Fetch protocol optimizations error:', err);
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    runAnalysis,
    getStoredAnalyses,
    getSynergyPredictions,
    getProtocolOptimizations
  };
};

export type {
  QuantitativeAnalysisParams,
  QuantitativeAnalysisResult,
  PBPKResult,
  MonteCarloResult,
  SynergyResult,
  OptimizationResult,
  StoredAnalysis
};