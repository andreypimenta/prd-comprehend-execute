import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import { RecommendationEngine } from './recommendation-engine.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from auth token
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'GET') {
      // Buscar recomendações existentes
      const { data: recommendations, error } = await supabase
        .from('recommendations')
        .select(`
          *,
          supplements (*)
        `)
        .eq('user_id', user.id)
        .order('confidence', { ascending: false });

      if (error) {
        console.error('Error fetching recommendations:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch recommendations' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(JSON.stringify({
        recommendations: recommendations || [],
        hasRecommendations: (recommendations?.length || 0) > 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'POST') {
      // Buscar dados do perfil do usuário baseado no onboarding
      const { data: onboardingData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!onboardingData) {
        return new Response(
          JSON.stringify({ error: 'Profile not found. Please complete onboarding first.' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Buscar todos os suplementos disponíveis
      const { data: supplements, error: supplementsError } = await supabase
        .from('supplements')
        .select('*');

      if (supplementsError) {
        console.error('Error fetching supplements:', supplementsError);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch supplements database' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Criar perfil unificado
      const userProfile = {
        user_id: user.id,
        age: onboardingData.age,
        gender: onboardingData.gender,
        weight: onboardingData.weight,
        height: onboardingData.height,
        symptoms: onboardingData.symptoms || [],
        sleep_quality: onboardingData.sleep_quality,
        stress_level: onboardingData.stress_level,
        exercise_frequency: onboardingData.exercise_frequency,
        health_goals: onboardingData.health_goals || []
      };

      // Gerar recomendações usando o engine
      const engine = new RecommendationEngine(supplements);
      const recommendations = await engine.generateRecommendations(userProfile);

      // Deletar recomendações anteriores
      await supabase
        .from('recommendations')
        .delete()
        .eq('user_id', user.id);

      // Salvar novas recomendações no banco
      const { data: savedRecs, error: saveError } = await supabase
        .from('recommendations')
        .insert(
          recommendations.map(rec => ({
            user_id: user.id,
            supplement_id: rec.supplement_id,
            recommended_dosage: rec.recommended_dosage,
            confidence: rec.confidence,
            reasoning: rec.reasoning,
            priority: rec.priority
          }))
        )
        .select(`
          *,
          supplements (*)
        `);

      if (saveError) {
        console.error('Error saving recommendations:', saveError);
        return new Response(
          JSON.stringify({ error: 'Failed to save recommendations' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(JSON.stringify({
        success: true,
        recommendations: savedRecs,
        analysis_date: new Date(),
        total_recommendations: savedRecs?.length || 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});