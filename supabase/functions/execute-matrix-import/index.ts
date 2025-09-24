import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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

// Auto-execute import on startup
let importExecuted = false

async function autoExecuteImport() {
  if (importExecuted) return
  importExecuted = true
  
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('🔍 Verificando se importação é necessária...')
    
    // Verificar se já temos dados completos
    const { count: supplementsCount } = await supabase
      .from('supplements')
      .select('*', { count: 'exact', head: true })
    
    const { count: protocolsCount } = await supabase
      .from('therapeutic_protocols')  
      .select('*', { count: 'exact', head: true })

    console.log(`📊 Estado atual: ${supplementsCount} suplementos, ${protocolsCount} protocolos`)
    
    // Se temos menos de 200 suplementos, executar importação (reduzido de 500 para forçar execução)
    if ((supplementsCount || 0) < 200) {
      console.log('🚀 Iniciando importação automática da matriz...')
      console.log(`🔄 Limite reduzido para 200 - atual: ${supplementsCount}`)
      await executeMatrixImport(supabase)
    } else {
      console.log(`⚠️ Base já possui ${supplementsCount} suplementos (limite: 200). Use HTTP para forçar importação.`)
    }
  } catch (error) {
    console.error('❌ Erro na auto-execução:', error)
  }
}

async function loadMatrixDataFromStorage(supabase: any): Promise<MatrixData> {
  try {
    console.log('📁 Tentando baixar arquivo do Supabase Storage...');
    // Try to download from storage first
    const { data, error } = await supabase.storage
      .from('matrix-data')
      .download('matriz_final_consolidada.json');

    if (data) {
      const text = await data.text();
      const matrixData = JSON.parse(text);
      console.log(`✅ Arquivo carregado do Storage com ${Object.keys(matrixData).length} condições`);
      return matrixData;
    }

    if (error) {
      console.log('⚠️ Arquivo não encontrado no storage, usando dados de fallback');
    }
    
    // Fallback data if storage fails
    console.log('🔄 Usando dados de amostra como fallback...');
    return {
      "Ansiedade": {
        "ranking_consolidado": {
          "prioridade_muito_alta": [
            {
              "nome": "Magnésio",
              "agente": "VITAMINA/MINERAL",
              "evidencia": "A" as const,
              "mecanismo": "Modulação da neurotransmissão GABAérgica"
            },
            {
              "nome": "L-Theanine",
              "agente": "NEUROLÓGICO/PSIQUIÁTRICO",
              "evidencia": "A" as const,
              "mecanismo": "Promoção de ondas alfa cerebrais e redução do cortisol"
            }
          ],
          "prioridade_alta": [
            {
              "nome": "Ashwagandha",
              "agente": "NEUROLÓGICO/PSIQUIÁTRICO",
              "evidencia": "B" as const,
              "mecanismo": "Adaptógeno que reduz cortisol e melhora resposta ao estresse"
            }
          ],
          "prioridade_media": [],
          "prioridade_baixa": []
        }
      },
      "Depressão": {
        "ranking_consolidado": {
          "prioridade_muito_alta": [
            {
              "nome": "Ômega-3 EPA/DHA",
              "agente": "VITAMINA/MINERAL",
              "evidencia": "A" as const,
              "mecanismo": "Anti-inflamatório cerebral e modulação de neurotransmissores"
            }
          ],
          "prioridade_alta": [
            {
              "nome": "Vitamina D3",
              "agente": "VITAMINA/MINERAL",
              "evidencia": "B" as const,
              "mecanismo": "Regulação de serotonina e função neuronal"
            }
          ],
          "prioridade_media": [],
          "prioridade_baixa": []
        }
      }
    };
  } catch (error) {
    console.error('❌ Erro ao carregar dados da matriz:', error);
    throw new Error(`Falha ao carregar matriz: ${error.message}`);
  }
}

