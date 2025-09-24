import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SupplementInMatrix {
  nome: string;
  agente: string;
  evidencia: 'A' | 'B' | 'D';
  mecanismo: string;
}

interface MatrixData {
  [condition: string]: {
    suplementos: SupplementInMatrix[];
    fases_implementacao?: any;
    parametros_monitoramento?: any;
    fatores_individualizacao?: any;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting protocols import...');

    // Load matrix data from storage
    const matrixData = await loadMatrixDataFromStorage(supabase);
    
    // Extract therapeutic protocols
    const protocols = extractTherapeuticProtocols(matrixData);
    console.log(`Found ${protocols.length} therapeutic protocols to import`);

    // Import protocols in chunks
    const { imported, skipped } = await importProtocolsInChunks(supabase, protocols);

    console.log(`Import completed: ${imported} imported, ${skipped} skipped`);

    return new Response(JSON.stringify({
      success: true,
      imported,
      skipped,
      total: protocols.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in import-protocols function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function loadMatrixDataFromStorage(supabase: any): Promise<MatrixData> {
  try {
    // Try to download from storage first
    const { data, error } = await supabase.storage
      .from('matrix-data')
      .download('matriz_final_consolidada.json');

    if (data) {
      const text = await data.text();
      return JSON.parse(text);
    }

    console.log('File not found in storage, using fallback data');
    
    // Fallback data if storage fails
    return {
      "example_condition": {
        "suplementos": [
          {
            "nome": "Vitamina D3",
            "agente": "VITAMINA/MINERAL",
            "evidencia": "A" as const,
            "mecanismo": "Regulação da homeostase do cálcio e função imune"
          }
        ]
      }
    };
  } catch (error) {
    console.error('Error loading matrix data:', error);
    throw new Error('Failed to load matrix data');
  }
}

function extractTherapeuticProtocols(matrixData: MatrixData) {
  const protocols: any[] = [];
  
  Object.entries(matrixData).forEach(([condition, data]) => {
    if (data.suplementos && Array.isArray(data.suplementos) && data.suplementos.length > 0) {
      // Filter high-priority supplements for this condition
      const highPrioritySupplements = data.suplementos.filter(s => 
        s && s.evidencia && ['A', 'B'].includes(s.evidencia)
      );
      
      if (highPrioritySupplements.length > 0) {
        const protocol = {
          condition: condition,
          supplement_combination: highPrioritySupplements.map(s => ({
            nome: s.nome,
            agente: s.agente,
            evidencia: s.evidencia,
            mecanismo: s.mecanismo
          })),
          synergy_description: `Protocolo terapêutico otimizado para ${condition}`,
          expected_efficacy: calculateExpectedEfficacy(highPrioritySupplements),
          implementation_phases: data.fases_implementacao || {
            fase_inicial: "Início gradual com doses baixas",
            titulacao: "Ajuste conforme resposta individual",
            avaliacao_resposta: "Monitoramento após 4-6 semanas"
          },
          monitoring_parameters: data.parametros_monitoramento || {
            baseline: "Avaliação inicial dos sintomas",
            seguimento_inicial: "Acompanhamento semanal",
            seguimento_regular: "Avaliação mensal"
          },
          individualization_factors: data.fatores_individualizacao || {
            fatores_idade: "Ajuste para diferentes faixas etárias",
            fatores_geneticos: "Considerações farmacogenômicas",
            comorbidades: "Adaptação para condições associadas"
          }
        };
        
        protocols.push(protocol);
      }
    }
  });
  
  console.log(`Extracted ${protocols.length} therapeutic protocols`);
  return protocols;
}

function calculateExpectedEfficacy(supplements: SupplementInMatrix[]): string {
  const evidenceACount = supplements.filter(s => s.evidencia === 'A').length;
  const evidenceBCount = supplements.filter(s => s.evidencia === 'B').length;
  
  if (evidenceACount > evidenceBCount) {
    return 'Alta eficácia esperada baseada em evidências robustas';
  } else if (evidenceBCount > 0) {
    return 'Eficácia moderada a alta baseada em evidências consolidadas';
  } else {
    return 'Eficácia moderada baseada em evidências disponíveis';
  }
}

async function importProtocolsInChunks(supabase: any, protocols: any[]) {
  const CHUNK_SIZE = 10;
  let imported = 0;
  let skipped = 0;

  for (let i = 0; i < protocols.length; i += CHUNK_SIZE) {
    const chunk = protocols.slice(i, i + CHUNK_SIZE);
    console.log(`Processing chunk ${Math.floor(i/CHUNK_SIZE) + 1}/${Math.ceil(protocols.length/CHUNK_SIZE)}`);
    
    try {
      const { data, error } = await supabase
        .from('therapeutic_protocols')
        .upsert(chunk, { onConflict: 'condition' });

      if (error) {
        console.error('Error importing protocols chunk:', error);
        skipped += chunk.length;
      } else {
        imported += chunk.length;
        console.log(`Successfully imported chunk of ${chunk.length} protocols`);
      }
    } catch (chunkError) {
      console.error('Protocol chunk processing error:', chunkError);
      skipped += chunk.length;
    }

    // Small delay to prevent overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 150));
  }

  return { imported, skipped };
}