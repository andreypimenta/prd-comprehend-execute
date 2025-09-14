-- Limpar suplementos existentes em inglês
DELETE FROM public.supplements;

-- Inserir suplementos completos em português baseados no PDF do examine.com
INSERT INTO public.supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- VITAMINAS
('vitamin-a', 'Vitamina A', 'vitamin', 'Vitamina lipossolúvel essencial para visão, crescimento e função imunológica', 
  ARRAY['Melhora da visão', 'Fortalecimento do sistema imunológico', 'Saúde da pele', 'Crescimento celular'], 
  ARRAY['Cegueira noturna', 'Pele seca', 'Infecções frequentes', 'Problemas de crescimento'], 
  700, 3000, 'UI', 'with_meal', 'strong', 
  ARRAY['Gravidez (altas doses)', 'Doença hepática'], 
  ARRAY['Anticoagulantes'], 15, 30),

('vitamin-b12', 'Vitamina B12 (Cobalamina)', 'vitamin', 'Vitamina essencial para formação de glóbulos vermelhos e função neurológica', 
  ARRAY['Energia e metabolismo', 'Formação de glóbulos vermelhos', 'Saúde neurológica', 'Síntese de DNA'], 
  ARRAY['Fadiga', 'Anemia', 'Formigamento nas extremidades', 'Problemas de memória'], 
  2.4, 1000, 'mcg', 'morning', 'strong', 
  ARRAY['Alergia à cobalamina'], 
  ARRAY['Metformina', 'Inibidores da bomba de prótons'], 8, 25),

('vitamin-c', 'Vitamina C (Ácido Ascórbico)', 'vitamin', 'Antioxidante poderoso essencial para síntese de colágeno e função imunológica', 
  ARRAY['Antioxidante potente', 'Síntese de colágeno', 'Absorção de ferro', 'Função imunológica'], 
  ARRAY['Escorbuto', 'Fadiga', 'Cicatrização lenta', 'Infecções frequentes'], 
  65, 2000, 'mg', 'with_meal', 'strong', 
  ARRAY['Cálculos renais (predisposição)', 'Hemocromatose'], 
  ARRAY['Warfarina', 'Aspirina'], 5, 20),

('vitamin-d3', 'Vitamina D3 (Colecalciferol)', 'vitamin', 'Vitamina essencial para absorção de cálcio e saúde óssea', 
  ARRAY['Saúde óssea', 'Absorção de cálcio', 'Função imunológica', 'Humor'], 
  ARRAY['Deficiência de vitamina D', 'Osteoporose', 'Depressão', 'Fadiga'], 
  600, 4000, 'UI', 'with_meal', 'strong', 
  ARRAY['Hipercalcemia', 'Cálculos renais'], 
  ARRAY['Tiazidas', 'Digitálicos'], 10, 25),

-- MINERAIS
('magnesio', 'Magnésio', 'mineral', 'Mineral essencial envolvido em mais de 300 reações enzimáticas', 
  ARRAY['Função muscular', 'Saúde cardiovascular', 'Metabolismo energético', 'Qualidade do sono'], 
  ARRAY['Cãibras musculares', 'Insônia', 'Ansiedade', 'Fadiga'], 
  310, 420, 'mg', 'evening', 'strong', 
  ARRAY['Doença renal', 'Bloqueio cardíaco'], 
  ARRAY['Antibióticos', 'Diuréticos'], 8, 20),

('zinco', 'Zinco', 'mineral', 'Mineral essencial para função imunológica e cicatrização', 
  ARRAY['Sistema imunológico', 'Cicatrização', 'Síntese proteica', 'Saúde reprodutiva'], 
  ARRAY['Infecções frequentes', 'Cicatrização lenta', 'Perda de cabelo', 'Baixa imunidade'], 
  8, 40, 'mg', 'with_meal', 'strong', 
  ARRAY['Doença de Wilson'], 
  ARRAY['Antibióticos', 'Penicilamine'], 5, 15),

('ferro', 'Ferro', 'mineral', 'Mineral essencial para transporte de oxigênio no sangue', 
  ARRAY['Transporte de oxigênio', 'Prevenção de anemia', 'Energia', 'Função cognitiva'], 
  ARRAY['Anemia ferropriva', 'Fadiga', 'Palidez', 'Falta de ar'], 
  8, 45, 'mg', 'morning', 'strong', 
  ARRAY['Hemocromatose', 'Talassemia'], 
  ARRAY['Antiácidos', 'Tetraciclina'], 8, 18),

-- AMINOÁCIDOS E COMPOSTOS RELACIONADOS
('creatina', 'Creatina Monohidratada', 'amino_acid', 'Composto natural que aumenta a produção de energia nas células musculares', 
  ARRAY['Força muscular', 'Potência', 'Massa muscular', 'Performance cognitiva'], 
  ARRAY['Fadiga muscular', 'Baixa performance', 'Perda de massa muscular'], 
  3, 5, 'g', 'any', 'strong', 
  ARRAY['Doença renal'], 
  ARRAY['Cafeína (possível interferência)'], 15, 30),

