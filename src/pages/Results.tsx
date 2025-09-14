import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { ResultsOverview } from "@/components/results/ResultsOverview";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Recommendation } from "@/types/supplements";

export default function Results() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkExistingRecommendations();
  }, []);

  const checkExistingRecommendations = async () => {
    console.log("🔍 Results: Iniciando verificação de recomendações");
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("❌ Results: Sessão não encontrada");
        toast({
          title: "Erro de autenticação",
          description: "Faça login para ver suas recomendações.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      console.log("👤 Results: Usuário autenticado:", session.user.id);

      // Primeiro verificar se o perfil existe
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (profileError || !profileData) {
        console.log("❌ Results: Perfil não encontrado, redirecionando para onboarding");
        console.log("Erro do perfil:", profileError);
        toast({
          title: "Perfil não encontrado",
          description: "Complete seu perfil primeiro",
          variant: "destructive",
        });
        navigate('/onboarding');
        return;
      }

      console.log("✅ Results: Perfil encontrado:", profileData);

      // Agora buscar recomendações existentes
      const { data, error } = await supabase.functions.invoke('analyze', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('📊 Results: Resposta ao buscar recomendações:', { data, error });

      if (error) {
        console.error('❌ Results: Erro ao buscar recomendações:', error);
        // Check if it's a profile not found error
        if (error.message && error.message.includes('Profile not found')) {
          toast({
            title: "Perfil não encontrado",
            description: "Complete o onboarding primeiro para gerar recomendações.",
            variant: "destructive",
          });
          navigate('/onboarding');
          return;
        }
        
        toast({
          title: "Erro ao buscar recomendações",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
        return;
      }

      // Check for errors in the data response
      if (data?.error) {
        console.error('❌ Results: Erro retornado pela função:', data.error);
        if (data.error.includes('Profile not found')) {
          toast({
            title: "Perfil não encontrado", 
            description: "Complete o onboarding primeiro para gerar recomendações.",
            variant: "destructive",
          });
          navigate('/onboarding');
          return;
        }
        
        toast({
          title: "Erro ao buscar recomendações",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (data.hasRecommendations) {
        console.log("✅ Results: Recomendações encontradas:", data.recommendations.length);
        setRecommendations(data.recommendations);
      } else {
        console.log("ℹ️ Results: Nenhuma recomendação encontrada");
      }
    } catch (error) {
      console.error('💥 Results: Erro inesperado:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao verificar suas recomendações.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = async () => {
    console.log("🧠 Results: Iniciando geração de recomendações");
    setAnalyzing(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("❌ Results: Sessão não encontrada para geração");
        toast({
          title: "Erro de autenticação",
          description: "Faça login para gerar recomendações.",
          variant: "destructive",
        });
        return;
      }

      console.log("👤 Results: Usuário para geração:", session.user.id);

      // Verificar se o perfil existe antes de tentar gerar recomendações
      const { data: profileCheck, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (profileError || !profileCheck) {
        console.log("❌ Results: Perfil não encontrado para geração, redirecionando");
        console.log("Erro do perfil:", profileError);
        toast({
          title: "Perfil não encontrado",
          description: "Complete seu perfil primeiro",
          variant: "destructive",
        });
        navigate('/onboarding');
        return;
      }

      console.log("✅ Results: Perfil encontrado, prosseguindo com análise:", profileCheck);

      const { data, error } = await supabase.functions.invoke('analyze', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('🧠 Results: Resposta ao gerar recomendações:', { data, error });

      if (error) {
        console.error('❌ Results: Erro ao gerar recomendações:', error);
        // Check if it's a profile not found error
        if (error.message && error.message.includes('Profile not found')) {
          toast({
            title: "Perfil não encontrado",
            description: "Complete o onboarding primeiro para gerar recomendações.",
            variant: "destructive",
          });
          navigate('/onboarding');
          return;
        }
        
        toast({
          title: "Erro ao gerar recomendações",
          description: error.message || "Tente novamente mais tarde.",
          variant: "destructive",
        });
        return;
      }

      // Check for errors in the data response
      if (data?.error) {
        console.error('❌ Results: Erro retornado pela função:', data.error);
        if (data.error.includes('Profile not found')) {
          toast({
            title: "Perfil não encontrado",
            description: "Complete o onboarding primeiro para gerar recomendações.",
            variant: "destructive",
          });
          navigate('/onboarding');
          return;
        }
        
        toast({
          title: "Erro ao gerar recomendações",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      if (data.success) {
        console.log("✅ Results: Recomendações geradas com sucesso:", data.recommendations.length);
        setRecommendations(data.recommendations);
        toast({
          title: "Recomendações geradas!",
          description: `${data.total_recommendations} suplementos recomendados para você.`,
        });
      }
    } catch (error) {
      console.error('💥 Results: Erro inesperado na geração:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao gerar suas recomendações.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando suas recomendações...</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Suas Recomendações</h1>
            <p className="text-muted-foreground">
              Análise personalizada de suplementos baseada no seu perfil
            </p>
          </div>

          <Card className="text-center py-12">
            <CardContent className="space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Pronto para suas recomendações?</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Vamos analisar seu perfil e gerar recomendações personalizadas de suplementos
                  baseadas nos seus dados de onboarding.
                </p>
              </div>

              <Button
                onClick={generateRecommendations}
                disabled={analyzing}
                size="lg"
                className="mt-6"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando seu perfil...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar Recomendações
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Suas Recomendações</h1>
          <p className="text-muted-foreground">
            Suplementos personalizados baseados no seu perfil
          </p>
        </div>

        {/* Overview */}
        <ResultsOverview recommendations={recommendations} />

        {/* Recommendations Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recomendações Detalhadas</h2>
            <Button
              variant="outline"
              onClick={generateRecommendations}
              disabled={analyzing}
            >
              {analyzing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Atualizar
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}