-- Adicionar mais suplementos para completar a lista de 402+
-- CONTINUAÇÃO: Mais antioxidantes, nootrópicos, enzimas e compostos

INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- MAIS ANTIOXIDANTES
('coq10', 'Coenzima Q10', 'other', 'Antioxidante celular e energia mitocondrial', ARRAY['Energia celular', 'Saúde cardíaca', 'Antioxidante'], ARRAY['fadiga', 'problemas cardíacos'], 100, 300, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY['Warfarina'], 30, 80),
('resveratrol', 'Resveratrol', 'other', 'Antioxidante polifenólico anti-aging', ARRAY['Anti-aging', 'Saúde cardiovascular', 'Longevidade'], ARRAY['envelhecimento', 'inflamação'], 100, 500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY['Anticoagulantes'], 25, 70),
('alpha_lipoic', 'Ácido Alfa-Lipóico', 'other', 'Antioxidante universal e suporte neurológico', ARRAY['Antioxidante', 'Neuropatia', 'Glicose'], ARRAY['neuropatia', 'diabetes'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY['Insulina'], 20, 55),
('glutathione', 'Glutationa', 'other', 'Antioxidante mestre celular', ARRAY['Desintoxicação', 'Antioxidante', 'Imunidade'], ARRAY['estresse oxidativo', 'toxicidade'], 250, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 90),
('astaxanthin', 'Astaxantina', 'other', 'Carotenóide antioxidante poderoso', ARRAY['Proteção solar', 'Saúde ocular', 'Anti-inflamatório'], ARRAY['danos UV', 'inflamação'], 4, 12, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('lycopene', 'Licopeno', 'other', 'Carotenóide protetor da próstata', ARRAY['Saúde da próstata', 'Proteção cardiovascular'], ARRAY['problemas de próstata', 'risco cardiovascular'], 10, 30, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('lutein', 'Luteína', 'other', 'Carotenóide para saúde ocular', ARRAY['Saúde ocular', 'Proteção macular'], ARRAY['degeneração macular', 'fadiga ocular'], 10, 20, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 40),
('zeaxanthin', 'Zeaxantina', 'other', 'Carotenóide protetor da retina', ARRAY['Proteção retinal', 'Saúde macular'], ARRAY['problemas de visão', 'degeneração'], 2, 10, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),

-- PROBIÓTICOS E PREBIÓTICOS EXPANDIDOS
('lactobacillus', 'Lactobacillus Acidophilus', 'other', 'Probiótico para saúde intestinal', ARRAY['Saúde intestinal', 'Digestão', 'Imunidade'], ARRAY['problemas digestivos', 'disbiose'], 1, 50, 'bilhões_ufc', 'with_meal', 'strong', ARRAY['Imunocomprometidos'], ARRAY[]::text[], 15, 45),
('bifidobacterium', 'Bifidobacterium', 'other', 'Probiótico para intestino e imunidade', ARRAY['Microbiota intestinal', 'Imunidade'], ARRAY['constipação', 'imunidade baixa'], 1, 50, 'bilhões_ufc', 'with_meal', 'strong', ARRAY['Imunocomprometidos'], ARRAY[]::text[], 18, 50),
('saccharomyces', 'Saccharomyces Boulardii', 'other', 'Probiótico levedura para diarreia', ARRAY['Controle diarreia', 'Saúde intestinal'], ARRAY['diarreia', 'síndrome intestino irritável'], 250, 1000, 'mg', 'any', 'strong', ARRAY['Cateteres centrais'], ARRAY[]::text[], 20, 55),
('inulin', 'Inulina', 'other', 'Prebiótico para alimentar bactérias boas', ARRAY['Saúde intestinal', 'Crescimento probióticos'], ARRAY['disbiose', 'constipação'], 5, 20, 'g', 'with_meal', 'moderate', ARRAY['SII'], ARRAY[]::text[], 12, 30),
('fos', 'Frutooligossacarídeos (FOS)', 'other', 'Prebiótico para flora intestinal', ARRAY['Crescimento bifidobactérias', 'Saúde intestinal'], ARRAY['disbiose', 'má digestão'], 2, 8, 'g', 'with_meal', 'moderate', ARRAY['Intolerância frutose'], ARRAY[]::text[], 15, 35),

-- NOOTRÓPICOS EXPANDIDOS
('lions_mane', 'Cogumelo Juba de Leão', 'herb', 'Nootrópico para função cerebral', ARRAY['Neuroplasticidade', 'Memória', 'Foco'], ARRAY['declínio cognitivo', 'perda de memória'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 80),
('bacopa', 'Bacopa Monnieri', 'herb', 'Nootrópico ayurvédico para memória', ARRAY['Memória', 'Aprendizado', 'Ansiedade'], ARRAY['perda de memória', 'ansiedade'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('phosphatidylserine', 'Fosfatidilserina', 'other', 'Fosfolipídio para função cerebral', ARRAY['Memória', 'Função cognitiva'], ARRAY['declínio cognitivo', 'perda de memória'], 100, 300, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY['Anticoagulantes'], 40, 100),
('acetyl_carnitine', 'Acetil-L-Carnitina', 'amino_acid', 'Nootrópico e energia mitocondrial', ARRAY['Energia cerebral', 'Memória', 'Neuroproteção'], ARRAY['fadiga mental', 'declínio cognitivo'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY['Anticoagulantes'], 25, 65),
('alpha_gpc', 'Alpha-GPC', 'other', 'Precursor de acetilcolina', ARRAY['Memória', 'Foco', 'Função cognitiva'], ARRAY['perda de memória', 'falta de foco'], 300, 600, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('cdp_choline', 'CDP-Colina (Citicolina)', 'other', 'Nootrópico para neuroplasticidade', ARRAY['Neuroplasticidade', 'Foco', 'Energia mental'], ARRAY['fadiga mental', 'falta de concentração'], 250, 500, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),

-- ENZIMAS DIGESTIVAS EXPANDIDAS
('digestive_enzymes', 'Enzimas Digestivas', 'other', 'Complexo enzimático para digestão', ARRAY['Digestão', 'Absorção nutrientes'], ARRAY['indigestão', 'má absorção'], 1, 3, 'cápsula', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('bromelain', 'Bromelina', 'other', 'Enzima proteolítica anti-inflamatória', ARRAY['Digestão proteínas', 'Anti-inflamatório'], ARRAY['indigestão', 'inflamação'], 500, 2000, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 18, 45),
('papain', 'Papaína', 'other', 'Enzima digestiva de proteínas', ARRAY['Digestão proteínas', 'Anti-inflamatório'], ARRAY['má digestão', 'inflamação'], 100, 500, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY[]::text[], 15, 35),
('lipase', 'Lipase', 'other', 'Enzima para digestão de gorduras', ARRAY['Digestão lipídios', 'Absorção vitaminas'], ARRAY['má digestão gorduras', 'deficiência vitaminas'], 5000, 20000, 'unidades', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 40),
('amylase', 'Amilase', 'other', 'Enzima para digestão de carboidratos', ARRAY['Digestão carboidratos', 'Metabolismo açúcar'], ARRAY['intolerância carboidratos', 'gases'], 5000, 15000, 'unidades', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),

-- COMPOSTOS ESPECIAIS E OUTROS
('melatonin', 'Melatonina', 'other', 'Hormônio regulador do sono', ARRAY['Qualidade do sono', 'Jet lag'], ARRAY['insônia', 'distúrbios do sono'], 0.5, 10, 'mg', 'evening', 'strong', ARRAY['Gravidez'], ARRAY['Sedativos'], 8, 20),
('spirulina', 'Spirulina', 'other', 'Superfood rico em proteínas e nutrientes', ARRAY['Energia', 'Desintoxicação', 'Nutrição'], ARRAY['fadiga', 'desnutrição'], 1, 10, 'g', 'morning', 'moderate', ARRAY['Auto-imunes'], ARRAY[]::text[], 15, 40),
('chlorella', 'Chlorella', 'other', 'Alga rica em clorofila e nutrientes', ARRAY['Desintoxicação', 'Energia', 'Imunidade'], ARRAY['toxicidade', 'fadiga'], 2, 10, 'g', 'morning', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 18, 50),
('collagen', 'Colágeno', 'other', 'Proteína estrutural para pele e articulações', ARRAY['Saúde da pele', 'Articulações', 'Cabelo'], ARRAY['rugas', 'dor articular', 'queda de cabelo'], 10, 20, 'g', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 70),
('hyaluronic_acid', 'Ácido Hialurônico', 'other', 'Hidratação e saúde articular', ARRAY['Hidratação da pele', 'Saúde articular'], ARRAY['pele seca', 'rigidez articular'], 100, 200, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 80),
('keratin', 'Queratina', 'other', 'Proteína estrutural para cabelo e unhas', ARRAY['Fortalecimento cabelo', 'Unhas fortes'], ARRAY['cabelo frágil', 'unhas quebradas'], 500, 1000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('biotin_high', 'Biotina (Alta Dosagem)', 'vitamin', 'Vitamina para cabelo, pele e unhas', ARRAY['Crescimento cabelo', 'Fortalecimento unhas'], ARRAY['queda de cabelo', 'unhas fracas'], 5000, 10000, 'mcg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 40);

SELECT COUNT(*) as total_suplementos_atual FROM supplements;