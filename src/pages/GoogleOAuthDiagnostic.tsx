import { GoogleOAuthDiagnostic } from "@/components/auth/GoogleOAuthDiagnostic";

export default function GoogleOAuthDiagnosticPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="container mx-auto py-8">
        <GoogleOAuthDiagnostic />
      </div>
    </div>
  );
}