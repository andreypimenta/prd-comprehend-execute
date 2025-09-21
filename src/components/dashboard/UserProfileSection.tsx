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
      <CardContent className="p-0 h-full relative">
        {/* Decorative Squares - Left side positioning */}
        <div className="absolute left-6 top-16 space-y-4 z-10">
          <div className="w-5 h-5 bg-white rounded-sm shadow-lg opacity-90 transition-all duration-300 hover:scale-110" />
          <div className="w-5 h-5 bg-white rounded-sm shadow-lg opacity-70 transition-all duration-300 hover:scale-110" />
          <div className="w-5 h-5 bg-black rounded-sm shadow-lg opacity-60 transition-all duration-300 hover:scale-110" />
        </div>
        
        {/* Photo positioned top-right, full height */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden rounded-r-2xl">
          <img 
            src={wellnessImage} 
            alt="User Profile" 
            className="h-full w-full object-cover opacity-80"
            style={{ 
              filter: 'brightness(0.9) contrast(1.1) saturate(0.8)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)'
            }}
          />
        </div>

        {/* Black Card overlaid on photo, positioned near bottom */}
        <Card className="absolute bottom-6 right-6 left-1/2 bg-black/98 border border-white/10 rounded-xl shadow-2xl backdrop-blur-sm z-20 transition-all duration-500 hover:shadow-3xl">
          <CardContent className="p-8">
            {/* Three Enhanced Premium Charts */}
            <div className="grid grid-cols-3 gap-12 mb-8">
              {/* Enhanced Progress Circle */}
              <div className="flex flex-col items-center group animate-fade-in">
                <div className="transition-transform duration-300 hover:scale-110">
                  <CircularProgress
                    value={getProfileCompleteness()}
                    size={120}
                    strokeWidth={8}
                    variant="modern"
                    showValue
                  />
                </div>
              </div>
              
              {/* Enhanced Onion Chart */}
              <div className="flex flex-col items-center group animate-fade-in animation-delay-200">
                <div className="transition-transform duration-300 hover:scale-110">
                  <OnionChart
                    value={selectedSupplements.filter(s => s.is_active).length * 20}
                    size={120}
                    showValue
                  />
                </div>
              </div>
              
              {/* Enhanced Speedometer Chart */}
              <div className="flex flex-col items-center group animate-fade-in animation-delay-400">
                <div className="transition-transform duration-300 hover:scale-110">
                  <SpeedometerChart
                    value={getCheckinConsistency()}
                    size={120}
                    showValue
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Labels in Premium Dark Cards */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="bg-gray-900/90 border border-white/5 rounded-lg px-4 py-4 shadow-inner transition-all duration-300 hover:bg-gray-800/90 hover:border-white/10">
                <div className="text-center">
                  <p className="text-sm font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Profile
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-1">
                    Complete
                  </p>
                </div>
              </Card>
              
              <Card className="bg-gray-900/90 border border-white/5 rounded-lg px-4 py-4 shadow-inner transition-all duration-300 hover:bg-gray-800/90 hover:border-white/10">
                <div className="text-center">
                  <p className="text-sm font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Active
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-1">
                    Supplements
                  </p>
                </div>
              </Card>
              
              <Card className="bg-gray-900/90 border border-white/5 rounded-lg px-4 py-4 shadow-inner transition-all duration-300 hover:bg-gray-800/90 hover:border-white/10">
                <div className="text-center">
                  <p className="text-sm font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Check-in
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-1">
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