export interface WeeklyCheckin {
  id: string;
  user_id: string;
  week_number: number;
  checkin_date: string;
  
  // Symptom ratings (1-10 scale)
  fatigue_level?: number;
  energy_level?: number;
  mood_level?: number;
  sleep_quality?: number;
  stress_level?: number;
  focus_level?: number;
  
  // Custom symptoms tracking
  custom_symptoms?: Array<{
    symptom: string;
    severity: number;
    notes?: string;
  }>;
  
  // Supplement compliance
  supplement_adherence?: Record<string, {
    supplement_id: string;
    supplement_name: string;
    days_taken: number;
    total_days: number;
    compliance_percentage: number;
    missed_days?: string[];
    side_effects?: string;
  }>;
  overall_compliance_percentage?: number;
  
  // Additional notes
  notes?: string;
  side_effects?: string;
  
  // Wellness metrics
  weight?: number;
  exercise_frequency?: number;
  
  created_at: string;
  updated_at: string;
}

export interface CheckinReminder {
  id: string;
  user_id: string;
  next_checkin_date: string;
  reminder_frequency: number; // days
  is_active: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProgressSummary {
  current_week: number;
  total_checkins: number;
  average_compliance: number;
  symptom_trends: {
    fatigue_trend: 'improving' | 'stable' | 'worsening';
    energy_trend: 'improving' | 'stable' | 'worsening';
    mood_trend: 'improving' | 'stable' | 'worsening';
    sleep_trend: 'improving' | 'stable' | 'worsening';
    stress_trend: 'improving' | 'stable' | 'worsening';
    focus_trend: 'improving' | 'stable' | 'worsening';
  };
  recent_improvements: string[];
  areas_of_concern: string[];
}

export interface TrendData {
  week: number;
  date: string;
  fatigue_level?: number;
  energy_level?: number;
  mood_level?: number;
  sleep_quality?: number;
  stress_level?: number;
  focus_level?: number;
  compliance_percentage?: number;
}

export interface CheckinMetrics {
  weekly_average: number;
  improvement_percentage: number;
  consistency_score: number;
  best_performing_areas: string[];
  areas_needing_attention: string[];
}

export interface CheckinFormData {
  // Step 1: Symptom evaluation
  fatigue_level: number;
  energy_level: number;
  mood_level: number;
  sleep_quality: number;
  stress_level: number;
  focus_level: number;
  custom_symptoms: Array<{
    symptom: string;
    severity: number;
    notes?: string;
  }>;
  
  // Step 2: Supplement adherence
  supplement_adherence: Record<string, {
    supplement_id: string;
    supplement_name: string;
    days_taken: number;
    total_days: number;
    missed_days?: string[];
    side_effects?: string;
  }>;
  
  // Step 3: Wellness metrics
  weight?: number;
  exercise_frequency?: number;
  
  // Step 4: Notes and observations
  notes?: string;
  side_effects?: string;
}