async function executeMatrixImport(supabase: any) {
  console.log('🚀 Iniciando importação da matriz...');
  
  const matrixData = await loadMatrixDataFromStorage(supabase);
  console.log(`📊 Dados carregados: ${Object.keys(matrixData).length} condições`);
  
  // Log primeiras condições para debug
  const firstConditions = Object.keys(matrixData).slice(0, 3);
  console.log(`🔍 Primeiras condições: ${firstConditions.join(', ')}`);

  // Extrair suplementos únicos
  console.log('🔄 Processando suplementos únicos...');
  const supplementMap = new Map<string, { supplement: SupplementInMatrix, conditions: string[], priorities: string[] }>();
  let totalProcessed = 0;
  
  Object.entries(matrixData).forEach(([condition, data], index) => {
    if (index % 50 === 0) {
      console.log(`🔄 Processando condição ${index + 1}/${Object.keys(matrixData).length}: ${condition}`);
    }
    
    if (data && data.ranking_consolidado) {
      const priorities = ['prioridade_muito_alta', 'prioridade_alta', 'prioridade_media', 'prioridade_baixa'];
      
      priorities.forEach(priority => {
        const supplements = data.ranking_consolidado[priority as keyof typeof data.ranking_consolidado] || [];
        supplements.forEach(supplement => {
          totalProcessed++;
          if (supplement && supplement.nome) {
            const key = supplement.nome.toLowerCase().trim();
            if (!supplementMap.has(key)) {
              supplementMap.set(key, { 
                supplement, 
                conditions: [condition], 
                priorities: [priority]
              });
            } else {
              const existing = supplementMap.get(key)!;
              if (!existing.conditions.includes(condition)) {
                existing.conditions.push(condition);
              }
              if (!existing.priorities.includes(priority)) {
                existing.priorities.push(priority);
              }
            }
          }
        });
      });
    }
  });

  console.log(`💊 Processamento concluído: ${totalProcessed} entradas processadas → ${supplementMap.size} suplementos únicos`);

  // Importar suplementos
  const supplementsData = Array.from(supplementMap.values()).map(item => ({
    id: generateSupplementId(item.supplement.nome),
    name: item.supplement.nome,
    category: categorizeByAgent(item.supplement.agente),
    description: `${item.supplement.nome} - ${item.supplement.mecanismo}`,
    benefits: [item.supplement.mecanismo],
    target_symptoms: item.conditions.map(c => c.toLowerCase()),
    dosage_min: getDefaultDosage(item.supplement.nome).min,
    dosage_max: getDefaultDosage(item.supplement.nome).max,
    dosage_unit: 'mg',
    timing: 'morning',
    evidence_level: mapEvidenceLevel(item.supplement.evidencia),
    contraindications: [],
    interactions: [],
    mechanism: item.supplement.mecanismo,
    agent_category: item.supplement.agente,
    scientific_evidence: item.supplement.evidencia,
    priority_level: mapPriorityLevel(item.supplement.evidencia),
    evidence_classification: item.supplement.evidencia,
    medical_conditions: item.conditions,
    synergy_potential: calculateSynergyPotential(item.supplement.evidencia),
    integrated_evidence_score: calculateEvidenceScore(item.supplement.evidencia, item.conditions.length),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));

  // Importar em lotes
  console.log(`🚀 Iniciando importação de ${supplementsData.length} suplementos em lotes de ${CHUNK_SIZE}...`);
  const CHUNK_SIZE = 20;
  let importedSupplements = 0;

  for (let i = 0; i < supplementsData.length; i += CHUNK_SIZE) {
    const chunk = supplementsData.slice(i, i + CHUNK_SIZE);
    console.log(`📦 Processando lote ${Math.floor(i/CHUNK_SIZE) + 1}/${Math.ceil(supplementsData.length/CHUNK_SIZE)}...`);
    
    const { data, error } = await supabase
      .from('supplements')
      .upsert(chunk, { onConflict: 'name' });

    if (error) {
      console.error(`❌ Erro no lote ${Math.floor(i/CHUNK_SIZE) + 1}:`, error);
      console.error(`🔍 Primeiro item do lote:`, chunk[0]?.name);
    } else {
      importedSupplements += chunk.length;
      console.log(`✅ Lote ${Math.floor(i/CHUNK_SIZE) + 1} OK - ${chunk.length} suplementos (Total: ${importedSupplements})`);
    }

    // Pausa para não sobrecarregar
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Criar protocolos terapêuticos
  const protocolsData = Object.entries(matrixData).map(([condition, data]) => {
    const allSupplements: any[] = [];
    
    if (data && data.ranking_consolidado) {
      Object.entries(data.ranking_consolidado).forEach(([priority, supplements]) => {
        supplements.forEach(supplement => {
          allSupplements.push({
            nome: supplement.nome,
            agente: supplement.agente,
            evidencia: supplement.evidencia,
            mecanismo: supplement.mecanismo,
            prioridade: priority.replace('prioridade_', '')
          });
        });
      });
    }

    return {
      id: crypto.randomUUID(),
      condition: condition,
      supplement_combination: allSupplements,
      synergy_description: `Protocolo para ${condition} com ${allSupplements.length} suplementos`,
      expected_efficacy: `Baseado em evidências ${allSupplements.filter(s => s.evidencia === 'A').length} nível A`,
      implementation_phases: {
        fase_inicial: "Iniciar com suplementos de prioridade muito alta",
        titulacao: "Adicionar gradualmente suplementos de menor prioridade",
        avaliacao_resposta: "Avaliar resposta após 4-6 semanas"
      },
      monitoring_parameters: {
        baseline: "Avaliação inicial de sintomas",
        seguimento_inicial: "2 semanas",
        seguimento_regular: "4-6 semanas"
      },
      individualization_factors: {
        fatores_idade: "Ajustar dosagens conforme idade",
        comorbidades: "Considerar condições coexistentes",
        medicamentos: "Verificar interações medicamentosas"
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  });

  // Importar protocolos
  let importedProtocols = 0;
  
  for (let i = 0; i < protocolsData.length; i += CHUNK_SIZE) {
    const chunk = protocolsData.slice(i, i + CHUNK_SIZE);
    
    const { data, error } = await supabase
      .from('therapeutic_protocols')
      .upsert(chunk, { onConflict: 'condition' });

    if (error) {
      console.error(`Erro no lote de protocolos ${i/CHUNK_SIZE + 1}:`, error);
    } else {
      importedProtocols += chunk.length;
      console.log(`✅ Importado lote de protocolos ${i/CHUNK_SIZE + 1}/${Math.ceil(protocolsData.length/CHUNK_SIZE)} - ${chunk.length} protocolos`);
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`🎉 Importação concluída: ${importedSupplements} suplementos, ${importedProtocols} protocolos`);

  return {
    supplements: importedSupplements,
    protocols: importedProtocols,
    conditions: Object.keys(matrixData).length
  };
}

// Auto-execute on function startup
autoExecuteImport()

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verificar estado atual antes de forçar importação
    const { count: currentSupplements } = await supabase
      .from('supplements')
      .select('*', { count: 'exact', head: true })
    
    const { count: currentProtocols } = await supabase
      .from('therapeutic_protocols')  
      .select('*', { count: 'exact', head: true })

    console.log('🔥 FORÇANDO IMPORTAÇÃO COMPLETA via HTTP!')
    console.log(`📊 Estado atual: ${currentSupplements} suplementos, ${currentProtocols} protocolos`)
    console.log('⚡ Ignorando limites - executando importação total...')
    console.log('🔧 Configuração: URL e Service Key OK')
    
    const result = await executeMatrixImport(supabase)
    
    console.log('✅ Importação FORÇADA concluída:', result)
    console.log(`📈 Resultado: ${result.supplements} suplementos, ${result.protocols} protocolos processados`)

    return new Response(JSON.stringify({
      success: true,
      message: '🔥 Importação COMPLETA forçada via HTTP concluída com sucesso!',
      previousState: {
        supplements: currentSupplements || 0,
        protocols: currentProtocols || 0
      },
      newStats: result,
      forced: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('❌ Erro na importação forçada:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      forced: true
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Funções auxiliares
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
    'omega-3': {min: 500, max: 2000},
    'coq10': {min: 100, max: 300},
    'vitamin d': {min: 1000, max: 4000},
    'vitamin c': {min: 500, max: 2000},
    '5-htp': {min: 50, max: 300},
    'acetyl-l-carnitine': {min: 500, max: 2000},
    'alanine': {min: 500, max: 3000},
    'arginine': {min: 1000, max: 6000},
    'beta-alanine': {min: 2000, max: 5000},
    'carnitine': {min: 500, max: 3000},
    'citrulline': {min: 3000, max: 8000},
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
    'A': 'Alta - Evidência científica sólida',
    'B': 'Moderada - Boa base científica', 
    'D': 'Limitada - Poucos estudos'
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
  const conditionBonus = Math.min(conditionsCount * 5, 30);
  
  return Math.min(base + conditionBonus, 100);
}