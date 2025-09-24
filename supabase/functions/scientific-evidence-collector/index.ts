import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScientificEvidence {
  supplement_id: string;
  database_source: string;
  study_id: string;
  title?: string;
  authors?: string[];
  publication_date?: string;
  study_type?: string;
  sample_size?: number;
  intervention?: string;
  outcome_measures?: string[];
  results_summary?: string;
  quality_score?: number;
  doi?: string;
  pmid?: string;
  raw_data?: Record<string, any>;
}

interface EvidenceScore {
  pubmed_score: number;
  clinical_trials_score: number;
  cochrane_score: number;
  pharmgkb_score: number;
  integrated_score: number;
  classification: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { supplement_name, supplement_id, conditions = [] } = await req.json();

    console.log(`Collecting evidence for supplement: ${supplement_name}`);

    // Collect evidence from all 4 databases
    const evidenceData: ScientificEvidence[] = [];
    
    // 1. PubMed Search
    const pubmedEvidence = await searchPubMed(supplement_name, conditions);
    evidenceData.push(...pubmedEvidence.map((e: any) => ({ ...e, supplement_id, database_source: 'pubmed', study_id: e.study_id || 'unknown' })));

    // 2. ClinicalTrials.gov Search
    const clinicalTrialsEvidence = await searchClinicalTrials(supplement_name, conditions);
    evidenceData.push(...clinicalTrialsEvidence.map((e: any) => ({ ...e, supplement_id, database_source: 'clinicaltrials', study_id: e.study_id || 'unknown' })));

    // 3. Cochrane Search
    const cochraneEvidence = await searchCochrane(supplement_name, conditions);
    evidenceData.push(...cochraneEvidence.map((e: any) => ({ ...e, supplement_id, database_source: 'cochrane', study_id: e.study_id || 'unknown' })));

    // 4. PharmGKB Search
    const pharmgkbEvidence = await searchPharmGKB(supplement_name);
    evidenceData.push(...pharmgkbEvidence.map((e: any) => ({ ...e, supplement_id, database_source: 'pharmgkb', study_id: e.study_id || 'unknown' })));

    // Calculate integrated evidence score
    const evidenceScore = calculateIntegratedScore(evidenceData);

    // Store evidence in database
    if (evidenceData.length > 0) {
      const { error: insertError } = await supabase
        .from('scientific_evidence')
        .upsert(evidenceData, { onConflict: 'supplement_id,database_source,study_id' });

      if (insertError) {
        console.error('Error inserting evidence:', insertError);
      }
    }

    // Update supplement with aggregated data
    const { error: updateError } = await supabase
      .from('supplements')
      .update({
        pubmed_studies: evidenceData.filter(e => e.database_source === 'pubmed').map(e => e.raw_data),
        clinical_trials: evidenceData.filter(e => e.database_source === 'clinicaltrials').map(e => e.raw_data),
        cochrane_reviews: evidenceData.filter(e => e.database_source === 'cochrane').map(e => e.raw_data),
        pharmgkb_data: evidenceData.filter(e => e.database_source === 'pharmgkb')[0]?.raw_data || {},
        integrated_evidence_score: evidenceScore.integrated_score,
        evidence_classification: evidenceScore.classification,
        last_evidence_update: new Date().toISOString()
      })
      .eq('id', supplement_id);

    if (updateError) {
      console.error('Error updating supplement:', updateError);
    }

