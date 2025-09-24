import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSelectedSupplements } from "./useSelectedSupplements";
import type { InteractionAnalysis } from "@/types/results";

export function useInteractionAnalysis() {
  const [interactions, setInteractions] = useState<InteractionAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { getActiveSupplements } = useSelectedSupplements();

  const analyzeInteractions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const activeSupplements = getActiveSupplements();
      
      if (activeSupplements.length < 2) {
        setInteractions([]);
        setLoading(false);
        return;
      }

      const supplementIds = activeSupplements.map(s => s.supplement_id);
      
      // Fetch supplement data for interaction analysis
      const { data: supplements, error: supplementsError } = await supabase
        .from('supplements')
        .select('id, name, interactions, contraindications')
        .in('id', supplementIds);

      if (supplementsError) throw supplementsError;

      // Analyze interactions between selected supplements
      const detectedInteractions: InteractionAnalysis[] = [];
      
      for (let i = 0; i < supplements.length; i++) {
        for (let j = i + 1; j < supplements.length; j++) {
          const supp1 = supplements[i];
          const supp2 = supplements[j];
          
          // Check if either supplement has interactions with the other
          const supp1Interactions = supp1.interactions || [];
          const supp2Interactions = supp2.interactions || [];
          
          const hasInteraction = supp1Interactions.some(interaction => 
            interaction.toLowerCase().includes(supp2.name.toLowerCase())
          ) || supp2Interactions.some(interaction => 
            interaction.toLowerCase().includes(supp1.name.toLowerCase())
          );

          if (hasInteraction) {
            detectedInteractions.push({
              id: `${supp1.id}-${supp2.id}`,
              severity: 'caution',
              description: `Possível interação entre ${supp1.name} e ${supp2.name}`,
              action_needed: 'Consulte um profissional de saúde para avaliar se é seguro usar ambos',
              supplements_involved: [supp1.id, supp2.id],
              supplement_names: [supp1.name, supp2.name]
            });
          }
        }
      }

      // Add general safety recommendations
      const highDoseSupplements = supplements.filter(s => 
        s.contraindications?.some(c => c.toLowerCase().includes('dose'))
      );

      if (highDoseSupplements.length > 0) {
        detectedInteractions.push({
          id: 'high-dose-warning',
          severity: 'caution',
          description: 'Alguns suplementos requerem atenção especial à dosagem',
          action_needed: 'Monitore as dosagens e considere dividir em horários diferentes',
          supplements_involved: highDoseSupplements.map(s => s.id),
          supplement_names: highDoseSupplements.map(s => s.name)
        });
      }

      setInteractions(detectedInteractions);
    } catch (err) {
      console.error('Error analyzing interactions:', err);
      setError('Erro ao analisar interações');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    analyzeInteractions();
  }, [getActiveSupplements]);

  return {
    interactions,
    loading,
    error,
    analyzeInteractions
  };
}