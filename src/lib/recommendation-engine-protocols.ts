// Additional methods for RecommendationEngine to handle protocols
import type { TherapeuticProtocol, ProtocolRecommendation, EnhancedSupplement } from '@/types/protocols';
import type { UserProfile, RecommendationCandidate } from '@/types/supplements';

export class ProtocolRecommendationMethods {
  // Find therapeutic protocols based on user conditions/symptoms
  static findProtocolsByConditions(
    protocols: TherapeuticProtocol[], 
    symptoms: string[]
  ): TherapeuticProtocol[] {
    if (!symptoms || symptoms.length === 0) return [];
    
    const normalizedSymptoms = symptoms.map(symptom => 
      symptom.toLowerCase().trim()
    );
    
    return protocols.filter(protocol => {
      const condition = protocol.condition.toLowerCase();
      return normalizedSymptoms.some(symptom => {
        // Direct condition match
        if (condition.includes(symptom) || symptom.includes(condition)) {
          return true;
        }
        
        // Medical condition mapping
        const conditionMappings: Record<string, string[]> = {
          'hipertensão': ['pressão alta', 'hipertensão arterial'],
          'diabetes': ['diabetes t2', 'pré-diabetes', 'resistência insulínica'],
          'ansiedade': ['transtorno ansioso', 'estresse', 'nervosismo'],
          'depressão': ['humor baixo', 'tristeza', 'melancolia'],
          'insônia': ['dificuldade para dormir', 'sono ruim'],
          'fadiga': ['cansaço', 'energia baixa', 'exaustão']
        };
        
        return Object.entries(conditionMappings).some(([key, aliases]) => {
          if (condition.includes(key)) {
            return aliases.some(alias => symptom.includes(alias));
          }
          return false;
        });
      });
    });
  }

  // Enhance supplement candidates with protocol-based synergies
  static enhanceWithProtocolSynergies(
    candidates: RecommendationCandidate[],
    protocols: TherapeuticProtocol[]
  ): RecommendationCandidate[] {
    return candidates.map(candidate => {
      const supplement = candidate.supplement as EnhancedSupplement;
      
      // Find protocols that include this supplement
      const relatedProtocols = protocols.filter(protocol =>
        protocol.supplement_combination.some(combo =>
          combo.nome.toLowerCase() === supplement.name.toLowerCase()
        )
      );
      
      if (relatedProtocols.length > 0) {
        // Boost weight for supplements that are part of protocols
        const synergyBonus = relatedProtocols.length * 2;
        const protocolNames = relatedProtocols.map(p => p.condition).join(', ');
        
        return {
          ...candidate,
          weight: candidate.weight + synergyBonus,
          reason: `${candidate.reason} + Protocolo terapêutico para: ${protocolNames}`
        };
      }
      
      return candidate;
    });
  }

  // Score and rank protocol recommendations
  static scoreProtocolRecommendations(
    protocols: TherapeuticProtocol[],
    userProfile: UserProfile
  ): Partial<ProtocolRecommendation>[] {
    if (!protocols || protocols.length === 0) return [];
    
    return protocols.map(protocol => {
      let confidenceScore = 50; // Base score
      
      // Score based on symptom match quality
      const userSymptoms = userProfile.symptoms || [];
      const condition = protocol.condition.toLowerCase();
      
      const directMatch = userSymptoms.some(symptom =>
        condition.includes(symptom.toLowerCase()) || 
        symptom.toLowerCase().includes(condition)
      );
      
      if (directMatch) confidenceScore += 30;
      
      // Score based on supplement evidence levels in protocol
      const avgEvidence = protocol.supplement_combination.reduce((acc, supp) => {
        const evidenceScore = supp.evidencia === 'A' ? 20 : 
                            supp.evidencia === 'B' ? 15 : 10;
        return acc + evidenceScore;
      }, 0) / protocol.supplement_combination.length;
      
      confidenceScore += avgEvidence;
      
      // Score based on expected efficacy
      if (protocol.expected_efficacy?.includes('30-45%')) {
        confidenceScore += 15;
      }
      
      // Cap at 100
      confidenceScore = Math.min(100, confidenceScore);
      
      return {
        protocol_id: protocol.id,
        confidence_score: Math.round(confidenceScore),
        personalization_notes: `Protocolo para ${protocol.condition} com ${protocol.supplement_combination.length} suplementos`
      };
    }).sort((a, b) => (b.confidence_score || 0) - (a.confidence_score || 0));
  }
}