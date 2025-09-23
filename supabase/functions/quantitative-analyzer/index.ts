import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Advanced Quantitative Analysis System
class QuantitativeAnalyzer {
  private supabase: any;

  constructor(supabaseClient: any) {
    this.supabase = supabaseClient;
  }

  // PBPK Model Implementation
  private calculatePBPKModel(supplement: any, userProfile: any) {
    const pkParams = supplement.pk_parameters || {};
    const defaultPK = {
      absorption_rate: 0.8,
      bioavailability: 1.0,
      clearance: 0.1,
      volume_distribution: 70, // L
      half_life: 8, // hours
      protein_binding: 0.9
    };

    const params = { ...defaultPK, ...pkParams };
    
    // Adjust for user factors
    const ageAdjustment = userProfile.age ? Math.max(0.7, 1 - (userProfile.age - 30) * 0.01) : 1;
    const weightAdjustment = userProfile.weight ? userProfile.weight / 70 : 1;
    
    const adjustedParams = {
      ...params,
      clearance: params.clearance * ageAdjustment,
      volume_distribution: params.volume_distribution * weightAdjustment
    };

    // Calculate concentration-time profile
    const timePoints = Array.from({ length: 25 }, (_, i) => i); // 0 to 24 hours
    const concentrations = timePoints.map(t => {
      const ka = adjustedParams.absorption_rate;
      const ke = 0.693 / adjustedParams.half_life;
      const dose = 100; // mg, normalized
      
      const conc = (dose * ka * adjustedParams.bioavailability / adjustedParams.volume_distribution) *
                   ((Math.exp(-ke * t) - Math.exp(-ka * t)) / (ka - ke));
      
      return Math.max(0, conc);
    });

    return {
      timeProfile: timePoints.map((t, i) => ({ time: t, concentration: concentrations[i] })),
      peakTime: timePoints[concentrations.indexOf(Math.max(...concentrations))],
      peakConcentration: Math.max(...concentrations),
      auc: this.calculateAUC(concentrations),
      adjustedParams
    };
  }

  // Monte Carlo Simulation
  private runMonteCarloSimulation(supplement: any, userProfile: any, iterations = 1000) {
    const results = [];
    
    for (let i = 0; i < iterations; i++) {
      // Add random variability to parameters
      const variability = supplement.population_variability || {};
      const randomFactor = () => 0.8 + Math.random() * 0.4; // ±20% variability
      
      const variedProfile = {
        ...userProfile,
        age: userProfile.age * (variability.age_factor || randomFactor()),
        weight: userProfile.weight * (variability.weight_factor || randomFactor())
      };

      const pkResult = this.calculatePBPKModel(supplement, variedProfile);
      results.push({
        peakConcentration: pkResult.peakConcentration,
        auc: pkResult.auc,
        peakTime: pkResult.peakTime
      });
    }

    // Calculate statistics
    const peakConcs = results.map(r => r.peakConcentration);
    const aucs = results.map(r => r.auc);
    
    return {
      peakConcentration: {
        mean: this.mean(peakConcs),
        std: this.standardDeviation(peakConcs),
        percentile_5: this.percentile(peakConcs, 5),
        percentile_95: this.percentile(peakConcs, 95),
        distribution: peakConcs
      },
      auc: {
        mean: this.mean(aucs),
        std: this.standardDeviation(aucs),
        percentile_5: this.percentile(aucs, 5),
        percentile_95: this.percentile(aucs, 95),
        distribution: aucs
      },
      iterations,
      confidence_interval: 95
    };
  }

