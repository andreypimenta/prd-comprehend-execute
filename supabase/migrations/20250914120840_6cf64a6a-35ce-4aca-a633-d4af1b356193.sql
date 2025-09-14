-- Adicionar apenas os suplementos que realmente faltam

INSERT INTO public.supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions) VALUES

-- Proteínas
('whey-protein', 'Whey Protein', 'amino_acid', 'Proteína do soro do leite de alta qualidade e rápida absorção, rica em aminoácidos essenciais e BCAA.', 
ARRAY['Ganho de massa muscular', 'Recuperação pós-treino', 'Síntese proteica', 'Melhoria da performance'], 
ARRAY['Fadiga', 'Recuperação lenta pós-treino', 'Falta de energia'], 
20, 50, 'g', 'with_meal', 'strong', 
ARRAY['Alergia ao leite', 'Intolerância à lactose severa'], 
ARRAY['Pode reduzir absorção de alguns medicamentos se tomado simultaneamente']),

('caseina', 'Caseína', 'amino_acid', 'Proteína de digestão lenta derivada do leite, ideal para fornecimento prolongado de aminoácidos.', 
ARRAY['Ganho de massa muscular', 'Recuperação noturna', 'Saciedade prolongada', 'Manutenção muscular'], 
ARRAY['Fadiga', 'Recuperação lenta pós-treino', 'Falta de energia'], 
20, 40, 'g', 'evening', 'strong', 
ARRAY['Alergia ao leite', 'Intolerância à lactose'], 
ARRAY['Pode interferir na absorção de minerais se consumida em excesso']),

('proteina-vegetal', 'Proteína Vegetal', 'amino_acid', 'Blend de proteínas vegetais (ervilha, arroz, hemp) com perfil completo de aminoácidos.', 
ARRAY['Ganho de massa muscular', 'Recuperação pós-treino', 'Digestão fácil', 'Opção vegana'], 
ARRAY['Fadiga', 'Recuperação lenta pós-treino', 'Problemas digestivos'], 
20, 40, 'g', 'with_meal', 'moderate', 
ARRAY['Alergia a leguminosas específicas'], 
ARRAY['Raramente interage com medicamentos']),

('albumina', 'Albumina', 'amino_acid', 'Proteína da clara do ovo desidratada, com alto valor biológico e digestão intermediária.', 
ARRAY['Ganho de massa muscular', 'Recuperação pós-treino', 'Baixo custo', 'Rica em leucina'], 
ARRAY['Fadiga', 'Recuperação lenta pós-treino'], 
15, 30, 'g', 'with_meal', 'strong', 
ARRAY['Alergia ao ovo'], 
ARRAY['Pode reduzir absorção de biotina em altas doses']),

('colageno-hidrolisado', 'Colágeno Hidrolisado', 'amino_acid', 'Peptídeos de colágeno de fácil absorção para saúde da pele, articulações e ossos.', 
ARRAY['Saúde da pele', 'Saúde articular', 'Fortalecimento ósseo', 'Elasticidade da pele'], 
ARRAY['Dores articulares', 'Problemas de pele', 'Recuperação lenta pós-treino'], 
10, 20, 'g', 'any', 'moderate', 
ARRAY['Alergia a peixes ou bovinos dependendo da origem'], 
ARRAY['Geralmente bem tolerado']),

('colageno-tipos-1-2-3', 'Colágeno Tipos I, II e III', 'amino_acid', 'Blend completo dos principais tipos de colágeno para suporte estrutural completo.', 
ARRAY['Saúde articular', 'Saúde da pele', 'Fortalecimento de cartilagens', 'Saúde óssea'], 
ARRAY['Dores articulares', 'Problemas de pele', 'Dores musculares'], 
5, 15, 'g', 'any', 'moderate', 
ARRAY['Alergia a frutos do mar ou bovinos'], 
ARRAY['Bem tolerado pela maioria das pessoas']),

-- Suplemento do Sono
('melatonina', 'Melatonina', 'other', 'Hormônio natural que regula o ciclo circadiano e melhora a qualidade do sono.', 
ARRAY['Melhoria do sono', 'Regulação do ritmo circadiano', 'Propriedades antioxidantes', 'Redução do jet lag'], 
ARRAY['Insônia', 'Ansiedade', 'Estresse excessivo'], 
0.5, 10, 'mg', 'evening', 'strong', 
ARRAY['Gravidez', 'Amamentação', 'Doenças autoimunes', 'Uso de anticoagulantes'], 
ARRAY['Sedativos', 'Anticoagulantes', 'Medicamentos para diabetes']),

