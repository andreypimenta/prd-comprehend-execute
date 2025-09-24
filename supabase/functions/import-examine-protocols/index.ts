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
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: corsHeaders }
    );
  }
});

function getExamineProtocols(): ExamineProtocol[] {
  return [
    {
      condition: "Body Composition",
      category: "Performance",
      supplement_combination: [
        { nome: "Dietary Protein", agente: "Whey/Casein/Plant Protein", evidencia: "A", mecanismo: "Protein synthesis stimulation, satiety enhancement" },
        { nome: "Caffeine", agente: "Caffeine Anhydrous", evidencia: "A", mecanismo: "Adenosine receptor antagonism, thermogenesis" },
        { nome: "Green Tea Extract", agente: "EGCG", evidencia: "B", mecanismo: "Catechol-O-methyltransferase inhibition, fat oxidation" },
        { nome: "L-Carnitine", agente: "L-Carnitine L-Tartrate", evidencia: "B", mecanismo: "Fatty acid β-oxidation enhancement" },
        { nome: "Chromium", agente: "Chromium Picolinate", evidencia: "D", mecanismo: "Glucose metabolism modulation" },
        { nome: "Yohimbine HCl", agente: "Yohimbine Hydrochloride", evidencia: "B", mecanismo: "α2-adrenergic receptor antagonism" }
      ],
      synergy_description: "Proteína dietética fornece substrato para síntese muscular enquanto cafeína e extrato de chá verde potencializam lipólise. L-carnitina facilita oxidação de ácidos graxos.",
      expected_efficacy: "Redução de 5-15% na gordura corporal em 12-16 semanas com treinamento adequado",
      implementation_phases: {
        fase_inicial: "Semanas 1-2: Introduzir proteína (20-30% das calorias) e cafeína (100-200mg/dia)",
        titulacao: "Semanas 3-4: Adicionar chá verde (500mg) e L-carnitina (1-2g)",
        avaliacao_resposta: "Semana 6: Avaliar composição corporal por bioimpedância ou DEXA",
        ajustes: "Semanas 7-8: Ajustar doses conforme tolerância e resultados",
        descontinuacao: "Manter proteína, reduzir estimulantes gradualmente se necessário"
      },
      monitoring_parameters: {
        baseline: "Composição corporal (DEXA/bioimpedância), medidas antropométricas",
        seguimento_inicial: "Peso semanal, medidas quinzenais",
        seguimento_regular: "Composição corporal mensal",
        parametros_laboratoriais: ["Glicose", "Perfil lipídico", "Função hepática"],
        parametros_clinicos: "Pressão arterial, frequência cardíaca de repouso"
      },
      individualization_factors: {
        fatores_idade: "Idosos: reduzir cafeína, aumentar proteína para 1.6g/kg",
        fatores_geneticos: "Metabolizadores lentos de cafeína: reduzir dose pela metade",
        comorbidades: "Hipertensão: evitar yohimbina e limitar cafeína",
        medicamentos: "Anticoagulantes: cuidado com chá verde em altas doses",
        estilo_vida: "Treino matinal: tomar cafeína 30-45min antes do exercício"
      }
    },
    {
      condition: "Anxiety",
      category: "Neurological",
      supplement_combination: [
        { nome: "Saffron", agente: "Crocin/Crocetin", evidencia: "A", mecanismo: "Serotonin and dopamine modulation" },
        { nome: "Lavender", agente: "Silexan™", evidencia: "A", mecanismo: "GABA-A receptor modulation" },
        { nome: "Passionflower", agente: "Vitexin/Isovitexin", evidencia: "B", mecanismo: "GABA receptor binding" },
        { nome: "Magnesium", agente: "Magnesium Glycinate", evidencia: "B", mecanismo: "NMDA receptor antagonism, GABAergic activity" },
        { nome: "L-Theanine", agente: "L-Theanine", evidencia: "B", mecanismo: "Alpha wave generation, GABA modulation" }
      ],
      synergy_description: "Saffron e lavanda atuam sinergicamente nos sistemas serotoninérgico e GABAérgico. Magnésio potencializa ação GABAérgica da passiflora.",
      expected_efficacy: "Redução de 30-50% nos escores de ansiedade (HAM-A, GAD-7) em 6-8 semanas",
      implementation_phases: {
        fase_inicial: "Semanas 1-2: Saffron 30mg/dia e magnésio 200mg/dia",
        titulacao: "Semanas 3-4: Adicionar lavanda 80mg e L-teanina 100mg",
        avaliacao_resposta: "Semana 6: Avaliar sintomas por escalas validadas",
        ajustes: "Semanas 7-8: Ajustar doses ou adicionar passiflora se necessário",
        descontinuacao: "Redução gradual em 2-4 semanas para evitar efeito rebote"
      },
      monitoring_parameters: {
        baseline: "HAM-A, GAD-7, DASS-21, qualidade do sono",
        seguimento_inicial: "Sintomas semanais via questionário",
        seguimento_regular: "Escalas formais a cada 2-3 semanas",
        parametros_laboratoriais: ["Cortisol salivar", "Magnésio sérico"],
        parametros_clinicos: "Pressão arterial, frequência cardíaca"
      },
      individualization_factors: {
        fatores_idade: "Idosos: iniciar com 50% da dose, monitorar sedação",
        fatores_geneticos: "Polimorfismos COMT: ajustar L-teanina conforme metabolismo",
        comorbidades: "Depressão: saffron pode ser particularmente benéfico",
        medicamentos: "Benzodiazepínicos: monitorar sedação excessiva",
        estilo_vida: "Insônia comórbida: priorizar magnésio e lavanda à noite"
      }
    },
    {
      condition: "Aerobic Exercise Performance",
      category: "Performance",
      supplement_combination: [
        { nome: "Dietary Protein", agente: "Whey/Plant Protein", evidencia: "A", mecanismo: "Muscle protein synthesis, recovery" },
        { nome: "Caffeine", agente: "Caffeine Anhydrous", evidencia: "A", mecanismo: "Adenosine antagonism, CNS stimulation" },
        { nome: "Beetroot Extract", agente: "Dietary Nitrate", evidencia: "A", mecanismo: "Nitric oxide pathway, vasodilation" },
        { nome: "Sodium Bicarbonate", agente: "NaHCO3", evidencia: "B", mecanismo: "pH buffering, lactate clearance" }
      ],
      synergy_description: "Cafeína melhora ativação neural enquanto nitrato aumenta eficiência mitocondrial. Bicarbonato de sódio tampona acidose durante exercício intenso.",
      expected_efficacy: "Melhoria de 3-8% no VO2 máx e 5-15% no tempo até exaustão",
      implementation_phases: {
        fase_inicial: "Semanas 1-2: Proteína 1.8g/kg/dia e cafeína 3mg/kg pré-treino",
        titulacao: "Semanas 3-4: Adicionar beetroot 300-600mg de nitrato 2-3h antes",
        avaliacao_resposta: "Semana 6: Teste de VO2 máx ou teste de campo",
        ajustes: "Semanas 7-8: Bicarbonato 300mg/kg para eventos >1min se tolerado",
        descontinuacao: "Manter proteína, ciclar estimulantes conforme periodização"
      },
      monitoring_parameters: {
        baseline: "VO2 máx, limiar anaeróbio, teste de tempo até exaustão",
        seguimento_inicial: "FC de treino, percepção de esforço semanal",
        seguimento_regular: "Testes de performance mensais",
        parametros_laboratoriais: ["Lactato", "CK", "LDH"],
        parametros_clinicos: "FC máx, pressão arterial de esforço"
      },
      individualization_factors: {
        fatores_idade: "Master athletes: reduzir cafeína, enfatizar recovery",
        fatores_geneticos: "Deficiência G6PD: cuidado com nitrato em altas doses",
        comorbidades: "Hipertensão: monitorar resposta ao nitrato",
        medicamentos: "Nitratos cardíacos: contraindicação para beetroot",
        estilo_vida: "Treino em altitude: aumentar foco em nitrato e buffering"
      }
    },
    {
      condition: "Anaerobic Exercise Performance",
      category: "Performance",
      supplement_combination: [
        { nome: "Creatine", agente: "Creatine Monohydrate", evidencia: "A", mecanismo: "Phosphocreatine system enhancement" },
        { nome: "Beta-Alanine", agente: "β-Alanine", evidencia: "A", mecanismo: "Carnosine synthesis, pH buffering" },
        { nome: "Caffeine", agente: "Caffeine Anhydrous", evidencia: "A", mecanismo: "CNS stimulation, calcium release" },
        { nome: "Citrulline", agente: "L-Citrulline Malate", evidencia: "B", mecanismo: "Arginine conversion, NO production" }
      ],
      synergy_description: "Creatina fornece energia imediata, beta-alanina tampona fadiga muscular. Cafeína potencializa contração muscular via liberação de cálcio.",
      expected_efficacy: "Melhoria de 5-15% na potência máxima e 10-25% em exercícios repetidos de alta intensidade",
      implementation_phases: {
        fase_inicial: "Semanas 1-2: Creatina 5g/dia e cafeína 3-6mg/kg pré-treino",
        titulacao: "Semanas 3-6: Beta-alanina 3.2g/dia (dividida em doses)",
        avaliacao_resposta: "Semana 8: Testes de potência (Wingate, 1RM)",
        ajustes: "Semanas 9-12: Citrulina 6-8g se foco em volume de treino",
        descontinuacao: "Manter creatina, ciclar outros conforme mesociclos"
      },
      monitoring_parameters: {
        baseline: "Potência máxima, teste de Wingate, 1RM principais exercícios",
        seguimento_inicial: "Volume de treino semanal, RPE",
        seguimento_regular: "Testes de potência mensais",
        parametros_laboratoriais: ["CK", "Creatinina", "Ureia"],
        parametros_clinicos: "Peso corporal, retenção hídrica"
      },
      individualization_factors: {
        fatores_idade: "Jovens: maior resposta à creatina, idosos: enfoque em beta-alanina",
        fatores_geneticos: "Não responsivos à creatina: enfatizar outros componentes",
        comorbidades: "Doença renal: evitar creatina, monitorar função renal",
        medicamentos: "Diuréticos: ajustar hidratação com creatina",
        estilo_vida: "Vegetarianos: maior resposta esperada à creatina"
      }
    },
    {
      condition: "Allergic Rhinitis",
      category: "Immunological",
      supplement_combination: [
        { nome: "Vitamin D3", agente: "Cholecalciferol", evidencia: "B", mecanismo: "Immune modulation, Th1/Th2 balance" },
        { nome: "Black Seed Oil", agente: "Thymoquinone", evidencia: "B", mecanismo: "Anti-inflammatory, histamine modulation" },
        { nome: "Quercetin", agente: "Quercetin Dihydrate", evidencia: "B", mecanismo: "Mast cell stabilization, histamine release inhibition" },
        { nome: "Butterbur", agente: "Petasites extract", evidencia: "A", mecanismo: "Leukotriene synthesis inhibition" }
      ],
      synergy_description: "Vitamina D modula resposta imune sistêmica enquanto quercetina estabiliza mastócitos localmente. Butterbur inibe leucotrienos pró-inflamatórios.",
      expected_efficacy: "Redução de 40-60% nos escores de sintomas nasais em 4-8 semanas",
      implementation_phases: {
        fase_inicial: "Semanas 1-2: Vitamina D3 1000 UI/dia, avaliar níveis séricos",
        titulacao: "Semanas 3-4: Quercetina 500mg 2x/dia, black seed oil 500mg/dia",
        avaliacao_resposta: "Semana 6: Escala de sintomas nasais, qualidade de vida",
        ajustes: "Semanas 7-8: Butterbur 75mg 2x/dia se sintomas persistentes",
        descontinuacao: "Manter vitamina D, reduzir outros no final da estação alérgica"
      },
      monitoring_parameters: {
        baseline: "25(OH)D sérica, IgE total e específica, eosinofilia",
        seguimento_inicial: "Sintomas diários via diário de sintomas",
        seguimento_regular: "Escala RQLQ quinzenal",
        parametros_laboratoriais: ["25(OH)D", "IgE", "Eosinófilos"],
        parametros_clinicos: "Fluxo nasal, teste de provocação se disponível"
      },
      individualization_factors: {
        fatores_idade: "Crianças: doses ajustadas por peso, evitar butterbur <12 anos",
        fatores_geneticos: "Polimorfismos VDR: podem necessitar doses maiores de vitamina D",
        comorbidades: "Asma: butterbur pode ser particularmente benéfico",
        medicamentos: "Anti-histamínicos: podem ser reduzidos gradualmente",
        estilo_vida: "Exposição sazonal: iniciar protocolo 4-6 semanas antes da estação"
      }
    },
    {
      condition: "Acute Respiratory Infection",
      category: "Immunological",
      supplement_combination: [
        { nome: "Vitamin C", agente: "Ascorbic Acid", evidencia: "B", mecanismo: "Immune cell function, antioxidant activity" },
        { nome: "Zinc", agente: "Zinc Acetate", evidencia: "A", mecanismo: "Viral replication inhibition, immune function" },
        { nome: "Vitamin D3", agente: "Cholecalciferol", evidencia: "A", mecanismo: "Antimicrobial peptide production" },
        { nome: "Elderberry", agente: "Sambucus extract", evidencia: "B", mecanismo: "Antiviral activity, cytokine modulation" },
        { nome: "Aged Garlic", agente: "Allicin precursors", evidencia: "B", mecanismo: "Antimicrobial, immune enhancement" }
      ],
      synergy_description: "Zinco e vitamina D fortalecem imunidade innata, enquanto vitamina C e elderberry modulam resposta inflamatória. Alho fornece ação antimicrobiana direta.",
      expected_efficacy: "Redução de 20-40% na duração e 30-50% na severidade dos sintomas",
      implementation_phases: {
        fase_inicial: "Primeiras 24-48h: Zinco 75mg, vitamina C 1000mg, vitamina D 4000 UI",
        titulacao: "Dias 3-5: Elderberry 600mg 3x/dia, alho 600mg 2x/dia",
        avaliacao_resposta: "Dia 7: Avaliação de sintomas e necessidade de continuação",
        ajustes: "Dias 8-14: Reduzir doses se melhora, manter se sintomas persistem",
        descontinuacao: "Retornar a doses de manutenção de vitamina D e C"
      },
      monitoring_parameters: {
        baseline: "Severidade de sintomas, temperatura corporal",
        seguimento_inicial: "Sintomas diários, temperatura 2x/dia",
        seguimento_regular: "Escala de severidade a cada 2-3 dias",
        parametros_laboratoriais: ["Leucograma se disponível"],
        parametros_clinicos: "Oximetria se dispneia, pressão arterial"
      },
      individualization_factors: {
        fatores_idade: "Idosos: doses mais altas de vitamina D (5000 UI), monitorar hidratação",
        fatores_geneticos: "Deficiência genética de vitamina D: doses maiores necessárias",
        comorbidades: "Imunocomprometidos: evitar doses muito altas de zinco",
        medicamentos: "Anticoagulantes: cuidado com alho em altas doses",
        estilo_vida: "Início precoce: melhores resultados se iniciado nas primeiras 24-48h"
      }
    },
    {
      condition: "Age-Associated Memory Impairment",
      category: "Neurological",
      supplement_combination: [
        { nome: "Ginkgo Biloba", agente: "EGb 761", evidencia: "B", mecanismo: "Cerebral circulation, neuroprotection" },
        { nome: "Blueberry Extract", agente: "Anthocyanins", evidencia: "B", mecanismo: "Neuroplasticity, antioxidant activity" },
        { nome: "Omega-3", agente: "EPA/DHA", evidencia: "A", mecanismo: "Membrane fluidity, neuroinflammation modulation" },
        { nome: "Phosphatidylserine", agente: "PS", evidencia: "B", mecanismo: "Cell membrane integrity, neurotransmitter function" }
      ],
      synergy_description: "Ginkgo melhora circulação cerebral enquanto ômega-3 otimiza função de membrana. Antocianinas promovem neuroplasticidade e PS suporta neurotransmissão.",
      expected_efficacy: "Melhoria de 10-25% em testes de memória e função executiva em 12-24 semanas",
      implementation_phases: {
        fase_inicial: "Semanas 1-4: Ômega-3 1000mg EPA+DHA e ginkgo 120mg 2x/dia",
        titulacao: "Semanas 5-8: Blueberry extract 500mg e fosfatidilserina 100mg 2x/dia",
        avaliacao_resposta: "Semana 12: Bateria neuropsicológica, MOCA/MMSE",
        ajustes: "Semanas 13-16: Aumentar ginkgo para 240mg se resposta parcial",
        descontinuacao: "Manter ômega-3, avaliar necessidade de outros componentes"
      },
      monitoring_parameters: {
        baseline: "MOCA, MMSE, testes de memória episódica e working memory",
        seguimento_inicial: "Questionário subjetivo de memória mensal",
        seguimento_regular: "Bateria neuropsicológica a cada 3 meses",
        parametros_laboratoriais: ["Perfil lipídico", "B12", "Folato", "TSH"],
        parametros_clinicos: "Pressão arterial, avaliação cardiovascular"
      },
      individualization_factors: {
        fatores_idade: "75+ anos: iniciar com doses menores, titulação mais lenta",
        fatores_geneticos: "APOE4: pode necessitar doses maiores de ômega-3",
        comorbidades: "Diabetes: ginkgo pode afetar glicemia",
        medicamentos: "Anticoagulantes: monitorar INR com ginkgo",
        estilo_vida: "Exercício cognitivo: combinar com treinamento cerebral"
      }
    },
    {
      condition: "Atherosclerosis",
      category: "Cardiovascular",
      supplement_combination: [
        { nome: "Extra Virgin Olive Oil", agente: "Oleic acid, polyphenols", evidencia: "A", mecanismo: "Anti-inflammatory, endothelial function" },
        { nome: "Cocoa Extract", agente: "Flavanols", evidencia: "A", mecanismo: "Nitric oxide, vascular function" },
        { nome: "Omega-3", agente: "EPA/DHA", evidencia: "A", mecanismo: "Anti-inflammatory, plaque stabilization" },
        { nome: "Aged Garlic Extract", agente: "S-allylcysteine", evidencia: "B", mecanismo: "Cholesterol reduction, plaque regression" }
      ],
      synergy_description: "Azeite e cacau melhoram função endotelial sinergicamente. Ômega-3 estabiliza placas enquanto alho reduz progressão aterosclerótica.",
      expected_efficacy: "Redução de 10-30% na progressão de placas e melhoria de 15-25% na função endotelial em 6-12 meses",
      implementation_phases: {
        fase_inicial: "Semanas 1-4: EVOO 25g/dia e ômega-3 2g EPA+DHA",
        titulacao: "Semanas 5-8: Cacau 2.5-10g/dia e aged garlic 1200mg",
        avaliacao_resposta: "Mês 3: Ultrassom carotídeo, FMD se disponível",
        ajustes: "Meses 4-6: Ajustar doses conforme tolerância e biomarcadores",
        descontinuacao: "Protocolo de longo prazo, monitorar adesão e eficácia"
      },
      monitoring_parameters: {
        baseline: "Espessura íntima-média carotídea, perfil lipídico completo, PCR-us",
        seguimento_inicial: "Pressão arterial semanal, sintomas cardiovasculares",
        seguimento_regular: "Perfil lipídico e PCR a cada 2-3 meses",
        parametros_laboratoriais: ["Colesterol total", "LDL", "HDL", "TG", "PCR-us", "Lp(a)"],
        parametros_clinicos: "PA, IMC, circunferência abdominal"
      },
      individualization_factors: {
        fatores_idade: "Idosos: monitorar função renal com ômega-3 em altas doses",
        fatores_geneticos: "Hipercolesterolemia familiar: pode necessitar terapia adicional",
        comorbidades: "Diabetes: cacau pode melhorar sensibilidade à insulina",
        medicamentos: "Estatinas: sinergia com protocolo, monitorar CK",
        estilo_vida: "Dieta mediterrânea: protocolo integra bem com padrão alimentar"
      }
    },
    {
      condition: "Bipolar Disorder",
      category: "Neurological",
      supplement_combination: [
        { nome: "Fish Oil", agente: "EPA/DHA 2:1 ratio", evidencia: "A", mecanismo: "Neuroinflammation modulation, membrane stability" },
        { nome: "Saffron", agente: "Crocin/Crocetin", evidencia: "B", mecanismo: "Monoamine modulation, neuroprotection" },
        { nome: "Vitamin D3", agente: "Cholecalciferol", evidencia: "B", mecanismo: "Neurotransmitter synthesis, seasonal mood regulation" },
        { nome: "N-Acetylcysteine", agente: "NAC", evidencia: "B", mecanismo: "Glutamate modulation, oxidative stress reduction" }
      ],
      synergy_description: "EPA/DHA estabilizam membranas neuronais enquanto saffron modula neurotransmissores. NAC reduz estresse oxidativo e vitamina D suporta síntese de neurotransmissores.",
      expected_efficacy: "Redução de 20-40% na frequência e severidade de episódios de humor em 3-6 meses",
      implementation_phases: {
        fase_inicial: "Semanas 1-4: Fish oil 1g EPA+DHA (2:1) e vitamina D 2000 UI",
        titulacao: "Semanas 5-8: Saffron 30mg/dia e NAC 1000mg 2x/dia",
        avaliacao_resposta: "Mês 3: Escalas de humor (YMRS, MADRS), estabilidade",
        ajustes: "Meses 4-6: Aumentar fish oil para 2g se necessário",
        descontinuacao: "Protocolo adjuvante de longo prazo, não substituir medicação"
      },
      monitoring_parameters: {
        baseline: "YMRS, MADRS, CGI-BP, 25(OH)D sérica",
        seguimento_inicial: "Mood chart diário, efeitos adversos semanais",
        seguimento_regular: "Escalas formais mensais",
        parametros_laboratoriais: ["25(OH)D", "Lítio sérico se aplicável", "Função hepática"],
        parametros_clinicos: "Peso, sono, episódios de humor"
      },
      individualization_factors: {
        fatores_idade: "Jovens: maior monitoramento de ideação suicida",
        fatores_geneticos: "Polimorfismos FADS: podem afetar metabolismo de ômega-3",
        comorbidades: "Ansiedade comórbida: saffron pode ser particularmente útil",
        medicamentos: "Estabilizadores de humor: protocolo é adjuvante, não substituto",
        estilo_vida: "Ritmos circadianos: vitamina D matinal, fish oil com refeições"
      }
    }
  ];
}

