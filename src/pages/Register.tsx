import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";
import { Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <RegisterForm />
        </div>
      </div>

      {/* Right side - Hero Section */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-primary/10 via-primary-glow/10 to-accent/10 relative overflow-hidden">
        <div className="text-center z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-primary-glow shadow-glow">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LoL Engine
            </h1>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Comece sua jornada hoje!
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            A plataforma inteligente que usa IA para recomendar os suplementos ideais 
            para seus objetivos de fitness e saúde.
          </p>

          <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                <span className="text-white font-semibold">AI</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Recomendações Inteligentes</p>
                <p className="text-xs text-muted-foreground">Powered by IA</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-accent to-primary-glow flex items-center justify-center">
                <span className="text-white font-semibold">🎯</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Objetivos Personalizados</p>
                <p className="text-xs text-muted-foreground">Para seus resultados</p>
              </div>
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