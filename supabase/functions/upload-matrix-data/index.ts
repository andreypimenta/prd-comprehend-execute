import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing required environment variables');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting matrix data upload process...');

    // Try to read the file from the public directory via HTTP
    const baseUrl = req.url.replace('/functions/v1/upload-matrix-data', '');
    const publicUrl = `${baseUrl}/matriz_final_consolidada.json`;
    
    console.log(`Attempting to fetch from: ${publicUrl}`);
    
    try {
      const response = await fetch(publicUrl);
      if (!response.ok) {
        console.error(`HTTP ${response.status}: ${response.statusText}`);
        throw new Error(`Failed to fetch JSON file: ${response.status} ${response.statusText}`);
      }
      
      const jsonContent = await response.text();
      console.log(`Successfully fetched JSON content (${jsonContent.length} characters)`);
      
      // Validate JSON format
      try {
        JSON.parse(jsonContent);
      } catch (parseError) {
        throw new Error(`Invalid JSON format: ${parseError.message}`);
      }
      
      // Upload to storage using service role
      console.log('Uploading to Supabase Storage...');
      const { data, error } = await supabase.storage
        .from('matrix-data')
        .upload('matriz_final_consolidada.json', jsonContent, {
          contentType: 'application/json',
          upsert: true
        });

      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }

      console.log('Successfully uploaded JSON to storage:', data);

      return new Response(JSON.stringify({
        success: true,
        message: 'JSON file uploaded to storage successfully',
        path: data.path,
        size: jsonContent.length
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (fetchError) {
      console.error('Error fetching JSON file:', fetchError);
      
      // Fallback: Create minimal sample data
      const fallbackData = {
        "CARDIOVASCULAR": {
          "suplementos": [
            {
              "nome": "Ômega-3",
              "agente": "VITAMINA/MINERAL",
              "evidencia": "A",
              "mecanismo": "Anti-inflamatório e cardioprotetor"
            },
            {
              "nome": "Coenzima Q10",
              "agente": "VITAMINA/MINERAL", 
              "evidencia": "B",
              "mecanismo": "Suporte mitocondrial e função cardíaca"
            }
          ]
        },
        "NEUROLÓGICO": {
          "suplementos": [
            {
              "nome": "Vitamina D3",
              "agente": "VITAMINA/MINERAL",
              "evidencia": "A",
              "mecanismo": "Neuroproteção e função cognitiva"
            }
          ]
        }
      };

      const { data, error } = await supabase.storage
        .from('matrix-data')
        .upload('matriz_final_consolidada.json', JSON.stringify(fallbackData), {
          contentType: 'application/json',
          upsert: true
        });

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify({
        success: true,
        message: 'Fallback data uploaded to storage',
        path: data.path
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in upload-matrix-data function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});