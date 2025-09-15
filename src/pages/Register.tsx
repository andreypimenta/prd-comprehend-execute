import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";
import { Zap, ArrowLeft, ChevronDown, Sparkles, Target, TrendingUp, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ScrambleText from "@/components/ui/scramble-text";

export default function Register() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'hsl(218, 15%, 32%)' }}>
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-black/10' : ''
      }`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-accent to-primary shadow-glow">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LoL Engine</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">
                Início
              </Link>
              <Link to="/login" className="text-white/80 hover:text-white transition-colors">
                Entrar
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-white/10">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link 
                  to="/login" 
                  className="text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      <div className="flex min-h-screen pt-20">
        {/* Left side - Register Form */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          {/* Background decoration for left side */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-r from-accent/10 to-primary/10 blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gradient-to-r from-primary/10 to-primary-glow/10 blur-3xl"></div>
          </div>
          
          <div className="w-full max-w-md relative z-10">
            <div className="mb-8">
              <Button variant="ghost" asChild className="mb-4 text-white/80 hover:text-white hover:bg-white/10">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar ao início
                </Link>
              </Button>
            </div>

            {/* LoL Branding */}
            <div className="text-center mb-6">
              <div className="mb-3">
                <h1 className="lol-static text-4xl md:text-5xl font-bold">
                  <ScrambleText 
                    text="lol" 
                    isActive={false}
                  />
                </h1>
                <p className="life-on-labs text-xs tracking-widest uppercase opacity-80 mt-1">
                  Life on Labs
                </p>
              </div>
            </div>

            <RegisterForm />
          </div>
        </div>

        {/* Right side - Enhanced Hero Section */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden">
          <div className="text-center z-10 max-w-lg">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r from-accent to-primary shadow-glow">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-4">
                Comece sua jornada hoje!
              </h2>
              
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Junte-se a milhares de pessoas que já descobriram os suplementos 
                ideais com nossa inteligência artificial avançada.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
              <div className="flex items-center gap-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">Análise Personalizada</p>
                  <p className="text-sm text-white/70">Baseada no seu perfil único</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">Resultados Rápidos</p>
                  <p className="text-sm text-white/70">Recomendações em segundos</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-glow to-accent flex items-center justify-center shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">Maximize seus Ganhos</p>
                  <p className="text-sm text-white/70">Otimize seus resultados</p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-white/60">Usuários ativos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-white/60">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-white/60">Suporte</div>
              </div>
            </div>
          </div>

          {/* Enhanced Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-accent/30 to-primary/30 blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-primary/30 to-primary-glow/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-primary-glow/20 to-accent/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}