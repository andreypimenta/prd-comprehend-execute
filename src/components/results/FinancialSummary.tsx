import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useFinancialCalculations } from "@/hooks/useFinancialCalculations";

export function FinancialSummary() {
  const { breakdown, loading } = useFinancialCalculations();

  const getComparisonIcon = (comparison: string) => {
    switch (comparison) {
      case 'below_average':
        return TrendingDown;
      case 'above_average':
        return TrendingUp;
      default:
        return Minus;
    }
  };

  const getComparisonColor = (comparison: string) => {
    switch (comparison) {
      case 'below_average':
        return 'text-green-600';
      case 'above_average':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getComparisonLabel = (comparison: string) => {
    switch (comparison) {
      case 'below_average':
        return 'Abaixo da média';
      case 'above_average':
        return 'Acima da média';
      default:
        return 'Na média do mercado';
    }
  };

  const getBudgetColor = (utilization: number) => {
    if (utilization <= 70) return 'text-green-600';
    if (utilization <= 100) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Investimento em Saúde</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span>Calculando custos...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!breakdown) {
    return (
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Investimento em Saúde</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Selecione suplementos para ver o resumo financeiro</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const ComparisonIcon = getComparisonIcon(breakdown.cost_comparison);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5" />
          <span>Investimento em Saúde</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Monthly Cost */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Custo Mensal</span>
            <Badge variant="outline">
              R$ {breakdown.monthly_cost}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-foreground">
            R$ {breakdown.monthly_cost}/mês
          </div>
        </div>

        {/* Budget Utilization */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Uso do Orçamento</span>
            <span className={`text-sm font-medium ${getBudgetColor(breakdown.budget_utilization)}`}>
              {breakdown.budget_utilization}%
            </span>
          </div>
          <Progress 
            value={Math.min(breakdown.budget_utilization, 100)} 
            className="h-2"
          />
          {breakdown.budget_utilization > 100 && (
            <p className="text-xs text-red-600">
              Acima do orçamento recomendado
            </p>
          )}
        </div>

        {/* Cost per Benefit */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Custo por Benefício</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium">R$ {breakdown.cost_per_benefit}</span>
            <span className="text-xs text-muted-foreground">por ponto de confiança</span>
          </div>
        </div>

        {/* Market Comparison */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Comparação de Mercado</span>
          <div className="flex items-center space-x-2">
            <ComparisonIcon className={`h-4 w-4 ${getComparisonColor(breakdown.cost_comparison)}`} />
            <span className={`text-sm font-medium ${getComparisonColor(breakdown.cost_comparison)}`}>
              {getComparisonLabel(breakdown.cost_comparison)}
            </span>
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Otimizações</h4>
          <div className="space-y-2">
            {breakdown.optimization_suggestions.map((suggestion, index) => (
              <div key={index} className="text-xs bg-muted/50 rounded p-2">
                • {suggestion}
              </div>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Investimento anual estimado:</span>
            <span className="font-medium">R$ {breakdown.monthly_cost * 12}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Custo diário:</span>
            <span className="font-medium">R$ {Math.round((breakdown.monthly_cost / 30) * 100) / 100}</span>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-primary/5 rounded-lg p-3">
          <p className="text-xs text-center text-muted-foreground">
            💡 Investir na sua saúde hoje pode prevenir custos maiores no futuro
          </p>
        </div>
      </CardContent>
    </Card>
  );
}