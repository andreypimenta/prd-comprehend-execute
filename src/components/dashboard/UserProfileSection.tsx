import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/contexts/AuthContext";

export function UserProfileSection() {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile();

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
          Your Plan Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Large User Photo */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                {profile?.age?.toString().slice(-2) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Three Progress Circles */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center space-y-2">
            <CircularProgress
              value={75}
              size={64}
              strokeWidth={6}
              color="hsl(var(--primary))"
              showValue
            />
            <div className="text-center">
              <p className="text-xs font-medium text-muted-foreground">
                Current
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Expenses
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <CircularProgress
              value={85}
              size={64}
              strokeWidth={6}
              color="hsl(var(--primary))"
              showValue
            />
            <div className="text-center">
              <p className="text-xs font-medium text-muted-foreground">
                General
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Health
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <CircularProgress
              value={38}
              size={64}
              strokeWidth={6}
              color="hsl(var(--primary))"
              showValue
            />
            <div className="text-center">
              <p className="text-xs font-medium text-muted-foreground">
                Spending More
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Than Last Month
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}