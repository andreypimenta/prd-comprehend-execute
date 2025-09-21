import { UserProfileSection } from "@/components/dashboard/UserProfileSection";
import { PlanDocumentsSection } from "@/components/dashboard/PlanDocumentsSection";
import { CalendarActionsSection } from "@/components/dashboard/CalendarActionsSection";
import { AppLayout } from "@/components/layout/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard">
      <div className="h-[calc(100vh-64px)] w-full max-w-none bg-background overflow-hidden">
        {/* Three Column Layout with Visible Border and Rounded Corners */}
        <div className="grid lg:grid-cols-12 gap-4 p-4 mr-4 my-2 h-[calc(100%-16px)] border-2 border-border rounded-2xl bg-card/50 backdrop-blur-sm shadow-lg">
          {/* Left Column - User Profile & Statistics (5 columns - increased width) */}
          <div className="lg:col-span-5 flex h-full">
            <UserProfileSection />
          </div>

          {/* Center Column - Plan Documents & Details (4 columns - reduced) */}
          <div className="lg:col-span-4 flex h-full">
            <PlanDocumentsSection />
          </div>

          {/* Right Column - Calendar & Actions (3 columns) */}
          <div className="lg:col-span-3 flex h-full">
            <CalendarActionsSection />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}