import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import ScrambleText from '@/components/ui/scramble-text';
import supplementsWellness1 from '@/assets/supplements-wellness-1.jpg';
import supplementsWellness2 from '@/assets/supplements-wellness-2.jpg';
import supplementsWellness3 from '@/assets/supplements-wellness-3.jpg';
const Index = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const lolRef = useRef<HTMLHeadingElement>(null);
  const lifeOnLabsRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Scroll down logic
      if (currentScrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
        if (lifeOnLabsRef.current) {
          lifeOnLabsRef.current.classList.add('life-on-labs-exit');
        }
      }
      // Scroll up logic - reset when near top
      else if (currentScrollY <= 50 && hasScrolled) {
        setHasScrolled(false);
        if (lifeOnLabsRef.current) {
          lifeOnLabsRef.current.classList.remove('life-on-labs-exit');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  // Image gallery component - Fixed caching issue
  const WellnessGallery = () => {
    const [imagesVisible, setImagesVisible] = useState(false);
    const galleryRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setImagesVisible(true);
        }
      }, {
        threshold: 0.3
      });
      if (galleryRef.current) {
        observer.observe(galleryRef.current);
      }
      return () => observer.disconnect();
    }, []);
    return <section ref={galleryRef} className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-20 tracking-tight text-white">
            Bem-Estar & Suplementação
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
            img: supplementsWellness1,
            title: "Suplementos Premium"
          }, {
            img: supplementsWellness2,
            title: "Estilo de Vida Saudável"
          }, {
            img: supplementsWellness3,
            title: "Bem-Estar Completo"
          }].map((item, index) => <div key={index} className={`relative overflow-hidden rounded-lg aspect-square ${imagesVisible ? 'image-slide-in' : 'opacity-0'}`} style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </div>)}
          </div>
        </div>
      </section>;
  };
  return <div className="min-h-screen bg-background text-card-foreground overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <nav className="flex items-center justify-between">
            <button onClick={() => navigate('/')} className="text-2xl font-bold tracking-tight text-white">
              LoL Engine
            </button>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => navigate('/showcase')} className="link-underline font-medium text-white">
                Showcase
              </button>
              <button onClick={() => navigate('/login')} className="link-underline font-medium text-white">
                Entrar
              </button>
              <Button onClick={() => navigate('/register')} variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Começar
              </Button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && <div className="md:hidden mt-6 pt-6 border-t border-white/20">
              <div className="flex flex-col space-y-4">
                <button onClick={() => navigate('/showcase')} className="font-medium text-white text-left">Showcase</button>
                <button onClick={() => navigate('/login')} className="font-medium text-white text-left">Entrar</button>
                <button onClick={() => navigate('/register')} className="font-medium text-white text-left">Começar</button>
              </div>
            </div>}
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
        <div className="text-center space-y-6 px-2 sm:px-4 mt-8 sm:mt-20">
          <div className="text-center">
            <h1 ref={lolRef} className="lol-static mb-2">
              <ScrambleText text="lol" isActive={hasScrolled} />
            </h1>
            
            <p ref={lifeOnLabsRef} className="life-on-labs mb-6 mx-0 px-0 text-center">
              Life on Labs
            </p>
            
            <p className="text-lg text-gray-300 mt-12 opacity-80">
              Recomendações Inteligentes de Suplementos
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 mb-40">
            <Button onClick={() => navigate('/register')} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold shadow-lg">
              Começar Análise Gratuita
            </Button>
            <Button onClick={() => navigate('/showcase')} variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg">
              Ver Demonstração
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-50" />
        </div>
      </section>

      {/* Wellness Gallery */}
      <WellnessGallery />

      {/* Features Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 mt-32 sm:mt-48">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 sm:mb-20 tracking-tight text-white">
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
          <Button onClick={() => navigate('/register')} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold">
            Começar Agora - É Grátis
          </Button>
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
    </div>;
};
export default Index;