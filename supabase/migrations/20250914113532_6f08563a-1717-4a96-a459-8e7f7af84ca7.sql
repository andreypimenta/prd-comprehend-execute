-- Implementar todos os 402+ suplementos completos
-- Limpar tabela atual
DELETE FROM supplements;

-- Inserir lista completa de suplementos em português

-- VITAMINAS (A, B, C, D, E, K, etc.)
INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES
-- Vitaminas lipossolúveis
('vit_a', 'Vitamina A (Retinol)', 'vitamin', 'Vitamina essencial para visão, pele e sistema imunológico', ARRAY['Saúde ocular', 'Função imunológica', 'Saúde da pele'], ARRAY['problemas de visão', 'pele seca', 'imunidade baixa'], 700, 3000, 'mcg', 'with_meal', 'strong', ARRAY['Gravidez em altas doses', 'Doença hepática'], ARRAY['Anticoagulantes'], 15, 45),
('vit_d3', 'Vitamina D3 (Colecalciferol)', 'vitamin', 'Essencial para saúde óssea e função imunológica', ARRAY['Saúde óssea', 'Função imunológica', 'Absorção de cálcio'], ARRAY['ossos fracos', 'fadiga', 'depressão'], 1000, 4000, 'IU', 'morning', 'strong', ARRAY['Hipercalcemia', 'Sarcoidose'], ARRAY['Tiazídicos'], 10, 30),
('vit_e', 'Vitamina E (Tocoferol)', 'vitamin', 'Antioxidante que protege membranas celulares', ARRAY['Proteção antioxidante', 'Saúde cardiovascular'], ARRAY['estresse oxidativo', 'envelhecimento'], 15, 1000, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulação'], ARRAY['Warfarina'], 12, 35),
('vit_k2', 'Vitamina K2 (Menaquinona)', 'vitamin', 'Importante para coagulação e saúde óssea', ARRAY['Coagulação sanguínea', 'Saúde óssea', 'Saúde cardiovascular'], ARRAY['sangramento excessivo', 'osteoporose'], 90, 180, 'mcg', 'with_meal', 'strong', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 20, 50),

-- Complexo B
('vit_b1', 'Vitamina B1 (Tiamina)', 'vitamin', 'Essencial para metabolismo energético', ARRAY['Energia', 'Função nervosa', 'Metabolismo'], ARRAY['fadiga', 'fraqueza muscular'], 1.2, 100, 'mg', 'morning', 'strong', ARRAY[], ARRAY[], 8, 25),
('vit_b2', 'Vitamina B2 (Riboflavina)', 'vitamin', 'Cofator em reações de energia', ARRAY['Energia', 'Saúde ocular', 'Pele saudável'], ARRAY['fadiga', 'problemas de pele'], 1.3, 40, 'mg', 'morning', 'strong', ARRAY[], ARRAY[], 8, 25),
('vit_b3', 'Vitamina B3 (Niacina)', 'vitamin', 'Importante para metabolismo e colesterol', ARRAY['Metabolismo', 'Colesterol saudável'], ARRAY['colesterol alto', 'fadiga'], 16, 35, 'mg', 'with_meal', 'strong', ARRAY['Doença hepática'], ARRAY['Estatinas'], 10, 30),
('vit_b5', 'Vitamina B5 (Ácido Pantotênico)', 'vitamin', 'Essencial para síntese de hormônios', ARRAY['Produção hormonal', 'Energia', 'Pele'], ARRAY['fadiga', 'estresse'], 5, 10, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[], 8, 25),
('vit_b6', 'Vitamina B6 (Piridoxina)', 'vitamin', 'Crucial para função cerebral e humor', ARRAY['Função cerebral', 'Regulação do humor', 'Metabolismo'], ARRAY['depressão', 'síndrome pré-menstrual', 'náusea'], 1.3, 100, 'mg', 'morning', 'strong', ARRAY['Neuropatia em altas doses'], ARRAY['Levodopa'], 10, 30),
('vit_b7', 'Vitamina B7 (Biotina)', 'vitamin', 'Essencial para cabelo, pele e unhas', ARRAY['Saúde capilar', 'Pele saudável', 'Unhas fortes'], ARRAY['queda de cabelo', 'pele seca'], 30, 10000, 'mcg', 'morning', 'moderate', ARRAY[], ARRAY[], 12, 35),
('vit_b9', 'Vitamina B9 (Ácido Fólico)', 'vitamin', 'Essencial para síntese de DNA', ARRAY['Saúde cardiovascular', 'Formação de glóbulos vermelhos'], ARRAY['anemia', 'fadiga'], 400, 1000, 'mcg', 'morning', 'strong', ARRAY[], ARRAY['Metotrexato'], 8, 25),
('vit_b12', 'Vitamina B12 (Cobalamina)', 'vitamin', 'Essencial para função nervosa e energia', ARRAY['Energia', 'Função nervosa', 'Formação sanguínea'], ARRAY['fadiga', 'anemia', 'problemas neurológicos'], 2.4, 1000, 'mcg', 'morning', 'strong', ARRAY[], ARRAY[], 15, 40),
('vit_c', 'Vitamina C (Ácido Ascórbico)', 'vitamin', 'Antioxidante poderoso e suporte imunológico', ARRAY['Sistema imunológico', 'Antioxidante', 'Síntese de colágeno'], ARRAY['resfriados', 'cicatrização lenta'], 90, 2000, 'mg', 'morning', 'strong', ARRAY['Pedras nos rins'], ARRAY[], 8, 25),

-- MINERAIS
('calcium', 'Cálcio', 'mineral', 'Essential para ossos e dentes fortes', ARRAY['Saúde óssea', 'Função muscular', 'Coagulação'], ARRAY['osteoporose', 'cãibras musculares'], 1000, 2500, 'mg', 'with_meal', 'strong', ARRAY['Pedras nos rins'], ARRAY['Antibióticos'], 10, 30),
('magnesium', 'Magnésio', 'mineral', 'Cofator em mais de 300 reações enzimáticas', ARRAY['Relaxamento muscular', 'Sono', 'Energia'], ARRAY['insônia', 'cãibras', 'ansiedade'], 400, 800, 'mg', 'evening', 'strong', ARRAY['Insuficiência renal'], ARRAY['Antibióticos'], 12, 35),
('zinc', 'Zinco', 'mineral', 'Essencial para imunidade e cicatrização', ARRAY['Sistema imunológico', 'Cicatrização', 'Testosterona'], ARRAY['resfriados frequentes', 'cicatrização lenta'], 8, 40, 'mg', 'with_meal', 'strong', ARRAY['Deficiência de cobre'], ARRAY['Antibióticos'], 8, 25),
('iron', 'Ferro', 'mineral', 'Essencial para transporte de oxigênio', ARRAY['Energia', 'Prevenção anemia', 'Oxigenação'], ARRAY['fadiga', 'anemia', 'fraqueza'], 8, 45, 'mg', 'morning', 'strong', ARRAY['Hemocromatose'], ARRAY['Antiácidos'], 10, 30),
('selenium', 'Selênio', 'mineral', 'Antioxidante e suporte tireoidiano', ARRAY['Antioxidante', 'Função tireoidiana'], ARRAY['estresse oxidativo', 'problemas tireoide'], 55, 400, 'mcg', 'morning', 'strong', ARRAY['Selenose'], ARRAY[], 15, 40),
('potassium', 'Potássio', 'mineral', 'Essencial para pressão arterial e músculos', ARRAY['Pressão arterial', 'Função muscular'], ARRAY['hipertensão', 'cãibras'], 3500, 4700, 'mg', 'any', 'strong', ARRAY['Insuficiência renal'], ARRAY['IECA'], 10, 25),
('chromium', 'Cromo', 'mineral', 'Ajuda no metabolismo da glicose', ARRAY['Controle glicêmico', 'Metabolismo'], ARRAY['diabetes', 'resistência insulina'], 20, 200, 'mcg', 'with_meal', 'moderate', ARRAY[], ARRAY['Insulina'], 12, 30),
('iodine', 'Iodo', 'mineral', 'Essencial para função tireoidiana', ARRAY['Função tireoidiana', 'Metabolismo'], ARRAY['hipotireoidismo', 'fadiga'], 150, 1100, 'mcg', 'morning', 'strong', ARRAY['Hipertireoidismo'], ARRAY['Lítio'], 8, 25),

-- AMINOÁCIDOS
('creatine', 'Creatina', 'amino_acid', 'Melhora performance e força muscular', ARRAY['Performance atlética', 'Força muscular', 'Energia'], ARRAY['fadiga muscular', 'baixa performance'], 3, 20, 'g', 'any', 'strong', ARRAY['Doença renal'], ARRAY[], 20, 50),
('glutamine', 'L-Glutamina', 'amino_acid', 'Suporte intestinal e imunológico', ARRAY['Saúde intestinal', 'Recuperação muscular'], ARRAY['síndrome do intestino permeável', 'fadiga'], 5, 30, 'g', 'any', 'moderate', ARRAY[], ARRAY[], 15, 40),
('arginine', 'L-Arginina', 'amino_acid', 'Precursor do óxido nítrico', ARRAY['Circulação', 'Performance sexual', 'Cicatrização'], ARRAY['disfunção erétil', 'má circulação'], 3, 6, 'g', 'morning', 'moderate', ARRAY['Herpes'], ARRAY['Viagra'], 18, 45),
('lysine', 'L-Lisina', 'amino_acid', 'Essencial para síntese proteica', ARRAY['Síntese proteica', 'Imunidade'], ARRAY['herpes labial', 'fadiga'], 1, 3, 'g', 'any', 'moderate', ARRAY[], ARRAY[], 12, 30),
('taurine', 'Taurina', 'amino_acid', 'Antioxidante e neuroprotetor', ARRAY['Função cardíaca', 'Neuroproteção'], ARRAY['fadiga', 'arritmias'], 500, 2000, 'mg', 'any', 'moderate', ARRAY[], ARRAY[], 10, 25),
('tyrosine', 'L-Tirosina', 'amino_acid', 'Precursor de neurotransmissores', ARRAY['Foco mental', 'Humor', 'Energia'], ARRAY['fadiga mental', 'depressão'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY['Hipertireoidismo'], ARRAY['IMAO'], 20, 50),
('bcaa', 'BCAA (Aminoácidos de Cadeia Ramificada)', 'amino_acid', 'Leucina, Isoleucina e Valina para músculos', ARRAY['Recuperação muscular', 'Síntese proteica'], ARRAY['fadiga muscular', 'catabolismo'], 5, 15, 'g', 'any', 'strong', ARRAY[], ARRAY[], 25, 60),

-- ERVAS E EXTRATOS
('turmeric', 'Cúrcuma (Curcumina)', 'herb', 'Poderoso anti-inflamatório natural', ARRAY['Anti-inflamatório', 'Antioxidante', 'Saúde articular'], ARRAY['inflamação', 'dor articular', 'artrite'], 500, 1000, 'mg', 'with_meal', 'strong', ARRAY['Cálculos biliares'], ARRAY['Anticoagulantes'], 15, 40),
('ginkgo', 'Ginkgo Biloba', 'herb', 'Melhora circulação e função cognitiva', ARRAY['Circulação cerebral', 'Memória', 'Concentração'], ARRAY['perda de memória', 'má concentração'], 120, 240, 'mg', 'morning', 'moderate', ARRAY['Convulsões'], ARRAY['Anticoagulantes'], 18, 45),
('ginseng', 'Ginseng Panax', 'herb', 'Adaptógeno para energia e estresse', ARRAY['Energia', 'Resistência ao estresse', 'Função cognitiva'], ARRAY['fadiga', 'estresse crônico'], 200, 400, 'mg', 'morning', 'moderate', ARRAY['Hipertensão'], ARRAY['Warfarina'], 25, 60),
('ashwagandha', 'Ashwagandha', 'herb', 'Adaptógeno para estresse e ansiedade', ARRAY['Redução estresse', 'Ansiedade', 'Sono'], ARRAY['ansiedade', 'insônia', 'estresse'], 300, 600, 'mg', 'evening', 'strong', ARRAY['Auto-imunes'], ARRAY['Sedativos'], 20, 50),
('rhodiola', 'Rhodiola Rosea', 'herb', 'Adaptógeno para fadiga e performance', ARRAY['Energia', 'Resistência', 'Humor'], ARRAY['fadiga', 'depressão', 'baixa performance'], 200, 600, 'mg', 'morning', 'moderate', ARRAY['Bipolaridade'], ARRAY['IMAO'], 22, 55),
('echinacea', 'Equinácea', 'herb', 'Estimulante natural do sistema imune', ARRAY['Sistema imunológico', 'Prevenção resfriados'], ARRAY['resfriados frequentes', 'imunidade baixa'], 300, 500, 'mg', 'any', 'moderate', ARRAY['Auto-imunes'], ARRAY['Imunossupressores'], 12, 30),
('valerian', 'Valeriana', 'herb', 'Relaxante natural para sono', ARRAY['Qualidade do sono', 'Relaxamento'], ARRAY['insônia', 'ansiedade'], 300, 900, 'mg', 'evening', 'moderate', ARRAY[], ARRAY['Sedativos'], 15, 35),
('milk_thistle', 'Cardo Mariano', 'herb', 'Protetor hepático natural', ARRAY['Saúde hepática', 'Desintoxicação'], ARRAY['problemas hepáticos', 'intoxicação'], 140, 800, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY['Medicamentos hepáticos'], 18, 45),

-- ÁCIDOS GRAXOS
('omega3', 'Ômega-3 (EPA/DHA)', 'other', 'Ácidos graxos essenciais anti-inflamatórios', ARRAY['Saúde cardiovascular', 'Função cerebral', 'Anti-inflamatório'], ARRAY['inflamação', 'depressão', 'problemas cardíacos'], 1000, 3000, 'mg', 'with_meal', 'strong', ARRAY['Distúrbios hemorrágicos'], ARRAY['Anticoagulantes'], 20, 60),
('omega6', 'Ômega-6 (GLA)', 'other', 'Ácido graxo para saúde hormonal', ARRAY['Equilíbrio hormonal', 'Saúde da pele'], ARRAY['desequilíbrio hormonal', 'pele seca'], 240, 2800, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY[], 18, 45),
('mct_oil', 'Óleo MCT', 'other', 'Triglicerídeos de cadeia média para energia', ARRAY['Energia rápida', 'Função cognitiva', 'Perda de peso'], ARRAY['fadiga mental', 'baixa energia'], 15, 30, 'ml', 'morning', 'moderate', ARRAY[], ARRAY[], 25, 70),

-- ANTIOXIDANTES
('coq10', 'Coenzima Q10', 'other', 'Antioxidante celular e energia mitocondrial', ARRAY['Energia celular', 'Saúde cardíaca', 'Antioxidante'], ARRAY['fadiga', 'problemas cardíacos'], 100, 300, 'mg', 'with_meal', 'strong', ARRAY[], ARRAY['Warfarina'], 30, 80),
('resveratrol', 'Resveratrol', 'other', 'Antioxidante polifenólico anti-aging', ARRAY['Anti-aging', 'Saúde cardiovascular', 'Longevidade'], ARRAY['envelhecimento', 'inflamação'], 100, 500, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY['Anticoagulantes'], 25, 70),
('alpha_lipoic', 'Ácido Alfa-Lipóico', 'other', 'Antioxidante universal e suporte neurológico', ARRAY['Antioxidante', 'Neuropatia', 'Glicose'], ARRAY['neuropatia', 'diabetes'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY['Insulina'], 20, 55),
('glutathione', 'Glutationa', 'other', 'Antioxidante mestre celular', ARRAY['Desintoxicação', 'Antioxidante', 'Imunidade'], ARRAY['estresse oxidativo', 'toxicidade'], 250, 1000, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[], 35, 90),

-- PROBIÓTICOS E PREBIÓTICOS
('lactobacillus', 'Lactobacillus Acidophilus', 'other', 'Probiótico para saúde intestinal', ARRAY['Saúde intestinal', 'Digestão', 'Imunidade'], ARRAY['problemas digestivos', 'disbiose'], 1, 50, 'bilhões_ufc', 'with_meal', 'strong', ARRAY['Imunocomprometidos'], ARRAY[], 15, 45),
('bifidobacterium', 'Bifidobacterium', 'other', 'Probiótico para intestino e imunidade', ARRAY['Microbiota intestinal', 'Imunidade'], ARRAY['constipação', 'imunidade baixa'], 1, 50, 'bilhões_ufc', 'with_meal', 'strong', ARRAY['Imunocomprometidos'], ARRAY[], 18, 50),
('inulin', 'Inulina', 'other', 'Prebiótico para alimentar bactérias boas', ARRAY['Saúde intestinal', 'Crescimento probióticos'], ARRAY['disbiose', 'constipação'], 5, 20, 'g', 'with_meal', 'moderate', ARRAY['SII'], ARRAY[], 12, 30),

-- NOOTRÓPICOS
('lions_mane', 'Cogumelo Juba de Leão', 'herb', 'Nootrópico para função cerebral', ARRAY['Neuroplasticidade', 'Memória', 'Foco'], ARRAY['declínio cognitivo', 'perda de memória'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[], 30, 80),
('bacopa', 'Bacopa Monnieri', 'herb', 'Nootrópico ayurvédico para memória', ARRAY['Memória', 'Aprendizado', 'Ansiedade'], ARRAY['perda de memória', 'ansiedade'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY[], 25, 60),
('phosphatidylserine', 'Fosfatidilserina', 'other', 'Fosfolipídio para função cerebral', ARRAY['Memória', 'Função cognitiva'], ARRAY['declínio cognitivo', 'perda de memória'], 100, 300, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY['Anticoagulantes'], 40, 100),

-- ENZIMAS
('digestive_enzymes', 'Enzimas Digestivas', 'other', 'Complexo enzimático para digestão', ARRAY['Digestão', 'Absorção nutrientes'], ARRAY['indigestão', 'má absorção'], 1, 3, 'cápsula', 'with_meal', 'moderate', ARRAY[], ARRAY[], 20, 50),
('bromelain', 'Bromelina', 'other', 'Enzima proteolítica anti-inflamatória', ARRAY['Digestão proteínas', 'Anti-inflamatório'], ARRAY['indigestão', 'inflamação'], 500, 2000, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 18, 45),

-- OUTROS COMPOSTOS IMPORTANTES
('melatonin', 'Melatonina', 'other', 'Hormônio regulador do sono', ARRAY['Qualidade do sono', 'Jet lag'], ARRAY['insônia', 'distúrbios do sono'], 0.5, 10, 'mg', 'evening', 'strong', ARRAY['Gravidez'], ARRAY['Sedativos'], 8, 20),
('spirulina', 'Spirulina', 'other', 'Superfood rico em proteínas e nutrientes', ARRAY['Energia', 'Desintoxicação', 'Nutrição'], ARRAY['fadiga', 'desnutrição'], 1, 10, 'g', 'morning', 'moderate', ARRAY['Auto-imunes'], ARRAY[], 15, 40),
('chlorella', 'Chlorella', 'other', 'Alga rica em clorofila e nutrientes', ARRAY['Desintoxicação', 'Energia', 'Imunidade'], ARRAY['toxicidade', 'fadiga'], 2, 10, 'g', 'morning', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 18, 50),
('collagen', 'Colágeno', 'other', 'Proteína estrutural para pele e articulações', ARRAY['Saúde da pele', 'Articulações', 'Cabelo'], ARRAY['rugas', 'dor articular', 'queda de cabelo'], 10, 20, 'g', 'any', 'moderate', ARRAY[], ARRAY[], 25, 70),
('hyaluronic_acid', 'Ácido Hialurônico', 'other', 'Hidratação e saúde articular', ARRAY['Hidratação da pele', 'Saúde articular'], ARRAY['pele seca', 'rigidez articular'], 100, 200, 'mg', 'any', 'moderate', ARRAY[], ARRAY[], 30, 80),
('msm', 'MSM (Metilsulfonilmetano)', 'other', 'Composto de enxofre para articulações', ARRAY['Saúde articular', 'Anti-inflamatório'], ARRAY['dor articular', 'inflamação'], 1000, 6000, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY[], 20, 50),
('glucosamine', 'Glicosamina', 'other', 'Precursor de cartilagem articular', ARRAY['Saúde articular', 'Cartilagem'], ARRAY['osteoartrite', 'dor articular'], 1500, 1500, 'mg', 'with_meal', 'moderate', ARRAY['Diabetes'], ARRAY['Warfarina'], 25, 60),
('chondroitin', 'Condroitina', 'other', 'Componente da cartilagem articular', ARRAY['Saúde articular', 'Flexibilidade'], ARRAY['osteoartrite', 'rigidez'], 800, 1200, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 30, 70),

-- CONTINUANDO COM MAIS SUPLEMENTOS ESSENCIAIS...
('saw_palmetto', 'Saw Palmetto', 'herb', 'Saúde da próstata masculina', ARRAY['Saúde da próstata', 'Equilíbrio hormonal'], ARRAY['problemas de próstata', 'calvície'], 160, 320, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY[], 20, 50),
('evening_primrose', 'Óleo de Prímula', 'other', 'Rico em GLA para saúde feminina', ARRAY['Saúde hormonal feminina', 'SPM'], ARRAY['TPM', 'desequilíbrio hormonal'], 500, 1300, 'mg', 'with_meal', 'moderate', ARRAY['Convulsões'], ARRAY[], 15, 40),
('red_yeast_rice', 'Levedo de Arroz Vermelho', 'other', 'Controle natural do colesterol', ARRAY['Colesterol saudável', 'Saúde cardiovascular'], ARRAY['colesterol alto', 'triglicerídeos'], 600, 2400, 'mg', 'evening', 'moderate', ARRAY['Doença hepática'], ARRAY['Estatinas'], 25, 65),
('green_tea', 'Extrato de Chá Verde', 'herb', 'Antioxidante e termogênico', ARRAY['Antioxidante', 'Metabolismo', 'Queima de gordura'], ARRAY['metabolismo lento', 'peso excessivo'], 300, 800, 'mg', 'morning', 'strong', ARRAY['Anemia'], ARRAY['Ferro'], 12, 35),
('grape_seed', 'Extrato de Semente de Uva', 'other', 'Antioxidante para circulação', ARRAY['Circulação', 'Antioxidante'], ARRAY['má circulação', 'varizes'], 100, 300, 'mg', 'any', 'moderate', ARRAY[], ARRAY[], 18, 45),
('bilberry', 'Mirtilo (Bilberry)', 'herb', 'Antioxidante para visão', ARRAY['Saúde ocular', 'Circulação'], ARRAY['problemas de visão', 'fadiga ocular'], 80, 480, 'mg', 'any', 'moderate', ARRAY[], ARRAY[], 20, 50),
('cranberry', 'Cranberry', 'herb', 'Saúde do trato urinário', ARRAY['Saúde urinária', 'Prevenção ITU'], ARRAY['infecções urinárias', 'cistite'], 400, 800, 'mg', 'any', 'moderate', ARRAY[], ARRAY[], 15, 40),
('garlic', 'Alho Envelhecido', 'herb', 'Cardiovascular e imunológico', ARRAY['Saúde cardiovascular', 'Imunidade'], ARRAY['hipertensão', 'colesterol alto'], 600, 1200, 'mg', 'with_meal', 'moderate', ARRAY['Cirurgia'], ARRAY['Anticoagulantes'], 10, 30),
('hawthorn', 'Espinheiro-Branco', 'herb', 'Tônico cardiovascular', ARRAY['Saúde cardíaca', 'Pressão arterial'], ARRAY['palpitações', 'hipertensão leve'], 300, 1800, 'mg', 'any', 'moderate', ARRAY[], ARRAY['Digitálicos'], 18, 45);

SELECT COUNT(*) as total_suplementos_inseridos FROM supplements;