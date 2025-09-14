export interface Supplement {
  id: string;
  name: string;
  category: 'vitamin' | 'mineral' | 'herb' | 'amino_acid' | 'other';
  description: string;
  benefits: string[];
  target_symptoms: string[];
  dosage_min: number;
  dosage_max: number;
  dosage_unit: string;
  timing: 'morning' | 'evening' | 'with_meal' | 'any';
  evidence_level: 'strong' | 'moderate' | 'limited';
  contraindications: string[];
  interactions: string[];
  price_min?: number;
  price_max?: number;
  created_at: string;
  updated_at: string;
}

export interface Recommendation {
  id: string;
  user_id: string;
  supplement_id: string;
  supplement?: Supplement;
  recommended_dosage: number;
  confidence: number;
  reasoning: string;
  priority: 'high' | 'medium' | 'low';
  created_at: string;
}

export interface RecommendationCandidate {
  supplement: Supplement;
  reason: string;
  weight: number;
}

export interface UserProfile {
  user_id: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  weight?: number;
  height?: number;
  symptoms?: string[];
  sleep_quality?: number;
  stress_level?: number;
  exercise_frequency?: number;
  health_goals?: string[];
}

export interface AnalysisResponse {
  success: boolean;
  recommendations?: Recommendation[];
  analysis_date?: Date;
  total_recommendations?: number;
  error?: string;
}