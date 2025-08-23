import Image from "next/image"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "BMW OEM Brake Pads",
      category: "BMW Braking System",
      price: 89.99,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Mercedes Performance Air Filter",
      category: "Mercedes Engine Components",
      price: 49.99,
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "BMW LED Headlight Set",
      category: "BMW Lighting",
      price: 199.99,
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Mercedes Suspension Kit",
      category: "Mercedes Suspension",
      price: 349.99,
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Featured Products</h2>
            <p className="text-gray-400">Top-quality parts for your vehicle</p>
          </div>
          <Button
            variant="outline"
            className="border-dp-gold text-dp-gold hover:bg-dp-red hover:text-white hover:border-dp-red transition-all duration-300"
          >
            View All
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-800 border-gray-700 transform hover:scale-105 hover:z-10 relative"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="text-sm text-gray-400">{product.category}</div>
                <h3 className="mt-1 font-medium text-white">{product.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-dp-gold text-dp-gold" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">{product.rating}</span>
                </div>
                <div className="mt-3 font-bold text-dp-gold">${product.price.toFixed(2)}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-dp-red hover:bg-dp-gold hover:text-dp-black transition-all duration-300">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
