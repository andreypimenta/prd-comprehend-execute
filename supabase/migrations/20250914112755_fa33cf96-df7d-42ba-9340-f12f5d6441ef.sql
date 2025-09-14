-- Limpar todos os suplementos existentes
DELETE FROM supplements;

-- Inserir todos os suplementos da lista completa traduzidos para português
INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions) VALUES

-- VITAMINAS E COMPLEXOS VITAMÍNICOS
('vitamin-b-complex', 'Complexo B', 'vitamin', 'Grupo de vitaminas essenciais do complexo B', ARRAY['Energia', 'Sistema nervoso', 'Metabolismo'], ARRAY['Fadiga', 'Baixa energia', 'Problemas neurológicos'], 50, 100, 'mg', 'morning', 'strong', ARRAY['Hipersensibilidade'], ARRAY['Anticonvulsivantes']),
('vitamin-c', 'Vitamina C', 'vitamin', 'Vitamina antioxidante essencial para imunidade', ARRAY['Imunidade', 'Antioxidante', 'Colágeno'], ARRAY['Baixa imunidade', 'Fadiga', 'Cicatrização lenta'], 500, 2000, 'mg', 'morning', 'strong', ARRAY['Cálculos renais'], ARRAY['Anticoagulantes']),
('vitamin-d', 'Vitamina D', 'vitamin', 'Vitamina essencial para saúde óssea e imunidade', ARRAY['Saúde óssea', 'Imunidade', 'Humor'], ARRAY['Ossos fracos', 'Baixa imunidade', 'Depressão'], 1000, 4000, 'IU', 'morning', 'strong', ARRAY['Hipercalcemia'], ARRAY['Tiazídicos']),
('vitamin-e', 'Vitamina E', 'vitamin', 'Antioxidante lipossolúvel', ARRAY['Antioxidante', 'Pele', 'Cardiovascular'], ARRAY['Envelhecimento', 'Problemas de pele'], 100, 400, 'IU', 'with_meal', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Varfarina']),
('vitamin-k', 'Vitamina K', 'vitamin', 'Vitamina essencial para coagulação', ARRAY['Coagulação', 'Saúde óssea'], ARRAY['Sangramento fácil', 'Ossos fracos'], 90, 120, 'mcg', 'with_meal', 'strong', ARRAY['Anticoagulantes'], ARRAY['Varfarina']),
('vitamin-a', 'Vitamina A', 'vitamin', 'Vitamina essencial para visão e imunidade', ARRAY['Visão', 'Imunidade', 'Pele'], ARRAY['Visão noturna ruim', 'Baixa imunidade'], 900, 3000, 'mcg', 'with_meal', 'strong', ARRAY['Gravidez (altas doses)'], ARRAY['Isotretinoína']),
('biotin', 'Biotina (Vitamina B7)', 'vitamin', 'Vitamina do complexo B para cabelo e unhas', ARRAY['Cabelo', 'Unhas', 'Metabolismo'], ARRAY['Cabelo fraco', 'Unhas quebradas'], 300, 10000, 'mcg', 'morning', 'moderate', ARRAY[], ARRAY[]),
('folate', 'Ácido Fólico (Vitamina B9)', 'vitamin', 'Vitamina essencial para síntese de DNA', ARRAY['Formação celular', 'Gravidez', 'Coração'], ARRAY['Anemia', 'Fadiga'], 400, 800, 'mcg', 'morning', 'strong', ARRAY[], ARRAY['Metotrexato']),
('thiamine', 'Tiamina (Vitamina B1)', 'vitamin', 'Vitamina para metabolismo energético', ARRAY['Energia', 'Sistema nervoso', 'Metabolismo'], ARRAY['Fadiga', 'Problemas neurológicos'], 1, 100, 'mg', 'morning', 'strong', ARRAY[], ARRAY[]),
('riboflavin', 'Riboflavina (Vitamina B2)', 'vitamin', 'Vitamina para produção de energia', ARRAY['Energia', 'Antioxidante', 'Visão'], ARRAY['Fadiga', 'Problemas de visão'], 1.3, 100, 'mg', 'morning', 'strong', ARRAY[], ARRAY[]),
('niacin', 'Niacina (Vitamina B3)', 'vitamin', 'Vitamina para metabolismo e colesterol', ARRAY['Metabolismo', 'Colesterol', 'Energia'], ARRAY['Fadiga', 'Colesterol alto'], 16, 100, 'mg', 'morning', 'strong', ARRAY['Úlceras'], ARRAY['Estatinas']),
('pantothenic-acid', 'Ácido Pantotênico (Vitamina B5)', 'vitamin', 'Vitamina para síntese hormonal', ARRAY['Hormônios', 'Energia', 'Estresse'], ARRAY['Fadiga', 'Estresse'], 5, 100, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),

-- MINERAIS
('magnesium', 'Magnésio', 'mineral', 'Mineral essencial para músculos e nervos', ARRAY['Músculos', 'Sono', 'Estresse'], ARRAY['Cãibras', 'Insônia', 'Ansiedade'], 200, 400, 'mg', 'evening', 'strong', ARRAY['Insuficiência renal'], ARRAY['Antibióticos']),
('zinc', 'Zinco', 'mineral', 'Mineral essencial para imunidade e cicatrização', ARRAY['Imunidade', 'Cicatrização', 'Testosterona'], ARRAY['Baixa imunidade', 'Cicatrização lenta'], 8, 40, 'mg', 'morning', 'strong', ARRAY['Deficiência de cobre'], ARRAY['Quinolonas']),
('calcium', 'Cálcio', 'mineral', 'Mineral essencial para ossos e dentes', ARRAY['Saúde óssea', 'Músculos', 'Nervos'], ARRAY['Ossos fracos', 'Cãibras'], 1000, 1200, 'mg', 'with_meal', 'strong', ARRAY['Cálculos renais'], ARRAY['Tiazídicos']),
('iron', 'Ferro', 'mineral', 'Mineral essencial para transporte de oxigênio', ARRAY['Energia', 'Sangue', 'Oxigenação'], ARRAY['Anemia', 'Fadiga', 'Palidez'], 8, 45, 'mg', 'morning', 'strong', ARRAY['Hemocromatose'], ARRAY['Quinolonas']),
('selenium', 'Selênio', 'mineral', 'Mineral antioxidante essencial', ARRAY['Antioxidante', 'Tireoide', 'Imunidade'], ARRAY['Baixa imunidade', 'Problemas de tireoide'], 55, 200, 'mcg', 'morning', 'moderate', ARRAY['Selenose'], ARRAY[]),
('chromium', 'Cromo', 'mineral', 'Mineral para metabolismo da glicose', ARRAY['Glicemia', 'Metabolismo', 'Peso'], ARRAY['Resistência à insulina', 'Cravings'], 25, 200, 'mcg', 'with_meal', 'moderate', ARRAY['Diabetes medicado'], ARRAY['Insulina']),
('copper', 'Cobre', 'mineral', 'Mineral essencial para formação sanguínea', ARRAY['Formação sanguínea', 'Colágeno', 'Energia'], ARRAY['Anemia', 'Fadiga'], 0.9, 10, 'mg', 'morning', 'moderate', ARRAY['Doença de Wilson'], ARRAY['Zinco']),
('manganese', 'Manganês', 'mineral', 'Mineral para metabolismo e antioxidação', ARRAY['Metabolismo', 'Antioxidante', 'Ossos'], ARRAY['Fadiga', 'Problemas ósseos'], 1.8, 11, 'mg', 'morning', 'moderate', ARRAY['Parkinson'], ARRAY[]),
('iodine', 'Iodo', 'mineral', 'Mineral essencial para função tireoidiana', ARRAY['Tireoide', 'Metabolismo', 'Desenvolvimento'], ARRAY['Hipotireoidismo', 'Fadiga'], 150, 300, 'mcg', 'morning', 'strong', ARRAY['Hipertireoidismo'], ARRAY['Hormônios tireoidianos']),
('potassium', 'Potássio', 'mineral', 'Eletrólito essencial para coração e músculos', ARRAY['Cardiovascular', 'Músculos', 'Pressão'], ARRAY['Hipertensão', 'Cãibras'], 3500, 4700, 'mg', 'any', 'strong', ARRAY['Insuficiência renal'], ARRAY['IECA']),
('phosphorus', 'Fósforo', 'mineral', 'Mineral para ossos e energia celular', ARRAY['Saúde óssea', 'Energia celular', 'DNA'], ARRAY['Ossos fracos', 'Fadiga'], 700, 1250, 'mg', 'with_meal', 'strong', ARRAY['Insuficiência renal'], ARRAY['Antiácidos']),
('molybdenum', 'Molibdênio', 'mineral', 'Mineral para metabolismo de aminoácidos', ARRAY['Metabolismo', 'Desintoxicação'], ARRAY['Fadiga', 'Problemas metabólicos'], 45, 150, 'mcg', 'morning', 'limited', ARRAY[], ARRAY[]),
('boron', 'Boro', 'mineral', 'Mineral para saúde óssea e hormonal', ARRAY['Saúde óssea', 'Hormônios', 'Cognição'], ARRAY['Osteoporose', 'Baixo hormônio'], 3, 20, 'mg', 'morning', 'limited', ARRAY[], ARRAY[]),
('vanadium', 'Vanádio', 'mineral', 'Mineral para metabolismo da glicose', ARRAY['Glicemia', 'Metabolismo'], ARRAY['Resistência à insulina'], 10, 100, 'mcg', 'with_meal', 'limited', ARRAY[], ARRAY[]),
('strontium', 'Estrôncio', 'mineral', 'Mineral para densidade óssea', ARRAY['Saúde óssea', 'Densidade'], ARRAY['Osteoporose'], 340, 680, 'mg', 'evening', 'limited', ARRAY[], ARRAY['Cálcio']),

-- AMINOÁCIDOS
('l-carnitine', 'L-Carnitina', 'amino_acid', 'Aminoácido para metabolismo de gorduras', ARRAY['Queima de gordura', 'Energia', 'Performance'], ARRAY['Fadiga', 'Baixa performance'], 500, 3000, 'mg', 'morning', 'moderate', ARRAY['Hipotireoidismo'], ARRAY[]),
('arginine', 'Arginina', 'amino_acid', 'Aminoácido para óxido nítrico', ARRAY['Circulação', 'Performance', 'Imunidade'], ARRAY['Má circulação', 'Baixa performance'], 3000, 6000, 'mg', 'morning', 'moderate', ARRAY['Herpes'], ARRAY['Sildenafil']),
('lysine', 'Lisina', 'amino_acid', 'Aminoácido essencial para proteínas', ARRAY['Síntese proteica', 'Imunidade', 'Colágeno'], ARRAY['Baixa imunidade', 'Herpes'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),
('tryptophan', 'Triptofano', 'amino_acid', 'Precursor da serotonina', ARRAY['Humor', 'Sono', 'Serotonina'], ARRAY['Depressão', 'Insônia', 'Ansiedade'], 500, 2000, 'mg', 'evening', 'moderate', ARRAY['Síndrome da serotonina'], ARRAY['Antidepressivos']),
('tyrosine', 'Tirosina', 'amino_acid', 'Precursor de neurotransmissores', ARRAY['Concentração', 'Humor', 'Energia'], ARRAY['Fadiga mental', 'Baixa concentração'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY['Hipertireoidismo'], ARRAY['MAOIs']),
('glutamine', 'Glutamina', 'amino_acid', 'Aminoácido para recuperação muscular', ARRAY['Recuperação', 'Imunidade', 'Intestino'], ARRAY['Recuperação lenta', 'Intestino permeável'], 5000, 15000, 'mg', 'any', 'moderate', ARRAY[], ARRAY[]),
('glycine', 'Glicina', 'amino_acid', 'Aminoácido para sono e colágeno', ARRAY['Sono', 'Colágeno', 'Relaxamento'], ARRAY['Insônia', 'Ansiedade'], 1000, 3000, 'mg', 'evening', 'moderate', ARRAY[], ARRAY[]),
('taurine', 'Taurina', 'amino_acid', 'Aminoácido para coração e músculos', ARRAY['Cardiovascular', 'Músculos', 'Antioxidante'], ARRAY['Fadiga', 'Problemas cardiovasculares'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),
('beta-alanine', 'Beta-Alanina', 'amino_acid', 'Aminoácido para performance muscular', ARRAY['Performance', 'Resistência muscular'], ARRAY['Fadiga muscular', 'Baixa resistência'], 2000, 5000, 'mg', 'morning', 'strong', ARRAY[], ARRAY[]),
('histidine', 'Histidina', 'amino_acid', 'Aminoácido essencial para histamina', ARRAY['Imunidade', 'Neurotransmissores'], ARRAY['Alergias', 'Inflamação'], 500, 1500, 'mg', 'morning', 'limited', ARRAY[], ARRAY[]),
('leucine', 'Leucina', 'amino_acid', 'Aminoácido de cadeia ramificada', ARRAY['Síntese proteica', 'Recuperação'], ARRAY['Perda muscular', 'Recuperação lenta'], 2500, 5000, 'mg', 'any', 'strong', ARRAY[], ARRAY[]),
('isoleucine', 'Isoleucina', 'amino_acid', 'Aminoácido de cadeia ramificada', ARRAY['Energia muscular', 'Recuperação'], ARRAY['Fadiga muscular'], 1200, 2400, 'mg', 'any', 'moderate', ARRAY[], ARRAY[]),
('valine', 'Valina', 'amino_acid', 'Aminoácido de cadeia ramificada', ARRAY['Energia muscular', 'Recuperação'], ARRAY['Fadiga muscular'], 1300, 2600, 'mg', 'any', 'moderate', ARRAY[], ARRAY[]),
('ornithine', 'Ornitina', 'amino_acid', 'Aminoácido para detoxificação', ARRAY['Detoxificação', 'Sono', 'Fadiga'], ARRAY['Fadiga', 'Estresse'], 400, 2000, 'mg', 'evening', 'limited', ARRAY[], ARRAY[]),
('citrulline', 'Citrulina', 'amino_acid', 'Precursor do óxido nítrico', ARRAY['Circulação', 'Performance', 'Bomba muscular'], ARRAY['Má circulação', 'Baixa performance'], 3000, 8000, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),
('cysteine', 'Cisteína', 'amino_acid', 'Precursor da glutationa', ARRAY['Antioxidante', 'Detoxificação'], ARRAY['Estresse oxidativo'], 500, 1500, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),

-- ERVAS E EXTRATOS
('ashwagandha', 'Ashwagandha', 'herb', 'Adaptógeno para estresse e cortisol', ARRAY['Estresse', 'Cortisol', 'Energia'], ARRAY['Estresse excessivo', 'Fadiga', 'Ansiedade'], 300, 600, 'mg', 'evening', 'strong', ARRAY['Autoimunes'], ARRAY['Sedativos']),
('rhodiola', 'Rhodiola Rosea', 'herb', 'Adaptógeno para fadiga e performance', ARRAY['Fadiga', 'Performance mental', 'Estresse'], ARRAY['Fadiga mental', 'Estresse', 'Baixa concentração'], 200, 600, 'mg', 'morning', 'strong', ARRAY['Transtorno bipolar'], ARRAY['Antidepressivos']),
('ginseng', 'Ginseng Panax', 'herb', 'Adaptógeno para energia e cognição', ARRAY['Energia', 'Cognição', 'Imunidade'], ARRAY['Fadiga', 'Baixa concentração'], 200, 800, 'mg', 'morning', 'strong', ARRAY['Hipertensão'], ARRAY['Varfarina']),
('bacopa', 'Bacopa Monnieri', 'herb', 'Nootrópico para memória e aprendizado', ARRAY['Memória', 'Aprendizado', 'Cognição'], ARRAY['Má memória', 'Dificuldade de concentração'], 300, 600, 'mg', 'with_meal', 'strong', ARRAY[], ARRAY['Sedativos']),
('ginkgo', 'Ginkgo Biloba', 'herb', 'Circulatório e nootrópico', ARRAY['Circulação', 'Memória', 'Concentração'], ARRAY['Má circulação', 'Problemas de memória'], 120, 240, 'mg', 'morning', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Varfarina']),
('turmeric', 'Cúrcuma', 'herb', 'Anti-inflamatório natural potente', ARRAY['Anti-inflamatório', 'Antioxidante', 'Articular'], ARRAY['Inflamação', 'Dores articulares'], 500, 1500, 'mg', 'with_meal', 'strong', ARRAY['Cálculos biliares'], ARRAY['Anticoagulantes']),
('green-tea', 'Chá Verde (EGCG)', 'herb', 'Antioxidante e termogênico', ARRAY['Antioxidante', 'Queima de gordura', 'Energia'], ARRAY['Baixa energia', 'Peso excessivo'], 300, 800, 'mg', 'morning', 'strong', ARRAY['Anemia por ferro'], ARRAY['Betabloqueadores']),
('milk-thistle', 'Cardo Mariano', 'herb', 'Hepatoprotetor e detoxificante', ARRAY['Fígado', 'Detoxificação'], ARRAY['Problemas hepáticos'], 200, 800, 'mg', 'with_meal', 'strong', ARRAY[], ARRAY['Diabetes medicamentos']),
('echinacea', 'Equinácea', 'herb', 'Estimulante imunológico', ARRAY['Imunidade', 'Anti-infeccioso'], ARRAY['Baixa imunidade', 'Resfriados frequentes'], 300, 1200, 'mg', 'morning', 'moderate', ARRAY['Autoimunes'], ARRAY['Imunossupressores']),
('valerian', 'Valeriana', 'herb', 'Sedativo natural para sono', ARRAY['Sono', 'Relaxamento', 'Ansiedade'], ARRAY['Insônia', 'Ansiedade'], 300, 900, 'mg', 'evening', 'moderate', ARRAY[], ARRAY['Sedativos']),
('saw-palmetto', 'Saw Palmetto', 'herb', 'Para saúde da próstata', ARRAY['Próstata', 'Hormônios'], ARRAY['Problemas de próstata'], 160, 320, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY['Anticoagulantes']),
('st-johns-wort', 'Erva de São João', 'herb', 'Antidepressivo natural', ARRAY['Humor', 'Depressão leve'], ARRAY['Depressão leve', 'Mudanças de humor'], 300, 900, 'mg', 'morning', 'strong', ARRAY['Fotossensibilidade'], ARRAY['Antidepressivos', 'Contraceptivos']),
('gotu-kola', 'Gotu Kola', 'herb', 'Nootrópico e circulatório', ARRAY['Cognição', 'Circulação', 'Cicatrização'], ARRAY['Má circulação', 'Problemas cognitivos'], 300, 1000, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),
('holy-basil', 'Manjericão Sagrado (Tulsi)', 'herb', 'Adaptógeno para estresse', ARRAY['Estresse', 'Cortisol', 'Imunidade'], ARRAY['Estresse excessivo', 'Baixa imunidade'], 300, 600, 'mg', 'any', 'moderate', ARRAY[], ARRAY['Diabetes medicamentos']),
('passionflower', 'Passiflora', 'herb', 'Ansiolítico natural', ARRAY['Ansiedade', 'Sono', 'Relaxamento'], ARRAY['Ansiedade', 'Insônia'], 250, 800, 'mg', 'evening', 'moderate', ARRAY[], ARRAY['Sedativos']),
('lemon-balm', 'Melissa (Erva-cidreira)', 'herb', 'Calmante e digestivo', ARRAY['Relaxamento', 'Digestão', 'Sono'], ARRAY['Ansiedade', 'Problemas digestivos'], 300, 1200, 'mg', 'evening', 'moderate', ARRAY[], ARRAY['Sedativos']),
('hawthorn', 'Espinheiro Branco', 'herb', 'Cardiotônico natural', ARRAY['Cardiovascular', 'Pressão arterial'], ARRAY['Problemas cardíacos', 'Hipertensão'], 300, 1800, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY['Medicamentos cardíacos']),
('elderberry', 'Sabugueiro', 'herb', 'Antiviral e imunológico', ARRAY['Imunidade', 'Antiviral'], ARRAY['Baixa imunidade', 'Gripes'], 300, 1200, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),
('astragalus', 'Astragalus', 'herb', 'Adaptógeno imunológico', ARRAY['Imunidade', 'Energia', 'Longevidade'], ARRAY['Baixa imunidade', 'Fadiga crônica'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY['Autoimunes'], ARRAY['Imunossupressores']),
('cordyceps', 'Cordyceps', 'herb', 'Fungo adaptógeno para energia', ARRAY['Energia', 'Performance', 'Respiração'], ARRAY['Fadiga', 'Baixa performance'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),
('reishi', 'Reishi', 'herb', 'Fungo adaptógeno para imunidade', ARRAY['Imunidade', 'Sono', 'Longevidade'], ARRAY['Baixa imunidade', 'Estresse'], 1000, 3000, 'mg', 'evening', 'moderate', ARRAY[], ARRAY['Anticoagulantes']),
('lions-mane', 'Juba de Leão', 'herb', 'Nootrópico natural', ARRAY['Cognição', 'Neuroproteção', 'Memória'], ARRAY['Problemas cognitivos', 'Má memória'], 500, 3000, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),
('maca', 'Maca Peruana', 'herb', 'Adaptógeno hormonal', ARRAY['Energia', 'Libido', 'Hormônios'], ARRAY['Baixa libido', 'Fadiga'], 1500, 3000, 'mg', 'morning', 'moderate', ARRAY['Problemas hormonais'], ARRAY[]),
('tongkat-ali', 'Tongkat Ali', 'herb', 'Para testosterona natural', ARRAY['Testosterona', 'Libido', 'Músculos'], ARRAY['Baixa testosterona', 'Baixa libido'], 200, 600, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),
('tribulus', 'Tribulus Terrestris', 'herb', 'Para libido e hormônios', ARRAY['Libido', 'Testosterona'], ARRAY['Baixa libido'], 250, 1500, 'mg', 'morning', 'limited', ARRAY[], ARRAY[]),
('fenugreek', 'Feno-grego', 'herb', 'Para testosterona e glicemia', ARRAY['Testosterona', 'Glicemia', 'Digestão'], ARRAY['Baixa testosterona', 'Glicemia alta'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY['Diabetes medicamentos']),

-- ANTIOXIDANTES E OUTROS
('resveratrol', 'Resveratrol', 'other', 'Polifenol antioxidante e anti-aging', ARRAY['Antioxidante', 'Anti-aging', 'Cardiovascular'], ARRAY['Envelhecimento', 'Inflamação'], 100, 500, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY['Anticoagulantes']),
('quercetin', 'Quercetina', 'other', 'Flavonoide antioxidante e anti-histamínico', ARRAY['Antioxidante', 'Anti-histamínico', 'Anti-inflamatório'], ARRAY['Alergias', 'Inflamação'], 500, 1000, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY[]),
('coq10', 'Coenzima Q10', 'other', 'Antioxidante celular e energético', ARRAY['Energia celular', 'Cardiovascular', 'Antioxidante'], ARRAY['Fadiga', 'Problemas cardíacos'], 100, 300, 'mg', 'with_meal', 'strong', ARRAY[], ARRAY['Varfarina']),
('alpha-lipoic-acid', 'Ácido Alfa-Lipóico', 'other', 'Antioxidante universal', ARRAY['Antioxidante', 'Glicemia', 'Neuroproteção'], ARRAY['Diabetes', 'Neuropatia'], 300, 800, 'mg', 'morning', 'strong', ARRAY[], ARRAY['Diabetes medicamentos']),
('pqq', 'PQQ', 'other', 'Cofator mitocondrial', ARRAY['Energia mitocondrial', 'Neuroproteção'], ARRAY['Fadiga', 'Problemas cognitivos'], 10, 40, 'mg', 'morning', 'limited', ARRAY[], ARRAY[]),
('nad-precursors', 'Precursores de NAD+', 'other', 'Para energia celular e longevidade', ARRAY['Energia celular', 'Anti-aging', 'Metabolismo'], ARRAY['Fadiga', 'Envelhecimento'], 250, 1000, 'mg', 'morning', 'moderate', ARRAY[], ARRAY[]),
('pteroestilbene', 'Pterostilbeno', 'other', 'Análogo do resveratrol', ARRAY['Antioxidante', 'Neuroproteção', 'Anti-aging'], ARRAY['Inflamação', 'Envelhecimento'], 50, 250, 'mg', 'with_meal', 'limited', ARRAY[], ARRAY[]),
('sulforaphane', 'Sulforafano', 'other', 'Composto detoxificante do brócolis', ARRAY['Detoxificação', 'Anti-câncer', 'Anti-inflamatório'], ARRAY['Inflamação', 'Exposição a toxinas'], 30, 100, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY[]),
('curcumin', 'Curcumina', 'other', 'Princípio ativo da cúrcuma', ARRAY['Anti-inflamatório', 'Antioxidante', 'Articular'], ARRAY['Inflamação', 'Dores articulares'], 500, 1500, 'mg', 'with_meal', 'strong', ARRAY['Cálculos biliares'], ARRAY['Anticoagulantes']),
('berberine', 'Berberina', 'other', 'Alcaloide para glicemia', ARRAY['Glicemia', 'Colesterol', 'Peso'], ARRAY['Diabetes', 'Colesterol alto'], 500, 1500, 'mg', 'with_meal', 'strong', ARRAY[], ARRAY['Diabetes medicamentos']),

-- ÁCIDOS GRAXOS E LIPÍDIOS
('fish-oil', 'Óleo de Peixe (Ômega-3)', 'other', 'Ácidos graxos essenciais EPA e DHA', ARRAY['Cardiovascular', 'Cérebro', 'Anti-inflamatório'], ARRAY['Inflamação', 'Problemas cardiovasculares'], 1000, 4000, 'mg', 'with_meal', 'strong', ARRAY[], ARRAY['Anticoagulantes']),
('krill-oil', 'Óleo de Krill', 'other', 'Ômega-3 com fosfolipídios', ARRAY['Cardiovascular', 'Cérebro', 'Antioxidante'], ARRAY['Inflamação', 'Problemas cognitivos'], 500, 2000, 'mg', 'with_meal', 'moderate', ARRAY['Alergia a frutos do mar'], ARRAY['Anticoagulantes']),
('evening-primrose', 'Óleo de Prímula', 'other', 'Rico em GLA (ômega-6)', ARRAY['Hormônios femininos', 'Pele', 'Anti-inflamatório'], ARRAY['Problemas hormonais', 'Problemas de pele'], 500, 3000, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY[]),
('mct-oil', 'Óleo TCM', 'other', 'Triglicerídeos de cadeia média', ARRAY['Energia rápida', 'Cetose', 'Cognição'], ARRAY['Fadiga mental', 'Baixa energia'], 15, 45, 'ml', 'morning', 'moderate', ARRAY[], ARRAY[]),

-- FIBRAS E PREBIÓTICOS
('psyllium', 'Psyllium', 'other', 'Fibra solúvel para intestino', ARRAY['Saúde intestinal', 'Colesterol', 'Saciedade'], ARRAY['Constipação', 'Colesterol alto'], 5, 15, 'g', 'with_meal', 'strong', ARRAY['Obstrução intestinal'], ARRAY['Medicamentos']),
('inulin', 'Inulina', 'other', 'Prebiótico para microbiota', ARRAY['Microbiota', 'Saúde intestinal'], ARRAY['Disbiose', 'Problemas digestivos'], 5, 20, 'g', 'with_meal', 'moderate', ARRAY['SIBO'], ARRAY[]),

-- PROBIÓTICOS
('lactobacillus', 'Lactobacillus', 'other', 'Probiótico para saúde intestinal', ARRAY['Microbiota', 'Imunidade', 'Digestão'], ARRAY['Disbiose', 'Problemas digestivos'], 10, 100, 'billion CFU', 'with_meal', 'strong', ARRAY['Imunodeprimidos'], ARRAY[]),
('bifidobacterium', 'Bifidobacterium', 'other', 'Probiótico para cólon', ARRAY['Saúde intestinal', 'Imunidade'], ARRAY['Problemas digestivos', 'Baixa imunidade'], 10, 50, 'billion CFU', 'with_meal', 'strong', ARRAY[], ARRAY[]),

-- ENZIMAS
('bromelain', 'Bromelina', 'other', 'Enzima digestiva e anti-inflamatória', ARRAY['Digestão', 'Anti-inflamatório', 'Recuperação'], ARRAY['Má digestão', 'Inflamação'], 200, 800, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY['Anticoagulantes']),
('papain', 'Papaína', 'other', 'Enzima digestiva de proteínas', ARRAY['Digestão proteica', 'Anti-inflamatório'], ARRAY['Má digestão', 'Inchaço'], 100, 500, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY[]),

-- HORMÔNIOS E PRECURSORES
('melatonin', 'Melatonina', 'other', 'Hormônio do sono', ARRAY['Sono', 'Jet lag', 'Antioxidante'], ARRAY['Insônia', 'Jet lag'], 0.5, 10, 'mg', 'evening', 'strong', ARRAY['Gravidez'], ARRAY['Sedativos']),
('dhea', 'DHEA', 'other', 'Precursor hormonal', ARRAY['Hormônios', 'Anti-aging', 'Energia'], ARRAY['Baixos hormônios', 'Fadiga'], 25, 100, 'mg', 'morning', 'moderate', ARRAY['Câncer hormonal'], ARRAY[]),

-- COLÁGENO E PROTEÍNAS
('collagen', 'Colágeno', 'other', 'Proteína estrutural', ARRAY['Pele', 'Articulações', 'Ossos'], ARRAY['Rugas', 'Dores articulares'], 10, 30, 'g', 'any', 'moderate', ARRAY[], ARRAY[]),
('whey-protein', 'Whey Protein', 'other', 'Proteína do soro do leite', ARRAY['Músculos', 'Recuperação', 'Saciedade'], ARRAY['Baixa massa muscular'], 25, 50, 'g', 'any', 'strong', ARRAY['Alergia ao leite'], ARRAY[]),
('casein', 'Caseína', 'other', 'Proteína de digestão lenta', ARRAY['Músculos', 'Saciedade noturna'], ARRAY['Perda muscular'], 25, 40, 'g', 'evening', 'moderate', ARRAY['Alergia ao leite'], ARRAY[]),

-- CREATINA E DERIVADOS
('creatine', 'Creatina', 'other', 'Para força e potência muscular', ARRAY['Força', 'Potência', 'Cognição'], ARRAY['Baixa força', 'Fadiga muscular'], 3, 5, 'g', 'any', 'strong', ARRAY['Insuficiência renal'], ARRAY[]),

-- CAFEÍNA E ESTIMULANTES
('caffeine', 'Cafeína', 'other', 'Estimulante natural', ARRAY['Energia', 'Concentração', 'Performance'], ARRAY['Fadiga', 'Baixa concentração'], 100, 400, 'mg', 'morning', 'strong', ARRAY['Ansiedade'], ARRAY['Estimulantes']),

-- GLUCOSAMINA E CONDROITINA
('glucosamine', 'Glucosamina', 'other', 'Para cartilagem articular', ARRAY['Articulações', 'Cartilagem'], ARRAY['Artrite', 'Dores articulares'], 1500, 3000, 'mg', 'with_meal', 'moderate', ARRAY['Diabetes'], ARRAY['Anticoagulantes']),
('chondroitin', 'Condroitina', 'other', 'Para elasticidade articular', ARRAY['Articulações', 'Cartilagem'], ARRAY['Artrite', 'Rigidez'], 800, 1200, 'mg', 'with_meal', 'moderate', ARRAY[], ARRAY['Anticoagulantes']);