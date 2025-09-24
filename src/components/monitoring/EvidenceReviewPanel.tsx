import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Eye, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAutomaticUpdates } from '@/hooks/useAutomaticUpdates';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

export function EvidenceReviewPanel() {
  const {
    evidenceClassifications,
    loading,
    error,
    fetchEvidenceClassifications,
    approveEvidenceClassification,
    rejectEvidenceClassification,
    getPendingReviewsCount
  } = useAutomaticUpdates();

  const [activeTab, setActiveTab] = useState('pending');
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedClassification, setSelectedClassification] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvidenceClassifications(activeTab === 'pending');
  }, [activeTab]);

  const handleApprove = async (classificationId: string) => {
    if (!selectedClassification) return;
    
    setActionLoading(true);
    try {
      await approveEvidenceClassification(classificationId, reviewNotes);
      toast({
        title: "Classificação Aprovada",
        description: "A mudança de classificação foi aplicada com sucesso.",
      });
      setReviewNotes('');
      setSelectedClassification(null);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao aprovar classificação.",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (classificationId: string) => {
    if (!selectedClassification || !reviewNotes.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, forneça uma justificativa para a rejeição.",
        variant: "destructive"
      });
      return;
    }
    
    setActionLoading(true);
    try {
      await rejectEvidenceClassification(classificationId, reviewNotes);
      toast({
        title: "Classificação Rejeitada",
        description: "A mudança de classificação foi rejeitada.",
      });
      setReviewNotes('');
      setSelectedClassification(null);
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao rejeitar classificação.",
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const getClassificationIcon = (type: string) => {
    switch (type) {
      case 'evidence_level':
        return <TrendingUp className="h-4 w-4" />;
      case 'safety_profile':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const getClassificationColor = (oldClass: string, newClass: string) => {
    const levels = ['insufficient', 'limited', 'moderate', 'strong'];
    const oldIndex = levels.indexOf(oldClass);
    const newIndex = levels.indexOf(newClass);
    
    if (newIndex > oldIndex) return 'text-green-600';
    if (newIndex < oldIndex) return 'text-red-600';
    return 'text-blue-600';
  };

  const pendingCount = getPendingReviewsCount();

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-primary" />
          <CardTitle>Revisão de Evidências</CardTitle>
          {pendingCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {pendingCount} Pendentes
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {error && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="pending">
              Pendentes ({pendingCount})
            </TabsTrigger>
            <TabsTrigger value="all">
              Histórico ({evidenceClassifications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <ScrollArea className="h-96">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : evidenceClassifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma classificação para revisão</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {evidenceClassifications.map((classification) => (
                    <Card key={classification.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getClassificationIcon(classification.classification_type)}
                              <Badge variant="outline">
                                {classification.classification_type.replace('_', ' ').toUpperCase()}
                              </Badge>
                              <Badge variant={classification.auto_approved ? 'default' : 'secondary'}>
                                {classification.auto_approved ? 'Auto-aprovado' : 'Requer Revisão'}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{format(new Date(classification.created_at), 'dd/MM/yyyy HH:mm')}</span>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-1">Suplemento: {classification.supplement_id}</p>
                            <div className="flex items-center space-x-2 text-sm">
                              <span>Classificação:</span>
                              <Badge variant="outline">{classification.old_classification}</Badge>
                              <span>→</span>
                              <Badge 
                                variant="outline" 
                                className={getClassificationColor(classification.old_classification, classification.new_classification)}
                              >
                                {classification.new_classification}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium mb-1">Confiança:</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-secondary rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${classification.confidence_score}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">
                                {classification.confidence_score.toFixed(1)}%
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium mb-1">Justificativa:</p>
                            <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                              {classification.reasoning}
                            </p>
                          </div>

                          {Array.isArray(classification.supporting_studies) && classification.supporting_studies.length > 0 && (
                            <div>
                              <p className="text-xs font-medium mb-1">
                                Estudos de Apoio ({classification.supporting_studies.length}):
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {classification.supporting_studies.slice(0, 3).map((study: any, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {study.database_source?.toUpperCase() || 'N/A'}
                                  </Badge>
                                ))}
                                {classification.supporting_studies.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{classification.supporting_studies.length - 3} mais
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {classification.requires_review && !classification.reviewed_at && (
                            <div className="flex space-x-2 pt-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    onClick={() => setSelectedClassification(classification)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Aprovar
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Aprovar Classificação</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-sm mb-2">
                                        Aprovando mudança de <strong>{classification.old_classification}</strong> para{' '}
                                        <strong>{classification.new_classification}</strong>
                                      </p>
                                      <Textarea
                                        placeholder="Notas de revisão (opcional)"
                                        value={reviewNotes}
                                        onChange={(e) => setReviewNotes(e.target.value)}
                                      />
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        onClick={() => handleApprove(classification.id)}
                                        disabled={actionLoading}
                                      >
                                        Confirmar Aprovação
                                      </Button>
                                      <Button variant="outline" onClick={() => setSelectedClassification(null)}>
                                        Cancelar
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    onClick={() => setSelectedClassification(classification)}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Rejeitar
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Rejeitar Classificação</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-sm mb-2">
                                        Rejeitando mudança de <strong>{classification.old_classification}</strong> para{' '}
                                        <strong>{classification.new_classification}</strong>
                                      </p>
                                      <Textarea
                                        placeholder="Justificativa para rejeição (obrigatório)"
                                        value={reviewNotes}
                                        onChange={(e) => setReviewNotes(e.target.value)}
                                        required
                                      />
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        onClick={() => handleReject(classification.id)}
                                        disabled={actionLoading || !reviewNotes.trim()}
                                      >
                                        Confirmar Rejeição
                                      </Button>
                                      <Button variant="outline" onClick={() => setSelectedClassification(null)}>
                                        Cancelar
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}

                          {classification.reviewed_at && (
                            <div className="pt-2 border-t">
                              <div className="flex items-center space-x-2 text-xs">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                <span>Revisado em {format(new Date(classification.reviewed_at), 'dd/MM/yyyy HH:mm')}</span>
                                {classification.applied_at && (
                                  <>
                                    <span>•</span>
                                    <span className="text-green-600">Aplicado</span>
                                  </>
                                )}
                              </div>
                              {classification.review_notes && (
                                <p className="text-xs text-muted-foreground mt-1 bg-muted p-2 rounded">
                                  {classification.review_notes}
                                </p>
                              )}
                            </div>
                          )}
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