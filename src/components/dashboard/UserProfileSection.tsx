import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useSelectedSupplements } from "@/hooks/useSelectedSupplements";
import { useCheckin } from "@/hooks/useCheckin";

export function UserProfileSection() {
  const { user } = useAuth();
  const { profile, loading, isProfileComplete } = useUserProfile();
  const { selectedSupplements } = useSelectedSupplements();
  const { checkinHistory } = useCheckin();

  // Calculate profile completeness percentage
  const getProfileCompleteness = () => {
    if (!profile) return 0;
    const fields = [profile.age, profile.gender, profile.weight, profile.height, profile.symptoms?.length, profile.health_goals?.length];
    const filledFields = fields.filter(field => field !== null && field !== undefined && field !== 0).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  // Calculate check-in consistency (last 4 weeks)
  const getCheckinConsistency = () => {
    if (!checkinHistory?.length) return 0;
    const recentCheckins = checkinHistory.slice(0, 4); // Last 4 weeks
    return Math.round((recentCheckins.length / 4) * 100);
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="h-6 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-32 w-32 bg-muted animate-pulse rounded-full mx-auto" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-muted animate-pulse rounded" />
              <div className="h-20 bg-muted animate-pulse rounded" />
              <div className="h-20 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-card border border-border shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Your Health Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Large User Photo */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Three Progress Circles */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center space-y-2">
            <CircularProgress
              value={getProfileCompleteness()}
              size={64}
              strokeWidth={6}
              color="hsl(var(--primary))"
              showValue
            />
            <div className="text-center">
              <p className="text-xs font-medium text-muted-foreground">
                Profile
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Completeness
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <CircularProgress
              value={selectedSupplements.filter(s => s.is_active).length * 20} // Max 5 supplements = 100%
              size={64}
              strokeWidth={6}
              color="hsl(var(--primary))"
              showValue
            />
            <div className="text-center">
              <p className="text-xs font-medium text-muted-foreground">
                Active
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Supplements
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <CircularProgress
              value={getCheckinConsistency()}
              size={64}
              strokeWidth={6}
              color="hsl(var(--primary))"
              showValue
            />
            <div className="text-center">
              <p className="text-xs font-medium text-muted-foreground">
                Check-in
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Consistency
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}