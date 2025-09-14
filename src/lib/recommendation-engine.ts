import { Supplement, Recommendation, RecommendationCandidate, UserProfile } from '@/types/supplements';

export class RecommendationEngine {
  private supplements: Supplement[] = [];

  constructor(supplements: Supplement[]) {
    this.supplements = supplements;
  }

  async generateRecommendations(userProfile: UserProfile): Promise<Recommendation[]> {
    const candidates: RecommendationCandidate[] = [];

    // 1. Analisar sintomas principais
    if (userProfile.symptoms && userProfile.symptoms.length > 0) {
      const symptomBasedCandidates = this.findSupplementsBySymptoms(userProfile.symptoms);
      candidates.push(...symptomBasedCandidates);
    }

    // 2. Analisar objetivos de saúde
    if (userProfile.health_goals && userProfile.health_goals.length > 0) {
      const goalBasedCandidates = this.findSupplementsByGoals(userProfile.health_goals);
      candidates.push(...goalBasedCandidates);
    }

    // 3. Analisar estilo de vida
    const lifestyleCandidates = this.findSupplementsByLifestyle(userProfile);
    candidates.push(...lifestyleCandidates);

    // 4. Remover duplicatas e calcular confiança
    const uniqueRecommendations = this.removeDuplicatesAndScore(candidates, userProfile);

    // 5. Limitar a 5-8 recomendações principais
    const topRecommendations = uniqueRecommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 6);

