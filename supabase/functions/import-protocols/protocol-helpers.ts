// Helper functions for enhanced protocol generation

interface SupplementInMatrix {
  nome: string;
  agente: string;
  evidencia: 'A' | 'B' | 'D';
  mecanismo: string;
}

export function mapPriorityFromEvidence(evidencia: string): string {
  const priorityMap: { [key: string]: string } = {
    'A': 'muito_alta',
    'B': 'alta', 
    'D': 'media'
  };
  return priorityMap[evidencia] || 'media';
}

export function categorizeByCondition(condition: string): string {
  const conditionMap: { [key: string]: string } = {
    'CARDIOVASCULAR': 'Cardiometabólica',
    'NEUROLÓGICO': 'Neurológica',
    'IMUNOLÓGICO': 'Imunológica',
    'DIGESTIVO': 'Gastroenterológica',
    'ENDÓCRINO': 'Endocrinológica',
    'MUSCULOESQUELÉTICO': 'Reumatológica',
    'REPRODUTIVO': 'Reprodutiva',
    'DERMATOLÓGICO': 'Dermatológica'
  };
  
  for (const [key, value] of Object.entries(conditionMap)) {
    if (condition.toUpperCase().includes(key)) {
      return value;
    }
  }
  return 'Geral';
}

export function getSequentialRecommendation(evidencia: string): string {
  const recommendations: { [key: string]: string } = {
    'A': 'Primeira linha - Iniciar imediatamente',
    'B': 'Segunda linha - Adicionar após 2-4 semanas',
    'D': 'Terceira linha - Considerar após 6-8 semanas'
  };
  return recommendations[evidencia] || 'Avaliar individualmente';
}

export function generateSynergyDescription(supplements: SupplementInMatrix[], condition: string): string {
  const aCount = supplements.filter(s => s.evidencia === 'A').length;
  const bCount = supplements.filter(s => s.evidencia === 'B').length;
  
  if (aCount >= 3) {
    return `Protocolo de alta sinergia para ${condition} com ${aCount} suplementos de evidência forte (A) demonstrando efeitos complementares nos mecanismos fisiopatológicos.`;
  } else if (aCount >= 1 && bCount >= 2) {
    return `Protocolo sinérgico para ${condition} combinando evidências fortes (${aCount}) e moderadas (${bCount}) para abordagem multitarget.`;
  } else {
    return `Protocolo multicomponente para ${condition} baseado em evidências disponíveis e mecanismos de ação complementares.`;
  }
}

export function generateInitialPhase(supplements: SupplementInMatrix[]): string {
  const aSupplements = supplements.filter(s => s.evidencia === 'A');
  if (aSupplements.length > 0) {
    const names = aSupplements.slice(0, 3).map(s => s.nome).join(', ');
    return `Iniciar com suplementos de evidência A: ${names}. Monitoramento semanal para tolerância.`;
  }
  return 'Iniciar com suplementos de maior evidência disponível, introdução gradual.';
}

export function generateTitrationPhase(supplements: SupplementInMatrix[]): string {
  const bSupplements = supplements.filter(s => s.evidencia === 'B');
  if (bSupplements.length > 0) {
    return `Após 2-4 semanas, adicionar suplementos de evidência B conforme tolerância. Ajustar dosagens baseado na resposta.`;
  }
  return 'Ajustar dosagens dos suplementos iniciais baseado na resposta e tolerância individual.';
}

export function generateAdjustmentPhase(condition: string): string {
  return `Ajustar protocolo baseado na resposta clínica específica para ${condition}. Considerar fatores individuais como idade, comorbidades e medicações concomitantes.`;
}

export function generateMaintenancePhase(qualitySupplements: SupplementInMatrix[]): string {
  if (qualitySupplements.length > 0) {
    return `Fase de manutenção com suplementos de evidência comprovada. Reavaliação trimestral para otimização contínua.`;
  }
  return 'Manutenção individualizada baseada na resposta obtida na fase de titulação.';
}

export function generateLabParameters(condition: string): string[] {
  const baseParams = ['Função hepática', 'Função renal', 'Hemograma completo'];
  
  const conditionSpecific: { [key: string]: string[] } = {
    'CARDIOVASCULAR': [...baseParams, 'Perfil lipídico', 'Proteína C-reativa', 'Homocisteína'],
    'NEUROLÓGICO': [...baseParams, 'Vitamina B12', 'Folato', 'Homocisteína'],
    'ENDÓCRINO': [...baseParams, 'Glicemia', 'HbA1c', 'Perfil tireoidiano'],
    'IMUNOLÓGICO': [...baseParams, 'Vitamina D', 'Zinco sérico', 'Ferritina'],
    'DIGESTIVO': [...baseParams, 'Albumina', 'Vitaminas lipossolúveis', 'B12'],
  };
  
  for (const [key, params] of Object.entries(conditionSpecific)) {
    if (condition.toUpperCase().includes(key)) {
      return params;
    }
  }
  
  return baseParams;
}

