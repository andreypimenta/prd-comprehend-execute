import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelectedSupplements } from "@/hooks/useSelectedSupplements";
import { useCheckin } from "@/hooks/useCheckin";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useMemo } from "react";
import { ArrowUpRight, Calendar, TrendingUp, Plus, Target, Activity, Heart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Supplement {
  id: string
  name: string
  category: string
}

export function PlanDocumentsSection() {
  const { selectedSupplements, loading: selectionsLoading } = useSelectedSupplements();
  const { getTrendData, getProgressSummary, checkinHistory, loading: checkinLoading } = useCheckin();
  const { profile } = useUserProfile();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [totalRecommendations, setTotalRecommendations] = useState(0);
  const [loading, setLoading] = useState(true);

  // Memoize activeSupplements to prevent infinite re-renders
  const activeSupplements = useMemo(() => {
    return selectedSupplements?.filter(s => s.is_active) || [];
  }, [selectedSupplements]);
  
  const progressSummary = getProgressSummary();

  useEffect(() => {
    const fetchSupplementDetails = async () => {
      if (selectionsLoading) return;
      
      try {
        const supplementIds = activeSupplements.map(s => s.supplement_id);
        if (supplementIds.length === 0) {
          setSupplements([]);
          setLoading(false);
          return;
        }

        // Fetch supplement details
        const { data, error } = await supabase
          .from('supplements')
          .select('id, name, category')
          .in('id', supplementIds);

        if (error) throw error;
        setSupplements(data || []);

        // Fetch total recommendations count
        const { count } = await supabase
          .from('recommendations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
        
        setTotalRecommendations(count || 0);
      } catch (error) {
        console.error('Error fetching supplement details:', error);
        setSupplements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplementDetails();
  }, [activeSupplements.length, selectionsLoading]); // Use activeSupplements.length instead of the array itself

  if (selectionsLoading || loading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
        <div className="h-48 bg-muted animate-pulse rounded-lg" />
      </div>
    );
  }

  return (
    <Card className="w-full h-full bg-card border border-border shadow-sm min-h-[650px] flex flex-col">
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Your Supplement Journey
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-6">
        {/* Active Supplement Plan Card - Turquoise */}
        <Card className="bg-cyan-400 text-cyan-950 border-0 relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <ArrowUpRight className="h-5 w-5 text-cyan-950" />
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-cyan-950 text-cyan-400 hover:bg-cyan-950">
                  {activeSupplements.length} Active
                </Badge>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-950">
                  Active Supplement Plan
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-cyan-950">
                  <span>Started {activeSupplements.length}</span>
                  <span>Total {totalRecommendations} recommended</span>
                </div>
                <div className="h-2 bg-cyan-950/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-950 transition-all duration-300"
                    style={{ width: `${totalRecommendations > 0 ? (activeSupplements.length / totalRecommendations) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Data Overview */}
        <Card className="bg-card border-border flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-card-foreground">
              Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm text-card-foreground">Recent Check-ins</div>
                  <div className="text-xs text-muted-foreground">{checkinHistory?.length || 0} completed</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {checkinHistory?.[0]?.checkin_date ? new Date(checkinHistory[0].checkin_date).toLocaleDateString() : '-'}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Target className="h-4 w-4 text-secondary" />
                </div>
                <div>
                  <div className="font-medium text-sm text-card-foreground">Health Goals</div>
                  <div className="text-xs text-muted-foreground">{profile?.health_goals?.length || 0} active goals</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <div className="font-medium text-sm text-card-foreground">Current Symptoms</div>
                  <div className="text-xs text-muted-foreground">{profile?.symptoms?.length || 0} monitored</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">Tracking</div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}