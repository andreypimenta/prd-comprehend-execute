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

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

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

      // Calculate overall compliance percentage from new structure
      const complianceValues = Object.values(formData.compliance);
      const overallCompliance = complianceValues.length > 0
        ? complianceValues.reduce((sum, item) => {
            const compliance = (item.daysCompliant / 7) * 100;
            return sum + compliance;
          }, 0) / complianceValues.length
        : 0;

      // Get current week in PRD format
      const now = new Date();
      const year = now.getFullYear();
      const week = getWeekNumber(now);
      const weekFormatted = `${year}-W${week.toString().padStart(2, '0')}`;

      const checkinData = {
        user_id: user.user.id,
        week_number: getWeekNumber(now),
        week_number_formatted: weekFormatted,
        symptom_ratings: formData.symptom_ratings,
        wellbeing: formData.wellbeing,
        compliance: formData.compliance,
        feedback: formData.feedback,
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

    const recentCheckins = checkinHistory.slice(0, 4);
    const avgCompliance = checkinHistory.reduce((sum, c) => 
      sum + (c.overall_compliance_percentage || 0), 0) / checkinHistory.length;

    return {
      current_week: currentWeek,
      total_checkins: checkinHistory.length,
      average_compliance: avgCompliance,
      symptom_trends: {
        fatigue_trend: 'stable',
        energy_trend: 'stable',
        mood_trend: 'stable',
        sleep_trend: 'stable',
        stress_trend: 'stable',
        focus_trend: 'stable',
      },
      recent_improvements: [],
      areas_of_concern: [],
    };
  };

  const getTrendData = (): TrendData[] => {
    return checkinHistory
      .slice(0, 8)
      .reverse()
      .map(checkin => ({
        week: checkin.week_number,
        date: checkin.checkin_date,
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