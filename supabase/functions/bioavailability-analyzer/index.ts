import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BioavailabilityRequest {
  supplementId: string;
  userProfile?: {
    age?: number;
    weight?: number;
    gender?: string;
    conditions?: string[];
    medications?: string[];
  };
}

interface PharmaceuticalForm {
  name: string;
  bioavailabilityFactor: number;
  absorptionRate: number;
  peakTimeHours: number;
  durationHours: number;
  costMultiplier: number;
  clinicalEvidence: string;
  mechanismDescription: string;
}

const PHARMACEUTICAL_FORMS: Record<string, PharmaceuticalForm> = {
  'liposomal': {
    name: 'Liposomal',
    bioavailabilityFactor: 8.5,
    absorptionRate: 95,
    peakTimeHours: 0.5,
    durationHours: 12,
    costMultiplier: 4.5,
    clinicalEvidence: 'High - Multiple RCTs showing 8-15x higher absorption',
    mechanismDescription: 'Phospholipid vesicles protect compounds through GI tract and facilitate cellular uptake'
  },
  'nanoemulsion': {
    name: 'Nanoemulsão',
    bioavailabilityFactor: 6.2,
    absorptionRate: 87,
    peakTimeHours: 0.75,
    durationHours: 8,
    costMultiplier: 3.8,
    clinicalEvidence: 'Moderate-High - Studies showing 5-8x improved absorption',
    mechanismDescription: 'Nano-sized droplets increase surface area and solubility'
  },
  'micronized': {
    name: 'Micronizada',
    bioavailabilityFactor: 2.8,
    absorptionRate: 75,
    peakTimeHours: 1.5,
    durationHours: 6,
    costMultiplier: 2.2,
    clinicalEvidence: 'Moderate - Consistent 2-4x absorption improvement',
    mechanismDescription: 'Reduced particle size increases dissolution rate'
  },
  'chelated': {
    name: 'Quelada',
    bioavailabilityFactor: 3.5,
    absorptionRate: 80,
    peakTimeHours: 1.0,
    durationHours: 8,
    costMultiplier: 2.8,
    clinicalEvidence: 'High - Superior absorption vs inorganic forms',
    mechanismDescription: 'Organic chelation protects minerals from interference'
  },
  'sublingual': {
    name: 'Sublingual',
    bioavailabilityFactor: 4.2,
    absorptionRate: 85,
    peakTimeHours: 0.25,
    durationHours: 4,
    costMultiplier: 2.5,
    clinicalEvidence: 'High - Direct absorption bypassing first-pass metabolism',
    mechanismDescription: 'Bypasses digestive system via sublingual absorption'
  },
  'enteric_coated': {
    name: 'Revestimento Entérico',
    bioavailabilityFactor: 2.1,
    absorptionRate: 70,
    peakTimeHours: 2.0,
    durationHours: 8,
    costMultiplier: 1.8,
    clinicalEvidence: 'Moderate - Protects from gastric degradation',
    mechanismDescription: 'pH-dependent coating protects from stomach acid'
  },
  'standard': {
    name: 'Padrão',
    bioavailabilityFactor: 1.0,
    absorptionRate: 45,
    peakTimeHours: 2.5,
    durationHours: 4,
    costMultiplier: 1.0,
    clinicalEvidence: 'Baseline - Standard pharmaceutical preparations',
    mechanismDescription: 'Conventional tablet/capsule formulation'
  }
};

const CIRCADIAN_TIMING = {
  'fat_soluble_vitamins': {
    optimal: '08:00',
    reason: 'Morning fat mobilization enhances absorption',
    with_meal: true
  },
  'water_soluble_vitamins': {
    optimal: '07:00',
    reason: 'Empty stomach maximizes absorption',
    with_meal: false
  },
  'minerals': {
    optimal: '19:00',
    reason: 'Evening absorption reduces competition',
    with_meal: true
  },
  'adaptogens': {
    optimal: '09:00',
    reason: 'Morning cortisol peak synergizes with adaptogenic effects',
    with_meal: false
  },
  'nootropics': {
    optimal: '08:30',
    reason: 'Peak cognitive performance window',
    with_meal: false
  },
  'sleep_support': {
    optimal: '21:00',
    reason: 'Supports natural melatonin production',
    with_meal: false
  }
};

