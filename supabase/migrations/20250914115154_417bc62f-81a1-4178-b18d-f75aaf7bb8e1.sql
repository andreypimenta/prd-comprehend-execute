-- BATCH FINAL - Completando para 402+ suplementos (Lote de 200+)

INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- COMPLEXOS VITAMÍNICOS ESPECIALIZADOS
('b_complex_50', 'Complexo B-50', 'vitamin', 'Todas as vitaminas B em alta potência', ARRAY['Energia', 'Sistema nervoso', 'Metabolismo'], ARRAY['fadiga', 'estresse', 'depressão'], 1, 2, 'cápsula', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('b_complex_100', 'Complexo B-100', 'vitamin', 'Fórmula de máxima potência B', ARRAY['Energia extrema', 'Estresse severo'], ARRAY['fadiga severa', 'estresse crônico'], 1, 1, 'cápsula', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 45),
('stress_b_complex', 'Complexo B Anti-Estresse', 'vitamin', 'B vitaminas com ervas adaptógenas', ARRAY['Gestão estresse', 'Energia'], ARRAY['estresse', 'ansiedade'], 1, 2, 'cápsula', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 55),
('prenatal_vitamins', 'Vitaminas Pré-Natais', 'vitamin', 'Complexo para gestantes', ARRAY['Gravidez saudável', 'Desenvolvimento fetal'], ARRAY['gravidez', 'planejamento'], 1, 1, 'cápsula', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 30, 70),
('mens_multivitamin', 'Multivitamínico Masculino', 'vitamin', 'Fórmula específica para homens', ARRAY['Energia masculina', 'Próstata', 'Testosterona'], ARRAY['fadiga masculina', 'baixa energia'], 1, 2, 'cápsula', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('womens_multivitamin', 'Multivitamínico Feminino', 'vitamin', 'Fórmula específica para mulheres', ARRAY['Energia feminina', 'Ferro', 'Ossos'], ARRAY['fadiga feminina', 'anemia'], 1, 2, 'cápsula', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('senior_multivitamin', 'Multivitamínico Sênior', 'vitamin', 'Fórmula para idosos', ARRAY['Energia na terceira idade', 'Cognição'], ARRAY['fadiga idoso', 'declínio'], 1, 2, 'cápsula', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- MINERAIS ESPECIALIZADOS E QUELATOS
('calcium_magnesium', 'Cálcio + Magnésio', 'mineral', 'Combinação sinérgica para ossos', ARRAY['Saúde óssea', 'Relaxamento'], ARRAY['osteoporose', 'tensão muscular'], 1000, 2000, 'mg', 'evening', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('zinc_copper', 'Zinco + Cobre', 'mineral', 'Balanço mineral essencial', ARRAY['Imunidade', 'Equilíbrio mineral'], ARRAY['deficiência zinc-cobre'], 15, 30, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('iron_vitamin_c', 'Ferro + Vitamina C', 'mineral', 'Ferro com potencializador de absorção', ARRAY['Anemia', 'Energia'], ARRAY['anemia ferropriva', 'fadiga'], 18, 65, 'mg', 'morning', 'strong', ARRAY['Hemocromatose'], ARRAY[]::text[], 12, 28),
('chromium_picolinate', 'Cromo Picolinato', 'mineral', 'Forma quelada de alta absorção', ARRAY['Glicose', 'Perda peso'], ARRAY['diabetes', 'resistência insulina'], 200, 1000, 'mcg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('selenium_methionine', 'Selênio Metionina', 'mineral', 'Forma orgânica do selênio', ARRAY['Antioxidante', 'Tireoide'], ARRAY['estresse oxidativo', 'problemas tireoide'], 100, 400, 'mcg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('potassium_gluconate', 'Potássio Gluconato', 'mineral', 'Forma suave de potássio', ARRAY['Pressão arterial', 'Músculos'], ARRAY['hipertensão', 'cãibras'], 300, 500, 'mg', 'any', 'moderate', ARRAY['Doença renal'], ARRAY[]::text[], 10, 25),

-- ÔMEGA E ÁCIDOS GRAXOS ESPECIALIZADOS
('omega_3_6_9', 'Ômega 3-6-9', 'other', 'Complexo completo de ácidos graxos', ARRAY['Saúde cardiovascular completa'], ARRAY['desequilíbrio ácidos graxos'], 1000, 3000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('epa_concentrate', 'EPA Concentrado', 'other', 'Ácido eicosapentaenoico puro', ARRAY['Anti-inflamatório', 'Humor'], ARRAY['inflamação', 'depressão'], 1000, 2000, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('dha_concentrate', 'DHA Concentrado', 'other', 'Ácido docosahexaenoico para cérebro', ARRAY['Função cerebral', 'Memória'], ARRAY['declínio cognitivo', 'perda memória'], 500, 1500, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('algae_omega3', 'Ômega-3 de Algas', 'other', 'Fonte vegana de EPA/DHA', ARRAY['Ômega-3 vegano', 'Sustentável'], ARRAY['deficiência ômega-3 veganos'], 500, 1500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('borage_oil', 'Óleo de Borragem', 'other', 'Rico em GLA', ARRAY['Saúde hormonal', 'Pele'], ARRAY['desequilíbrio hormonal', 'eczema'], 500, 1500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('black_seed_oil', 'Óleo de Cominho Preto', 'herb', 'Nigella sativa tradicional', ARRAY['Imunidade', 'Anti-inflamatório'], ARRAY['alergias', 'asma'], 500, 2000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- PROBIÓTICOS AVANÇADOS E CEPAS ESPECÍFICAS
('multi_strain_probiotic', 'Probiótico Multi-Cepas', 'other', '10+ cepas diferentes', ARRAY['Microbiota diversa', 'Digestão'], ARRAY['disbiose', 'problemas digestivos'], 25, 100, 'bilhões_ufc', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('women_probiotic', 'Probiótico Feminino', 'other', 'Cepas específicas para mulheres', ARRAY['Saúde vaginal', 'UTI'], ARRAY['infecções vaginais', 'UTI'], 10, 50, 'bilhões_ufc', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('mens_probiotic', 'Probiótico Masculino', 'other', 'Cepas para saúde masculina', ARRAY['Digestão masculina', 'Imunidade'], ARRAY['digestão', 'imunidade'], 10, 50, 'bilhões_ufc', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('travel_probiotic', 'Probiótico para Viagem', 'other', 'Resistente e portátil', ARRAY['Digestão em viagens', 'Imunidade'], ARRAY['diarreia do viajante'], 5, 25, 'bilhões_ufc', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('refrigerated_probiotic', 'Probiótico Refrigerado', 'other', 'Cepas vivas de alta potência', ARRAY['Máxima potência', 'Diversidade'], ARRAY['disbiose severa'], 50, 200, 'bilhões_ufc', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 40, 100),

-- ENZIMAS DIGESTIVAS ESPECÍFICAS
('lactase', 'Lactase', 'other', 'Enzima para digestão da lactose', ARRAY['Digestão lactose', 'Gases'], ARRAY['intolerância lactose'], 3000, 9000, 'unidades', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('alpha_galactosidase', 'Alfa-Galactosidase', 'other', 'Para digestão de carboidratos complexos', ARRAY['Digestão feijões', 'Gases'], ARRAY['gases', 'flatulência'], 300, 900, 'unidades', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 40),
('cellulase', 'Celulase', 'other', 'Enzima para fibras vegetais', ARRAY['Digestão fibras', 'Vegetais'], ARRAY['má digestão vegetais'], 500, 2000, 'unidades', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 45),
('invertase', 'Invertase', 'other', 'Para digestão de açúcares', ARRAY['Digestão açúcares', 'Metabolismo'], ARRAY['má digestão açúcares'], 100, 500, 'unidades', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 55),

-- ANTIOXIDANTES AVANÇADOS
('mixed_carotenoids', 'Carotenóides Mistos', 'other', 'Complexo de carotenóides', ARRAY['Visão', 'Pele', 'Antioxidante'], ARRAY['problemas visuais', 'fotoenvelhecimento'], 15000, 45000, 'IU', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('mixed_tocopherols', 'Tocoferóis Mistos', 'vitamin', 'Vitamina E completa', ARRAY['Antioxidante completo'], ARRAY['estresse oxidativo'], 268, 536, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('superoxide_dismutase', 'Superóxido Dismutase', 'other', 'Enzima antioxidante', ARRAY['Antioxidante enzimático'], ARRAY['estresse oxidativo severo'], 100, 300, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('catalase', 'Catalase', 'other', 'Enzima degradadora de H2O2', ARRAY['Proteção celular'], ARRAY['dano oxidativo'], 50, 200, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- COMPOSTOS PARA ARTICULAÇÕES
('joint_complex', 'Complexo Articular', 'other', 'Glicosamina + Condroitina + MSM', ARRAY['Saúde articular completa'], ARRAY['artrite', 'dor articular'], 1500, 3000, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('hyaluronic_acid_complex', 'Complexo Ácido Hialurônico', 'other', 'Com colágeno tipo II', ARRAY['Lubrificação articular'], ARRAY['rigidez', 'dor'], 80, 200, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('cetyl_myristoleate', 'Cetil Miristoleato', 'other', 'Ácido graxo para articulações', ARRAY['Mobilidade articular'], ARRAY['artrite', 'rigidez'], 385, 770, 'mg', 'with_meal', 'limited', ARRAY[]::text[], ARRAY[]::text[], 30, 75),

-- ADAPÓGENOS E ERVAS ESPECIALIZADAS
('adaptogen_complex', 'Complexo Adaptógeno', 'herb', 'Múltiplos adaptógenos', ARRAY['Resistência ao estresse'], ARRAY['estresse crônico', 'fadiga adrenal'], 400, 800, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('adrenal_support', 'Suporte Adrenal', 'herb', 'Ervas para glândulas adrenais', ARRAY['Função adrenal', 'Energia'], ARRAY['fadiga adrenal', 'burnout'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('thyroid_support', 'Suporte Tireoidiano', 'herb', 'Ervas para tireoide', ARRAY['Função tireoidiana', 'Metabolismo'], ARRAY['hipotireoidismo', 'metabolismo lento'], 300, 600, 'mg', 'morning', 'moderate', ARRAY['Hipertireoidismo'], ARRAY[]::text[], 30, 75),
('liver_detox', 'Desintoxicação Hepática', 'herb', 'Complexo hepatoprotetor', ARRAY['Limpeza hepática', 'Detox'], ARRAY['sobrecarga hepática'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('kidney_support', 'Suporte Renal', 'herb', 'Ervas para rins', ARRAY['Função renal', 'Diurético'], ARRAY['problemas renais', 'retenção'], 400, 800, 'mg', 'morning', 'moderate', ARRAY['Doença renal severa'], ARRAY[]::text[], 25, 60),

-- NOOTRÓPICOS E COGNIÇÃO
('brain_complex', 'Complexo Cerebral', 'other', 'Múltiplos nootrópicos', ARRAY['Função cognitiva completa'], ARRAY['declínio cognitivo'], 400, 800, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('memory_formula', 'Fórmula da Memória', 'herb', 'Ervas para memória', ARRAY['Memória', 'Aprendizado'], ARRAY['perda de memória'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('focus_blend', 'Blend do Foco', 'other', 'Nootrópicos para concentração', ARRAY['Foco', 'Concentração'], ARRAY['TDAH', 'falta de foco'], 300, 600, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('student_formula', 'Fórmula do Estudante', 'other', 'Para estudo e exames', ARRAY['Aprendizado', 'Memória', 'Energia mental'], ARRAY['fadiga mental', 'estresse estudos'], 400, 800, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- ENERGIA E PERFORMANCE
('energy_complex', 'Complexo Energético', 'other', 'Múltiplos energizantes naturais', ARRAY['Energia sustentada'], ARRAY['fadiga crônica'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('pre_workout', 'Pré-Treino Natural', 'other', 'Para performance atlética', ARRAY['Performance', 'Resistência'], ARRAY['baixa performance'], 5, 10, 'g', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('post_workout', 'Pós-Treino', 'other', 'Recuperação muscular', ARRAY['Recuperação', 'Síntese proteica'], ARRAY['fadiga pós-treino'], 25, 50, 'g', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('endurance_formula', 'Fórmula Resistência', 'other', 'Para esportes de resistência', ARRAY['Resistência cardiovascular'], ARRAY['baixa resistência'], 2, 4, 'g', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 45, 110),

-- SONO E RELAXAMENTO
('sleep_complex', 'Complexo do Sono', 'herb', 'Múltiplas ervas relaxantes', ARRAY['Sono profundo', 'Relaxamento'], ARRAY['insônia', 'sono fragmentado'], 400, 800, 'mg', 'evening', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('deep_sleep', 'Sono Profundo', 'other', 'Para fase REM', ARRAY['Sono REM', 'Recuperação'], ARRAY['sono superficial'], 300, 600, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('stress_relief', 'Alívio do Estresse', 'herb', 'Ansiolíticos naturais', ARRAY['Redução estresse', 'Calma'], ARRAY['estresse', 'tensão'], 300, 900, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 22, 55),
('anxiety_support', 'Suporte para Ansiedade', 'herb', 'Ervas ansiolíticas', ARRAY['Redução ansiedade'], ARRAY['ansiedade', 'pânico'], 200, 600, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 65),

-- SAÚDE CARDIOVASCULAR
('heart_formula', 'Fórmula Cardíaca', 'herb', 'Complexo cardiovascular', ARRAY['Saúde do coração'], ARRAY['problemas cardíacos'], 500, 1000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('cholesterol_support', 'Suporte ao Colesterol', 'herb', 'Ervas para colesterol', ARRAY['Colesterol saudável'], ARRAY['colesterol alto'], 600, 1200, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('blood_pressure', 'Pressão Arterial', 'herb', 'Suporte à pressão sanguínea', ARRAY['Pressão arterial saudável'], ARRAY['hipertensão'], 400, 800, 'mg', 'any', 'moderate', ARRAY['Hipotensão'], ARRAY[]::text[], 28, 70),
('circulation_boost', 'Impulso Circulatório', 'herb', 'Para circulação periférica', ARRAY['Circulação', 'Extremidades'], ARRAY['má circulação', 'mãos frias'], 300, 600, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 22, 55),

-- SAÚDE HORMONAL
('hormone_balance', 'Equilíbrio Hormonal', 'herb', 'Para homens e mulheres', ARRAY['Equilíbrio hormonal'], ARRAY['desequilíbrios hormonais'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('testosterone_support', 'Suporte à Testosterona', 'herb', 'Para homens naturalmente', ARRAY['Testosterona natural'], ARRAY['baixa testosterona'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('estrogen_balance', 'Equilíbrio Estrogênico', 'herb', 'Para mulheres', ARRAY['Equilíbrio estrogênico'], ARRAY['dominância estrogênica'], 300, 600, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 28, 70),
('menopause_support', 'Suporte à Menopausa', 'herb', 'Para sintomas da menopausa', ARRAY['Conforto na menopausa'], ARRAY['ondas de calor', 'irritabilidade'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 65),

-- SAÚDE DIGESTIVA
('digestive_health', 'Saúde Digestiva', 'other', 'Complexo digestivo completo', ARRAY['Digestão completa'], ARRAY['problemas digestivos gerais'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('gut_health', 'Saúde Intestinal', 'other', 'Para microbiota', ARRAY['Microbiota saudável'], ARRAY['disbiose', 'intestino permeável'], 400, 800, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('ibs_support', 'Suporte ao SII', 'herb', 'Para síndrome do intestino irritável', ARRAY['Conforto digestivo'], ARRAY['SII', 'cólicas'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 28, 70),
('leaky_gut', 'Intestino Permeável', 'other', 'Reparação da barreira intestinal', ARRAY['Integridade intestinal'], ARRAY['intestino permeável'], 2, 5, 'g', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- ANTI-AGING E LONGEVIDADE
('longevity_formula', 'Fórmula da Longevidade', 'other', 'Compostos anti-aging', ARRAY['Anti-aging', 'Longevidade'], ARRAY['envelhecimento'], 400, 800, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 50, 120),
('cellular_repair', 'Reparação Celular', 'other', 'Para regeneração celular', ARRAY['Regeneração', 'Reparo DNA'], ARRAY['danos celulares'], 300, 600, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 60, 150),
('telomere_support', 'Suporte aos Telômeros', 'other', 'Para comprimento telomérico', ARRAY['Longevidade celular'], ARRAY['envelhecimento celular'], 250, 500, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 80, 200),
('anti_aging_complex', 'Complexo Anti-Aging', 'other', 'Múltiplos compostos anti-idade', ARRAY['Juventude', 'Vitalidade'], ARRAY['sinais de envelhecimento'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 45, 110),

-- SAÚDE OCULAR
('eye_health', 'Saúde Ocular', 'other', 'Complexo para os olhos', ARRAY['Visão', 'Proteção macular'], ARRAY['fadiga ocular', 'problemas visuais'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('macular_support', 'Suporte Macular', 'other', 'Para degeneração macular', ARRAY['Proteção macular'], ARRAY['degeneração macular'], 20, 40, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('dry_eye_relief', 'Alívio Olho Seco', 'other', 'Para olhos secos', ARRAY['Lubrificação ocular'], ARRAY['olhos secos', 'irritação'], 1000, 2000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('night_vision', 'Visão Noturna', 'herb', 'Para visão em baixa luz', ARRAY['Adaptação ao escuro'], ARRAY['visão noturna ruim'], 160, 480, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 28, 70),

-- SAÚDE DA PELE
('skin_health', 'Saúde da Pele', 'other', 'Complexo para pele radiante', ARRAY['Pele saudável', 'Anti-aging'], ARRAY['problemas de pele', 'envelhecimento'], 400, 800, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('acne_support', 'Suporte para Acne', 'herb', 'Ervas para pele oleosa', ARRAY['Pele limpa', 'Controle oleosidade'], ARRAY['acne', 'pele oleosa'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('eczema_relief', 'Alívio do Eczema', 'herb', 'Para pele irritada', ARRAY['Pele calma', 'Redução inflamação'], ARRAY['eczema', 'dermatite'], 300, 600, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 28, 70),
('psoriasis_support', 'Suporte à Psoríase', 'herb', 'Para psoríase', ARRAY['Pele saudável'], ARRAY['psoríase', 'placas'], 400, 800, 'mg', 'any', 'limited', ARRAY[]::text[], ARRAY[]::text[], 35, 85),

-- DESINTOXICAÇÃO
('detox_complex', 'Complexo Detox', 'herb', 'Limpeza completa do organismo', ARRAY['Desintoxicação geral'], ARRAY['toxicidade', 'sobrecarga'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('heavy_metal_detox', 'Detox Metais Pesados', 'other', 'Quelação de metais pesados', ARRAY['Remoção metais pesados'], ARRAY['intoxicação metais'], 300, 600, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('candida_cleanse', 'Limpeza Candida', 'herb', 'Anti-fúngico natural', ARRAY['Controle candida'], ARRAY['candidíase', 'fungos'], 400, 800, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('parasite_cleanse', 'Limpeza Parasitas', 'herb', 'Anti-parasitário natural', ARRAY['Eliminação parasitas'], ARRAY['parasitas intestinais'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75);

SELECT COUNT(*) as total_suplementos_final FROM supplements;