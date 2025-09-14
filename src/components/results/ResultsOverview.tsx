import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Shield, Star } from "lucide-react";
import type { Recommendation } from "@/types/supplements";

interface ResultsOverviewProps {
  recommendations: Recommendation[];
}

export function ResultsOverview({ recommendations }: ResultsOverviewProps) {
  const totalRecommendations = recommendations.length;
  const highPriorityCount = recommendations.filter(r => r.priority === 'high').length;
  const averageConfidence = Math.round(
    recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length
  );
  
  const strongEvidenceCount = recommendations.filter(r => {
    const rec = r as any;
    return rec.supplements?.evidence_level === 'strong';
  }).length;

  const stats = [
    {
      title: "Total de Recomendações",
      value: totalRecommendations,
      icon: Target,
      description: "suplementos recomendados",
      color: "text-blue-600"
    },
    {
      title: "Alta Prioridade",
      value: highPriorityCount,
      icon: TrendingUp,
      description: "recomendações prioritárias",
      color: "text-red-600"
    },
    {
      title: "Confiança Média",
      value: `${averageConfidence}%`,
      icon: Star,
      description: "nível de confiança",
      color: "text-green-600"
    },
    {
      title: "Evidência Forte",
      value: strongEvidenceCount,
      icon: Shield,
      description: "suplementos com evidência científica sólida",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">
                    {stat.value}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              <div className={`${stat.color} bg-current bg-opacity-10 p-3 rounded-full`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}