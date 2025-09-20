import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Bell, X, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotificationBannerProps {
  className?: string;
}

export const NotificationBanner = ({ className }: NotificationBannerProps) => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);
  const [lastCheckinWeek, setLastCheckinWeek] = useState<string | null>(null);

  useEffect(() => {
    checkForPendingCheckin();
  }, []);

  const getCurrentWeek = () => {
    const now = new Date();
    const year = now.getFullYear();
    const week = getWeekNumber(now);
    return `${year}-W${week.toString().padStart(2, '0')}`;
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const checkForPendingCheckin = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      const currentWeek = getCurrentWeek();
      
      // Check if user has already done check-in this week
      const { data: checkins, error } = await supabase
        .from('weekly_checkins')
        .select('week_number_formatted')
        .eq('user_id', user.user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      const lastCheckin = checkins?.[0];
      setLastCheckinWeek(lastCheckin?.week_number_formatted || null);

      // Show banner if no check-in this week
      if (!lastCheckin || lastCheckin.week_number_formatted !== currentWeek) {
        setShowBanner(true);
      }
    } catch (error) {
      console.error('Error checking for pending check-in:', error);
    }
  };

  const handleCheckinClick = () => {
    navigate('/checkin');
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Store dismissal in localStorage to avoid showing again today
    localStorage.setItem('checkinBannerDismissed', new Date().toDateString());
  };

  // Check if banner was dismissed today
  const wasDismissedToday = () => {
    const dismissed = localStorage.getItem('checkinBannerDismissed');
    return dismissed === new Date().toDateString();
  };

  if (!showBanner || wasDismissedToday()) {
    return null;
  }

  return (
    <Alert className={`border-primary/20 bg-primary/5 ${className}`}>
      <Bell className="h-4 w-4 text-primary" />
      <AlertDescription>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="font-medium mb-1">
              📋 Check-in Semanal Pendente
            </p>
            <p className="text-sm text-muted-foreground">
              {lastCheckinWeek 
                ? `Seu último check-in foi na semana ${lastCheckinWeek.split('-W')[1]}. Que tal atualizar como você se sente?`
                : 'Faça seu primeiro check-in semanal para acompanharmos seu progresso!'
              }
            </p>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <Button 
              size="sm"
              onClick={handleCheckinClick}
              className="gap-1"
            >
              <Calendar className="w-3 h-3" />
              Fazer Check-in
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};