const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

interface SecurityAlert {
  supplement_id: string;
  alert_type: 'recall' | 'interaction' | 'adverse_event' | 'dosage_warning';
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: 'FDA' | 'EMA' | 'ANVISA' | 'HC';
  title: string;
  description?: string;
  alert_date: string;
  affected_products?: string[];
  recommended_actions?: string[];
  external_reference?: string;
}

interface MonitoringResults {
  fda_alerts: SecurityAlert[];
  ema_alerts: SecurityAlert[];
  anvisa_alerts: SecurityAlert[];
  total_alerts: number;
  critical_alerts: number;
  new_alerts: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { supplement_ids, force_update = false } = await req.json();
    
    console.log('Starting security alert monitoring for supplements:', supplement_ids);

    // Initialize monitoring results
    const results: MonitoringResults = {
      fda_alerts: [],
      ema_alerts: [],
      anvisa_alerts: [],
      total_alerts: 0,
      critical_alerts: 0,
      new_alerts: 0
    };

    // Monitor each regulatory agency
    const fdaAlerts = await monitorFDAAlerts(supplement_ids);
    const emaAlerts = await monitorEMAAlerts(supplement_ids);
    const anvisaAlerts = await monitorANVISAAlerts(supplement_ids);

    results.fda_alerts = fdaAlerts;
    results.ema_alerts = emaAlerts;
    results.anvisa_alerts = anvisaAlerts;

    // Combine all alerts
    const allAlerts = [...fdaAlerts, ...emaAlerts, ...anvisaAlerts];
    results.total_alerts = allAlerts.length;
    results.critical_alerts = allAlerts.filter(alert => alert.severity === 'critical').length;

    // Store new alerts in database
    for (const alert of allAlerts) {
      try {
        // Check if alert already exists
        const { data: existingAlert } = await supabase
          .from('security_alerts')
          .select('id')
          .eq('supplement_id', alert.supplement_id)
          .eq('source', alert.source)
          .eq('external_reference', alert.external_reference)
          .single();

        if (!existingAlert) {
          const { error: insertError } = await supabase
            .from('security_alerts')
            .insert({
              supplement_id: alert.supplement_id,
              alert_type: alert.alert_type,
              severity: alert.severity,
              source: alert.source,
              title: alert.title,
              description: alert.description,
              alert_date: alert.alert_date,
              affected_products: alert.affected_products || [],
              recommended_actions: alert.recommended_actions || [],
              external_reference: alert.external_reference
            });

          if (insertError) {
            console.error('Error inserting security alert:', insertError);
          } else {
            results.new_alerts++;
            console.log(`New ${alert.severity} alert stored: ${alert.title}`);
          }
        }
      } catch (error) {
        console.error('Error processing alert:', error);
      }
    }

    // Update monitoring job status
    await updateMonitoringJob('safety_monitoring', {
      status: 'completed',
      results: results,
      completed_at: new Date().toISOString()
    });

    console.log(`Security monitoring completed: ${results.total_alerts} alerts found, ${results.new_alerts} new`);

