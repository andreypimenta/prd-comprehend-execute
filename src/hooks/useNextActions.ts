import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSelectedSupplements } from "./useSelectedSupplements";
import type { NextAction } from "@/types/results";

export function useNextActions() {
  const [actions, setActions] = useState<NextAction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { getActiveSupplements } = useSelectedSupplements();

  const generateActions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const activeSupplements = getActiveSupplements();
      
      if (activeSupplements.length === 0) {
        setActions([]);
        setLoading(false);
        return;
      }

      const supplementIds = activeSupplements.map(s => s.supplement_id);
      
      // Fetch supplement data for optimization
      const { data: supplements, error: supplementsError } = await supabase
        .from('supplements')
        .select('id, name, timing, optimal_form, circadian_timing, bioavailability_data(*)')
        .in('id', supplementIds);

      if (supplementsError) throw supplementsError;

      const generatedActions: NextAction[] = [];

      supplements.forEach(supplement => {
        // Timing optimization action
        const circadianTiming = supplement.circadian_timing as any;
        if (circadianTiming?.optimal && supplement.timing !== circadianTiming.optimal) {
          generatedActions.push({
            id: `timing-${supplement.id}`,
            type: 'timing',
            title: `Otimizar horário do ${supplement.name}`,
            description: `Tomar ${circadianTiming.optimal.toLowerCase()} pode melhorar a absorção`,
            improvement_potential: 25,
            completed: false,
            action_data: {
              supplement_id: supplement.id,
              current_timing: supplement.timing,
              optimal_timing: circadianTiming.optimal
            }
          });
        }

        // Form optimization action
        if (supplement.optimal_form && supplement.optimal_form !== 'standard') {
          generatedActions.push({
            id: `form-${supplement.id}`,
            type: 'form',
            title: `Considerar forma ${supplement.optimal_form.toLowerCase()} do ${supplement.name}`,
            description: `A forma ${supplement.optimal_form.toLowerCase()} pode ter melhor biodisponibilidade`,
            improvement_potential: 35,
            completed: false,
            action_data: {
              supplement_id: supplement.id,
              recommended_form: supplement.optimal_form
            }
          });
        }

        // Dosage optimization based on bioavailability
        if (supplement.bioavailability_data && Array.isArray(supplement.bioavailability_data) && supplement.bioavailability_data.length > 0) {
          const bioData = supplement.bioavailability_data[0] as any;
          if (bioData.optimal_conditions?.divided_doses) {
            generatedActions.push({
              id: `dosage-${supplement.id}`,
              type: 'dosage',
              title: `Revisar dosagem do ${supplement.name}`,
              description: 'Dividir a dose pode melhorar a absorção e reduzir efeitos colaterais',
              improvement_potential: 20,
              completed: false,
              action_data: {
                supplement_id: supplement.id,
                suggestion: 'divided_doses'
              }
            });
          }
        }

        // Exam recommendations for specific supplements
        const examSupplements = ['vitamina-d', 'b12', 'ferro'];
        if (examSupplements.some(exam => supplement.name.toLowerCase().includes(exam))) {
          generatedActions.push({
            id: `exam-${supplement.id}`,
            type: 'exam',
            title: `Agendar exame de ${supplement.name}`,
            description: `Recomendado verificar níveis sanguíneos após 2-3 meses de uso`,
            improvement_potential: 30,
            completed: false,
            action_data: {
              supplement_id: supplement.id,
              exam_type: supplement.name,
              timeframe: '2-3 months'
            }
          });
        }
      });

      // Sort by improvement potential
      generatedActions.sort((a, b) => b.improvement_potential - a.improvement_potential);

      setActions(generatedActions.slice(0, 5)); // Limit to 5 actions
      
    } catch (err) {
      console.error('Error generating actions:', err);
      setError('Erro ao gerar ações');
    } finally {
      setLoading(false);
    }
  };

  const markActionCompleted = (actionId: string) => {
    setActions(prev => 
      prev.map(action => 
        action.id === actionId 
          ? { ...action, completed: true }
          : action
      )
    );
  };

  useEffect(() => {
    generateActions();
  }, [getActiveSupplements]);

  return {
    actions,
    loading,
    error,
    generateActions,
    markActionCompleted
  };
}