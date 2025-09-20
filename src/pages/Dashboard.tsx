import { UserStatsSection } from "@/components/dashboard/UserStatsSection";
import { PlanDetailsSection } from "@/components/dashboard/PlanDetailsSection";
import { ProfileWidgetsSection } from "@/components/dashboard/ProfileWidgetsSection";
import { AppLayout } from "@/components/layout/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="min-h-screen w-full">
        {/* Welcome Section */}
        <div className="mb-8 pt-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao seu Dashboard
          </h1>
          <p className="text-muted-foreground">
            Acompanhe seu progresso e gerencie seus suplementos de forma personalizada
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - User Stats (3 columns) */}
          <div className="lg:col-span-3">
            <UserStatsSection />
          </div>

          {/* Center Column - Plan Details (6 columns) */}
          <div className="lg:col-span-6">
            <PlanDetailsSection />
          </div>

          {/* Right Column - Profile & Widgets (3 columns) */}
          <div className="lg:col-span-3">
            <ProfileWidgetsSection />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}