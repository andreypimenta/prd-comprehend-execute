import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface SymptomImprovementRatingProps {
  symptomName: string;
  currentRating: number;
  improvementRating: number;
  notes?: string;
  onCurrentChange: (value: number) => void;
  onImprovementChange: (value: number) => void;
  onNotesChange: (notes: string) => void;
}

export const SymptomImprovementRating = ({ 
  symptomName,
  currentRating,
  improvementRating,
  notes,
  onCurrentChange,
  onImprovementChange,
  onNotesChange
}: SymptomImprovementRatingProps) => {
  const getImprovementText = (rating: number) => {
    switch (rating) {
      case -2: return "Muito pior";
      case -1: return "Pior";
      case 0: return "Igual";
      case 1: return "Melhor";
      case 2: return "Muito melhor";
      default: return "Igual";
    }
  };

  const getImprovementColor = (rating: number) => {
    if (rating < 0) return "text-destructive";
    if (rating > 0) return "text-success";
    return "text-muted-foreground";
  };

  const getImprovementEmoji = (rating: number) => {
    switch (rating) {
      case -2: return "😰";
      case -1: return "😕";
      case 0: return "😐";
      case 1: return "🙂";
      case 2: return "😊";
      default: return "😐";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg capitalize">{symptomName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Level */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label>Como está hoje? (1-10)</Label>
            <Badge variant="outline" className="text-lg">
              {currentRating}/10
            </Badge>
          </div>
          <Slider
            value={[currentRating]}
            onValueChange={(values) => onCurrentChange(values[0])}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Muito baixo</span>
            <span>Muito alto</span>
          </div>
        </div>

        {/* Improvement Rating */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label>Comparado à semana passada</Label>
            <div className={`flex items-center gap-2 ${getImprovementColor(improvementRating)}`}>
              <span className="text-xl">{getImprovementEmoji(improvementRating)}</span>
              <Badge 
                variant="outline" 
                className={getImprovementColor(improvementRating)}
              >
                {getImprovementText(improvementRating)}
              </Badge>
            </div>
          </div>
          <Slider
            value={[improvementRating + 2]} // Convert -2 to +2 range to 0 to 4 for slider
            onValueChange={(values) => onImprovementChange(values[0] - 2)}
            max={4}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Muito pior</span>
            <span>Igual</span>
            <span>Muito melhor</span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor={`notes-${symptomName}`}>Notas (opcional)</Label>
          <Textarea
            id={`notes-${symptomName}`}
            placeholder="Alguma observação específica sobre este sintoma..."
            value={notes || ''}
            onChange={(e) => onNotesChange(e.target.value)}
            className="mt-1 resize-none"
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
};