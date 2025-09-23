import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EvidenceBadge } from '@/components/ui/evidence-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, FileText, FlaskConical, Users, Dna } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScientificEvidenceProps {
  supplementId: string;
  evidenceData: {
    pubmed_studies: any[];
    clinical_trials: any[];
    cochrane_reviews: any[];
    pharmgkb_data: any;
    integrated_evidence_score: number;
    evidence_classification: string;
    last_evidence_update: string;
  };
}

export const ScientificEvidencePanel: React.FC<ScientificEvidenceProps> = ({
  supplementId,
  evidenceData
}) => {
  const getEvidenceVariant = (classification: string) => {
    switch (classification) {
      case 'A+':
      case 'A':
        return 'strong';
      case 'B+':
      case 'B':
        return 'moderate';
      case 'C':
        return 'limited';
      default:
        return 'inconclusive';
    }
  };

  const formatScore = (score: number) => {
    return (score * 100).toFixed(0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5" />
            Evidência Científica
          </CardTitle>
          <div className="flex items-center gap-2">
            <EvidenceBadge evidence={getEvidenceVariant(evidenceData.evidence_classification)}>
              Grau {evidenceData.evidence_classification}
            </EvidenceBadge>
            <Badge variant="outline">
              Score: {formatScore(evidenceData.integrated_evidence_score)}%
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumo</TabsTrigger>
            <TabsTrigger value="pubmed">
              <FileText className="w-4 h-4 mr-1" />
              PubMed ({evidenceData.pubmed_studies.length})
            </TabsTrigger>
            <TabsTrigger value="trials">
              <Users className="w-4 h-4 mr-1" />
              Ensaios ({evidenceData.clinical_trials.length})
            </TabsTrigger>
            <TabsTrigger value="cochrane">
              <FlaskConical className="w-4 h-4 mr-1" />
              Cochrane ({evidenceData.cochrane_reviews.length})
            </TabsTrigger>
            <TabsTrigger value="pharmgkb">
              <Dna className="w-4 h-4 mr-1" />
              PharmGKB
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{evidenceData.pubmed_studies.length}</div>
                <div className="text-sm text-muted-foreground">Artigos PubMed</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{evidenceData.clinical_trials.length}</div>
                <div className="text-sm text-muted-foreground">Ensaios Clínicos</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{evidenceData.cochrane_reviews.length}</div>
                <div className="text-sm text-muted-foreground">Revisões Cochrane</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{formatScore(evidenceData.integrated_evidence_score)}%</div>
                <div className="text-sm text-muted-foreground">Score Integrado</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Qualidade da Evidência</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Artigos Científicos (PubMed)</span>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${Math.min(evidenceData.pubmed_studies.length * 10, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ensaios Clínicos</span>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${Math.min(evidenceData.clinical_trials.length * 20, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Revisões Sistemáticas</span>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${Math.min(evidenceData.cochrane_reviews.length * 30, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pubmed" className="space-y-4">
            {evidenceData.pubmed_studies.length > 0 ? (
              evidenceData.pubmed_studies.slice(0, 5).map((study, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">{study.title || 'Estudo PubMed'}</h4>
                    <p className="text-sm text-muted-foreground">
                      {study.abstract || study.results_summary || 'Resumo não disponível'}
                    </p>
                    <div className="flex items-center gap-2">
                      {study.pmid && (
                        <Button variant="outline" size="sm" asChild>
                          <a 
                            href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Ver no PubMed
                          </a>
                        </Button>
                      )}
                      {study.publication_date && (
                        <Badge variant="secondary">{new Date(study.publication_date).getFullYear()}</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum estudo PubMed encontrado
              </div>
            )}
          </TabsContent>

          <TabsContent value="trials" className="space-y-4">
            {evidenceData.clinical_trials.length > 0 ? (
              evidenceData.clinical_trials.slice(0, 5).map((trial, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-sm">{trial.title || trial.BriefTitle}</h4>
                      {trial.Phase && (
                        <Badge variant="outline">{trial.Phase}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {trial.intervention || trial.InterventionName}
                    </p>
                    <div className="flex items-center gap-2">
                      {trial.NCTId && (
                        <Button variant="outline" size="sm" asChild>
                          <a 
                            href={`https://clinicaltrials.gov/ct2/show/${trial.NCTId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Ver Ensaio
                          </a>
                        </Button>
                      )}
                      {trial.sample_size && (
                        <Badge variant="secondary">{trial.sample_size} participantes</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum ensaio clínico encontrado
              </div>
            )}
          </TabsContent>

          <TabsContent value="cochrane" className="space-y-4">
            {evidenceData.cochrane_reviews.length > 0 ? (
              evidenceData.cochrane_reviews.slice(0, 5).map((review, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">{review.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {review.abstract || review.results_summary || 'Revisão sistemática Cochrane'}
                    </p>
                    <div className="flex items-center gap-2">
                      {review.doi && (
                        <Button variant="outline" size="sm" asChild>
                          <a 
                            href={`https://doi.org/${review.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Ver Revisão
                          </a>
                        </Button>
                      )}
                      <Badge variant="secondary">Revisão Sistemática</Badge>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma revisão Cochrane encontrada
              </div>
            )}
          </TabsContent>

          <TabsContent value="pharmgkb" className="space-y-4">
            {evidenceData.pharmgkb_data && Object.keys(evidenceData.pharmgkb_data).length > 0 ? (
              <Card className="p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Dados Farmacogenômicos</h4>
                  <p className="text-sm text-muted-foreground">
                    Informações sobre interações genéticas e metabolismo individual deste suplemento.
                  </p>
                  <div className="space-y-2">
                    {evidenceData.pharmgkb_data.interactions && (
                      <div>
                        <span className="font-medium text-sm">Interações Genéticas:</span>
                        <p className="text-sm text-muted-foreground">{evidenceData.pharmgkb_data.interactions}</p>
                      </div>
                    )}
                    {evidenceData.pharmgkb_data.metabolism && (
                      <div>
                        <span className="font-medium text-sm">Metabolismo:</span>
                        <p className="text-sm text-muted-foreground">{evidenceData.pharmgkb_data.metabolism}</p>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href="https://www.pharmgkb.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Ver no PharmGKB
                    </a>
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum dado farmacogenômico disponível
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Última atualização: {new Date(evidenceData.last_evidence_update).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};