import Link from "next/link"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

export function ProductCategories() {
  const categories = [
    {
      id: 1,
      name: "BMW Engine Parts",
      image: "/placeholder.svg?height=200&width=200",
      count: 128,
    },
    {
      id: 2,
      name: "Mercedes Engine Parts",
      image: "/placeholder.svg?height=200&width=200",
      count: 95,
    },
    {
      id: 3,
      name: "BMW Braking Systems",
      image: "/placeholder.svg?height=200&width=200",
      count: 87,
    },
    {
      id: 4,
      name: "Mercedes Braking Systems",
      image: "/placeholder.svg?height=200&width=200",
      count: 143,
    },
    {
      id: 5,
      name: "BMW Exterior Parts",
      image: "/placeholder.svg?height=200&width=200",
      count: 112,
    },
    {
      id: 6,
      name: "Mercedes Exterior Parts",
      image: "/placeholder.svg?height=200&width=200",
      count: 76,
    },
  ]

  return (
    <section className="py-12">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Find the perfect parts for your vehicle from our extensive collection
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href="#"
            className="group transform transition-all duration-300 hover:scale-110 hover:z-10 relative"
          >
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4 text-center">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} products</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
