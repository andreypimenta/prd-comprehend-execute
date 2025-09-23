-- Add bioavailability fields to supplements table
ALTER TABLE public.supplements 
ADD COLUMN pharmaceutical_forms JSONB DEFAULT '[]'::jsonb,
ADD COLUMN bioavailability_score NUMERIC DEFAULT 0,
ADD COLUMN optimal_form TEXT,
ADD COLUMN cost_benefit_form TEXT,
ADD COLUMN absorption_enhancers JSONB DEFAULT '[]'::jsonb,
ADD COLUMN absorption_inhibitors JSONB DEFAULT '[]'::jsonb,
ADD COLUMN circadian_timing JSONB DEFAULT '{}'::jsonb,
ADD COLUMN food_interactions JSONB DEFAULT '{}'::jsonb;

-- Create bioavailability_data table for detailed analysis
CREATE TABLE public.bioavailability_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplement_id TEXT NOT NULL,
  pharmaceutical_form TEXT NOT NULL,
  bioavailability_factor NUMERIC NOT NULL DEFAULT 1.0,
  absorption_rate NUMERIC NOT NULL DEFAULT 50.0,
  peak_time_hours NUMERIC,
  duration_hours NUMERIC,
  cost_multiplier NUMERIC DEFAULT 1.0,
  clinical_evidence TEXT,
  mechanism_description TEXT,
  optimal_conditions JSONB DEFAULT '{}'::jsonb,
  contraindications JSONB DEFAULT '[]'::jsonb,
  synergistic_compounds JSONB DEFAULT '[]'::jsonb,
  inhibitory_compounds JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on bioavailability_data
ALTER TABLE public.bioavailability_data ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing of bioavailability data
CREATE POLICY "Bioavailability data is publicly viewable" 
ON public.bioavailability_data 
FOR SELECT 
USING (true);

-- Create indexes for performance
CREATE INDEX idx_bioavailability_supplement_id ON public.bioavailability_data(supplement_id);
CREATE INDEX idx_bioavailability_form ON public.bioavailability_data(pharmaceutical_form);
CREATE INDEX idx_bioavailability_score ON public.bioavailability_data(bioavailability_factor);

-- Add trigger for updated_at
CREATE TRIGGER update_bioavailability_data_updated_at
BEFORE UPDATE ON public.bioavailability_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();