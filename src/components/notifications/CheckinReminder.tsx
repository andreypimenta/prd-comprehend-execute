import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Bell, X } from 'lucide-react';

export const CheckinReminder = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState<any[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveReminders();
  }, []);

  const fetchActiveReminders = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user?.id) return;

      const { data, error } = await supabase
        .from('checkin_reminders')
        .select('*')
        .eq('user_id', user.user.id)
        .eq('is_active', true);

      if (error) throw error;
      setReminders(data || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const dismissReminder = async (reminderId: string) => {
    try {
      await supabase
        .from('checkin_reminders')
        .update({ is_active: false })
        .eq('id', reminderId);

      setDismissed(prev => [...prev, reminderId]);
      setReminders(prev => prev.filter(r => r.id !== reminderId));
    } catch (error) {
      console.error('Error dismissing reminder:', error);
    }
  };

  const handleCheckinClick = (reminderId: string) => {
    dismissReminder(reminderId);
    navigate('/checkin');
  };

  const visibleReminders = reminders.filter(r => !dismissed.includes(r.id));

  if (loading || visibleReminders.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {visibleReminders.map((reminder) => (
        <Alert key={reminder.id} className="border-primary/20 bg-primary/5">
          <Bell className="h-4 w-4 text-primary" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Check-in Semanal</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Hora do seu check-in semanal! Como você se sentiu esta semana?
                </p>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Button 
                  size="sm"
                  onClick={() => handleCheckinClick(reminder.id)}
                  className="gap-1"
                >
                  <Calendar className="w-3 h-3" />
                  Fazer Check-in
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dismissReminder(reminder.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};