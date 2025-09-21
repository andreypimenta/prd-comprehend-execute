import { UserProfileSection } from "@/components/dashboard/UserProfileSection";
import { PlanDocumentsSection } from "@/components/dashboard/PlanDocumentsSection";
import { CalendarActionsSection } from "@/components/dashboard/CalendarActionsSection";
import { AppLayout } from "@/components/layout/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="min-h-screen w-full bg-background">
        {/* Three Column Layout with White Border and Rounded Corners */}
        <div className="grid lg:grid-cols-12 gap-6 p-6 border-2 border-white/50 rounded-2xl m-4">
          {/* Left Column - User Profile & Statistics (4 columns) */}
          <div className="lg:col-span-4 flex">
            <UserProfileSection />
          </div>

          {/* Center Column - Plan Documents & Details (5 columns) */}
          <div className="lg:col-span-5 flex">
            <PlanDocumentsSection />
          </div>

          {/* Right Column - Calendar & Actions (3 columns) */}
          <div className="lg:col-span-3 flex">
            <CalendarActionsSection />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}