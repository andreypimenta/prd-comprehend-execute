import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertTriangle, Shield, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { useAutomaticUpdates } from '@/hooks/useAutomaticUpdates';
import { format } from 'date-fns';

export function SecurityAlertsPanel() {
  const {
    securityAlerts,
    loading,
    error,
    fetchSecurityAlerts,
    runSecurityMonitoring,
    getCriticalAlertsCount
  } = useAutomaticUpdates();

  const [activeTab, setActiveTab] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSecurityAlerts();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Run security monitoring for top supplements
      await runSecurityMonitoring(['vitamin_d3', 'omega_3', 'magnesium', 'zinc', 'vitamin_c']);
    } catch (err) {
      console.error('Error refreshing security alerts:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getFilteredAlerts = () => {
    switch (activeTab) {
      case 'critical':
        return securityAlerts.filter(alert => alert.severity === 'critical');
      case 'high':
        return securityAlerts.filter(alert => alert.severity === 'high');
      case 'recalls':
        return securityAlerts.filter(alert => alert.alert_type === 'recall');
      default:
        return securityAlerts;
    }
  };

  const criticalCount = getCriticalAlertsCount();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Alertas de Segurança</CardTitle>
          {criticalCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {criticalCount} Críticos
            </Badge>
          )}
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              Todos ({securityAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="critical">
              Críticos ({securityAlerts.filter(a => a.severity === 'critical').length})
            </TabsTrigger>
            <TabsTrigger value="high">
              Alto ({securityAlerts.filter(a => a.severity === 'high').length})
            </TabsTrigger>
            <TabsTrigger value="recalls">
              Recalls ({securityAlerts.filter(a => a.alert_type === 'recall').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <ScrollArea className="h-96">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : getFilteredAlerts().length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum alerta encontrado</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getFilteredAlerts().map((alert) => (
                    <Card key={alert.id} className="border-l-4 border-l-destructive">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between space-x-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              {getSeverityIcon(alert.severity)}
                              <Badge variant={getSeverityColor(alert.severity) as any}>
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">
                                {alert.source}
                              </Badge>
                              <Badge variant="secondary">
                                {alert.alert_type.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            
                            <h4 className="font-semibold text-sm">{alert.title}</h4>
                            
                            {alert.description && (
                              <p className="text-sm text-muted-foreground">
                                {alert.description}
                              </p>
                            )}

                            {Array.isArray(alert.affected_products) && alert.affected_products.length > 0 && (
                              <div>
                                <p className="text-xs font-medium mb-1">Produtos Afetados:</p>
                                <div className="flex flex-wrap gap-1">
                                  {alert.affected_products.slice(0, 3).map((product, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {String(product)}
                                    </Badge>
                                  ))}
                                  {alert.affected_products.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{alert.affected_products.length - 3} mais
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}

                            {Array.isArray(alert.recommended_actions) && alert.recommended_actions.length > 0 && (
                              <div>
                                <p className="text-xs font-medium mb-1">Ações Recomendadas:</p>
                                <ul className="text-xs text-muted-foreground list-disc list-inside">
                                  {alert.recommended_actions.slice(0, 2).map((action, idx) => (
                                    <li key={idx}>{String(action)}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{format(new Date(alert.alert_date), 'dd/MM/yyyy')}</span>
                              </div>
                              {alert.external_reference && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-0 text-xs"
                                  asChild
                                >
                                  <a
                                    href={`#ref-${alert.external_reference}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    <span>Referência</span>
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}