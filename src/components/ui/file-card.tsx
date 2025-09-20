import * as React from "react";
import { FileText, Image, FileSpreadsheet, FileIcon, Download, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  type: "pdf" | "image" | "spreadsheet" | "document" | "other";
  size: string;
  date: string;
  referenceCode?: string;
  onView?: () => void;
  onDownload?: () => void;
}

const iconMap = {
  pdf: FileText,
  image: Image,
  spreadsheet: FileSpreadsheet,
  document: FileText,
  other: FileIcon
};

const colorMap = {
  pdf: "text-red-500",
  image: "text-green-500",
  spreadsheet: "text-emerald-500",
  document: "text-blue-500",
  other: "text-gray-500"
};

export function FileCard({
  name,
  type,
  size,
  date,
  referenceCode,
  onView,
  onDownload,
  className,
  ...props
}: FileCardProps) {
  const Icon = iconMap[type];

  return (
    <Card className={cn("hover:bg-accent/5 transition-colors cursor-pointer group", className)} {...props}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className={cn("mt-1", colorMap[type])}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {name}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">{size}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{date}</span>
              </div>
              {referenceCode && (
                <Badge variant="outline" className="mt-2 text-xs font-mono">
                  {referenceCode}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onView && (
              <Button size="sm" variant="ghost" onClick={onView} className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            )}
            {onDownload && (
              <Button size="sm" variant="ghost" onClick={onDownload} className="h-8 w-8 p-0">
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}