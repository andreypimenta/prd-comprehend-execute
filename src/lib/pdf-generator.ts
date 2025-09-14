// lib/pdf-generator.ts
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { DashboardData } from '@/types/dashboard';

export async function generatePDF(dashboardData: DashboardData) {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Title and Header
  pdf.setFontSize(24);
  pdf.setTextColor(40, 44, 52);
  pdf.text('LoL Engine - Relatório de Recomendações', margin, 30);
  
  pdf.setFontSize(12);
  pdf.setTextColor(108, 114, 147);
  pdf.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, margin, 40);
  pdf.text(`Para: ${dashboardData.user.name}`, margin, 47);
  
  // Draw line
  pdf.setDrawColor(229, 231, 235);
  pdf.line(margin, 55, pageWidth - margin, 55);
  
  let yPosition = 70;
  
  // Overview Section
  pdf.setFontSize(16);
  pdf.setTextColor(40, 44, 52);
  pdf.text('📊 Resumo Geral', margin, yPosition);
  yPosition += 15;
  
  pdf.setFontSize(10);
  pdf.setTextColor(75, 85, 99);
  
  const overviewData = [
    [`Total de Recomendações:`, `${dashboardData.recommendations.total}`],
    [`Alta Prioridade:`, `${dashboardData.recommendations.highPriority}`],
    [`Média Prioridade:`, `${dashboardData.recommendations.mediumPriority}`],
    [`Baixa Prioridade:`, `${dashboardData.recommendations.lowPriority}`],
    [`Confiança Média:`, `${Math.round(dashboardData.recommendations.averageConfidence)}%`],
    [`Score Geral:`, `${dashboardData.analysis.totalScore}%`]
  ];
  
  overviewData.forEach(([label, value]) => {
    pdf.text(label, margin, yPosition);
    pdf.text(value, margin + 60, yPosition);
    yPosition += 7;
  });
  
  yPosition += 10;
  
  // Categories Section
  pdf.setFontSize(16);
  pdf.setTextColor(40, 44, 52);
  pdf.text('📋 Distribuição por Categoria', margin, yPosition);
  yPosition += 15;
  
  pdf.setFontSize(10);
  dashboardData.recommendations.categories.forEach(category => {
    pdf.text(`• ${category.category}: ${category.count} suplementos (${category.averageConfidence}% confiança)`, margin, yPosition);
    yPosition += 7;
  });
  
  yPosition += 10;
  
  // Top Concerns
  if (dashboardData.analysis.topConcerns.length > 0) {
    pdf.setFontSize(16);
    pdf.setTextColor(40, 44, 52);
    pdf.text('⚠️ Principais Preocupações', margin, yPosition);
    yPosition += 15;
    
    pdf.setFontSize(10);
    dashboardData.analysis.topConcerns.forEach(concern => {
      pdf.text(`• ${concern}`, margin, yPosition);
      yPosition += 7;
    });
    yPosition += 10;
  }
  
  // Key Benefits
  if (dashboardData.analysis.keyBenefits.length > 0) {
    pdf.setFontSize(16);
    pdf.setTextColor(40, 44, 52);
    pdf.text('✅ Principais Benefícios Esperados', margin, yPosition);
    yPosition += 15;
    
    pdf.setFontSize(10);
    dashboardData.analysis.keyBenefits.forEach(benefit => {
      pdf.text(`• ${benefit}`, margin, yPosition);
      yPosition += 7;
    });
    yPosition += 10;
  }
  
  // Check if we need a new page
  if (yPosition > pageHeight - 50) {
    pdf.addPage();
    yPosition = 30;
  }
  
  // Detailed Recommendations
  pdf.setFontSize(18);
  pdf.setTextColor(40, 44, 52);
  pdf.text('💊 Recomendações Detalhadas', margin, yPosition);
  yPosition += 20;
  
  // Sort supplements by priority and confidence
  const sortedSupplements = [...dashboardData.supplements].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return b.confidence - a.confidence;
  });
  
  sortedSupplements.forEach((supplement, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 70) {
      pdf.addPage();
      yPosition = 30;
    }
    
    // Supplement header
    pdf.setFontSize(14);
    pdf.setTextColor(40, 44, 52);
    pdf.text(`${index + 1}. ${supplement.supplement.name}`, margin, yPosition);
    yPosition += 10;
    
    // Priority and confidence
    pdf.setFontSize(10);
    pdf.setTextColor(75, 85, 99);
    const priorityText = supplement.priority === 'high' ? 'Alta' : supplement.priority === 'medium' ? 'Média' : 'Baixa';
    pdf.text(`Prioridade: ${priorityText} | Confiança: ${supplement.confidence}%`, margin + 5, yPosition);
    yPosition += 7;
    
    // Dosage and timing
    const timingText = supplement.supplement.timing === 'morning' ? 'Pela manhã' : 
                     supplement.supplement.timing === 'evening' ? 'À noite' : 'Com refeição';
    pdf.text(`Dosagem: ${supplement.recommendedDosage} ${supplement.supplement.category === 'vitamin' ? 'UI' : 'mg'} | ${timingText}`, margin + 5, yPosition);
    yPosition += 7;
    
    // Cost
    pdf.text(`Custo estimado: R$ ${supplement.estimatedCost}/mês`, margin + 5, yPosition);
    yPosition += 10;
    
    // Reasoning
    pdf.setFontSize(9);
    pdf.setTextColor(107, 114, 128);
    const reasoning = supplement.reasoning;
    const reasoningLines = pdf.splitTextToSize(reasoning, contentWidth - 10);
    pdf.text(reasoningLines, margin + 5, yPosition);
    yPosition += reasoningLines.length * 5 + 5;
    
    // Benefits
    if (supplement.supplement.benefits.length > 0) {
      pdf.text('Principais benefícios:', margin + 5, yPosition);
      yPosition += 5;
      
      supplement.supplement.benefits.slice(0, 3).forEach(benefit => {
        pdf.text(`• ${benefit}`, margin + 10, yPosition);
        yPosition += 5;
      });
    }
    
    yPosition += 10;
    
    // Draw separator line
    pdf.setDrawColor(229, 231, 235);
    pdf.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);
    yPosition += 5;
  });
  
  // Footer
  const totalPages = (pdf as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(156, 163, 175);
    pdf.text(`LoL Engine - Página ${i} de ${totalPages}`, margin, pageHeight - 10);
    pdf.text('Este relatório foi gerado automaticamente pelo sistema de IA.', pageWidth - margin - 80, pageHeight - 10);
  }
  
  // Save the PDF
  const fileName = `lol-engine-recomendacoes-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
}