    return topRecommendations;
  }

  private findSupplementsBySymptoms(symptoms: string[]): RecommendationCandidate[] {
    const matches: RecommendationCandidate[] = [];

    for (const supplement of this.supplements) {
      const matchingSymptoms = supplement.target_symptoms.filter(target =>
        symptoms.some(symptom => this.normalizeText(symptom) === this.normalizeText(target))
      );

      if (matchingSymptoms.length > 0) {
        matches.push({
          supplement,
          reason: `Indicado para: ${matchingSymptoms.join(', ')}`,
          weight: matchingSymptoms.length * 2 // Peso alto para sintomas
        });
      }
    }

    return matches;
  }

  private findSupplementsByGoals(goals: string[]): RecommendationCandidate[] {
    const goalToSupplementMap: Record<string, string[]> = {
      'Ganho de massa muscular': ['creatina', 'vitamina_d3', 'omega_3', 'magnesio'],
      'Perda de peso': ['l_teanina', 'vitamina_b12', 'ferro', 'vitamina_c'],
      'Melhoria da energia': ['vitamina_b12', 'ferro', 'vitamina_d3', 'magnesio'],
      'Redução do estresse': ['ashwagandha', 'magnesio', 'l_teanina', 'omega_3'],
      'Melhoria do sono': ['magnesio', 'melatonina', 'l_teanina', 'ashwagandha'],
      'Fortalecimento do sistema imunológico': ['vitamina_c', 'vitamina_d3', 'probioticos', 'omega_3'],
      'Melhoria da concentração': ['omega_3', 'vitamina_b12', 'l_teanina'],
      'Redução da fadiga': ['vitamina_b12', 'ferro', 'vitamina_d3', 'magnesio'],
      'Melhoria da performance atlética': ['creatina', 'magnesio', 'vitamina_d3', 'vitamina_b12'],
      'Saúde cardiovascular': ['omega_3', 'magnesio', 'vitamina_d3'],
      'Saúde óssea': ['vitamina_d3', 'magnesio'],
      'Anti-envelhecimento': ['omega_3', 'vitamina_c', 'vitamina_d3'],
      'Melhoria da digestão': ['probioticos'],
      'Controle hormonal': ['ashwagandha', 'magnesio', 'omega_3'],
      'Recuperação muscular': ['magnesio', 'omega_3', 'vitamina_d3']
    };

    const matches: RecommendationCandidate[] = [];

    for (const goal of goals) {
      const supplementIds = goalToSupplementMap[goal] || [];
      
      for (const suppId of supplementIds) {
        const supplement = this.supplements.find(s => s.id === suppId);
        
        if (supplement) {
          matches.push({
            supplement,
            reason: `Objetivo: ${goal}`,
            weight: 1.5 // Peso médio para objetivos
          });
        }
      }
    }

    return matches;
  }

  private findSupplementsByLifestyle(profile: UserProfile): RecommendationCandidate[] {
    const matches: RecommendationCandidate[] = [];

    // Qualidade do sono baixa
    if (profile.sleep_quality && profile.sleep_quality <= 2) {
      const sleepSupplements = ['magnesio', 'melatonina', 'l_teanina'];
      
      sleepSupplements.forEach(suppId => {
        const supplement = this.supplements.find(s => s.id === suppId);
        
        if (supplement) {
          matches.push({
            supplement,
            reason: 'Qualidade do sono baixa',
            weight: 1.8
          });
        }
      });
    }

    // Nível de estresse elevado
    if (profile.stress_level && profile.stress_level >= 4) {
      const stressSupplements = ['ashwagandha', 'magnesio', 'vitamina_b12'];
      
      stressSupplements.forEach(suppId => {
        const supplement = this.supplements.find(s => s.id === suppId);
        
        if (supplement) {
          matches.push({
            supplement,
            reason: 'Nível de estresse elevado',
            weight: 1.7
          });
        }
      });
    }

    // Exercícios frequentes
    if (profile.exercise_frequency && profile.exercise_frequency >= 4) {
      const exerciseSupplements = ['magnesio', 'omega_3', 'vitamina_d3', 'vitamina_c'];
      
      exerciseSupplements.forEach(suppId => {
        const supplement = this.supplements.find(s => s.id === suppId);
        
        if (supplement) {
          matches.push({
            supplement,
            reason: 'Exercícios frequentes',
            weight: 1.3
          });
        }
      });
    }

    return matches;
  }

  private removeDuplicatesAndScore(
    candidates: RecommendationCandidate[],
    profile: UserProfile
  ): Recommendation[] {
    const supplementMap = new Map<string, { 
      supplement: Supplement; 
      reasons: string[]; 
      totalWeight: number;
    }>();

    // Agrupar por suplemento
    for (const candidate of candidates) {
      const existing = supplementMap.get(candidate.supplement.id);
      
      if (existing) {
        existing.reasons.push(candidate.reason);
        existing.totalWeight += candidate.weight;
      } else {
        supplementMap.set(candidate.supplement.id, {
          supplement: candidate.supplement,
          reasons: [candidate.reason],
          totalWeight: candidate.weight
        });
      }
    }

    // Converter para recomendações com confiança
    const recommendations: Recommendation[] = [];
    
    for (const [suppId, data] of supplementMap) {
      const confidence = Math.min(Math.round(data.totalWeight * 20), 95); // Max 95%
      const priority = confidence >= 70 ? 'high' : confidence >= 50 ? 'medium' : 'low';
      
      recommendations.push({
        id: `rec_${suppId}_${Date.now()}`,
        user_id: profile.user_id,
        supplement_id: suppId,
        supplement: data.supplement,
        recommended_dosage: this.calculateDosage(data.supplement, profile),
        confidence,
        reasoning: data.reasons.join('; '),
        priority,
        created_at: new Date().toISOString()
      });
    }

    return recommendations;
  }

  private calculateDosage(supplement: Supplement, profile: UserProfile): number {
    // Dosagem baseada no peso e idade
    const baseWeight = 70; // kg de referência
    const weightFactor = profile.weight ? profile.weight / baseWeight : 1;
    const ageFactor = profile.age && profile.age > 50 ? 0.9 : 1;
    
    const baseDosage = (supplement.dosage_min + supplement.dosage_max) / 2;
    return Math.round(baseDosage * weightFactor * ageFactor * 100) / 100;
  }

  private normalizeText(text: string): string {
    return text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .trim();
  }
}