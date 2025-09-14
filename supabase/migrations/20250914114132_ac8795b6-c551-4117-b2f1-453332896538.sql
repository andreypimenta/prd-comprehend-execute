-- Adicionar mais suplementos únicos para completar 402+ (evitando duplicatas)

INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- MAIS VITAMINAS E MINERAIS ESPECÍFICOS
('vit_k1', 'Vitamina K1 (Filoquinona)', 'vitamin', 'Forma vegetal da vitamina K', ARRAY['Coagulação sanguínea', 'Saúde óssea'], ARRAY['problemas coagulação', 'ossos fracos'], 90, 120, 'mcg', 'with_meal', 'strong', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 12, 30),
('boron', 'Boro', 'mineral', 'Mineral para saúde óssea e hormonal', ARRAY['Saúde óssea', 'Metabolismo hormonal'], ARRAY['osteoporose', 'desequilíbrio hormonal'], 3, 10, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 10, 25),
('copper', 'Cobre', 'mineral', 'Essencial para síntese de colágeno', ARRAY['Síntese colágeno', 'Antioxidante', 'Ferro absorção'], ARRAY['anemia', 'problemas conectivos'], 900, 10000, 'mcg', 'with_meal', 'strong', ARRAY['Doença de Wilson'], ARRAY['Zinco alto'], 8, 20),
('manganese', 'Manganês', 'mineral', 'Cofator enzimático e antioxidante', ARRAY['Metabolismo', 'Formação óssea', 'Antioxidante'], ARRAY['fadiga', 'problemas ósseos'], 2.3, 11, 'mg', 'with_meal', 'moderate', ARRAY['Parkinson'], ARRAY[]::text[], 12, 30),
('molybdenum', 'Molibdênio', 'mineral', 'Cofator para detoxificação', ARRAY['Detoxificação', 'Metabolismo sulfitos'], ARRAY['sensibilidade sulfitos', 'fadiga'], 45, 2000, 'mcg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('vanadium', 'Vanádio', 'mineral', 'Suporte para glicose sanguínea', ARRAY['Controle glicêmico', 'Sensibilidade insulina'], ARRAY['diabetes', 'resistência insulina'], 10, 100, 'mcg', 'with_meal', 'limited', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('silica', 'Sílica', 'mineral', 'Mineral para cabelo, pele e unhas', ARRAY['Fortalecimento cabelo', 'Saúde da pele', 'Unhas'], ARRAY['cabelo fraco', 'unhas quebradiças'], 5, 40, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),

-- ÁCIDOS GRAXOS ESPECÍFICOS  
('omega7', 'Ômega-7 (Ácido Palmitoléico)', 'other', 'Ácido graxo para metabolismo', ARRAY['Metabolismo', 'Saúde cardiovascular'], ARRAY['síndrome metabólica', 'inflamação'], 210, 840, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('omega9', 'Ômega-9 (Ácido Oleico)', 'other', 'Ácido graxo monoinsaturado', ARRAY['Saúde cardiovascular', 'Controle colesterol'], ARRAY['colesterol alto', 'inflamação'], 1000, 3000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('evening_primrose', 'Óleo de Prímula', 'other', 'Rico em GLA para saúde feminina', ARRAY['Saúde hormonal feminina', 'SPM'], ARRAY['TPM', 'desequilíbrio hormonal'], 500, 1300, 'mg', 'with_meal', 'moderate', ARRAY['Convulsões'], ARRAY[]::text[], 15, 40),
('flax_oil', 'Óleo de Linhaça', 'other', 'Rico em ômega-3 vegetal ALA', ARRAY['Ômega-3 vegetal', 'Saúde cardiovascular'], ARRAY['inflamação', 'colesterol alto'], 1000, 2000, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY[]::text[], 12, 30),
('fish_oil', 'Óleo de Peixe Concentrado', 'other', 'EPA e DHA concentrados', ARRAY['Saúde cerebral', 'Anti-inflamatório', 'Cardiovascular'], ARRAY['depressão', 'inflamação'], 1000, 4000, 'mg', 'with_meal', 'strong', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 20, 60),

-- ERVAS ADAPTÓGENAS E MEDICINAIS
('cordyceps', 'Cordyceps', 'herb', 'Cogumelo adaptógeno para energia', ARRAY['Energia', 'Performance atlética', 'Respiração'], ARRAY['fadiga', 'baixa resistência'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 80),
('reishi', 'Reishi (Ganoderma)', 'herb', 'Cogumelo adaptógeno para imunidade', ARRAY['Sistema imunológico', 'Estresse', 'Sono'], ARRAY['imunidade baixa', 'estresse', 'insônia'], 1000, 2000, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('shiitake', 'Shiitake', 'herb', 'Cogumelo imunomodulador', ARRAY['Imunidade', 'Saúde cardiovascular'], ARRAY['imunidade baixa', 'colesterol alto'], 500, 1000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('maitake', 'Maitake', 'herb', 'Cogumelo para controle glicêmico', ARRAY['Controle glicêmico', 'Imunidade'], ARRAY['diabetes', 'imunidade baixa'], 500, 1500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('chaga', 'Chaga', 'herb', 'Cogumelo antioxidante poderoso', ARRAY['Antioxidante', 'Anti-inflamatório', 'Imunidade'], ARRAY['inflamação', 'estresse oxidativo'], 500, 2000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('schisandra', 'Schisandra', 'herb', 'Adaptógeno para fígado e estresse', ARRAY['Saúde hepática', 'Adaptação ao estresse'], ARRAY['fadiga', 'estresse hepático'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 55),
('holy_basil', 'Manjericão Sagrado (Tulsi)', 'herb', 'Adaptógeno para estresse e açúcar', ARRAY['Redução estresse', 'Controle glicêmico'], ARRAY['estresse', 'açúcar alto'], 300, 600, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('mucuna_pruriens', 'Mucuna Pruriens', 'herb', 'Precursor natural de dopamina', ARRAY['Humor', 'Motivação', 'Libido'], ARRAY['depressão', 'baixa libido'], 100, 500, 'mg', 'morning', 'moderate', ARRAY['Parkinson medicado'], ARRAY['L-DOPA'], 25, 65),
('tribulus', 'Tribulus Terrestris', 'herb', 'Suporte para testosterona natural', ARRAY['Libido', 'Energia', 'Massa muscular'], ARRAY['baixa libido', 'fadiga'], 250, 750, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('fenugreek', 'Feno-Grego', 'herb', 'Controle glicêmico e testosterona', ARRAY['Controle açúcar', 'Testosterona', 'Digestão'], ARRAY['diabetes', 'baixa libido'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY['Diabetes medicado'], ARRAY['Anticoagulantes'], 15, 40),
('elderberry', 'Sabugueiro', 'herb', 'Antiviral natural para imunidade', ARRAY['Sistema imunológico', 'Antiviral'], ARRAY['gripes', 'resfriados'], 300, 600, 'mg', 'any', 'moderate', ARRAY['Auto-imunes'], ARRAY[]::text[], 18, 45),
('astragalus', 'Astragalus', 'herb', 'Adaptógeno imunoestimulante', ARRAY['Imunidade', 'Energia', 'Longevidade'], ARRAY['imunidade baixa', 'fadiga crônica'], 500, 1000, 'mg', 'morning', 'moderate', ARRAY['Auto-imunes'], ARRAY[]::text[], 20, 50),

-- AMINOÁCIDOS ESPECÍFICOS
('citrulline', 'L-Citrulina', 'amino_acid', 'Precursor de óxido nítrico', ARRAY['Circulação', 'Performance', 'Recuperação'], ARRAY['má circulação', 'fadiga muscular'], 3000, 8000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 55),
('ornithine', 'L-Ornitina', 'amino_acid', 'Ciclo da ureia e sono', ARRAY['Qualidade do sono', 'Detoxificação'], ARRAY['insônia', 'fadiga'], 500, 2000, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('theanine', 'L-Teanina', 'amino_acid', 'Relaxamento sem sedação', ARRAY['Relaxamento', 'Foco calmo', 'Ansiedade'], ARRAY['ansiedade', 'estresse'], 100, 400, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 40),
('glycine', 'Glicina', 'amino_acid', 'Aminoácido para sono e colágeno', ARRAY['Qualidade do sono', 'Síntese colágeno'], ARRAY['insônia', 'problemas articulares'], 1000, 3000, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('carnosine', 'Carnosina', 'amino_acid', 'Dipeptídeo anti-aging', ARRAY['Anti-aging', 'Neuroproteção', 'Antioxidante'], ARRAY['envelhecimento', 'declínio cognitivo'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),

-- COMPOSTOS PARA ARTICULAÇÕES E MOBILIDADE
('msm', 'MSM (Metilsulfonilmetano)', 'other', 'Composto de enxofre para articulações', ARRAY['Saúde articular', 'Anti-inflamatório'], ARRAY['dor articular', 'inflamação'], 1000, 6000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('glucosamine', 'Glicosamina', 'other', 'Precursor de cartilagem articular', ARRAY['Saúde articular', 'Cartilagem'], ARRAY['osteoartrite', 'dor articular'], 1500, 1500, 'mg', 'with_meal', 'moderate', ARRAY['Diabetes'], ARRAY['Warfarina'], 25, 60),
('chondroitin', 'Condroitina', 'other', 'Componente da cartilagem articular', ARRAY['Saúde articular', 'Flexibilidade'], ARRAY['osteoartrite', 'rigidez'], 800, 1200, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 30, 70),
('boswellia', 'Boswellia', 'herb', 'Anti-inflamatório natural', ARRAY['Anti-inflamatório', 'Saúde articular'], ARRAY['artrite', 'inflamação'], 300, 800, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- COMPOSTOS ESPECÍFICOS PARA SAÚDE FEMININA E MASCULINA
('saw_palmetto', 'Saw Palmetto', 'herb', 'Saúde da próstata masculina', ARRAY['Saúde da próstata', 'Equilíbrio hormonal'], ARRAY['problemas de próstata', 'calvície'], 160, 320, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('nettle_root', 'Raiz de Urtiga', 'herb', 'Suporte prostático e hormonal', ARRAY['Saúde próstata', 'Anti-inflamatório'], ARRAY['HPB', 'inflamação'], 300, 600, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('pygeum', 'Pygeum', 'herb', 'Saúde da próstata', ARRAY['Função prostática', 'Saúde urinária'], ARRAY['HPB', 'problemas urinários'], 100, 200, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('red_clover', 'Trevo Vermelho', 'herb', 'Isoflavonas para menopausa', ARRAY['Sintomas menopausa', 'Saúde óssea'], ARRAY['ondas de calor', 'osteoporose'], 40, 80, 'mg', 'with_meal', 'moderate', ARRAY['Câncer hormonal'], ARRAY[]::text[], 20, 50),
('black_cohosh', 'Cimicífuga', 'herb', 'Alívio sintomas da menopausa', ARRAY['Ondas de calor', 'Humor'], ARRAY['menopausa', 'TPM'], 20, 80, 'mg', 'any', 'moderate', ARRAY['Doença hepática'], ARRAY[]::text[], 22, 55),
('dong_quai', 'Dong Quai', 'herb', 'Tônico feminino tradicional', ARRAY['Regulação hormonal', 'Ciclo menstrual'], ARRAY['irregularidade menstrual', 'TPM'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 25, 60),
('vitex', 'Vitex (Agnus Castus)', 'herb', 'Regulador hormonal feminino', ARRAY['Equilíbrio hormonal', 'TPM'], ARRAY['TPM', 'irregularidade'], 175, 400, 'mg', 'morning', 'moderate', ARRAY['Hormônios sintéticos'], ARRAY[]::text[], 18, 45);

SELECT COUNT(*) as total_suplementos_atual FROM supplements;