('l-carnitina', 'L-Carnitina', 'amino_acid', 'Aminoácido que auxilia na oxidação de gorduras para energia', 
  ARRAY['Metabolismo de gorduras', 'Energia', 'Performance atlética', 'Saúde cardiovascular'], 
  ARRAY['Fadiga', 'Baixa performance', 'Metabolismo lento'], 
  500, 3000, 'mg', 'morning', 'moderate', 
  ARRAY['Convulsões', 'Hipotireoidismo'], 
  ARRAY['Anticoagulantes', 'Hormônios tireoidianos'], 20, 40),

('taurina', 'Taurina', 'amino_acid', 'Aminoácido com funções antioxidantes e de proteção cardiovascular', 
  ARRAY['Função cardiovascular', 'Antioxidante', 'Performance atlética', 'Saúde ocular'], 
  ARRAY['Fadiga', 'Problemas cardiovasculares', 'Estresse oxidativo'], 
  500, 2000, 'mg', 'any', 'moderate', 
  ARRAY['Doença bipolar'], 
  ARRAY['Lítio'], 10, 25),

-- ERVAS E ADAPTÓGENOS
('ashwagandha', 'Ashwagandha (Withania somnifera)', 'herb', 'Adaptógeno ayurvédico tradicional para estresse e vitalidade', 
  ARRAY['Redução do estresse', 'Melhora do sono', 'Força muscular', 'Equilíbrio hormonal'], 
  ARRAY['Estresse crônico', 'Ansiedade', 'Insônia', 'Fadiga'], 
  300, 600, 'mg', 'evening', 'strong', 
  ARRAY['Gravidez', 'Amamentação', 'Doenças autoimunes'], 
  ARRAY['Imunossupressores', 'Sedativos'], 20, 40),

('curcuma', 'Cúrcuma (Curcumina)', 'herb', 'Potente anti-inflamatório natural derivado da cúrcuma', 
  ARRAY['Anti-inflamatório', 'Antioxidante', 'Saúde articular', 'Saúde digestiva'], 
  ARRAY['Inflamação', 'Dor articular', 'Problemas digestivos', 'Estresse oxidativo'], 
  500, 1000, 'mg', 'with_meal', 'strong', 
  ARRAY['Cálculos biliares', 'Cirurgia (suspender antes)'], 
  ARRAY['Anticoagulantes', 'Diabéticos'], 15, 35),

('rhodiola', 'Rhodiola Rosea', 'herb', 'Adaptógeno nórdico para fadiga mental e física', 
  ARRAY['Energia mental', 'Resistência ao estresse', 'Humor', 'Performance cognitiva'], 
  ARRAY['Fadiga mental', 'Estresse', 'Depressão leve', 'Baixa concentração'], 
  200, 600, 'mg', 'morning', 'moderate', 
  ARRAY['Transtorno bipolar'], 
  ARRAY['Antidepressivos', 'Diabetes'], 25, 45),

-- ÁCIDOS GRAXOS
('omega-3', 'Ômega-3 (EPA/DHA)', 'other', 'Ácidos graxos essenciais para saúde cardiovascular e cerebral', 
  ARRAY['Saúde cardiovascular', 'Função cerebral', 'Anti-inflamatório', 'Saúde ocular'], 
  ARRAY['Inflamação', 'Problemas cardiovasculares', 'Depressão', 'Problemas cognitivos'], 
  250, 3000, 'mg', 'with_meal', 'strong', 
  ARRAY['Alergia a peixes', 'Cirurgia (suspender antes)'], 
  ARRAY['Anticoagulantes', 'Anti-hipertensivos'], 20, 50),

-- PROBIÓTICOS
('probioticos', 'Probióticos Multi-cepa', 'other', 'Bactérias benéficas para saúde intestinal e imunológica', 
  ARRAY['Saúde intestinal', 'Digestão', 'Sistema imunológico', 'Humor'], 
  ARRAY['Problemas digestivos', 'Síndrome do intestino irritável', 'Baixa imunidade'], 
  1, 50, 'bilhões UFC', 'with_meal', 'strong', 
  ARRAY['Imunodeficiência grave', 'Valvulopatia cardíaca'], 
  ARRAY['Antibióticos'], 25, 60),

-- ANTIOXIDANTES
('coenzima-q10', 'Coenzima Q10 (Ubiquinol)', 'other', 'Antioxidante celular essencial para produção de energia mitocondrial', 
  ARRAY['Energia celular', 'Saúde cardiovascular', 'Antioxidante', 'Performance atlética'], 
  ARRAY['Fadiga', 'Problemas cardíacos', 'Envelhecimento', 'Baixa energia'], 
  30, 200, 'mg', 'with_meal', 'moderate', 
  ARRAY['Anticoagulantes (monitorar)'], 
  ARRAY['Warfarina', 'Estatinas'], 30, 80),

('resveratrol', 'Resveratrol', 'other', 'Polifenol antioxidante encontrado em uvas e vinho tinto', 
  ARRAY['Antioxidante', 'Saúde cardiovascular', 'Longevidade', 'Anti-inflamatório'], 
  ARRAY['Envelhecimento', 'Inflamação', 'Estresse oxidativo'], 
  100, 500, 'mg', 'with_meal', 'moderate', 
  ARRAY['Gravidez', 'Distúrbios hemorrágicos'], 
  ARRAY['Anticoagulantes'], 20, 50);