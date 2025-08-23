import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BrandsPage() {
  const brands = [
    {
      id: 1,
      name: "BMW",
      logo: "/placeholder.svg?height=200&width=200",
      description:
        "The Ultimate Driving Machine. We offer a complete range of genuine BMW parts and accessories for all models.",
      popularModels: ["3 Series", "5 Series", "X5", "M3", "M5"],
      slug: "bmw",
    },
    {
      id: 2,
      name: "Mercedes-Benz",
      logo: "/placeholder.svg?height=200&width=200",
      description:
        "The Best or Nothing. Explore our extensive collection of authentic Mercedes-Benz parts for luxury and performance.",
      popularModels: ["C-Class", "E-Class", "S-Class", "GLE", "AMG GT"],
      slug: "mercedes",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Our Specialty Brands</h1>
            <p className="mt-2 text-muted-foreground">
              We specialize in genuine and OEM parts for these premium German manufacturers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {brands.map((brand) => (
              <Card key={brand.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center md:flex-row md:items-start md:gap-6">
                    <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-100 p-4 md:mb-0">
                      <Image
                        src={brand.logo || "/placeholder.svg"}
                        alt={brand.name}
                        width={100}
                        height={100}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold">{brand.name}</h3>
                      <p className="mt-2 text-muted-foreground">{brand.description}</p>
                      <div className="mt-4">
                        <h4 className="font-medium">Popular Models:</h4>
                        <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
                          {brand.popularModels.map((model) => (
                            <span key={model} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                              {model}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6">
                        <Button asChild className="bg-red-600 hover:bg-red-700">
                          <Link href={`/brands/${brand.slug}`}>Shop {brand.name} Parts</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
