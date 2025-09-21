import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="w-full bg-muted/20 p-6 rounded-2xl">
        <div className="space-y-6">
          <div className="h-32 w-32 bg-muted animate-pulse rounded-full mx-auto" />
          <div className="h-32 bg-muted/40 animate-pulse rounded-xl" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-muted/20 border-none shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-6 space-y-6">
        {/* Large User Photo */}
        <div className="flex justify-center">
          <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Decorative Squares */}
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-white rounded-sm shadow-sm" />
          <div className="w-3 h-3 bg-black rounded-sm" />
          <div className="w-3 h-3 bg-white rounded-sm shadow-sm" />
        </div>

        {/* Black Horizontal Card with Graphs */}
        <Card className="bg-black/90 border-none rounded-xl shadow-inner">
          <CardContent className="p-6">
            {/* Three Progress Circles */}
            <div className="grid grid-cols-3 gap-6 mb-4">
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={getProfileCompleteness()}
                  size={60}
                  strokeWidth={5}
                  variant="modern"
                  showValue
                />
              </div>
              
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={selectedSupplements.filter(s => s.is_active).length * 20}
                  size={60}
                  strokeWidth={5}
                  variant="modern"
                  showValue
                />
              </div>
              
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={getCheckinConsistency()}
                  size={60}
                  strokeWidth={5}
                  variant="modern"
                  showValue
                />
              </div>
            </div>

            {/* Labels in Dark Gray Cards */}
            <div className="grid grid-cols-3 gap-2">
              <Card className="bg-gray-800 border-none rounded-lg px-3 py-2">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-300">
                    Profile
                  </p>
                  <p className="text-xs font-medium text-gray-400">
                    Complete
                  </p>
                </div>
              </Card>
              
              <Card className="bg-gray-800 border-none rounded-lg px-3 py-2">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-300">
                    Active
                  </p>
                  <p className="text-xs font-medium text-gray-400">
                    Supplements
                  </p>
                </div>
              </Card>
              
              <Card className="bg-gray-800 border-none rounded-lg px-3 py-2">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-300">
                    Check-in
                  </p>
                  <p className="text-xs font-medium text-gray-400">
                    Streak
                  </p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}