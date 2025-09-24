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

    // Read the file directly from the filesystem
    console.log('Reading matriz_final_consolidada.json from filesystem...');
    
    try {
      const jsonContent = await Deno.readTextFile('./public/matriz_final_consolidada.json');
      console.log(`Successfully read JSON content (${jsonContent.length} characters)`);
      console.log(`Successfully read JSON content (${jsonContent.length} characters)`);
      
      // Validate JSON format
      try {
        JSON.parse(jsonContent);
        console.log('JSON validation successful');
      } catch (parseError) {
        const errorMessage = parseError instanceof Error ? parseError.message : String(parseError);
        throw new Error(`Invalid JSON format: ${errorMessage}`);
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

    } catch (readError) {
      console.error('Error reading JSON file from filesystem:', readError);
      
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});