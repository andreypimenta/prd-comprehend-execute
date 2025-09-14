import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Showcase() {
  return (
    <div className="min-h-screen bg-secondary-lightGray p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-primary-navy mb-4">
            LoL Engine Design System
          </h1>
          <p className="text-text-mediumGray text-lg">
            Componentes profissionais para recomendações de suplementos com IA
          </p>
        </div>

        {/* Buttons */}
        <Card className="p-8">
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Todas as variantes de botões do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="error">Error</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card className="p-8">
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Campos de entrada com diferentes estados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Input padrão" />
              <Input placeholder="Input com erro" className="border-status-error" />
              <Input placeholder="Input com sucesso" className="border-status-success" />
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="p-8">
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Indicadores de status e evidência</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-evidence-strong text-primary-white">Evidência Forte</Badge>
              <Badge className="bg-evidence-moderate text-primary-white">Evidência Moderada</Badge>
              <Badge className="bg-evidence-limited text-primary-navy">Evidência Limitada</Badge>
              <Badge className="bg-evidence-inconclusive text-text-darkGray">Evidência Inconclusiva</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card className="p-8">
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Sistema tipográfico do LoL Engine</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-heading font-bold text-primary-navy">Heading 1</h1>
              <h2 className="text-3xl font-heading font-semibold text-primary-navy">Heading 2</h2>
              <h3 className="text-2xl font-heading font-medium text-primary-navy">Heading 3</h3>
              <p className="text-base text-text-darkGray">Texto principal do sistema</p>
              <p className="text-sm text-text-mediumGray">Texto secundário</p>
              <p className="text-xs text-text-lightGray">Texto pequeno</p>
            </div>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card className="p-8">
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>Paleta de cores do LoL Engine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Primary</h4>
                <div className="h-16 bg-primary-navy rounded-lg border"></div>
                <div className="h-16 bg-primary-white rounded-lg border"></div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Accent</h4>
                <div className="h-16 bg-accent-mintGreen rounded-lg border"></div>
                <div className="h-16 bg-accent-softBlue rounded-lg border"></div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Status</h4>
                <div className="h-16 bg-status-success rounded-lg border"></div>
                <div className="h-16 bg-status-warning rounded-lg border"></div>
                <div className="h-16 bg-status-error rounded-lg border"></div>
                <div className="h-16 bg-status-info rounded-lg border"></div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Evidence</h4>
                <div className="h-16 bg-evidence-strong rounded-lg border"></div>
                <div className="h-16 bg-evidence-moderate rounded-lg border"></div>
                <div className="h-16 bg-evidence-limited rounded-lg border"></div>
                <div className="h-16 bg-evidence-inconclusive rounded-lg border"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}