import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function BrandShowcase() {
  const brands = [
    {
      id: 1,
      name: "BMW",
      logo: "/placeholder.svg?height=200&width=200",
      description:
        "The Ultimate Driving Machine. We offer a complete range of genuine BMW parts and accessories for all models.",
      popularModels: ["3 Series", "5 Series", "X5", "M3", "M5"],
    },
    {
      id: 2,
      name: "Mercedes-Benz",
      logo: "/placeholder.svg?height=200&width=200",
      description:
        "The Best or Nothing. Explore our extensive collection of authentic Mercedes-Benz parts for luxury and performance.",
      popularModels: ["C-Class", "E-Class", "S-Class", "GLE", "AMG GT"],
    },
  ]

  return (
    <section className="py-16 bg-dp-black">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
            <span className="text-dp-gold">OUR SPECIALTY</span> BRANDS
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl">
            We specialize in genuine and OEM parts for these premium German manufacturers
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {brands.map((brand) => (
            <Card
              key={brand.id}
              className="overflow-hidden bg-gray-900 border-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 transform hover:scale-105 hover:z-10 relative"
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
                  <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-white p-4 md:mb-0">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      width={100}
                      height={100}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-bold text-white mb-3">{brand.name}</h3>
                    <p className="text-gray-300 mb-6">{brand.description}</p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-dp-gold mb-3">Popular Models:</h4>
                      <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                        {brand.popularModels.map((model) => (
                          <span
                            key={model}
                            className="rounded-full bg-dp-black border border-dp-gold px-3 py-1 text-sm text-dp-gold"
                          >
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Button
                        asChild
                        className="bg-dp-gold text-dp-black hover:bg-dp-red hover:text-white font-bold transition-all duration-300"
                      >
                        <Link href={`/brands/${brand.name === "BMW" ? "bmw" : "mercedes"}`}>
                          SHOP {brand.name.toUpperCase()} PARTS
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
