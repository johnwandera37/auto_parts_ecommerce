import Link from "next/link"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "BMW Engine Parts",
      image: "/placeholder.svg?height=300&width=300",
      count: 128,
      slug: "bmw-engine",
    },
    {
      id: 2,
      name: "Mercedes Engine Parts",
      image: "/placeholder.svg?height=300&width=300",
      count: 95,
      slug: "mercedes-engine",
    },
    {
      id: 3,
      name: "BMW Braking Systems",
      image: "/placeholder.svg?height=300&width=300",
      count: 87,
      slug: "bmw-braking",
    },
    {
      id: 4,
      name: "Mercedes Braking Systems",
      image: "/placeholder.svg?height=300&width=300",
      count: 143,
      slug: "mercedes-braking",
    },
    {
      id: 5,
      name: "BMW Suspension & Steering",
      image: "/placeholder.svg?height=300&width=300",
      count: 76,
      slug: "bmw-suspension",
    },
    {
      id: 6,
      name: "Mercedes Suspension & Steering",
      image: "/placeholder.svg?height=300&width=300",
      count: 82,
      slug: "mercedes-suspension",
    },
    {
      id: 7,
      name: "BMW Electrical Components",
      image: "/placeholder.svg?height=300&width=300",
      count: 112,
      slug: "bmw-electrical",
    },
    {
      id: 8,
      name: "Mercedes Electrical Components",
      image: "/placeholder.svg?height=300&width=300",
      count: 98,
      slug: "mercedes-electrical",
    },
    {
      id: 9,
      name: "BMW Body & Exterior",
      image: "/placeholder.svg?height=300&width=300",
      count: 65,
      slug: "bmw-exterior",
    },
    {
      id: 10,
      name: "Mercedes Body & Exterior",
      image: "/placeholder.svg?height=300&width=300",
      count: 72,
      slug: "mercedes-exterior",
    },
    {
      id: 11,
      name: "BMW Interior Accessories",
      image: "/placeholder.svg?height=300&width=300",
      count: 54,
      slug: "bmw-interior",
    },
    {
      id: 12,
      name: "Mercedes Interior Accessories",
      image: "/placeholder.svg?height=300&width=300",
      count: 61,
      slug: "mercedes-interior",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Shop by Category</h1>
            <p className="mt-2 text-muted-foreground">Browse our extensive collection of parts organized by category</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`} className="group">
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium group-hover:text-red-600">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
