import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { useCheckin } from "@/hooks/useCheckin"
import { useUserProfile } from "@/hooks/useUserProfile"
import { CheckCircle, Plus, Settings, Bell, Calendar as CalendarIcon, User, Edit3 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

export function ProfileWidgetsSection() {
  const { checkinHistory, hasCheckinThisWeek } = useCheckin()
  const { profile, isProfileComplete } = useUserProfile()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Get dates with checkins for calendar highlighting
  const checkinDates = checkinHistory.map(checkin => 
    new Date(checkin.checkin_date).toDateString()
  )

  const todayHasCheckin = hasCheckinThisWeek()

  return (
    <div className="space-y-6">
      {/* Quick Actions Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-border/50 shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <User className="h-5 w-5 mr-2 text-primary" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            asChild 
            className={`w-full ${todayHasCheckin ? 'bg-accent hover:bg-accent/90' : 'bg-primary hover:bg-primary/90'}`}
          >
            <Link to="/checkin">
              <CheckCircle className="h-4 w-4 mr-2" />
              {todayHasCheckin ? "Ver Check-in Desta Semana" : "Fazer Check-in Semanal"}
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link to="/results">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Suplementos
            </Link>
          </Button>

          <Button asChild variant="ghost" className="w-full">
            <Link to="/onboarding">
              <Edit3 className="h-4 w-4 mr-2" />
              Editar Perfil
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Profile Completion Card */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-secondary-gold" />
              Completude do Perfil
            </div>
            <Badge variant={isProfileComplete ? "default" : "secondary"} className="text-xs">
              {isProfileComplete ? "Completo" : "Incompleto"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium text-card-foreground">85%</span>
            </div>
            <div className="w-full bg-secondary/20 rounded-full h-2">
              <div className="bg-secondary-gold h-2 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-card-foreground">Informações básicas</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-accent" />
              <span className="text-card-foreground">Sintomas e objetivos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full border-2 border-muted" />
              <span className="text-muted-foreground">Preferências avançadas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Widget */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-accent" />
            Check-ins
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={ptBR}
            className="rounded-md border-0"
            modifiers={{
              checkin: (date) => checkinDates.includes(date.toDateString())
            }}
            modifiersStyles={{
              checkin: { 
                backgroundColor: 'hsl(var(--accent))', 
                color: 'white',
                fontWeight: 'bold'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Recent Activity Card */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 shadow-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <Bell className="h-5 w-5 mr-2 text-primary" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checkinHistory.slice(0, 3).map((checkin, index) => (
            <div key={checkin.id} className="flex items-start space-x-3 pb-3 border-b border-border/30 last:border-b-0 last:pb-0">
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground">
                  Check-in Semana {checkin.week_number}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(parseISO(checkin.checkin_date), "dd MMM, yyyy", { locale: ptBR })}
                </p>
                {checkin.wellbeing && (
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Bem-estar: {checkin.wellbeing.overall}/5
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {checkinHistory.length === 0 && (
            <div className="text-center py-4">
              <CalendarIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Nenhum check-in ainda</p>
              <p className="text-xs text-muted-foreground">Faça seu primeiro check-in para começar a acompanhar o progresso</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}