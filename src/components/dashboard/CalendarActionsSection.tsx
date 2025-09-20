import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { useCheckin } from "@/hooks/useCheckin"
import { Calendar as CalendarIcon, Plus, Bell, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export function CalendarActionsSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const { getProgressSummary, loading: checkinLoading } = useCheckin()
  
  const progressSummary = getProgressSummary()
  
  // Generate some mock notification data
  const notifications = [
    {
      id: 1,
      message: "Time for your evening supplements",
      code: "REM-001",
      time: "2 hours ago",
      type: "reminder"
    },
    {
      id: 2,
      message: "Weekly progress report available",
      code: "RPT-002", 
      time: "1 day ago",
      type: "report"
    },
    {
      id: 3,
      message: "Supplement delivery scheduled",
      code: "DEL-003",
      time: "2 days ago", 
      type: "delivery"
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

      {/* Main Action Button */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/20 border-primary/30">
        <CardContent className="p-6 text-center">
          <Button 
            asChild
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
          >
            <Link to="/checkin">
              <CheckCircle2 className="h-6 w-6 mr-2" />
              Make Check-in
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Track your daily supplement intake and wellness
          </p>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
              <Bell className="h-5 w-5 mr-2 text-primary" />
              Notifications
            </CardTitle>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {notifications.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-3 bg-muted/30 rounded-lg border border-border/30">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground mb-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {notification.code}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-card border-border/50">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-primary">
                {checkinDates.length}
              </div>
              <div className="text-xs text-muted-foreground">
                This Week
              </div>
            </div>
            <div>
              <div className="text-xl font-bold text-primary">
                {Math.round(progressSummary?.average_compliance ?? 0)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Average
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}