import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Brain, 
  Target, 
  Shield, 
  Star, 
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Avançada",
      description: "Algoritmos de machine learning analisam seu perfil para recomendações precisas"
    },
    {
      icon: Target,
      title: "Objetivos Personalizados",
      description: "Defina suas metas e receba suplementos alinhados com seus objetivos específicos"
    },
    {
      icon: Shield,
      title: "Segurança Garantida",
      description: "Todas as recomendações são baseadas em evidências científicas e segurança comprovada"
    },
    {
      icon: TrendingUp,
      title: "Acompanhamento Contínuo",
      description: "Monitore seu progresso e ajuste automaticamente suas recomendações"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Atleta Profissional",
      content: "Revolucionou minha suplementação. Agora sei exatamente o que tomar e quando.",
      rating: 5
    },
    {
      name: "Ana Santos",
      role: "Personal Trainer",
      content: "Uso com todos os meus clientes. A precisão das recomendações é impressionante.",
      rating: 5
    },
    {
      name: "Pedro Costa",
      role: "Fitness Enthusiast",
      content: "Economizei tempo e dinheiro com recomendações que realmente funcionam.",
      rating: 5
    }
  ];

  const stats = [
    { value: "50K+", label: "Usuários Ativos" },
    { value: "1M+", label: "Recomendações Geradas" },
    { value: "98%", label: "Taxa de Satisfação" },
    { value: "24/7", label: "Suporte Disponível" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-glow">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              LoL Engine
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Começar Agora</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🚀 Powered by Inteligência Artificial
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                Suplementos Inteligentes
              </span>
              <br />
              <span className="text-foreground">para Seus Objetivos</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A primeira plataforma brasileira que usa IA para recomendar suplementos 
              personalizados baseados no seu perfil, objetivos e histórico de saúde.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="primary" size="xl" asChild>
                <Link to="/register">
                  Começar Análise Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl">
                Ver Como Funciona
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher o <span className="text-primary">LoL Engine</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tecnologia de ponta encontra expertise em nutrição para entregar 
              as melhores recomendações para você
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como Funciona em <span className="text-primary">3 Passos</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Análise do Perfil",
                  description: "Complete nosso questionário detalhado sobre seus objetivos, histórico de saúde e estilo de vida."
                },
                {
                  step: "02", 
                  title: "Processamento IA",
                  description: "Nossa IA analisa milhares de dados científicos para encontrar os suplementos ideais para você."
                },
                {
                  step: "03",
                  title: "Recomendações Personalizadas",
                  description: "Receba sua lista personalizada com dosagens, horários e explicações científicas."
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-white font-bold text-xl mb-6">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos <span className="text-primary">usuários dizem</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <Card className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-12 pb-12">
              <Award className="h-16 w-16 mx-auto text-primary mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para Transformar sua <span className="text-primary">Suplementação</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de pessoas que já descobriram o poder da 
                suplementação inteligente com IA
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="xl" asChild>
                  <Link to="/register">
                    Começar Agora - É Grátis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl">
                  Falar com Especialista
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-glow">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                LoL Engine
              </span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 LoL Engine. Todos os direitos reservados.<br />
              Suplementação inteligente powered by IA.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
