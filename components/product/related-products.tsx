import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function RelatedProducts() {
  // Sample related products data - in a real app, this would come from an API or database
  const relatedProducts = [
    {
      id: 2,
      name: "BMW Brake Discs (Front)",
      category: "BMW Braking System",
      price: 129.99,
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "BMW Brake Fluid DOT 4",
      category: "BMW Braking System",
      price: 19.99,
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "BMW Brake Caliper Rebuild Kit",
      category: "BMW Braking System",
      price: 49.99,
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 5,
      name: "BMW Brake Wear Sensor",
      category: "BMW Braking System",
      price: 29.99,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {relatedProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
          <Link href={`/shop/product/${product.id}`}>
            <div className="aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </Link>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">{product.category}</div>
            <Link href={`/shop/product/${product.id}`}>
              <h3 className="mt-1 font-medium hover:text-red-600">{product.name}</h3>
            </Link>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating}</span>
            </div>
            <div className="mt-3 font-bold">${product.price.toFixed(2)}</div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-red-600 hover:bg-red-700">Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