export function generateClinicalParameters(condition: string): string {
  const parameterMap: { [key: string]: string } = {
    'CARDIOVASCULAR': 'Pressão arterial, frequência cardíaca, sintomas cardiovasculares',
    'NEUROLÓGICO': 'Função cognitiva, humor, qualidade do sono, sintomas neurológicos',
    'IMUNOLÓGICO': 'Frequência de infecções, sintomas alérgicos, energia geral',
    'DIGESTIVO': 'Função intestinal, sintomas digestivos, absorção de nutrientes',
    'ENDÓCRINO': 'Controle glicêmico, sintomas hormonais, energia e metabolismo'
  };
  
  for (const [key, params] of Object.entries(parameterMap)) {
    if (condition.toUpperCase().includes(key)) {
      return params;
    }
  }
  
  return 'Melhoria sintomática geral, qualidade de vida, tolerância ao protocolo';
}

export function generateSpecificMarkers(condition: string): string[] {
  const markerMap: { [key: string]: string[] } = {
    'CARDIOVASCULAR': ['PCR-us', 'Troponina (se indicado)', 'BNP/NT-proBNP'],
    'NEUROLÓGICO': ['BDNF', 'Tau (se indicado)', 'Neurofilamentos'],
    'IMUNOLÓGICO': ['Citocinas inflamatórias', 'Imunoglobulinas', 'Complemento'],
    'ENDÓCRINO': ['Insulina', 'HOMA-IR', 'Cortisol'],
    'DIGESTIVO': ['Calprotectina fecal', 'Elastase pancreática', 'Permeabilidade intestinal']
  };
  
  for (const [key, markers] of Object.entries(markerMap)) {
    if (condition.toUpperCase().includes(key)) {
      return markers;
    }
  }
  
  return ['Marcadores inflamatórios gerais'];
}

export function generateAgeFactors(condition: string): string {
  return `Ajustar dosagens para idades extremas. Pediátrico: reduzir 50-75%. Geriátrico: reduzir 25-50% e monitorar função renal. Para ${condition}, considerar farmacocinética alterada.`;
}

export function generateGeneticFactors(supplements: SupplementInMatrix[]): string {
  const geneticSupplements = supplements.filter(s => 
    s.nome.toLowerCase().includes('folato') || 
    s.nome.toLowerCase().includes('b12') ||
    s.nome.toLowerCase().includes('ômega')
  );
  
  if (geneticSupplements.length > 0) {
    return 'Considerar polimorfismos MTHFR para folato, COMT para B12, APOE para ômega-3. Teste farmacogenômico quando disponível.';
  }
  
  return 'Avaliar polimorfismos relevantes quando clinicamente indicado e disponível.';
}

export function generateComorbidityFactors(condition: string): string {
  return `Para ${condition}, ajustar protocolo considerando diabetes, hipertensão, doenças cardiovasculares, renais e hepáticas concomitantes. Reavaliar interações entre condições.`;
}

export function generateDrugInteractions(supplements: SupplementInMatrix[]): string {
  const interactionRisk = supplements.some(s => 
    s.nome.toLowerCase().includes('ômega') ||
    s.nome.toLowerCase().includes('vitamina e') ||
    s.nome.toLowerCase().includes('ginkgo')
  );
  
  if (interactionRisk) {
    return 'Verificar interações com anticoagulantes, antiagregantes, e medicações hepatotóxicas. Monitorar coagulação se necessário.';
  }
  
  return 'Verificar interações medicamentosas específicas para cada suplemento. Consultar bases de dados farmacológicas.';
}

export function generateLifestyleFactors(condition: string): string {
  return `Para ${condition}: otimizar dieta mediterrânea, exercício regular adaptado, manejo do estresse, higiene do sono. Lifestyle integrado ao protocolo suplementar.`;
}

export function generateSeverityFactors(condition: string): string {
  return `Ajustar intensidade do protocolo baseado na severidade de ${condition}. Casos leves: abordagem conservadora. Casos severos: protocolo intensivo com monitoramento frequente.`;
}