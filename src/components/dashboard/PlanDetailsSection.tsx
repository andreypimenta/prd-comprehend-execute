import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useSelectedSupplements } from "@/hooks/useSelectedSupplements"
import { useCheckin } from "@/hooks/useCheckin"
import { BarChart } from "@/components/charts/BarChart"
import { Plus, Pill, TrendingUp, Calendar, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { Link } from "react-router-dom"

interface Supplement {
  id: string
  name: string
  category: string
}

export function PlanDetailsSection() {
  const { selectedSupplements, loading: supplementsLoading } = useSelectedSupplements()
  const { getTrendData, getProgressSummary } = useCheckin()
  const [supplements, setSupplements] = useState<Supplement[]>([])
  const [loading, setLoading] = useState(true)

  const activeSupplements = selectedSupplements.filter(s => s.is_active)
  const trendData = getTrendData()
  const progressSummary = getProgressSummary()

  useEffect(() => {
    const fetchSupplements = async () => {
      if (activeSupplements.length === 0) {
        setLoading(false)
        return
      }

      try {
        const supplementIds = activeSupplements.map(s => s.supplement_id)
        const { data, error } = await supabase
          .from('supplements')
          .select('id, name, category')
          .in('id', supplementIds)

        if (error) throw error
        setSupplements(data || [])
      } catch (error) {
        console.error('Erro ao buscar suplementos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSupplements()
  }, [activeSupplements])

  if (supplementsLoading || loading) {
    return (
      <div className="space-y-6">
        <div className="h-48 bg-muted animate-pulse rounded-lg" />
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
      </div>
    )
  }

  const weeklyData = trendData.slice(-8).map((item, index) => ({
    name: `Sem ${index + 1}`,
    value: item.compliance_percentage || 0,
    color: (item.compliance_percentage || 0) > 80 ? "hsl(var(--accent))" : (item.compliance_percentage || 0) > 60 ? "hsl(var(--secondary-gold))" : "hsl(var(--destructive))"
  }))

  return (
    <div className="space-y-6">
      {/* Main Plan Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-border/50 shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-card-foreground flex items-center">
              <Pill className="h-6 w-6 mr-2 text-primary" />
              Seu Plano de Suplementação
            </CardTitle>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              {activeSupplements.length} Ativos
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeSupplements.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Nenhum suplemento selecionado
              </h3>
              <p className="text-muted-foreground mb-6">
                Comece selecionando suplementos das suas recomendações personalizadas
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/results">
                  <Plus className="h-4 w-4 mr-2" />
                  Ver Recomendações
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Supplements List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-card-foreground mb-3">Suplementos em Uso</h4>
                {supplements.map((supplement, index) => {
                  const selection = activeSupplements.find(s => s.supplement_id === supplement.id)
                  const daysActive = selection ? Math.floor((Date.now() - new Date(selection.start_date).getTime()) / (1000 * 60 * 60 * 24)) : 0
                  
                  return (
                    <div key={supplement.id} className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border/30">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Pill className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">{supplement.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{supplement.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {daysActive} dias
                        </Badge>
                        <p className="text-xs text-muted-foreground">Desde início</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Add Supplement Button */}
              <Button 
                asChild 
                variant="outline" 
                className="w-full border-dashed border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
              >
                <Link to="/results">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Novo Suplemento
                </Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Weekly Compliance Chart */}
      {activeSupplements.length > 0 && (
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-accent" />
              Aderência Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weeklyData.length > 0 ? (
              <div className="space-y-4">
                <BarChart 
                  data={weeklyData}
                  height={192}
                />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-muted-foreground">Excelente (80%+)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-secondary-gold" />
                      <span className="text-muted-foreground">Bom (60-80%)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Melhorar (&lt;60%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Faça seus primeiros check-ins para ver o progresso</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Progress Summary */}
      {progressSummary.recent_improvements.length > 0 && (
        <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Melhorias Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progressSummary.recent_improvements.map((improvement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                    <TrendingUp className="h-3 w-3 text-accent" />
                  </div>
                  <p className="text-sm text-card-foreground">{improvement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}