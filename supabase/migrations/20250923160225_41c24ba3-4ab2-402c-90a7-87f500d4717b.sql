-- Extend supplements table with advanced quantitative data
ALTER TABLE supplements ADD COLUMN IF NOT EXISTS pk_parameters JSONB DEFAULT '{}'::jsonb;
ALTER TABLE supplements ADD COLUMN IF NOT EXISTS ml_features JSONB DEFAULT '{}'::jsonb;
ALTER TABLE supplements ADD COLUMN IF NOT EXISTS monte_carlo_data JSONB DEFAULT '{}'::jsonb;
ALTER TABLE supplements ADD COLUMN IF NOT EXISTS population_variability JSONB DEFAULT '{}'::jsonb;

-- Create quantitative_analysis table for storing analysis results
CREATE TABLE IF NOT EXISTS quantitative_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    supplement_ids TEXT[] NOT NULL,
    analysis_type TEXT NOT NULL CHECK (analysis_type IN ('pbpk', 'monte_carlo', 'synergy_ml', 'optimization')),
    input_parameters JSONB NOT NULL DEFAULT '{}'::jsonb,
    results JSONB NOT NULL DEFAULT '{}'::jsonb,
    confidence_interval JSONB DEFAULT '{}'::jsonb,
    statistical_significance NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create synergy_predictions table for ML predictions
CREATE TABLE IF NOT EXISTS synergy_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    supplement_pair TEXT[] NOT NULL,
    synergy_score NUMERIC NOT NULL DEFAULT 0,
    confidence_level NUMERIC NOT NULL DEFAULT 0,
    mechanism_description TEXT,
    ml_model_version TEXT DEFAULT 'v1.0',
    predicted_efficacy_boost NUMERIC DEFAULT 0,
    safety_assessment JSONB DEFAULT '{}'::jsonb,
    scientific_evidence JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create protocol_optimizations table for optimization results
CREATE TABLE IF NOT EXISTS protocol_optimizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    protocol_id UUID,
    supplement_combination JSONB NOT NULL,
    optimization_objective TEXT NOT NULL DEFAULT 'efficacy',
    optimized_dosages JSONB NOT NULL,
    predicted_outcomes JSONB DEFAULT '{}'::jsonb,
    cost_benefit_analysis JSONB DEFAULT '{}'::jsonb,
    safety_constraints JSONB DEFAULT '{}'::jsonb,
    confidence_score NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE quantitative_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE synergy_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocol_optimizations ENABLE ROW LEVEL SECURITY;

-- RLS policies for quantitative_analysis
CREATE POLICY "Users can view their own quantitative analyses"
ON quantitative_analysis FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quantitative analyses"
ON quantitative_analysis FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quantitative analyses"
ON quantitative_analysis FOR UPDATE
USING (auth.uid() = user_id);

-- RLS policies for synergy_predictions (public read for scientific data)
CREATE POLICY "Synergy predictions are publicly viewable"
ON synergy_predictions FOR SELECT
USING (true);

-- RLS policies for protocol_optimizations
CREATE POLICY "Users can view their own protocol optimizations"
ON protocol_optimizations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own protocol optimizations"
ON protocol_optimizations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own protocol optimizations"
ON protocol_optimizations FOR UPDATE
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_quantitative_analysis_user_id ON quantitative_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_quantitative_analysis_type ON quantitative_analysis(analysis_type);
CREATE INDEX IF NOT EXISTS idx_synergy_predictions_pair ON synergy_predictions USING GIN(supplement_pair);
CREATE INDEX IF NOT EXISTS idx_protocol_optimizations_user_id ON protocol_optimizations(user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_quantitative_analysis_updated_at
    BEFORE UPDATE ON quantitative_analysis
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_synergy_predictions_updated_at
    BEFORE UPDATE ON synergy_predictions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_protocol_optimizations_updated_at
    BEFORE UPDATE ON protocol_optimizations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();