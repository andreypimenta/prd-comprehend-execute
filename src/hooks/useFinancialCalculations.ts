import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSelectedSupplements } from "./useSelectedSupplements";
import type { FinancialBreakdown } from "@/types/results";

export function useFinancialCalculations() {
  const [breakdown, setBreakdown] = useState<FinancialBreakdown | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { getActiveSupplements } = useSelectedSupplements();

  const calculateFinancials = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const activeSupplements = getActiveSupplements();
      
      if (activeSupplements.length === 0) {
        setBreakdown(null);
        setLoading(false);
        return;
      }

      const supplementIds = activeSupplements.map(s => s.supplement_id);
      
      // Fetch supplement pricing and recommendation data
      const { data: supplements, error: supplementsError } = await supabase
        .from('supplements')
        .select('id, name, price_min, price_max')
        .in('id', supplementIds);

      if (supplementsError) throw supplementsError;

      const { data: recommendations, error: recsError } = await supabase
        .from('recommendations')
        .select('supplement_id, confidence')
        .in('supplement_id', supplementIds);

      if (recsError) throw recsError;

      // Get user profile for budget comparison
      const { data: { user } } = await supabase.auth.getUser();
      let userBudget = 500; // default budget

      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('budget_range')
          .eq('user_id', user.id)
          .single();
        
        if (profile?.budget_range) {
          userBudget = profile.budget_range;
        }
      }

      // Calculate monthly costs
      let totalMonthlyCost = 0;
      let totalConfidence = 0;

      supplements.forEach(supplement => {
        const avgPrice = supplement.price_min && supplement.price_max 
          ? (supplement.price_min + supplement.price_max) / 2
          : supplement.price_min || supplement.price_max || 50; // fallback price
        
        totalMonthlyCost += avgPrice;
        
        const recommendation = recommendations.find(r => r.supplement_id === supplement.id);
        if (recommendation) {
          totalConfidence += recommendation.confidence;
        }
      });

      const avgConfidence = totalConfidence / supplements.length;
      const costPerBenefit = totalMonthlyCost / (avgConfidence / 100);
      const budgetUtilization = (totalMonthlyCost / userBudget) * 100;

      // Determine cost comparison
      let costComparison: 'below_average' | 'average' | 'above_average' = 'average';
      const avgMarketCost = supplements.length * 60; // assumed average of R$60 per supplement
      
      if (totalMonthlyCost < avgMarketCost * 0.8) {
        costComparison = 'below_average';
      } else if (totalMonthlyCost > avgMarketCost * 1.2) {
        costComparison = 'above_average';
      }

      // Generate optimization suggestions
      const optimizationSuggestions: string[] = [];
      
      if (budgetUtilization > 100) {
        optimizationSuggestions.push('Considere priorizar suplementos de alta confiança');
      }
      
      if (costComparison === 'above_average') {
        optimizationSuggestions.push('Busque formas genéricas para reduzir custos');
      }
      
      const highCostSupplements = supplements.filter(s => 
        (s.price_min || 0) > 80 || (s.price_max || 0) > 150
      );
      
      if (highCostSupplements.length > 0) {
        optimizationSuggestions.push('Considere dividir suplementos caros em doses menores');
      }

      if (optimizationSuggestions.length === 0) {
        optimizationSuggestions.push('Seu plano está bem otimizado financeiramente');
      }

      setBreakdown({
        monthly_cost: Math.round(totalMonthlyCost),
        cost_per_benefit: Math.round(costPerBenefit),
        budget_utilization: Math.round(budgetUtilization),
        cost_comparison: costComparison,
        optimization_suggestions: optimizationSuggestions
      });
      
    } catch (err) {
      console.error('Error calculating financials:', err);
      setError('Erro ao calcular custos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateFinancials();
  }, [getActiveSupplements]);

  return {
    breakdown,
    loading,
    error,
    calculateFinancials
  };
}