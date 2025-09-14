import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const AnimatedWord = ({ children, delay = 0 }: { children: string; delay?: number }) => {
    return (
      <span 
        className={`inline-block animate-fade-in-delay-${delay + 1}`}
        style={{ animationDelay: `${delay * 0.2}s` }}
      >
        {children}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Minimalist Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              LoL Engine
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/showcase" className="link-underline font-medium">
                Showcase
              </Link>
              <Link to="/login" className="link-underline font-medium">
                Entrar
              </Link>
              <Link to="/register" className="btn-minimalist">
                Começar
              </Link>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link to="/showcase" className="font-medium">Showcase</Link>
                <Link to="/login" className="font-medium">Entrar</Link>
                <Link to="/register" className="font-medium">Começar</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-4">
            {/* Main Animated Typography */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight">
              <div className="mb-4">
                <AnimatedWord delay={0}>Suplementos</AnimatedWord>
              </div>
              <div className="mb-4">
                <AnimatedWord delay={1}>Inteligentes</AnimatedWord>
              </div>
              <div className="mb-4">
                <AnimatedWord delay={2}>Personalizados</AnimatedWord>
              </div>
              <div>
                <AnimatedWord delay={3}>Powered</AnimatedWord>{" "}
                <AnimatedWord delay={4}>by</AnimatedWord>{" "}
                <span className="animate-fade-in-delay-4 inline-block">
                  <span className="letter-float inline-block">I</span>
                  <span className="letter-float inline-block">A</span>
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-4 opacity-0 mt-12">
              A primeira plataforma brasileira que usa inteligência artificial para recomendar 
              suplementos personalizados baseados no seu perfil, objetivos e histórico de saúde.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16 animate-fade-in-delay-4 opacity-0">
              <Link to="/onboarding" className="btn-minimalist">
                Começar Análise Gratuita
              </Link>
              <Link to="/showcase" className="link-underline font-medium">
                Ver Como Funciona
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="rotate-90" size={24} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 tracking-tight">
            Por que Escolher o LoL Engine?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold">Análise Avançada com IA</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Algoritmos de machine learning analisam seu perfil para entregar recomendações precisas 
                baseadas em milhares de dados científicos.
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold">Objetivos Personalizados</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Defina suas metas e receba suplementos alinhados com seus objetivos específicos 
                e necessidades do seu estilo de vida.
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold">Evidência Científica</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Todas as recomendações são baseadas em pesquisas revisadas por pares e padrões 
                de segurança comprovados para resultados ideais.
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold">Acompanhamento Contínuo</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Monitore seu progresso e ajuste automaticamente as recomendações conforme seu corpo 
                e objetivos evoluem ao longo do tempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 tracking-tight">
            Como Funciona
          </h2>
          
          <div className="space-y-20">
            <div className="text-center">
              <div className="text-8xl md:text-9xl font-bold text-gray-200 mb-4">01</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Análise do Perfil</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete nosso questionário detalhado sobre seus objetivos, histórico de saúde e estilo de vida.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-8xl md:text-9xl font-bold text-gray-200 mb-4">02</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Processamento IA</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nossa IA analisa milhares de dados científicos para encontrar os suplementos ideais para você.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-8xl md:text-9xl font-bold text-gray-200 mb-4">03</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Recomendações Personalizadas</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Receba sua lista personalizada com dosagens, horários e explicações científicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">50K+</div>
              <p className="text-gray-600">Usuários Ativos</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">1M+</div>
              <p className="text-gray-600">Recomendações Geradas</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">98%</div>
              <p className="text-gray-600">Taxa de Satisfação</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2">24/7</div>
              <p className="text-gray-600">Suporte Disponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Pronto para Transformar sua Suplementação?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Junte-se a milhares que descobriram o poder da suplementação inteligente com IA.
          </p>
          <Link to="/onboarding" className="btn-minimalist">
            Começar Agora - É Grátis
          </Link>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-2xl font-bold tracking-tight mb-4 md:mb-0">
            LoL Engine
          </div>
          <p className="text-gray-600 text-center md:text-right">
            © 2024 LoL Engine. Todos os direitos reservados.<br />
            Suplementação inteligente powered by IA.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;