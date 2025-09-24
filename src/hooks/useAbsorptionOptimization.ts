import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PharmaceuticalForm {
  name: string;
  bioavailabilityFactor: number;
  absorptionRate: number;
  costMultiplier: number;
  color: string;
  description: string;
}

interface OptimizationRecommendation {
  timing: {
    optimal: string;
    reason: string;
    improvement: number;
  };
  combinations: {
    enhancers: Array<{ name: string; improvement: number }>;
    inhibitors: Array<{ name: string; reduction: number }>;
  };
  costBenefit: {
    monthlyStandard: number;
    monthlyOptimized: number;
    savings: number;
    efficiency: number;
  };
}

interface AbsorptionOptimization {
  supplementId: string;
  supplementName: string;
  forms: PharmaceuticalForm[];
  recommendations: OptimizationRecommendation;
  timeline: Array<{
    week: string;
    title: string;
    description: string;
    completed: boolean;
  }>;
}

export const useAbsorptionOptimization = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOptimizationData = async (supplementId: string): Promise<AbsorptionOptimization | null> => {
    setLoading(true);
    setError(null);

    try {
      // Get supplement data first
      const { data: supplement, error: supplementError } = await supabase
        .from('supplements')
        .select('name, pharmaceutical_forms, optimal_form, cost_benefit_form, price_min, price_max')
        .eq('id', supplementId)
        .single();

      if (supplementError) throw supplementError;

      // Enhanced pharmaceutical forms with dramatic improvements
      const enhancedForms: PharmaceuticalForm[] = [
        {
          name: 'Padrão',
          bioavailabilityFactor: 1,
          absorptionRate: 20,
          costMultiplier: 1,
          color: 'hsl(var(--muted-foreground))',
          description: 'Forma padrão com absorção limitada'
        },
        {
          name: 'Quelada',
          bioavailabilityFactor: 2.3,
          absorptionRate: 46,
          costMultiplier: 1.8,
          color: 'hsl(240 100% 62%)',
          description: 'Ligação mineral estável melhora absorção'
        },
        {
          name: 'Lipossomal',
          bioavailabilityFactor: 46,
          absorptionRate: 92,
          costMultiplier: 4.2,
          color: 'hsl(158 64% 52%)',
          description: 'Encapsulamento lipídico protege da degradação'
        },
        {
          name: 'Nanoparticulada',
          bioavailabilityFactor: 185,
          absorptionRate: 96,
          costMultiplier: 8.5,
          color: 'hsl(42 95% 45%)',
          description: 'Nanotecnologia permite absorção celular direta'
        }
      ];

      // Mock recommendations based on supplement data
      const recommendations: OptimizationRecommendation = {
        timing: {
          optimal: 'Manhã com café da manhã',
          reason: 'Absorção 40% maior com gorduras saudáveis',
          improvement: 40
        },
        combinations: {
          enhancers: [
            { name: 'Vitamina C', improvement: 300 },
            { name: 'Piperina', improvement: 2000 },
            { name: 'Gorduras saudáveis', improvement: 40 }
          ],
          inhibitors: [
            { name: 'Café', reduction: 30 },
            { name: 'Cálcio', reduction: 50 },
            { name: 'Antiácidos', reduction: 25 }
          ]
        },
        costBenefit: {
          monthlyStandard: supplement.price_min || 60,
          monthlyOptimized: (supplement.price_min || 60) * 2,
          savings: 720,
          efficiency: 95
        }
      };

      const timeline = [
        {
          week: 'Semana 1-2',
          title: 'Introduzir forma otimizada',
          description: 'Transição gradual para forma lipossomal',
          completed: false
        },
        {
          week: 'Semana 3-4', 
          title: 'Otimizar timing',
          description: 'Ajustar horário conforme recomendações',
          completed: false
        },
        {
          week: 'Semana 5-6',
          title: 'Adicionar potencializadores',
          description: 'Incluir vitamina C e gorduras saudáveis',
          completed: false
        },
        {
          week: 'Semana 7-8',
          title: 'Avaliar resultados',
          description: 'Monitorar melhoria e ajustar dosagem',
          completed: false
        }
      ];

      return {
        supplementId,
        supplementName: supplement.name,
        forms: enhancedForms,
        recommendations,
        timeline
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get optimization data';
      setError(errorMessage);
      console.error('Error getting optimization data:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const calculateEquivalentDose = (
    currentDose: number,
    currentForm: number,
    targetForm: number
  ): { equivalentDose: number; reduction: number } => {
    const equivalentDose = (currentDose * currentForm) / targetForm;
    const reduction = ((currentDose - equivalentDose) / currentDose) * 100;
    
    return {
      equivalentDose: Math.round(equivalentDose * 10) / 10,
      reduction: Math.round(reduction * 10) / 10
    };
  };

  return {
    getOptimizationData,
    calculateEquivalentDose,
    loading,
    error
  };
};

export type { PharmaceuticalForm, OptimizationRecommendation, AbsorptionOptimization };