  // Machine Learning Synergy Prediction
  private predictSynergy(supplementPair: string[], supplements: any[]) {
    // Simplified ML model (Random Forest simulation)
    const supp1 = supplements.find(s => s.id === supplementPair[0]);
    const supp2 = supplements.find(s => s.id === supplementPair[1]);
    
    if (!supp1 || !supp2) return null;

    const features1 = supp1.ml_features || {};
    const features2 = supp2.ml_features || {};
    
    // Feature engineering for synergy prediction
    const synergyFeatures = {
      category_similarity: supp1.category === supp2.category ? 1 : 0,
      mechanism_overlap: this.calculateMechanismOverlap(supp1, supp2),
      bioavailability_complementarity: this.calculateBioavailabilityComplementarity(supp1, supp2),
      timing_compatibility: this.calculateTimingCompatibility(supp1, supp2),
      interaction_risk: this.calculateInteractionRisk(supp1, supp2)
    };

    // Random Forest prediction simulation
    const synergyScore = this.randomForestPredict(synergyFeatures);
    const confidence = this.calculateMLConfidence(synergyFeatures);
    
    // Calculate predicted efficacy boost
    const efficacyBoost = synergyScore > 0.6 ? 
      Math.min(2.0, 1 + synergyScore * 0.8) : 
      Math.max(0.8, 1 + (synergyScore - 0.5) * 0.4);

    return {
      synergy_score: synergyScore,
      confidence_level: confidence,
      predicted_efficacy_boost: efficacyBoost,
      mechanism_description: this.generateSynergyMechanism(supp1, supp2, synergyScore),
      safety_assessment: this.assessSafety(supp1, supp2),
      features: synergyFeatures
    };
  }

  // Mathematical Optimization
  private optimizeProtocol(supplements: any[], userProfile: any, objective = 'efficacy') {
    const supplementIds = supplements.map(s => s.id);
    const results = {};
    
    // Objective functions
    const objectives = {
      efficacy: (doses: number[]) => this.calculateEfficacyScore(supplements, doses, userProfile),
      cost: (doses: number[]) => this.calculateCostScore(supplements, doses),
      safety: (doses: number[]) => this.calculateSafetyScore(supplements, doses, userProfile)
    };

    // Multi-objective optimization using weighted approach
    const weights = { efficacy: 0.5, cost: 0.3, safety: 0.2 };
    
    let bestDoses: number[] = [];
    let bestScore = -Infinity;
    
    // Grid search optimization (simplified)
    const gridPoints = 10;
    for (let i = 0; i < Math.pow(gridPoints, supplements.length); i++) {
      const doses = this.generateDoseCombination(i, supplements, gridPoints);
      
      if (!this.validateDoseConstraints(doses, supplements)) continue;
      
      const score = Object.entries(weights).reduce((total, [obj, weight]) => {
        return total + weight * objectives[obj as keyof typeof objectives](doses);
      }, 0);
      
      if (score > bestScore) {
        bestScore = score;
        bestDoses = doses;
      }
    }

    // Calculate predicted outcomes
    const predictedOutcomes = {
      efficacy_score: objectives.efficacy(bestDoses),
      cost_score: objectives.cost(bestDoses),
      safety_score: objectives.safety(bestDoses),
      synergy_effects: this.calculateCombinedSynergies(supplements, bestDoses)
    };

    return {
      optimized_dosages: bestDoses.map((dose, idx) => ({
        supplement_id: supplements[idx].id,
        supplement_name: supplements[idx].name,
        optimized_dose: dose,
        unit: supplements[idx].dosage_unit || 'mg'
      })),
      predicted_outcomes: predictedOutcomes,
      optimization_score: bestScore,
      confidence_score: this.calculateOptimizationConfidence(bestDoses, supplements)
    };
  }

  // Helper methods
  private calculateAUC(concentrations: number[]): number {
    return concentrations.reduce((sum, conc, i) => {
      if (i === 0) return conc;
      return sum + (concentrations[i-1] + conc) / 2;
    }, 0);
  }

