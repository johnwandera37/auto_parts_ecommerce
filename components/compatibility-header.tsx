import { Dot } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

export function CompatibilityHeader({
  make,
  model,
  series,
  year,
  engine,
}: {
  make: string
  model: string
  series: string
  year: string
  engine: string
}) {
  return (
    <Card className="bg-gray-50">
      <CardContent className="p-6">
        <h1 className="text-2xl font-bold">Compatible Parts</h1>
        <p className="text-muted-foreground">Showing parts compatible with your selected vehicle</p>

        <div className="mt-4 flex flex-wrap items-center text-sm">
          <span className="font-semibold">{make}</span>
          <Dot className="h-6 w-6 text-gray-400" />
          <span className="font-semibold">{model}</span>
          <Dot className="h-6 w-6 text-gray-400" />
          <span>{series}</span>
          <Dot className="h-6 w-6 text-gray-400" />
          <span>{year}</span>
          <Dot className="h-6 w-6 text-gray-400" />
          <span>{engine}</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <div className="text-xs text-muted-foreground">Make</div>
            <div className="font-medium">{make}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Model</div>
            <div className="font-medium">{model}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Series</div>
            <div className="font-medium">{series}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Year</div>
            <div className="font-medium">{year}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Engine</div>
            <div className="font-medium">{engine}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
