import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative h-4 w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-secondary-lightGray",
        success: "bg-status-success/20",
        warning: "bg-status-warning/20", 
        error: "bg-status-error/20",
        info: "bg-status-info/20"
      },
      size: {
        sm: "h-2",
        md: "h-4",
        lg: "h-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const indicatorVariants = cva(
  "h-full w-full flex-1 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary-navy",
        success: "bg-status-success",
        warning: "bg-status-warning",
        error: "bg-status-error", 
        info: "bg-status-info"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface AdvancedProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  showLabel?: boolean;
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

const AdvancedProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  AdvancedProgressProps
>(({ 
  className, 
  value = 0, 
  variant, 
  size, 
  showLabel = false, 
  label, 
  showPercentage = false,
  animated = true,
  ...props 
}, ref) => {
  const percentage = Math.round(value || 0);
  
  return (
    <div className="space-y-2">
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center text-sm">
          {showLabel && label && (
            <span className="font-medium text-text-darkGray">{label}</span>
          )}
          {showPercentage && (
            <span className="text-text-mediumGray">{percentage}%</span>
          )}
        </div>
      )}
      
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressVariants({ variant, size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            indicatorVariants({ variant }),
            animated && "transition-transform duration-700 ease-out"
          )}
          style={{ 
            transform: `translateX(-${100 - (value || 0)}%)`,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});

AdvancedProgress.displayName = "AdvancedProgress";

export { AdvancedProgress, progressVariants, indicatorVariants };