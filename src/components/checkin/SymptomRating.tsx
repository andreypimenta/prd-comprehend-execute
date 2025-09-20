import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SymptomRatingProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  lowLabel?: string;
  highLabel?: string;
}

export const SymptomRating = ({ 
  label, 
  value, 
  onChange, 
  description,
  lowLabel = "Muito baixo",
  highLabel = "Muito alto"
}: SymptomRatingProps) => {
  const getEmoji = (rating: number) => {
    if (rating <= 2) return "😴";
    if (rating <= 4) return "😕";
    if (rating <= 6) return "😐";
    if (rating <= 8) return "🙂";
    return "😊";
  };

  const getColorClass = (rating: number) => {
    if (rating <= 3) return "text-destructive";
    if (rating <= 6) return "text-warning";
    return "text-success";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{label}</span>
          <span className={`text-2xl ${getColorClass(value)}`}>
            {getEmoji(value)} {value}
          </span>
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
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{lowLabel} (1)</span>
            <span>{highLabel} (10)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};