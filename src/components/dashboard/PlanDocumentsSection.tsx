import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCard } from "@/components/ui/file-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useSelectedSupplements } from "@/hooks/useSelectedSupplements"
import { useCheckin } from "@/hooks/useCheckin"
import { FileText, Plus, Download, BarChart3, Shield } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"

interface Supplement {
  id: string
  name: string
  category: string
}

export function PlanDocumentsSection() {
  const { selectedSupplements, loading: supplementsLoading } = useSelectedSupplements()
  const { getProgressSummary } = useCheckin()
  const [supplements, setSupplements] = useState<Supplement[]>([])
  const [loading, setLoading] = useState(true)

  const activeSupplements = selectedSupplements?.filter(s => s.is_active) || []
  const progressSummary = getProgressSummary()

  useEffect(() => {
    const fetchSupplements = async () => {
      if (activeSupplements.length === 0) {
        setLoading(false)
        return
      }

      try {
        const supplementIds = activeSupplements.map(s => s.supplement_id)
        const { data, error } = await supabase
          .from('supplements')
          .select('id, name, category')
          .in('id', supplementIds)

        if (error) throw error
        setSupplements(data || [])
      } catch (error) {
        console.error('Error fetching supplements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSupplements()
  }, [activeSupplements])

  // Generate file cards for supplements and reports
  const generateFileCards = () => {
    const files: any[] = []
    
    // Add supplement certificates with Ref Code format
    supplements.forEach((supplement, index) => {
      files.push({
        name: `${supplement.name} Certificate`,
        type: 'pdf' as const,
        size: `${Math.floor(Math.random() * 500 + 100)} MB`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        referenceCode: `Ref Code`
      })
    })

    // Add more ref codes to match reference
    for (let i = 0; i < 3; i++) {
      files.push({
        name: `Document ${i + 1}`,
        type: 'pdf' as const,
        size: `${Math.floor(Math.random() * 200 + 50)} MB`,
        date: new Date().toLocaleDateString(),
        referenceCode: `Ref Code`
      })
    }

    return files
  }

  if (supplementsLoading || loading) {
    return (
      <div className="space-y-6">
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
        <div className="h-48 bg-muted animate-pulse rounded-lg" />
      </div>
    )
  }

  const files = generateFileCards()

  return (
    <div className="space-y-6">
      {/* Main Insurance Card - Turquoise */}
      <Card className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border-cyan-500/30">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                $20k Health Individual Insurances
              </h3>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-cyan-500" />
                <span className="text-sm text-muted-foreground">Premium Coverage</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bars */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-card-foreground font-medium">Spent</span>
                <span className="text-card-foreground">$8,500 / $20,000</span>
              </div>
              <Progress value={42.5} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-card-foreground font-medium">Available</span>
                <span className="text-card-foreground">$11,500 remaining</span>
              </div>
              <Progress value={57.5} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-card-foreground flex items-center">
              <FileText className="h-6 w-6 mr-2 text-primary" />
              Details About Your Plan
            </CardTitle>
            <Button size="sm" variant="outline" className="border-primary/30 hover:border-primary">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {files.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                No documents yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Your supplement certificates and reports will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {files.map((file, index) => (
                <FileCard
                  key={index}
                  name={file.name}
                  type={file.type}
                  size={file.size}
                  date={file.date}
                  referenceCode={file.referenceCode}
                  onView={() => console.log('View file:', file.name)}
                  onDownload={() => console.log('Download file:', file.name)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground">
            <Download className="h-4 w-4 mr-2" />
            Download Complete Plan
          </Button>
          <Button variant="outline" className="w-full justify-start border-primary/30 hover:border-primary hover:bg-primary/5">
            <FileText className="h-4 w-4 mr-2" />
            Generate Monthly Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}