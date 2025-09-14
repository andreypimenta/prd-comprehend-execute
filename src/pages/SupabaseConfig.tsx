import { SupabaseConfigInfo } from "@/components/auth/SupabaseConfigInfo";

export default function SupabaseConfig() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <SupabaseConfigInfo />
    </div>
  );
}