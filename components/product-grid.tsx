import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProductGrid() {
  // Sample product data - in a real app, this would come from an API or database
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
    {
      id: 5,
      name: "BMW Oil Filter",
      category: "BMW Engine Components",
      price: 19.99,
      rating: 4.5,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 6,
      name: "Mercedes Brake Discs (Pair)",
      category: "Mercedes Braking System",
      price: 129.99,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 7,
      name: "BMW Spark Plugs Set",
      category: "BMW Engine Components",
      price: 59.99,
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 8,
      name: "Mercedes Cabin Air Filter",
      category: "Mercedes HVAC",
      price: 29.99,
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 9,
      name: "BMW Wiper Blades",
      category: "BMW Exterior",
      price: 39.99,
      rating: 4.5,
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Showing 9 of 124 products</div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative"
          >
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

      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" disabled>
            &lt;
          </Button>
          <Button variant="outline" size="sm" className="bg-red-600 text-white hover:bg-red-700">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <Button variant="outline" size="icon">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
