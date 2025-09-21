import { Home, TrendingUp, CheckCircle, Pill, Settings, LogOut } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Progresso", url: "/progress", icon: TrendingUp },
  { title: "Check-ins", url: "/checkin", icon: CheckCircle },
  { title: "Suplementos", url: "/results", icon: Pill },
  { title: "Configurações", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const location = useLocation()
  const currentPath = location.pathname
  const { signOut } = useAuth()

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground" 
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <Sidebar
      className="w-16 border-r border-border bg-card"
      collapsible="icon"
    >
      <SidebarContent className="bg-card flex flex-col items-center py-4 justify-between h-full">
        <SidebarMenu className="space-y-2">
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="w-12 h-12 p-0">
                <NavLink 
                  to={item.url} 
                  end 
                  className={({ isActive }) => `
                    ${getNavCls({ isActive })}
                    flex items-center justify-center rounded-lg transition-all duration-200
                  `}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <SidebarFooter className="p-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleLogout}
                className="w-12 h-12 p-0 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}