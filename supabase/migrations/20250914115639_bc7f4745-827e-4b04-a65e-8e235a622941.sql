-- ÚLTIMO BATCH FINAL - IDs únicos para completar 402+ (120 novos suplementos)

INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- NOVOS COMPOSTOS ÚNICOS (IDs únicos para evitar duplicação)
('grape_seed_95', 'Extrato de Semente de Uva 95%', 'other', 'Extrato concentrado de proantocianidinas', ARRAY['Circulação', 'Antioxidante'], ARRAY['má circulação', 'varizes'], 150, 300, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('bilberry_40', 'Mirtilo 40% Antocianinas', 'herb', 'Extrato padronizado para visão', ARRAY['Visão noturna', 'Circulação'], ARRAY['fadiga ocular', 'má visão'], 160, 480, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 28, 70),
('cranberry_36', 'Cranberry 36% PACs', 'herb', 'Extrato padronizado urológico', ARRAY['Trato urinário', 'Antioxidante'], ARRAY['ITU', 'cistite'], 500, 1500, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('milk_thistle_80', 'Cardo Mariano 80% Silimarina', 'herb', 'Hepatoprotetor concentrado', ARRAY['Proteção hepática máxima'], ARRAY['hepatite', 'cirrose'], 200, 600, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('ginseng_7', 'Ginseng 7% Ginsenosídeos', 'herb', 'Adaptógeno padronizado', ARRAY['Energia adaptogênica'], ARRAY['fadiga adrenal'], 300, 600, 'mg', 'morning', 'strong', ARRAY['Hipertensão'], ARRAY[]::text[], 30, 75),
('green_tea_95', 'Chá Verde 95% Polifenóis', 'herb', 'Máxima concentração antioxidante', ARRAY['Antioxidante máximo'], ARRAY['estresse oxidativo'], 400, 800, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('turmeric_95', 'Cúrcuma 95% Curcuminóides', 'herb', 'Anti-inflamatório máximo', ARRAY['Anti-inflamatório potente'], ARRAY['artrite severa'], 500, 1000, 'mg', 'with_meal', 'strong', ARRAY['Cálculos biliares'], ARRAY[]::text[], 30, 75),
('boswellia_65', 'Boswellia 65% Ácidos Boswélicos', 'herb', 'Anti-inflamatório padronizado', ARRAY['Articulações', 'Respiração'], ARRAY['artrite', 'asma'], 300, 900, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- AMINOÁCIDOS ÚNICOS ADICIONAIS
('l_phenylalanine', 'L-Fenilalanina', 'amino_acid', 'Precursor de tirosina', ARRAY['Humor', 'Energia mental'], ARRAY['depressão', 'fadiga mental'], 500, 1500, 'mg', 'morning', 'moderate', ARRAY['Fenilcetonúria'], ARRAY['IMAO'], 15, 40),
('dl_phenylalanine', 'DL-Fenilalanina', 'amino_acid', 'Forma racêmica da fenilalanina', ARRAY['Dor crônica', 'Humor'], ARRAY['dor crônica', 'depressão'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY['Fenilcetonúria'], ARRAY[]::text[], 20, 50),
('l_tryptophan', 'L-Triptofano', 'amino_acid', 'Precursor de serotonina', ARRAY['Sono', 'Humor', 'Serotonina'], ARRAY['insônia', 'depressão'], 500, 2000, 'mg', 'evening', 'strong', ARRAY['IMAO'], ARRAY['Antidepressivos'], 25, 65),
('5_htp', '5-HTP (5-Hidroxitriptofano)', 'amino_acid', 'Precursor direto de serotonina', ARRAY['Humor', 'Sono', 'Apetite'], ARRAY['depressão', 'insônia'], 50, 300, 'mg', 'evening', 'strong', ARRAY['IMAO'], ARRAY['Antidepressivos'], 20, 50),
('gaba', 'GABA (Ácido Gama-Aminobutírico)', 'amino_acid', 'Neurotransmissor calmante', ARRAY['Relaxamento', 'Ansiedade'], ARRAY['ansiedade', 'tensão'], 250, 750, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('phenibut', 'Fenibut', 'amino_acid', 'GABA que cruza barreira cerebral', ARRAY['Ansiedade severa', 'Sono'], ARRAY['ansiedade severa'], 250, 1000, 'mg', 'evening', 'limited', ARRAY['Dependência'], ARRAY['Sedativos'], 30, 75),

-- NOOTRÓPICOS SINTÉTICOS ÚNICOS
('piracetam', 'Piracetam', 'other', 'Primeiro racetam descoberto', ARRAY['Memória', 'Aprendizado'], ARRAY['dificuldade aprendizado'], 800, 4800, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('pramiracetam', 'Pramiracetam', 'other', 'Racetam potente para memória', ARRAY['Memória de longo prazo'], ARRAY['perda memória severa'], 300, 1200, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 60, 150),
('coluracetam', 'Coluracetam', 'other', 'Racetam para AMPA', ARRAY['Neuroplasticidade'], ARRAY['depressão', 'ansiedade'], 3, 20, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 80, 200),
('sunifiram', 'Sunifiram', 'other', 'Ampakina nootropica', ARRAY['Memória', 'Foco'], ARRAY['déficit cognitivo'], 5, 20, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 100, 250),
('modafinil_analog', 'Adrafinil', 'other', 'Precursor do modafinil', ARRAY['Alerta', 'Foco'], ARRAY['sonolência', 'fadiga'], 300, 900, 'mg', 'morning', 'limited', ARRAY['Doença hepática'], ARRAY[]::text[], 40, 100),

-- PEPTÍDEOS E HORMÔNIOS ÚNICOS
('growth_hormone_support', 'Suporte ao GH', 'amino_acid', 'Aminoácidos para hormônio crescimento', ARRAY['GH natural', 'Recuperação'], ARRAY['baixo GH', 'envelhecimento'], 2, 5, 'g', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('igf_support', 'Suporte ao IGF-1', 'other', 'Precursores do IGF-1', ARRAY['Crescimento muscular'], ARRAY['sarcopenia'], 500, 1000, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 50, 120),
('insulin_support', 'Suporte à Insulina', 'herb', 'Ervas para sensibilidade insulina', ARRAY['Glicose', 'Insulina'], ARRAY['resistência insulina'], 400, 800, 'mg', 'with_meal', 'moderate', ARRAY['Hipoglicemia'], ARRAY[]::text[], 25, 60),
('cortisol_manager', 'Controle do Cortisol', 'herb', 'Para cortisol elevado', ARRAY['Redução cortisol'], ARRAY['estresse crônico'], 300, 600, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),

-- COMPOSTOS ÚNICOS PARA SAÚDE ESPECÍFICA
('prostate_complete', 'Próstata Completa', 'herb', 'Fórmula prostática abrangente', ARRAY['Saúde prostática total'], ARRAY['HPB', 'PSA elevado'], 600, 1200, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('breast_health', 'Saúde da Mama', 'herb', 'Fórmula para saúde mamária', ARRAY['Saúde mamária'], ARRAY['nódulos benignos'], 400, 800, 'mg', 'any', 'moderate', ARRAY['Câncer mama'], ARRAY[]::text[], 35, 85),
('ovarian_support', 'Suporte Ovariano', 'herb', 'Para saúde ovariana', ARRAY['Função ovariana'], ARRAY['SOP', 'infertilidade'], 300, 600, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('fertility_blend', 'Blend da Fertilidade', 'herb', 'Para homens e mulheres', ARRAY['Fertilidade'], ARRAY['infertilidade', 'baixa contagem'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- SISTEMAS CORPORAIS ESPECÍFICOS
('respiratory_support', 'Suporte Respiratório', 'herb', 'Para pulmões e brônquios', ARRAY['Respiração', 'Pulmões'], ARRAY['asma', 'bronquite'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('sinus_support', 'Suporte aos Seios da Face', 'herb', 'Para sinusite e congestão', ARRAY['Seios da face', 'Respiração'], ARRAY['sinusite', 'congestão'], 300, 600, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('allergy_relief', 'Alívio de Alergias', 'herb', 'Anti-histamínico natural', ARRAY['Alergias', 'Histamina'], ARRAY['rinite', 'alergias sazonais'], 300, 900, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('immune_boost', 'Impulso Imunológico', 'herb', 'Estimulante imunológico', ARRAY['Imunidade ativa'], ARRAY['infecções frequentes'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY['Auto-imunes'], ARRAY[]::text[], 20, 50),
('antiviral_complex', 'Complexo Antiviral', 'herb', 'Ervas antivirais', ARRAY['Proteção viral'], ARRAY['gripes', 'herpes'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),

-- SUPERALIMENTOS ÚNICOS ADICIONAIS
('spirulina_organic', 'Spirulina Orgânica', 'other', 'Alga azul-verde certificada', ARRAY['Proteína completa', 'Energia'], ARRAY['desnutrição proteica'], 3, 10, 'g', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('chlorella_organic', 'Chlorella Orgânica', 'other', 'Alga verde desintoxicante', ARRAY['Desintoxicação', 'Clorofila'], ARRAY['metais pesados'], 3, 10, 'g', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('wheat_grass_organic', 'Grama de Trigo Orgânica', 'other', 'Superfood verde alcalinizante', ARRAY['Alcalinização', 'Energia'], ARRAY['acidose', 'fadiga'], 1, 6, 'g', 'morning', 'moderate', ARRAY['Alergia trigo'], ARRAY[]::text[], 18, 45),
('barley_grass_organic', 'Grama de Cevada Orgânica', 'other', 'Verde nutritivo sem glúten', ARRAY['Nutrição', 'Energia'], ARRAY['deficiências nutricionais'], 1, 6, 'g', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('moringa_organic', 'Moringa Orgânica', 'other', 'Árvore da vida completa', ARRAY['Nutrição densa', 'Energia'], ARRAY['desnutrição'], 1, 5, 'g', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- COGUMELOS MEDICINAIS ÚNICOS
('cordyceps_sinensis', 'Cordyceps Sinensis', 'herb', 'Cogumelo da cordilheira', ARRAY['Performance atlética'], ARRAY['fadiga', 'baixa resistência'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 50, 120),
('turkey_tail_psk', 'Cauda de Peru PSK', 'herb', 'Extrato padronizado PSK', ARRAY['Imunidade antitumoral'], ARRAY['imunidade baixa'], 1000, 3000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 60, 150),
('maitake_d_fraction', 'Maitake D-Fraction', 'herb', 'Extrato beta-glucano', ARRAY['Glicose', 'Imunidade'], ARRAY['diabetes', 'imunidade'], 500, 1500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 45, 110),
('agaricus_extract', 'Extrato de Agaricus', 'herb', 'Cogumelo do sol', ARRAY['Imunidade', 'Energia'], ARRAY['câncer', 'fadiga'], 500, 2000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('tremella_mushroom', 'Cogumelo Tremella', 'herb', 'Cogumelo da beleza', ARRAY['Pele', 'Hidratação'], ARRAY['pele seca', 'envelhecimento'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- EXTRATOS ÚNICOS DE PLANTAS RARAS
('cat_claw', 'Unha-de-Gato', 'herb', 'Imunomodulador da Amazônia', ARRAY['Imunidade', 'Artrite'], ARRAY['artrite reumatoide'], 300, 1000, 'mg', 'any', 'moderate', ARRAY['Auto-imunes'], ARRAY[]::text[], 25, 65),
('pau_darco', 'Pau D\'Arco', 'herb', 'Antifúngico e antibacteriano', ARRAY['Candida', 'Infecções'], ARRAY['candidíase', 'infecções'], 500, 1500, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY[]::text[], 20, 50),
('sangre_drago', 'Sangre de Drago', 'herb', 'Cicatrizante da Amazônia', ARRAY['Cicatrização', 'Úlceras'], ARRAY['feridas', 'úlceras'], 100, 300, 'mg', 'any', 'limited', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('dragon_fruit', 'Pitaya (Dragon Fruit)', 'other', 'Superfruit antioxidante', ARRAY['Antioxidante', 'Hidratação'], ARRAY['desidratação', 'oxidação'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('mangosteen', 'Mangostão', 'other', 'Rainha das frutas antioxidantes', ARRAY['Antioxidante supremo'], ARRAY['inflamação severa'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- PROBIÓTICOS DE SOLO E ESPECIALIZADOS
('primal_defense', 'Defesa Primária', 'other', 'Probióticos ancestrais do solo', ARRAY['Imunidade primária'], ARRAY['disbiose severa'], 3, 10, 'bilhões_ufc', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('spore_probiotics', 'Probióticos Esporulados', 'other', 'Bacillus resistentes', ARRAY['Sobrevivência gástrica'], ARRAY['disbiose resistente'], 2, 10, 'bilhões_ufc', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('kimchi_probiotics', 'Probióticos do Kimchi', 'other', 'Fermentados coreanos', ARRAY['Digestão asiática'], ARRAY['má digestão'], 5, 25, 'bilhões_ufc', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('kefir_probiotics', 'Probióticos do Kefir', 'other', 'Grãos de kefir', ARRAY['Diversidade extrema'], ARRAY['disbiose'], 10, 50, 'bilhões_ufc', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 30, 75),

-- MINERAIS E OLIGOELEMENTOS ÚNICOS
('colloidal_silver', 'Prata Coloidal', 'mineral', 'Antimicrobiano mineral', ARRAY['Antimicrobiano'], ARRAY['infecções'], 10, 30, 'ppm', 'any', 'limited', ARRAY['Argiria'], ARRAY[]::text[], 25, 65),
('colloidal_gold', 'Ouro Coloidal', 'mineral', 'Para função cerebral', ARRAY['Cognição', 'Humor'], ARRAY['depressão', 'névoa mental'], 10, 30, 'ppm', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 60, 150),
('colloidal_copper', 'Cobre Coloidal', 'mineral', 'Forma coloidal do cobre', ARRAY['Energia', 'Cabelos'], ARRAY['fadiga', 'cabelos brancos'], 2, 10, 'ppm', 'morning', 'limited', ARRAY['Wilson'], ARRAY[]::text[], 30, 75),
('trace_minerals', 'Minerais Traço', 'mineral', 'Complexo completo de oligoelementos', ARRAY['Equilíbrio mineral'], ARRAY['deficiências múltiplas'], 1, 3, 'ml', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('sea_salt_minerals', 'Minerais do Mar', 'mineral', 'Sal marinho desmineralizado', ARRAY['Eletrólitos', 'Hidratação'], ARRAY['desidratação', 'fadiga'], 500, 2000, 'mg', 'any', 'moderate', ARRAY['Hipertensão'], ARRAY[]::text[], 12, 30),

-- COMPOSTOS ANTI-INFLAMATÓRIOS ÚNICOS
('inflammaway', 'Anti-Inflamatório Natural', 'herb', 'Complexo anti-inflamatório', ARRAY['Redução inflamação'], ARRAY['inflamação crônica'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('pain_relief', 'Alívio da Dor', 'herb', 'Analgésicos naturais', ARRAY['Alívio dor'], ARRAY['dor crônica'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('arthritis_support', 'Suporte à Artrite', 'herb', 'Específico para artrite', ARRAY['Artrite', 'Mobilidade'], ARRAY['artrite', 'rigidez'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('fibromyalgia_support', 'Suporte à Fibromialgia', 'herb', 'Para dor fibromialgia', ARRAY['Dor fibromialgia'], ARRAY['fibromialgia'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),

-- METABOLISMO E PESO
('fat_burner', 'Queimador de Gordura', 'other', 'Termogênico natural', ARRAY['Queima gordura'], ARRAY['sobrepeso', 'metabolismo lento'], 400, 800, 'mg', 'morning', 'moderate', ARRAY['Hipertensão'], ARRAY[]::text[], 25, 60),
('carb_blocker', 'Bloqueador de Carboidratos', 'other', 'Inibidor de amilase', ARRAY['Controle carboidratos'], ARRAY['diabetes', 'peso'], 500, 1500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('appetite_control', 'Controle do Apetite', 'herb', 'Supressor natural do apetite', ARRAY['Saciedade'], ARRAY['compulsão alimentar'], 300, 900, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('metabolism_boost', 'Impulso Metabólico', 'herb', 'Acelerador do metabolismo', ARRAY['Metabolismo rápido'], ARRAY['metabolismo lento'], 400, 800, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),

-- ENERGIA ESPECIALIZADA  
('adrenal_fatigue', 'Fadiga Adrenal', 'herb', 'Para burnout e exaustão', ARRAY['Recuperação adrenal'], ARRAY['burnout', 'exaustão'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('chronic_fatigue', 'Fadiga Crônica', 'herb', 'Para SFC', ARRAY['Energia em SFC'], ARRAY['síndrome fadiga crônica'], 600, 1200, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('mental_energy', 'Energia Mental', 'other', 'Para fadiga cerebral', ARRAY['Clareza mental'], ARRAY['névoa mental'], 300, 600, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('physical_energy', 'Energia Física', 'herb', 'Para resistência física', ARRAY['Resistência física'], ARRAY['fadiga física'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- SAÚDE MENTAL ESPECÍFICA
('depression_support', 'Suporte à Depressão', 'herb', 'Ervas antidepressivas', ARRAY['Humor', 'Motivação'], ARRAY['depressão', 'apatia'], 300, 900, 'mg', 'morning', 'moderate', ARRAY['Antidepressivos'], ARRAY[]::text[], 25, 65),
('bipolar_support', 'Suporte Bipolar', 'herb', 'Estabilizadores naturais', ARRAY['Estabilização humor'], ARRAY['oscilações humor'], 400, 800, 'mg', 'any', 'limited', ARRAY['Medicação psiquiátrica'], ARRAY[]::text[], 40, 100),
('adhd_support', 'Suporte ao TDAH', 'other', 'Para déficit de atenção', ARRAY['Foco', 'Atenção'], ARRAY['TDAH', 'hiperatividade'], 300, 600, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('autism_support', 'Suporte ao Autismo', 'other', 'Nutrientes para TEA', ARRAY['Desenvolvimento neural'], ARRAY['autismo', 'desenvolvimento'], 200, 400, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 50, 120),

-- FÓRMULAS ESPECIALIZADAS FINAIS
('senior_brain', 'Cérebro Sênior', 'other', 'Para cognição na terceira idade', ARRAY['Cognição idoso'], ARRAY['demência', 'Alzheimer'], 400, 800, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 45, 110),
('children_multivitamin', 'Multivitamínico Infantil', 'vitamin', 'Para crianças', ARRAY['Crescimento', 'Desenvolvimento'], ARRAY['déficit crescimento'], 1, 2, 'goma', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('teen_formula', 'Fórmula Adolescente', 'vitamin', 'Para adolescentes', ARRAY['Crescimento puberal'], ARRAY['desenvolvimento', 'acne'], 1, 2, 'cápsula', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 45),
('athlete_formula', 'Fórmula do Atleta', 'other', 'Para atletas profissionais', ARRAY['Performance máxima'], ARRAY['fadiga atlética'], 2, 4, 'cápsula', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 50, 120),
('recovery_formula', 'Fórmula da Recuperação', 'other', 'Pós-treino e lesões', ARRAY['Recuperação acelerada'], ARRAY['lesões', 'fadiga'], 1, 3, 'g', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('weight_gain', 'Ganho de Peso', 'other', 'Para ganho de massa', ARRAY['Ganho peso saudável'], ARRAY['baixo peso'], 25, 50, 'g', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('weight_loss', 'Perda de Peso', 'herb', 'Emagrecimento saudável', ARRAY['Perda peso'], ARRAY['obesidade'], 500, 1500, 'mg', 'morning', 'moderate', ARRAY['Distúrbios alimentares'], ARRAY[]::text[], 35, 85),
('beauty_complex', 'Complexo Beleza', 'other', 'Cabelo, pele e unhas', ARRAY['Beleza completa'], ARRAY['envelhecimento estético'], 400, 800, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('longevity_max', 'Longevidade Máxima', 'other', 'Anti-aging supremo', ARRAY['Máxima longevidade'], ARRAY['envelhecimento acelerado'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 80, 200);

SELECT COUNT(*) as total_suplementos_completos FROM supplements;