import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import type { PharmaceuticalForm, OptimizationRecommendation } from '@/hooks/useAbsorptionOptimization';

interface CostBenefitTableProps {
  forms: PharmaceuticalForm[];
  recommendations: OptimizationRecommendation;
  currentDose?: number;
}

export const CostBenefitTable = ({ forms, recommendations, currentDose = 1000 }: CostBenefitTableProps) => {
  const calculateCostData = (form: PharmaceuticalForm) => {
    const equivalentDose = currentDose / form.bioavailabilityFactor;
    const monthlyPrice = recommendations.costBenefit.monthlyStandard * form.costMultiplier;
    const costPerEffectiveUnit = monthlyPrice / (form.absorptionRate * equivalentDose);
    
    return {
      equivalentDose: Math.round(equivalentDose * 10) / 10,
      monthlyPrice: Math.round(monthlyPrice),
      costPerEffectiveUnit: Math.round(costPerEffectiveUnit * 100) / 100,
      efficiency: form.absorptionRate
    };
  };

  const standardForm = forms[0];
  const bestForm = forms[forms.length - 1];
  const standardData = calculateCostData(standardForm);
  const bestData = calculateCostData(bestForm);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Análise Custo-Benefício Avançada
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Compare o custo real por dose efetiva entre as formas
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold">Forma</th>
                <th className="text-center p-3 font-semibold">Preço Mensal</th>
                <th className="text-center p-3 font-semibold">Dose Diária</th>
                <th className="text-center p-3 font-semibold">Custo/Dose Efetiva</th>
                <th className="text-center p-3 font-semibold">Eficácia Real</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, index) => {
                const data = calculateCostData(form);
                const isStandard = index === 0;
                const isBest = index === forms.length - 1;
                
                return (
                  <tr 
                    key={index} 
                    className={`border-b hover:bg-muted/50 ${isBest ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: form.color }}
                        />
                        <span className="font-medium">{form.name}</span>
                        {isBest && (
                          <Badge className="bg-green-600 text-white text-xs">
                            MELHOR
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <span className="font-semibold">R$ {data.monthlyPrice}</span>
                      {!isStandard && (
                        <div className="text-xs text-muted-foreground">
                          {data.monthlyPrice > standardData.monthlyPrice ? '+' : ''}
                          R$ {data.monthlyPrice - standardData.monthlyPrice}
                        </div>
                      )}
                    </td>
                    <td className="text-center p-3">
                      <span className="font-semibold">{data.equivalentDose}mg</span>
                      {!isStandard && (
                        <div className="text-xs text-green-600">
                          -{Math.round(((currentDose - data.equivalentDose) / currentDose) * 100)}%
                        </div>
                      )}
                    </td>
                    <td className="text-center p-3">
                      <span className="font-semibold">R$ {data.costPerEffectiveUnit}</span>
                      {!isStandard && (
                        <div className="flex items-center justify-center gap-1 text-xs">
                          {data.costPerEffectiveUnit < standardData.costPerEffectiveUnit ? (
                            <>
                              <TrendingDown className="h-3 w-3 text-green-600" />
                              <span className="text-green-600">
                                -{Math.round(((standardData.costPerEffectiveUnit - data.costPerEffectiveUnit) / standardData.costPerEffectiveUnit) * 100)}%
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingUp className="h-3 w-3 text-red-600" />
                              <span className="text-red-600">
                                +{Math.round(((data.costPerEffectiveUnit - standardData.costPerEffectiveUnit) / standardData.costPerEffectiveUnit) * 100)}%
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="text-center p-3">
                      <div className="flex items-center justify-center gap-2">
                        <span className="font-semibold">{data.efficiency}%</span>
                        <Badge 
                          variant="secondary"
                          className={
                            data.efficiency >= 90 ? 'bg-green-100 text-green-800' :
                            data.efficiency >= 70 ? 'bg-blue-100 text-blue-800' :
                            data.efficiency >= 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {form.bioavailabilityFactor}x
                        </Badge>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              <p className="font-semibold text-green-700 dark:text-green-400">Economia Real</p>
            </div>
            <p className="text-2xl font-bold text-green-600">
              R$ {Math.round((standardData.costPerEffectiveUnit - bestData.costPerEffectiveUnit) * 365)}
            </p>
            <p className="text-xs text-green-600">economia anual</p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-semibold text-blue-700 dark:text-blue-400">Eficácia vs Padrão</p>
            <p className="text-2xl font-bold text-blue-600">
              {Math.round((bestData.efficiency / standardData.efficiency) * 100)}%
            </p>
            <p className="text-xs text-blue-600">mais eficaz</p>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="font-semibold text-purple-700 dark:text-purple-400">ROI Anual</p>
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(((bestData.efficiency - standardData.efficiency) / (bestData.monthlyPrice - standardData.monthlyPrice)) * 100)}%
            </p>
            <p className="text-xs text-purple-600">retorno investimento</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};