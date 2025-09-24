const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

interface ScheduledJob {
  id: string;
  job_type: string;
  parameters: any;
  run_interval_hours: number;
  next_run_at: string;
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

    const { action = 'run_scheduler' } = await req.json();
    
    console.log('Monitoring scheduler started with action:', action);

    if (action === 'run_scheduler') {
      return await runScheduler(supabase);
    } else if (action === 'create_job') {
      return await createScheduledJob(supabase, req);
    } else if (action === 'get_status') {
      return await getSchedulerStatus(supabase);
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid action' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );

  } catch (error) {
    console.error('Monitoring scheduler error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

async function runScheduler(supabase: any) {
  console.log('Running scheduled monitoring jobs...');

  // Get all pending jobs that are due to run
  const { data: pendingJobs } = await supabase
    .from('monitoring_jobs')
    .select('*')
    .eq('status', 'pending')
    .lte('next_run_at', new Date().toISOString())
    .order('next_run_at', { ascending: true });

  if (!pendingJobs || pendingJobs.length === 0) {
    console.log('No pending jobs to execute');
    return new Response(
      JSON.stringify({
        success: true,
        message: 'No pending jobs to execute',
        executed_jobs: 0
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  }

  console.log(`Found ${pendingJobs.length} jobs to execute`);

  const results = {
    executed_jobs: 0,
    successful_jobs: 0,
    failed_jobs: 0,
    job_results: []
  };

  // Execute each job
  for (const job of pendingJobs) {
    try {
      console.log(`Executing job: ${job.job_type} (${job.id})`);

      // Mark job as running
      await supabase
        .from('monitoring_jobs')
        .update({
          status: 'running',
          started_at: new Date().toISOString(),
          progress: { stage: 'starting', completed: 0 }
        })
        .eq('id', job.id);

      // Execute the appropriate job type
      let jobResult;
      switch (job.job_type) {
        case 'evidence_collection':
          jobResult = await executeEvidenceCollection(job);
          break;
        case 'safety_monitoring':
          jobResult = await executeSafetyMonitoring(job);
          break;
        case 'classification_update':
          jobResult = await executeClassificationUpdate(job);
          break;
        default:
          throw new Error(`Unknown job type: ${job.job_type}`);
      }

      // Mark job as completed and schedule next run
      const nextRunAt = new Date();
      nextRunAt.setHours(nextRunAt.getHours() + job.run_interval_hours);

      await supabase
        .from('monitoring_jobs')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          next_run_at: nextRunAt.toISOString(),
          results: jobResult,
          progress: { stage: 'completed', completed: 100 }
        })
        .eq('id', job.id);

      results.successful_jobs++;
      results.job_results.push({
        job_id: job.id,
        job_type: job.job_type,
        status: 'success',
        result: jobResult
      });

      console.log(`Job ${job.job_type} completed successfully`);

    } catch (error) {
      console.error(`Job ${job.job_type} failed:`, error);

      // Mark job as failed
      await supabase
        .from('monitoring_jobs')
        .update({
          status: 'failed',
          completed_at: new Date().toISOString(),
          error_message: error.message,
          progress: { stage: 'failed', completed: 0 }
        })
        .eq('id', job.id);

      results.failed_jobs++;
      results.job_results.push({
        job_id: job.id,
        job_type: job.job_type,
        status: 'failed',
        error: error.message
      });
    }

    results.executed_jobs++;
  }

  console.log(`Scheduler completed: ${results.successful_jobs} successful, ${results.failed_jobs} failed`);

  return new Response(
    JSON.stringify({
      success: true,
      message: `Executed ${results.executed_jobs} jobs`,
      results: results
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    }
  );
}

async function executeEvidenceCollection(job: ScheduledJob) {
  console.log('Executing evidence collection job');

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // Get supplements to monitor
  const { data: supplements } = await supabase
    .from('supplements')
    .select('id, name')
    .limit(job.parameters.batch_size || 10);

  if (!supplements || supplements.length === 0) {
    throw new Error('No supplements found for evidence collection');
  }

  // Call scientific evidence collector for each supplement
  const results = {
    processed_supplements: 0,
    new_evidence_count: 0,
    updated_supplements: 0
  };

  for (const supplement of supplements) {
    try {
      // Call the scientific-evidence-collector function
      const response = await supabase.functions.invoke('scientific-evidence-collector', {
        body: {
          supplement_name: supplement.name,
          supplement_id: supplement.id,
          conditions: job.parameters.conditions || []
        }
      });

      if (response.data?.success) {
        results.new_evidence_count += response.data.evidence_count || 0;
        results.updated_supplements++;
      }

      results.processed_supplements++;

    } catch (error) {
      console.error(`Error collecting evidence for ${supplement.name}:`, error);
    }
  }

  return results;
}

async function executeSafetyMonitoring(job: ScheduledJob) {
  console.log('Executing safety monitoring job');

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // Get supplement IDs to monitor
  const { data: supplements } = await supabase
    .from('supplements')
    .select('id')
    .limit(job.parameters.batch_size || 20);

  if (!supplements || supplements.length === 0) {
    throw new Error('No supplements found for safety monitoring');
  }

  const supplementIds = supplements.map(s => s.id);

  // Call security alert monitor
  const response = await supabase.functions.invoke('security-alert-monitor', {
    body: {
      supplement_ids: supplementIds,
      force_update: job.parameters.force_update || false
    }
  });

  if (!response.data?.success) {
    throw new Error('Safety monitoring failed: ' + (response.data?.error || 'Unknown error'));
  }

  return response.data.results;
}

async function executeClassificationUpdate(job: ScheduledJob) {
  console.log('Executing classification update job');

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  // Get supplement IDs to update
  const { data: supplements } = await supabase
    .from('supplements')
    .select('id')
    .limit(job.parameters.batch_size || 15);

  if (!supplements || supplements.length === 0) {
    throw new Error('No supplements found for classification update');
  }

  const supplementIds = supplements.map(s => s.id);

  // Call evidence auto-updater
  const response = await supabase.functions.invoke('evidence-auto-updater', {
    body: {
      supplement_ids: supplementIds,
      auto_approve_threshold: job.parameters.auto_approve_threshold || 0.8
    }
  });

  if (!response.data?.success) {
    throw new Error('Classification update failed: ' + (response.data?.error || 'Unknown error'));
  }

  return response.data.results;
}

async function createScheduledJob(supabase: any, req: Request) {
  const { job_type, parameters, run_interval_hours = 24, target_supplements = [] } = await req.json();

  // Validate job type
  const validJobTypes = ['evidence_collection', 'safety_monitoring', 'classification_update'];
  if (!validJobTypes.includes(job_type)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: `Invalid job type. Must be one of: ${validJobTypes.join(', ')}`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }

  // Calculate next run time
  const nextRunAt = new Date();
  nextRunAt.setHours(nextRunAt.getHours() + run_interval_hours);

  // Create the job
  const { data: job, error } = await supabase
    .from('monitoring_jobs')
    .insert({
      job_type,
      target_supplements,
      parameters: parameters || {},
      run_interval_hours,
      next_run_at: nextRunAt.toISOString()
    })
    .select()
    .single();

  if (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to create job: ' + error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Scheduled job created successfully',
      job: job
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    }
  );
}

async function getSchedulerStatus(supabase: any) {
  // Get job statistics
  const { data: jobStats } = await supabase
    .from('monitoring_jobs')
    .select('status, job_type, next_run_at, run_interval_hours')
    .order('created_at', { ascending: false })
    .limit(50);

  const stats = {
    total_jobs: jobStats?.length || 0,
    pending_jobs: jobStats?.filter(j => j.status === 'pending').length || 0,
    running_jobs: jobStats?.filter(j => j.status === 'running').length || 0,
    completed_jobs: jobStats?.filter(j => j.status === 'completed').length || 0,
    failed_jobs: jobStats?.filter(j => j.status === 'failed').length || 0,
    next_scheduled: jobStats?.filter(j => j.status === 'pending')
      .sort((a, b) => new Date(a.next_run_at).getTime() - new Date(b.next_run_at).getTime())[0]?.next_run_at || null
  };

  return new Response(
    JSON.stringify({
      success: true,
      scheduler_status: stats,
      recent_jobs: jobStats?.slice(0, 10) || []
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    }
  );
}