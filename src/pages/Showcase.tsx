import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle, Brain, Target, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockUserData = {
  name: "Maria Silva",
  age: 32,
  gender: "female",
  weight: 65,
  height: 165,
  symptoms: ["Fadiga", "Estresse excessivo", "Dificuldade de concentração", "Insônia"],
  goals: ["Melhoria da energia", "Redução do estresse", "Melhoria do sono", "Melhoria da concentração"]
};

const mockRecommendations = [
  {
    name: "Vitamina D3",
    category: "Vitamina",
    confidence: 92,
    dosage: "2000 UI",
    timing: "manhã",
    priority: "high",
    reasoning: "Níveis baixos de vitamina D podem causar fadiga e baixa energia",
    evidence: "strong"
  },
  {
    name: "Magnésio Quelato",
    category: "Mineral", 
    confidence: 88,
    dosage: "400mg",
    timing: "noite",
    priority: "high",
    reasoning: "Essencial para relaxamento muscular e qualidade do sono",
    evidence: "strong"
  },
  {
    name: "Ômega-3 EPA/DHA",
    category: "Ácido graxo",
    confidence: 85,
    dosage: "1000mg",
    timing: "com refeição",
    priority: "medium",
    reasoning: "Suporte para função cerebral e redução da inflamação",
    evidence: "strong"
  },
  {
    name: "Complexo B",
    category: "Vitamina",
    confidence: 78,
    dosage: "50mg",
    timing: "manhã",
    priority: "medium",
    reasoning: "Suporte ao metabolismo energético e função neurológica",
    evidence: "moderate"
  }
];

const mockProgressData = [
  { week: 1, energia: 3, sono: 2, estresse: 4, concentracao: 3 },
  { week: 2, energia: 4, sono: 3, estresse: 3, concentracao: 4 },
  { week: 3, energia: 6, sono: 5, estresse: 3, concentracao: 5 },
  { week: 4, energia: 7, sono: 6, estresse: 2, concentracao: 6 },
];

