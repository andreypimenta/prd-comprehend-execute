import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Zap, 
  Brain, 
  Heart, 
  Dumbbell,
  Calendar,
  Award,
  ChevronRight
} from "lucide-react";

export default function Dashboard() {
  // Mock user data - will be replaced with real data from Supabase
  const user = {
    name: "João Silva",
    email: "joao@example.com",
    image: null
  };

  const stats = [
    {
      title: "Suplementos Ativos",
      value: "5",
      description: "Em uso atualmente",
      icon: Zap,
      trend: "+2 este mês"
    },
    {
      title: "Objetivo Atual",
      value: "85%",
      description: "Ganho de massa muscular",
      icon: Target,
      trend: "No prazo"
    },
    {
      title: "Recomendações IA",
      value: "12",
      description: "Disponíveis para você",
      icon: Brain,
      trend: "3 novas"
    },
    {
      title: "Progresso Mensal",
      value: "92%",
      description: "Meta de consistência",
      icon: TrendingUp,
      trend: "+12% vs mês anterior"
    }
  ];

  const recentRecommendations = [
    {
      name: "Whey Protein Isolado",
      category: "Proteína",
      confidence: 95,
      reason: "Ideal para seu objetivo de ganho muscular"
    },
    {
      name: "Creatina Monohidratada",
      category: "Performance",
      confidence: 88,
      reason: "Aumenta força e potência nos treinos"
    },
    {
      name: "Multivitamínico Premium",
      category: "Saúde",
      confidence: 82,
      reason: "Complementa deficiências nutricionais"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      
      <main className="container mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Olá, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Aqui está um resumo da sua jornada fitness hoje
            </p>
          </div>
          <Button variant="primary" size="lg">
            <Brain className="mr-2 h-5 w-5" />
            Nova Análise IA
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-border/50 hover:shadow-card transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <div className="flex items-center mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Recommendations */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      Recomendações da IA
                    </CardTitle>
                    <CardDescription>
                      Suplementos personalizados baseados no seu perfil
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver todas
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentRecommendations.map((rec, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                          <Zap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{rec.name}</h4>
                          <p className="text-sm text-muted-foreground">{rec.reason}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">{rec.confidence}% match</p>
                        <Progress value={rec.confidence} className="w-16 h-2" />
                      </div>
                      <Badge variant="outline">{rec.category}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Progress */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Atualizar Perfil de Saúde
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Registrar Treino
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar Consulta
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="mr-2 h-4 w-4" />
                  Ver Progresso Detalhado
                </Button>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="border-border/50 bg-gradient-to-br from-accent/5 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Award className="h-5 w-5 text-accent" />
                  Conquista Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                    <span className="text-2xl text-white">🏆</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Consistência de Ferro!</h4>
                    <p className="text-sm text-muted-foreground">
                      7 dias seguidos seguindo as recomendações
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Ver Conquistas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}