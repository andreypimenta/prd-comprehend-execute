// lib/charts-utils.ts
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    vitamin: '#48BB78', // Green
    mineral: '#4299E1', // Blue
    herb: '#ED8936', // Orange
    amino_acid: '#9F7AEA', // Purple
    other: '#38B2AC' // Teal
  };
  return colors[category] || '#A0AEC0'; // Gray fallback
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    high: '#22C55E', // Green
    medium: '#EAB308', // Yellow
    low: '#6B7280' // Gray
  };
  return colors[priority] || '#6B7280';
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function calculateProfileCompleteness(profile: any): number {
  if (!profile) return 0;
  
  const fields = ['age', 'gender', 'weight', 'height', 'symptoms', 'health_goals'];
  const completedFields = fields.filter(field => 
    profile[field] && (Array.isArray(profile[field]) ? profile[field].length > 0 : true)
  ).length;
  
  return Math.round((completedFields / fields.length) * 100);
}

export function extractTopConcerns(profile: any): string[] {
  if (!profile?.symptoms) return [];
  
  const concernMap: Record<string, string> = {
    'Fadiga': 'Fadiga crônica pode indicar deficiências nutricionais',
    'Insônia': 'Problemas de sono afetam recuperação e bem-estar',
    'Ansiedade': 'Ansiedade pode estar relacionada a desequilíbrios nutricionais',
    'Dores musculares': 'Dores musculares podem indicar deficiência de magnésio',
    'Baixa imunidade': 'Sistema imunológico enfraquecido precisa de suporte nutricional',
    'Estresse excessivo': 'Estresse crônico depleta vitaminas e minerais essenciais'
  };
  
  return profile.symptoms
    .filter((symptom: string) => concernMap[symptom])
    .map((symptom: string) => concernMap[symptom])
    .slice(0, 3);
}

export function extractKeyBenefits(recommendations: any[]): string[] {
  const benefitCounts: Record<string, number> = {};
  
  recommendations.forEach(rec => {
    rec.supplement?.benefits?.forEach((benefit: string) => {
      benefitCounts[benefit] = (benefitCounts[benefit] || 0) + 1;
    });
  });
  
  return Object.entries(benefitCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([benefit]) => benefit);
}

export function calculateTotalScore(recommendations: any[]): number {
  if (!recommendations.length) return 0;
  
  const averageConfidence = recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length;
  const highPriorityRatio = recommendations.filter(rec => rec.priority === 'high').length / recommendations.length;
  
  // Weight: 70% confidence, 30% high priority ratio
  return Math.round((averageConfidence * 0.7) + (highPriorityRatio * 100 * 0.3));
}