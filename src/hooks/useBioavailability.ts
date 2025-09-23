import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BioavailabilityAnalysis {
  supplementId: string;
  bioavailabilityScore: number;
  optimalForm: string;
  costBenefitForm: string;
  formsAnalysis: PharmaceuticalFormAnalysis[];
  timing: CircadianTiming;
  recommendations: BioavailabilityRecommendations;
}

interface PharmaceuticalFormAnalysis {
  form: string;
  name: string;
  bioavailabilityFactor: number;
  absorptionRate: number;
  equivalentDose: number;
  costMultiplier: number;
  costPerEffectiveUnit: number;
  clinicalEvidence: string;
  mechanismDescription: string;
  peakTimeHours: number;
  durationHours: number;
  score: number;
}

interface CircadianTiming {
  optimal: string;
  reason: string;
  with_meal: boolean;
}

interface BioavailabilityRecommendations {
  primaryRecommendation: string;
  timingRecommendation: string;
  doseAdjustment: string;
  costOptimization: string;
  synergies: string[];
  precautions: string[];
}

interface UserProfile {
  age?: number;
  weight?: number;
  gender?: string;
  conditions?: string[];
  medications?: string[];
}

export const useBioavailability = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeBioavailability = async (
    supplementId: string,
    userProfile?: UserProfile
  ): Promise<BioavailabilityAnalysis | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke(
        'bioavailability-analyzer',
        {
          body: {
            supplementId,
            userProfile
          }
        }
      );

      if (functionError) {
        throw new Error(functionError.message);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze bioavailability';
      setError(errorMessage);
      console.error('Error analyzing bioavailability:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getBioavailabilityData = async (supplementId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('bioavailability_data')
        .select('*')
        .eq('supplement_id', supplementId)
        .order('bioavailability_factor', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch bioavailability data';
      setError(errorMessage);
      console.error('Error fetching bioavailability data:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSupplementBioavailability = async (supplementId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('supplements')
        .select(`
          *,
          pharmaceutical_forms,
          bioavailability_score,
          optimal_form,
          cost_benefit_form,
          circadian_timing,
          food_interactions,
          absorption_enhancers,
          absorption_inhibitors
        `)
        .eq('id', supplementId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch supplement bioavailability';
      setError(errorMessage);
      console.error('Error fetching supplement bioavailability:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeBioavailability,
    getBioavailabilityData,
    getSupplementBioavailability,
    loading,
    error
  };
};

export type {
  BioavailabilityAnalysis,
  PharmaceuticalFormAnalysis,
  CircadianTiming,
  BioavailabilityRecommendations,
  UserProfile
};