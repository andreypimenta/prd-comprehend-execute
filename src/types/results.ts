export interface InteractionAnalysis {
  id: string;
  severity: 'safe' | 'caution' | 'avoid';
  description: string;
  action_needed: string;
  supplements_involved: string[];
  supplement_names: string[];
}

export interface NextAction {
  id: string;
  type: 'timing' | 'form' | 'exam' | 'dosage';
  title: string;
  description: string;
  improvement_potential: number;
  completed: boolean;
  action_data: any;
}

export interface FinancialBreakdown {
  monthly_cost: number;
  cost_per_benefit: number;
  budget_utilization: number;
  cost_comparison: 'below_average' | 'average' | 'above_average';
  optimization_suggestions: string[];
}

export interface PersonalizedInsight {
  id: string;
  type: 'progress' | 'prediction' | 'optimization' | 'comparison';
  title: string;
  description: string;
  data?: any;
  confidence: number;
}

export interface CompatibilityScore {
  supplement_id: string;
  supplement_name: string;
  category: string;
  score: number;
  reasoning: string[];
  match_factors: string[];
  image_icon?: string;
}