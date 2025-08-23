import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CompatibilityHeader } from "@/components/compatibility-header"

export default function CompatibilityPage({
  searchParams,
}: {
  searchParams: { make: string; model: string; series: string; year: string; engine: string }
}) {
  const { make, model, series, year, engine } = searchParams

  // In a real app, these would be fetched based on the search parameters
  const compatibleParts = getCompatibleParts(make, model, series, year, engine)

  return (
    <div className="container px-4 py-6 md:px-6 md:py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <CompatibilityHeader make={make} model={model} series={series} year={year} engine={engine} />

      <div className="mt-8">
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Parts</TabsTrigger>
              <TabsTrigger value="engine">Engine</TabsTrigger>
              <TabsTrigger value="braking">Braking</TabsTrigger>
              <TabsTrigger value="suspension">Suspension</TabsTrigger>
              <TabsTrigger value="electrical">Electrical</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by: Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {compatibleParts.map((part) => (
                <CompatiblePartCard key={part.id} part={part} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="engine" className="mt-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {compatibleParts
                .filter((part) => part.category === "Engine")
                .map((part) => (
                  <CompatiblePartCard key={part.id} part={part} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="braking" className="mt-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {compatibleParts
                .filter((part) => part.category === "Braking")
                .map((part) => (
                  <CompatiblePartCard key={part.id} part={part} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="suspension" className="mt-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {compatibleParts
                .filter((part) => part.category === "Suspension")
                .map((part) => (
                  <CompatiblePartCard key={part.id} part={part} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="electrical" className="mt-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {compatibleParts
                .filter((part) => part.category === "Electrical")
                .map((part) => (
                  <CompatiblePartCard key={part.id} part={part} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function CompatiblePartCard({ part }: { part: any }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute left-2 top-2 z-10 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
          {part.condition}
        </div>
        <Image
          src={part.image || "/placeholder.svg"}
          alt={part.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground">{part.category}</div>
        <h3 className="mt-1 font-medium">{part.name}</h3>
        <div className="mt-1 text-xs text-muted-foreground">Part #: {part.partNumber}</div>
        <div className="mt-4 flex items-center gap-2 text-green-600">
          <Check className="h-4 w-4" />
          <span className="text-sm">Compatible with your vehicle</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="font-bold">${part.price.toFixed(2)}</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Details
            </Button>
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Mock data generator - in a real app, this would be a server-side API call
function getCompatibleParts(make: string, model: string, series: string, year: string, engine: string) {
  // This is just sample data - in a real app, you'd fetch from a database
  const parts = [
    {
      id: 1,
      name: "OEM Oil Filter",
      category: "Engine",
      price: 14.99,
      image: "/placeholder.svg?height=300&width=300",
      partNumber: make === "BMW" ? "11427566327" : "A6261840000",
      condition: "New",
    },
    {
      id: 2,
      name: "Premium Brake Pads (Front)",
      category: "Braking",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      partNumber: make === "BMW" ? "34116794916" : "0074205220",
      condition: "New",
    },
    {
      id: 3,
      name: "Air Filter",
      category: "Engine",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      partNumber: make === "BMW" ? "13717532754" : "A2780940004",
      condition: "New",
    },
    {
      id: 4,
      name: "Spark Plugs (Set of 4)",
      category: "Engine",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      partNumber: make === "BMW" ? "12120035224" : "A0041591003",
      condition: "New",
    },
    {
      id: 5,
      name: "Brake Disc (Front)",
      category: "Braking",
      price: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      partNumber: make === "BMW" ? "34116855152" : "2204230012",
      condition: "New",
    },
    {
      id: 6,
      name: "Control Arm",
      category: "Suspension",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      partNumber: make === "BMW" ? "31126774826" : "2123308907",
      condition: "New",
    },
    {
      id: 7,
      name: "Shock Absorber",
      category: "Suspension",
      price: 119.99,
      image: "/placeholder.svg?height=300&width=300",
      partNumber: make === "BMW" ? "31326784547" : "2123200130",
      condition: "New",
    },
    {
      id: 8,
      name: "Cabin Air Filter",
      category: "HVAC",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      partNumber: make === "BMW" ? "64119272642" : "2128300318",
      condition: "New",
    },
    {
      id: 9,
      name: "Alternator",
      category: "Electrical",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      partNumber: make === "BMW" ? "12317561939" : "0121615002",
      condition: "Remanufactured",
    },
  ]

  return parts
}

// Import these from @/components/ui
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
