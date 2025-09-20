import * as React from "react";
import { Camera, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AvatarUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  editable?: boolean;
  onUpload?: (file: File) => void;
}

const sizeMap = {
  sm: "h-10 w-10",
  md: "h-16 w-16", 
  lg: "h-24 w-24",
  xl: "h-32 w-32"
};

export function AvatarUpload({ 
  src, 
  alt, 
  name = "User", 
  size = "lg", 
  editable = false, 
  onUpload,
  className,
  ...props 
}: AvatarUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <Avatar className={cn(sizeMap[size], "border-2 border-primary/20")}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
          {src ? <User className="h-1/2 w-1/2" /> : getInitials(name)}
        </AvatarFallback>
      </Avatar>
      
      {editable && (
        <>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-background border-2 hover:bg-primary hover:text-primary-foreground"
            onClick={handleUploadClick}
          >
            <Camera className="h-4 w-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}