import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Bell, Search, Menu, User, Settings, LogOut, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-glow">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              LoL Engine
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/dashboard" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/onboarding" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Análise IA
            </Link>
            <Link 
              to="/results" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Recomendações
            </Link>
            <Link 
              to="/checkin" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Check-in
            </Link>
            <Link 
              to="/progress" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Progresso
            </Link>
            <Link 
              to="/showcase" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Design System
            </Link>
          </nav>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="search"
              placeholder="Buscar suplementos..."
              className="pl-10 pr-4 py-2 w-64 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full"></span>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.name || user?.email || ""} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-primary-glow text-white">
                      {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border border-border shadow-md" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.user_metadata?.name || 'Usuário'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Criar conta</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}