export default function Showcase() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const steps = [
    "Dados Pessoais",
    "Análise IA",
    "Recomendações",
    "Acompanhamento"
  ];

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentStep(2);
    }, 3000);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
            Veja Como Funciona
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Descubra como nossa IA analisa seus dados e cria recomendações personalizadas de suplementos baseadas em evidência científica
          </p>
          
          {/* Credibility Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Brain className="w-4 h-4 mr-2" />
              IA Baseada em Evidência
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Target className="w-4 h-4 mr-2" />
              1000+ Suplementos Analisados
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              Dados Clínicos Validados
            </Badge>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-center items-center space-x-4 mb-8">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`ml-2 font-medium ${
                    index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step}
                  </span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-5 h-5 mx-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
            <Progress value={(currentStep / (steps.length - 1)) * 100} className="w-full max-w-md mx-auto" />
          </div>

          {/* Step Content */}
          <div className="min-h-[600px]">
            {/* Step 1: Onboarding */}
            {currentStep === 0 && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Conte-nos sobre você</CardTitle>
                  <p className="text-muted-foreground text-center">
                    Vamos conhecer seu perfil para personalizar suas recomendações
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome</label>
                      <div className="p-3 bg-muted rounded-md">{mockUserData.name}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Idade</label>
                      <div className="p-3 bg-muted rounded-md">{mockUserData.age} anos</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Peso</label>
                      <div className="p-3 bg-muted rounded-md">{mockUserData.weight} kg</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Altura</label>
                      <div className="p-3 bg-muted rounded-md">{mockUserData.height} cm</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Principais sintomas</label>
                    <div className="flex flex-wrap gap-2">
                      {mockUserData.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="secondary">{symptom}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Objetivos de saúde</label>
                    <div className="flex flex-wrap gap-2">
                      {mockUserData.goals.map((goal) => (
                        <Badge key={goal} variant="outline">{goal}</Badge>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleNextStep} className="w-full">
                    Próximo: Iniciar Análise
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Analysis */}
            {currentStep === 1 && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Análise Inteligente</CardTitle>
                  <p className="text-muted-foreground text-center">
                    Nossa IA está processando seus dados e analisando mais de 1000 suplementos
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!isAnalyzing ? (
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <Brain className="w-12 h-12 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Pronto para análise personalizada</h3>
                        <p className="text-muted-foreground">
                          Vamos processar seus dados com nossa inteligência artificial treinada em evidências científicas
                        </p>
                      </div>
                      <Button onClick={handleStartAnalysis} size="lg" className="w-full">
                        Iniciar Análise IA
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                        <Brain className="w-12 h-12 text-primary animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Analisando seus dados...</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>✓ Processando perfil individual</p>
                          <p>✓ Correlacionando sintomas com deficiências</p>
                          <p>✓ Avaliando interações e contraindicações</p>
                          <p className="animate-pulse">⏳ Calculando dosagens personalizadas...</p>
                        </div>
                      </div>
                      <Progress value={75} className="w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Results */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Suas Recomendações Personalizadas</h2>
                  <p className="text-muted-foreground">
                    Baseadas em seus sintomas, objetivos e evidência científica
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {mockRecommendations.map((rec, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{rec.name}</CardTitle>
                            <Badge variant="outline" className="mt-1">{rec.category}</Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{rec.confidence}%</div>
                            <div className="text-xs text-muted-foreground">Confiança</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Dosagem:</span>
                            <span>{rec.dosage}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Melhor horário:</span>
                            <span className="capitalize">{rec.timing}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Prioridade:</span>
                            <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'}>
                              {rec.priority === 'high' ? 'Alta' : 'Média'}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Evidência:</span>
                            <Badge variant={rec.evidence === 'strong' ? 'default' : 'outline'}>
                              {rec.evidence === 'strong' ? 'Forte' : 'Moderada'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-3">
                            {rec.reasoning}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center space-x-4 mt-8">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Voltar
                  </Button>
                  <Button onClick={handleNextStep}>
                    Ver Acompanhamento
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Progress Tracking */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Acompanhamento de Progresso</h2>
                  <p className="text-muted-foreground">
                    Veja como Maria evoluiu ao longo de 4 semanas
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                        Evolução dos Sintomas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { label: "Energia", start: 3, end: 7, color: "bg-blue-500" },
                          { label: "Qualidade do Sono", start: 2, end: 6, color: "bg-purple-500" },
                          { label: "Concentração", start: 3, end: 6, color: "bg-green-500" },
                          { label: "Estresse", start: 4, end: 2, color: "bg-red-500", inverse: true }
                        ].map((metric) => (
                          <div key={metric.label} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{metric.label}</span>
                              <span className="font-medium">
                                {metric.start}/10 → {metric.end}/10
                                <span className={`ml-2 ${metric.inverse ? 'text-green-500' : 'text-green-500'}`}>
                                  {metric.inverse ? '↓' : '↑'}
                                </span>
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div 
                                  className={`${metric.color} h-2 rounded-full transition-all duration-1000`}
                                  style={{ width: `${(metric.start / 10) * 100}%` }}
                                />
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div 
                                  className={`${metric.color} h-2 rounded-full transition-all duration-1000`}
                                  style={{ width: `${(metric.end / 10) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Aderência ao Protocolo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-500 mb-2">87%</div>
                          <p className="text-sm text-muted-foreground">Aderência média mensal</p>
                        </div>
                        
                        <div className="space-y-3">
                          {mockRecommendations.slice(0, 3).map((rec, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm">{rec.name}</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={[92, 85, 83][index]} className="w-20" />
                                <span className="text-sm font-medium">{[92, 85, 83][index]}%</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex justify-between text-sm">
                            <span>Check-ins realizados:</span>
                            <span className="font-medium">28/30 dias</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Próximo check-in:</span>
                            <span className="font-medium">Hoje</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center space-x-4 mt-8">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Voltar
                  </Button>
                  <Button onClick={() => navigate('/register')} size="lg" className="px-8">
                    Começar Minha Análise Gratuita
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para descobrir seus suplementos ideais?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já descobriram seus suplementos personalizados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => navigate('/register')} size="lg" className="px-8 py-6 text-lg">
              Começar Análise Gratuita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground">
              ⏱️ Leva apenas 3 minutos • 🔒 100% seguro e privado
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}