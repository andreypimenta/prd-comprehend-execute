import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SelectedSupplement {
  id: string;
  user_id: string;
  recommendation_id: string;
  supplement_id: string;
  start_date: string;
  target_duration_weeks: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSelectedSupplements = () => {
  const [selectedSupplements, setSelectedSupplements] = useState<SelectedSupplement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSelectedSupplements = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('user_selected_supplements')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSelectedSupplements(data || []);
    } catch (err) {
      console.error('Error fetching selected supplements:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const addSelectedSupplement = async (
    recommendationId: string,
    supplementId: string,
    targetDurationWeeks: number = 12
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Check if already selected
      const existing = selectedSupplements.find(
        s => s.recommendation_id === recommendationId && s.is_active
      );

      if (existing) {
        toast({
          title: "Suplemento já selecionado",
          description: "Este suplemento já está na sua lista ativa.",
          variant: "default"
        });
        return;
      }

      const { data, error } = await supabase
        .from('user_selected_supplements')
        .insert({
          user_id: user.id,
          recommendation_id: recommendationId,
          supplement_id: supplementId,
          target_duration_weeks: targetDurationWeeks,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      setSelectedSupplements(prev => [data, ...prev]);
      
      toast({
        title: "Suplemento adicionado",
        description: "Suplemento adicionado à sua rotina com sucesso!",
        variant: "default"
      });

      return data;
    } catch (err) {
      console.error('Error adding selected supplement:', err);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o suplemento.",
        variant: "destructive"
      });
      throw err;
    }
  };

  const removeSelectedSupplement = async (recommendationId: string) => {
    try {
      const { error } = await supabase
        .from('user_selected_supplements')
        .update({ is_active: false })
        .eq('recommendation_id', recommendationId);

      if (error) throw error;

      setSelectedSupplements(prev => 
        prev.map(s => 
          s.recommendation_id === recommendationId 
            ? { ...s, is_active: false }
            : s
        )
      );

      toast({
        title: "Suplemento removido",
        description: "Suplemento removido da sua rotina.",
        variant: "default"
      });
    } catch (err) {
      console.error('Error removing selected supplement:', err);
      toast({
        title: "Erro",
        description: "Não foi possível remover o suplemento.",
        variant: "destructive"
      });
      throw err;
    }
  };

  const isSupplementSelected = (recommendationId: string): boolean => {
    return selectedSupplements.some(
      s => s.recommendation_id === recommendationId && s.is_active
    );
  };

  const getActiveSupplements = (): SelectedSupplement[] => {
    return selectedSupplements.filter(s => s.is_active);
  };

  useEffect(() => {
    fetchSelectedSupplements();
  }, []);

  return {
    selectedSupplements,
    loading,
    error,
    addSelectedSupplement,
    removeSelectedSupplement,
    isSupplementSelected,
    getActiveSupplements,
    refetch: fetchSelectedSupplements
  };
};