    return new Response(JSON.stringify({
      success: true,
      evidence_count: evidenceData.length,
      evidence_score: evidenceScore,
      databases_searched: 4
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in scientific-evidence-collector:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function searchPubMed(supplementName: string, conditions: string[]): Promise<Partial<ScientificEvidence>[]> {
  try {
    const searchTerms = [supplementName, ...conditions].join(' AND ');
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchTerms)}&retmode=json&retmax=20&sort=relevance`;
    
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    if (!searchData.esearchresult?.idlist?.length) {
      return [];
    }

    const pmids = searchData.esearchresult.idlist.slice(0, 10); // Limit to 10 studies
    const detailsUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmids.join(',')}&retmode=xml`;
    
    const detailsResponse = await fetch(detailsUrl);
    const xmlText = await detailsResponse.text();
    
    // Simple XML parsing for key data
    const studies = extractPubMedData(xmlText, pmids);
    
    return studies;
  } catch (error) {
    console.error('PubMed search error:', error);
    return [];
  }
}

async function searchClinicalTrials(supplementName: string, conditions: string[]): Promise<Partial<ScientificEvidence>[]> {
  try {
    const searchTerms = [supplementName, ...conditions].join(' AND ');
    const apiUrl = `https://clinicaltrials.gov/api/query/study_fields?expr=${encodeURIComponent(searchTerms)}&fields=NCTId,BriefTitle,Phase,StudyType,Condition,InterventionName,PrimaryOutcomeMeasure,EnrollmentCount,StudyFirstPostDate&min_rnk=1&max_rnk=20&fmt=json`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (!data.StudyFieldsResponse?.StudyFields) {
      return [];
    }

    return data.StudyFieldsResponse.StudyFields.map((study: any) => ({
      study_id: study.NCTId?.[0] || '',
      title: study.BriefTitle?.[0] || '',
      study_type: 'clinical_trial',
      intervention: study.InterventionName?.join(', ') || '',
      outcome_measures: study.PrimaryOutcomeMeasure || [],
      sample_size: parseInt(study.EnrollmentCount?.[0]) || 0,
      publication_date: study.StudyFirstPostDate?.[0] || '',
      quality_score: calculateClinicalTrialQuality(study),
      raw_data: study
    }));
  } catch (error) {
    console.error('ClinicalTrials.gov search error:', error);
    return [];
  }
}

async function searchCochrane(supplementName: string, conditions: string[]): Promise<Partial<ScientificEvidence>[]> {
  try {
    // Use Cochrane Library search API or fallback to available datasets
    const searchTerms = [supplementName, ...conditions].join(' ');
    
    // Try Cochrane Library API first
    const cochraneUrl = `https://www.cochranelibrary.com/api/search?q=${encodeURIComponent(searchTerms)}&limit=10`;
    
    try {
      const response = await fetch(cochraneUrl, {
        headers: { 'User-Agent': 'Scientific Evidence Collector 1.0' }
      });
      
      if (response.ok) {
        const data = await response.json();
        return processCochraneData(data);
      }
    } catch (apiError) {
      console.log('Cochrane API not accessible, using alternative approach');
    }

    // Fallback: Search for open access Cochrane reviews
    return await searchOpenCochraneReviews(supplementName, conditions);
    
  } catch (error) {
    console.error('Cochrane search error:', error);
    return [];
  }
}

async function searchPharmGKB(supplementName: string): Promise<Partial<ScientificEvidence>[]> {
  try {
    // PharmGKB API for pharmacogenomics data
    const apiUrl = `https://api.pharmgkb.org/v2/data/drug?name=${encodeURIComponent(supplementName)}`;
    
    const response = await fetch(apiUrl, {
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    
    return [{
      study_id: `pharmgkb_${supplementName.toLowerCase().replace(/\s+/g, '_')}`,
      title: `PharmGKB Data for ${supplementName}`,
      study_type: 'pharmacogenomics',
      results_summary: data.summary || 'Pharmacogenomic interactions data',
      quality_score: 0.8, // PharmGKB is high quality
      raw_data: data
    }];
    
  } catch (error) {
    console.error('PharmGKB search error:', error);
    return [];
  }
}

function extractPubMedData(xmlText: string, pmids: string[]): Partial<ScientificEvidence>[] {
  // Simple XML parsing - in production, use a proper XML parser
  const studies: Partial<ScientificEvidence>[] = [];
  
  pmids.forEach(pmid => {
    const titleMatch = xmlText.match(new RegExp(`<ArticleTitle>(.*?)</ArticleTitle>`, 's'));
    const abstractMatch = xmlText.match(new RegExp(`<AbstractText>(.*?)</AbstractText>`, 's'));
    const dateMatch = xmlText.match(new RegExp(`<PubDate>.*?<Year>(\\d{4})</Year>`, 's'));
    
    if (titleMatch) {
      studies.push({
        study_id: pmid,
        pmid: pmid,
        title: titleMatch[1].replace(/<[^>]*>/g, ''),
        study_type: 'research_article',
        results_summary: abstractMatch ? abstractMatch[1].replace(/<[^>]*>/g, '').substring(0, 500) : '',
        publication_date: dateMatch ? `${dateMatch[1]}-01-01` : '',
        quality_score: 0.7, // Default quality score for PubMed articles
        raw_data: { pmid, xml_excerpt: xmlText.substring(0, 1000) }
      });
    }
  });
  
  return studies;
}

function processCochraneData(data: any): Partial<ScientificEvidence>[] {
  if (!data.results) return [];
  
  return data.results.slice(0, 5).map((review: any) => ({
    study_id: review.id || review.doi || 'cochrane_' + Date.now(),
    title: review.title,
    study_type: 'systematic_review',
    authors: review.authors || [],
    publication_date: review.publishedDate,
    results_summary: review.abstract || review.summary || '',
    quality_score: 0.9, // Cochrane reviews are high quality
    doi: review.doi,
    raw_data: review
  }));
}

async function searchOpenCochraneReviews(supplementName: string, conditions: string[]): Promise<Partial<ScientificEvidence>[]> {
  // Alternative approach using PubMed to find Cochrane reviews
  try {
    const searchTerms = `${supplementName} AND "Cochrane Database Syst Rev"`;
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchTerms)}&retmode=json&retmax=5`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data.esearchresult?.idlist?.length) {
      return data.esearchresult.idlist.map((pmid: string) => ({
        study_id: `cochrane_pmid_${pmid}`,
        pmid: pmid,
        title: `Cochrane Review (PMID: ${pmid})`,
        study_type: 'systematic_review',
        quality_score: 0.9,
        raw_data: { pmid, source: 'cochrane_via_pubmed' }
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Open Cochrane search error:', error);
    return [];
  }
}

function calculateClinicalTrialQuality(study: any): number {
  let score = 0.5; // Base score
  
  // Phase scoring
  if (study.Phase?.includes('Phase 3')) score += 0.3;
  else if (study.Phase?.includes('Phase 2')) score += 0.2;
  else if (study.Phase?.includes('Phase 1')) score += 0.1;
  
  // Sample size scoring
  const enrollment = parseInt(study.EnrollmentCount?.[0]) || 0;
  if (enrollment > 500) score += 0.2;
  else if (enrollment > 100) score += 0.1;
  
  return Math.min(score, 1.0);
}

function calculateIntegratedScore(evidenceData: ScientificEvidence[]): EvidenceScore {
  const pubmedStudies = evidenceData.filter(e => e.database_source === 'pubmed');
  const clinicalTrials = evidenceData.filter(e => e.database_source === 'clinicaltrials');
  const cochraneReviews = evidenceData.filter(e => e.database_source === 'cochrane');
  const pharmgkbData = evidenceData.filter(e => e.database_source === 'pharmgkb');

  // Calculate individual scores (0-1 scale)
  const pubmed_score = Math.min(pubmedStudies.length * 0.1 + 
    pubmedStudies.reduce((sum, s) => sum + (s.quality_score || 0), 0) / Math.max(pubmedStudies.length, 1), 1);
  
  const clinical_trials_score = Math.min(clinicalTrials.length * 0.2 + 
    clinicalTrials.reduce((sum, s) => sum + (s.quality_score || 0), 0) / Math.max(clinicalTrials.length, 1), 1);
  
  const cochrane_score = Math.min(cochraneReviews.length * 0.3 + 
    cochraneReviews.reduce((sum, s) => sum + (s.quality_score || 0), 0) / Math.max(cochraneReviews.length, 1), 1);
  
  const pharmgkb_score = pharmgkbData.length > 0 ? 0.8 : 0;

  // Weighted integrated score
  const integrated_score = (
    pubmed_score * 0.25 +
    clinical_trials_score * 0.35 +
    cochrane_score * 0.30 +
    pharmgkb_score * 0.10
  );

  // Classification based on integrated score
  let classification = 'D';
  if (integrated_score >= 0.9) classification = 'A+';
  else if (integrated_score >= 0.8) classification = 'A';
  else if (integrated_score >= 0.7) classification = 'B+';
  else if (integrated_score >= 0.6) classification = 'B';
  else if (integrated_score >= 0.4) classification = 'C';

  return {
    pubmed_score,
    clinical_trials_score,
    cochrane_score,
    pharmgkb_score,
    integrated_score,
    classification
  };
}