import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DealsPage() {
  const deals = [
    {
      id: 1,
      name: "BMW Maintenance Kit",
      originalPrice: 149.99,
      salePrice: 99.99,
      discount: 33,
      image: "/placeholder.svg?height=300&width=300",
      endsIn: "2 days",
    },
    {
      id: 2,
      name: "Mercedes Brake Package",
      originalPrice: 299.99,
      salePrice: 199.99,
      discount: 33,
      image: "/placeholder.svg?height=300&width=300",
      endsIn: "5 days",
    },
    {
      id: 3,
      name: "BMW Performance Exhaust",
      originalPrice: 599.99,
      salePrice: 449.99,
      discount: 25,
      image: "/placeholder.svg?height=300&width=300",
      endsIn: "3 days",
    },
    {
      id: 4,
      name: "Mercedes LED Lighting Kit",
      originalPrice: 249.99,
      salePrice: 179.99,
      discount: 28,
      image: "/placeholder.svg?height=300&width=300",
      endsIn: "1 day",
    },
    {
      id: 5,
      name: "BMW Interior Accessory Bundle",
      originalPrice: 199.99,
      salePrice: 129.99,
      discount: 35,
      image: "/placeholder.svg?height=300&width=300",
      endsIn: "4 days",
    },
    {
      id: 6,
      name: "Mercedes Suspension Upgrade",
      originalPrice: 799.99,
      salePrice: 599.99,
      discount: 25,
      image: "/placeholder.svg?height=300&width=300",
      endsIn: "7 days",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-red-600 py-12 text-white">
          <div className="container px-4 text-center md:px-6">
            <h1 className="text-4xl font-bold tracking-tight">Special Deals & Offers</h1>
            <p className="mt-2 text-xl">Limited time discounts on premium BMW and Mercedes parts</p>
          </div>
        </div>

        <div className="container px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <div className="absolute left-0 top-0 z-10 bg-red-600 px-3 py-1 text-sm font-bold text-white">
                    {deal.discount}% OFF
                  </div>
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <Link href={`/shop/product/${deal.id}`}>
                    <h3 className="text-lg font-medium hover:text-red-600">{deal.name}</h3>
                  </Link>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold">${deal.salePrice.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through">${deal.originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="mt-3 flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    Ends in {deal.endsIn}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
