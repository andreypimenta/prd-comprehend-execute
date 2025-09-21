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
        {/* Enhanced background track */}
        <path
          d={`M ${size/2 - radius * Math.cos(135 * Math.PI / 180)} ${size/2 - radius * Math.sin(135 * Math.PI / 180)} 
              A ${radius} ${radius} 0 1 1 
              ${size/2 - radius * Math.cos(45 * Math.PI / 180)} ${size/2 - radius * Math.sin(45 * Math.PI / 180)}`}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Progress track */}
        <path
          d={`M ${size/2 - radius * Math.cos(135 * Math.PI / 180)} ${size/2 - radius * Math.sin(135 * Math.PI / 180)} 
              A ${radius} ${radius} 0 ${percentage > 50 ? 1 : 0} 1 
              ${size/2 + radius * Math.cos((135 + (percentage / 100) * 270) * Math.PI / 180)} ${size/2 + radius * Math.sin((135 + (percentage / 100) * 270) * Math.PI / 180)}`}
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
          className="transition-all duration-500 ease-out"
        />
        
        {/* Glowing ball */}
        <circle
          cx={ballX}
          cy={ballY}
          r="5"
          fill="white"
          className="drop-shadow-lg transition-all duration-500 ease-out"
          style={{ filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.6))' }}
        />
        
        {/* Enhanced center dot */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="3"
          fill="white"
          opacity="0.8"
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