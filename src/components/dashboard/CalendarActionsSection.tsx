import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useCheckin } from "@/hooks/useCheckin";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useState } from "react";
import { CalendarDays, Stethoscope, Clock, User, Edit2, Activity } from "lucide-react";

export function CalendarActionsSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { checkinHistory, loading: checkinLoading } = useCheckin();
  const { profile } = useUserProfile();

  if (checkinLoading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
        <div className="h-48 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      {/* User Profile Card */}
      <Card className="bg-card border border-border shadow-sm flex-shrink-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                  NL
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-card-foreground">Nika Larsen</p>
                <p className="text-sm text-muted-foreground">
                  {profile?.age || 31} years old
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendar with Check-in Dates */}
      <Card className="bg-card border border-border shadow-sm flex-1">
        <CardContent className="p-4 h-full flex flex-col">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-0 flex-1"
            modifiers={{
              checkin: checkinHistory?.map(c => new Date(c.checkin_date)) || []
            }}
            modifiersClassNames={{
              checkin: "bg-green-500/20 text-green-700 font-semibold"
            }}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-md",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
        </CardContent>
      </Card>

      {/* Complete Check-in Button */}
      <Button className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3 rounded-full flex items-center justify-center gap-2 flex-shrink-0">
        <Activity className="h-4 w-4" />
        {checkinHistory?.some(c => 
          new Date(c.checkin_date).toDateString() === new Date().toDateString()
        ) ? "View Progress" : "Complete Check-in"}
      </Button>

      {/* Health Reminders */}
      <Card className="bg-card border border-border shadow-sm flex-shrink-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Reminders
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <span className="sr-only">View all</span>
              →
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm text-card-foreground">
                  Weekly Check-in
                </p>
                <p className="text-xs text-muted-foreground">
                  Health Progress
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Due tomorrow
                  </span>
                </div>
              </div>
            </div>
          </div>
          {profile?.symptoms && profile.symptoms.length > 0 && (
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm text-card-foreground">
                    Supplement Reminder
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Daily supplements
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Morning routine
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}