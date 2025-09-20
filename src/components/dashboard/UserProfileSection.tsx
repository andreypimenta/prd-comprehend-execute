import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AvatarUpload } from "@/components/ui/avatar-upload"
import { CircularProgress } from "@/components/ui/circular-progress"
import { useUserProfile } from "@/hooks/useUserProfile"
import { useSelectedSupplements } from "@/hooks/useSelectedSupplements"
import { useCheckin } from "@/hooks/useCheckin"
import { User, TrendingUp, Pill, Calendar, DollarSign } from "lucide-react"
import { useState } from "react"

export function UserProfileSection() {
  const { profile, loading: profileLoading } = useUserProfile()
  const { selectedSupplements, loading: supplementsLoading } = useSelectedSupplements()
  const { getProgressSummary, loading: checkinLoading } = useCheckin()
  const [profileImage, setProfileImage] = useState<string>()
  
  const progressSummary = getProgressSummary()
  const activeSupplements = selectedSupplements?.filter(s => s.is_active) || []
  const adherencePercentage = progressSummary?.average_compliance ?? 0

  // Monthly statistics
  const monthlyCost = activeSupplements.length * 89.90 // Average cost per supplement
  const monthlyBudget = 500.00
  const costPercentage = (monthlyCost / monthlyBudget) * 100

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setProfileImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  if (profileLoading || supplementsLoading || checkinLoading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
        <div className="h-48 bg-muted animate-pulse rounded-lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card className="bg-card border-border/50">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <AvatarUpload 
              src={profileImage}
              name={profile?.age ? `User ${profile.age}` : "User"}
              size="xl"
              editable
              onUpload={handleImageUpload}
            />
          </div>
          <CardTitle className="text-xl font-bold text-card-foreground">
            Your Plan Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">Age</p>
              <p className="font-bold text-foreground text-lg">{profile?.age || "--"}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Gender</p>
              <p className="font-bold text-foreground text-lg capitalize">{profile?.gender || "--"}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Weight</p>
              <p className="font-bold text-foreground text-lg">{profile?.weight || "--"} kg</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Height</p>
              <p className="font-bold text-foreground text-lg">{profile?.height || "--"} cm</p>
            </div>
          </div>

          {/* Plan Type */}
          <div className="text-center py-4 bg-primary/10 rounded-lg border border-primary/20">
            <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
              PREMIUM PLAN
            </Badge>
          </div>

          {/* Large Circular Progress */}
          <div className="flex justify-center py-6">
            <CircularProgress 
              value={adherencePercentage}
              size={140}
              strokeWidth={12}
              color="hsl(var(--primary))"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {Math.round(adherencePercentage)}%
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Adherence
                </div>
              </div>
            </CircularProgress>
          </div>

          {/* Monthly Spending */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Monthly Spending</span>
              </div>
              <span className="font-bold text-primary">
                ${monthlyCost.toFixed(2)} / ${monthlyBudget.toFixed(2)}
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-500"
                style={{ width: `${Math.min(costPercentage, 100)}%` }}
              />
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              {costPercentage > 100 ? 'Over budget' : `${(100 - costPercentage).toFixed(0)}% remaining`}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}