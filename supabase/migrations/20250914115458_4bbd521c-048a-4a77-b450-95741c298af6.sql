-- BATCH FINAL EXTRA - Completando para mais de 402 suplementos

INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- MAIS VITAMINAS E VARIAÇÕES
('niacin_flush_free', 'Niacina Flush-Free', 'vitamin', 'Vitamina B3 sem flush', ARRAY['Colesterol', 'Energia'], ARRAY['colesterol alto', 'fadiga'], 250, 1000, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('thiamine_hcl', 'Tiamina HCl', 'vitamin', 'Vitamina B1 sintética', ARRAY['Energia', 'Função nervosa'], ARRAY['fadiga', 'neuropatia'], 50, 500, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 10, 25),
('riboflavin_5_phosphate', 'Riboflavina 5-Fosfato', 'vitamin', 'Forma ativa da B2', ARRAY['Energia', 'Metabolismo'], ARRAY['fadiga', 'metabolismo lento'], 25, 100, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('cyanocobalamin', 'Cianocobalamina', 'vitamin', 'Forma sintética da B12', ARRAY['Energia', 'Anemia'], ARRAY['anemia perniciosa', 'fadiga'], 100, 5000, 'mcg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('hydroxycobalamin', 'Hidroxocobalamina', 'vitamin', 'Precursor natural da B12', ARRAY['Desintoxicação', 'Energia'], ARRAY['intoxicação cianeto', 'fadiga'], 1000, 5000, 'mcg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('calcium_d_glucarate', 'Cálcio D-Glucarato', 'other', 'Desintoxicante hormonal', ARRAY['Desintoxicação estrogênica'], ARRAY['excesso estrogênico'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('vitamin_d2_vegan', 'Vitamina D2 Vegana', 'vitamin', 'Fonte vegetal de vitamina D', ARRAY['Ossos veganos', 'Imunidade'], ARRAY['deficiência D veganos'], 1000, 4000, 'IU', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),

-- MINERAIS ESPECIALIZADOS
('calcium_hydroxyapatite', 'Cálcio Hidroxiapatita', 'mineral', 'Forma óssea do cálcio', ARRAY['Densidade óssea'], ARRAY['osteoporose', 'fraturas'], 500, 1500, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('magnesium_oxide', 'Óxido de Magnésio', 'mineral', 'Forma laxativa do magnésio', ARRAY['Constipação', 'Magnésio'], ARRAY['constipação severa'], 250, 800, 'mg', 'evening', 'strong', ARRAY['Diarreia'], ARRAY[]::text[], 8, 20),
('magnesium_citrate', 'Citrato de Magnésio', 'mineral', 'Forma absorvível do magnésio', ARRAY['Relaxamento', 'Digestão'], ARRAY['tensão', 'constipação'], 200, 600, 'mg', 'evening', 'strong', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('zinc_gluconate', 'Gluconato de Zinco', 'mineral', 'Zinco para resfriados', ARRAY['Imunidade', 'Resfriados'], ARRAY['resfriados', 'gripes'], 15, 50, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 8, 20),
('zinc_sulfate', 'Sulfato de Zinco', 'mineral', 'Forma tradicional do zinco', ARRAY['Cicatrização', 'Acne'], ARRAY['feridas', 'acne'], 15, 40, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 6, 15),
('iron_fumarate', 'Fumarato de Ferro', 'mineral', 'Ferro de alta absorção', ARRAY['Anemia', 'Energia'], ARRAY['anemia ferropriva'], 18, 65, 'mg', 'morning', 'strong', ARRAY['Hemocromatose'], ARRAY[]::text[], 8, 20),
('iron_sulfate', 'Sulfato de Ferro', 'mineral', 'Forma tradicional do ferro', ARRAY['Anemia', 'Fadiga'], ARRAY['anemia', 'fadiga'], 18, 65, 'mg', 'morning', 'strong', ARRAY['Hemocromatose'], ARRAY[]::text[], 5, 15),
('copper_gluconate', 'Gluconato de Cobre', 'mineral', 'Cobre quelado suave', ARRAY['Colágeno', 'Energia'], ARRAY['fadiga', 'cabelos grisalhos'], 1, 10, 'mg', 'with_meal', 'moderate', ARRAY['Wilson'], ARRAY[]::text[], 10, 25),

-- AMINOÁCIDOS E DERIVADOS
('l_histidine', 'L-Histidina', 'amino_acid', 'Aminoácido para histamina', ARRAY['Alergias', 'Úlceras'], ARRAY['alergias', 'úlceras'], 500, 4000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('l_methionine', 'L-Metionina', 'amino_acid', 'Aminoácido sulfurado', ARRAY['Desintoxicação', 'Cabelo'], ARRAY['toxicidade', 'queda cabelo'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 40),
('l_cysteine', 'L-Cisteína', 'amino_acid', 'Precursor da glutationa', ARRAY['Antioxidante', 'Cabelo'], ARRAY['estresse oxidativo'], 500, 1500, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('n_acetyl_cysteine', 'N-Acetil Cisteína (NAC)', 'amino_acid', 'Precursor potente de glutationa', ARRAY['Desintoxicação', 'Respiração'], ARRAY['intoxicação', 'muco'], 500, 1800, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('l_proline', 'L-Prolina', 'amino_acid', 'Aminoácido para colágeno', ARRAY['Colágeno', 'Cicatrização'], ARRAY['feridas', 'rugas'], 500, 2000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('hydroxyproline', 'Hidroxiprolina', 'amino_acid', 'Aminoácido do colágeno', ARRAY['Síntese colágeno'], ARRAY['envelhecimento da pele'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('l_serine', 'L-Serina', 'amino_acid', 'Aminoácido para nervos', ARRAY['Função nervosa', 'Memória'], ARRAY['neuropatia', 'declínio cognitivo'], 500, 2000, 'mg', 'any', 'limited', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('l_threonine', 'L-Treonina', 'amino_acid', 'Aminoácido essencial', ARRAY['Proteína', 'Imunidade'], ARRAY['desnutrição', 'imunidade baixa'], 500, 2000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('l_valine', 'L-Valina', 'amino_acid', 'Aminoácido de cadeia ramificada', ARRAY['Músculo', 'Energia'], ARRAY['catabolismo muscular'], 500, 2500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('l_leucine', 'L-Leucina', 'amino_acid', 'Estimulador da síntese proteica', ARRAY['Síntese proteica', 'Músculos'], ARRAY['sarcopenia', 'catabolismo'], 2500, 10000, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('l_isoleucine', 'L-Isoleucina', 'amino_acid', 'BCAA para energia', ARRAY['Energia muscular', 'Resistência'], ARRAY['fadiga muscular'], 500, 2500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 22, 55),

-- ERVAS ESPECÍFICAS ADICIONAIS
('aloe_vera_extract', 'Extrato de Babosa', 'herb', 'Anti-inflamatório digestivo', ARRAY['Digestão', 'Cicatrização'], ARRAY['gastrite', 'úlceras'], 100, 500, 'mg', 'with_meal', 'moderate', ARRAY['Gravidez'], ARRAY[]::text[], 15, 35),
('slippery_elm', 'Olmo Escorregadio', 'herb', 'Demulcente digestivo', ARRAY['Mucosas', 'Tosse'], ARRAY['gastrite', 'tosse seca'], 400, 800, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('marshmallow_root', 'Raiz de Marshmallow', 'herb', 'Demulcente para mucosas', ARRAY['Mucosas', 'Tosse'], ARRAY['irritação', 'tosse'], 500, 1000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('licorice_root', 'Raiz de Alcaçuz', 'herb', 'Anti-inflamatório adrenal', ARRAY['Adrenais', 'Úlceras'], ARRAY['fadiga adrenal', 'úlceras'], 250, 750, 'mg', 'morning', 'moderate', ARRAY['Hipertensão'], ARRAY[]::text[], 10, 25),
('devil_claw', 'Garra do Diabo', 'herb', 'Anti-inflamatório para artrite', ARRAY['Artrite', 'Dor'], ARRAY['artrite', 'dor articular'], 400, 800, 'mg', 'with_meal', 'moderate', ARRAY['Úlceras'], ARRAY[]::text[], 18, 45),
('white_willow', 'Salgueiro Branco', 'herb', 'Aspirina natural', ARRAY['Dor', 'Febre'], ARRAY['dor de cabeça', 'febre'], 240, 480, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Aspirina'], 12, 30),
('feverfew', 'Matricária', 'herb', 'Para enxaquecas', ARRAY['Enxaqueca', 'Febre'], ARRAY['enxaquecas', 'cefaleia'], 100, 300, 'mg', 'any', 'moderate', ARRAY['Gravidez'], ARRAY[]::text[], 15, 35),
('butterbur', 'Petasites', 'herb', 'Para enxaquecas e alergias', ARRAY['Enxaqueca', 'Alergias'], ARRAY['enxaquecas', 'rinite'], 75, 150, 'mg', 'any', 'moderate', ARRAY['Gravidez'], ARRAY[]::text[], 25, 60),
('red_raspberry', 'Framboesa Vermelha', 'herb', 'Tônico feminino', ARRAY['Gravidez', 'Menstruação'], ARRAY['cólicas menstruais'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 10, 25),
('blessed_thistle', 'Cardo Bendito', 'herb', 'Digestivo amargo', ARRAY['Digestão', 'Apetite'], ARRAY['má digestão', 'perda apetite'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),

-- ÓLEOS E EXTRATOS ESPECIAIS
('black_currant_oil', 'Óleo de Groselha Preta', 'other', 'Rico em GLA', ARRAY['Pele', 'Hormônios'], ARRAY['eczema', 'TPM'], 500, 1500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('walnut_oil', 'Óleo de Nozes', 'other', 'Ômega-3 vegetal', ARRAY['Cérebro', 'Anti-inflamatório'], ARRAY['declínio cognitivo'], 1000, 3000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('sesame_oil', 'Óleo de Gergelim', 'other', 'Rico em sesamina', ARRAY['Colesterol', 'Antioxidante'], ARRAY['colesterol alto'], 1000, 2000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('perilla_oil', 'Óleo de Perilla', 'other', 'Ômega-3 da Ásia', ARRAY['Anti-inflamatório', 'Alergias'], ARRAY['alergias', 'inflamação'], 1000, 2000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('coconut_oil', 'Óleo de Coco', 'other', 'MCT natural', ARRAY['Energia', 'Metabolismo'], ARRAY['fadiga', 'metabolismo lento'], 1000, 3000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('avocado_oil', 'Óleo de Abacate', 'other', 'Rico em oleico', ARRAY['Saúde cardiovascular'], ARRAY['colesterol alto'], 1000, 2000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('sunflower_oil', 'Óleo de Girassol', 'other', 'Vitamina E natural', ARRAY['Vitamina E', 'Antioxidante'], ARRAY['deficiência vitamina E'], 1000, 2000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 10, 25),

-- FIBRAS ESPECIALIZADAS
('apple_pectin', 'Pectina de Maçã', 'other', 'Fibra solúvel de maçã', ARRAY['Colesterol', 'Digestão'], ARRAY['colesterol alto', 'diarreia'], 1000, 5000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('citrus_pectin', 'Pectina Cítrica', 'other', 'Fibra de citrus', ARRAY['Desintoxicação', 'Metais'], ARRAY['metais pesados'], 5, 15, 'g', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('guar_gum', 'Goma Guar', 'other', 'Fibra espessante', ARRAY['Saciedade', 'Glicose'], ARRAY['diabetes', 'sobrepeso'], 5, 15, 'g', 'with_meal', 'moderate', ARRAY['Obstrução'], ARRAY[]::text[], 12, 30),
('xanthan_gum', 'Goma Xantana', 'other', 'Fibra estabilizante', ARRAY['Digestão', 'Glicose'], ARRAY['diabetes', 'digestão'], 2, 8, 'g', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('acacia_fiber', 'Fibra de Acácia', 'other', 'Prebiótico suave', ARRAY['Prebiótico', 'Digestão'], ARRAY['constipação', 'disbiose'], 5, 15, 'g', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),

-- COMPOSTOS ESPECIALIZADOS
('betaine_hcl', 'Betaína HCl', 'other', 'Ácido clorídrico suplementar', ARRAY['Digestão proteínas'], ARRAY['má digestão', 'gases'], 325, 650, 'mg', 'with_meal', 'moderate', ARRAY['Úlceras'], ARRAY[]::text[], 15, 35),
('pancreatic_enzymes', 'Enzimas Pancreáticas', 'other', 'Enzimas do pâncreas', ARRAY['Digestão completa'], ARRAY['insuficiência pancreática'], 500, 2000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('ox_bile', 'Bile Bovina', 'other', 'Bile para digestão de gorduras', ARRAY['Digestão gorduras'], ARRAY['vesícula removida'], 125, 500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('activated_charcoal', 'Carvão Ativado', 'other', 'Adsorvente de toxinas', ARRAY['Desintoxicação', 'Gases'], ARRAY['intoxicação', 'gases'], 280, 560, 'mg', 'any', 'moderate', ARRAY['Medicamentos'], ARRAY['Todos medicamentos'], 10, 25),
('bentonite_clay', 'Argila Bentonita', 'other', 'Desintoxicante mineral', ARRAY['Desintoxicação', 'Limpeza'], ARRAY['toxinas', 'metais pesados'], 1000, 2000, 'mg', 'any', 'limited', ARRAY[]::text[], ARRAY['Medicamentos'], 15, 35),
('diatomaceous_earth', 'Terra Diatomácea', 'other', 'Sílica para desintoxicação', ARRAY['Desintoxicação', 'Parasitas'], ARRAY['parasitas', 'toxinas'], 1000, 2000, 'mg', 'any', 'limited', ARRAY[]::text[], ARRAY[]::text[], 12, 30),

-- HORMÔNIOS E PRECURSORES
('dhea', 'DHEA', 'other', 'Precursor hormonal', ARRAY['Energia', 'Hormônios'], ARRAY['fadiga adrenal', 'envelhecimento'], 5, 50, 'mg', 'morning', 'moderate', ARRAY['Câncer hormonal'], ARRAY[]::text[], 15, 40),
('pregnenolone', 'Pregnenolona', 'other', 'Precursor de todos os hormônios', ARRAY['Memória', 'Hormônios'], ARRAY['perda memória', 'baixos hormônios'], 10, 100, 'mg', 'morning', 'limited', ARRAY['Câncer hormonal'], ARRAY[]::text[], 25, 65),
('7_keto_dhea', '7-Keto DHEA', 'other', 'Metabólito não hormonal do DHEA', ARRAY['Metabolismo', 'Peso'], ARRAY['metabolismo lento'], 25, 200, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),

-- PEPTÍDEOS E NUCLEOTÍDEOS
('glutathione_liposomal', 'Glutationa Lipossomal', 'other', 'Glutationa de alta absorção', ARRAY['Desintoxicação potente'], ARRAY['estresse oxidativo severo'], 250, 1000, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 60, 150),
('colostrum', 'Colostro', 'other', 'Imunoglobulinas naturais', ARRAY['Imunidade', 'Intestino'], ARRAY['imunidade baixa', 'intestino permeável'], 500, 2000, 'mg', 'any', 'moderate', ARRAY['Alergia leite'], ARRAY[]::text[], 35, 85),
('lactoferrin', 'Lactoferrina', 'other', 'Proteína antimicrobiana', ARRAY['Imunidade', 'Ferro'], ARRAY['infecções', 'anemia'], 100, 400, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),

-- EXTRATOS MARÍTIMOS
('sea_buckthorn', 'Espinheiro-Marítimo', 'herb', 'Rico em ômega-7', ARRAY['Pele', 'Mucosas'], ARRAY['pele seca', 'úlceras'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('kelp', 'Kelp', 'other', 'Alga rica em iodo', ARRAY['Tireoide', 'Metabolismo'], ARRAY['hipotireoidismo'], 150, 300, 'mcg', 'morning', 'moderate', ARRAY['Hipertireoidismo'], ARRAY[]::text[], 10, 25),
('dulse', 'Dulse', 'other', 'Alga vermelha rica em minerais', ARRAY['Minerais', 'Energia'], ARRAY['deficiências minerais'], 500, 1000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('wakame', 'Wakame', 'other', 'Alga japonesa', ARRAY['Metabolismo', 'Peso'], ARRAY['metabolismo lento'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('nori', 'Nori', 'other', 'Alga rica em B12', ARRAY['B12 vegana', 'Energia'], ARRAY['deficiência B12 veganos'], 500, 1000, 'mg', 'any', 'limited', ARRAY[]::text[], ARRAY[]::text[], 15, 35),

-- SUPERALIMENTOS ESPECÍFICOS
('maqui_berry', 'Maqui Berry', 'other', 'Superfruit chileno', ARRAY['Antioxidante extremo'], ARRAY['estresse oxidativo'], 500, 1500, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('lucuma', 'Lúcuma', 'other', 'Superfood peruano', ARRAY['Energia', 'Antioxidante'], ARRAY['fadiga', 'oxidação'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('baobab', 'Baobá', 'other', 'Superfruit africano', ARRAY['Vitamina C', 'Digestão'], ARRAY['deficiência vitamina C'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75);

SELECT COUNT(*) as total_final_supplements FROM supplements;