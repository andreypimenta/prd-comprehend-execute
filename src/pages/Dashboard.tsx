import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { UserStatsSection } from "@/components/dashboard/UserStatsSection";
import { PlanDetailsSection } from "@/components/dashboard/PlanDetailsSection";
import { ProfileWidgetsSection } from "@/components/dashboard/ProfileWidgetsSection";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Dashboard() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Visão Geral</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
        </div>
      </SidebarInset>
    </>
  );
}