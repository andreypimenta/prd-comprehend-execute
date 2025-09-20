import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCheckin } from "@/hooks/useCheckin"
import { useUserProfile } from "@/hooks/useUserProfile"
import { Calendar as CalendarIcon, User, Stethoscope } from "lucide-react"
import { useState } from "react"

export function CalendarActionsSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const { getProgressSummary, loading: checkinLoading } = useCheckin()
  const { profile } = useUserProfile()
  
  const progressSummary = getProgressSummary()
  
  // Medical appointment notifications
  const medicalNotifications = [
    {
      id: 1,
      doctor: "Dr.Stiv Lupin",
      specialty: "Surgeon",
      time: "5:00PM - 6:00PM",
      date: "Today",
      type: "consultation"
    }
  ]

  // Highlight dates with check-ins (mock data)
  const checkinDates = [
    new Date(2025, 8, 18), // September 18, 2025
    new Date(2025, 8, 19), // September 19, 2025
    new Date(2025, 8, 20), // September 20, 2025
  ]

  if (checkinLoading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
        <div className="h-48 bg-muted animate-pulse rounded-lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card className="bg-card border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                {profile?.age?.toString().slice(-2) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-card-foreground">
                Usuário
              </h3>
              <p className="text-sm text-muted-foreground">
                {profile?.age ? `${profile.age} anos` : "Idade não informada"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Card */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-0"
            modifiers={{
              checkin: checkinDates
            }}
            modifiersStyles={{
              checkin: { 
                backgroundColor: 'hsl(var(--primary))', 
                color: 'hsl(var(--primary-foreground))',
                borderRadius: '50%'
              }
            }}
          />
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span>Check-in completed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Make Appointment Button */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/30">
        <CardContent className="p-6 text-center">
          <Button 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
          >
            <Stethoscope className="h-6 w-6 mr-2" />
            Make An Appointment
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Schedule your next medical consultation
          </p>
        </CardContent>
      </Card>

      {/* Medical Appointments */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Medical Appointments
            </CardTitle>
            <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
              100%
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {medicalNotifications.map((appointment) => (
            <div key={appointment.id} className="p-4 bg-muted/30 rounded-lg border border-border/30">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-4 w-4 text-primary" />
                    <p className="text-sm font-semibold text-card-foreground">
                      {appointment.doctor}, {appointment.specialty}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {appointment.time}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {appointment.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}