import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DonutChart } from "@/components/charts/DonutChart"
import { ProgressRing } from "@/components/charts/ProgressRing"
import { useUserProfile } from "@/hooks/useUserProfile"
import { useSelectedSupplements } from "@/hooks/useSelectedSupplements"
import { useCheckin } from "@/hooks/useCheckin"
import { Activity, Target, TrendingUp, Calendar } from "lucide-react"

export function UserStatsSection() {
  const { profile, loading: profileLoading } = useUserProfile()
  const { selectedSupplements, loading: supplementsLoading } = useSelectedSupplements()
  const { getProgressSummary } = useCheckin()
  
  const progressSummary = getProgressSummary()
  const activeSupplements = selectedSupplements.filter(s => s.is_active)

  const userStats = [
    {
      title: "Aderência Mensal",
      value: progressSummary.average_compliance || 0,
      icon: Activity,
      color: "hsl(var(--accent))",
      isPercentage: true
    },
    {
      title: "Bem-estar Geral",
      value: 78,
      icon: TrendingUp,
      color: "hsl(var(--primary))",
      isPercentage: true
    },
    {
      title: "Suplementos Ativos",
      value: activeSupplements.length,
      icon: Target,
      color: "hsl(var(--secondary-gold))",
      isPercentage: false
    }
  ]

  if (profileLoading || supplementsLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-muted animate-pulse rounded-lg" />
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
              <span className="text-primary font-bold text-sm">
                {profile?.age || "U"}
              </span>
            </div>
            Seu Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Idade</p>
              <p className="font-medium text-card-foreground">{profile?.age || "--"} anos</p>
            </div>
            <div>
              <p className="text-muted-foreground">Gênero</p>
              <p className="font-medium text-card-foreground capitalize">{profile?.gender || "--"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Peso</p>
              <p className="font-medium text-card-foreground">{profile?.weight || "--"} kg</p>
            </div>
            <div>
              <p className="text-muted-foreground">Altura</p>
              <p className="font-medium text-card-foreground">{profile?.height || "--"} cm</p>
            </div>
          </div>
          
          {profile?.health_goals && profile.health_goals.length > 0 && (
            <div>
              <p className="text-muted-foreground text-sm mb-2">Objetivos de Saúde</p>
              <div className="flex flex-wrap gap-1">
                {profile.health_goals.slice(0, 3).map((goal, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {goal}
                  </Badge>
                ))}
                {profile.health_goals.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{profile.health_goals.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Estatísticas do Mês
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {userStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                    <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{stat.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {stat.isPercentage ? "Últimos 30 dias" : "Atualmente"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold" style={{ color: stat.color }}>
                    {stat.value}{stat.isPercentage ? "%" : ""}
                  </p>
                  {stat.isPercentage && (
                    <Progress 
                      value={stat.value} 
                      className="w-16 h-1 mt-1" 
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Ring Chart */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground">
            Progresso Geral
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <ProgressRing 
            value={progressSummary.average_compliance || 0} 
            size={120}
            strokeWidth={8}
            color="hsl(var(--primary))"
          />
        </CardContent>
      </Card>
    </div>
  )
}