Deno.serve(async (req) => {
  console.log('Bioavailability analyzer function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { supplementId, userProfile }: BioavailabilityRequest = await req.json();
    
    console.log('Analyzing bioavailability for supplement:', supplementId);

    // Get supplement data
    const { data: supplement, error: supplementError } = await supabaseClient
      .from('supplements')
      .select('*')
      .eq('id', supplementId)
      .single();

    if (supplementError || !supplement) {
      throw new Error(`Supplement not found: ${supplementId}`);
    }

    // Calculate bioavailability scores for different forms
    const formsAnalysis = Object.entries(PHARMACEUTICAL_FORMS).map(([key, form]) => {
      const adjustedBioavailability = calculatePersonalizedBioavailability(
        form.bioavailabilityFactor,
        userProfile,
        supplement.category
      );

      const equivalentDose = calculateEquivalentDose(
        supplement.dosage_min || 100,
        adjustedBioavailability
      );

      const costPerEffectiveUnit = (supplement.price_min || 50) * form.costMultiplier / adjustedBioavailability;

      return {
        form: key,
        name: form.name,
        bioavailabilityFactor: adjustedBioavailability,
        absorptionRate: form.absorptionRate,
        equivalentDose,
        costMultiplier: form.costMultiplier,
        costPerEffectiveUnit,
        clinicalEvidence: form.clinicalEvidence,
        mechanismDescription: form.mechanismDescription,
        peakTimeHours: form.peakTimeHours,
        durationHours: form.durationHours,
        score: calculateOverallScore(adjustedBioavailability, costPerEffectiveUnit, form.absorptionRate)
      };
    });

    // Find optimal forms
    const optimalForm = formsAnalysis.reduce((best, current) => 
      current.bioavailabilityFactor > best.bioavailabilityFactor ? current : best
    );

    const costBenefitForm = formsAnalysis.reduce((best, current) => 
      current.score > best.score ? current : best
    );

    // Get circadian timing
    const timing = getOptimalTiming(supplement.category);

    // Calculate final bioavailability score (0-100)
    const bioavailabilityScore = Math.min(100, Math.round(
      (optimalForm.bioavailabilityFactor / 10) * 100 +
      (optimalForm.absorptionRate - 45) / 2
    ));

    // Update supplement with bioavailability data
    const { error: updateError } = await supabaseClient
      .from('supplements')
      .update({
        pharmaceutical_forms: formsAnalysis,
        bioavailability_score: bioavailabilityScore,
        optimal_form: optimalForm.name,
        cost_benefit_form: costBenefitForm.name,
        circadian_timing: timing,
        food_interactions: getFoodInteractions(supplement.category),
        absorption_enhancers: getAbsorptionEnhancers(supplement.category),
        absorption_inhibitors: getAbsorptionInhibitors(supplement.category)
      })
      .eq('id', supplementId);

    if (updateError) {
      console.error('Error updating supplement:', updateError);
    }

    // Store detailed bioavailability data
    for (const analysis of formsAnalysis) {
      const { error: insertError } = await supabaseClient
        .from('bioavailability_data')
        .upsert({
          supplement_id: supplementId,
          pharmaceutical_form: analysis.form,
          bioavailability_factor: analysis.bioavailabilityFactor,
          absorption_rate: analysis.absorptionRate,
          peak_time_hours: analysis.peakTimeHours,
          duration_hours: analysis.durationHours,
          cost_multiplier: analysis.costMultiplier,
          clinical_evidence: analysis.clinicalEvidence,
          mechanism_description: analysis.mechanismDescription,
          optimal_conditions: timing,
          synergistic_compounds: getAbsorptionEnhancers(supplement.category),
          inhibitory_compounds: getAbsorptionInhibitors(supplement.category)
        }, { onConflict: 'supplement_id,pharmaceutical_form' });

      if (insertError) {
        console.error('Error inserting bioavailability data:', insertError);
      }
    }

    const response = {
      supplementId,
      bioavailabilityScore,
      optimalForm: optimalForm.name,
      costBenefitForm: costBenefitForm.name,
      formsAnalysis,
      timing,
      recommendations: generateRecommendations(formsAnalysis, timing, supplement)
    };

    console.log('Bioavailability analysis completed successfully');

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in bioavailability analyzer:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function calculatePersonalizedBioavailability(
  baseFactor: number,
  userProfile?: any,
  category?: string
): number {
  let adjustedFactor = baseFactor;

  if (userProfile) {
    // Age adjustments
    if (userProfile.age) {
      if (userProfile.age > 65) adjustedFactor *= 0.85; // Reduced absorption in elderly
      if (userProfile.age < 25) adjustedFactor *= 1.1; // Better absorption in young adults
    }

    // Gender adjustments for specific categories
    if (userProfile.gender === 'female' && category === 'mineral') {
      adjustedFactor *= 1.15; // Women often need higher mineral absorption
    }

    // Weight adjustments
    if (userProfile.weight) {
      if (userProfile.weight > 80) adjustedFactor *= 0.95;
      if (userProfile.weight < 60) adjustedFactor *= 1.05;
    }
  }

  return Math.round(adjustedFactor * 100) / 100;
}

function calculateEquivalentDose(standardDose: number, bioavailabilityFactor: number): number {
  return Math.round(standardDose / bioavailabilityFactor);
}

function calculateOverallScore(
  bioavailability: number, 
  costPerUnit: number, 
  absorptionRate: number
): number {
  const bioScore = (bioavailability / 10) * 40;
  const costScore = Math.max(0, (100 - costPerUnit) / 2);
  const absorptionScore = (absorptionRate - 45) / 2;
  
  return Math.round(bioScore + costScore + absorptionScore);
}

function getOptimalTiming(category: string): any {
  const categoryMap: Record<string, keyof typeof CIRCADIAN_TIMING> = {
    'vitamin': 'fat_soluble_vitamins',
    'mineral': 'minerals',
    'herb': 'adaptogens',
    'amino_acid': 'nootropics',
    'other': 'water_soluble_vitamins'
  };

  const timingKey = categoryMap[category] || 'water_soluble_vitamins';
  return CIRCADIAN_TIMING[timingKey];
}

function getFoodInteractions(category: string): any {
  const interactions: Record<string, any> = {
    'vitamin': { with_fat: 'enhances', with_fiber: 'reduces' },
    'mineral': { with_phytates: 'blocks', with_vitamin_c: 'enhances' },
    'herb': { empty_stomach: 'optimal', with_meal: 'reduces_irritation' },
    'amino_acid': { empty_stomach: 'optimal', with_protein: 'competes' }
  };

  return interactions[category] || {};
}

function getAbsorptionEnhancers(category: string): string[] {
  const enhancers: Record<string, string[]> = {
    'vitamin': ['Healthy fats', 'Vitamin C', 'Bioperine'],
    'mineral': ['Vitamin C', 'Vitamin D', 'Amino acid chelation'],
    'herb': ['Bioperine', 'Lecithin', 'Quercetin'],
    'amino_acid': ['B-complex vitamins', 'Vitamin C', 'Empty stomach']
  };

  return enhancers[category] || [];
}

function getAbsorptionInhibitors(category: string): string[] {
  const inhibitors: Record<string, string[]> = {
    'vitamin': ['Excess fiber', 'Alcohol', 'Certain medications'],
    'mineral': ['Phytates', 'Oxalates', 'Calcium competition'],
    'herb': ['High-fat meals', 'Alcohol', 'Certain drugs'],
    'amino_acid': ['Other proteins', 'High carb meals', 'Caffeine']
  };

  return inhibitors[category] || [];
}

function generateRecommendations(formsAnalysis: any[], timing: any, supplement: any): any {
  const best = formsAnalysis.reduce((best, current) => 
    current.score > best.score ? current : best
  );

  return {
    primaryRecommendation: `Use ${best.name} form for optimal absorption (${best.bioavailabilityFactor}x better)`,
    timingRecommendation: `Take at ${timing.optimal} ${timing.with_meal ? 'with meal' : 'on empty stomach'}`,
    doseAdjustment: `Reduce dose to ${best.equivalentDose}mg for same effect`,
    costOptimization: `Despite ${best.costMultiplier}x cost, you get ${best.bioavailabilityFactor}x absorption`,
    synergies: getAbsorptionEnhancers(supplement.category),
    precautions: getAbsorptionInhibitors(supplement.category)
  };
}