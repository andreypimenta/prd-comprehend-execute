import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ConfirmationPage } from "@/components/auth/ConfirmationPage";
import SupabaseConfig from "./pages/SupabaseConfig";
import GoogleOAuthSetup from "./pages/GoogleOAuthSetup";
import GoogleOAuthDiagnostic from "./pages/GoogleOAuthDiagnostic";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Results from "./pages/Results";
import Checkin from "./pages/Checkin";
import Progress from "./pages/Progress";
import Showcase from "./pages/Showcase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
          <Route path="/supabase-config" element={<SupabaseConfig />} />
          <Route path="/google-oauth-setup" element={<GoogleOAuthSetup />} />
          <Route path="/google-oauth-diagnostic" element={<GoogleOAuthDiagnostic />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          } />
          <Route path="/checkin" element={
            <ProtectedRoute>
              <Checkin />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          } />
          <Route path="/showcase" element={<Showcase />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
