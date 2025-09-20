import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCard } from "@/components/ui/file-card"
import { Button } from "@/components/ui/button"
import { useSelectedSupplements } from "@/hooks/useSelectedSupplements"
import { useCheckin } from "@/hooks/useCheckin"
import { FileText, Plus, Download, BarChart3 } from "lucide-react"
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
    
    // Add supplement certificates
    supplements.forEach((supplement, index) => {
      files.push({
        name: `${supplement.name} Certificate`,
        type: 'pdf' as const,
        size: `${Math.floor(Math.random() * 500 + 100)} KB`,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        referenceCode: `SUP-${String(index + 1).padStart(3, '0')}`
      })
    })

    // Add analysis reports
    if (progressSummary?.average_compliance) {
      files.push({
        name: 'Monthly Analysis Report',
        type: 'spreadsheet' as const,
        size: '245 KB',
        date: new Date().toLocaleDateString(),
        referenceCode: 'RPT-001'
      })
    }

    // Add progress images
    files.push({
      name: 'Progress Chart',
      type: 'image' as const,
      size: '89 KB',
      date: new Date().toLocaleDateString(),
      referenceCode: 'IMG-001'
    })

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
      {/* Documents Header */}
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

      {/* Statistics Summary */}
      {progressSummary && (
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {activeSupplements.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Supplements
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(progressSummary.average_compliance ?? 0)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Compliance Rate
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}