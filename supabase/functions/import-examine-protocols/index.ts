import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Structure based on Examine.com data
interface ExamineProtocol {
  condition: string;
  category: string;
  supplement_combination: ExamineSupplement[];
  synergy_description?: string;
  expected_efficacy?: string;
  implementation_phases: {
    fase_inicial?: string;
    titulacao?: string;
    avaliacao_resposta?: string;
    ajustes?: string;
    descontinuacao?: string;
  };
  monitoring_parameters: {
    baseline?: string;
    seguimento_inicial?: string;
    seguimento_regular?: string;
    parametros_laboratoriais?: string[];
    parametros_clinicos?: string;
  };
  individualization_factors: {
    fatores_idade?: string;
    fatores_geneticos?: string;
    comorbidades?: string;
    medicamentos?: string;
    estilo_vida?: string;
  };
}

interface ExamineSupplement {
  nome: string;
  agente: string;
  evidencia: 'A' | 'B' | 'D';
  mecanismo: string;
  dosage_per_kg?: string;
  tempo_efeito?: string;
  contraindicacoes?: string[];
  principais_estudos?: string[];
}

interface ExamineSupplementData {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  target_symptoms: string[];
  dosage_min: number;
  dosage_max: number;
  dosage_unit: string;
  timing: string;
  evidence_level: string;
  scientific_evidence: string;
  contraindications: string[];
  interactions: string[];
  mechanism?: string;
  agent_category?: string;
  medical_conditions?: string[];
  synergy_potential?: string;
  priority_level?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action } = await req.json();

    if (action === 'import_examine_protocols') {
      // Get comprehensive protocols based on Examine.com data
      const protocols = getExamineProtocols();
      
      console.log(`Importing ${protocols.length} Examine.com protocols...`);

      const { data, error } = await supabase
        .from('therapeutic_protocols')
        .upsert(protocols, { onConflict: 'condition' });

      if (error) {
        console.error('Error importing protocols:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: corsHeaders }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Successfully imported ${protocols.length} Examine.com protocols`,
          imported_count: protocols.length
        }),
        { headers: corsHeaders }
      );
    }

    if (action === 'import_examine_supplements') {
      // Get comprehensive supplements based on Examine.com data
      const supplements = getExamineSupplements();
      
      console.log(`Importing ${supplements.length} Examine.com supplements...`);

      const { data, error } = await supabase
        .from('supplements')
        .upsert(supplements, { onConflict: 'id' });

      if (error) {
        console.error('Error importing supplements:', error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: corsHeaders }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Successfully imported ${supplements.length} Examine.com supplements`,
          imported_count: supplements.length
        }),
        { headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action. Use import_examine_protocols or import_examine_supplements' }),
      { status: 400, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});

function getExamineProtocols(): ExamineProtocol[] {
  return [
    // CARDIOVASCULAR PROTOCOLS
    {
      condition: "High Cholesterol",
      category: "Cardiovascular",
      supplement_combination: [
        {
          nome: "Arroz Vermelho Fermentado",
          agente: "Monacolina K",
          evidencia: "A",
          mecanismo: "Inibição HMG-CoA redutase",
          dosage_per_kg: "17-34mg/kg",
          tempo_efeito: "4-6 semanas",
          contraindicacoes: ["Estatinas", "Gravidez", "Doença hepática"],
          principais_estudos: ["Cochrane 2013 (76 estudos)", "Halbert 2010", "Ras 2014"]
        },
        {
          nome: "Fitoesteróis",
          agente: "Beta-sitosterol",
          evidencia: "A",
          mecanismo: "Inibição absorção colesterol",
          dosage_per_kg: "28-43mg/kg",
          tempo_efeito: "2-3 semanas",
          contraindicacoes: ["Sitosterolemia familiar"],
          principais_estudos: ["Meta-análise (124 estudos)", "AHA Statement 2006"]
        },
        {
          nome: "Berberina",
          agente: "Berberina HCl",
          evidencia: "B",
          mecanismo: "Ativação AMPK, regulação lipídica",
          dosage_per_kg: "21-36mg/kg",
          tempo_efeito: "8-12 semanas",
          contraindicacoes: ["Hipoglicemia", "Anticoagulantes"],
          principais_estudos: ["Kong 2004", "Dong 2013", "EvidBased"]
        }
      ],
      synergy_description: "Múltiplos mecanismos: inibição síntese, redução absorção e ativação metabólica",
      expected_efficacy: "Redução LDL 25-40%, HDL aumento 10-15%",
      implementation_phases: {
        fase_inicial: "Fitoesteróis 2g/dia + mudanças dietéticas (0-4 semanas)",
        titulacao: "Adicionar arroz vermelho fermentado 1200mg/dia se LDL>130mg/dL (4-8 semanas)",
        avaliacao_resposta: "Berberina 1500mg/dia se resistência insulínica presente (8+ semanas)",
        ajustes: "Monitoramento lipidograma e função hepática",
        descontinuacao: "Redução gradual após normalização e manutenção por 6 meses"
      },
      monitoring_parameters: {
        baseline: "Lipidograma completo, ALT/AST, glicemia",
        seguimento_inicial: "Lipidograma a cada 4 semanas",
        seguimento_regular: "Lipidograma a cada 6-8 semanas, ALT/AST mensal",
        parametros_laboratoriais: ["LDL-C", "HDL-C", "Triglicerídeos", "ALT", "AST"],
        parametros_clinicos: "Sintomas musculares, função digestiva"
      },
      individualization_factors: {
        fatores_idade: "Idosos: início com 50% da dose",
        fatores_geneticos: "Polimorfismos CYP3A4 podem alterar metabolismo",
        comorbidades: "Diabetes: priorizar berberina; Doença hepática: evitar arroz vermelho",
        medicamentos: "Interação com estatinas e anticoagulantes",
        estilo_vida: "Dieta mediterrânea potencializa efeitos"
      }
    },

    {
      condition: "Hypertension",
      category: "Cardiovascular", 
      supplement_combination: [
        {
          nome: "Magnésio",
          agente: "Magnésio glicina/taurato",
          evidencia: "A",
          mecanismo: "Relaxamento vascular, antagonismo cálcio",
          dosage_per_kg: "3-6mg/kg",
          tempo_efeito: "4-8 semanas",
          contraindicacoes: ["Insuficiência renal", "Bloqueio AV"],
          principais_estudos: ["Zhang 2016", "Rosanoff 2012", "Reid 2013"]
        },
        {
          nome: "L-Citrulina",
          agente: "L-Citrulina malato",
          evidencia: "B",
          mecanismo: "Precursor óxido nítrico, vasodilatação",
          dosage_per_kg: "43-86mg/kg",
          tempo_efeito: "2-4 semanas",
          contraindicacoes: ["Insuficiência renal"],
          principais_estudos: ["Figueroa 2011", "Ochiai 2012", "Pressure Artery Res"]
        },
        {
          nome: "Alho Envelhecido",
          agente: "Alicina/compostos sulfurados",
          evidencia: "B",
          mecanismo: "Vasodilatação, inibição ECA",
          dosage_per_kg: "9-17mg/kg",
          tempo_efeito: "8-12 semanas",
          contraindicacoes: ["Anticoagulantes"],
          principais_estudos: ["Blood Press Control", "Ried 2008 BMC"]
        }
      ],
      synergy_description: "Múltiplas vias: relaxamento vascular, óxido nítrico e inibição ECA",
      expected_efficacy: "Redução PA sistólica 8-15mmHg, diastólica 5-10mmHg",
      implementation_phases: {
        fase_inicial: "Magnésio 300mg/dia se deficiente (<1.8mg/dL) (Semana 1-2)",
        titulacao: "Adicionar citrulina 6g/dia dividido em 2 doses (Semana 3-4)",
        avaliacao_resposta: "Alho envelhecido 600mg 2x/dia se PA sistólica >140mmHg (Semana 5+)",
        ajustes: "MAPA semanal nas primeiras 4 semanas, depois mensal",
        descontinuacao: "Redução gradual após controle por 3-6 meses"
      },
      monitoring_parameters: {
        baseline: "MAPA 24h, função renal, eletrólitos",
        seguimento_inicial: "PA diária por 2 semanas, depois semanal",
        seguimento_regular: "MAPA mensal, função renal trimestral",
        parametros_laboratoriais: ["Creatinina", "Ureia", "Potássio", "Magnésio"],
        parametros_clinicos: "Sintomas hipotensivos, função renal"
      },
      individualization_factors: {
        fatores_idade: "Idosos: início com doses menores, monitoramento renal",
        fatores_geneticos: "Polimorfismos eNOS podem influenciar resposta à citrulina",
        comorbidades: "Diabetes: benefício adicional da citrulina; IRC: evitar magnésio",
        medicamentos: "Interação com anti-hipertensivos e anticoagulantes",
        estilo_vida: "Exercício aeróbico e dieta DASH potencializam efeitos"
      }
    },

    // ANXIETY PROTOCOLS
    {
      condition: "Anxiety",
      category: "Neurological",
      supplement_combination: [
        {
          nome: "Saffron",
          agente: "Crocina/Safranal",
          evidencia: "B",
          mecanismo: "Modulação serotonina e GABA",
          dosage_per_kg: "0.4-0.6mg/kg",
          tempo_efeito: "2-4 semanas",
          contraindicacoes: ["Gravidez", "Lactação", "Transtorno bipolar"],
          principais_estudos: ["Randomized controlled trials", "Meta-analysis 2019"]
        },
        {
          nome: "Lavender",
          agente: "Silexan™",
          evidencia: "A",
          mecanismo: "Modulação canais cálcio voltage-gated",
          dosage_per_kg: "1.1-1.4mg/kg",
          tempo_efeito: "1-2 semanas",
          contraindicacoes: ["Gravidez", "Lactação"],
          principais_estudos: ["Multiple RCTs", "European approval"]
        },
        {
          nome: "Passionflower",
          agente: "Flavonoides/Vitexina",
          evidencia: "B",
          mecanismo: "Agonismo GABA-A",
          dosage_per_kg: "7-10mg/kg",
          tempo_efeito: "1-2 semanas",
          contraindicacoes: ["Sedativos", "Álcool"],
          principais_estudos: ["Akhondzadeh 2001", "Movafegh 2008"]
        }
      ],
      synergy_description: "Múltiplas vias GABAérgicas e serotoninérgicas para ansiedade",
      expected_efficacy: "Redução HAM-A 30-50%, melhora qualidade vida",
      implementation_phases: {
        fase_inicial: "Lavender 80mg/dia por 2 semanas",
        titulacao: "Adicionar saffron 30mg/dia se ansiedade generalizada",
        avaliacao_resposta: "Passionflower 500mg/dia se insônia associada",
        ajustes: "Escala HAM-A semanal por 4 semanas",
        descontinuacao: "Redução gradual após melhora sustentada por 2-3 meses"
      },
      monitoring_parameters: {
        baseline: "HAM-A, GAD-7, qualidade sono",
        seguimento_inicial: "HAM-A semanal, GAD-7 quinzenal",
        seguimento_regular: "Escalas mensais, efeitos adversos",
        parametros_laboratoriais: ["Não necessários routineiramente"],
        parametros_clinicos: "Sedação, interações medicamentosas"
      },
      individualization_factors: {
        fatores_idade: "Idosos: início com 50% da dose, risco sedação",
        fatores_geneticos: "Polimorfismos GABA podem influenciar resposta",
        comorbidades: "Depressão: considerar saffron; Insônia: priorizar lavender",
        medicamentos: "Cuidado com benzodiazepínicos e antidepressivos",
        estilo_vida: "Técnicas relaxamento e exercício potencializam"
      }
    },

    // BODY COMPOSITION PROTOCOLS
    {
      condition: "Body Composition",
      category: "Performance",
      supplement_combination: [
        {
          nome: "Dietary Protein",
          agente: "Proteína completa",
          evidencia: "A",
          mecanismo: "Síntese proteica, termogênese",
          dosage_per_kg: "1.6-2.2g/kg",
          tempo_efeito: "2-4 semanas",
          contraindicacoes: ["Doença renal"],
          principais_estudos: ["Multiple meta-analyses", "Position stands"]
        },
        {
          nome: "Caffeine",
          agente: "Cafeína anidra",
          evidencia: "A",
          mecanismo: "Lipólise, termogênese, performance",
          dosage_per_kg: "3-6mg/kg",
          tempo_efeito: "30-60 minutos",
          contraindicacoes: ["Arritmias", "Ansiedade severa"],
          principais_estudos: ["ISSN Position Stand", "Multiple RCTs"]
        },
        {
          nome: "Green Tea Extract",
          agente: "EGCG",
          evidencia: "B",
          mecanismo: "Oxidação lipídica, termogênese",
          dosage_per_kg: "7-10mg/kg EGCG",
          tempo_efeito: "4-8 semanas",
          contraindicacoes: ["Hepatopatia"],
          principais_estudos: ["Hursel 2009", "Meta-analyses"]
        }
      ],
      synergy_description: "Proteína para composição, cafeína/EGCG para metabolismo lipídico",
      expected_efficacy: "Perda gordura 0.5-1kg/semana, preservação massa magra",
      implementation_phases: {
        fase_inicial: "Proteína 1.6g/kg + exercício resistido (2 semanas)",
        titulacao: "Adicionar cafeína 3mg/kg pré-treino (semana 3-4)",
        avaliacao_resposta: "Green tea extract 500mg/dia se platô (semana 5+)",
        ajustes: "Bioimpedância quinzenal, ajuste calórico",
        descontinuacao: "Manutenção proteína, redução termogênicos gradual"
      },
      monitoring_parameters: {
        baseline: "Bioimpedância, circunferências, performance",
        seguimento_inicial: "Peso semanal, bioimpedância quinzenal",
        seguimento_regular: "Avaliação corporal mensal, performance",
        parametros_laboratoriais: ["Glicemia", "Função hepática se EGCG"],
        parametros_clinicos: "Tolerância treino, recuperação, sono"
      },
      individualization_factors: {
        fatores_idade: "Idosos: proteína até 2.2g/kg, cafeína reduzida",
        fatores_geneticos: "CYP1A2 influencia metabolismo cafeína",
        comorbidades: "Diabetes: monitorar glicemia; Hepatopatia: evitar EGCG",
        medicamentos: "Interações cafeína com múltiplos fármacos",
        estilo_vida: "Timing proteína pós-treino, cafeína longe do sono"
      }
    },

    // COGNITIVE PROTOCOLS  
    {
      condition: "Age-Associated Memory Impairment",
      category: "Neurological",
      supplement_combination: [
        {
          nome: "Ginkgo Biloba",
          agente: "EGb 761",
          evidencia: "B",
          mecanismo: "Melhora circulação cerebral, neuroproteção",
          dosage_per_kg: "3.4mg/kg",
          tempo_efeito: "6-12 semanas",
          contraindicacoes: ["Anticoagulantes", "Cirurgia", "Epilepsia"],
          principais_estudos: ["EGb 761 studies", "Cochrane reviews"]
        },
        {
          nome: "Blueberry",
          agente: "Antocianinas",
          evidencia: "B",
          mecanismo: "Antioxidante, neuroplasticidade",
          dosage_per_kg: "0.35g/kg",
          tempo_efeito: "4-8 semanas",
          contraindicacoes: ["Nenhuma conhecida"],
          principais_estudos: ["Multiple cognitive trials", "Meta-analyses"]
        }
      ],
      synergy_description: "Circulação cerebral + neuroproteção antioxidante",
      expected_efficacy: "Melhora memória 10-20%, atenção 15-25%",
      implementation_phases: {
        fase_inicial: "Ginkgo 240mg/dia dividido 2x (4 semanas)",
        titulacao: "Adicionar blueberry 25g/dia (semana 5-8)",
        avaliacao_resposta: "Testes cognitivos a cada 4 semanas",
        ajustes: "Otimização dose baseada em resposta",
        descontinuacao: "Manutenção se benefício, wash-out se não"
      },
      monitoring_parameters: {
        baseline: "MMSE, MoCA, testes atenção",
        seguimento_inicial: "Avaliação cognitiva mensal",
        seguimento_regular: "Testes trimestrais, sintomas adversos",
        parametros_laboratoriais: ["Coagulação se ginkgo"],
        parametros_clinicos: "Função cognitiva, qualidade vida"
      },
      individualization_factors: {
        fatores_idade: "Maior benefício >65 anos",
        fatores_geneticos: "APOE4 pode influenciar resposta",
        comorbidades: "Demência: pode ter benefício limitado",
        medicamentos: "Interação ginkgo com anticoagulantes",
        estilo_vida: "Exercício físico e mental potencializam"
      }
    },

    // EXERCISE PERFORMANCE PROTOCOLS
    {
      condition: "Aerobic Exercise Performance", 
      category: "Performance",
      supplement_combination: [
        {
          nome: "Dietary Protein",
          agente: "Proteína completa",
          evidencia: "A",
          mecanismo: "Recuperação muscular, adaptação treino",
          dosage_per_kg: "1.8g/kg",
          tempo_efeito: "1-2 semanas",
          contraindicacoes: ["Doença renal"],
          principais_estudos: ["ISSN Position Stand", "Multiple RCTs"]
        },
        {
          nome: "Caffeine",
          agente: "Cafeína anidra",
          evidencia: "A", 
          mecanismo: "Mobilização lipídica, redução percepção esforço",
          dosage_per_kg: "3-6mg/kg",
          tempo_efeito: "30-60 minutos",
          contraindicacoes: ["Arritmias", "Insônia"], 
          principais_estudos: ["ISSN Position Stand", "Ganio 2009"]
        }
      ],
      synergy_description: "Proteína para adaptação + cafeína para performance aguda",
      expected_efficacy: "Melhora performance 2-5%, recuperação 20-30%",
      implementation_phases: {
        fase_inicial: "Proteína 1.8g/kg diária + periodização treino",
        titulacao: "Cafeína 3-6mg/kg 30-60min pré-treino específico",
        avaliacao_resposta: "Testes performance a cada 2-4 semanas",
        ajustes: "Timing e dosagem baseados na resposta individual",
        descontinuacao: "Manutenção proteína, cycling cafeína"
      },
      monitoring_parameters: {
        baseline: "VO2max, limiar anaeróbico, composição corporal",
        seguimento_inicial: "Performance semanal, recuperação",
        seguimento_regular: "Testes mensais, marcadores fadiga",
        parametros_laboratoriais: ["CK", "LDH", "Ureia"],
        parametros_clinicos: "Qualidade sono, overtraining"
      },
      individualization_factors: {
        fatores_idade: "Atletas veteranos: foco em recuperação",
        fatores_geneticos: "CYP1A2 para metabolismo cafeína",
        comorbidades: "Cardiovasculares: cuidado com cafeína",
        medicamentos: "Broncodilatadores + cafeína = precaução",
        estilo_vida: "Timing nutrição e cafeína críticos"
      }
    }
  ];
}

function getExamineSupplements(): ExamineSupplementData[] {
  return [
    {
      id: "red-yeast-rice",
      name: "Arroz Vermelho Fermentado",
      category: "herb",
      description: "Produto de fermentação do arroz pelo fungo Monascus purpureus, contém monacolinas naturais",
      benefits: ["Redução colesterol LDL", "Melhora perfil lipídico", "Proteção cardiovascular"],
      target_symptoms: ["colesterol alto", "dislipidemia", "risco cardiovascular"],
      dosage_min: 1200,
      dosage_max: 2400,
      dosage_unit: "mg",
      timing: "with_meal",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: ["Uso de estatinas", "Gravidez", "Doença hepática", "Lactação"],
      interactions: ["Estatinas", "Fibratos", "Ciclosporina"],
      mechanism: "Inibição da HMG-CoA redutase através da monacolina K",
      agent_category: "Regulador lipídico natural",
      medical_conditions: ["Hipercolesterolemia", "Dislipidemia mista", "Prevenção cardiovascular"],
      synergy_potential: "Sinergia com fitoesteróis e berberina para controle lipídico",
      priority_level: "alta"
    },
    {
      id: "phytosterols",
      name: "Fitoesteróis",
      category: "other",
      description: "Compostos vegetais estruturalmente similares ao colesterol que inibem sua absorção",
      benefits: ["Redução absorção colesterol", "Melhora LDL", "Proteção cardiovascular"],
      target_symptoms: ["colesterol alto", "dislipidemia", "absorção colesterol"],
      dosage_min: 2000,
      dosage_max: 3000,
      dosage_unit: "mg",
      timing: "with_meal",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: ["Sitosterolemia familiar"],
      interactions: ["Anticoagulantes (possível)"],
      mechanism: "Competição com colesterol na absorção intestinal",
      agent_category: "Modulador absorção lipídica",
      medical_conditions: ["Hipercolesterolemia", "Prevenção cardiovascular"],
      synergy_potential: "Excelente sinergia com arroz vermelho fermentado",
      priority_level: "muito_alta"
    },
    {
      id: "berberine",
      name: "Berberina",
      category: "herb",
      description: "Alcaloide isoquinolínico extraído de várias plantas, com ação metabólica",
      benefits: ["Controle glicêmico", "Redução colesterol", "Melhora resistência insulínica"],
      target_symptoms: ["diabetes", "colesterol alto", "resistência insulínica", "síndrome metabólica"],
      dosage_min: 1000,
      dosage_max: 1500,
      dosage_unit: "mg",
      timing: "with_meal",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: ["Hipoglicemia", "Gravidez", "Lactação"],
      interactions: ["Anticoagulantes", "Hipoglicemiantes", "Ciclosporina"],
      mechanism: "Ativação AMPK, regulação metabolismo glicose e lipídios",
      agent_category: "Modulador metabólico",
      medical_conditions: ["Diabetes tipo 2", "Dislipidemia", "Síndrome metabólica"],
      synergy_potential: "Sinergia com protocolo lipídico quando há resistência insulínica",
      priority_level: "alta"
    },
    {
      id: "magnesium-glycinate",
      name: "Magnésio",
      category: "mineral",
      description: "Mineral essencial com múltiplas funções cardiovasculares e musculares",
      benefits: ["Redução pressão arterial", "Relaxamento muscular", "Melhora sono"],
      target_symptoms: ["hipertensão", "deficiência magnésio", "arritmias", "câimbras"],
      dosage_min: 300,
      dosage_max: 400,
      dosage_unit: "mg",
      timing: "evening",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: ["Insuficiência renal", "Bloqueio atrioventricular", "Miastenia gravis"],
      interactions: ["Diuréticos", "Antibióticos", "Bifosfonatos"],
      mechanism: "Antagonista natural do cálcio, cofator enzimático",
      agent_category: "Mineral cardiovascular",
      medical_conditions: ["Hipertensão", "Deficiência magnésio", "Síndrome metabólica"],
      synergy_potential: "Sinergia com L-citrulina para controle pressão arterial",
      priority_level: "muito_alta"
    },
    {
      id: "l-citrulline",
      name: "L-Citrulina",
      category: "amino_acid",
      description: "Aminoácido não-essencial precursor da arginina e óxido nítrico",
      benefits: ["Vasodilatação", "Redução pressão arterial", "Melhora performance"],
      target_symptoms: ["hipertensão", "disfunção endotelial", "fadiga muscular"],
      dosage_min: 3000,
      dosage_max: 6000,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: ["Insuficiência renal grave"],
      interactions: ["Anti-hipertensivos", "Vasodilatadores"],
      mechanism: "Conversão a arginina e produção de óxido nítrico",
      agent_category: "Precursor óxido nítrico",
      medical_conditions: ["Hipertensão", "Disfunção erétil", "Performance atlética"],
      synergy_potential: "Sinergia com magnésio para protocolo anti-hipertensivo",
      priority_level: "alta"
    },
    {
      id: "aged-garlic-extract",
      name: "Alho Envelhecido",
      category: "herb",
      description: "Extrato de alho processado para reduzir odor e potencializar compostos ativos",
      benefits: ["Redução pressão arterial", "Melhora perfil lipídico", "Propriedades antitrombóticas"],
      target_symptoms: ["hipertensão", "colesterol alto", "risco cardiovascular"],
      dosage_min: 600,
      dosage_max: 1200,
      dosage_unit: "mg",
      timing: "with_meal",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: ["Cirurgia programada", "Distúrbios hemorrágicos"],
      interactions: ["Anticoagulantes", "Antiplaquetários", "Saquinavir"],
      mechanism: "Vasodilatação, inibição ECA, propriedades antitrombóticas",
      agent_category: "Cardioprotetor natural",
      medical_conditions: ["Hipertensão", "Aterosclerose", "Prevenção cardiovascular"],
      synergy_potential: "Complementa protocolo anti-hipertensivo natural",
      priority_level: "media"
    },
    {
      id: "saffron-extract",
      name: "Saffron",
      category: "herb",
      description: "Extrato padronizado dos estigmas da Crocus sativus, rico em crocina e safranal",
      benefits: ["Redução ansiedade", "Melhora humor", "Propriedades antidepressivas"],
      target_symptoms: ["ansiedade", "depressão", "irritabilidade", "instabilidade humor"],
      dosage_min: 30,
      dosage_max: 30,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: ["Gravidez", "Lactação", "Transtorno bipolar", "Hipotensão"],
      interactions: ["Hipoglicemiantes", "Anti-hipertensivos", "Anticoagulantes"],
      mechanism: "Modulação serotonina, dopamina e GABA",
      agent_category: "Modulador neurotransmissor",
      medical_conditions: ["Ansiedade generalizada", "Depressão leve-moderada", "TPM"],
      synergy_potential: "Sinergia com lavender para ansiedade severa",
      priority_level: "alta"
    },
    {
      id: "lavender-silexan",
      name: "Lavender",
      category: "herb",
      description: "Óleo essencial padronizado de Lavandula angustifolia (Silexan™)",
      benefits: ["Redução ansiedade", "Melhora qualidade sono", "Propriedades relaxantes"],
      target_symptoms: ["ansiedade", "insônia", "agitação", "tensão"],
      dosage_min: 80,
      dosage_max: 160,
      dosage_unit: "mg",
      timing: "evening",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: ["Gravidez", "Lactação", "Alergia a lavanda"],
      interactions: ["Sedativos", "Benzodiazepínicos"],
      mechanism: "Modulação canais de cálcio voltage-gated",
      agent_category: "Ansiolítico natural",
      medical_conditions: ["Transtorno ansiedade generalizada", "Ansiedade subclínica", "Insônia"],
      synergy_potential: "Base do protocolo ansiolítico, combina com passionflower",
      priority_level: "muito_alta"
    },
    {
      id: "passionflower-extract",
      name: "Passionflower",
      category: "herb",
      description: "Extrato padronizado de Passiflora incarnata, rico em flavonoides",
      benefits: ["Redução ansiedade", "Melhora qualidade sono", "Propriedades sedativas"],
      target_symptoms: ["ansiedade", "insônia", "agitação", "nervosismo"],
      dosage_min: 500,
      dosage_max: 500,
      dosage_unit: "mg",
      timing: "evening",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: ["Gravidez", "Lactação", "Uso com sedativos"],
      interactions: ["Benzodiazepínicos", "Sedativos", "Álcool"],
      mechanism: "Agonismo parcial receptores GABA-A",
      agent_category: "Sedativo natural",
      medical_conditions: ["Ansiedade com insônia", "Agitação noturna"],
      synergy_potential: "Complementa lavender quando há componente de insônia",
      priority_level: "media"
    },
    {
      id: "ginkgo-egb761",
      name: "Ginkgo Biloba",
      category: "herb",
      description: "Extrato padronizado EGb 761 de folhas de Ginkgo biloba",
      benefits: ["Melhora circulação cerebral", "Proteção neuronal", "Melhora cognição"],
      target_symptoms: ["declínio cognitivo", "problemas memória", "concentração"],
      dosage_min: 240,
      dosage_max: 240,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: ["Anticoagulantes", "Cirurgia programada", "Epilepsia", "Hemorragia cerebral"],
      interactions: ["Varfarina", "Aspirina", "Clopidogrel", "Trazodona"],
      mechanism: "Melhora microcirculação, propriedades antioxidantes",
      agent_category: "Nootrópico circulatório",
      medical_conditions: ["Declínio cognitivo relacionado idade", "Demência leve", "Claudicação"],
      synergy_potential: "Sinergia com antioxidantes como blueberry",
      priority_level: "media"
    },
    {
      id: "blueberry-extract",
      name: "Blueberry",
      category: "other",
      description: "Extrato rico em antocianinas de Vaccinium myrtillus",
      benefits: ["Neuroproteção", "Melhora função cognitiva", "Propriedades antioxidantes"],
      target_symptoms: ["declínio cognitivo", "estresse oxidativo", "inflamação"],
      dosage_min: 25000,
      dosage_max: 25000,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: ["Nenhuma conhecida"],
      interactions: ["Não conhecidas"],
      mechanism: "Antioxidante, neuroplasticidade, anti-inflamatório",
      agent_category: "Antioxidante neuroprotetor",
      medical_conditions: ["Declínio cognitivo", "Envelhecimento cerebral"],
      synergy_potential: "Complementa ginkgo para saúde cerebral",
      priority_level: "media"
    },
    {
      id: "caffeine-anhydrous",
      name: "Cafeína",
      category: "other",
      description: "Estimulante do sistema nervoso central, metilxantina",
      benefits: ["Melhora performance", "Aumento metabolismo", "Melhora foco"],
      target_symptoms: ["fadiga", "baixa performance", "sonolência"],
      dosage_min: 200,
      dosage_max: 400,
      dosage_unit: "mg",
      timing: "morning",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: ["Arritmias", "Ansiedade severa", "Insônia", "Gravidez (>300mg)"],
      interactions: ["Estimulantes", "Broncodilatadores", "Lítio", "Clozapina"],
      mechanism: "Antagonismo adenosina, estimulação liberação catecolaminas",
      agent_category: "Estimulante metabólico",
      medical_conditions: ["Fadiga", "Performance atlética", "Composição corporal"],
      synergy_potential: "Sinergia com green tea extract para termogênese",
      priority_level: "alta"
    },
    {
      id: "green-tea-egcg",
      name: "Green Tea Extract",
      category: "herb",
      description: "Extrato padronizado rico em EGCG (epigalocatequina galato)",
      benefits: ["Termogênese", "Oxidação lipídica", "Propriedades antioxidantes"],
      target_symptoms: ["excesso peso", "baixo metabolismo", "inflamação"],
      dosage_min: 500,
      dosage_max: 1000,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: ["Hepatopatia", "Deficiência ferro", "Gravidez (altas doses)"],
      interactions: ["Anticoagulantes", "Quelantes ferro", "Betabloqueadores"],
      mechanism: "Inibição COMT, termogênese, lipólise",
      agent_category: "Termogênico natural",
      medical_conditions: ["Sobrepeso", "Síndrome metabólica", "Resistência insulínica"],
      synergy_potential: "Potencializa efeitos da cafeína na composição corporal",
      priority_level: "media"
    }
  ];
}