-- Superalimentos
('spirulina', 'Spirulina', 'other', 'Microalga azul-verde rica em proteínas, vitaminas, minerais e antioxidantes.', 
ARRAY['Fortalecimento imunológico', 'Energia natural', 'Desintoxicação', 'Rico em proteínas'], 
ARRAY['Fadiga', 'Baixa imunidade', 'Falta de energia'], 
1, 8, 'g', 'morning', 'moderate', 
ARRAY['Fenilcetonúria', 'Doenças autoimunes'], 
ARRAY['Anticoagulantes', 'Imunossupressores']),

('chlorella', 'Chlorella', 'other', 'Microalga verde rica em clorofila, vitaminas e minerais com propriedades desintoxicantes.', 
ARRAY['Desintoxicação', 'Fortalecimento imunológico', 'Saúde digestiva', 'Rico em clorofila'], 
ARRAY['Fadiga', 'Baixa imunidade', 'Problemas digestivos'], 
2, 10, 'g', 'morning', 'moderate', 
ARRAY['Alergia a algas', 'Problemas de coagulação'], 
ARRAY['Anticoagulantes', 'Medicamentos fotossensibilizantes']),

('acai', 'Açaí', 'other', 'Fruto amazônico rico em antioxidantes, antocianinas e gorduras saudáveis.', 
ARRAY['Propriedades antioxidantes', 'Energia natural', 'Saúde cardiovascular', 'Anti-envelhecimento'], 
ARRAY['Fadiga', 'Estresse excessivo', 'Baixa imunidade'], 
5, 15, 'g', 'morning', 'moderate', 
ARRAY['Alergia a frutas vermelhas'], 
ARRAY['Geralmente bem tolerado']),

('maca-peruana', 'Maca Peruana', 'herb', 'Raiz andina adaptógena que melhora energia, resistência e equilíbrio hormonal.', 
ARRAY['Aumento da energia', 'Melhoria da libido', 'Equilíbrio hormonal', 'Resistência física'], 
ARRAY['Fadiga', 'Estresse excessivo', 'Baixa energia', 'Mudanças de humor'], 
1.5, 6, 'g', 'morning', 'moderate', 
ARRAY['Problemas hormonais sensíveis', 'Hipertensão'], 
ARRAY['Medicamentos hormonais']),

('cloreto-magnesio', 'Cloreto de Magnésio', 'mineral', 'Forma de magnésio com boa biodisponibilidade para múltiplas funções corporais.', 
ARRAY['Saúde óssea', 'Função muscular', 'Saúde cardiovascular', 'Metabolismo energético'], 
ARRAY['Cãibras musculares', 'Fadiga', 'Ansiedade'], 
200, 400, 'mg', 'with_meal', 'strong', 
ARRAY['Problemas renais', 'Diarreia crônica'], 
ARRAY['Antibióticos', 'Diuréticos']),

-- Digestão
('psyllium', 'Psyllium', 'other', 'Fibra solúvel natural que melhora a saúde digestiva e regula o colesterol.', 
ARRAY['Saúde digestiva', 'Regulação do colesterol', 'Controle da glicemia', 'Saciedade'], 
ARRAY['Problemas digestivos', 'Constipação'], 
5, 15, 'g', 'with_meal', 'strong', 
ARRAY['Obstrução intestinal', 'Dificuldade de deglutição'], 
ARRAY['Pode reduzir absorção de medicamentos']),

-- Óleo Especializado
('oleo-peixe-concentrado', 'Óleo de Peixe Concentrado', 'other', 'Óleo de peixe purificado e concentrado em EPA e DHA para máxima potência.', 
ARRAY['Saúde cardiovascular', 'Função cerebral', 'Anti-inflamatório', 'Saúde ocular'], 
ARRAY['Problemas de concentração', 'Estresse excessivo', 'Fadiga'], 
1000, 3000, 'mg', 'with_meal', 'strong', 
ARRAY['Alergia a peixes', 'Problemas de coagulação'], 
ARRAY['Anticoagulantes', 'Medicamentos para pressão']);