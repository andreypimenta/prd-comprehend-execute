import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface FeedbackSectionProps {
  feedback: {
    positiveChanges: string[];
    concerns: string[];
    overallSatisfaction: number;
  };
  onChange: (feedback: {
    positiveChanges: string[];
    concerns: string[];
    overallSatisfaction: number;
  }) => void;
}

const COMMON_POSITIVE_CHANGES = [
  "Mais energia",
  "Melhor sono",
  "Humor mais estável",
  "Menos dores",
  "Melhor digestão",
  "Mais foco",
  "Menos estresse",
  "Melhor disposição",
  "Menos ansiedade",
  "Melhor memória"
];

const COMMON_CONCERNS = [
  "Não notei melhorias",
  "Efeitos colaterais",
  "Dificuldade para lembrar",
  "Muito caro",
  "Sabor ruim",
  "Muitos comprimidos",
  "Não sei se está funcionando",
  "Sintomas pioraram"
];

export const FeedbackSection = ({ feedback, onChange }: FeedbackSectionProps) => {
  const [customPositive, setCustomPositive] = useState('');
  const [customConcern, setCustomConcern] = useState('');

  const togglePositiveChange = (change: string) => {
    const isSelected = feedback.positiveChanges.includes(change);
    const updated = isSelected
      ? feedback.positiveChanges.filter(c => c !== change)
      : [...feedback.positiveChanges, change];
    
    onChange({
      ...feedback,
      positiveChanges: updated
    });
  };

  const toggleConcern = (concern: string) => {
    const isSelected = feedback.concerns.includes(concern);
    const updated = isSelected
      ? feedback.concerns.filter(c => c !== concern)
      : [...feedback.concerns, concern];
    
    onChange({
      ...feedback,
      concerns: updated
    });
  };

  const addCustomPositive = () => {
    if (customPositive.trim()) {
      onChange({
        ...feedback,
        positiveChanges: [...feedback.positiveChanges, customPositive.trim()]
      });
      setCustomPositive('');
    }
  };

  const addCustomConcern = () => {
    if (customConcern.trim()) {
      onChange({
        ...feedback,
        concerns: [...feedback.concerns, customConcern.trim()]
      });
      setCustomConcern('');
    }
  };

  const removePositive = (change: string) => {
    onChange({
      ...feedback,
      positiveChanges: feedback.positiveChanges.filter(c => c !== change)
    });
  };

  const removeConcern = (concern: string) => {
    onChange({
      ...feedback,
      concerns: feedback.concerns.filter(c => c !== concern)
    });
  };

  const getSatisfactionText = (rating: number) => {
    const labels = ["", "Muito insatisfeito", "Insatisfeito", "Neutro", "Satisfeito", "Muito satisfeito"];
    return labels[rating] || "Neutro";
  };

  const getSatisfactionEmoji = (rating: number) => {
    if (rating <= 1) return "😞";
    if (rating <= 2) return "😕";
    if (rating <= 3) return "😐";
    if (rating <= 4) return "🙂";
    return "😊";
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2">Feedback Geral</h3>
        <p className="text-muted-foreground">
          Compartilhe suas observações desta semana
        </p>
      </div>

      {/* Positive Changes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-success">
            ✅ Mudanças positivas que você notou
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {COMMON_POSITIVE_CHANGES.map((change) => {
              const isSelected = feedback.positiveChanges.includes(change);
              return (
                <Button
                  key={change}
                  variant={isSelected ? "primary" : "outline"}
                  size="sm"
                  onClick={() => togglePositiveChange(change)}
                  className={`text-sm ${isSelected ? 'bg-success hover:bg-success/90' : ''}`}
                >
                  {change}
                </Button>
              );
            })}
          </div>

          {/* Custom positive changes */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Outra melhoria..."
              value={customPositive}
              onChange={(e) => setCustomPositive(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomPositive()}
              className="flex-1 px-3 py-2 text-sm border rounded-md"
            />
            <Button size="sm" onClick={addCustomPositive} disabled={!customPositive.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Selected positive changes */}
          {feedback.positiveChanges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {feedback.positiveChanges.map((change) => (
                <Badge 
                  key={change} 
                  variant="default" 
                  className="bg-success hover:bg-success/90 gap-1"
                >
                  {change}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removePositive(change)}
                    className="h-auto p-0 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Concerns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-warning">
            ⚠️ Preocupações ou dificuldades
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {COMMON_CONCERNS.map((concern) => {
              const isSelected = feedback.concerns.includes(concern);
              return (
                <Button
                  key={concern}
                  variant={isSelected ? "primary" : "outline"}
                  size="sm"
                  onClick={() => toggleConcern(concern)}
                  className={`text-sm ${isSelected ? 'bg-warning hover:bg-warning/90' : ''}`}
                >
                  {concern}
                </Button>
              );
            })}
          </div>

          {/* Custom concerns */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Outra preocupação..."
              value={customConcern}
              onChange={(e) => setCustomConcern(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomConcern()}
              className="flex-1 px-3 py-2 text-sm border rounded-md"
            />
            <Button size="sm" onClick={addCustomConcern} disabled={!customConcern.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Selected concerns */}
          {feedback.concerns.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {feedback.concerns.map((concern) => (
                <Badge 
                  key={concern} 
                  variant="default" 
                  className="bg-warning hover:bg-warning/90 gap-1"
                >
                  {concern}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeConcern(concern)}
                    className="h-auto p-0 hover:bg-transparent"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Overall Satisfaction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Satisfação geral com as recomendações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-3">
            <Label>Como você avalia sua experiência?</Label>
            <div className="text-center">
              <div className="text-2xl">{getSatisfactionEmoji(feedback.overallSatisfaction)}</div>
              <Badge variant="outline" className="text-lg">
                {feedback.overallSatisfaction}/5
              </Badge>
            </div>
          </div>
          
          <Slider
            value={[feedback.overallSatisfaction]}
            onValueChange={(values) => onChange({
              ...feedback,
              overallSatisfaction: values[0]
            })}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Muito insatisfeito</span>
            <span className="text-center font-medium text-foreground">
              {getSatisfactionText(feedback.overallSatisfaction)}
            </span>
            <span>Muito satisfeito</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};