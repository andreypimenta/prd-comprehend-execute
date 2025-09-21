import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showValue?: boolean;
  children?: React.ReactNode;
  variant?: "default" | "modern";
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = "hsl(var(--primary))",
  trackColor = "hsl(var(--muted))",
  showValue = true,
  children,
  className,
  variant = "default",
  ...props
}: CircularProgressProps) {
  const normalizedValue = Math.max(0, Math.min(max, value));
  const percentage = (normalizedValue / max) * 100;
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Modern variant uses gray track and white progress
  const finalTrackColor = variant === "modern" ? "hsl(var(--muted-foreground) / 0.2)" : trackColor;
  const finalProgressColor = variant === "modern" ? "white" : color;
  const finalTextColor = variant === "modern" ? "white" : color;

  return (
    <div 
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={finalTrackColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className={variant === "modern" ? "" : "opacity-20"}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={finalProgressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
          style={variant === "default" ? {
            filter: `drop-shadow(0 0 8px ${color}40)`
          } : {}}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showValue && (
          <div className="text-center">
            <span className="text-2xl font-bold" style={{ color: finalTextColor }}>
              {Math.round(percentage)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}