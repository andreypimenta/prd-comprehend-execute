-- Continuar com mais suplementos para completar os 402
INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- ANTIOXIDANTES (continuação)
('coq10', 'Coenzima Q10', 'other', 'Antioxidante celular e energia mitocondrial', ARRAY['Energia celular', 'Saúde cardíaca', 'Antioxidante'], ARRAY['fadiga', 'problemas cardíacos'], 100, 300, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY['Warfarina'], 30, 80),
('resveratrol', 'Resveratrol', 'other', 'Antioxidante polifenólico anti-aging', ARRAY['Anti-aging', 'Saúde cardiovascular', 'Longevidade'], ARRAY['envelhecimento', 'inflamação'], 100, 500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY['Anticoagulantes'], 25, 70),
('alpha_lipoic', 'Ácido Alfa-Lipóico', 'other', 'Antioxidante universal e suporte neurológico', ARRAY['Antioxidante', 'Neuropatia', 'Glicose'], ARRAY['neuropatia', 'diabetes'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY['Insulina'], 20, 55),
('glutathione', 'Glutationa', 'other', 'Antioxidante mestre celular', ARRAY['Desintoxicação', 'Antioxidante', 'Imunidade'], ARRAY['estresse oxidativo', 'toxicidade'], 250, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 90),
('astaxanthin', 'Astaxantina', 'other', 'Carotenóide antioxidante potente', ARRAY['Antioxidante', 'Saúde ocular', 'Proteção UV'], ARRAY['fadiga ocular', 'danos solares'], 4, 12, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('lycopene', 'Licopeno', 'other', 'Carotenóide protetor cardiovascular', ARRAY['Saúde cardiovascular', 'Próstata', 'Antioxidante'], ARRAY['problemas cardiovasculares', 'estresse oxidativo'], 10, 30, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('lutein', 'Luteína', 'other', 'Carotenóide para saúde ocular', ARRAY['Saúde ocular', 'Proteção macular'], ARRAY['degeneração macular', 'fadiga ocular'], 10, 20, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('zeaxanthin', 'Zeaxantina', 'other', 'Carotenóide complementar à luteína', ARRAY['Saúde ocular', 'Proteção retinal'], ARRAY['problemas de visão', 'degeneração macular'], 2, 10, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 22, 55),

-- PROBIÓTICOS E PREBIÓTICOS (continuação)
('lactobacillus', 'Lactobacillus Acidophilus', 'other', 'Probiótico para saúde intestinal', ARRAY['Saúde intestinal', 'Digestão', 'Imunidade'], ARRAY['problemas digestivos', 'disbiose'], 1, 50, 'bilhões_ufc', 'with_meal', 'strong', ARRAY['Imunocomprometidos'], ARRAY[]::text[], 15, 45),
('bifidobacterium', 'Bifidobacterium', 'other', 'Probiótico para intestino e imunidade', ARRAY['Microbiota intestinal', 'Imunidade'], ARRAY['constipação', 'imunidade baixa'], 1, 50, 'bilhões_ufc', 'with_meal', 'strong', ARRAY['Imunocomprometidos'], ARRAY[]::text[], 18, 50),
('inulin', 'Inulina', 'other', 'Prebiótico para alimentar bactérias boas', ARRAY['Saúde intestinal', 'Crescimento probióticos'], ARRAY['disbiose', 'constipação'], 5, 20, 'g', 'with_meal', 'moderate', ARRAY['SII'], ARRAY[]::text[], 12, 30),
('saccharomyces', 'Saccharomyces Boulardii', 'other', 'Levedura probiótica resistente', ARRAY['Saúde intestinal', 'Diarréia', 'Antibióticos'], ARRAY['diarréia', 'disbiose'], 250, 500, 'mg', 'with_meal', 'strong', ARRAY['Cateter central'], ARRAY[]::text[], 20, 55),
('fos', 'Fruto-oligossacarídeos (FOS)', 'other', 'Prebiótico natural', ARRAY['Crescimento bifidobactérias', 'Saúde intestinal'], ARRAY['constipação', 'disbiose'], 2, 8, 'g', 'with_meal', 'moderate', ARRAY['SII grave'], ARRAY[]::text[], 15, 40),

-- NOOTRÓPICOS (continuação)
('lions_mane', 'Cogumelo Juba de Leão', 'herb', 'Nootrópico para função cerebral', ARRAY['Neuroplasticidade', 'Memória', 'Foco'], ARRAY['declínio cognitivo', 'perda de memória'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 80),
('bacopa', 'Bacopa Monnieri', 'herb', 'Nootrópico ayurvédico para memória', ARRAY['Memória', 'Aprendizado', 'Ansiedade'], ARRAY['perda de memória', 'ansiedade'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('phosphatidylserine', 'Fosfatidilserina', 'other', 'Fosfolipídio para função cerebral', ARRAY['Memória', 'Função cognitiva'], ARRAY['declínio cognitivo', 'perda de memória'], 100, 300, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY['Anticoagulantes'], 40, 100),
('acetyl_carnitine', 'Acetil-L-Carnitina', 'amino_acid', 'Nootrópico e energia mitocondrial', ARRAY['Energia cerebral', 'Memória', 'Neuroprateção'], ARRAY['fadiga mental', 'declínio cognitivo'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('choline', 'Colina', 'other', 'Precursor da acetilcolina', ARRAY['Função cerebral', 'Memória', 'Desenvolvimento'], ARRAY['perda de memória', 'fadiga mental'], 425, 3500, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 40),
('dmae', 'DMAE (Dimetilaminoetanol)', 'other', 'Precursor de neurotransmissores', ARRAY['Foco mental', 'Humor', 'Memória'], ARRAY['falta de foco', 'fadiga mental'], 100, 300, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- ENZIMAS (continuação)
('digestive_enzymes', 'Enzimas Digestivas', 'other', 'Complexo enzimático para digestão', ARRAY['Digestão', 'Absorção nutrientes'], ARRAY['indigestão', 'má absorção'], 1, 3, 'cápsula', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('bromelain', 'Bromelina', 'other', 'Enzima proteolítica anti-inflamatória', ARRAY['Digestão proteínas', 'Anti-inflamatório'], ARRAY['indigestão', 'inflamação'], 500, 2000, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 18, 45),
('papain', 'Papaína', 'other', 'Enzima digestiva do mamão', ARRAY['Digestão proteínas', 'Anti-inflamatório'], ARRAY['má digestão', 'inchaço'], 100, 500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 38),
('pancreatin', 'Pancreatina', 'other', 'Enzimas pancreáticas', ARRAY['Digestão', 'Absorção gorduras'], ARRAY['insuficiência pancreática', 'má absorção'], 500, 2000, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 65),

-- MINERAIS EXTRAS
('boron', 'Boro', 'mineral', 'Mineral para ossos e hormônios', ARRAY['Saúde óssea', 'Equilíbrio hormonal'], ARRAY['osteoporose', 'desequilíbrio hormonal'], 3, 20, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 10, 28),
('molybdenum', 'Molibdênio', 'mineral', 'Cofator enzimático', ARRAY['Desintoxicação', 'Metabolismo'], ARRAY['sensibilidade química', 'fadiga'], 45, 2000, 'mcg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 8, 20),
('vanadium', 'Vanádio', 'mineral', 'Mineral para glicose', ARRAY['Metabolismo glicose', 'Sensibilidade insulina'], ARRAY['diabetes', 'resistência insulina'], 10, 100, 'mcg', 'with_meal', 'limited', ARRAY[]::text[], ARRAY[]::text[], 12, 35),
('manganese', 'Manganês', 'mineral', 'Cofator antioxidante', ARRAY['Antioxidante', 'Saúde óssea', 'Metabolismo'], ARRAY['fadiga', 'problemas ósseos'], 2, 11, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 8, 22),
('copper', 'Cobre', 'mineral', 'Essencial para ferro e colágeno', ARRAY['Absorção ferro', 'Colágeno', 'Energia'], ARRAY['anemia', 'fadiga', 'problemas conjuntivos'], 0.9, 10, 'mg', 'with_meal', 'strong', ARRAY['Doença de Wilson'], ARRAY['Zinco'], 8, 25),

-- ERVAS ADAPTÓGENAS EXTRAS
('holy_basil', 'Manjericão Sagrado (Tulsi)', 'herb', 'Adaptógeno ayurvédico', ARRAY['Estresse', 'Açúcar no sangue', 'Imunidade'], ARRAY['estresse crônico', 'diabetes'], 300, 600, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 40),
('schisandra', 'Schisandra', 'herb', 'Adaptógeno chinês', ARRAY['Resistência', 'Função hepática', 'Energia'], ARRAY['fadiga', 'estresse', 'problemas hepáticos'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 22, 55),
('cordyceps', 'Cordyceps', 'herb', 'Cogumelo para energia e performance', ARRAY['Energia', 'Performance atlética', 'Respiração'], ARRAY['fadiga', 'baixa performance', 'problemas respiratórios'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('reishi', 'Reishi', 'herb', 'Cogumelo da longevidade', ARRAY['Imunidade', 'Sono', 'Estresse'], ARRAY['imunidade baixa', 'insônia', 'estresse'], 1000, 6000, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 70);

-- Verificar total atual
SELECT COUNT(*) as total_atual FROM supplements;