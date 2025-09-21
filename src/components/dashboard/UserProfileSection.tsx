import { Card, CardContent } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { OnionChart } from "@/components/charts/OnionChart";
import { SpeedometerChart } from "@/components/charts/SpeedometerChart";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useSelectedSupplements } from "@/hooks/useSelectedSupplements";
import { useCheckin } from "@/hooks/useCheckin";
import wellnessImage from "@/assets/supplements-wellness-1.jpg";

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
      <Card className="w-full bg-gray-600 p-6 rounded-2xl min-h-[500px]">
        <div className="space-y-6">
          <div className="h-40 w-full bg-muted animate-pulse rounded-xl mx-auto" />
          <div className="h-48 bg-black/60 animate-pulse rounded-xl" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-gray-600 border-none shadow-lg rounded-2xl overflow-hidden min-h-[650px] max-w-none relative">
      <CardContent className="p-6 space-y-8 h-full">
        {/* Decorative Squares - Fixed positioning */}
        <div className="absolute right-6 top-16 space-y-6 z-10">
          <div className="w-4 h-4 bg-white rounded-sm shadow-lg opacity-90" />
          <div className="w-4 h-4 bg-white rounded-sm shadow-lg opacity-70" />
          <div className="w-4 h-4 bg-black rounded-sm shadow-lg opacity-60" />
        </div>
        
        {/* Enhanced "Cut and Paste" Photo */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm">
            <img 
              src={wellnessImage} 
              alt="User Profile" 
              className="h-48 w-full object-cover rounded-xl border-2 border-white shadow-xl"
              style={{ filter: 'brightness(1.1) contrast(1.05)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
          </div>
        </div>

        {/* Enhanced Black Card with Premium Graphs */}
        <Card className="bg-black/95 border-none rounded-xl shadow-2xl">
          <CardContent className="p-8">
            {/* Three Enhanced Premium Charts */}
            <div className="grid grid-cols-3 gap-8 mb-6">
              {/* Enhanced Progress Circle */}
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={getProfileCompleteness()}
                  size={80}
                  strokeWidth={6}
                  variant="modern"
                  showValue
                />
              </div>
              
              {/* Enhanced Onion Chart */}
              <div className="flex flex-col items-center">
                <OnionChart
                  value={selectedSupplements.filter(s => s.is_active).length * 20}
                  size={80}
                  showValue
                />
              </div>
              
              {/* Enhanced Speedometer Chart */}
              <div className="flex flex-col items-center">
                <SpeedometerChart
                  value={getCheckinConsistency()}
                  size={80}
                  showValue
                />
              </div>
            </div>

            {/* Enhanced Labels in Dark Gray Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-gray-800/80 border-none rounded-lg px-4 py-3 shadow-inner">
                <div className="text-center">
                  <p className="text-xs font-semibold text-white">
                    Profile
                  </p>
                  <p className="text-xs font-medium text-gray-300">
                    Complete
                  </p>
                </div>
              </Card>
              
              <Card className="bg-gray-800/80 border-none rounded-lg px-4 py-3 shadow-inner">
                <div className="text-center">
                  <p className="text-xs font-semibold text-white">
                    Active
                  </p>
                  <p className="text-xs font-medium text-gray-300">
                    Supplements
                  </p>
                </div>
              </Card>
              
              <Card className="bg-gray-800/80 border-none rounded-lg px-4 py-3 shadow-inner">
                <div className="text-center">
                  <p className="text-xs font-semibold text-white">
                    Check-in
                  </p>
                  <p className="text-xs font-medium text-gray-300">
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