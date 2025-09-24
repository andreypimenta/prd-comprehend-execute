const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

interface EvidenceUpdate {
  supplement_id: string;
  update_type: 'evidence_level_change' | 'new_study' | 'safety_alert' | 'dosage_update';
  old_value: any;
  new_value: any;
  confidence_score: number;
  justification: string;
  source_data: any;
}

interface ClassificationUpdate {
  supplement_id: string;
  classification_type: 'evidence_level' | 'safety_profile' | 'efficacy_rating';
  old_classification: string;
  new_classification: string;
  confidence_score: number;
  reasoning: string;
  supporting_studies: any[];
  auto_approved: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { supplement_ids, auto_approve_threshold = 0.8 } = await req.json();
    
    console.log('Starting evidence auto-update for supplements:', supplement_ids);

    const results = {
      processed_supplements: 0,
      evidence_updates: 0,
      classification_changes: 0,
      auto_approved: 0,
      requires_review: 0
    };

    // Process each supplement
    for (const supplementId of supplement_ids) {
      await processSupplementEvidence(supabase, supplementId, auto_approve_threshold, results);
      results.processed_supplements++;
    }

    // Update monitoring job status
    await updateMonitoringJob('evidence_update', {
      status: 'completed',
      results: results,
      completed_at: new Date().toISOString()
    });

    console.log('Evidence auto-update completed:', results);

