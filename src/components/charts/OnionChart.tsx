import React from 'react';

interface OnionChartProps {
  value: number;
  size?: number;
  showValue?: boolean;
}

export function OnionChart({ value, size = 60, showValue = true }: OnionChartProps) {
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = size / 2 - 6;
  
  // Create multiple concentric circles for onion effect
  const circles = [
    { r: radius * 0.9, opacity: 0.3 },
    { r: radius * 0.7, opacity: 0.5 },
    { r: radius * 0.5, opacity: 0.7 },
    { r: radius * 0.3, opacity: 0.9 }
  ];
  
  const activeCircles = Math.ceil((percentage / 100) * circles.length);
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circles */}
        {circles.map((circle, index) => (
          <circle
            key={`bg-${index}`}
            cx={size / 2}
            cy={size / 2}
            r={circle.r}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="2"
            opacity="0.3"
          />
        ))}
        
        {/* Active circles based on value */}
        {circles.slice(0, activeCircles).map((circle, index) => (
          <circle
            key={`active-${index}`}
            cx={size / 2}
            cy={size / 2}
            r={circle.r}
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity={circle.opacity}
          />
        ))}
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}