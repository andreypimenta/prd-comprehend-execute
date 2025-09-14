// Simple chart components for dashboard
import React from "react";
import { cn } from "@/lib/utils";

// Simple chart context for basic functionality
const ChartContext = React.createContext<{ config: Record<string, any> }>({
  config: {},
});

export const useChart = () => {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a ChartContainer");
  }
  return context;
};

// Chart container component
interface ChartContainerProps {
  config: Record<string, any>;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({ config, children, className }: ChartContainerProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("w-full h-full", className)}>
        {children}
      </div>
    </ChartContext.Provider>
  );
}

// Simple tooltip component
interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  className?: string;
  content?: React.ComponentType<any>;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "dot" | "line" | "dashed";
  nameKey?: string;
  labelKey?: string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  className,
  content,
  hideLabel = false,
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  if (content) {
    const Content = content;
    return <Content active={active} payload={payload} label={label} />;
  }

  return (
    <div className={cn(
      "rounded-lg border bg-background p-3 shadow-md",
      className
    )}>
      {!hideLabel && label && (
        <div className="font-medium mb-1">{label}</div>
      )}
      <div className="space-y-1">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-medium">{item.name}:</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple tooltip content component
export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  hideIndicator = false,
  className,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  className?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className={cn(
      "rounded-lg border bg-background p-3 shadow-md",
      className
    )}>
      {!hideLabel && label && (
        <div className="font-medium text-foreground mb-2">{label}</div>
      )}
      <div className="space-y-1">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {!hideIndicator && (
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="text-muted-foreground">{item.name}:</span>
            <span className="font-medium text-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Legend component
interface ChartLegendProps {
  content?: React.ComponentType<any>;
  className?: string;
}

export function ChartLegend({ content, className }: ChartLegendProps) {
  if (content) {
    const Content = content;
    return <Content className={className} />;
  }
  return null;
}

// Legend content component
export function ChartLegendContent({
  payload,
  className,
}: {
  payload?: any[];
  className?: string;
}) {
  if (!payload?.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-4 text-sm", className)}>
      {payload.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
}