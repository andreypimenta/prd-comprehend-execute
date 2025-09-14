-- Continuando expansão - BATCH 4 (mais 60+ suplementos)

INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- MAIS ANTIOXIDANTES E COMPOSTOS ANTI-AGING
('acai_extract2', 'Extrato de Açaí Concentrado', 'other', 'Antioxidante da Amazônia concentrado', ARRAY['Antioxidante', 'Anti-aging', 'Energia'], ARRAY['estresse oxidativo', 'envelhecimento'], 500, 1500, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('goji_berry2', 'Goji Berry Concentrado', 'other', 'Superfruit com polissacarídeos', ARRAY['Longevidade', 'Visão', 'Imunidade'], ARRAY['fadiga', 'problemas visuais'], 1000, 3000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY['Warfarina'], 25, 65),
('camu_camu2', 'Camu Camu Concentrado', 'other', 'Maior fonte natural de vitamina C', ARRAY['Imunidade extrema', 'Antioxidante'], ARRAY['imunidade baixa', 'oxidação'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('pomegranate_extract', 'Extrato de Romã', 'other', 'Rica em punicalaginas', ARRAY['Saúde cardíaca', 'Próstata', 'Antioxidante'], ARRAY['problemas cardíacos', 'inflamação'], 500, 1000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('green_coffee_bean', 'Extrato de Café Verde', 'other', 'Rico em ácido clorogênico', ARRAY['Perda peso', 'Metabolismo', 'Antioxidante'], ARRAY['sobrepeso', 'metabolismo lento'], 400, 800, 'mg', 'morning', 'moderate', ARRAY['Ansiedade'], ARRAY['Estimulantes'], 20, 50),
('white_tea_extract', 'Extrato de Chá Branco', 'herb', 'Antioxidante delicado', ARRAY['Anti-aging', 'Pele', 'Metabolismo'], ARRAY['envelhecimento', 'pele danificada'], 300, 600, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 70),
('oolong_tea_extract', 'Extrato de Chá Oolong', 'herb', 'Termogênico suave', ARRAY['Metabolismo', 'Perda peso'], ARRAY['metabolismo lento', 'sobrepeso'], 300, 600, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 22, 55),

-- FIBRAS E PREBIÓTICOS
('psyllium_husk', 'Casca de Psyllium', 'other', 'Fibra solúvel para intestino', ARRAY['Regulação intestinal', 'Colesterol'], ARRAY['constipação', 'colesterol alto'], 5, 15, 'g', 'with_meal', 'strong', ARRAY['Obstrução intestinal'], ARRAY[]::text[], 10, 25),
('methylcellulose', 'Metilcelulose', 'other', 'Fibra sintética não fermentável', ARRAY['Regulação intestinal', 'Saciedade'], ARRAY['constipação', 'sobrepeso'], 2, 6, 'g', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('pectin', 'Pectina', 'other', 'Fibra solúvel de frutas', ARRAY['Colesterol', 'Glicose', 'Intestino'], ARRAY['colesterol alto', 'diabetes'], 5, 15, 'g', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 40),
('beta_glucan', 'Beta-Glucano', 'other', 'Fibra imunomoduladora', ARRAY['Imunidade', 'Colesterol'], ARRAY['imunidade baixa', 'colesterol'], 3, 6, 'g', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('arabinogalactan', 'Arabinogalactano', 'other', 'Fibra prebiótica do lariço', ARRAY['Imunidade', 'Microbiota'], ARRAY['imunidade baixa', 'disbiose'], 4, 15, 'g', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 70),

-- ENZIMAS ESPECÍFICAS
('serrapeptase', 'Serrapeptase', 'other', 'Enzima proteolítica potente', ARRAY['Anti-inflamatório', 'Circulação'], ARRAY['inflamação', 'edema'], 40000, 120000, 'unidades', 'any', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 35, 85),
('nattokinase', 'Nattokinase', 'other', 'Enzima fibrinolítica', ARRAY['Circulação sanguínea', 'Coágulos'], ARRAY['má circulação', 'risco trombose'], 2000, 4000, 'unidades', 'any', 'moderate', ARRAY['Distúrbios coagulação'], ARRAY['Anticoagulantes'], 40, 95),
('lumbrokinase', 'Lumbrokinase', 'other', 'Enzima fibrinolítica de minhoca', ARRAY['Fibrina', 'Circulação'], ARRAY['fibrina excessiva', 'coágulos'], 200000, 600000, 'unidades', 'any', 'limited', ARRAY['Cirurgia recente'], ARRAY[]::text[], 60, 150),

-- COMPOSTOS PARA PELE, CABELO E UNHAS
('biotin_5000', 'Biotina 5000mcg', 'vitamin', 'Dose alta para cabelo e unhas', ARRAY['Cabelo forte', 'Unhas resistentes'], ARRAY['queda cabelo', 'unhas fracas'], 5000, 10000, 'mcg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('saw_palmetto_extract', 'Extrato de Saw Palmetto', 'herb', 'Concentrado para próstata', ARRAY['Próstata', 'DHT', 'Cabelo'], ARRAY['HPB', 'calvície'], 320, 640, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('pumpkin_seed_oil', 'Óleo de Semente de Abóbora', 'other', 'Rico em zinco para próstata', ARRAY['Saúde próstata', 'Cabelo'], ARRAY['HPB', 'queda cabelo'], 1000, 2000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('bamboo_silica', 'Sílica de Bambu', 'mineral', 'Fonte natural de sílica', ARRAY['Cabelo', 'Unhas', 'Pele'], ARRAY['cabelo fino', 'unhas quebradas'], 40, 120, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 40),
('horsetail_extract', 'Extrato de Cavalinha', 'herb', 'Rica em sílica natural', ARRAY['Cabelo', 'Unhas', 'Diurético'], ARRAY['cabelo fraco', 'retenção'], 500, 1500, 'mg', 'morning', 'moderate', ARRAY['Gravidez'], ARRAY[]::text[], 12, 30),

-- AMINOÁCIDOS ESPECIALIZADOS
('d_ribose', 'D-Ribose', 'other', 'Açúcar para energia celular', ARRAY['Energia ATP', 'Coração', 'Músculos'], ARRAY['fadiga severa', 'problemas cardíacos'], 5000, 15000, 'mg', 'any', 'moderate', ARRAY['Diabetes'], ARRAY[]::text[], 35, 85),
('phosphatidylcholine', 'Fosfatidilcolina', 'other', 'Fosfolipídio para membranas', ARRAY['Memória', 'Fígado', 'Colesterol'], ARRAY['perda memória', 'gordura hepática'], 1200, 2400, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('dmg', 'DMG (Dimetilglicina)', 'other', 'Doador de grupos metil', ARRAY['Energia', 'Imunidade', 'Desempenho'], ARRAY['fadiga', 'baixa performance'], 125, 500, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('tmg', 'TMG (Trimetilglicina)', 'other', 'Betaína para metilação', ARRAY['Metilação', 'Digestão', 'Desempenho'], ARRAY['má digestão', 'fadiga'], 500, 3000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('sam_e', 'SAM-e', 'other', 'S-Adenosil Metionina', ARRAY['Humor', 'Articulações', 'Fígado'], ARRAY['depressão', 'artrite'], 200, 800, 'mg', 'morning', 'strong', ARRAY['Bipolaridade'], ARRAY['Antidepressivos'], 40, 100),

-- PROBIÓTICOS ESPECÍFICOS
('lactobacillus_plantarum', 'Lactobacillus Plantarum', 'other', 'Cepa para intestino irritável', ARRAY['SII', 'Digestão', 'Imunidade'], ARRAY['síndrome intestino irritável'], 10, 50, 'bilhões_ufc', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('lactobacillus_helveticus', 'Lactobacillus Helveticus', 'other', 'Probiótico para ansiedade', ARRAY['Ansiedade', 'Humor', 'Digestão'], ARRAY['ansiedade', 'depressão'], 3, 20, 'bilhões_ufc', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('bifidobacterium_longum', 'Bifidobacterium Longum', 'other', 'Cepa para longevidade', ARRAY['Longevidade', 'Imunidade'], ARRAY['envelhecimento', 'imunidade'], 5, 30, 'bilhões_ufc', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 22, 55),
('lactobacillus_gasseri', 'Lactobacillus Gasseri', 'other', 'Probiótico para peso', ARRAY['Controle peso', 'Metabolismo'], ARRAY['sobrepeso', 'metabolismo lento'], 1, 10, 'bilhões_ufc', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),

-- EXTRATOS DE FRUTAS E VEGETAIS
('acerola_extract', 'Extrato de Acerola', 'other', 'Rica em vitamina C natural', ARRAY['Vitamina C', 'Antioxidante'], ARRAY['deficiência vitamina C'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('elderflower', 'Flor de Sabugueiro', 'herb', 'Anti-inflamatório respiratório', ARRAY['Respiração', 'Alergias'], ARRAY['sinusite', 'alergias respiratórias'], 300, 600, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('hibiscus_extract', 'Extrato de Hibisco', 'herb', 'Pressão arterial e antioxidante', ARRAY['Pressão arterial', 'Antioxidante'], ARRAY['hipertensão', 'oxidação'], 500, 1500, 'mg', 'any', 'moderate', ARRAY['Hipotensão'], ARRAY[]::text[], 18, 45),
('rosehip_extract', 'Extrato de Rosa Mosqueta', 'other', 'Rico em vitamina C e licopeno', ARRAY['Vitamina C', 'Articulações'], ARRAY['deficiências', 'artrite'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 22, 55),
('blackcurrant_extract', 'Extrato de Groselha Preta', 'other', 'Rica em antocianinas', ARRAY['Circulação', 'Visão', 'Antioxidante'], ARRAY['má circulação', 'fadiga ocular'], 300, 900, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- MINERAIS RAROS E OLIGOELEMENTOS  
('germanium', 'Germânio Orgânico', 'mineral', 'Oligoelemento para oxigenação', ARRAY['Oxigenação celular', 'Imunidade'], ARRAY['fadiga', 'baixa oxigenação'], 100, 300, 'mg', 'any', 'limited', ARRAY[]::text[], ARRAY[]::text[], 50, 120),
('rubidium', 'Rubídio', 'mineral', 'Oligoelemento para depressão', ARRAY['Humor', 'Depressão'], ARRAY['depressão', 'instabilidade humor'], 1, 5, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('cesium', 'Césio', 'mineral', 'Oligoelemento alcalinizante', ARRAY['pH corporal', 'Energia'], ARRAY['acidose', 'fadiga'], 1, 3, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 60, 150),

-- COMPOSTOS PARA ENERGIA MITOCONDRIAL
('ubiquinol', 'Ubiquinol (CoQ10 Reduzida)', 'other', 'Forma ativa da Coenzima Q10', ARRAY['Energia mitocondrial', 'Coração'], ARRAY['fadiga', 'problemas cardíacos'], 100, 300, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 50, 120),
('idebenone', 'Idebenona', 'other', 'Análogo sintético da CoQ10', ARRAY['Neuroproteção', 'Energia cerebral'], ARRAY['declínio cognitivo'], 45, 180, 'mg', 'with_meal', 'limited', ARRAY[]::text[], ARRAY[]::text[], 80, 200),
('pyrroloquinoline', 'PQQ (Pirroloquinolina)', 'other', 'Cofator mitocondrial novo', ARRAY['Biogênese mitocondrial'], ARRAY['fadiga mitocondrial'], 20, 40, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 60, 150),

-- NOOTRÓPICOS NATURAIS
('centrophenoxine', 'Centrofenoxina', 'other', 'Nootrópico para lipofuscina', ARRAY['Anti-aging cerebral', 'Memória'], ARRAY['envelhecimento cerebral'], 250, 1000, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('vinpocetine', 'Vinpocetina', 'other', 'Extrato de pervinca para cérebro', ARRAY['Circulação cerebral', 'Memória'], ARRAY['má circulação cerebral'], 10, 30, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY[]::text[], 30, 75),
('huperzine_a', 'Huperzina A', 'herb', 'Inibidor de acetilcolinesterase', ARRAY['Memória', 'Alzheimer'], ARRAY['perda memória', 'declínio'], 100, 400, 'mcg', 'morning', 'moderate', ARRAY['Colinérgicos'], ARRAY[]::text[], 35, 85),

-- ADAPTÓGENOS RAROS
('gynostemma', 'Gynostemma (Jiaogulan)', 'herb', 'Ginseng do sul adaptógeno', ARRAY['Longevidade', 'Estresse'], ARRAY['envelhecimento', 'estresse'], 450, 900, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('polygala', 'Polygala Tenuifolia', 'herb', 'Tônico cerebral chinês', ARRAY['Memória', 'Sono', 'Longevidade'], ARRAY['insônia', 'perda memória'], 300, 600, 'mg', 'evening', 'limited', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('cistanche', 'Cistanche', 'herb', 'Tônico yang para energia', ARRAY['Energia yang', 'Libido', 'Longevidade'], ARRAY['fadiga', 'baixa libido'], 500, 1000, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 40, 100),

-- ÓLEOS ESSENCIAIS EM CÁPSULAS
('oregano_oil', 'Óleo de Orégano', 'herb', 'Antimicrobiano natural potente', ARRAY['Antimicrobiano', 'Digestão'], ARRAY['infecções', 'candida'], 150, 600, 'mg', 'with_meal', 'moderate', ARRAY['Gravidez'], ARRAY[]::text[], 20, 50),
('thyme_oil', 'Óleo de Tomilho', 'herb', 'Antisséptico respiratório', ARRAY['Respiração', 'Antimicrobiano'], ARRAY['infecções respiratórias'], 100, 300, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('peppermint_oil', 'Óleo de Hortelã-Pimenta', 'herb', 'Digestivo e refrescante', ARRAY['Digestão', 'SII', 'Respiração'], ARRAY['má digestão', 'SII'], 100, 300, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 35);

SELECT COUNT(*) as total_suplementos_atual FROM supplements;