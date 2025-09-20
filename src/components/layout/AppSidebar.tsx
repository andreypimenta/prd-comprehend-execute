import { Home, TrendingUp, CheckCircle, Pill, Settings, User } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserProfile } from "@/hooks/useUserProfile"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Progresso", url: "/progress", icon: TrendingUp },
  { title: "Check-ins", url: "/checkin", icon: CheckCircle },
  { title: "Suplementos", url: "/results", icon: Pill },
  { title: "Configurações", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { open } = useSidebar()
  const location = useLocation()
  const { profile, loading } = useUserProfile()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium border-r-2 border-primary" 
      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"

  return (
    <Sidebar
      className="border-r border-sidebar-border bg-sidebar"
      collapsible="icon"
    >
      <SidebarContent className="bg-sidebar">
        {/* User Profile Section */}
        {open && (
          <div className="p-6 border-b border-sidebar-border bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                  {!loading && profile ? profile.age?.toString().slice(-2) || "U" : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Usuário
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {!loading && profile ? "Ativo" : "Carregando..."}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className={`${!open ? "sr-only" : ""} text-sidebar-foreground/70 text-xs font-semibold uppercase tracking-wider`}>
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        ${getNavCls({ isActive })}
                        flex items-center rounded-lg px-3 py-2 transition-all duration-200
                        ${!open ? "justify-center" : ""}
                      `}
                    >
                      <item.icon className={`h-5 w-5 ${!open ? "" : "mr-3"} flex-shrink-0`} />
                      {open && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Section */}
        {open && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-sidebar-foreground/70" />
              <span className="text-xs text-sidebar-foreground/70">Perfil Completo</span>
              <Badge variant="outline" className="text-xs ml-auto">
                {!loading && profile ? "85%" : "--"}
              </Badge>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}