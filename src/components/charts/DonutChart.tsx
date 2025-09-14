// components/charts/DonutChart.tsx
import { useMemo } from 'react';
import type { ChartDataPoint } from '@/types/dashboard';

interface DonutChartProps {
  data: ChartDataPoint[];
  centerText?: string;
  size?: number;
}

export function DonutChart({ data, centerText, size = 200 }: DonutChartProps) {
  const { paths, total } = useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    const paths = data.map((item) => {
      const percentage = (item.value / total) * 100;
      const startAngle = cumulativePercentage * 3.6; // Convert to degrees
      const endAngle = (cumulativePercentage + percentage) * 3.6;

      cumulativePercentage += percentage;

      const startAngleRad = (startAngle - 90) * (Math.PI / 180);
      const endAngleRad = (endAngle - 90) * (Math.PI / 180);

      const largeArcFlag = percentage > 50 ? 1 : 0;
      const radius = 80;
      const innerRadius = 50;

      const x1 = 100 + radius * Math.cos(startAngleRad);
      const y1 = 100 + radius * Math.sin(startAngleRad);
      const x2 = 100 + radius * Math.cos(endAngleRad);
      const y2 = 100 + radius * Math.sin(endAngleRad);

      const x3 = 100 + innerRadius * Math.cos(endAngleRad);
      const y3 = 100 + innerRadius * Math.sin(endAngleRad);
      const x4 = 100 + innerRadius * Math.cos(startAngleRad);
      const y4 = 100 + innerRadius * Math.sin(startAngleRad);

      const pathData = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
        'Z'
      ].join(' ');

      return {
        path: pathData,
        color: item.color,
        label: item.label,
        value: item.value,
        percentage: Math.round(percentage)
      };
    });

    return { paths, total };
  }, [data]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <svg width={size} height={size} viewBox="0 0 200 200" className="drop-shadow-sm">
        {paths.map((path, index) => (
          <path
            key={index}
            d={path.path}
            fill={path.color}
            stroke="white"
            strokeWidth="2"
            className="transition-all duration-300 hover:opacity-80"
          />
        ))}
        {centerText && (
          <text
            x="100"
            y="105"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-semibold fill-foreground"
          >
            {centerText}
          </text>
        )}
      </svg>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {paths.map((path, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: path.color }}
            />
            <span className="text-muted-foreground">
              {path.label}: {path.value} ({path.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}