    return new Response(
      JSON.stringify({
        success: true,
        results: results,
        message: `Security monitoring completed: ${results.new_alerts} new alerts found`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Security monitoring error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

async function monitorFDAAlerts(supplementIds: string[]): Promise<SecurityAlert[]> {
  const alerts: SecurityAlert[] = [];
  
  try {
    // Monitor FDA Drug Safety Communications
    const fdaResponse = await fetch('https://api.fda.gov/drug/event.json?limit=100&search=patient.drug.drugindication:"supplement"');
    
    if (fdaResponse.ok) {
      const fdaData = await fdaResponse.json();
      
      for (const event of fdaData.results || []) {
        // Process FDA adverse events related to supplements
        const alert: SecurityAlert = {
          supplement_id: extractSupplementId(event, supplementIds) || 'unknown',
          alert_type: 'adverse_event',
          severity: calculateSeverity(event.serious),
          source: 'FDA',
          title: `FDA Adverse Event Report`,
          description: event.patient?.summary || 'Adverse event reported to FDA',
          alert_date: event.receiptdate || new Date().toISOString().split('T')[0],
          external_reference: event.safetyreportid
        };
        
        if (alert.supplement_id) {
          alerts.push(alert);
        }
      }
    }

    // Monitor FDA Recalls
    const recallResponse = await fetch('https://api.fda.gov/food/enforcement.json?limit=50&search=product_description:"supplement" OR product_description:"vitamin"');
    
    if (recallResponse.ok) {
      const recallData = await recallResponse.json();
      
      for (const recall of recallData.results || []) {
        const alert: SecurityAlert = {
          supplement_id: extractSupplementIdFromText(recall.product_description, supplementIds) || 'unknown',
          alert_type: 'recall',
          severity: mapRecallSeverity(recall.classification),
          source: 'FDA',
          title: `FDA Recall: ${recall.product_description}`,
          description: recall.reason_for_recall,
          alert_date: recall.recall_initiation_date,
          affected_products: [recall.product_description],
          recommended_actions: ['Discontinue use', 'Consult healthcare provider'],
          external_reference: recall.recall_number
        };
        
        if (alert.supplement_id) {
          alerts.push(alert);
        }
      }
    }

  } catch (error) {
    console.error('Error monitoring FDA alerts:', error);
  }

  return alerts;
}

async function monitorEMAAlerts(supplementIds: string[]): Promise<SecurityAlert[]> {
  const alerts: SecurityAlert[] = [];
  
  try {
    // EMA doesn't have a public API, so we would need to scrape their website
    // For now, we'll implement a placeholder that could be expanded with web scraping
    console.log('EMA monitoring: Would implement web scraping of EMA safety communications');
    
    // Simulate EMA alert processing
    // In a real implementation, this would scrape EMA's website for safety communications
    
  } catch (error) {
    console.error('Error monitoring EMA alerts:', error);
  }

  return alerts;
}

async function monitorANVISAAlerts(supplementIds: string[]): Promise<SecurityAlert[]> {
  const alerts: SecurityAlert[] = [];
  
  try {
    // ANVISA monitoring would be implemented similarly to EMA
    // This would require scraping ANVISA's website for safety alerts
    console.log('ANVISA monitoring: Would implement web scraping of ANVISA safety communications');
    
  } catch (error) {
    console.error('Error monitoring ANVISA alerts:', error);
  }

  return alerts;
}

function extractSupplementId(event: any, supplementIds: string[]): string | null {
  // Extract supplement ID from FDA event data
  const drugName = event.patient?.drug?.[0]?.medicinalproduct?.toLowerCase() || '';
  
  for (const suppId of supplementIds) {
    if (drugName.includes(suppId.toLowerCase())) {
      return suppId;
    }
  }
  
  return null;
}

function extractSupplementIdFromText(text: string, supplementIds: string[]): string | null {
  const lowerText = text.toLowerCase();
  
  for (const suppId of supplementIds) {
    if (lowerText.includes(suppId.toLowerCase())) {
      return suppId;
    }
  }
  
  return null;
}

function calculateSeverity(isSerious: string | number): 'critical' | 'high' | 'medium' | 'low' {
  if (isSerious === '1' || isSerious === 1) return 'critical';
  return 'medium';
}

function mapRecallSeverity(classification: string): 'critical' | 'high' | 'medium' | 'low' {
  switch (classification) {
    case 'Class I': return 'critical';
    case 'Class II': return 'high';
    case 'Class III': return 'medium';
    default: return 'low';
  }
}

async function updateMonitoringJob(jobType: string, updates: any) {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    await supabase
      .from('monitoring_jobs')
      .update(updates)
      .eq('job_type', jobType)
      .eq('status', 'running');
      
  } catch (error) {
    console.error('Error updating monitoring job:', error);
  }
}