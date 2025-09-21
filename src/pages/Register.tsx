import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";
import { Zap, ArrowLeft, Sparkles, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrambleText from "@/components/ui/scramble-text";

export default function Register() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao início
              </Link>
            </Button>
          </div>

          {/* LoL Branding */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <h1 className="lol-static text-6xl md:text-7xl font-bold">
                <ScrambleText 
                  text="lol" 
                  isActive={false}
                />
              </h1>
              <p className="life-on-labs text-sm tracking-widest uppercase opacity-80 mt-2">
                Life on Labs
              </p>
            </div>
          </div>

          <RegisterForm />
        </div>
      </div>

      {/* Right side - Hero Section */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-primary/10 via-primary-glow/10 to-accent/10 relative overflow-hidden">
        <div className="text-center z-10 max-w-lg">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comece sua jornada hoje!
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
              Junte-se a milhares de pessoas que já descobriram os suplementos 
              ideais com nossa inteligência artificial avançada.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Análise Personalizada</p>
                <p className="text-xs text-muted-foreground">Baseada no seu perfil único</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-accent to-primary-glow flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Resultados Rápidos</p>
                <p className="text-xs text-muted-foreground">Recomendações em segundos</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-glow to-accent flex items-center justify-center">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Maximize seus Ganhos</p>
                <p className="text-xs text-muted-foreground">Otimize seus resultados</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-foreground mb-1">10K+</div>
              <div className="text-xs text-muted-foreground">Usuários ativos</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground mb-1">95%</div>
              <div className="text-xs text-muted-foreground">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground mb-1">24/7</div>
              <div className="text-xs text-muted-foreground">Suporte</div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-primary/20 to-primary-glow/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}