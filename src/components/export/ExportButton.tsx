// components/export/ExportButton.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { DashboardData } from '@/types/dashboard';
import { Loader2, FileText, Download } from 'lucide-react';
import { generatePDF } from '@/lib/pdf-generator';

interface ExportButtonProps {
  dashboardData: DashboardData;
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function ExportButton({ dashboardData, variant = 'outline', size = 'md' }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    if (!dashboardData || !dashboardData.supplements?.length) {
      toast({
        title: "Nenhum dado para exportar",
        description: "Não há recomendações disponíveis para exportar.",
        variant: "destructive",
      });
      return;
    }

    setExporting(true);

    try {
      await generatePDF(dashboardData);
      
      toast({
        title: "PDF exportado com sucesso!",
        description: "Seu relatório de recomendações foi baixado.",
      });
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      toast({
        title: "Erro na exportação",
        description: "Ocorreu um erro ao gerar o PDF. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleExport}
      disabled={exporting}
      className="min-w-[120px]"
    >
      {exporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Exportando...
        </>
      ) : (
        <>
          <FileText className="mr-2 h-4 w-4" />
          Exportar PDF
        </>
      )}
    </Button>
  );
}