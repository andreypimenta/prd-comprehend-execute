import type { Supplement, Recommendation, UserProfile, RecommendationCandidate } from '@/types/supplements';
import type { TherapeuticProtocol, ProtocolRecommendation, EnhancedSupplement } from '@/types/protocols';

export class RecommendationEngine {
  private supplements: EnhancedSupplement[];
  private protocols: TherapeuticProtocol[];

  constructor(supplements: EnhancedSupplement[], protocols: TherapeuticProtocol[] = []) {
    this.supplements = supplements;
    this.protocols = protocols;
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
      supplement: EnhancedSupplement; 
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
          supplement: candidate.supplement as EnhancedSupplement,
          reasons: [candidate.reason],
          totalWeight: candidate.weight
        });
      }
    }

    // Converter para recomendações com confiança baseada em evidência científica
    const recommendations: Recommendation[] = [];
    
    for (const [suppId, data] of supplementMap) {
      // Confiança base
      let baseConfidence = Math.min(Math.round(data.totalWeight * 20), 95);
      
      // Multiplicador de evidência científica
      const evidenceMultiplier = this.getEvidenceMultiplier(data.supplement.evidence_level);
      const scientificEvidenceBoost = this.getScientificEvidenceBoost(data.supplement);
      
      const confidence = Math.min(Math.round(baseConfidence * evidenceMultiplier * scientificEvidenceBoost), 98);
      
      // Prioridade baseada em evidência científica
      let priority: 'high' | 'medium' | 'low' = 'medium';
      const evidenceClassification = (data.supplement as any).evidence_classification;
      if (evidenceClassification === 'A+' || evidenceClassification === 'A' || confidence >= 80) {
        priority = 'high';
      } else if (evidenceClassification === 'B+' || evidenceClassification === 'B' || confidence >= 60) {
        priority = 'medium';
      } else {
        priority = 'low';
      }
      
      // Raciocínio aprimorado com evidência científica
      const enhancedReasoning = this.buildEnhancedReasoning(data.reasons.join('; '), data.supplement);
      
      recommendations.push({
        id: `rec_${suppId}_${Date.now()}`,
        user_id: profile.user_id,
        supplement_id: suppId,
        supplement: data.supplement,
        recommended_dosage: this.calculateDosage(data.supplement, profile),
        confidence,
        reasoning: enhancedReasoning,
        priority,
        created_at: new Date().toISOString()
      });
    }

    // Ordenar por score de evidência científica e confiança
    return recommendations.sort((a, b) => {
      const aEvidence = (a.supplement as any).integrated_evidence_score || 0;
      const bEvidence = (b.supplement as any).integrated_evidence_score || 0;
      if (Math.abs(aEvidence - bEvidence) > 0.1) {
        return bEvidence - aEvidence;
      }
      return b.confidence - a.confidence;
    });
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

  private getEvidenceMultiplier(evidenceLevel: string): number {
    switch (evidenceLevel.toLowerCase()) {
      case 'strong':
        return 1.2;
      case 'moderate':
        return 1.0;
      case 'limited':
        return 0.8;
      default:
        return 0.8;
    }
  }

  private getScientificEvidenceBoost(supplement: EnhancedSupplement): number {
    const evidenceScore = (supplement as any).integrated_evidence_score;
    const evidenceClassification = (supplement as any).evidence_classification;
    
    if (!evidenceScore && !evidenceClassification) {
      return 1.0; // Sem dados de evidência científica disponíveis
    }

    // Boost baseado na classificação de evidência
    switch (evidenceClassification) {
      case 'A+':
        return 1.3;
      case 'A':
        return 1.2;
      case 'B+':
        return 1.1;
      case 'B':
        return 1.0;
      case 'C':
        return 0.9;
      case 'D':
        return 0.8;
      default:
        // Fallback para boost baseado em score
        if (evidenceScore >= 0.8) return 1.2;
        if (evidenceScore >= 0.6) return 1.1;
        if (evidenceScore >= 0.4) return 1.0;
        return 0.9;
    }
  }

  private buildEnhancedReasoning(baseReasoning: string, supplement: EnhancedSupplement): string {
    const evidenceClassification = (supplement as any).evidence_classification;
    const evidenceScore = (supplement as any).integrated_evidence_score;
    const pubmedCount = (supplement as any).pubmed_studies?.length || 0;
    const clinicalTrialsCount = (supplement as any).clinical_trials?.length || 0;
    const cochraneCount = (supplement as any).cochrane_reviews?.length || 0;

    let scientificSupport = '';
    
    if (evidenceClassification && evidenceClassification !== 'D') {
      scientificSupport = ` Suporte científico: Grau ${evidenceClassification}`;
      
      if (pubmedCount > 0 || clinicalTrialsCount > 0 || cochraneCount > 0) {
        const evidencePieces = [];
        if (pubmedCount > 0) evidencePieces.push(`${pubmedCount} estudos PubMed`);
        if (clinicalTrialsCount > 0) evidencePieces.push(`${clinicalTrialsCount} ensaios clínicos`);
        if (cochraneCount > 0) evidencePieces.push(`${cochraneCount} revisões Cochrane`);
        
        scientificSupport += ` baseado em ${evidencePieces.join(', ')}.`;
      }
      
      if (evidenceScore) {
        scientificSupport += ` Score de evidência integrado: ${(evidenceScore * 100).toFixed(0)}%.`;
      }
    }

    return baseReasoning + scientificSupport;
  }
}