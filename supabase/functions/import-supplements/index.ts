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
    ranking_consolidado: {
      prioridade_muito_alta: SupplementInMatrix[];
      prioridade_alta: SupplementInMatrix[];
      prioridade_media: SupplementInMatrix[];
      prioridade_baixa: SupplementInMatrix[];
    };
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

    console.log('Starting supplements import...');

    // Load matrix data from storage
    const matrixData = await loadMatrixDataFromStorage(supabase);
    
    // Extract unique supplements with conditions
    const uniqueSupplements = extractUniqueSupplements(matrixData);
    console.log(`Found ${uniqueSupplements.size} unique supplements to import`);

    // Import supplements in chunks
    const { imported, skipped } = await importSupplementsInChunks(supabase, uniqueSupplements);

    console.log(`Import completed: ${imported} imported, ${skipped} skipped`);

    return new Response(JSON.stringify({
      success: true,
      imported,
      skipped,
      total: uniqueSupplements.size
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in import-supplements function:', error);
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
      const matrixData = JSON.parse(text);
      console.log(`Loaded matrix data with ${Object.keys(matrixData).length} conditions`);
      return matrixData;
    }

    console.log('File not found in storage, using fallback data');
    
    // Fallback data if storage fails
    return {
      "example_condition": {
        "ranking_consolidado": {
          "prioridade_muito_alta": [
            {
              "nome": "Vitamina D3",
              "agente": "VITAMINA/MINERAL",
              "evidencia": "A" as const,
              "mecanismo": "Regulação da homeostase do cálcio e função imune"
            }
          ],
          "prioridade_alta": [],
          "prioridade_media": [],
          "prioridade_baixa": []
        }
      }
    };
  } catch (error) {
    console.error('Error loading matrix data:', error);
    throw new Error('Failed to load matrix data');
  }
}

function extractUniqueSupplements(matrixData: MatrixData): Map<string, { supplement: SupplementInMatrix, conditions: string[] }> {
  const supplementMap = new Map<string, { supplement: SupplementInMatrix, conditions: string[] }>();
  
  console.log('Processing conditions:', Object.keys(matrixData));
  
  Object.entries(matrixData).forEach(([condition, data]) => {
    console.log(`Processing condition: ${condition}`, data);
    
    if (data && data.ranking_consolidado) {
      // Process all priority levels including prioridade_baixa
      const allSupplements = [
        ...(data.ranking_consolidado.prioridade_muito_alta || []),
        ...(data.ranking_consolidado.prioridade_alta || []),
        ...(data.ranking_consolidado.prioridade_media || []),
        ...(data.ranking_consolidado.prioridade_baixa || [])
      ];
      
      console.log(`Found ${allSupplements.length} supplements for condition ${condition}`);
      
      allSupplements.forEach((supplement, index) => {
        if (supplement && supplement.nome && typeof supplement.nome === 'string') {
          const key = supplement.nome.toLowerCase().trim();
          if (!supplementMap.has(key)) {
            supplementMap.set(key, { supplement, conditions: [condition] });
            console.log(`Added new supplement: ${supplement.nome}`);
          } else {
            const existing = supplementMap.get(key)!;
            if (!existing.conditions.includes(condition)) {
              existing.conditions.push(condition);
              console.log(`Added condition ${condition} to supplement ${supplement.nome}`);
            }
          }
        } else {
          console.warn(`Invalid supplement at index ${index} for condition ${condition}:`, supplement);
        }
      });
    } else {
      console.warn(`No ranking_consolidado found for condition: ${condition}`);
    }
  });
  
  console.log(`Extracted ${supplementMap.size} unique supplements from matrix`);
  return supplementMap;
}

