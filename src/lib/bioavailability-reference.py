#!/usr/bin/env python3
"""
SISTEMA AVANÇADO DE ANÁLISE DE BIODISPONIBILIDADE
Versão 3.0: Otimização de Absorção e Eficácia Clínica

Análise completa de:
- Formas farmacêuticas otimizadas
- Timing circadiano
- Interações alimentares
- Potencializadores de absorção
- Fatores que reduzem biodisponibilidade
"""

import json
import os
import sys
import time
from pathlib import Path
import pandas as pd
from datetime import datetime, timedelta
import math

class AnalisadorBiodisponibilidade:
    """Analisador avançado de biodisponibilidade para suplementos"""
    
    def __init__(self):
        self.base_dir = Path('/home/ubuntu')
        self.biodisponibilidade_dir = self.base_dir / 'biodisponibilidade_avancada'
        
        # Criar diretório
        self.biodisponibilidade_dir.mkdir(exist_ok=True)
        
        # Carregar bases de conhecimento
        self.formas_farmaceuticas = self.carregar_formas_farmaceuticas()
        self.timing_circadiano = self.carregar_timing_circadiano()
        self.interacoes_alimentares = self.carregar_interacoes_alimentares()
        self.potencializadores = self.carregar_potencializadores()
        self.inibidores_absorcao = self.carregar_inibidores_absorcao()
        self.fatores_individuais = self.carregar_fatores_individuais()
        
        print("Sistema de Biodisponibilidade Avançada inicializado")
        print(f"Base de formas farmacêuticas: {len(self.formas_farmaceuticas)} suplementos")
        print(f"Base de timing circadiano: {len(self.timing_circadiano)} suplementos")
        print(f"Base de interações alimentares: {len(self.interacoes_alimentares)} suplementos")
    
    def carregar_formas_farmaceuticas(self):
        """Carregar base de formas farmacêuticas otimizadas"""
        return {
            'Curcumin': {
                'formas_disponiveis': {
                    'curcumina_padrao': {
                        'biodisponibilidade': 1.0,  # Referência
                        'descricao': 'Curcumina padrão (baixa absorção)',
                        'problemas': ['Baixa solubilidade', 'Metabolismo rápido', 'Baixa permeabilidade'],
                        'absorcao_relativa': '1x'
                    },
                    'curcumina_piperina': {
                        'biodisponibilidade': 20.0,
                        'descricao': 'Curcumina + Piperina (BioPerine)',
                        'mecanismo': 'Inibição CYP450 e glucuronidação',
                        'absorcao_relativa': '20x',
                        'dose_equivalente': '50mg = 1000mg padrão'
                    },
                    'curcumina_lipossomal': {
                        'biodisponibilidade': 46.0,
                        'descricao': 'Curcumina lipossomal',
                        'mecanismo': 'Encapsulação em fosfolipídios',
                        'absorcao_relativa': '46x',
                        'dose_equivalente': '22mg = 1000mg padrão'
                    },
                    'curcumina_fitossoma': {
                        'biodisponibilidade': 29.0,
                        'descricao': 'Curcumina fitossoma (Meriva)',
                        'mecanismo': 'Complexação com fosfatidilcolina',
                        'absorcao_relativa': '29x',
                        'dose_equivalente': '34mg = 1000mg padrão'
                    },
                    'curcumina_nanoparticula': {
                        'biodisponibilidade': 185.0,
                        'descricao': 'Curcumina nanoparticulada',
                        'mecanismo': 'Redução tamanho partícula',
                        'absorcao_relativa': '185x',
                        'dose_equivalente': '5.4mg = 1000mg padrão'
                    }
                },
                'recomendacao_otima': 'curcumina_lipossomal',
                'custo_beneficio': 'curcumina_piperina'
            },
            'Omega-3': {
                'formas_disponiveis': {
                    'oleo_peixe_padrao': {
                        'biodisponibilidade': 1.0,
                        'descricao': 'Óleo de peixe padrão (triglicerídeos)',
                        'absorcao_relativa': '1x',
                        'concentracao_epa_dha': '30%'
                    },
                    'oleo_peixe_concentrado': {
                        'biodisponibilidade': 1.2,
                        'descricao': 'Óleo de peixe concentrado (ésteres etílicos)',
                        'absorcao_relativa': '1.2x',
                        'concentracao_epa_dha': '60-90%',
                        'observacao': 'Requer gordura para absorção'
                    },
                    'triglicerideos_reformados': {
                        'biodisponibilidade': 1.7,
                        'descricao': 'Triglicerídeos re-esterificados',
                        'mecanismo': 'Forma natural, melhor absorção',
                        'absorcao_relativa': '1.7x',
                        'concentracao_epa_dha': '60-80%'
                    },
                    'fosfolipidios_omega3': {
                        'biodisponibilidade': 2.3,
                        'descricao': 'Ômega-3 fosfolipídico (krill)',
                        'mecanismo': 'Fosfolipídios facilitam absorção',
                        'absorcao_relativa': '2.3x',
                        'vantagens': ['Melhor biodisponibilidade', 'Antioxidantes naturais']
                    },
                    'omega3_lipossomal': {
                        'biodisponibilidade': 3.2,
                        'descricao': 'Ômega-3 lipossomal',
                        'mecanismo': 'Encapsulação lipossomal',
                        'absorcao_relativa': '3.2x',
                        'dose_equivalente': '312mg = 1000mg padrão'
                    }
                },
                'recomendacao_otima': 'omega3_lipossomal',
                'custo_beneficio': 'triglicerideos_reformados'
            },
            'Vitamin D': {
                'formas_disponiveis': {
                    'vitamina_d2': {
                        'biodisponibilidade': 0.3,
                        'descricao': 'Ergocalciferol (D2)',
                        'absorcao_relativa': '0.3x',
                        'problemas': ['Menor potência', 'Duração mais curta']
                    },
                    'vitamina_d3_padrao': {
                        'biodisponibilidade': 1.0,
                        'descricao': 'Colecalciferol (D3) padrão',
                        'absorcao_relativa': '1x'
                    },
                    'vitamina_d3_oleosa': {
                        'biodisponibilidade': 1.8,
                        'descricao': 'Vitamina D3 em base oleosa',
                        'mecanismo': 'Solubilização em lipídios',
                        'absorcao_relativa': '1.8x'
                    },
                    'vitamina_d3_lipossomal': {
                        'biodisponibilidade': 2.4,
                        'descricao': 'Vitamina D3 lipossomal',
                        'mecanismo': 'Encapsulação lipossomal',
                        'absorcao_relativa': '2.4x',
                        'dose_equivalente': '417 UI = 1000 UI padrão'
                    },
                    'vitamina_d3_nanoemulsao': {
                        'biodisponibilidade': 3.1,
                        'descricao': 'Vitamina D3 nanoemulsão',
                        'mecanismo': 'Partículas nanométricas',
                        'absorcao_relativa': '3.1x',
                        'dose_equivalente': '323 UI = 1000 UI padrão'
                    }
                },
                'recomendacao_otima': 'vitamina_d3_nanoemulsao',
                'custo_beneficio': 'vitamina_d3_oleosa'
            },
            'Magnesium': {
                'formas_disponiveis': {
                    'oxido_magnesio': {
                        'biodisponibilidade': 0.04,
                        'descricao': 'Óxido de magnésio',
                        'absorcao_relativa': '4%',
                        'problemas': ['Baixíssima absorção', 'Efeito laxativo']
                    },
                    'sulfato_magnesio': {
                        'biodisponibilidade': 0.12,
                        'descricao': 'Sulfato de magnésio',
                        'absorcao_relativa': '12%',
                        'problemas': ['Efeito laxativo forte']
                    },
                    'citrato_magnesio': {
                        'biodisponibilidade': 0.30,
                        'descricao': 'Citrato de magnésio',
                        'absorcao_relativa': '30%',
                        'vantagens': ['Boa absorção', 'Tolerabilidade']
                    },
                    'glicinato_magnesio': {
                        'biodisponibilidade': 0.80,
                        'descricao': 'Glicinato de magnésio (quelado)',
                        'mecanismo': 'Quelação com aminoácido',
                        'absorcao_relativa': '80%',
                        'vantagens': ['Excelente absorção', 'Sem efeito laxativo']
                    },
                    'magnesio_lipossomal': {
                        'biodisponibilidade': 0.90,
                        'descricao': 'Magnésio lipossomal',
                        'mecanismo': 'Encapsulação lipossomal',
                        'absorcao_relativa': '90%',
                        'dose_equivalente': '44mg = 100mg óxido'
                    }
                },
                'recomendacao_otima': 'magnesio_lipossomal',
                'custo_beneficio': 'glicinato_magnesio'
            },
            'Zinc': {
                'formas_disponiveis': {
                    'oxido_zinco': {
                        'biodisponibilidade': 0.15,
                        'descricao': 'Óxido de zinco',
                        'absorcao_relativa': '15%',
                        'problemas': ['Baixa absorção', 'Irritação gástrica']
                    },
                    'sulfato_zinco': {
                        'biodisponibilidade': 0.23,
                        'descricao': 'Sulfato de zinco',
                        'absorcao_relativa': '23%',
                        'problemas': ['Irritação gástrica']
                    },
                    'gluconato_zinco': {
                        'biodisponibilidade': 0.45,
                        'descricao': 'Gluconato de zinco',
                        'absorcao_relativa': '45%',
                        'vantagens': ['Melhor tolerabilidade']
                    },
                    'picolinato_zinco': {
                        'biodisponibilidade': 0.85,
                        'descricao': 'Picolinato de zinco',
                        'mecanismo': 'Quelação com ácido picolínico',
                        'absorcao_relativa': '85%',
                        'vantagens': ['Excelente absorção']
                    },
                    'zinco_lipossomal': {
                        'biodisponibilidade': 0.95,
                        'descricao': 'Zinco lipossomal',
                        'mecanismo': 'Encapsulação lipossomal',
                        'absorcao_relativa': '95%',
                        'dose_equivalente': '2.6mg = 15mg óxido'
                    }
                },
                'recomendacao_otima': 'zinco_lipossomal',
                'custo_beneficio': 'picolinato_zinco'
            },
            'Iron': {
                'formas_disponiveis': {
                    'sulfato_ferroso': {
                        'biodisponibilidade': 0.10,
                        'descricao': 'Sulfato ferroso',
                        'absorcao_relativa': '10%',
                        'problemas': ['Irritação gástrica', 'Constipação']
                    },
                    'fumarato_ferroso': {
                        'biodisponibilidade': 0.13,
                        'descricao': 'Fumarato ferroso',
                        'absorcao_relativa': '13%',
                        'vantagens': ['Menos irritação que sulfato']
                    },
                    'gluconato_ferroso': {
                        'biodisponibilidade': 0.12,
                        'descricao': 'Gluconato ferroso',
                        'absorcao_relativa': '12%',
                        'vantagens': ['Melhor tolerabilidade']
                    },
                    'bisglicinato_ferro': {
                        'biodisponibilidade': 0.90,
                        'descricao': 'Bisglicinato de ferro (quelado)',
                        'mecanismo': 'Quelação com glicina',
                        'absorcao_relativa': '90%',
                        'vantagens': ['Excelente absorção', 'Sem irritação']
                    },
                    'ferro_lipossomal': {
                        'biodisponibilidade': 0.95,
                        'descricao': 'Ferro lipossomal',
                        'mecanismo': 'Encapsulação lipossomal',
                        'absorcao_relativa': '95%',
                        'dose_equivalente': '1.9mg = 18mg sulfato'
                    }
                },
                'recomendacao_otima': 'ferro_lipossomal',
                'custo_beneficio': 'bisglicinato_ferro'
            },
            'CoQ10': {
                'formas_disponiveis': {
                    'coq10_cristalino': {
                        'biodisponibilidade': 1.0,
                        'descricao': 'CoQ10 cristalino padrão',
                        'absorcao_relativa': '1x',
                        'problemas': ['Baixa solubilidade']
                    },
                    'coq10_oleoso': {
                        'biodisponibilidade': 3.2,
                        'descricao': 'CoQ10 em base oleosa',
                        'mecanismo': 'Solubilização lipídica',
                        'absorcao_relativa': '3.2x'
                    },
                    'coq10_nanoemulsao': {
                        'biodisponibilidade': 8.5,
                        'descricao': 'CoQ10 nanoemulsão',
                        'mecanismo': 'Partículas nanométricas',
                        'absorcao_relativa': '8.5x',
                        'dose_equivalente': '12mg = 100mg cristalino'
                    },
                    'ubiquinol': {
                        'biodisponibilidade': 4.2,
                        'descricao': 'Ubiquinol (forma reduzida)',
                        'mecanismo': 'Forma ativa, não requer conversão',
                        'absorcao_relativa': '4.2x',
                        'vantagens': ['Forma ativa', 'Melhor para >40 anos']
                    }
                },
                'recomendacao_otima': 'coq10_nanoemulsao',
                'custo_beneficio': 'ubiquinol'
            }
        }
    
    def carregar_timing_circadiano(self):
        """Carregar base de timing circadiano otimizado"""
        return {
            'Melatonin': {
                'timing_otimo': '30-60 minutos antes de dormir',
                'horario_ideal': '21:00-22:00',
                'ritmo_circadiano': {
                    'pico_natural': '02:00-04:00',
                    'inicio_producao': '21:00',
                    'fim_producao': '07:00'
                },
                'fatores_timing': {
                    'luz_azul': 'Evitar 2h antes da dose',
                    'refeicoes': 'Tomar com estômago vazio',
                    'exercicio': 'Evitar exercício 3h antes'
                },
                'ajustes_especiais': {
                    'jet_lag': 'Ajustar gradualmente 1h/dia',
                    'trabalho_noturno': 'Tomar ao chegar em casa',
                    'insonia_inicial': '2-3h antes do horário desejado'
                }
            },
            'Cortisol_Support': {
                'timing_otimo': 'Manhã (6:00-8:00)',
                'horario_ideal': '07:00',
                'ritmo_circadiano': {
                    'pico_natural': '08:00-09:00',
                    'nadir': '00:00-02:00'
                },
                'suplementos_aplicaveis': ['Ashwagandha', 'Rhodiola', 'Ginseng'],
                'observacoes': 'Evitar à noite para não interferir no sono'
            },
            'Vitamin D': {
                'timing_otimo': 'Manhã com refeição gordurosa',
                'horario_ideal': '08:00-10:00',
                'ritmo_circadiano': {
                    'sintese_natural': '10:00-15:00 (exposição solar)',
                    'pico_absorcao': 'Manhã'
                },
                'fatores_timing': {
                    'gordura': 'Essencial para absorção',
                    'calcio': 'Pode tomar junto',
                    'magnesio': 'Recomendado junto'
                }
            },
            'B_Vitamins': {
                'timing_otimo': 'Manhã com café da manhã',
                'horario_ideal': '07:00-09:00',
                'razao': 'Podem ser estimulantes',
                'suplementos_aplicaveis': ['B-Complex', 'B12', 'B6', 'Folate'],
                'observacoes': 'Evitar à noite para não afetar o sono'
            },
            'Magnesium': {
                'timing_otimo': 'Noite, 1-2h antes de dormir',
                'horario_ideal': '20:00-21:00',
                'efeitos': 'Relaxamento muscular e neural',
                'formas_noturnas': ['Glicinato', 'L-Treonato'],
                'formas_diurnas': ['Citrato', 'Malato']
            },
            'Iron': {
                'timing_otimo': 'Manhã com estômago vazio',
                'horario_ideal': '07:00 (1h antes café da manhã)',
                'absorcao_maxima': 'Estômago vazio + Vitamina C',
                'evitar_com': ['Café', 'Chá', 'Cálcio', 'Zinco'],
                'alternativa': 'Se irritação gástrica, tomar com pouca comida'
            },
            'Omega-3': {
                'timing_otimo': 'Com a maior refeição do dia',
                'horario_ideal': 'Almoço ou jantar',
                'razao': 'Requer gordura para absorção',
                'distribuicao': 'Pode dividir em 2-3 doses',
                'observacao': 'Tomar com refeição rica em gordura'
            },
            'Probiotics': {
                'timing_otimo': 'Manhã com estômago vazio',
                'horario_ideal': '07:00 (30min antes café da manhã)',
                'ph_gastrico': 'pH mais alto pela manhã',
                'sobrevivencia': 'Melhor sobrevivência das bactérias',
                'alternativa': 'Durante refeição se houver irritação'
            },
            'Curcumin': {
                'timing_otimo': 'Com refeições (2-3x/dia)',
                'distribuicao': 'Dividir dose total',
                'absorcao': 'Requer gordura para absorção',
                'meia_vida': 'Curta (1-3h), necessita doses frequentes'
            }
        }
    
    def carregar_interacoes_alimentares(self):
        """Carregar base de interações alimentares"""
        return {
            'Iron': {
                'potencializadores': {
                    'vitamina_c': {
                        'efeito': 'Aumenta absorção em 3-4x',
                        'mecanismo': 'Redução Fe3+ para Fe2+',
                        'dose_otima': '100mg vitamina C para 18mg ferro',
                        'fontes': ['Laranja', 'Limão', 'Acerola', 'Kiwi']
                    },
                    'acidos_organicos': {
                        'efeito': 'Aumenta absorção em 2-3x',
                        'exemplos': ['Ácido cítrico', 'Ácido málico'],
                        'fontes': ['Frutas cítricas', 'Vinagre']
                    },
                    'proteinas_animais': {
                        'efeito': 'Aumenta absorção',
                        'mecanismo': 'Fator MFP (Meat, Fish, Poultry)',
                        'exemplos': ['Carne vermelha', 'Frango', 'Peixe']
                    }
                },
                'inibidores': {
                    'taninos': {
                        'efeito': 'Reduz absorção em 50-90%',
                        'fontes': ['Chá preto', 'Chá verde', 'Café', 'Vinho tinto'],
                        'recomendacao': 'Evitar 2h antes e depois'
                    },
                    'fitatos': {
                        'efeito': 'Reduz absorção em 40-50%',
                        'fontes': ['Cereais integrais', 'Leguminosas', 'Nozes'],
                        'solucao': 'Deixar de molho ou fermentar'
                    },
                    'calcio': {
                        'efeito': 'Reduz absorção em 30-60%',
                        'mecanismo': 'Competição por transportadores',
                        'recomendacao': 'Separar por 2h'
                    },
                    'zinco': {
                        'efeito': 'Reduz absorção mútua',
                        'mecanismo': 'Competição por transportadores',
                        'recomendacao': 'Separar por 2h'
                    }
                }
            },
            'Calcium': {
                'potencializadores': {
                    'vitamina_d': {
                        'efeito': 'Essencial para absorção',
                        'mecanismo': 'Síntese proteínas transportadoras',
                        'dose_otima': '400-800 UI para 500-1000mg cálcio'
                    },
                    'vitamina_k2': {
                        'efeito': 'Direciona cálcio para ossos',
                        'mecanismo': 'Ativação osteocalcina',
                        'dose_otima': '45-180mcg K2'
                    },
                    'magnesio': {
                        'efeito': 'Cofator para metabolismo',
                        'proporcao_otima': '2:1 (Ca:Mg)',
                        'dose_exemplo': '1000mg Ca + 500mg Mg'
                    }
                },
                'inibidores': {
                    'ferro': {
                        'efeito': 'Reduz absorção de ferro',
                        'recomendacao': 'Separar por 2h'
                    },
                    'fibras': {
                        'efeito': 'Reduz absorção em 20-30%',
                        'mecanismo': 'Quelação e trânsito acelerado'
                    },
                    'oxalatos': {
                        'efeito': 'Forma complexos insolúveis',
                        'fontes': ['Espinafre', 'Beterraba', 'Chocolate']
                    }
                }
            },
            'Zinc': {
                'potencializadores': {
                    'proteinas': {
                        'efeito': 'Melhora absorção',
                        'mecanismo': 'Aminoácidos facilitam transporte',
                        'fontes': ['Carnes', 'Ovos', 'Laticínios']
                    }
                },
                'inibidores': {
                    'ferro': {
                        'efeito': 'Reduz absorção mútua',
                        'recomendacao': 'Separar por 2h'
                    },
                    'calcio': {
                        'efeito': 'Reduz absorção de zinco',
                        'recomendacao': 'Separar por 2h'
                    },
                    'fitatos': {
                        'efeito': 'Reduz absorção significativamente',
                        'fontes': ['Cereais integrais', 'Leguminosas']
                    },
                    'fibras': {
                        'efeito': 'Reduz absorção',
                        'recomendacao': 'Tomar com estômago vazio'
                    }
                }
            },
            'Curcumin': {
                'potencializadores': {
                    'piperina': {
                        'efeito': 'Aumenta absorção em 2000%',
                        'mecanismo': 'Inibição glucuronidação',
                        'dose_otima': '5-20mg piperina para 500mg curcumina'
                    },
                    'gorduras': {
                        'efeito': 'Aumenta absorção em 7-8x',
                        'mecanismo': 'Solubilização lipídica',
                        'fontes': ['Óleo coco', 'Azeite', 'Abacate']
                    },
                    'quercetina': {
                        'efeito': 'Sinergia antioxidante',
                        'mecanismo': 'Inibição enzimas metabolizadoras'
                    }
                },
                'timing_alimentar': 'Sempre com refeição rica em gordura'
            },
            'Omega-3': {
                'potencializadores': {
                    'gorduras_saturadas': {
                        'efeito': 'Melhora absorção',
                        'mecanismo': 'Estimula produção bile',
                        'fontes': ['Óleo coco', 'Manteiga']
                    },
                    'vitamina_e': {
                        'efeito': 'Proteção contra oxidação',
                        'dose_otima': '15-30mg para 1-3g ômega-3'
                    }
                },
                'inibidores': {
                    'estomago_vazio': {
                        'efeito': 'Absorção muito reduzida',
                        'recomendacao': 'Sempre com refeição'
                    }
                }
            },
            'Probiotics': {
                'potencializadores': {
                    'prebioticos': {
                        'efeito': 'Alimenta bactérias benéficas',
                        'exemplos': ['Inulina', 'FOS', 'GOS'],
                        'fontes': ['Alho', 'Cebola', 'Banana verde']
                    }
                },
                'inibidores': {
                    'antibioticos': {
                        'efeito': 'Destroi bactérias probióticas',
                        'recomendacao': 'Separar por 2-3h'
                    },
                    'alcool': {
                        'efeito': 'Prejudica sobrevivência',
                        'recomendacao': 'Evitar consumo excessivo'
                    }
                }
            }
        }
    
    def carregar_potencializadores(self):
        """Carregar base de potencializadores de absorção"""
        return {
            'universais': {
                'piperina': {
                    'aplicavel_a': ['Curcumina', 'CoQ10', 'Resveratrol', 'Vitaminas B'],
                    'mecanismo': 'Inibição CYP450 e P-glicoproteína',
                    'aumento_absorcao': '300-2000%',
                    'dose_tipica': '5-20mg'
                },
                'quercetina': {
                    'aplicavel_a': ['Resveratrol', 'Curcumina', 'Vitamina C'],
                    'mecanismo': 'Inibição enzimas metabolizadoras',
                    'aumento_absorcao': '200-400%',
                    'dose_tipica': '250-500mg'
                },
                'lecitina': {
                    'aplicavel_a': ['Vitaminas lipossolúveis', 'CoQ10', 'Curcumina'],
                    'mecanismo': 'Formação micelas',
                    'aumento_absorcao': '200-500%',
                    'dose_tipica': '1-2g'
                }
            },
            'especificos': {
                'vitamina_c_para_ferro': {
                    'aumento_absorcao': '300-400%',
                    'dose_otima': '100mg vitamina C para 18mg ferro'
                },
                'vitamina_d_para_calcio': {
                    'aumento_absorcao': '200-300%',
                    'essencial': True
                },
                'gordura_para_liposoluveis': {
                    'aplicavel_a': ['Vitamina A', 'D', 'E', 'K', 'CoQ10'],
                    'aumento_absorcao': '300-700%',
                    'quantidade_minima': '5-10g gordura'
                }
            }
        }
    
    def carregar_inibidores_absorcao(self):
        """Carregar base de inibidores de absorção"""
        return {
            'competicao_transportadores': {
                'ferro_vs_zinco': {
                    'reducao_absorcao': '40-60%',
                    'solucao': 'Separar por 2h'
                },
                'ferro_vs_calcio': {
                    'reducao_absorcao': '30-50%',
                    'solucao': 'Separar por 2h'
                },
                'calcio_vs_magnesio': {
                    'reducao_absorcao': '20-30%',
                    'solucao': 'Doses moderadas ou separar'
                }
            },
            'quelantes_naturais': {
                'fitatos': {
                    'fontes': ['Cereais integrais', 'Leguminosas', 'Nozes'],
                    'afeta': ['Ferro', 'Zinco', 'Cálcio', 'Magnésio'],
                    'reducao': '40-80%',
                    'solucoes': ['Deixar de molho', 'Fermentar', 'Germinar']
                },
                'oxalatos': {
                    'fontes': ['Espinafre', 'Beterraba', 'Chocolate', 'Chá'],
                    'afeta': ['Cálcio', 'Ferro'],
                    'reducao': '50-90%',
                    'solucao': 'Cozinhar, separar timing'
                },
                'taninos': {
                    'fontes': ['Chá', 'Café', 'Vinho tinto'],
                    'afeta': ['Ferro', 'Zinco'],
                    'reducao': '50-90%',
                    'solucao': 'Separar por 2h'
                }
            },
            'medicamentos': {
                'ibp_omeprazol': {
                    'afeta': ['Ferro', 'B12', 'Cálcio', 'Magnésio'],
                    'mecanismo': 'Redução acidez gástrica',
                    'solucao': 'Formas queladas ou separar timing'
                },
                'antiácidos': {
                    'afeta': ['Ferro', 'Zinco', 'Vitaminas B'],
                    'mecanismo': 'Neutralização ácido gástrico',
                    'solucao': 'Separar por 2-3h'
                }
            }
        }
    
    def carregar_fatores_individuais(self):
        """Carregar fatores individuais que afetam biodisponibilidade"""
        return {
            'idade': {
                'criancas_0_12': {
                    'caracteristicas': ['Menor acidez gástrica', 'Metabolismo acelerado'],
                    'ajustes': ['Formas líquidas', 'Doses menores mais frequentes']
                },
                'adolescentes_13_18': {
                    'caracteristicas': ['Crescimento rápido', 'Maior necessidade'],
                    'ajustes': ['Doses proporcionais ao peso']
                },
                'adultos_19_64': {
                    'caracteristicas': ['Absorção ótima', 'Metabolismo estável'],
                    'ajustes': ['Doses padrão']
                },
                'idosos_65_plus': {
                    'caracteristicas': ['Menor acidez gástrica', 'Metabolismo lento', 'Polifarmácia'],
                    'ajustes': ['Formas queladas', 'Doses menores', 'Monitorar interações']
                }
            },
            'condicoes_gastointestinais': {
                'hipocloridria': {
                    'afeta': ['Ferro', 'B12', 'Cálcio', 'Zinco'],
                    'solucoes': ['Formas queladas', 'Betaína HCl', 'Vitamina C']
                },
                'doenca_celiaca': {
                    'afeta': ['Todas vitaminas e minerais'],
                    'solucoes': ['Formas sem glúten', 'Doses maiores', 'Monitoramento']
                },
                'crohn_colite': {
                    'afeta': ['Vitaminas lipossolúveis', 'B12', 'Ferro', 'Zinco'],
                    'solucoes': ['Formas líquidas', 'Doses maiores', 'Via parenteral se necessário']
                },
                'sindrome_intestino_irritavel': {
                    'afeta': ['Tolerabilidade geral'],
                    'solucoes': ['Formas gentis', 'Doses menores', 'Probióticos']
                }
            },
            'estilo_vida': {
                'vegetarianos_veganos': {
                    'deficiencias_comuns': ['B12', 'Ferro', 'Zinco', 'Ômega-3', 'Vitamina D'],
                    'ajustes': ['Formas vegetais', 'Doses maiores', 'Monitoramento regular']
                },
                'atletas': {
                    'necessidades_aumentadas': ['Ferro', 'Magnésio', 'Zinco', 'Vitaminas B'],
                    'ajustes': ['Doses maiores', 'Timing pré/pós treino']
                },
                'fumantes': {
                    'necessidades_aumentadas': ['Vitamina C', 'Vitamina E', 'Antioxidantes'],
                    'metabolismo_alterado': ['Vitaminas B'],
                    'ajustes': ['Doses maiores antioxidantes']
                }
            }
        }
    
    def analisar_biodisponibilidade_suplemento(self, suplemento, condicao_saude=None, perfil_usuario=None):
        """Análise completa de biodisponibilidade para um suplemento"""
        analise = {
            'suplemento': suplemento,
            'condicao_saude': condicao_saude,
            'timestamp': datetime.now().isoformat(),
            'analise_formas_farmaceuticas': {},
            'timing_otimizado': {},
            'interacoes_alimentares': {},
            'potencializadores_recomendados': [],
            'inibidores_evitar': [],
            'recomendacoes_personalizadas': {},
            'score_biodisponibilidade': 0
        }
        
        # Análise de formas farmacêuticas
        if suplemento in self.formas_farmaceuticas:
            analise['analise_formas_farmaceuticas'] = self.analisar_formas_farmaceuticas(suplemento)
        
        # Análise de timing circadiano
        if suplemento in self.timing_circadiano:
            analise['timing_otimizado'] = self.analisar_timing_circadiano(suplemento)
        
        # Análise de interações alimentares
        if suplemento in self.interacoes_alimentares:
            analise['interacoes_alimentares'] = self.analisar_interacoes_alimentares(suplemento)
        
        # Potencializadores
        analise['potencializadores_recomendados'] = self.identificar_potencializadores(suplemento)
        
        # Inibidores
        analise['inibidores_evitar'] = self.identificar_inibidores(suplemento)
        
        # Recomendações personalizadas
        if perfil_usuario:
            analise['recomendacoes_personalizadas'] = self.gerar_recomendacoes_personalizadas(
                suplemento, perfil_usuario
            )
        
        # Score de biodisponibilidade
        analise['score_biodisponibilidade'] = self.calcular_score_biodisponibilidade(analise)
        
        return analise
    
    def analisar_formas_farmaceuticas(self, suplemento):
        """Analisar formas farmacêuticas disponíveis"""
        dados = self.formas_farmaceuticas[suplemento]
        
        # Ordenar por biodisponibilidade
        formas_ordenadas = sorted(
            dados['formas_disponiveis'].items(),
            key=lambda x: x[1]['biodisponibilidade'],
            reverse=True
        )
        
        analise = {
            'formas_disponiveis': dados['formas_disponiveis'],
            'ranking_biodisponibilidade': formas_ordenadas,
            'forma_otima': dados['recomendacao_otima'],
            'melhor_custo_beneficio': dados['custo_beneficio'],
            'diferenca_maxima': f"{formas_ordenadas[0][1]['biodisponibilidade']:.1f}x vs forma padrão"
        }
        
        return analise
    
    def analisar_timing_circadiano(self, suplemento):
        """Analisar timing circadiano otimizado"""
        dados = self.timing_circadiano[suplemento]
        
        return {
            'timing_otimo': dados['timing_otimo'],
            'horario_ideal': dados.get('horario_ideal', 'Conforme timing ótimo'),
            'fatores_considerados': dados.get('fatores_timing', {}),
            'ajustes_especiais': dados.get('ajustes_especiais', {}),
            'justificativa': dados.get('razao', 'Otimização baseada em ritmo circadiano')
        }
    
    def analisar_interacoes_alimentares(self, suplemento):
        """Analisar interações alimentares"""
        dados = self.interacoes_alimentares[suplemento]
        
        return {
            'potencializadores_alimentares': dados.get('potencializadores', {}),
            'inibidores_alimentares': dados.get('inibidores', {}),
            'recomendacao_timing': dados.get('timing_alimentar', 'Conforme orientação específica')
        }
    
    def identificar_potencializadores(self, suplemento):
        """Identificar potencializadores de absorção"""
        potencializadores = []
        
        # Potencializadores universais
        for nome, dados in self.potencializadores['universais'].items():
            if suplemento in dados['aplicavel_a']:
                potencializadores.append({
                    'nome': nome,
                    'aumento_absorcao': dados['aumento_absorcao'],
                    'dose_recomendada': dados['dose_tipica'],
                    'mecanismo': dados['mecanismo']
                })
        
        # Potencializadores específicos
        for combo, dados in self.potencializadores['especificos'].items():
            if suplemento.lower() in combo.lower():
                potencializadores.append({
                    'nome': combo,
                    'aumento_absorcao': dados['aumento_absorcao'],
                    'essencial': dados.get('essencial', False)
                })
        
        return potencializadores
    
    def identificar_inibidores(self, suplemento):
        """Identificar inibidores de absorção"""
        inibidores = []
        
        # Competição por transportadores
        for interacao, dados in self.inibidores_absorcao['competicao_transportadores'].items():
            if suplemento.lower() in interacao.lower():
                inibidores.append({
                    'tipo': 'Competição transportadores',
                    'interacao': interacao,
                    'reducao_absorcao': dados['reducao_absorcao'],
                    'solucao': dados['solucao']
                })
        
        # Quelantes naturais
        for quelante, dados in self.inibidores_absorcao['quelantes_naturais'].items():
            if suplemento in dados['afeta']:
                inibidores.append({
                    'tipo': 'Quelante natural',
                    'nome': quelante,
                    'fontes': dados['fontes'],
                    'reducao_absorcao': dados['reducao'],
                    'solucoes': dados.get('solucoes', dados.get('solucao', []))
                })
        
        return inibidores
    
    def gerar_recomendacoes_personalizadas(self, suplemento, perfil_usuario):
        """Gerar recomendações personalizadas baseadas no perfil do usuário"""
        recomendacoes = {
            'forma_recomendada': 'Padrão',
            'timing_personalizado': 'Conforme bula',
            'ajustes_dose': 'Dose padrão',
            'precaucoes_especiais': [],
            'monitoramento_sugerido': []
        }
        
        idade = perfil_usuario.get('idade', 30)
        condicoes = perfil_usuario.get('condicoes_gastro', [])
        estilo_vida = perfil_usuario.get('estilo_vida', [])
        
        # Ajustes por idade
        if idade < 18:
            recomendacoes['ajustes_dose'] = 'Dose pediátrica (consultar pediatra)'
            recomendacoes['forma_recomendada'] = 'Líquida ou mastigável'
        elif idade >= 65:
            recomendacoes['forma_recomendada'] = 'Quelada ou lipossomal'
            recomendacoes['ajustes_dose'] = 'Iniciar com dose menor'
            recomendacoes['precaucoes_especiais'].append('Verificar interações medicamentosas')
        
        # Ajustes por condições gastro
        if 'hipocloridria' in condicoes:
            recomendacoes['forma_recomendada'] = 'Quelada'
            recomendacoes['precaucoes_especiais'].append('Considerar betaína HCl')
        
        if 'doenca_celiaca' in condicoes:
            recomendacoes['precaucoes_especiais'].append('Verificar certificação sem glúten')
            recomendacoes['ajustes_dose'] = 'Dose aumentada (má absorção)'
        
        # Ajustes por estilo de vida
        if 'vegetariano' in estilo_vida:
            recomendacoes['monitoramento_sugerido'].append('Monitorar níveis séricos regularmente')
        
        if 'atleta' in estilo_vida:
            recomendacoes['ajustes_dose'] = 'Dose aumentada conforme necessidade'
            recomendacoes['timing_personalizado'] = 'Considerar timing pré/pós treino'
        
        return recomendacoes
    
    def calcular_score_biodisponibilidade(self, analise):
        """Calcular score de biodisponibilidade (0-100)"""
        score = 50  # Base
        
        # Forma farmacêutica (+30 pontos máximo)
        if analise['analise_formas_farmaceuticas']:
            formas = analise['analise_formas_farmaceuticas']['formas_disponiveis']
            if formas:
                max_bio = max(forma['biodisponibilidade'] for forma in formas.values())
                if max_bio > 1.0:
                    score += min(30, (max_bio - 1.0) * 10)
        
        # Timing otimizado (+15 pontos)
        if analise['timing_otimizado']:
            score += 15
        
        # Potencializadores (+20 pontos máximo)
        num_potencializadores = len(analise['potencializadores_recomendados'])
        score += min(20, num_potencializadores * 5)
        
        # Penalizar inibidores (-15 pontos máximo)
        num_inibidores = len(analise['inibidores_evitar'])
        score -= min(15, num_inibidores * 3)
        
        # Personalização (+10 pontos)
        if analise['recomendacoes_personalizadas']:
            score += 10
        
        return max(0, min(100, round(score)))
    
    def executar_analise_biodisponibilidade_completa(self, lista_suplementos):
        """Executar análise completa de biodisponibilidade"""
        print("=== INICIANDO ANÁLISE DE BIODISPONIBILIDADE AVANÇADA ===")
        print(f"Analisando {len(lista_suplementos)} suplementos")
        
        resultados = {}
        
        for i, suplemento in enumerate(lista_suplementos, 1):
            print(f"Analisando {i}/{len(lista_suplementos)}: {suplemento}")
            
            # Perfil de usuário exemplo
            perfil_exemplo = {
                'idade': 35,
                'condicoes_gastro': [],
                'estilo_vida': ['ativo']
            }
            
            # Executar análise
            analise = self.analisar_biodisponibilidade_suplemento(
                suplemento, perfil_usuario=perfil_exemplo
            )
            
            resultados[suplemento] = analise
            
            # Salvar análise individual
            arquivo_analise = self.biodisponibilidade_dir / f"{suplemento.replace(' ', '_')}_biodisponibilidade.json"
            with open(arquivo_analise, 'w', encoding='utf-8') as f:
                json.dump(analise, f, ensure_ascii=False, indent=2)
        
        # Salvar resultados consolidados
        with open(self.biodisponibilidade_dir / 'analise_biodisponibilidade_completa.json', 'w', encoding='utf-8') as f:
            json.dump(resultados, f, ensure_ascii=False, indent=2)
        
        # Gerar relatório de estatísticas
        self.gerar_relatorio_biodisponibilidade(resultados)
        
        print("=== ANÁLISE DE BIODISPONIBILIDADE COMPLETA FINALIZADA ===")
        return resultados
    
    def gerar_relatorio_biodisponibilidade(self, resultados):
        """Gerar relatório de estatísticas de biodisponibilidade"""
        stats = {
            'total_suplementos': len(resultados),
            'score_medio': 0,
            'distribuicao_scores': {'0-20': 0, '21-40': 0, '41-60': 0, '61-80': 0, '81-100': 0},
            'suplementos_alta_biodisponibilidade': [],
            'formas_mais_eficazes': {},
            'potencializadores_mais_comuns': {},
            'inibidores_mais_frequentes': {}
        }
        
        scores = []
        potencializadores_count = {}
        inibidores_count = {}
        
        for suplemento, analise in resultados.items():
            score = analise['score_biodisponibilidade']
            scores.append(score)
            
            # Distribuição de scores
            if score <= 20:
                stats['distribuicao_scores']['0-20'] += 1
            elif score <= 40:
                stats['distribuicao_scores']['21-40'] += 1
            elif score <= 60:
                stats['distribuicao_scores']['41-60'] += 1
            elif score <= 80:
                stats['distribuicao_scores']['61-80'] += 1
            else:
                stats['distribuicao_scores']['81-100'] += 1
            
            # Suplementos com alta biodisponibilidade
            if score >= 70:
                stats['suplementos_alta_biodisponibilidade'].append({
                    'suplemento': suplemento,
                    'score': score
                })
            
            # Contar potencializadores
            for pot in analise['potencializadores_recomendados']:
                nome = pot['nome']
                potencializadores_count[nome] = potencializadores_count.get(nome, 0) + 1
            
            # Contar inibidores
            for inh in analise['inibidores_evitar']:
                nome = inh.get('nome', inh.get('interacao', 'Desconhecido'))
                inibidores_count[nome] = inibidores_count.get(nome, 0) + 1
        
        # Calcular estatísticas
        stats['score_medio'] = round(sum(scores) / len(scores), 1)
        
        # Top potencializadores
        stats['potencializadores_mais_comuns'] = dict(
            sorted(potencializadores_count.items(), key=lambda x: x[1], reverse=True)[:5]
        )
        
        # Top inibidores
        stats['inibidores_mais_frequentes'] = dict(
            sorted(inibidores_count.items(), key=lambda x: x[1], reverse=True)[:5]
        )
        
        # Salvar estatísticas
        with open(self.biodisponibilidade_dir / 'estatisticas_biodisponibilidade.json', 'w', encoding='utf-8') as f:
            json.dump(stats, f, ensure_ascii=False, indent=2)
        
        # Imprimir resumo
        print(f"\n=== ESTATÍSTICAS DE BIODISPONIBILIDADE ===")
        print(f"Score médio: {stats['score_medio']}/100")
        print(f"Suplementos com alta biodisponibilidade: {len(stats['suplementos_alta_biodisponibilidade'])}")
        print(f"Potencializador mais comum: {list(stats['potencializadores_mais_comuns'].keys())[0] if stats['potencializadores_mais_comuns'] else 'N/A'}")
        
        return stats

if __name__ == "__main__":
    # Lista de suplementos para análise
    suplementos_prioritarios = [
        'Curcumin', 'Omega-3', 'Vitamin D', 'Magnesium', 'Zinc', 'Iron',
        'CoQ10', 'Probiotics', 'Melatonin', 'Vitamin B12', 'Calcium',
        'Vitamin C', 'Vitamin E', 'Ashwagandha', 'Rhodiola rosea'
    ]
    
    # Executar análise
    analisador = AnalisadorBiodisponibilidade()
    resultados = analisador.executar_analise_biodisponibilidade_completa(suplementos_prioritarios)
    
    print("Análise de biodisponibilidade avançada concluída!")