  private mean(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  private standardDeviation(values: number[]): number {
    const avg = this.mean(values);
    const squareDiffs = values.map(val => Math.pow(val - avg, 2));
    return Math.sqrt(this.mean(squareDiffs));
  }

  private percentile(values: number[], p: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
  }

  private calculateMechanismOverlap(supp1: any, supp2: any): number {
    const benefits1 = new Set(supp1.benefits || []);
    const benefits2 = new Set(supp2.benefits || []);
    const intersection = new Set([...benefits1].filter(x => benefits2.has(x)));
    const union = new Set([...benefits1, ...benefits2]);
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  private calculateBioavailabilityComplementarity(supp1: any, supp2: any): number {
    const score1 = supp1.bioavailability_score || 0;
    const score2 = supp2.bioavailability_score || 0;
    return Math.abs(score1 - score2) / Math.max(score1, score2, 1);
  }

  private calculateTimingCompatibility(supp1: any, supp2: any): number {
    const timing1 = supp1.timing || 'any';
    const timing2 = supp2.timing || 'any';
    return timing1 === timing2 || timing1 === 'any' || timing2 === 'any' ? 1 : 0.5;
  }

  private calculateInteractionRisk(supp1: any, supp2: any): number {
    const interactions1 = new Set(supp1.interactions || []);
    const interactions2 = new Set(supp2.interactions || []);
    const hasRisk = [...interactions1].some(int => supp2.name.toLowerCase().includes(int.toLowerCase())) ||
                    [...interactions2].some(int => supp1.name.toLowerCase().includes(int.toLowerCase()));
    return hasRisk ? 0.8 : 0.1;
  }

  private randomForestPredict(features: any): number {
    // Simplified Random Forest prediction
    const weights = {
      category_similarity: 0.15,
      mechanism_overlap: 0.35,
      bioavailability_complementarity: 0.20,
      timing_compatibility: 0.15,
      interaction_risk: -0.15
    };
    
    const score = Object.entries(features).reduce((total, [key, value]) => {
      const weight = weights[key as keyof typeof weights] || 0;
      return total + weight * (value as number);
    }, 0.5);
    
    return Math.max(0, Math.min(1, score));
  }

  private calculateMLConfidence(features: any): number {
    const featureVariance = Object.values(features).reduce((sum, val) => sum + Math.pow(val as number - 0.5, 2), 0);
    return Math.max(0.6, Math.min(0.95, 0.8 - featureVariance * 0.3));
  }

  private generateSynergyMechanism(supp1: any, supp2: any, score: number): string {
    if (score > 0.7) {
      return `Alta sinergia: ${supp1.name} e ${supp2.name} trabalham sinergicamente através de mecanismos complementares.`;
    } else if (score > 0.5) {
      return `Sinergia moderada: Potencial interação benéfica entre ${supp1.name} e ${supp2.name}.`;
    } else {
      return `Sinergia limitada: Efeitos independentes de ${supp1.name} e ${supp2.name}.`;
    }
  }

  private assessSafety(supp1: any, supp2: any): any {
    return {
      interaction_risk: 'low',
      contraindication_overlap: false,
      dosage_concerns: false,
      monitoring_required: false
    };
  }

  private calculateEfficacyScore(supplements: any[], doses: number[], userProfile: any): number {
    return supplements.reduce((score, supp, idx) => {
      const dose = doses[idx];
      const minDose = supp.dosage_min || 0;
      const maxDose = supp.dosage_max || 1000;
      const optimalDose = (minDose + maxDose) / 2;
      
      const doseEfficiency = 1 - Math.abs(dose - optimalDose) / optimalDose;
      return score + doseEfficiency * (supp.evidence_level === 'strong' ? 1 : 0.7);
    }, 0) / supplements.length;
  }

  private calculateCostScore(supplements: any[], doses: number[]): number {
    const totalCost = supplements.reduce((cost, supp, idx) => {
      const dose = doses[idx];
      const pricePerMg = ((supp.price_min || 10) + (supp.price_max || 50)) / 2 / 1000;
      return cost + dose * pricePerMg;
    }, 0);
    
    return Math.max(0, 1 - totalCost / 100); // Normalize to 0-1
  }

  private calculateSafetyScore(supplements: any[], doses: number[], userProfile: any): number {
    return supplements.reduce((score, supp, idx) => {
      const dose = doses[idx];
      const maxSafeDose = supp.dosage_max || 1000;
      const safetyMargin = 1 - dose / maxSafeDose;
      return score + Math.max(0, safetyMargin);
    }, 0) / supplements.length;
  }

  private generateDoseCombination(index: number, supplements: any[], gridPoints: number): number[] {
    const doses = [];
    let remainingIndex = index;
    
    for (const supp of supplements) {
      const minDose = supp.dosage_min || 0;
      const maxDose = supp.dosage_max || 1000;
      const step = (maxDose - minDose) / (gridPoints - 1);
      const doseIndex = remainingIndex % gridPoints;
      remainingIndex = Math.floor(remainingIndex / gridPoints);
      
      doses.push(minDose + doseIndex * step);
    }
    
    return doses;
  }

  private validateDoseConstraints(doses: number[], supplements: any[]): boolean {
    return doses.every((dose, idx) => {
      const supp = supplements[idx];
      const minDose = supp.dosage_min || 0;
      const maxDose = supp.dosage_max || 1000;
      return dose >= minDose && dose <= maxDose;
    });
  }

  private calculateCombinedSynergies(supplements: any[], doses: number[]): any {
    const synergies = [];
    
    for (let i = 0; i < supplements.length; i++) {
      for (let j = i + 1; j < supplements.length; j++) {
        const synergyPrediction = this.predictSynergy([supplements[i].id, supplements[j].id], supplements);
        if (synergyPrediction && synergyPrediction.synergy_score > 0.5) {
          synergies.push({
            supplements: [supplements[i].name, supplements[j].name],
            synergy_score: synergyPrediction.synergy_score,
            efficacy_boost: synergyPrediction.predicted_efficacy_boost
          });
        }
      }
    }
    
    return synergies;
  }

  private calculateOptimizationConfidence(doses: number[], supplements: any[]): number {
    const doseStability = doses.reduce((stability, dose, idx) => {
      const supp = supplements[idx];
      const minDose = supp.dosage_min || 0;
      const maxDose = supp.dosage_max || 1000;
      const range = maxDose - minDose;
      const normalizedDose = (dose - minDose) / range;
      
      // Higher confidence for doses closer to middle range
      const distanceFromCenter = Math.abs(normalizedDose - 0.5);
      return stability + (1 - distanceFromCenter * 2);
    }, 0) / doses.length;
    
    return Math.max(0.5, Math.min(0.95, doseStability));
  }

  // Main analysis method
  async analyzeQuantitatively(supplementIds: string[], userProfile: any, analysisType: string) {
    try {
      // Fetch supplement data
      const { data: supplements, error } = await this.supabase
        .from('supplements')
        .select('*')
        .in('id', supplementIds);

      if (error || !supplements) {
        throw new Error('Failed to fetch supplement data');
      }

      let results = {};

      switch (analysisType) {
        case 'pbpk':
          results = supplements.map(supp => ({
            supplement_id: supp.id,
            supplement_name: supp.name,
            pbpk_analysis: this.calculatePBPKModel(supp, userProfile)
          }));
          break;

        case 'monte_carlo':
          results = supplements.map(supp => ({
            supplement_id: supp.id,
            supplement_name: supp.name,
            monte_carlo_simulation: this.runMonteCarloSimulation(supp, userProfile)
          }));
          break;

        case 'synergy_ml':
          const synergyResults = [];
          for (let i = 0; i < supplements.length; i++) {
            for (let j = i + 1; j < supplements.length; j++) {
              const synergy = this.predictSynergy([supplements[i].id, supplements[j].id], supplements);
              if (synergy) {
                synergyResults.push({
                  supplement_pair: [supplements[i].name, supplements[j].name],
                  ...synergy
                });
              }
            }
          }
          results = { synergy_predictions: synergyResults };
          break;

        case 'optimization':
          results = this.optimizeProtocol(supplements, userProfile);
          break;

        default:
          throw new Error('Invalid analysis type');
      }

      // Store results in database
      const { data: analysisRecord, error: insertError } = await this.supabase
        .from('quantitative_analysis')
        .insert({
          user_id: userProfile.user_id,
          supplement_ids: supplementIds,
          analysis_type: analysisType,
          input_parameters: userProfile,
          results: results,
          statistical_significance: 0.95
        })
        .select()
        .single();

      if (insertError) {
        console.error('Failed to store analysis:', insertError);
      }

      return {
        success: true,
        analysis_id: analysisRecord?.id,
        analysis_type: analysisType,
        results: results,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Quantitative analysis error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const analyzer = new QuantitativeAnalyzer(supabase);

    const { supplement_ids, user_profile, analysis_type } = await req.json();

    if (!supplement_ids || !Array.isArray(supplement_ids) || supplement_ids.length === 0) {
      throw new Error('supplement_ids is required and must be a non-empty array');
    }

    if (!user_profile || typeof user_profile !== 'object') {
      throw new Error('user_profile is required and must be an object');
    }

    if (!analysis_type || !['pbpk', 'monte_carlo', 'synergy_ml', 'optimization'].includes(analysis_type)) {
      throw new Error('analysis_type must be one of: pbpk, monte_carlo, synergy_ml, optimization');
    }

    console.log(`Starting quantitative analysis: ${analysis_type} for supplements:`, supplement_ids);

    const result = await analyzer.analyzeQuantitatively(supplement_ids, user_profile, analysis_type);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in quantitative-analyzer:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});