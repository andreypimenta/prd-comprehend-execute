import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import {
  mapPriorityFromEvidence,
  categorizeByCondition,
  getSequentialRecommendation,
  generateSynergyDescription,
  generateInitialPhase,
  generateTitrationPhase,
  generateAdjustmentPhase,
  generateMaintenancePhase,
  generateLabParameters,
  generateClinicalParameters,
  generateSpecificMarkers,
  generateAgeFactors,
  generateGeneticFactors,
  generateComorbidityFactors,
  generateDrugInteractions,
  generateLifestyleFactors,
  generateSeverityFactors
} from './protocol-helpers.ts';

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

function extractTherapeuticProtocols(matrixData: MatrixData): any[] {
  const protocols: any[] = [];
  
  Object.keys(matrixData).forEach(condition => {
    const conditionData = matrixData[condition];
    if (conditionData && conditionData.suplementos && conditionData.suplementos.length > 0) {
      // Sort supplements by evidence priority
      const sortedSupplements = conditionData.suplementos.sort((a: SupplementInMatrix, b: SupplementInMatrix) => {
        const evidenceOrder = { 'A': 3, 'B': 2, 'D': 1 };
        return (evidenceOrder[b.evidencia as keyof typeof evidenceOrder] || 1) - 
               (evidenceOrder[a.evidencia as keyof typeof evidenceOrder] || 1);
      });
      
      // Filter supplements with evidence level A or B for efficacy calculation
      const qualitySupplements = sortedSupplements.filter(
        (supplement: SupplementInMatrix) => supplement.evidencia === 'A' || supplement.evidencia === 'B'
      );
      
      // Enhanced supplement combination with priority mapping
      const enhancedCombination = sortedSupplements.map((supplement: SupplementInMatrix) => ({
        nome: supplement.nome,
        agente: supplement.agente,
        evidencia: supplement.evidencia,
        mecanismo: supplement.mecanismo,
        prioridade: mapPriorityFromEvidence(supplement.evidencia || 'D'),
        categoria_clinica: categorizeByCondition(condition),
        recomendacao_sequencial: getSequentialRecommendation(supplement.evidencia || 'D')
      }));
      
      const protocol = {
        condition: condition,
        supplement_combination: enhancedCombination,
        synergy_description: generateSynergyDescription(sortedSupplements, condition),
        expected_efficacy: calculateExpectedEfficacy(qualitySupplements),
        implementation_phases: {
          fase_inicial: generateInitialPhase(sortedSupplements),
          titulacao: generateTitrationPhase(sortedSupplements),
          avaliacao_resposta: `Avaliar resposta clínica em 4-6 semanas para ${condition}`,
          ajustes: generateAdjustmentPhase(condition),
          descontinuacao: "Descontinuar se não houver melhoria em 12 semanas ou se surgirem efeitos adversos",
          manutencao: generateMaintenancePhase(qualitySupplements)
        },
        monitoring_parameters: {
          baseline: `Avaliação inicial completa para ${condition}`,
          seguimento_inicial: "Monitoramento semanal nas primeiras 4 semanas",
          seguimento_regular: "Avaliação mensal após estabilização",
          parametros_laboratoriais: generateLabParameters(condition),
          parametros_clinicos: generateClinicalParameters(condition),
          marcadores_especificos: generateSpecificMarkers(condition)
        },
        individualization_factors: {
          fatores_idade: generateAgeFactors(condition),
          fatores_geneticos: generateGeneticFactors(sortedSupplements),
          comorbidades: generateComorbidityFactors(condition),
          medicamentos: generateDrugInteractions(sortedSupplements),
          estilo_vida: generateLifestyleFactors(condition),
          severidade_condicao: generateSeverityFactors(condition)
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      protocols.push(protocol);
    }
  });
  
  return protocols;
}

function calculateExpectedEfficacy(supplements: SupplementInMatrix[]): string {
  const evidenceACount = supplements.filter(s => s.evidencia === 'A').length;
  const evidenceBCount = supplements.filter(s => s.evidencia === 'B').length;
  const totalSupplements = supplements.length;
  
  if (evidenceACount >= 3) {
    return `Eficácia muito alta esperada - ${evidenceACount} suplementos com evidência A (forte) em protocolo sinérgico`;
  } else if (evidenceACount >= 1 && evidenceBCount >= 2) {
    return `Eficácia alta esperada - Combinação de ${evidenceACount} evidência A e ${evidenceBCount} evidência B`;
  } else if (evidenceBCount >= 2) {
    return `Eficácia moderada a alta - ${evidenceBCount} suplementos com evidência B (moderada)`;
  } else if (evidenceACount >= 1) {
    return `Eficácia moderada - ${evidenceACount} suplemento com evidência forte e suporte adicional`;
  } else {
    return `Eficácia moderada - Protocolo baseado em evidências disponíveis (${totalSupplements} suplementos)`;
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
        .upsert(chunk, { onConflict: 'id' });

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