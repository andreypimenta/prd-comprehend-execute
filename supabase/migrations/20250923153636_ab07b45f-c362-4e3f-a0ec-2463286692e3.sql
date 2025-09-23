-- Add scientific evidence fields to supplements table
ALTER TABLE public.supplements ADD COLUMN IF NOT EXISTS pubmed_studies JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.supplements ADD COLUMN IF NOT EXISTS clinical_trials JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.supplements ADD COLUMN IF NOT EXISTS cochrane_reviews JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.supplements ADD COLUMN IF NOT EXISTS pharmgkb_data JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.supplements ADD COLUMN IF NOT EXISTS integrated_evidence_score NUMERIC DEFAULT 0;
ALTER TABLE public.supplements ADD COLUMN IF NOT EXISTS evidence_classification TEXT DEFAULT 'D';
ALTER TABLE public.supplements ADD COLUMN IF NOT EXISTS last_evidence_update TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create scientific evidence table for detailed tracking
CREATE TABLE IF NOT EXISTS public.scientific_evidence (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplement_id TEXT NOT NULL,
  database_source TEXT NOT NULL, -- 'pubmed', 'clinicaltrials', 'cochrane', 'pharmgkb'
  study_id TEXT NOT NULL,
  title TEXT,
  authors TEXT[],
  publication_date DATE,
  study_type TEXT, -- 'rct', 'systematic_review', 'meta_analysis', 'observational'
  sample_size INTEGER,
  intervention TEXT,
  outcome_measures TEXT[],
  results_summary TEXT,
  quality_score NUMERIC,
  doi TEXT,
  pmid TEXT,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for scientific evidence
ALTER TABLE public.scientific_evidence ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to scientific evidence
CREATE POLICY "Scientific evidence is publicly viewable" 
ON public.scientific_evidence 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scientific_evidence_supplement_id ON public.scientific_evidence(supplement_id);
CREATE INDEX IF NOT EXISTS idx_scientific_evidence_database_source ON public.scientific_evidence(database_source);
CREATE INDEX IF NOT EXISTS idx_scientific_evidence_study_type ON public.scientific_evidence(study_type);
CREATE INDEX IF NOT EXISTS idx_scientific_evidence_quality_score ON public.scientific_evidence(quality_score DESC);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_scientific_evidence_updated_at
BEFORE UPDATE ON public.scientific_evidence
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();