function getExamineSupplements(): ExamineSupplementData[] {
  return [
    {
      id: "dietary-protein",
      name: "Dietary Protein",
      category: "amino_acid",
      description: "High-quality protein sources including whey, casein, and plant-based proteins for muscle synthesis and body composition.",
      benefits: [
        "Enhances muscle protein synthesis",
        "Increases satiety and metabolic rate",
        "Supports lean mass preservation",
        "Improves body composition"
      ],
      target_symptoms: [
        "muscle loss",
        "poor body composition",
        "low satiety",
        "metabolic dysfunction"
      ],
      dosage_min: 1.6,
      dosage_max: 3.0,
      dosage_unit: "g/kg",
      timing: "with_meal",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Severe kidney disease",
        "Protein metabolism disorders"
      ],
      interactions: [
        "May affect absorption of certain medications if taken simultaneously"
      ],
      mechanism: "Stimulates mTOR pathway and muscle protein synthesis while increasing thermogenesis"
    },
    {
      id: "caffeine-anhydrous",
      name: "Caffeine",
      category: "other",
      description: "Pure caffeine for enhanced performance, alertness, and fat oxidation through adenosine receptor antagonism.",
      benefits: [
        "Increases energy and alertness",
        "Enhances fat oxidation",
        "Improves exercise performance",
        "Boosts metabolic rate"
      ],
      target_symptoms: [
        "fatigue",
        "low energy",
        "poor exercise performance",
        "metabolic sluggishness"
      ],
      dosage_min: 100,
      dosage_max: 400,
      dosage_unit: "mg",
      timing: "morning",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Pregnancy",
        "Heart arrhythmias",
        "Severe anxiety disorders",
        "Hypertension (uncontrolled)"
      ],
      interactions: [
        "MAO inhibitors",
        "Stimulant medications",
        "Blood thinners"
      ],
      mechanism: "Adenosine receptor antagonism leading to increased alertness and lipolysis"
    },
    {
      id: "green-tea-extract",
      name: "Green Tea Extract",
      category: "herb",
      description: "Standardized extract rich in EGCG and catechins for metabolic enhancement and fat oxidation.",
      benefits: [
        "Enhances fat oxidation",
        "Provides antioxidant protection",
        "Supports metabolic health",
        "May improve insulin sensitivity"
      ],
      target_symptoms: [
        "poor fat metabolism",
        "oxidative stress",
        "metabolic dysfunction",
        "inflammation"
      ],
      dosage_min: 300,
      dosage_max: 800,
      dosage_unit: "mg",
      timing: "with_meal",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Iron deficiency",
        "Liver disease",
        "Pregnancy"
      ],
      interactions: [
        "Iron supplements",
        "Blood thinners",
        "Stimulant medications"
      ],
      mechanism: "COMT inhibition and increased norepinephrine-induced lipolysis"
    },
    {
      id: "l-carnitine",
      name: "L-Carnitine",
      category: "amino_acid",
      description: "Amino acid derivative essential for fatty acid oxidation and cellular energy production.",
      benefits: [
        "Enhances fat oxidation",
        "Improves exercise recovery",
        "Supports cellular energy",
        "May reduce muscle damage"
      ],
      target_symptoms: [
        "poor fat metabolism",
        "exercise fatigue",
        "slow recovery",
        "low energy"
      ],
      dosage_min: 1000,
      dosage_max: 3000,
      dosage_unit: "mg",
      timing: "with_meal",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Seizure disorders",
        "Thyroid disorders (hyperthyroid)"
      ],
      interactions: [
        "Anticoagulants",
        "Thyroid hormones"
      ],
      mechanism: "Facilitates fatty acid transport into mitochondria for β-oxidation"
    },
    {
      id: "saffron-extract",
      name: "Saffron",
      category: "herb",
      description: "Premium spice extract rich in crocin and crocetin, clinically studied for mood and appetite regulation.",
      benefits: [
        "Reduces anxiety and depression",
        "Improves mood stability",
        "May reduce appetite",
        "Supports emotional wellbeing"
      ],
      target_symptoms: [
        "anxiety",
        "depression",
        "mood swings",
        "emotional eating",
        "bipolar symptoms"
      ],
      dosage_min: 15,
      dosage_max: 30,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Pregnancy (high doses)",
        "Bipolar disorder (manic phase)"
      ],
      interactions: [
        "Antidepressants",
        "Mood stabilizers"
      ],
      mechanism: "Modulates serotonin, dopamine, and norepinephrine neurotransmission"
    },
    {
      id: "lavender-oil",
      name: "Lavender",
      category: "herb",
      description: "Standardized lavender oil extract (Silexan™) clinically proven for anxiety reduction.",
      benefits: [
        "Reduces anxiety effectively",
        "Improves sleep quality",
        "Calming without sedation",
        "Supports relaxation"
      ],
      target_symptoms: [
        "anxiety",
        "restlessness",
        "sleep disturbances",
        "nervous tension"
      ],
      dosage_min: 80,
      dosage_max: 160,
      dosage_unit: "mg",
      timing: "evening",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Severe respiratory conditions"
      ],
      interactions: [
        "Sedative medications",
        "CNS depressants"
      ],
      mechanism: "GABA-A receptor modulation and calcium channel effects"
    },
    {
      id: "magnesium-glycinate",
      name: "Magnesium",
      category: "mineral",
      description: "Essential mineral in highly bioavailable chelated form for neurological and muscular function.",
      benefits: [
        "Reduces anxiety and stress",
        "Improves sleep quality",
        "Supports muscle function",
        "Enhances relaxation"
      ],
      target_symptoms: [
        "anxiety",
        "muscle tension",
        "sleep disturbances",
        "stress"
      ],
      dosage_min: 200,
      dosage_max: 400,
      dosage_unit: "mg",
      timing: "evening",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Severe kidney disease",
        "Heart block"
      ],
      interactions: [
        "Antibiotics",
        "Diuretics",
        "Muscle relaxants"
      ],
      mechanism: "NMDA receptor antagonism and GABAergic neurotransmission enhancement"
    },
    {
      id: "beetroot-extract",
      name: "Beetroot Extract",
      category: "other",
      description: "Natural source of dietary nitrates for enhanced vascular function and exercise performance.",
      benefits: [
        "Improves exercise performance",
        "Enhances blood flow",
        "Reduces oxygen consumption",
        "Supports vascular health"
      ],
      target_symptoms: [
        "poor exercise performance",
        "cardiovascular issues",
        "low endurance",
        "poor circulation"
      ],
      dosage_min: 300,
      dosage_max: 600,
      dosage_unit: "mg nitrate",
      timing: "any",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Kidney stones (oxalate)",
        "Low blood pressure"
      ],
      interactions: [
        "Blood pressure medications",
        "Erectile dysfunction drugs"
      ],
      mechanism: "Nitric oxide pathway enhancement via nitrate-nitrite conversion"
    },
    {
      id: "creatine-monohydrate",
      name: "Creatine",
      category: "amino_acid",
      description: "Most researched sports supplement for power, strength, and high-intensity exercise performance.",
      benefits: [
        "Increases power output",
        "Enhances muscle mass",
        "Improves high-intensity performance",
        "Supports brain function"
      ],
      target_symptoms: [
        "low power output",
        "poor anaerobic performance",
        "muscle fatigue",
        "cognitive fatigue"
      ],
      dosage_min: 3,
      dosage_max: 5,
      dosage_unit: "g",
      timing: "any",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Kidney disease",
        "Dehydration tendency"
      ],
      interactions: [
        "Diuretics",
        "NSAIDs (chronic use)"
      ],
      mechanism: "Phosphocreatine system enhancement for rapid ATP regeneration"
    },
    {
      id: "beta-alanine",
      name: "Beta-Alanine",
      category: "amino_acid",
      description: "Non-essential amino acid that increases muscle carnosine for enhanced muscular endurance.",
      benefits: [
        "Reduces muscular fatigue",
        "Improves high-intensity endurance",
        "Enhances training capacity",
        "Buffers muscle pH"
      ],
      target_symptoms: [
        "muscle fatigue",
        "poor muscular endurance",
        "training limitations",
        "lactate accumulation"
      ],
      dosage_min: 3200,
      dosage_max: 6400,
      dosage_unit: "mg",
      timing: "with_meal",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Severe tingling intolerance"
      ],
      interactions: [
        "None significant"
      ],
      mechanism: "Carnosine synthesis enhancement for intramuscular pH buffering"
    },
    {
      id: "vitamin-d3",
      name: "Vitamin D3",
      category: "vitamin",
      description: "Essential fat-soluble vitamin crucial for immune function, bone health, and mood regulation.",
      benefits: [
        "Supports immune function",
        "Improves mood and cognition",
        "Enhances bone health",
        "Reduces inflammation"
      ],
      target_symptoms: [
        "frequent infections",
        "mood disorders",
        "bone weakness",
        "autoimmune conditions",
        "seasonal depression"
      ],
      dosage_min: 1000,
      dosage_max: 4000,
      dosage_unit: "IU",
      timing: "morning",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Hypercalcemia",
        "Kidney stones",
        "Sarcoidosis"
      ],
      interactions: [
        "Thiazide diuretics",
        "Cardiac glycosides"
      ],
      mechanism: "Immune modulation and antimicrobial peptide production"
    },
    {
      id: "zinc-acetate",
      name: "Zinc",
      category: "mineral",
      description: "Essential trace mineral critical for immune function and viral resistance.",
      benefits: [
        "Enhances immune function",
        "Reduces infection duration",
        "Supports wound healing",
        "Antiviral properties"
      ],
      target_symptoms: [
        "frequent infections",
        "slow healing",
        "immune dysfunction",
        "viral infections"
      ],
      dosage_min: 15,
      dosage_max: 75,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Wilson's disease",
        "Copper deficiency"
      ],
      interactions: [
        "Antibiotics",
        "Iron supplements",
        "Copper supplements"
      ],
      mechanism: "Viral replication inhibition and immune cell function enhancement"
    },
    {
      id: "elderberry-extract",
      name: "Elderberry",
      category: "herb",
      description: "Antiviral berry extract rich in anthocyanins for immune support and respiratory health.",
      benefits: [
        "Reduces infection duration",
        "Antiviral properties",
        "Immune system support",
        "Anti-inflammatory effects"
      ],
      target_symptoms: [
        "viral infections",
        "cold symptoms",
        "flu symptoms",
        "respiratory infections"
      ],
      dosage_min: 300,
      dosage_max: 600,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Autoimmune diseases",
        "Diabetes (monitor glucose)"
      ],
      interactions: [
        "Immunosuppressants",
        "Diabetes medications"
      ],
      mechanism: "Viral neuraminidase inhibition and cytokine modulation"
    },
    {
      id: "ginkgo-biloba",
      name: "Ginkgo Biloba",
      category: "herb",
      description: "Standardized extract (EGb 761) for cognitive enhancement and cerebral circulation.",
      benefits: [
        "Improves memory function",
        "Enhances circulation",
        "Supports cognitive health",
        "Neuroprotective effects"
      ],
      target_symptoms: [
        "memory problems",
        "cognitive decline",
        "poor circulation",
        "mental fatigue"
      ],
      dosage_min: 120,
      dosage_max: 240,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Bleeding disorders",
        "Seizure history",
        "Surgery (2 weeks prior)"
      ],
      interactions: [
        "Anticoagulants",
        "Antiplatelet drugs",
        "MAO inhibitors"
      ],
      mechanism: "Cerebral circulation enhancement and neuroprotective antioxidant activity"
    },
    {
      id: "omega-3-fatty-acids",
      name: "Omega-3",
      category: "other",
      description: "Essential fatty acids EPA and DHA for cardiovascular, neurological, and anti-inflammatory benefits.",
      benefits: [
        "Reduces inflammation",
        "Supports heart health",
        "Enhances brain function",
        "Improves mood stability"
      ],
      target_symptoms: [
        "inflammation",
        "cardiovascular disease",
        "cognitive decline",
        "mood disorders",
        "joint pain"
      ],
      dosage_min: 1000,
      dosage_max: 3000,
      dosage_unit: "mg EPA+DHA",
      timing: "with_meal",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Fish/seafood allergy",
        "Bleeding disorders (high doses)"
      ],
      interactions: [
        "Anticoagulants",
        "Blood pressure medications"
      ],
      mechanism: "Cell membrane incorporation and specialized pro-resolving mediator production"
    },
    {
      id: "cocoa-extract",
      name: "Cocoa Extract",
      category: "other",
      description: "Flavanol-rich cocoa extract for cardiovascular health and cognitive function.",
      benefits: [
        "Improves vascular function",
        "Lowers blood pressure",
        "Enhances cognitive performance",
        "Antioxidant protection"
      ],
      target_symptoms: [
        "high blood pressure",
        "poor circulation",
        "cognitive decline",
        "cardiovascular risk"
      ],
      dosage_min: 200,
      dosage_max: 900,
      dosage_unit: "mg flavanols",
      timing: "any",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Caffeine sensitivity",
        "GERD (large doses)"
      ],
      interactions: [
        "MAO inhibitors",
        "Stimulant medications"
      ],
      mechanism: "Nitric oxide enhancement and endothelial function improvement"
    },
    {
      id: "n-acetylcysteine",
      name: "N-Acetylcysteine",
      category: "amino_acid",
      description: "Precursor to glutathione with potent antioxidant and neuroprotective properties.",
      benefits: [
        "Reduces oxidative stress",
        "Supports respiratory health",
        "Enhances mood stability",
        "Liver detoxification"
      ],
      target_symptoms: [
        "oxidative stress",
        "respiratory conditions",
        "mood disorders",
        "liver dysfunction",
        "addiction recovery"
      ],
      dosage_min: 1000,
      dosage_max: 2400,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Peptic ulcers",
        "Severe asthma"
      ],
      interactions: [
        "Nitroglycerine",
        "Activated charcoal"
      ],
      mechanism: "Glutathione synthesis and glutamate modulation"
    },
    {
      id: "quercetin",
      name: "Quercetin",
      category: "other",
      description: "Powerful bioflavonoid with anti-inflammatory and mast cell stabilizing properties.",
      benefits: [
        "Reduces allergic reactions",
        "Anti-inflammatory effects",
        "Antioxidant protection",
        "Immune modulation"
      ],
      target_symptoms: [
        "allergies",
        "inflammation",
        "respiratory symptoms",
        "oxidative stress"
      ],
      dosage_min: 500,
      dosage_max: 1000,
      dosage_unit: "mg",
      timing: "with_meal",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Kidney disease (high doses)"
      ],
      interactions: [
        "Antibiotics",
        "Chemotherapy drugs"
      ],
      mechanism: "Mast cell stabilization and histamine release inhibition"
    },
    {
      id: "butterbur-extract",
      name: "Butterbur",
      category: "herb",
      description: "Petasites extract standardized for petasins, clinically proven for allergic rhinitis.",
      benefits: [
        "Reduces nasal congestion",
        "Anti-inflammatory effects",
        "Migraine prevention",
        "Respiratory support"
      ],
      target_symptoms: [
        "allergic rhinitis",
        "nasal congestion",
        "migraines",
        "respiratory allergies"
      ],
      dosage_min: 50,
      dosage_max: 150,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Pregnancy",
        "Liver disease",
        "Age under 12"
      ],
      interactions: [
        "Hepatotoxic drugs"
      ],
      mechanism: "Leukotriene synthesis inhibition and anti-inflammatory activity"
    },
    {
      id: "passionflower-extract",
      name: "Passionflower",
      category: "herb",
      description: "Herbal extract with GABAergic activity for anxiety and sleep support.",
      benefits: [
        "Reduces anxiety naturally",
        "Improves sleep quality",
        "Calming effects",
        "Supports relaxation"
      ],
      target_symptoms: [
        "anxiety",
        "insomnia",
        "restlessness",
        "nervous tension"
      ],
      dosage_min: 400,
      dosage_max: 800,
      dosage_unit: "mg",
      timing: "evening",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Sedative medications",
        "Pregnancy"
      ],
      interactions: [
        "CNS depressants",
        "Sedatives"
      ],
      mechanism: "GABA receptor binding and anxiolytic activity"
    },
    {
      id: "l-theanine",
      name: "L-Theanine",
      category: "amino_acid",
      description: "Amino acid from tea leaves that promotes relaxation without sedation.",
      benefits: [
        "Promotes calm alertness",
        "Reduces stress without drowsiness",
        "Improves focus",
        "Enhances sleep quality"
      ],
      target_symptoms: [
        "anxiety",
        "stress",
        "poor focus",
        "restlessness"
      ],
      dosage_min: 100,
      dosage_max: 400,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Severe hypotension"
      ],
      interactions: [
        "Blood pressure medications"
      ],
      mechanism: "Alpha wave generation and GABA modulation"
    },
    {
      id: "sodium-bicarbonate",
      name: "Sodium Bicarbonate",
      category: "other",
      description: "Alkalizing agent for exercise performance enhancement through pH buffering.",
      benefits: [
        "Buffers muscle acidosis",
        "Improves high-intensity performance",
        "Delays fatigue",
        "Enhances power output"
      ],
      target_symptoms: [
        "muscle fatigue",
        "poor anaerobic performance",
        "exercise limitations",
        "lactate accumulation"
      ],
      dosage_min: 200,
      dosage_max: 500,
      dosage_unit: "mg/kg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Hypertension",
        "Heart conditions",
        "Kidney disease"
      ],
      interactions: [
        "Blood pressure medications",
        "Diuretics"
      ],
      mechanism: "Extracellular pH buffering and lactate clearance enhancement"
    },
    {
      id: "citrulline-malate",
      name: "Citrulline",
      category: "amino_acid",
      description: "Non-essential amino acid that converts to arginine for nitric oxide production.",
      benefits: [
        "Enhances blood flow",
        "Improves exercise performance",
        "Reduces muscle soreness",
        "Supports vascular health"
      ],
      target_symptoms: [
        "poor exercise performance",
        "muscle fatigue",
        "poor circulation",
        "slow recovery"
      ],
      dosage_min: 3000,
      dosage_max: 8000,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Severe kidney disease"
      ],
      interactions: [
        "Blood pressure medications"
      ],
      mechanism: "Arginine conversion and nitric oxide production enhancement"
    },
    {
      id: "blueberry-extract",
      name: "Blueberry Extract",
      category: "other",
      description: "Anthocyanin-rich berry extract for cognitive enhancement and antioxidant support.",
      benefits: [
        "Improves memory function",
        "Enhances cognitive performance",
        "Provides antioxidant protection",
        "Supports neuroplasticity"
      ],
      target_symptoms: [
        "memory problems",
        "cognitive decline",
        "mental fatigue",
        "oxidative stress"
      ],
      dosage_min: 300,
      dosage_max: 600,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Blood sugar disorders (monitor glucose)"
      ],
      interactions: [
        "Diabetes medications"
      ],
      mechanism: "Anthocyanin-mediated neuroplasticity and antioxidant activity"
    },
    {
      id: "phosphatidylserine",
      name: "Phosphatidylserine",
      category: "other",
      description: "Phospholipid essential for cell membrane integrity and neurotransmitter function.",
      benefits: [
        "Supports memory function",
        "Enhances cognitive performance",
        "Improves cell membrane health",
        "Supports neurotransmitter function"
      ],
      target_symptoms: [
        "memory problems",
        "cognitive decline",
        "mental fatigue",
        "stress"
      ],
      dosage_min: 100,
      dosage_max: 300,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Blood clotting disorders"
      ],
      interactions: [
        "Anticoagulants"
      ],
      mechanism: "Cell membrane integrity maintenance and neurotransmitter optimization"
    },
    {
      id: "extra-virgin-olive-oil",
      name: "Extra Virgin Olive Oil",
      category: "other",
      description: "Premium olive oil rich in monounsaturated fats and polyphenols for cardiovascular health.",
      benefits: [
        "Improves cardiovascular health",
        "Anti-inflammatory effects",
        "Supports endothelial function",
        "Provides antioxidant protection"
      ],
      target_symptoms: [
        "cardiovascular disease",
        "inflammation",
        "poor circulation",
        "oxidative stress"
      ],
      dosage_min: 20,
      dosage_max: 40,
      dosage_unit: "g",
      timing: "with_meal",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Severe gallbladder disease"
      ],
      interactions: [
        "Blood thinning medications (high doses)"
      ],
      mechanism: "Oleic acid and polyphenol-mediated anti-inflammatory and endothelial effects"
    },
    {
      id: "aged-garlic-extract",
      name: "Aged Garlic Extract",
      category: "herb",
      description: "Aged garlic preparation with enhanced bioavailability and cardiovascular benefits.",
      benefits: [
        "Supports cardiovascular health",
        "May reduce cholesterol",
        "Immune system support",
        "Antioxidant protection"
      ],
      target_symptoms: [
        "cardiovascular disease",
        "high cholesterol",
        "immune dysfunction",
        "inflammation"
      ],
      dosage_min: 600,
      dosage_max: 1200,
      dosage_unit: "mg",
      timing: "with_meal",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Bleeding disorders",
        "Surgery (2 weeks prior)"
      ],
      interactions: [
        "Anticoagulants",
        "Blood pressure medications"
      ],
      mechanism: "S-allylcysteine-mediated cholesterol reduction and plaque stabilization"
    },
    {
      id: "fish-oil",
      name: "Fish Oil",
      category: "other",
      description: "High-quality omega-3 fatty acids with optimal EPA/DHA ratios for mood and neurological support.",
      benefits: [
        "Supports mood stability",
        "Reduces inflammation",
        "Enhances brain function",
        "Cardiovascular protection"
      ],
      target_symptoms: [
        "mood disorders",
        "depression",
        "bipolar symptoms",
        "inflammation",
        "cognitive decline"
      ],
      dosage_min: 1000,
      dosage_max: 3000,
      dosage_unit: "mg EPA+DHA",
      timing: "with_meal",
      evidence_level: "strong",
      scientific_evidence: "A",
      contraindications: [
        "Fish allergy",
        "Bleeding disorders (high doses)"
      ],
      interactions: [
        "Anticoagulants",
        "Blood pressure medications"
      ],
      mechanism: "Neuronal membrane stabilization and neuroinflammation modulation"
    },
    {
      id: "black-seed-oil",
      name: "Black Seed Oil",
      category: "herb",
      description: "Nigella sativa oil rich in thymoquinone with anti-inflammatory and immune-modulating properties.",
      benefits: [
        "Reduces allergic symptoms",
        "Anti-inflammatory effects",
        "Immune system modulation",
        "Respiratory support"
      ],
      target_symptoms: [
        "allergic rhinitis",
        "asthma",
        "inflammation",
        "immune dysfunction"
      ],
      dosage_min: 500,
      dosage_max: 2000,
      dosage_unit: "mg",
      timing: "with_meal",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Pregnancy",
        "Bleeding disorders"
      ],
      interactions: [
        "Anticoagulants",
        "Diabetes medications"
      ],
      mechanism: "Thymoquinone-mediated anti-inflammatory and histamine modulation"
    },
    {
      id: "vitamin-c",
      name: "Vitamin C",
      category: "vitamin",
      description: "Essential water-soluble vitamin crucial for immune function and antioxidant protection.",
      benefits: [
        "Enhances immune function",
        "Powerful antioxidant effects",
        "Supports collagen synthesis",
        "Reduces infection duration"
      ],
      target_symptoms: [
        "frequent infections",
        "slow healing",
        "oxidative stress",
        "immune dysfunction"
      ],
      dosage_min: 500,
      dosage_max: 2000,
      dosage_unit: "mg",
      timing: "any",
      evidence_level: "moderate",
      scientific_evidence: "B",
      contraindications: [
        "Kidney stones (oxalate)",
        "Iron overload disorders"
      ],
      interactions: [
        "Iron supplements (enhances absorption)",
        "Chemotherapy drugs"
      ],
      mechanism: "Immune cell function enhancement and antioxidant activity"
    }
  ];
}