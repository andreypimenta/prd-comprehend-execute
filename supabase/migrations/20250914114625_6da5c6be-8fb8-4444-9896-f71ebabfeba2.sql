-- Continuando com mais suplementos únicos para completar 402+

INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- MAIS MINERAIS ÚNICOS
('vit_k1_phyto', 'Vitamina K1 (Filoquinona)', 'vitamin', 'Forma vegetal da vitamina K', ARRAY['Coagulação sanguínea', 'Saúde óssea'], ARRAY['problemas coagulação', 'ossos fracos'], 90, 120, 'mcg', 'with_meal', 'strong', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 12, 30),
('silica_bamboo', 'Sílica (Bambu)', 'mineral', 'Mineral para cabelo, pele e unhas', ARRAY['Fortalecimento cabelo', 'Saúde da pele', 'Unhas'], ARRAY['cabelo fraco', 'unhas quebradiças'], 5, 40, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('lithium_orotate', 'Lítio Orotato', 'mineral', 'Microdose de lítio para humor', ARRAY['Estabilização humor', 'Neuroproteção'], ARRAY['variações humor', 'ansiedade'], 5, 20, 'mg', 'evening', 'limited', ARRAY['Medicação psiquiátrica'], ARRAY[]::text[], 25, 65),
('strontium', 'Estrôncio', 'mineral', 'Mineral para densidade óssea', ARRAY['Densidade óssea', 'Prevenção fraturas'], ARRAY['osteoporose', 'ossos fracos'], 340, 680, 'mg', 'evening', 'moderate', ARRAY['Doença renal'], ARRAY['Cálcio'], 30, 75),

-- ÁCIDOS GRAXOS ÚNICOS
('omega7_sea', 'Ômega-7 (Óleo de Espinheiro-Mar)', 'other', 'Ácido graxo para pele e metabolismo', ARRAY['Saúde da pele', 'Metabolismo', 'Mucosas'], ARRAY['pele seca', 'síndrome metabólica'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('omega9_olive', 'Ômega-9 (Óleo de Oliva)', 'other', 'Ácido oleico concentrado', ARRAY['Saúde cardiovascular', 'Anti-inflamatório'], ARRAY['colesterol alto', 'inflamação'], 1000, 3000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('flax_oil_organic', 'Óleo de Linhaça Orgânico', 'other', 'ALA ômega-3 vegetal puro', ARRAY['Ômega-3 vegetal', 'Saúde cardiovascular'], ARRAY['inflamação', 'colesterol'], 1000, 2000, 'mg', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY[]::text[], 15, 40),
('chia_oil', 'Óleo de Chia', 'other', 'Rico em ômega-3 vegetal', ARRAY['Ômega-3 ALA', 'Anti-inflamatório'], ARRAY['inflamação', 'pele seca'], 1000, 2000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('hemp_oil', 'Óleo de Cânhamo', 'other', 'Perfil balanceado ômega 3/6', ARRAY['Equilíbrio ômegas', 'Saúde da pele'], ARRAY['desequilíbrio ômegas', 'inflamação'], 1000, 3000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('krill_oil', 'Óleo de Krill', 'other', 'EPA/DHA com astaxantina', ARRAY['Ômega-3 biodisponível', 'Antioxidante'], ARRAY['inflamação', 'estresse oxidativo'], 500, 1500, 'mg', 'with_meal', 'strong', ARRAY['Alergia crustáceos'], ARRAY['Anticoagulantes'], 40, 100),

-- COGUMELOS MEDICINAIS ÚNICOS
('shiitake_extract', 'Extrato de Shiitake', 'herb', 'Cogumelo para imunidade e colesterol', ARRAY['Sistema imunológico', 'Colesterol saudável'], ARRAY['imunidade baixa', 'colesterol alto'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('maitake_extract', 'Extrato de Maitake', 'herb', 'Cogumelo para glicose e imunidade', ARRAY['Controle glicêmico', 'Imunidade'], ARRAY['diabetes', 'imunidade baixa'], 500, 2000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),
('chaga_extract', 'Extrato de Chaga', 'herb', 'Superantioxidante em cogumelo', ARRAY['Antioxidante extremo', 'Anti-aging'], ARRAY['estresse oxidativo', 'envelhecimento'], 500, 2000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('turkey_tail', 'Cauda de Peru (Coriolus)', 'herb', 'Cogumelo imunomodulador', ARRAY['Modulação imunológica', 'Saúde digestiva'], ARRAY['imunidade desregulada', 'câncer'], 1000, 3000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('agaricus', 'Agaricus Blazei', 'herb', 'Cogumelo imunoestimulante', ARRAY['Estímulo imunológico', 'Anti-tumor'], ARRAY['imunidade baixa', 'fadiga'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75),

-- ADAPTÓGENOS ÚNICOS
('schisandra_berry', 'Bagas de Schisandra', 'herb', 'Adaptógeno hepatoprotetor', ARRAY['Proteção hepática', 'Resistência estresse'], ARRAY['fadiga hepática', 'estresse'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('eleuthero', 'Eleutherococo (Ginseng Siberiano)', 'herb', 'Adaptógeno para resistência', ARRAY['Resistência física', 'Energia', 'Imunidade'], ARRAY['fadiga crônica', 'baixa resistência'], 300, 1200, 'mg', 'morning', 'moderate', ARRAY['Hipertensão'], ARRAY[]::text[], 20, 50),
('suma_root', 'Suma (Ginseng Brasileiro)', 'herb', 'Adaptógeno energizante', ARRAY['Energia', 'Resistência', 'Libido'], ARRAY['fadiga', 'baixo libido'], 500, 1000, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('jiaogulan', 'Jiaogulan', 'herb', 'Adaptógeno longevidade', ARRAY['Longevidade', 'Colesterol', 'Glicose'], ARRAY['envelhecimento', 'colesterol alto'], 300, 750, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 55),
('fo_ti', 'Fo-Ti (He Shou Wu)', 'herb', 'Tônico anti-aging chinês', ARRAY['Anti-aging', 'Cabelo', 'Energia'], ARRAY['envelhecimento', 'cabelo grisalho'], 500, 1000, 'mg', 'evening', 'limited', ARRAY['Doença hepática'], ARRAY[]::text[], 30, 75),

-- AMINOÁCIDOS ÚNICOS  
('citrulline_malate', 'L-Citrulina Malato', 'amino_acid', 'Citrulina com malato para performance', ARRAY['Performance atlética', 'Circulação', 'Energia'], ARRAY['fadiga muscular', 'má circulação'], 4000, 8000, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('ornithine_hcl', 'L-Ornitina HCl', 'amino_acid', 'Aminoácido para sono e GH', ARRAY['Qualidade sono', 'Hormônio crescimento'], ARRAY['insônia', 'recuperação lenta'], 500, 2000, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 70),
('theanine_suntheanine', 'L-Teanina (Suntheanine)', 'amino_acid', 'Forma patenteada de teanina', ARRAY['Relaxamento alerta', 'Foco calmo'], ARRAY['ansiedade', 'falta de foco'], 100, 400, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('glycine_powder', 'Glicina em Pó', 'amino_acid', 'Aminoácido para sono profundo', ARRAY['Sono profundo', 'Colágeno'], ARRAY['insônia', 'articulações'], 3000, 3000, 'mg', 'evening', 'strong', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('carnosine_zinc', 'Carnosina + Zinco', 'amino_acid', 'Dipeptídeo neuroprotetor', ARRAY['Neuroproteção', 'Anti-aging cerebral'], ARRAY['declínio cognitivo', 'envelhecimento'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('beta_alanine', 'Beta-Alanina', 'amino_acid', 'Aminoácido para resistência muscular', ARRAY['Resistência muscular', 'Performance'], ARRAY['fadiga muscular', 'baixa performance'], 2000, 5000, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('hmb', 'HMB (β-Hidroxi β-Metilbutirato)', 'amino_acid', 'Metabólito da leucina', ARRAY['Preservação muscular', 'Recuperação'], ARRAY['catabolismo muscular', 'fadiga'], 1500, 3000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 80),

-- NOOTRÓPICOS ÚNICOS
('alpha_gpc_powder', 'Alpha-GPC (Pó)', 'other', 'Colina biodisponível para cérebro', ARRAY['Memória', 'Foco', 'Acetilcolina'], ARRAY['perda memória', 'falta foco'], 300, 600, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 40, 95),
('cdp_choline_powder', 'CDP-Colina (Citicolina)', 'other', 'Precursor de fosfatidilcolina', ARRAY['Neuroplasticidade', 'Energia mental'], ARRAY['fadiga mental', 'baixo foco'], 250, 500, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 35, 80),
('phenylpiracetam', 'Fenilpiracetam', 'other', 'Nootrópico sintético potente', ARRAY['Foco intenso', 'Energia mental'], ARRAY['fadiga mental', 'baixa motivação'], 100, 200, 'mg', 'morning', 'limited', ARRAY['Epilepsia'], ARRAY[]::text[], 50, 120),
('noopept', 'Noopept', 'other', 'Dipeptídeo nootrópico', ARRAY['Memória', 'Aprendizado', 'Neuroproteção'], ARRAY['perda memória', 'declínio cognitivo'], 10, 30, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('oxiracetam', 'Oxiracetam', 'other', 'Racetam para memória lógica', ARRAY['Pensamento lógico', 'Memória'], ARRAY['dificuldade concentração', 'fadiga mental'], 800, 2400, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 45, 110),
('aniracetam', 'Aniracetam', 'other', 'Racetam ansiolítico', ARRAY['Redução ansiedade', 'Criatividade'], ARRAY['ansiedade', 'bloqueio criativo'], 750, 1500, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 40, 95),

-- ANTIOXIDANTES ÚNICOS
('pqq', 'PQQ (Pirroloquinolina Quinona)', 'other', 'Cofator mitocondrial', ARRAY['Energia mitocondrial', 'Neuroproteção'], ARRAY['fadiga', 'declínio cognitivo'], 10, 40, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 50, 120),
('nad_precursor', 'NAD+ Precursor (NMN)', 'other', 'Precursor de NAD+ anti-aging', ARRAY['Anti-aging', 'Energia celular'], ARRAY['envelhecimento', 'fadiga'], 250, 500, 'mg', 'morning', 'limited', ARRAY[]::text[], ARRAY[]::text[], 80, 200),
('pterostilbene', 'Pterostilbeno', 'other', 'Análogo do resveratrol', ARRAY['Anti-aging', 'Função cognitiva'], ARRAY['envelhecimento', 'declínio mental'], 50, 250, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 35, 85),
('curcumin_c3', 'Curcumina C3 Complex', 'other', 'Curcumina patenteada', ARRAY['Anti-inflamatório potente', 'Articulações'], ARRAY['inflamação crônica', 'artrite'], 500, 1000, 'mg', 'with_meal', 'strong', ARRAY['Cálculos biliares'], ARRAY['Anticoagulantes'], 30, 75),
('quercetin_bromelain', 'Quercetina + Bromelina', 'other', 'Bioflavonóide anti-histamínico', ARRAY['Anti-histamínico', 'Anti-inflamatório'], ARRAY['alergias', 'inflamação'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),

-- PROBIÓTICOS ÚNICOS
('lactobacillus_rhamnosus', 'Lactobacillus Rhamnosus GG', 'other', 'Cepa probiótica específica', ARRAY['Saúde intestinal', 'Imunidade'], ARRAY['disbiose', 'alergias'], 10, 50, 'bilhões_ufc', 'with_meal', 'strong', ARRAY['Imunocomprometidos'], ARRAY[]::text[], 20, 50),
('lactobacillus_casei', 'Lactobacillus Casei', 'other', 'Probiótico para digestão', ARRAY['Digestão', 'Tolerância lactose'], ARRAY['intolerância lactose', 'digestão'], 5, 30, 'bilhões_ufc', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('streptococcus_thermophilus', 'Streptococcus Thermophilus', 'other', 'Probiótico termófilo', ARRAY['Digestão lactose', 'Saúde intestinal'], ARRAY['intolerância lactose', 'gases'], 1, 20, 'bilhões_ufc', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 40),
('soil_based_probiotics', 'Probióticos do Solo', 'other', 'Bacillus e outras cepas do solo', ARRAY['Diversidade microbiota', 'Resistência'], ARRAY['disbiose severa', 'SII'], 2, 10, 'bilhões_ufc', 'with_meal', 'moderate', ARRAY['Imunocomprometidos'], ARRAY[]::text[], 30, 75);

SELECT COUNT(*) as total_suplementos_atual FROM supplements;