import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WeeklyCheckin, CheckinFormData, ProgressSummary, TrendData } from '@/types/checkin';
import { toast } from 'sonner';
import { calculateCheckinMetrics, generateInsights, analyzeTrends, formatWeekNumber, getWeekNumber, calculateComplianceScore, calculateWellbeingScore } from '@/lib/checkin-utils';

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

      // Calculate metrics for the check-in
      const wellbeingScore = calculateWellbeingScore(formData.wellbeing);
      const complianceScore = calculateComplianceScore(formData.compliance);
      
      const checkinData = {
        user_id: user.user.id,
        week_number: getWeekNumber(now),
        week_number_formatted: weekFormatted,
        symptom_ratings: formData.symptom_ratings,
        wellbeing: formData.wellbeing,
        compliance: formData.compliance,
        feedback: formData.feedback,
        overall_compliance_percentage: overallCompliance,
        metrics: {
          wellbeingScore,
          complianceScore,
          overallImprovement: 50, // Neutral starting point, will be calculated with trends over time
        },
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

    const avgCompliance = checkinHistory.reduce((sum, c) => 
      sum + (c.overall_compliance_percentage || 0), 0) / checkinHistory.length;

    const trends = analyzeTrends(checkinHistory);
    const metrics = calculateCheckinMetrics(checkinHistory);
    const insights = generateInsights(checkinHistory);

    // Extract improvements and concerns from recent feedback
    const recentFeedback = checkinHistory
      .slice(0, 3)
      .map(c => c.feedback)
      .filter(f => f);

    const recent_improvements = recentFeedback
      .flatMap(f => f?.positiveChanges || [])
      .slice(0, 3);

    const areas_of_concern = recentFeedback
      .flatMap(f => f?.concerns || [])
      .concat(metrics.areas_needing_attention)
      .slice(0, 3);

    return {
      current_week: currentWeek,
      total_checkins: checkinHistory.length,
      average_compliance: avgCompliance,
      symptom_trends: {
        fatigue_trend: trends.wellbeing || 'stable',
        energy_trend: trends.wellbeing || 'stable',
        mood_trend: trends.wellbeing || 'stable',
        sleep_trend: trends.wellbeing || 'stable',
        stress_trend: trends.compliance || 'stable',
        focus_trend: trends.wellbeing || 'stable',
      },
      recent_improvements,
      areas_of_concern,
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