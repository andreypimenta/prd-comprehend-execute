import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WeeklyCheckin, CheckinFormData, ProgressSummary, TrendData } from '@/types/checkin';
import { toast } from 'sonner';

export const useCheckin = () => {
  const [currentCheckin, setCurrentCheckin] = useState<WeeklyCheckin | null>(null);
  const [checkinHistory, setCheckinHistory] = useState<WeeklyCheckin[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentWeekNumber = async (): Promise<number> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase.rpc('get_current_week_number', {
        user_id: user.user.id
      });

      if (error) throw error;
      return data || 1;
    } catch (err) {
      console.error('Error getting current week number:', err);
      return 1;
    }
  };

  const fetchCurrentCheckin = async () => {
    try {
      setLoading(true);
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      const weekNumber = await getCurrentWeekNumber();
      setCurrentWeek(weekNumber);

      const { data, error } = await supabase
        .from('weekly_checkins')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('week_number', weekNumber)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      setCurrentCheckin(data as WeeklyCheckin | null);
    } catch (err) {
      console.error('Error fetching current check-in:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch check-in');
    } finally {
      setLoading(false);
    }
  };

  const fetchCheckinHistory = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      const { data, error } = await supabase
        .from('weekly_checkins')
        .select('*')
        .eq('user_id', user.user.id)
        .order('week_number', { ascending: false })
        .limit(10);

      if (error) throw error;
      setCheckinHistory((data || []) as WeeklyCheckin[]);
    } catch (err) {
      console.error('Error fetching check-in history:', err);
    }
  };

  const submitCheckin = async (formData: CheckinFormData): Promise<boolean> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) throw new Error('User not authenticated');

      // Calculate overall compliance percentage
      const adherenceValues = Object.values(formData.supplement_adherence);
      const overallCompliance = adherenceValues.length > 0
        ? adherenceValues.reduce((sum, item) => {
            const compliance = (item.days_taken / item.total_days) * 100;
            return sum + compliance;
          }, 0) / adherenceValues.length
        : 0;

      const checkinData = {
        user_id: user.user.id,
        week_number: currentWeek,
        fatigue_level: formData.fatigue_level,
        energy_level: formData.energy_level,
        mood_level: formData.mood_level,
        sleep_quality: formData.sleep_quality,
        stress_level: formData.stress_level,
        focus_level: formData.focus_level,
        custom_symptoms: formData.custom_symptoms,
        supplement_adherence: formData.supplement_adherence,
        overall_compliance_percentage: overallCompliance,
        notes: formData.notes,
        side_effects: formData.side_effects,
        weight: formData.weight,
        exercise_frequency: formData.exercise_frequency,
      };

      const { data, error } = await supabase
        .from('weekly_checkins')
        .upsert(checkinData, {
          onConflict: 'user_id,week_number'
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentCheckin(data as WeeklyCheckin);
      await fetchCheckinHistory();
      
      toast.success('Check-in salvo com sucesso!');
      return true;
    } catch (err) {
      console.error('Error submitting check-in:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit check-in';
      toast.error(`Erro ao salvar check-in: ${errorMessage}`);
      return false;
    }
  };

  const hasCheckinThisWeek = (): boolean => {
    return currentCheckin !== null;
  };

  const getProgressSummary = (): ProgressSummary | null => {
    if (checkinHistory.length === 0) return null;

    const recentCheckins = checkinHistory.slice(0, 4); // Last 4 weeks
    const calculateTrend = (values: (number | undefined)[]): 'improving' | 'stable' | 'worsening' => {
      const validValues = values.filter(v => v !== undefined) as number[];
      if (validValues.length < 2) return 'stable';
      
      const first = validValues[validValues.length - 1];
      const last = validValues[0];
      const diff = last - first;
      
      if (Math.abs(diff) < 1) return 'stable';
      return diff > 0 ? 'improving' : 'worsening';
    };

    const fatigueValues = recentCheckins.map(c => c.fatigue_level);
    const energyValues = recentCheckins.map(c => c.energy_level);
    const moodValues = recentCheckins.map(c => c.mood_level);
    const sleepValues = recentCheckins.map(c => c.sleep_quality);
    const stressValues = recentCheckins.map(c => c.stress_level);
    const focusValues = recentCheckins.map(c => c.focus_level);

    const avgCompliance = checkinHistory.reduce((sum, c) => 
      sum + (c.overall_compliance_percentage || 0), 0) / checkinHistory.length;

    return {
      current_week: currentWeek,
      total_checkins: checkinHistory.length,
      average_compliance: avgCompliance,
      symptom_trends: {
        fatigue_trend: calculateTrend(fatigueValues),
        energy_trend: calculateTrend(energyValues),
        mood_trend: calculateTrend(moodValues),
        sleep_trend: calculateTrend(sleepValues),
        stress_trend: calculateTrend(stressValues),
        focus_trend: calculateTrend(focusValues),
      },
      recent_improvements: [],
      areas_of_concern: [],
    };
  };

  const getTrendData = (): TrendData[] => {
    return checkinHistory
      .slice(0, 8) // Last 8 weeks
      .reverse()
      .map(checkin => ({
        week: checkin.week_number,
        date: checkin.checkin_date,
        fatigue_level: checkin.fatigue_level,
        energy_level: checkin.energy_level,
        mood_level: checkin.mood_level,
        sleep_quality: checkin.sleep_quality,
        stress_level: checkin.stress_level,
        focus_level: checkin.focus_level,
        compliance_percentage: checkin.overall_compliance_percentage,
      }));
  };

  useEffect(() => {
    fetchCurrentCheckin();
    fetchCheckinHistory();
  }, []);

  return {
    currentCheckin,
    checkinHistory,
    currentWeek,
    loading,
    error,
    submitCheckin,
    hasCheckinThisWeek,
    getProgressSummary,
    getTrendData,
    refetch: () => {
      fetchCurrentCheckin();
      fetchCheckinHistory();
    },
  };
};