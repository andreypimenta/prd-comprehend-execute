// types/dashboard.ts
export interface DashboardData {
  user: {
    name: string;
    email: string;
    profileCompleteness: number;
  };
  recommendations: {
    total: number;
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
    averageConfidence: number;
    categories: Array<{
      category: string;
      count: number;
      averageConfidence: number;
      color: string;
    }>;
  };
  supplements: Array<{
    id: string;
    supplement: {
      name: string;
      category: string;
      description: string;
      benefits: string[];
      evidenceLevel: string;
      priceMin?: number;
      priceMax?: number;
      timing: string;
      contraindications?: string[];
      interactions?: string[];
    };
    recommendedDosage: number;
    confidence: number;
    reasoning: string;
    priority: 'high' | 'medium' | 'low';
    estimatedCost: number;
  }>;
  analysis: {
    generatedAt: string;
    totalScore: number;
    topConcerns: string[];
    keyBenefits: string[];
  };
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color: string;
  percentage?: number;
}

export interface SupplementDetailsProps {
  recommendation: DashboardData['supplements'][0];
  onClose: () => void;
}