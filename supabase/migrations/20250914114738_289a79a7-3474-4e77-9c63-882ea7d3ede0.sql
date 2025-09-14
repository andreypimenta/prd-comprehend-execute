-- Continuando expansão para 402+ suplementos - BATCH 3

INSERT INTO supplements (id, name, category, description, benefits, target_symptoms, dosage_min, dosage_max, dosage_unit, timing, evidence_level, contraindications, interactions, price_min, price_max) VALUES

-- VITAMINAS ESPECÍFICAS E FORMAS AVANÇADAS
('vit_d2', 'Vitamina D2 (Ergocalciferol)', 'vitamin', 'Forma vegetal da vitamina D', ARRAY['Saúde óssea', 'Imunidade'], ARRAY['deficiência vitamina D', 'ossos fracos'], 1000, 4000, 'IU', 'morning', 'moderate', ARRAY['Hipercalcemia'], ARRAY['Tiazídicos'], 8, 20),
('vit_b12_methyl', 'Metilcobalamina (B12 Ativa)', 'vitamin', 'Forma ativa da vitamina B12', ARRAY['Energia', 'Função nervosa', 'Metilação'], ARRAY['fadiga', 'neuropatia'], 500, 5000, 'mcg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('vit_b12_adenosyl', 'Adenosilcobalamina', 'vitamin', 'Forma mitocondrial da B12', ARRAY['Energia mitocondrial', 'Metabolismo'], ARRAY['fadiga severa', 'distúrbios metabólicos'], 500, 3000, 'mcg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 60),
('vit_b6_p5p', 'P-5-P (Piridoxal-5-Fosfato)', 'vitamin', 'Forma ativa da vitamina B6', ARRAY['Neurotransmissores', 'Hormônios'], ARRAY['TPM', 'depressão', 'neuropatia'], 50, 200, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY['Levodopa'], 15, 40),
('folate_methyl', 'Metilfolato (5-MTHF)', 'vitamin', 'Forma ativa do ácido fólico', ARRAY['Metilação', 'Saúde mental', 'Cardiovascular'], ARRAY['depressão', 'fadiga'], 400, 1000, 'mcg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('vit_c_liposomal', 'Vitamina C Lipossomal', 'vitamin', 'Vitamina C de alta absorção', ARRAY['Imunidade potente', 'Antioxidante'], ARRAY['imunidade baixa', 'infecções'], 500, 2000, 'mg', 'morning', 'strong', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('vit_e_complex', 'Complexo Vitamina E', 'vitamin', 'Todas as formas de tocoferóis', ARRAY['Antioxidante completo', 'Saúde cardiovascular'], ARRAY['estresse oxidativo'], 200, 800, 'mg', 'with_meal', 'strong', ARRAY['Anticoagulação'], ARRAY['Warfarina'], 20, 55),

-- MINERAIS QUELADOS E FORMAS ESPECIAIS
('magnesium_glycinate', 'Magnésio Glicinato', 'mineral', 'Magnésio de alta absorção', ARRAY['Relaxamento', 'Sono', 'Músculos'], ARRAY['insônia', 'ansiedade', 'cãibras'], 200, 800, 'mg', 'evening', 'strong', ARRAY['Insuficiência renal'], ARRAY[]::text[], 15, 40),
('magnesium_malate', 'Magnésio Malato', 'mineral', 'Magnésio para energia', ARRAY['Energia', 'Fibromialgia', 'Performance'], ARRAY['fadiga', 'fibromialgia'], 400, 1200, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('magnesium_threonate', 'Magnésio L-Treonato', 'mineral', 'Magnésio para cérebro', ARRAY['Memória', 'Aprendizado', 'Neuroplasticidade'], ARRAY['declínio cognitivo', 'perda memória'], 1000, 2000, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 40, 100),
('zinc_picolinate', 'Zinco Picolinato', 'mineral', 'Zinco de alta biodisponibilidade', ARRAY['Imunidade', 'Pele', 'Cicatrização'], ARRAY['acne', 'cicatrização lenta'], 15, 50, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY['Antibióticos'], 12, 30),
('iron_bisglycinate', 'Ferro Bisglicinato', 'mineral', 'Ferro suave para estômago', ARRAY['Energia sem irritação', 'Prevenção anemia'], ARRAY['anemia', 'fadiga'], 18, 65, 'mg', 'morning', 'strong', ARRAY['Hemocromatose'], ARRAY[]::text[], 15, 35),
('calcium_citrate', 'Cálcio Citrato', 'mineral', 'Cálcio de fácil absorção', ARRAY['Saúde óssea', 'Músculos'], ARRAY['osteoporose', 'cãibras'], 500, 1200, 'mg', 'with_meal', 'strong', ARRAY[]::text[], ARRAY[]::text[], 12, 28),
('potassium_citrate', 'Potássio Citrato', 'mineral', 'Forma alcalinizante do potássio', ARRAY['Pressão arterial', 'pH corporal'], ARRAY['hipertensão', 'acidose'], 99, 300, 'mg', 'any', 'strong', ARRAY['Insuficiência renal'], ARRAY['IECA'], 10, 25),

-- ERVAS PARA DIGESTÃO E FÍGADO
('dandelion_root', 'Raiz de Dente-de-Leão', 'herb', 'Hepatoprotetor e diurético', ARRAY['Saúde hepática', 'Digestão', 'Diurético'], ARRAY['problemas hepáticos', 'retenção líquido'], 500, 2000, 'mg', 'with_meal', 'moderate', ARRAY['Obstrução biliar'], ARRAY[]::text[], 12, 30),
('artichoke_extract', 'Extrato de Alcachofra', 'herb', 'Hepatoprotetor e colesterol', ARRAY['Função hepática', 'Colesterol', 'Digestão'], ARRAY['colesterol alto', 'má digestão'], 300, 640, 'mg', 'with_meal', 'moderate', ARRAY['Cálculos biliares'], ARRAY[]::text[], 18, 45),
('yellow_dock', 'Yellow Dock (Rumex)', 'herb', 'Purificador sanguíneo', ARRAY['Desintoxicação', 'Saúde da pele'], ARRAY['problemas de pele', 'toxicidade'], 500, 1000, 'mg', 'with_meal', 'limited', ARRAY[]::text[], ARRAY[]::text[], 15, 40),
('burdock_root', 'Raiz de Bardana', 'herb', 'Purificador para pele', ARRAY['Saúde da pele', 'Desintoxicação'], ARRAY['acne', 'eczema'], 500, 1500, 'mg', 'with_meal', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('gentian_root', 'Raiz de Genciana', 'herb', 'Estimulante digestivo amargo', ARRAY['Digestão', 'Apetite', 'Enzimas'], ARRAY['má digestão', 'perda apetite'], 300, 600, 'mg', 'before_meal', 'moderate', ARRAY['Úlceras'], ARRAY[]::text[], 20, 50),
('bitter_melon', 'Melão Amargo (Momordica)', 'herb', 'Controle glicêmico natural', ARRAY['Controle açúcar', 'Metabolismo'], ARRAY['diabetes', 'resistência insulina'], 500, 2000, 'mg', 'with_meal', 'moderate', ARRAY['Hipoglicemia'], ARRAY['Insulina'], 20, 50),

-- ERVAS RESPIRATÓRIAS E CIRCULATÓRIAS
('hawthorn_berry', 'Bagas de Espinheiro-Branco', 'herb', 'Tônico cardíaco completo', ARRAY['Saúde cardíaca', 'Pressão arterial'], ARRAY['palpitações', 'hipertensão'], 300, 1800, 'mg', 'any', 'strong', ARRAY[]::text[], ARRAY['Digitálicos'], 15, 40),
('horse_chestnut', 'Castanha-da-Índia', 'herb', 'Circulação venosa', ARRAY['Circulação', 'Varizes', 'Hemorróidas'], ARRAY['varizes', 'pernas pesadas'], 300, 600, 'mg', 'any', 'moderate', ARRAY['Anticoagulantes'], ARRAY['Warfarina'], 18, 45),
('butchers_broom', 'Vassoura de Açougueiro', 'herb', 'Venotônico natural', ARRAY['Circulação venosa', 'Hemorróidas'], ARRAY['insuficiência venosa', 'hemorróidas'], 150, 300, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('gotu_kola', 'Gotu Kola (Centella)', 'herb', 'Circulação e cicatrização', ARRAY['Circulação', 'Cicatrização', 'Memória'], ARRAY['má circulação', 'cicatrização lenta'], 500, 1000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('mullein', 'Verbasco', 'herb', 'Suporte respiratório', ARRAY['Saúde respiratória', 'Tosse'], ARRAY['tosse', 'problemas respiratórios'], 300, 900, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('coltsfoot', 'Tussilagem', 'herb', 'Expectorante natural', ARRAY['Expectoração', 'Tosse'], ARRAY['tosse produtiva', 'muco'], 500, 1000, 'mg', 'any', 'limited', ARRAY['Gravidez'], ARRAY[]::text[], 18, 45),

-- ERVAS PARA ESTRESSE E SISTEMA NERVOSO
('lemon_balm', 'Erva-Cidreira (Melissa)', 'herb', 'Calmante e antiviral', ARRAY['Relaxamento', 'Antiviral', 'Digestão'], ARRAY['ansiedade', 'herpes', 'insônia'], 300, 1200, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),
('passionflower', 'Passiflora', 'herb', 'Ansiolítico natural', ARRAY['Ansiedade', 'Sono', 'Nervosismo'], ARRAY['ansiedade', 'insônia'], 250, 800, 'mg', 'evening', 'strong', ARRAY[]::text[], ARRAY['Sedativos'], 15, 35),
('skullcap', 'Scutellaria', 'herb', 'Nervino e anti-inflamatório', ARRAY['Sistema nervoso', 'Ansiedade'], ARRAY['nervosismo', 'tensão'], 300, 1200, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('california_poppy', 'Papoula da Califórnia', 'herb', 'Sedativo suave natural', ARRAY['Sono', 'Ansiedade leve'], ARRAY['insônia leve', 'nervosismo'], 200, 600, 'mg', 'evening', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('kava_kava', 'Kava Kava', 'herb', 'Ansiolítico potente', ARRAY['Ansiedade severa', 'Relaxamento'], ARRAY['ansiedade severa', 'tensão'], 150, 300, 'mg', 'evening', 'moderate', ARRAY['Doença hepática'], ARRAY['Álcool'], 25, 65),
('st_johns_wort', 'Erva de São João', 'herb', 'Antidepressivo natural', ARRAY['Humor', 'Depressão leve'], ARRAY['depressão leve', 'tristeza'], 300, 900, 'mg', 'morning', 'strong', ARRAY['Medicação psiquiátrica'], ARRAY['Antidepressivos'], 15, 40),

-- ERVAS ESPECÍFICAS PARA MULHERES
('wild_yam', 'Inhame Selvagem', 'herb', 'Precursor hormonal natural', ARRAY['Equilíbrio hormonal', 'Menopausa'], ARRAY['desequilíbrio hormonal', 'TPM'], 500, 1000, 'mg', 'any', 'limited', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('chaste_tree', 'Árvore Casta (Vitex)', 'herb', 'Regulador de prolactina', ARRAY['Regulação ciclo', 'TPM'], ARRAY['TPM', 'irregularidade menstrual'], 175, 400, 'mg', 'morning', 'strong', ARRAY['Hormônios'], ARRAY[]::text[], 20, 50),
('cramp_bark', 'Casca Anti-Cãibra', 'herb', 'Antiespasmódico uterino', ARRAY['Cólicas menstruais', 'Espasmos'], ARRAY['cólicas menstruais', 'espasmos'], 400, 800, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),
('raspberry_leaf', 'Folha de Framboesa', 'herb', 'Tônico uterino', ARRAY['Saúde uterina', 'Gravidez'], ARRAY['fraqueza uterina', 'preparação parto'], 500, 1500, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 12, 30),

-- ERVAS PARA HOMENS
('yohimbe_bark', 'Casca de Yohimbe', 'herb', 'Estimulante sexual masculino', ARRAY['Libido masculina', 'Performance'], ARRAY['disfunção erétil', 'baixa libido'], 15, 30, 'mg', 'morning', 'moderate', ARRAY['Hipertensão', 'Ansiedade'], ARRAY['IMAO'], 30, 75),
('damiana', 'Damiana', 'herb', 'Afrodisíaco tradicional', ARRAY['Libido', 'Humor', 'Energia'], ARRAY['baixa libido', 'depressão leve'], 400, 800, 'mg', 'any', 'limited', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('horny_goat_weed', 'Horny Goat Weed (Epimedium)', 'herb', 'Estimulante sexual natural', ARRAY['Libido', 'Energia sexual'], ARRAY['disfunção erétil', 'fadiga sexual'], 500, 1000, 'mg', 'morning', 'limited', ARRAY['Hipertensão'], ARRAY[]::text[], 25, 60),
('maca_root', 'Raiz de Maca', 'herb', 'Adaptógeno para libido', ARRAY['Libido', 'Energia', 'Fertilidade'], ARRAY['baixa libido', 'fadiga'], 1500, 3000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 35),

-- SUPERALIMENTOS E EXTRATOS ESPECIAIS
('wheatgrass', 'Grama de Trigo', 'other', 'Superfood verde rico em nutrientes', ARRAY['Desintoxicação', 'Energia', 'Alcalinização'], ARRAY['acidez', 'fadiga'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 18, 45),
('barley_grass', 'Grama de Cevada', 'other', 'Verde alcalinizante', ARRAY['Alcalinização', 'Energia'], ARRAY['acidose', 'fadiga'], 1000, 3000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 15, 40),
('moringa', 'Moringa', 'other', 'Superfood com proteínas', ARRAY['Nutrição completa', 'Energia'], ARRAY['desnutrição', 'fadiga'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 20, 50),
('acai_extract', 'Extrato de Açaí', 'other', 'Antioxidante da Amazônia', ARRAY['Antioxidante', 'Energia'], ARRAY['estresse oxidativo', 'fadiga'], 500, 1500, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 25, 65),
('goji_berry', 'Goji Berry', 'other', 'Superfruit antioxidante', ARRAY['Antioxidante', 'Longevidade', 'Visão'], ARRAY['envelhecimento', 'fadiga ocular'], 1000, 3000, 'mg', 'any', 'moderate', ARRAY[]::text[], ARRAY['Warfarina'], 20, 55),
('camu_camu', 'Camu Camu', 'other', 'Fonte natural de vitamina C', ARRAY['Vitamina C natural', 'Imunidade'], ARRAY['deficiência vitamina C', 'imunidade baixa'], 500, 2000, 'mg', 'morning', 'moderate', ARRAY[]::text[], ARRAY[]::text[], 30, 75);

SELECT COUNT(*) as total_suplementos_atual FROM supplements;