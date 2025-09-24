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
    
    // Extract unique supplements
    const uniqueSupplements = extractUniqueSupplements(matrixData);
    console.log(`Found ${uniqueSupplements.length} unique supplements to import`);

    // Import supplements in chunks
    const { imported, skipped } = await importSupplementsInChunks(supabase, uniqueSupplements);

    console.log(`Import completed: ${imported} imported, ${skipped} skipped`);

    return new Response(JSON.stringify({
      success: true,
      imported,
      skipped,
      total: uniqueSupplements.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in import-supplements function:', error);
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

function extractUniqueSupplements(matrixData: MatrixData): SupplementInMatrix[] {
  const supplementMap = new Map<string, SupplementInMatrix>();
  
  Object.entries(matrixData).forEach(([condition, data]) => {
    if (data.suplementos && Array.isArray(data.suplementos)) {
      data.suplementos.forEach(supplement => {
        if (supplement && supplement.nome && typeof supplement.nome === 'string') {
          const key = supplement.nome.toLowerCase().trim();
          if (!supplementMap.has(key)) {
            supplementMap.set(key, supplement);
          }
        }
      });
    }
  });
  
  console.log(`Extracted ${supplementMap.size} unique supplements from matrix`);
  return Array.from(supplementMap.values());
}

async function importSupplementsInChunks(supabase: any, supplements: SupplementInMatrix[]) {
  const CHUNK_SIZE = 15;
  let imported = 0;
  let skipped = 0;

  for (let i = 0; i < supplements.length; i += CHUNK_SIZE) {
    const chunk = supplements.slice(i, i + CHUNK_SIZE);
    console.log(`Processing chunk ${Math.floor(i/CHUNK_SIZE) + 1}/${Math.ceil(supplements.length/CHUNK_SIZE)}`);
    
    const supplementData = chunk.map(createSupplementData);
    
    try {
      const { data, error } = await supabase
        .from('supplements')
        .upsert(supplementData, { onConflict: 'id' });

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

function createSupplementData(supplement: SupplementInMatrix) {
  return {
    id: generateSupplementId(supplement.nome),
    name: supplement.nome,
    category: categorizeByAgent(supplement.agente),
    description: `${supplement.nome} - ${supplement.mecanismo}`,
    benefits: [supplement.mecanismo],
    target_symptoms: [],
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
    'DERMATOLÓGICO': 'other'
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
    'magnesio': {min: 200, max: 400},
    'omega-3': {min: 500, max: 2000},
    'coq10': {min: 100, max: 300},
    'vitamin d': {min: 1000, max: 4000},
    'vitamin c': {min: 500, max: 2000},
    'curcumin': {min: 500, max: 1500},
    'ashwagandha': {min: 300, max: 600},
    'rhodiola': {min: 200, max: 600},
    'berberine': {min: 500, max: 1500},
    'quercetin': {min: 500, max: 1000}
  };
  
  const key = supplementName.toLowerCase();
  for (const [name, dosage] of Object.entries(dosageMap)) {
    if (key.includes(name)) {
      return dosage;
    }
  }
  return {min: 100, max: 500};
}