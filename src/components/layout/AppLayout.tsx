import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const navigationItems = [
  { title: "Home", href: "/dashboard" },
  { title: "Payments", href: "/payments" },
  { title: "Planning", href: "/planning" },
  { title: "Hospitals", href: "/hospitals" },
];

export function AppLayout({ children, title = "Dashboard" }: AppLayoutProps) {
  const { profile } = useUserProfile();

  return (
    <>
      <AppSidebar />
      <SidebarInset className="ml-0 mr-0 mt-0 mb-0 p-0">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between pl-2 pr-6 bg-background border-b border-border">
          {/* Horizontal Navigation */}
          <nav className="flex items-center space-x-8">
            {navigationItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          {/* User Greeting */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Hi, Usuário</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                U
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 max-w-none w-full">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}