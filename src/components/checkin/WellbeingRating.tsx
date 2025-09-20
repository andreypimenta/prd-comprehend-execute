import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WellbeingRatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  icon?: string;
}

export const WellbeingRating = ({ 
  label, 
  value, 
  onChange, 
  description,
  icon = "⭐"
}: WellbeingRatingProps) => {
  const getEmoji = (rating: number) => {
    if (rating <= 1) return "😟";
    if (rating <= 2) return "😕";
    if (rating <= 3) return "😐";
    if (rating <= 4) return "🙂";
    return "😊";
  };

  const getColorClass = (rating: number) => {
    if (rating <= 2) return "text-destructive";
    if (rating <= 3) return "text-warning";
    return "text-success";
  };

  const getRatingText = (rating: number) => {
    const labels = ["", "Muito baixo", "Baixo", "Médio", "Bom", "Excelente"];
    return labels[rating] || "Médio";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <span>{label}</span>
          </div>
          <div className={`text-center ${getColorClass(value)}`}>
            <div className="text-2xl">{getEmoji(value)}</div>
            <div className="text-lg font-bold">{value}/5</div>
          </div>
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Muito baixo (1)</span>
            <span className="text-center font-medium text-foreground">
              {getRatingText(value)}
            </span>
            <span>Excelente (5)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};