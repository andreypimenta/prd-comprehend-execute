import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const evidenceBadgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      evidence: {
        strong: "bg-evidence-strong text-primary-white shadow-sm",
        moderate: "bg-evidence-moderate text-primary-white shadow-sm", 
        limited: "bg-evidence-limited text-primary-navy shadow-sm",
        inconclusive: "bg-evidence-inconclusive text-text-darkGray shadow-sm"
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm"
      }
    },
    defaultVariants: {
      evidence: "strong",
      size: "md"
    }
  }
);

export interface EvidenceBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof evidenceBadgeVariants> {
  children?: React.ReactNode;
}

const EvidenceBadge = React.forwardRef<HTMLDivElement, EvidenceBadgeProps>(
  ({ className, evidence, size, children, ...props }, ref) => {
    const getEvidenceLabel = (evidenceType: string | undefined | null) => {
      switch (evidenceType) {
        case "strong":
          return "Evidência Forte";
        case "moderate":
          return "Evidência Moderada";
        case "limited":
          return "Evidência Limitada";
        case "inconclusive":
          return "Evidência Inconclusiva";
        default:
          return "Evidência";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(evidenceBadgeVariants({ evidence, size }), className)}
        {...props}
      >
        {children || getEvidenceLabel(evidence)}
      </div>
    );
  }
);

EvidenceBadge.displayName = "EvidenceBadge";

export { EvidenceBadge, evidenceBadgeVariants };