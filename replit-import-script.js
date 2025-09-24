const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Configuração do Supabase - use suas credenciais
const SUPABASE_URL = "https://ehjpdcbyoqaoazknymbj.supabase.co";
const SUPABASE_SERVICE_KEY = "SUA_SERVICE_KEY_AQUI"; // Substitua pela sua service key

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function importMatrixData() {
  try {
    console.log('🚀 Iniciando importação da matriz consolidada...');
    
    // 1. Ler o arquivo JSON (coloque o arquivo na mesma pasta do script)
    const matrixData = JSON.parse(fs.readFileSync('matriz_final_consolidada.json', 'utf8'));
    console.log('✅ Arquivo JSON carregado com sucesso');
    
    // 2. Processar suplementos únicos
    const uniqueSupplements = new Map();
    
    Object.entries(matrixData).forEach(([condition, supplements]) => {
      if (Array.isArray(supplements)) {
        supplements.forEach(supp => {
          if (supp.nome && supp.agente) {
            const key = `${supp.nome}_${supp.agente}`;
            if (!uniqueSupplements.has(key)) {
              uniqueSupplements.set(key, {
                supplement: supp,
                conditions: [condition]
              });
            } else {
              uniqueSupplements.get(key).conditions.push(condition);
            }
          }
        });
      }
    });
    
    console.log(`📊 Encontrados ${uniqueSupplements.size} suplementos únicos`);
    
    // 3. Importar suplementos em lotes
    const supplementsArray = Array.from(uniqueSupplements.entries());
    const CHUNK_SIZE = 50;
    let importedSupps = 0;
    
    for (let i = 0; i < supplementsArray.length; i += CHUNK_SIZE) {
      const chunk = supplementsArray.slice(i, i + CHUNK_SIZE);
      const supplementsData = chunk.map(([key, data]) => createSupplementData(data.supplement, data.conditions));
      
      const { error } = await supabase
        .from('supplements')
        .upsert(supplementsData, { onConflict: 'id' });
      
      if (error) {
        console.error(`❌ Erro no lote ${Math.floor(i/CHUNK_SIZE) + 1}:`, error);
        continue;
      }
      
      importedSupps += chunk.length;
      console.log(`✅ Importados ${importedSupps}/${supplementsArray.length} suplementos`);
      
      // Pequena pausa para não sobrecarregar
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // 4. Processar protocolos terapêuticos
    const protocols = [];
    Object.entries(matrixData).forEach(([condition, supplements]) => {
      if (Array.isArray(supplements) && supplements.length > 0) {
        // Filtrar e ordenar suplementos por evidência
        const validSupplements = supplements
          .filter(s => s.nome && s.agente && s.evidencia)
          .sort((a, b) => {
            const order = { 'A': 3, 'B': 2, 'D': 1 };
            return (order[b.evidencia] || 0) - (order[a.evidencia] || 0);
          });
        
        if (validSupplements.length > 0) {
          protocols.push({
            id: generateProtocolId(condition),
            condition: condition,
            supplement_combination: validSupplements.map(s => ({
              nome: s.nome,
              agente: s.agente,
              evidencia: s.evidencia,
              mecanismo: s.mecanismo || 'Mecanismo não especificado'
            })),
            synergy_description: generateSynergyDescription(validSupplements),
            expected_efficacy: calculateExpectedEfficacy(validSupplements),
            implementation_phases: generateImplementationPhases(),
            monitoring_parameters: generateMonitoringParameters(),
            individualization_factors: generateIndividualizationFactors(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        }
      }
    });
    
    console.log(`📋 Processados ${protocols.length} protocolos terapêuticos`);
    
    // 5. Importar protocolos em lotes
    let importedProts = 0;
    
    for (let i = 0; i < protocols.length; i += CHUNK_SIZE) {
      const chunk = protocols.slice(i, i + CHUNK_SIZE);
      
      const { error } = await supabase
        .from('therapeutic_protocols')
        .upsert(chunk, { onConflict: 'id' });
      
      if (error) {
        console.error(`❌ Erro no lote de protocolos ${Math.floor(i/CHUNK_SIZE) + 1}:`, error);
        continue;
      }
      
      importedProts += chunk.length;
      console.log(`✅ Importados ${importedProts}/${protocols.length} protocolos`);
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('🎉 Importação concluída com sucesso!');
    console.log(`📊 Resumo: ${importedSupps} suplementos, ${importedProts} protocolos`);
    
  } catch (error) {
    console.error('❌ Erro durante a importação:', error);
    process.exit(1);
  }
}

// Funções auxiliares
function createSupplementData(supplement, conditions) {
  return {
    id: generateSupplementId(supplement.nome, supplement.agente),
    name: supplement.nome,
    category: categorizeByAgent(supplement.agente),
    description: `${supplement.nome} - ${supplement.agente}`,
    benefits: conditions.slice(0, 3), // Primeiras 3 condições como benefícios
    target_symptoms: conditions,
    dosage_min: getDefaultDosage(supplement.nome).min,
    dosage_max: getDefaultDosage(supplement.nome).max,
    dosage_unit: 'mg',
    timing: 'morning',
    evidence_level: mapEvidenceLevel(supplement.evidencia),
    contraindications: [],
    interactions: [],
    mechanism: supplement.mecanismo || 'Não especificado',
    agent_category: supplement.agente,
    medical_conditions: conditions,
    scientific_evidence: supplement.evidencia,
    priority_level: mapPriorityLevel(supplement.evidencia),
    evidence_classification: supplement.evidencia,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

function generateSupplementId(nome, agente) {
  return `${nome}_${agente}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function generateProtocolId(condition) {
  return `protocol_${condition}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function categorizeByAgent(agent) {
  const categories = {
    'vitamina': 'vitamin',
    'mineral': 'mineral', 
    'aminoacido': 'amino_acid',
    'erva': 'herb',
    'extrato': 'herb'
  };
  
  const lowerAgent = agent.toLowerCase();
  for (const [key, category] of Object.entries(categories)) {
    if (lowerAgent.includes(key)) return category;
  }
  return 'other';
}

function mapEvidenceLevel(evidencia) {
  return {
    'A': 'strong',
    'B': 'moderate', 
    'D': 'limited'
  }[evidencia] || 'moderate';
}

function mapPriorityLevel(evidencia) {
  return {
    'A': 'high',
    'B': 'medium',
    'D': 'low'
  }[evidencia] || 'medium';
}

function getDefaultDosage(supplementName) {
  const dosages = {
    'vitamina d': { min: 1000, max: 4000 },
    'vitamina c': { min: 500, max: 2000 },
    'magnesio': { min: 200, max: 400 },
    'omega 3': { min: 1000, max: 3000 },
    'zinco': { min: 8, max: 40 }
  };
  
  const name = supplementName.toLowerCase();
  for (const [key, dosage] of Object.entries(dosages)) {
    if (name.includes(key)) return dosage;
  }
  return { min: 100, max: 500 };
}

function generateSynergyDescription(supplements) {
  const mechanisms = supplements.map(s => s.mecanismo).filter(Boolean);
  return `Sinergia entre ${supplements.length} compostos: ${mechanisms.slice(0, 3).join(', ')}`;
}

function calculateExpectedEfficacy(supplements) {
  const aCount = supplements.filter(s => s.evidencia === 'A').length;
  const bCount = supplements.filter(s => s.evidencia === 'B').length;
  
  if (aCount >= 2) return 'Alta eficácia esperada com evidência forte';
  if (aCount >= 1 || bCount >= 3) return 'Eficácia moderada a alta esperada';
  return 'Eficácia moderada esperada';
}

function generateImplementationPhases() {
  return {
    fase_inicial: 'Iniciar com 50% da dose por 1 semana',
    titulacao: 'Aumentar gradualmente até dose completa em 2 semanas',
    avaliacao_resposta: 'Avaliar resposta após 4-6 semanas',
    ajustes: 'Ajustar doses conforme resposta e tolerância',
    descontinuacao: 'Reduzir gradualmente se necessário'
  };
}

function generateMonitoringParameters() {
  return {
    baseline: 'Avaliar sintomas e parâmetros basais',
    seguimento_inicial: 'Acompanhamento semanal nas primeiras 4 semanas',
    seguimento_regular: 'Acompanhamento mensal após período inicial',
    parametros_laboratoriais: ['Hemograma', 'Bioquímica básica'],
    parametros_clinicos: 'Avaliação de sintomas e efeitos adversos'
  };
}

function generateIndividualizationFactors() {
  return {
    fatores_idade: 'Ajustar doses conforme faixa etária',
    fatores_geneticos: 'Considerar polimorfismos relevantes quando conhecidos',
    comorbidades: 'Avaliar interações com condições coexistentes',
    medicamentos: 'Verificar interações medicamentosas',
    estilo_vida: 'Considerar dieta, exercício e fatores ambientais'
  };
}

// Executar importação
importMatrixData();