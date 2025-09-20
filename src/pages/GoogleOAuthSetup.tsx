import { GoogleOAuthConfig } from "@/components/auth/GoogleOAuthConfig";

export default function GoogleOAuthSetup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <GoogleOAuthConfig />
    </div>
  );
}