async function importSupplementsInChunks(supabase: any, supplements: Map<string, { supplement: SupplementInMatrix, conditions: string[] }>) {
  const CHUNK_SIZE = 15;
  let imported = 0;
  let skipped = 0;
  
  const supplementsArray = Array.from(supplements.values());

  for (let i = 0; i < supplementsArray.length; i += CHUNK_SIZE) {
    const chunk = supplementsArray.slice(i, i + CHUNK_SIZE);
    console.log(`Processing chunk ${Math.floor(i/CHUNK_SIZE) + 1}/${Math.ceil(supplementsArray.length/CHUNK_SIZE)}`);
    
    const supplementData = chunk.map(item => createSupplementData(item.supplement, item.conditions));
    
    try {
      const { data, error } = await supabase
        .from('supplements')
        .upsert(supplementData, { onConflict: 'name' });

      if (error) {
        console.error('Error importing chunk:', error);
        skipped += chunk.length;
      } else {
        imported += chunk.length;
        console.log(`Successfully imported chunk of ${chunk.length} supplements`);
      }
    } catch (chunkError) {
      console.error('Chunk processing error:', chunkError);
      skipped += chunk.length;
    }

    // Small delay to prevent overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return { imported, skipped };
}

function createSupplementData(supplement: SupplementInMatrix, conditions: string[]) {
  return {
    id: generateSupplementId(supplement.nome),
    name: supplement.nome,
    category: categorizeByAgent(supplement.agente),
    description: `${supplement.nome} - ${supplement.mecanismo}`,
    benefits: [supplement.mecanismo],
    target_symptoms: conditions.map(c => c.toLowerCase()),
    dosage_min: getDefaultDosage(supplement.nome).min,
    dosage_max: getDefaultDosage(supplement.nome).max,
    dosage_unit: 'mg',
    timing: 'morning',
    evidence_level: mapEvidenceLevel(supplement.evidencia),
    contraindications: [],
    interactions: [],
    mechanism: supplement.mecanismo,
    agent_category: supplement.agente,
    scientific_evidence: supplement.evidencia,
    priority_level: mapPriorityLevel(supplement.evidencia),
    evidence_classification: supplement.evidencia,
    medical_conditions: conditions,
    synergy_potential: calculateSynergyPotential(supplement.evidencia),
    integrated_evidence_score: calculateEvidenceScore(supplement.evidencia, conditions.length),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

function generateSupplementId(name: string): string {
  return name.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function categorizeByAgent(agent: string): string {
  const agentMap: Record<string, string> = {
    'VITAMINA/MINERAL': 'vitamin',
    'NEUROLÓGICO/PSIQUIÁTRICO': 'amino_acid',
    'ANTI-AGING/DETOXIFICAÇÃO': 'other',
    'PERFORMANCE': 'other',
    'IMUNOLÓGICO': 'vitamin',
    'GASTROINTESTINAL': 'other',
    'MUSCULOESQUELÉTICO': 'mineral',
    'HORMONAL': 'other',
    'RESPIRATÓRIO': 'herb',
    'DERMATOLÓGICO': 'other',
    'CARDIOMETABÓLICO': 'vitamin'
  };
  
  return agentMap[agent] || 'other';
}

function mapEvidenceLevel(evidencia: 'A' | 'B' | 'D'): string {
  const evidenceMap = {
    'A': 'strong',
    'B': 'moderate', 
    'D': 'limited'
  };
  return evidenceMap[evidencia] || 'moderate';
}

function mapPriorityLevel(evidencia: 'A' | 'B' | 'D'): string {
  const priorityMap = {
    'A': 'muito_alta',
    'B': 'alta',
    'D': 'media'
  };
  return priorityMap[evidencia] || 'media';
}

function getDefaultDosage(supplementName: string): {min: number, max: number} {
  const dosageMap: Record<string, {min: number, max: number}> = {
    'magnesium': {min: 200, max: 400},
    'magnésio': {min: 200, max: 400},
    'omega-3': {min: 500, max: 2000},
    'ômega-3': {min: 500, max: 2000},
    'coq10': {min: 100, max: 300},
    'coenzima q10': {min: 100, max: 300},
    'vitamin d': {min: 1000, max: 4000},
    'vitamina d': {min: 1000, max: 4000},
    'vitamina d3': {min: 1000, max: 4000},
    'vitamin c': {min: 500, max: 2000},
    'vitamina c': {min: 500, max: 2000},
    'curcumina': {min: 500, max: 1500},
    'turmeric': {min: 500, max: 1500},
    'ashwagandha': {min: 300, max: 600},
    'rhodiola': {min: 200, max: 600},
    'berberina': {min: 500, max: 1500},
    'quercetin': {min: 500, max: 1000},
    'quercetina': {min: 500, max: 1000},
    'zinc': {min: 8, max: 40},
    'zinco': {min: 8, max: 40},
    'iron': {min: 8, max: 45},
    'ferro': {min: 8, max: 45},
    'calcium': {min: 500, max: 1200},
    'cálcio': {min: 500, max: 1200},
    'probiotics': {min: 1, max: 50},
    'probióticos': {min: 1, max: 50},
    'resveratrol': {min: 100, max: 500},
    'ginkgo': {min: 120, max: 240},
    'ginseng': {min: 200, max: 400},
    'spirulina': {min: 1000, max: 3000},
    'chlorella': {min: 1000, max: 3000},
    '5-htp': {min: 50, max: 300},
    'acetyl-l-carnitine': {min: 500, max: 2000},
    'alanine': {min: 500, max: 3000},
    'arginine': {min: 1000, max: 6000},
    'beta-alanine': {min: 2000, max: 5000},
    'carnitine': {min: 500, max: 3000},
    'citrulline': {min: 3000, max: 8000},
    'd-aspartic acid': {min: 3000, max: 6000},
    'gaba': {min: 100, max: 750},
    'glutamine': {min: 5000, max: 15000},
    'glycine': {min: 1000, max: 3000},
    'l-theanine': {min: 100, max: 400}
  };
  
  const key = supplementName.toLowerCase();
  for (const [name, dosage] of Object.entries(dosageMap)) {
    if (key.includes(name) || name.includes(key)) {
      return dosage;
    }
  }
  return {min: 100, max: 500};
}

function calculateSynergyPotential(evidencia: 'A' | 'B' | 'D'): string {
  const synergyMap = {
    'A': 'Alta - Evidência científica sólida para combinações',
    'B': 'Moderada - Boa base científica para interações', 
    'D': 'Limitada - Poucos estudos sobre sinergia'
  };
  return synergyMap[evidencia] || 'Limitada';
}

function calculateEvidenceScore(evidencia: 'A' | 'B' | 'D', conditionsCount: number): number {
  const baseScore = {
    'A': 90,
    'B': 70,
    'D': 40
  };
  
  const base = baseScore[evidencia] || 40;
  // Bonus por aparecer em múltiplas condições
  const conditionBonus = Math.min(conditionsCount * 5, 30);
  
  return Math.min(base + conditionBonus, 100);
}