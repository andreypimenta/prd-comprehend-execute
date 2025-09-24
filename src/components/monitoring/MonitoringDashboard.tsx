import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SecurityAlertsPanel } from './SecurityAlertsPanel';
import { EvidenceReviewPanel } from './EvidenceReviewPanel';
import { useAutomaticUpdates } from '@/hooks/useAutomaticUpdates';
import { 
  Activity, 
  Shield, 
  Eye, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Play,
  Pause
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function MonitoringDashboard() {
  const {
    monitoringJobs,
    loading,
    error,
    fetchMonitoringJobs,
    createScheduledJob,
    getSchedulerStatus,
    getCriticalAlertsCount,
    getPendingReviewsCount
  } = useAutomaticUpdates();

  const [schedulerStatus, setSchedulerStatus] = useState<any>(null);
  const [createJobLoading, setCreateJobLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMonitoringJobs();
    loadSchedulerStatus();
  }, []);

  const loadSchedulerStatus = async () => {
    try {
      const status = await getSchedulerStatus();
      setSchedulerStatus(status);
    } catch (err) {
      console.error('Error loading scheduler status:', err);
    }
  };

  const handleCreateJob = async (jobType: string, intervalHours: number = 24) => {
    setCreateJobLoading(true);
    try {
      await createScheduledJob(jobType, {
        batch_size: jobType === 'evidence_collection' ? 10 : 20,
        auto_approve_threshold: 0.8
      }, intervalHours);
      
      toast({
        title: "Job Criado",
        description: `Job de ${jobType} criado com sucesso.`,
      });
      await loadSchedulerStatus();
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao criar job de monitoramento.",
        variant: "destructive"
      });
    } finally {
      setCreateJobLoading(false);
    }
  };

  const getJobStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getJobStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'default';
      case 'completed': return 'secondary';
      case 'failed': return 'destructive';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const criticalAlerts = getCriticalAlertsCount();
  const pendingReviews = getPendingReviewsCount();

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{criticalAlerts}</p>
                <p className="text-xs text-muted-foreground">Alertas Críticos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{pendingReviews}</p>
                <p className="text-xs text-muted-foreground">Revisões Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {schedulerStatus?.scheduler_status?.running_jobs || 0}
                </p>
                <p className="text-xs text-muted-foreground">Jobs Executando</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">
                  {schedulerStatus?.scheduler_status?.completed_jobs || 0}
                </p>
                <p className="text-xs text-muted-foreground">Jobs Completados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Ações Rápidas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleCreateJob('evidence_collection', 12)}
              disabled={createJobLoading}
              variant="outline"
            >
              Coleta de Evidências (12h)
            </Button>
            <Button
              onClick={() => handleCreateJob('safety_monitoring', 6)}
              disabled={createJobLoading}
              variant="outline"
            >
              Monitoramento de Segurança (6h)
            </Button>
            <Button
              onClick={() => handleCreateJob('classification_update', 24)}
              disabled={createJobLoading}
              variant="outline"
            >
              Atualização de Classificações (24h)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">
            Alertas de Segurança
            {criticalAlerts > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {criticalAlerts}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reviews">
            Revisão de Evidências
            {pendingReviews > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {pendingReviews}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="jobs">
            Jobs de Monitoramento
          </TabsTrigger>
          <TabsTrigger value="status">
            Status do Sistema
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="mt-6">
          <SecurityAlertsPanel />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <EvidenceReviewPanel />
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Jobs de Monitoramento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : monitoringJobs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhum job de monitoramento encontrado</p>
                  </div>
                ) : (
                  monitoringJobs.map((job) => (
                    <Card key={job.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getJobStatusIcon(job.status)}
                            <span className="font-medium">
                              {job.job_type.replace('_', ' ').toUpperCase()}
                            </span>
                            <Badge variant={getJobStatusColor(job.status) as any}>
                              {job.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Intervalo: {job.run_interval_hours}h
                          </div>
                        </div>

                        {job.progress && (
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>Progresso: {job.progress.stage || 'N/A'}</span>
                              <span>{job.progress.completed || 0}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${job.progress.completed || 0}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                          <div>
                            <span className="font-medium">Criado:</span>
                            <br />
                            {format(new Date(job.created_at), 'dd/MM/yyyy HH:mm')}
                          </div>
                          <div>
                            <span className="font-medium">Próxima Execução:</span>
                            <br />
                            {job.next_run_at ? format(new Date(job.next_run_at), 'dd/MM/yyyy HH:mm') : 'N/A'}
                          </div>
                        </div>

                        {job.error_message && (
                          <Alert className="mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-xs">
                              {job.error_message}
                            </AlertDescription>
                          </Alert>
                        )}

                        {job.results && Object.keys(job.results).length > 0 && (
                          <div className="mt-2 p-2 bg-muted rounded text-xs">
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(job.results, null, 2)}
                            </pre>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Status do Sistema</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {schedulerStatus ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {schedulerStatus.scheduler_status.total_jobs}
                      </p>
                      <p className="text-sm text-muted-foreground">Total de Jobs</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">
                        {schedulerStatus.scheduler_status.pending_jobs}
                      </p>
                      <p className="text-sm text-muted-foreground">Pendentes</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {schedulerStatus.scheduler_status.completed_jobs}
                      </p>
                      <p className="text-sm text-muted-foreground">Completados</p>
                    </div>
                  </div>

                  {schedulerStatus.scheduler_status.next_scheduled && (
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="font-medium mb-1">Próxima Execução Agendada:</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(schedulerStatus.scheduler_status.next_scheduled), 'dd/MM/yyyy HH:mm')}
                      </p>
                    </div>
                  )}

                  {schedulerStatus.recent_jobs && schedulerStatus.recent_jobs.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Jobs Recentes:</h4>
                      <div className="space-y-2">
                        {schedulerStatus.recent_jobs.map((job: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center space-x-2">
                              {getJobStatusIcon(job.status)}
                              <span className="text-sm font-medium">
                                {job.job_type.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                            <Badge variant={getJobStatusColor(job.status) as any} className="text-xs">
                              {job.status.toUpperCase()}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}