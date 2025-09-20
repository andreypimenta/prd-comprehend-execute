import { WeeklyCheckin, CheckinMetrics, TrendData } from '@/types/checkin';

export function calculateCheckinMetrics(checkins: WeeklyCheckin[]): CheckinMetrics {
  if (!checkins.length) {
    return {
      weekly_average: 0,
      improvement_percentage: 0,
      consistency_score: 0,
      best_performing_areas: [],
      areas_needing_attention: [],
    };
  }

  // Calculate wellbeing averages
  const wellbeingScores = checkins
    .filter(c => c.wellbeing)
    .map(c => {
      const wb = c.wellbeing!;
      return (wb.energy + wb.mood + wb.sleep + wb.overall) / 4;
    });

  const weekly_average = wellbeingScores.length > 0
    ? wellbeingScores.reduce((sum, score) => sum + score, 0) / wellbeingScores.length
    : 0;

  // Calculate improvement percentage (comparing first vs last 2 weeks)
  let improvement_percentage = 0;
  if (checkins.length >= 4) {
    const firstHalf = checkins.slice(-4, -2);
    const secondHalf = checkins.slice(-2);
    
    const firstAvg = firstHalf.reduce((sum, c) => {
      if (!c.wellbeing) return sum;
      return sum + (c.wellbeing.energy + c.wellbeing.mood + c.wellbeing.sleep + c.wellbeing.overall) / 4;
    }, 0) / firstHalf.length;
    
    const secondAvg = secondHalf.reduce((sum, c) => {
      if (!c.wellbeing) return sum;
      return sum + (c.wellbeing.energy + c.wellbeing.mood + c.wellbeing.sleep + c.wellbeing.overall) / 4;
    }, 0) / secondHalf.length;
    
    improvement_percentage = firstAvg > 0 ? ((secondAvg - firstAvg) / firstAvg) * 100 : 0;
  }

  // Calculate consistency score based on check-in frequency and compliance
  const consistency_score = Math.min(100, (checkins.length / 8) * 100); // Assuming 8 weeks target

  // Analyze best performing and concerning areas
  const latest = checkins[0];
  const areas: Array<{ name: string; score: number; }> = [];
  
  if (latest?.wellbeing) {
    areas.push(
      { name: 'Energia', score: latest.wellbeing.energy },
      { name: 'Humor', score: latest.wellbeing.mood },
      { name: 'Sono', score: latest.wellbeing.sleep },
      { name: 'Bem-estar Geral', score: latest.wellbeing.overall }
    );
  }

  // Add symptom ratings
  if (latest?.symptom_ratings) {
    Object.entries(latest.symptom_ratings).forEach(([symptom, data]) => {
      areas.push({ name: symptom, score: data.current });
    });
  }

  const sorted = areas.sort((a, b) => b.score - a.score);
  const best_performing_areas = sorted.slice(0, 2).map(a => a.name);
  const areas_needing_attention = sorted.slice(-2).filter(a => a.score <= 3).map(a => a.name);

  return {
    weekly_average: Math.round(weekly_average * 10) / 10,
    improvement_percentage: Math.round(improvement_percentage * 10) / 10,
    consistency_score: Math.round(consistency_score),
    best_performing_areas,
    areas_needing_attention,
  };
}

export function generateInsights(checkins: WeeklyCheckin[]): string[] {
  const insights: string[] = [];
  
  if (!checkins.length) {
    return ['Faça seu primeiro check-in para começar a receber insights personalizados!'];
  }

  const latest = checkins[0];
  const metrics = calculateCheckinMetrics(checkins);

  // Compliance insights
  if (latest.overall_compliance_percentage !== undefined) {
    if (latest.overall_compliance_percentage >= 85) {
      insights.push('🎉 Excelente aderência aos suplementos! Continue assim.');
    } else if (latest.overall_compliance_percentage >= 70) {
      insights.push('👍 Boa aderência aos suplementos. Tente manter acima de 85%.');
    } else {
      insights.push('⚠️ Aderência aos suplementos abaixo do ideal. Considere lembretes diários.');
    }
  }

  // Wellbeing trends
  if (metrics.improvement_percentage > 10) {
    insights.push('📈 Suas métricas de bem-estar estão melhorando significativamente!');
  } else if (metrics.improvement_percentage < -10) {
    insights.push('📉 Suas métricas mostram declínio. Considere revisar sua rotina.');
  }

  // Symptom improvements
  if (latest.symptom_ratings) {
    const improvements = Object.values(latest.symptom_ratings).filter(s => s.improvement > 0);
    if (improvements.length > 0) {
      insights.push(`✨ ${improvements.length} sintomas melhoraram esta semana!`);
    }
  }

  // Consistency insights
  if (metrics.consistency_score >= 90) {
    insights.push('🔥 Sua consistência nos check-ins está excelente!');
  } else if (metrics.consistency_score < 50) {
    insights.push('📅 Tente fazer check-ins mais regulares para melhores insights.');
  }

  // Satisfaction insights
  if (latest.feedback?.overallSatisfaction >= 4) {
    insights.push('😊 Ótimo nível de satisfação! Seus suplementos estão funcionando bem.');
  } else if (latest.feedback?.overallSatisfaction <= 2) {
    insights.push('🤔 Baixa satisfação detectada. Vamos revisar suas recomendações?');
  }

  return insights.length > 0 ? insights.slice(0, 3) : ['Continue fazendo check-ins regulares para receber mais insights!'];
}

export function analyzeTrends(checkins: WeeklyCheckin[]): Record<string, 'improving' | 'stable' | 'worsening'> {
  const trends: Record<string, 'improving' | 'stable' | 'worsening'> = {};
  
  if (checkins.length < 2) {
    return trends;
  }

  const recent = checkins.slice(0, 2);
  const current = recent[0];
  const previous = recent[1];

  if (current.wellbeing && previous.wellbeing) {
    const currentAvg = (current.wellbeing.energy + current.wellbeing.mood + current.wellbeing.sleep + current.wellbeing.overall) / 4;
    const previousAvg = (previous.wellbeing.energy + previous.wellbeing.mood + previous.wellbeing.sleep + previous.wellbeing.overall) / 4;
    
    const change = currentAvg - previousAvg;
    trends.wellbeing = change > 0.3 ? 'improving' : change < -0.3 ? 'worsening' : 'stable';
  }

  if (current.overall_compliance_percentage !== undefined && previous.overall_compliance_percentage !== undefined) {
    const change = current.overall_compliance_percentage - previous.overall_compliance_percentage;
    trends.compliance = change > 5 ? 'improving' : change < -5 ? 'worsening' : 'stable';
  }

  return trends;
}

export function formatWeekNumber(date: Date): string {
  const year = date.getFullYear();
  const week = getWeekNumber(date);
  return `${year}-W${week.toString().padStart(2, '0')}`;
}

export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function calculateComplianceScore(compliance: Record<string, { daysCompliant: number; missedDoses: number; }>): number {
  const values = Object.values(compliance);
  if (values.length === 0) return 0;
  
  const totalCompliance = values.reduce((sum, item) => sum + (item.daysCompliant / 7) * 100, 0);
  return Math.round(totalCompliance / values.length);
}

export function calculateWellbeingScore(wellbeing: { energy: number; mood: number; sleep: number; overall: number; }): number {
  return Math.round(((wellbeing.energy + wellbeing.mood + wellbeing.sleep + wellbeing.overall) / 4) * 20);
}