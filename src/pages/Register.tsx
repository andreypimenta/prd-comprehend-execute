import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router-dom";
import { Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Register() {
  return <div className="min-h-screen flex">
      {/* Left side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao início
              </Link>
            </Button>
          </div>
          <RegisterForm />
        </div>
      </div>

      {/* Right side - Hero Section */}
      
    </div>;
}