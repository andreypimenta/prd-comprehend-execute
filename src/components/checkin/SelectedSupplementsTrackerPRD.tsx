import { useEffect, useState } from 'react';
import { ComplianceTrackerPRD } from './ComplianceTrackerPRD';
import { useSelectedSupplements } from '@/hooks/useSelectedSupplements';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Supplement {
  id: string;
  name: string;
  dosage?: number;
  dosageUnit?: string;
}

interface ComplianceData {
  daysCompliant: number;
  missedDoses: number;
  reasonsForMissing?: string[];
}

interface SelectedSupplementsTrackerPRDProps {
  compliance: Record<string, ComplianceData>;
  onChange: (compliance: Record<string, ComplianceData>) => void;
}

export function SelectedSupplementsTrackerPRD({ compliance, onChange }: SelectedSupplementsTrackerPRDProps) {
  const { getActiveSupplements, loading: selectionsLoading } = useSelectedSupplements();
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        
        // Get recommendations data to get dosage info
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data: recommendationsData } = await supabase
          .from('recommendations')
          .select(`
            id,
            supplement_id,
            recommended_dosage,
            supplements (
              id,
              name,
              dosage_unit
            )
          `)
          .eq('user_id', user.id)
          .in('supplement_id', supplementIds);

        const supplementsWithDosage = recommendationsData?.map(rec => ({
          id: rec.supplement_id,
          name: rec.supplements?.name || '',
          dosage: rec.recommended_dosage,
          dosageUnit: rec.supplements?.dosage_unit || 'mg'
        })) || [];

        setSupplements(supplementsWithDosage);
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
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
          <span className="text-2xl">💊</span>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Nenhum suplemento selecionado</h3>
          <p className="text-muted-foreground mb-4">
            Para fazer o check-in, você precisa selecionar quais suplementos está usando.
          </p>
          <Button 
            onClick={() => navigate('/results')} 
            variant="primary"
          >
            Selecionar Suplementos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ComplianceTrackerPRD 
      supplements={supplements}
      compliance={compliance}
      onChange={onChange}
    />
  );
}