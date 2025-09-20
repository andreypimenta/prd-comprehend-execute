export interface WeeklyCheckin {
  id: string;
  user_id: string;
  week_number: number;
  week_number_formatted?: string; // "2025-W37" format
  checkin_date: string;
  
  // Symptom ratings with improvement tracking
  symptom_ratings?: Record<string, {
    current: number; // 1-10
    improvement: number; // -2 to +2 (much worse to much better)
    notes?: string;
  }>;
  
  // Wellbeing (1-5 scale as per PRD)
  wellbeing?: {
    energy: number;
    mood: number;
    sleep: number;
    overall: number;
  };
  
  // Legacy symptom fields (keep for backward compatibility)
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
  
  // Supplement compliance (updated structure)
  compliance?: Record<string, {
    daysCompliant: number; // 0-7
    missedDoses: number;
    reasonsForMissing?: string[];
  }>;
  
  // Legacy supplement adherence (keep for backward compatibility)
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
  
  // Feedback structure as per PRD
  feedback?: {
    positiveChanges: string[];
    concerns: string[];
    overallSatisfaction: number; // 1-5
  };
  
  // Additional notes
  notes?: string;
  side_effects?: string;
  
  // Wellness metrics
  weight?: number;
  exercise_frequency?: number;
  
  // Calculated metrics
  metrics?: {
    wellbeingScore: number;
    complianceScore: number;
    overallImprovement: number;
  };
  
  created_at: string;
  updated_at: string;
}

export interface CheckinReminder {
  id: string;
  user_id: string;
  type: 'weekly_checkin' | 'supplement_reminder';
  scheduled_for: string;
  is_active: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  sent: boolean;
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
  // Step 1: Symptom evaluation with improvement tracking
  symptom_ratings: Record<string, {
    current: number; // 1-10
    improvement: number; // -2 to +2
    notes?: string;
  }>;
  
  // Step 2: Wellbeing (1-5 scale as per PRD)
  wellbeing: {
    energy: number;
    mood: number;
    sleep: number;
    overall: number;
  };
  
  // Step 3: Supplement compliance (PRD format)
  compliance: Record<string, {
    daysCompliant: number; // 0-7
    missedDoses: number;
    reasonsForMissing?: string[];
  }>;
  
  // Step 4: Feedback and notes
  feedback: {
    positiveChanges: string[];
    concerns: string[];
    overallSatisfaction: number; // 1-5
  };
  
  // Additional wellness metrics
  weight?: number;
  exercise_frequency?: number;
  
  // Legacy support
  notes?: string;
  side_effects?: string;
}