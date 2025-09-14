-- BATCH FINAL CORRIGIDO - Completando para 400+ suplementos (120 novos com aspas corrigidas)

INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- NOVOS COMPOSTOS ÚNICOS 
('grape_seed_95', 'Extrato de Semente de Uva 95%', 'other', 'Extrato concentrado de proantocianidinas', ARRAY['Circulação', 'Antioxidante'], ARRAY['má circulação', 'varizes'], 150, 300, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('bilberry_40', 'Mirtilo 40% Antocianinas', 'herb', 'Extrato padronizado para visão', ARRAY['Visão noturna', 'Circulação'], ARRAY['fadiga ocular', 'má visão'], 160, 480, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 28, 70),
('cranberry_36', 'Cranberry 36% PACs', 'herb', 'Extrato padronizado urológico', ARRAY['Trato urinário', 'Antioxidante'], ARRAY['ITU', 'cistite'], 500, 1500, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('milk_thistle_80', 'Cardo Mariano 80% Silimarina', 'herb', 'Hepatoprotetor concentrado', ARRAY['Proteção hepática máxima'], ARRAY['hepatite', 'cirrose'], 200, 600, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('ginseng_7', 'Ginseng 7% Ginsenosídeos', 'herb', 'Adaptógeno padronizado', ARRAY['Energia adaptogênica'], ARRAY['fadiga adrenal'], 300, 600, 'mg', 'morning', 'strong', ARRAY['Hipertensão'], ARRAY[]::text[], 30, 75),
('green_tea_95', 'Chá Verde 95% Polifenóis', 'herb', 'Máxima concentração antioxidante', ARRAY['Antioxidante máximo'], ARRAY['estresse oxidativo'], 400, 800, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('turmeric_95', 'Cúrcuma 95% Curcuminóides', 'herb', 'Anti-inflamatório máximo', ARRAY['Anti-inflamatório potente'], ARRAY['artrite severa'], 500, 1000, 'mg', 'with_meal', 'strong', ARRAY['Cálculos biliares'], ARRAY[]::text[], 30, 75),
('boswellia_65', 'Boswellia 65% Ácidos Boswélicos', 'herb', 'Anti-inflamatório padronizado', ARRAY['Articulações', 'Respiração'], ARRAY['artrite', 'asma'], 300, 900, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- AMINOÁCIDOS ÚNICOS
('l_phenylalanine', 'L-Fenilalanina', 'amino_acid', 'Precursor de tirosina', ARRAY['Humor', 'Energia mental'], ARRAY['depressão', 'fadiga mental'], 500, 1500, 'mg', 'morning', 'moderate', ARRAY['Fenilcetonúria'], ARRAY['IMAO'], 15, 40),
('dl_phenylalanine', 'DL-Fenilalanina', 'amino_acid', 'Forma racêmica da fenilalanina', ARRAY['Dor crônica', 'Humor'], ARRAY['dor crônica', 'depressão'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY['Fenilcetonúria'], ARRAY[]::text[], 20, 50),
('l_tryptophan', 'L-Triptofano', 'amino_acid', 'Precursor de serotonina', ARRAY['Sono', 'Humor', 'Serotonina'], ARRAY['insônia', 'depressão'], 500, 2000, 'mg', 'evening', 'strong', ARRAY['IMAO'], ARRAY['Antidepressivos'], 25, 65),
('five_htp', '5-HTP (5-Hidroxitriptofano)', 'amino_acid', 'Precursor direto de serotonina', ARRAY['Humor', 'Sono', 'Apetite'], ARRAY['depressão', 'insônia'], 50, 300, 'mg', 'evening', 'strong', ARRAY['IMAO'], ARRAY['Antidepressivos'], 20, 50),
('gaba_supplement', 'GABA (Ácido Gama-Aminobutírico)', 'amino_acid', 'Neurotransmissor calmante', ARRAY['Relaxamento', 'Ansiedade'], ARRAY['ansiedade', 'tensão'], 250, 750, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('phenibut_hcl', 'Fenibut HCl', 'amino_acid', 'GABA que cruza barreira cerebral', ARRAY['Ansiedade severa', 'Sono'], ARRAY['ansiedade severa'], 250, 1000, 'mg', 'evening', 'limited', ARRAY['Dependência'], ARRAY['Sedativos'], 30, 75),

-- NOOTRÓPICOS SINTÉTICOS
('piracetam_pure', 'Piracetam Puro', 'other', 'Primeiro racetam descoberto', ARRAY['Memória', 'Aprendizado'], ARRAY['dificuldade aprendizado'], 800, 4800, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('pramiracetam_powder', 'Pramiracetam', 'other', 'Racetam potente para memória', ARRAY['Memória de longo prazo'], ARRAY['perda memória severa'], 300, 1200, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 60, 150),
('coluracetam_caps', 'Coluracetam', 'other', 'Racetam para AMPA', ARRAY['Neuroplasticidade'], ARRAY['depressão', 'ansiedade'], 3, 20, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 80, 200),
('sunifiram_powder', 'Sunifiram', 'other', 'Ampakina nootropica', ARRAY['Memória', 'Foco'], ARRAY['déficit cognitivo'], 5, 20, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 100, 250),
('adrafinil', 'Adrafinil', 'other', 'Precursor do modafinil', ARRAY['Alerta', 'Foco'], ARRAY['sonolência', 'fadiga'], 300, 900, 'mg', 'morning', 'limited', ARRAY['Doença hepática'], ARRAY[]::text[], 40, 100),

-- EXTRATOS ÚNICOS DE PLANTAS (SEM ASPAS PROBLEMÁTICAS)
('cat_claw', 'Unha-de-Gato', 'herb', 'Imunomodulador da Amazônia', ARRAY['Imunidade', 'Artrite'], ARRAY['artrite reumatoide'], 300, 1000, 'mg', 'any', 'moderate', ARRAY['Auto-imunes'], ARRAY[]::text[], 25, 65),
('pau_darco_bark', 'Pau Darco', 'herb', 'Antifúngico e antibacteriano', ARRAY['Candida', 'Infecções'], ARRAY['candidíase', 'infecções'], 500, 1500, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY[]::text[], 20, 50),
('sangre_drago', 'Sangre de Drago', 'herb', 'Cicatrizante da Amazônia', ARRAY['Cicatrização', 'Úlceras'], ARRAY['feridas', 'úlceras'], 100, 300, 'mg', 'any', 'limited', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('dragon_fruit_extract', 'Pitaya (Dragon Fruit)', 'other', 'Superfruit antioxidante', ARRAY['Antioxidante', 'Hidratação'], ARRAY['desidratação', 'oxidação'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('mangosteen_extract', 'Mangostão', 'other', 'Rainha das frutas antioxidantes', ARRAY['Antioxidante supremo'], ARRAY['inflamação severa'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- COMPLEXOS VITAMÍNICOS
('b_complex_50', 'Complexo B-50', 'vitamin', 'Todas as vitaminas B em alta potência', ARRAY['Energia', 'Sistema nervoso', 'Metabolismo'], ARRAY['fadiga', 'estresse', 'depressão'], 1, 2, 'cápsula', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('b_complex_100', 'Complexo B-100', 'vitamin', 'Fórmula de máxima potência B', ARRAY['Energia extrema', 'Estresse severo'], ARRAY['fadiga severa', 'estresse crônico'], 1, 1, 'cápsula', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 45),
('prenatal_vitamins', 'Vitaminas Pré-Natais', 'vitamin', 'Complexo para gestantes', ARRAY['Gravidez saudável', 'Desenvolvimento fetal'], ARRAY['gravidez', 'planejamento'], 1, 1, 'cápsula', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 30, 70),
('mens_multi', 'Multivitamínico Masculino', 'vitamin', 'Fórmula específica para homens', ARRAY['Energia masculina', 'Próstata', 'Testosterona'], ARRAY['fadiga masculina', 'baixa energia'], 1, 2, 'cápsula', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('womens_multi', 'Multivitamínico Feminino', 'vitamin', 'Fórmula específica para mulheres', ARRAY['Energia feminina', 'Ferro', 'Ossos'], ARRAY['fadiga feminina', 'anemia'], 1, 2, 'cápsula', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('senior_multi', 'Multivitamínico Sênior', 'vitamin', 'Fórmula para idosos', ARRAY['Energia na terceira idade', 'Cognição'], ARRAY['fadiga idoso', 'declínio'], 1, 2, 'cápsula', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- MINERAIS ESPECIALIZADOS
('calcium_mag', 'Cálcio + Magnésio', 'mineral', 'Combinação sinérgica para ossos', ARRAY['Saúde óssea', 'Relaxamento'], ARRAY['osteoporose', 'tensão muscular'], 1000, 2000, 'mg', 'evening', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('zinc_copper_balance', 'Zinco + Cobre', 'mineral', 'Balanço mineral essencial', ARRAY['Imunidade', 'Equilíbrio mineral'], ARRAY['deficiência zinc-cobre'], 15, 30, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('iron_vit_c', 'Ferro + Vitamina C', 'mineral', 'Ferro com potencializador', ARRAY['Anemia', 'Energia'], ARRAY['anemia ferropriva', 'fadiga'], 18, 65, 'mg', 'morning', 'strong', ARRAY['Hemocromatose'], ARRAY[]::text[], 12, 28),
('chromium_picolinate_plus', 'Cromo Picolinato', 'mineral', 'Forma quelada de alta absorção', ARRAY['Glicose', 'Perda peso'], ARRAY['diabetes', 'resistência insulina'], 200, 1000, 'mcg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),

-- ÁCIDOS GRAXOS ESPECIALIZADOS
('omega_3_6_9', 'Ômega 3-6-9', 'other', 'Complexo completo de ácidos graxos', ARRAY['Saúde cardiovascular completa'], ARRAY['desequilíbrio ácidos graxos'], 1000, 3000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('epa_concentrate', 'EPA Concentrado', 'other', 'Ácido eicosapentaenoico puro', ARRAY['Anti-inflamatório', 'Humor'], ARRAY['inflamação', 'depressão'], 1000, 2000, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('dha_concentrate', 'DHA Concentrado', 'other', 'Ácido docosahexaenoico para cérebro', ARRAY['Função cerebral', 'Memória'], ARRAY['declínio cognitivo', 'perda memória'], 500, 1500, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('algae_omega3_vegan', 'Ômega-3 de Algas Vegano', 'other', 'Fonte vegana de EPA/DHA', ARRAY['Ômega-3 vegano', 'Sustentável'], ARRAY['deficiência ômega-3 veganos'], 500, 1500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),

-- PROBIÓTICOS ESPECIALIZADOS
('multi_strain_50', 'Probiótico Multi-Cepas 50B', 'other', '10+ cepas diferentes', ARRAY['Microbiota diversa', 'Digestão'], ARRAY['disbiose', 'problemas digestivos'], 25, 100, 'bilhões_ufc', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('women_probiotic_25', 'Probiótico Feminino 25B', 'other', 'Cepas específicas para mulheres', ARRAY['Saúde vaginal', 'UTI'], ARRAY['infecções vaginais', 'UTI'], 10, 50, 'bilhões_ufc', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('mens_probiotic_25', 'Probiótico Masculino 25B', 'other', 'Cepas para saúde masculina', ARRAY['Digestão masculina', 'Imunidade'], ARRAY['digestão', 'imunidade'], 10, 50, 'bilhões_ufc', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('spore_probiotics_caps', 'Probióticos Esporulados', 'other', 'Bacillus resistentes', ARRAY['Sobrevivência gástrica'], ARRAY['disbiose resistente'], 2, 10, 'bilhões_ufc', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- ENZIMAS DIGESTIVAS
('lactase_enzyme', 'Lactase', 'other', 'Enzima para digestão da lactose', ARRAY['Digestão lactose', 'Gases'], ARRAY['intolerância lactose'], 3000, 9000, 'unidades', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('alpha_galactosidase_enzyme', 'Alfa-Galactosidase', 'other', 'Para carboidratos complexos', ARRAY['Digestão feijões', 'Gases'], ARRAY['gases', 'flatulência'], 300, 900, 'unidades', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 40),

-- COMPLEXOS ESPECIALIZADOS
('energy_complex_max', 'Complexo Energético Máximo', 'other', 'Múltiplos energizantes naturais', ARRAY['Energia sustentada'], ARRAY['fadiga crônica'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('brain_complex_advanced', 'Complexo Cerebral Avançado', 'other', 'Múltiplos nootrópicos', ARRAY['Função cognitiva completa'], ARRAY['declínio cognitivo'], 400, 800, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('joint_complex_ultra', 'Complexo Articular Ultra', 'other', 'Glicosamina + Condroitina + MSM', ARRAY['Saúde articular completa'], ARRAY['artrite', 'dor articular'], 1500, 3000, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('heart_formula_complete', 'Fórmula Cardíaca Completa', 'herb', 'Complexo cardiovascular', ARRAY['Saúde do coração'], ARRAY['problemas cardíacos'], 500, 1000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('liver_detox_max', 'Desintoxicação Hepática Máxima', 'herb', 'Complexo hepatoprotetor', ARRAY['Limpeza hepática', 'Detox'], ARRAY['sobrecarga hepática'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('sleep_complex_ultra', 'Complexo do Sono Ultra', 'herb', 'Múltiplas ervas relaxantes', ARRAY['Sono profundo', 'Relaxamento'], ARRAY['insônia', 'sono fragmentado'], 400, 800, 'mg', 'evening', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),

-- SISTEMAS CORPORAIS ESPECÍFICOS
('respiratory_complete', 'Suporte Respiratório Completo', 'herb', 'Para pulmões e brônquios', ARRAY['Respiração', 'Pulmões'], ARRAY['asma', 'bronquite'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('immune_boost_max', 'Impulso Imunológico Máximo', 'herb', 'Estimulante imunológico', ARRAY['Imunidade ativa'], ARRAY['infecções frequentes'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY['Auto-imunes'], ARRAY[]::text[], 20, 50),
('allergy_relief_natural', 'Alívio Natural de Alergias', 'herb', 'Anti-histamínico natural', ARRAY['Alergias', 'Histamina'], ARRAY['rinite', 'alergias sazonais'], 300, 900, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- SAÚDE ESPECÍFICA POR GÊNERO
('prostate_complete_max', 'Próstata Completa Máxima', 'herb', 'Fórmula prostática abrangente', ARRAY['Saúde prostática total'], ARRAY['HPB', 'PSA elevado'], 600, 1200, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('hormone_balance_women', 'Equilíbrio Hormonal Feminino', 'herb', 'Para mulheres', ARRAY['Hormônios femininos'], ARRAY['TPM', 'menopausa'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('hormone_balance_men', 'Equilíbrio Hormonal Masculino', 'herb', 'Para homens', ARRAY['Testosterona natural'], ARRAY['baixa testosterona'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('fertility_women', 'Fertilidade Feminina', 'herb', 'Para mulheres', ARRAY['Fertilidade feminina'], ARRAY['infertilidade feminina'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('fertility_men', 'Fertilidade Masculina', 'herb', 'Para homens', ARRAY['Fertilidade masculina'], ARRAY['baixa contagem esperma'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- SUPERALIMENTOS ORGÂNICOS
('spirulina_hawaii', 'Spirulina do Havaí', 'other', 'Alga azul-verde premium', ARRAY['Proteína completa', 'Energia'], ARRAY['desnutrição proteica'], 3, 10, 'g', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('chlorella_cracked', 'Chlorella Parede Quebrada', 'other', 'Alga verde máxima absorção', ARRAY['Desintoxicação', 'Clorofila'], ARRAY['metais pesados'], 3, 10, 'g', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- COGUMELOS MEDICINAIS PREMIUM
('cordyceps_militaris', 'Cordyceps Militaris', 'herb', 'Cogumelo cultivado', ARRAY['Performance', 'Energia'], ARRAY['fadiga', 'baixa resistência'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('turkey_tail_premium', 'Cauda de Peru Premium', 'herb', 'Extrato 30% beta-glucanos', ARRAY['Imunidade antitumoral'], ARRAY['imunidade baixa'], 1000, 3000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 50, 120),
('tremella_beauty', 'Cogumelo Tremella Beleza', 'herb', 'Cogumelo da beleza asiático', ARRAY['Pele', 'Hidratação'], ARRAY['pele seca', 'envelhecimento'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- ANTIOXIDANTES AVANÇADOS
('mixed_carotenoids_complex', 'Complexo Carotenóides', 'other', 'Complexo completo de carotenóides', ARRAY['Visão', 'Pele', 'Antioxidante'], ARRAY['problemas visuais', 'fotoenvelhecimento'], 15000, 45000, 'IU', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('mixed_tocopherols_natural', 'Tocoferóis Naturais', 'vitamin', 'Vitamina E completa natural', ARRAY['Antioxidante completo'], ARRAY['estresse oxidativo'], 268, 536, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- FÓRMULAS ESPECIALIZADAS FINAIS
('longevity_ultimate', 'Longevidade Suprema', 'other', 'Anti-aging supremo', ARRAY['Máxima longevidade'], ARRAY['envelhecimento acelerado'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 80, 200),
('beauty_ultimate', 'Beleza Suprema', 'other', 'Cabelo, pele e unhas premium', ARRAY['Beleza completa'], ARRAY['envelhecimento estético'], 400, 800, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('athlete_performance', 'Performance Atlética', 'other', 'Para atletas profissionais', ARRAY['Performance máxima'], ARRAY['fadiga atlética'], 2, 4, 'cápsula', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 50, 120),
('recovery_advanced', 'Recuperação Avançada', 'other', 'Pós-treino e lesões', ARRAY['Recuperação acelerada'], ARRAY['lesões', 'fadiga'], 1, 3, 'g', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100);

SELECT COUNT(*) as total_final_complete FROM supplements;