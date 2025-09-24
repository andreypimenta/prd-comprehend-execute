import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SecurityAlert = Database['public']['Tables']['security_alerts']['Row'];
type EvidenceUpdate = Database['public']['Tables']['evidence_updates']['Row'];
type MonitoringJob = Database['public']['Tables']['monitoring_jobs']['Row'];
type EvidenceClassification = Database['public']['Tables']['evidence_classifications']['Row'];

export function useAutomaticUpdates() {
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [evidenceUpdates, setEvidenceUpdates] = useState<EvidenceUpdate[]>([]);
  const [monitoringJobs, setMonitoringJobs] = useState<MonitoringJob[]>([]);
  const [evidenceClassifications, setEvidenceClassifications] = useState<EvidenceClassification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch security alerts
  const fetchSecurityAlerts = async (filters?: { severity?: string; supplement_id?: string }) => {
    try {
      setLoading(true);
      let query = supabase
        .from('security_alerts')
        .select('*')
        .eq('status', 'active')
        .order('alert_date', { ascending: false });

      if (filters?.severity) {
        query = query.eq('severity', filters.severity);
      }
      if (filters?.supplement_id) {
        query = query.eq('supplement_id', filters.supplement_id);
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;
      setSecurityAlerts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching security alerts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch evidence updates
  const fetchEvidenceUpdates = async (supplementId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('evidence_updates')
        .select('*')
        .order('created_at', { ascending: false });

      if (supplementId) {
        query = query.eq('supplement_id', supplementId);
      }

      const { data, error } = await query.limit(100);

      if (error) throw error;
      setEvidenceUpdates(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching evidence updates');
    } finally {
      setLoading(false);
    }
  };

  // Fetch monitoring jobs
  const fetchMonitoringJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('monitoring_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setMonitoringJobs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching monitoring jobs');
    } finally {
      setLoading(false);
    }
  };

  // Fetch evidence classifications that require review
  const fetchEvidenceClassifications = async (requiresReview = true) => {
    try {
      setLoading(true);
      let query = supabase
        .from('evidence_classifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (requiresReview) {
        query = query.eq('requires_review', true);
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;
      setEvidenceClassifications(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching evidence classifications');
    } finally {
      setLoading(false);
    }
  };

  // Run security monitoring
  const runSecurityMonitoring = async (supplementIds: string[]) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('security-alert-monitor', {
        body: { supplement_ids: supplementIds }
      });

      if (error) throw error;
      
      // Refresh alerts after monitoring
      await fetchSecurityAlerts();
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error running security monitoring');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Run evidence update
  const runEvidenceUpdate = async (supplementIds: string[], autoApproveThreshold = 0.8) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('evidence-auto-updater', {
        body: { 
          supplement_ids: supplementIds,
          auto_approve_threshold: autoApproveThreshold
        }
      });

      if (error) throw error;
      
      // Refresh updates after processing
      await fetchEvidenceUpdates();
      await fetchEvidenceClassifications();
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error running evidence update');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create scheduled job
  const createScheduledJob = async (jobType: string, parameters: any, intervalHours = 24) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('monitoring-scheduler', {
        body: {
          action: 'create_job',
          job_type: jobType,
          parameters,
          run_interval_hours: intervalHours
        }
      });

      if (error) throw error;
      
      // Refresh jobs after creation
      await fetchMonitoringJobs();
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating scheduled job');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get scheduler status
  const getSchedulerStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('monitoring-scheduler', {
        body: { action: 'get_status' }
      });

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error getting scheduler status');
      throw err;
    }
  };

  // Approve evidence classification
  const approveEvidenceClassification = async (classificationId: string, reviewNotes?: string) => {
    try {
      setLoading(true);
      
      // Get the classification details
      const { data: classification, error: fetchError } = await supabase
        .from('evidence_classifications')
        .select('*')
        .eq('id', classificationId)
        .single();

      if (fetchError) throw fetchError;

      // Update the supplement with the new classification
      if (classification.classification_type === 'evidence_level') {
        const { error: updateError } = await supabase
          .from('supplements')
          .update({ evidence_level: classification.new_classification })
          .eq('id', classification.supplement_id);

        if (updateError) throw updateError;
      }

      // Mark classification as reviewed and applied
      const { error: reviewError } = await supabase
        .from('evidence_classifications')
        .update({
          requires_review: false,
          reviewed_at: new Date().toISOString(),
          review_notes: reviewNotes,
          applied_at: new Date().toISOString()
        })
        .eq('id', classificationId);

      if (reviewError) throw reviewError;

      // Refresh classifications
      await fetchEvidenceClassifications();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error approving classification');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reject evidence classification
  const rejectEvidenceClassification = async (classificationId: string, reviewNotes: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('evidence_classifications')
        .update({
          requires_review: false,
          reviewed_at: new Date().toISOString(),
          review_notes: reviewNotes
        })
        .eq('id', classificationId);

      if (error) throw error;

      // Refresh classifications
      await fetchEvidenceClassifications();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error rejecting classification');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get critical alerts count
  const getCriticalAlertsCount = () => {
    return securityAlerts.filter(alert => alert.severity === 'critical').length;
  };

  // Get pending reviews count
  const getPendingReviewsCount = () => {
    return evidenceClassifications.filter(c => c.requires_review).length;
  };

  return {
    // Data
    securityAlerts,
    evidenceUpdates,
    monitoringJobs,
    evidenceClassifications,
    
    // State
    loading,
    error,
    
    // Fetch functions
    fetchSecurityAlerts,
    fetchEvidenceUpdates,
    fetchMonitoringJobs,
    fetchEvidenceClassifications,
    
    // Action functions
    runSecurityMonitoring,
    runEvidenceUpdate,
    createScheduledJob,
    getSchedulerStatus,
    approveEvidenceClassification,
    rejectEvidenceClassification,
    
    // Utility functions
    getCriticalAlertsCount,
    getPendingReviewsCount,
    
    // Clear error
    clearError: () => setError(null)
  };
}