    return new Response(
      JSON.stringify({
        success: true,
        results: results,
        message: `Evidence auto-update completed: ${results.evidence_updates} updates, ${results.classification_changes} classification changes`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Evidence auto-update error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

async function processSupplementEvidence(
  supabase: any, 
  supplementId: string, 
  autoApproveThreshold: number,
  results: any
) {
  try {
    console.log(`Processing evidence for supplement: ${supplementId}`);

    // Get current supplement data
    const { data: supplement } = await supabase
      .from('supplements')
      .select('*')
      .eq('id', supplementId)
      .single();

    if (!supplement) {
      console.log(`Supplement not found: ${supplementId}`);
      return;
    }

    // Get all scientific evidence for this supplement
    const { data: evidenceData } = await supabase
      .from('scientific_evidence')
      .select('*')
      .eq('supplement_id', supplementId)
      .order('created_at', { ascending: false });

    if (!evidenceData || evidenceData.length === 0) {
      console.log(`No evidence found for supplement: ${supplementId}`);
      return;
    }

    // Calculate new integrated evidence score
    const newEvidenceScore = calculateIntegratedEvidenceScore(evidenceData);
    const currentScore = supplement.integrated_evidence_score || 0;

    // Check if evidence level should change
    const newEvidenceLevel = determineEvidenceLevel(newEvidenceScore, evidenceData);
    const currentEvidenceLevel = supplement.evidence_level || 'moderate';

    // Process evidence level change
    if (newEvidenceLevel !== currentEvidenceLevel) {
      await processEvidenceLevelChange(
        supabase,
        supplementId,
        currentEvidenceLevel,
        newEvidenceLevel,
        newEvidenceScore,
        evidenceData,
        autoApproveThreshold,
        results
      );
    }

    // Check for dosage updates based on new evidence
    await processDosageUpdates(
      supabase,
      supplementId,
      supplement,
      evidenceData,
      autoApproveThreshold,
      results
    );

    // Update supplement with new evidence score
    if (Math.abs(newEvidenceScore - currentScore) > 0.1) {
      await supabase
        .from('supplements')
        .update({
          integrated_evidence_score: newEvidenceScore,
          last_evidence_update: new Date().toISOString()
        })
        .eq('id', supplementId);

      console.log(`Updated evidence score for ${supplementId}: ${currentScore} -> ${newEvidenceScore}`);
    }

  } catch (error) {
    console.error(`Error processing supplement ${supplementId}:`, error);
  }
}

function calculateIntegratedEvidenceScore(evidenceData: any[]): number {
  if (!evidenceData || evidenceData.length === 0) return 0;

  let totalScore = 0;
  let weightedCount = 0;

  for (const evidence of evidenceData) {
    const qualityScore = evidence.quality_score || 50;
    const sampleSize = evidence.sample_size || 100;
    const source = evidence.database_source || 'unknown';

    // Weight by quality and sample size
    let weight = 1;
    if (qualityScore >= 80) weight *= 2;
    if (sampleSize >= 1000) weight *= 1.5;
    if (source === 'pubmed') weight *= 1.2;
    if (source === 'cochrane') weight *= 1.5;

    totalScore += (qualityScore / 100) * weight;
    weightedCount += weight;
  }

  return weightedCount > 0 ? (totalScore / weightedCount) * 100 : 0;
}

function determineEvidenceLevel(score: number, evidenceData: any[]): string {
  const highQualityStudies = evidenceData.filter(e => (e.quality_score || 0) >= 80).length;
  const totalStudies = evidenceData.length;
  const cochranReviews = evidenceData.filter(e => e.database_source === 'cochrane').length;

  if (score >= 80 && highQualityStudies >= 3 && cochranReviews >= 1) {
    return 'strong';
  } else if (score >= 60 && highQualityStudies >= 2) {
    return 'moderate';
  } else if (score >= 40 && totalStudies >= 3) {
    return 'limited';
  } else {
    return 'insufficient';
  }
}

async function processEvidenceLevelChange(
  supabase: any,
  supplementId: string,
  oldLevel: string,
  newLevel: string,
  confidenceScore: number,
  evidenceData: any[],
  autoApproveThreshold: number,
  results: any
) {
  try {
    const reasoning = generateEvidenceLevelReasoning(oldLevel, newLevel, evidenceData);
    const autoApprove = confidenceScore >= autoApproveThreshold * 100;

    // Create evidence classification record
    const { error: classError } = await supabase
      .from('evidence_classifications')
      .insert({
        supplement_id: supplementId,
        classification_type: 'evidence_level',
        old_classification: oldLevel,
        new_classification: newLevel,
        confidence_score: confidenceScore,
        reasoning: reasoning,
        supporting_studies: evidenceData.map(e => ({
          study_id: e.study_id,
          title: e.title,
          quality_score: e.quality_score,
          database_source: e.database_source
        })),
        auto_approved: autoApprove,
        requires_review: !autoApprove
      });

    if (classError) {
      console.error('Error creating evidence classification:', classError);
      return;
    }

    // Create evidence update record
    const { error: updateError } = await supabase
      .from('evidence_updates')
      .insert({
        supplement_id: supplementId,
        update_type: 'evidence_level_change',
        old_value: { evidence_level: oldLevel },
        new_value: { evidence_level: newLevel },
        confidence_score: confidenceScore,
        justification: reasoning,
        source_data: { evidence_count: evidenceData.length, high_quality_count: evidenceData.filter(e => (e.quality_score || 0) >= 80).length }
      });

    if (updateError) {
      console.error('Error creating evidence update:', updateError);
      return;
    }

    // Apply change if auto-approved
    if (autoApprove) {
      await supabase
        .from('supplements')
        .update({ evidence_level: newLevel })
        .eq('id', supplementId);

      await supabase
        .from('evidence_classifications')
        .update({ applied_at: new Date().toISOString() })
        .eq('supplement_id', supplementId)
        .eq('classification_type', 'evidence_level')
        .eq('new_classification', newLevel);

      results.auto_approved++;
      console.log(`Auto-approved evidence level change for ${supplementId}: ${oldLevel} -> ${newLevel}`);
    } else {
      results.requires_review++;
      console.log(`Evidence level change requires review for ${supplementId}: ${oldLevel} -> ${newLevel}`);
    }

    results.classification_changes++;

  } catch (error) {
    console.error('Error processing evidence level change:', error);
  }
}

async function processDosageUpdates(
  supabase: any,
  supplementId: string,
  supplement: any,
  evidenceData: any[],
  autoApproveThreshold: number,
  results: any
) {
  try {
    // Analyze evidence for dosage recommendations
    const dosageEvidence = evidenceData.filter(e => 
      e.intervention && e.intervention.toLowerCase().includes('mg')
    );

    if (dosageEvidence.length === 0) return;

    // Extract dosage information from studies
    const dosages = dosageEvidence.map(e => extractDosageFromStudy(e)).filter(d => d > 0);
    
    if (dosages.length === 0) return;

    // Calculate optimal dosage range
    const avgDosage = dosages.reduce((sum, d) => sum + d, 0) / dosages.length;
    const minDosage = Math.min(...dosages);
    const maxDosage = Math.max(...dosages);

    const currentMin = supplement.dosage_min || 0;
    const currentMax = supplement.dosage_max || 0;

    // Check if dosage should be updated
    const significantChange = Math.abs(avgDosage - (currentMin + currentMax) / 2) > (currentMax - currentMin) * 0.2;

    if (significantChange) {
      const reasoning = `Updated dosage based on ${dosages.length} studies. Average effective dose: ${avgDosage.toFixed(1)}mg (range: ${minDosage}-${maxDosage}mg)`;

      // Create evidence update
      await supabase
        .from('evidence_updates')
        .insert({
          supplement_id: supplementId,
          update_type: 'dosage_update',
          old_value: { dosage_min: currentMin, dosage_max: currentMax },
          new_value: { dosage_min: minDosage, dosage_max: maxDosage },
          confidence_score: Math.min(dosages.length * 20, 100),
          justification: reasoning,
          source_data: { studies_analyzed: dosages.length, dosage_range: dosages }
        });

      results.evidence_updates++;
      console.log(`Dosage update recorded for ${supplementId}: ${currentMin}-${currentMax}mg -> ${minDosage}-${maxDosage}mg`);
    }

  } catch (error) {
    console.error('Error processing dosage updates:', error);
  }
}

function generateEvidenceLevelReasoning(oldLevel: string, newLevel: string, evidenceData: any[]): string {
  const highQuality = evidenceData.filter(e => (e.quality_score || 0) >= 80).length;
  const totalStudies = evidenceData.length;
  const cochrane = evidenceData.filter(e => e.database_source === 'cochrane').length;
  const clinical = evidenceData.filter(e => e.study_type && e.study_type.toLowerCase().includes('clinical')).length;

  let reasoning = `Evidence level changed from ${oldLevel} to ${newLevel} based on analysis of ${totalStudies} studies. `;
  
  if (highQuality > 0) {
    reasoning += `${highQuality} high-quality studies (score ≥80) identified. `;
  }
  
  if (cochrane > 0) {
    reasoning += `${cochrane} Cochrane review(s) included. `;
  }
  
  if (clinical > 0) {
    reasoning += `${clinical} clinical trial(s) analyzed. `;
  }

  if (newLevel === 'strong') {
    reasoning += 'Strong evidence supported by multiple high-quality studies and systematic reviews.';
  } else if (newLevel === 'moderate') {
    reasoning += 'Moderate evidence from well-designed studies with consistent results.';
  } else if (newLevel === 'limited') {
    reasoning += 'Limited evidence available, results show promise but need more research.';
  } else {
    reasoning += 'Insufficient evidence to support efficacy claims.';
  }

  return reasoning;
}

function extractDosageFromStudy(evidence: any): number {
  try {
    const intervention = evidence.intervention || '';
    const dosageMatch = intervention.match(/(\d+)\s*mg/i);
    return dosageMatch ? parseInt(dosageMatch[1]) : 0;
  } catch (error) {
    return 0;
  }
}

async function updateMonitoringJob(jobType: string, updates: any) {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    await supabase
      .from('monitoring_jobs')
      .update(updates)
      .eq('job_type', jobType)
      .eq('status', 'running');
      
  } catch (error) {
    console.error('Error updating monitoring job:', error);
  }
}