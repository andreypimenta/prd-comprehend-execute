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
    <Card className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 border-none shadow-lg rounded-2xl overflow-hidden max-w-none flex flex-col">
      <CardContent className="p-0 h-full flex flex-col relative">
        {/* Decorative Squares - Top left */}
        <div className="absolute left-6 top-6 space-y-3 z-30">
          <div className="w-4 h-4 bg-white rounded-sm shadow-lg opacity-90 transition-all duration-300 hover:scale-110" />
          <div className="w-4 h-4 bg-white/70 rounded-sm shadow-lg transition-all duration-300 hover:scale-110" />
          <div className="w-4 h-4 bg-black rounded-sm shadow-lg opacity-60 transition-all duration-300 hover:scale-110" />
        </div>
        
        {/* Photo Background - Right Side */}
        <div className="absolute top-0 right-0 bottom-0 w-2/3 z-10">
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat rounded-r-2xl opacity-70"
            style={{
              backgroundImage: `url(${wellnessImage})`,
            }}
          />
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col justify-end relative z-20 p-6">
          {/* Black Graph Card - Bottom positioning for visibility */}
          <Card className="bg-black/95 border border-white/20 rounded-xl shadow-2xl backdrop-blur-sm">
            <CardContent className="p-6">
              {/* Three Premium Charts */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                {/* Progress Circle */}
                <div className="flex flex-col items-center group">
                  <div className="transition-transform duration-300 hover:scale-105">
                    <CircularProgress
                      value={getProfileCompleteness()}
                      size={100}
                      strokeWidth={6}
                      variant="modern"
                      showValue
                    />
                  </div>
                </div>
                
                {/* Onion Chart */}
                <div className="flex flex-col items-center group">
                  <div className="transition-transform duration-300 hover:scale-105">
                    <OnionChart
                      value={selectedSupplements.filter(s => s.is_active).length * 20}
                      size={100}
                      showValue
                    />
                  </div>
                </div>
                
                {/* Speedometer Chart */}
                <div className="flex flex-col items-center group">
                  <div className="transition-transform duration-300 hover:scale-105">
                    <SpeedometerChart
                      value={getCheckinConsistency()}
                      size={100}
                      showValue
                    />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-900/50 rounded-lg border border-white/5">
                  <p className="text-sm font-semibold text-white">Profile</p>
                  <p className="text-xs text-gray-400 mt-1">Complete</p>
                </div>
                
                <div className="text-center p-3 bg-gray-900/50 rounded-lg border border-white/5">
                  <p className="text-sm font-semibold text-white">Active</p>
                  <p className="text-xs text-gray-400 mt-1">Supplements</p>
                </div>
                
                <div className="text-center p-3 bg-gray-900/50 rounded-lg border border-white/5">
                  <p className="text-sm font-semibold text-white">Check-in</p>
                  <p className="text-xs text-gray-400 mt-1">Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}