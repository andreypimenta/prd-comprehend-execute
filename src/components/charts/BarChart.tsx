// components/charts/BarChart.tsx
interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  height?: number;
  color?: string;
}

export function BarChart({ data, height = 300, color = 'hsl(var(--primary))' }: BarChartProps) {
  if (!data.length) return null;
  
  const maxValue = Math.max(...data.map(item => item.value));
  const barWidth = Math.max(40, 200 / data.length);
  const chartWidth = data.length * (barWidth + 10) + 40;
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="relative" style={{ height, minWidth: chartWidth }}>
        <svg width={chartWidth} height={height} className="w-full h-full">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="1" height="20" patternUnits="userSpaceOnUse">
              <path d="M 1 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const y = height - 60 - ratio * (height - 100);
            const value = Math.round(maxValue * ratio);
            return (
              <g key={index}>
                <line x1="30" y1={y} x2={chartWidth - 20} y2={y} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
                <text x="25" y={y + 4} textAnchor="end" className="text-xs fill-muted-foreground">
                  {value}
                </text>
              </g>
            );
          })}
          
          {/* Bars */}
          {data.map((item, index) => {
            const x = 40 + index * (barWidth + 10);
            const barHeight = (item.value / maxValue) * (height - 100);
            const y = height - 60 - barHeight;
            
            return (
              <g key={index}>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={item.color || color}
                  rx="4"
                  ry="4"
                  className="transition-all duration-300 hover:opacity-80"
                />
                
                {/* Value label */}
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="text-xs font-medium fill-foreground"
                >
                  {item.value}
                </text>
                
                {/* X-axis label */}
                <text
                  x={x + barWidth / 2}
                  y={height - 40}
                  textAnchor="middle"
                  className="text-xs fill-muted-foreground"
                >
                  {item.name}
                </text>
              </g>
            );
          })}
          
          {/* X-axis line */}
          <line x1="30" y1={height - 60} x2={chartWidth - 20} y2={height - 60} stroke="hsl(var(--border))" strokeWidth="1" />
          
          {/* Y-axis line */}
          <line x1="30" y1="20" x2="30" y2={height - 60} stroke="hsl(var(--border))" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}