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
    <Card className="w-full bg-gray-600 border-none shadow-lg rounded-2xl overflow-hidden min-h-[500px] relative">
      <CardContent className="p-6 space-y-6 h-full">
        {/* "Cut and Paste" Photo */}
        <div className="flex justify-center">
          <div className="relative">
            <img 
              src={wellnessImage} 
              alt="User Profile" 
              className="h-40 w-full object-cover rounded-xl border-2 border-white shadow-xl"
              style={{ filter: 'brightness(1.1) contrast(1.05)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
          </div>
        </div>

        {/* Decorative Squares - Side positioned at different heights */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-4">
          <div className="w-3 h-3 bg-white rounded-sm shadow-sm" />
          <div className="w-3 h-3 bg-black rounded-sm border border-white/20" />
          <div className="w-3 h-3 bg-white rounded-sm shadow-sm" />
        </div>

        {/* Black Horizontal Card with Premium Graphs */}
        <Card className="bg-black/90 border-none rounded-xl shadow-inner">
          <CardContent className="p-6">
            {/* Three Different Premium Charts */}
            <div className="grid grid-cols-3 gap-6 mb-4">
              {/* Simple Progress Circle */}
              <div className="flex flex-col items-center">
                <CircularProgress
                  value={getProfileCompleteness()}
                  size={60}
                  strokeWidth={5}
                  variant="modern"
                  showValue
                />
              </div>
              
              {/* Onion Chart - Multiple concentric circles */}
              <div className="flex flex-col items-center">
                <OnionChart
                  value={selectedSupplements.filter(s => s.is_active).length * 20}
                  size={60}
                  showValue
                />
              </div>
              
              {/* Speedometer Chart - Moving ball */}
              <div className="flex flex-col items-center">
                <SpeedometerChart
                  value={getCheckinConsistency()}
                  size={60}
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