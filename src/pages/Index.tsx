import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// Import wellness images
import wellness1 from "@/assets/supplements-wellness-1.jpg";
import wellness2 from "@/assets/supplements-wellness-2.jpg";
import wellness3 from "@/assets/supplements-wellness-3.jpg";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const lolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Trigger explosion effect when scrolling past hero section
      if (lolRef.current && window.scrollY > window.innerHeight * 0.3) {
        lolRef.current.classList.add('lol-explode');
      } else if (lolRef.current) {
        lolRef.current.classList.remove('lol-explode');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image gallery component
  const WellnessGallery = () => {
    const [imagesVisible, setImagesVisible] = useState(false);
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImagesVisible(true);
          }
        },
        { threshold: 0.3 }
      );

      if (galleryRef.current) {
        observer.observe(galleryRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <section ref={galleryRef} className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 tracking-tight text-white">
            Bem-Estar & Suplementação
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: wellness1, title: "Suplementos Premium" },
              { img: wellness2, title: "Estilo de Vida Saudável" },
              { img: wellness3, title: "Bem-Estar Completo" }
            ].map((item, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg aspect-square ${
                  imagesVisible ? 'image-slide-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Minimalist Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white">
              LoL Engine
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/showcase" className="link-underline font-medium text-white">
                Showcase
              </Link>
              <Link to="/login" className="link-underline font-medium text-white">
                Entrar
              </Link>
              <Link to="/register" className="btn-minimalist">
                Começar
              </Link>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-gray-800">
              <div className="flex flex-col space-y-4">
                <Link to="/showcase" className="font-medium text-white">Showcase</Link>
                <Link to="/login" className="font-medium text-white">Entrar</Link>
                <Link to="/register" className="font-medium text-white">Começar</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with LoL Animation */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* LoL with Scramble Animation */}
          <div ref={lolRef} className="mb-16">
            <span className="lol-letter">L</span>
            <span className="lol-letter">o</span>
            <span className="lol-letter">L</span>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-300">
            A primeira plataforma brasileira que usa inteligência artificial para recomendar 
            suplementos personalizados baseados no seu perfil, objetivos e histórico de saúde.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-16">
            <Link to="/onboarding" className="btn-minimalist">
              Começar Análise Gratuita
            </Link>
            <Link to="/showcase" className="link-underline font-medium text-white">
              Ver Como Funciona
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce text-white">
          <ArrowRight className="rotate-90" size={24} />
        </div>
      </section>

      {/* Wellness Gallery */}
      <WellnessGallery />

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 tracking-tight text-white">
            Por que Escolher o LoL Engine?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Análise Avançada com IA</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                Algoritmos de machine learning analisam seu perfil para entregar recomendações precisas 
                baseadas em milhares de dados científicos.
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Objetivos Personalizados</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                Defina suas metas e receba suplementos alinhados com seus objetivos específicos 
                e necessidades do seu estilo de vida.
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Evidência Científica</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                Todas as recomendações são baseadas em pesquisas revisadas por pares e padrões 
                de segurança comprovados para resultados ideais.
              </p>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Acompanhamento Contínuo</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                Monitore seu progresso e ajuste automaticamente as recomendações conforme seu corpo 
                e objetivos evoluem ao longo do tempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 tracking-tight text-white">
            Como Funciona
          </h2>
          
          <div className="space-y-20">
            <div className="text-center">
              <div className="text-8xl md:text-9xl font-bold text-gray-800 mb-4">01</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Análise do Perfil</h3>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Complete nosso questionário detalhado sobre seus objetivos, histórico de saúde e estilo de vida.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-8xl md:text-9xl font-bold text-gray-800 mb-4">02</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Processamento IA</h3>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Nossa IA analisa milhares de dados científicos para encontrar os suplementos ideais para você.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-8xl md:text-9xl font-bold text-gray-800 mb-4">03</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Recomendações Personalizadas</h3>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
              <div className="text-4xl md:text-6xl font-bold mb-2 text-white">50K+</div>
              <p className="text-gray-400">Usuários Ativos</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2 text-white">1M+</div>
              <p className="text-gray-400">Recomendações Geradas</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2 text-white">98%</div>
              <p className="text-gray-400">Taxa de Satisfação</p>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-2 text-white">24/7</div>
              <p className="text-gray-400">Suporte Disponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white">
            Pronto para Transformar sua Suplementação?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Junte-se a milhares que descobriram o poder da suplementação inteligente com IA.
          </p>
          <Link to="/onboarding" className="btn-minimalist">
            Começar Agora - É Grátis
          </Link>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-2xl font-bold tracking-tight mb-4 md:mb-0 text-white">
            LoL Engine
          </div>
          <p className="text-gray-400 text-center md:text-right">
            © 2024 LoL Engine. Todos os direitos reservados.<br />
            Suplementação inteligente powered by IA.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;