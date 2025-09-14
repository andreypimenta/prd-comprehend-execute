import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-heading tracking-wide",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:shadow-primary/25",
        electric: "bg-primary-electric text-white hover:bg-primary-electric/90 shadow-lg hover:shadow-electric",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
        gold: "bg-secondary-gold text-white hover:bg-secondary-gold/90 shadow-lg hover:shadow-gold/25",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-green/25",
        purple: "bg-accent-purple text-white hover:bg-accent-purple/90 shadow-lg hover:shadow-purple/25",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors",
        ghost: "text-foreground hover:bg-muted hover:text-foreground/90",
        success: "bg-status-success text-white hover:bg-status-success/90 shadow-lg",
        warning: "bg-status-warning text-white hover:bg-status-warning/90 shadow-lg",
        error: "bg-status-error text-white hover:bg-status-error/90 shadow-lg",
        link: "text-primary underline-offset-4 hover:underline font-normal",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
