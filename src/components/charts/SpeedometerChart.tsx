import React from 'react';

interface SpeedometerChartProps {
  value: number;
  size?: number;
  showValue?: boolean;
}

export function SpeedometerChart({ value, size = 60, showValue = true }: SpeedometerChartProps) {
  const percentage = Math.min(Math.max(value, 0), 100);
  const radius = size / 2 - 8;
  const angle = (percentage / 100) * 270 - 135; // 270 degrees range, starting from -135
  
  // Calculate ball position
  const ballRadius = radius - 4;
  const ballX = size / 2 + ballRadius * Math.cos((angle * Math.PI) / 180);
  const ballY = size / 2 + ballRadius * Math.sin((angle * Math.PI) / 180);
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size}>
        {/* Background track - partial circle */}
        <path
          d={`M ${size/2 - radius * Math.cos(135 * Math.PI / 180)} ${size/2 - radius * Math.sin(135 * Math.PI / 180)} 
              A ${radius} ${radius} 0 1 1 
              ${size/2 - radius * Math.cos(45 * Math.PI / 180)} ${size/2 - radius * Math.sin(45 * Math.PI / 180)}`}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="3"
          opacity="0.4"
        />
        
        {/* Moving ball */}
        <circle
          cx={ballX}
          cy={ballY}
          r="4"
          fill="white"
          className="drop-shadow-sm transition-all duration-300 ease-out"
        />
        
        {/* Center dot */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="2"
          fill="white"
          opacity="0.6"
        />
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center mt-3">
          <span className="text-xs font-bold text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}