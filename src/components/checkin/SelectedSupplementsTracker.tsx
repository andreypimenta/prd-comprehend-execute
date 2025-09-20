import { useEffect, useState } from 'react';
import { ComplianceTracker, SupplementCompliance } from './ComplianceTracker';
import { useSelectedSupplements } from '@/hooks/useSelectedSupplements';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface SelectedSupplementsTrackerProps {
  compliance: Record<string, SupplementCompliance>;
  onChange: (compliance: Record<string, SupplementCompliance>) => void;
}

export function SelectedSupplementsTracker({ compliance, onChange }: SelectedSupplementsTrackerProps) {
  const { getActiveSupplements, loading: selectionsLoading } = useSelectedSupplements();
  const [supplements, setSupplements] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSelectedSupplementsData = async () => {
      try {
        const activeSelections = getActiveSupplements();
        
        if (activeSelections.length === 0) {
          setSupplements([]);
          setLoading(false);
          return;
        }

        // Fetch supplement details for selected supplements
        const supplementIds = activeSelections.map(s => s.supplement_id);
        
        const { data: supplementsData, error } = await supabase
          .from('supplements')
          .select('id, name')
          .in('id', supplementIds);

        if (error) throw error;

        setSupplements(supplementsData || []);
      } catch (error) {
        console.error('Error fetching selected supplements data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!selectionsLoading) {
      fetchSelectedSupplementsData();
    }
  }, [getActiveSupplements, selectionsLoading]);

  if (loading || selectionsLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2 text-muted-foreground">Carregando suplementos...</span>
      </div>
    );
  }

  if (supplements.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhum suplemento selecionado. 
          <br />
          Acesse a aba "Resultados" para selecionar suplementos para sua rotina.
        </p>
      </div>
    );
  }

  return (
    <ComplianceTracker 
      supplements={supplements}
      compliance={compliance}
      onChange={onChange}
    />
  );
}