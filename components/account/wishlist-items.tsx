"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function WishlistItems() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "BMW M Performance Exhaust System",
      category: "BMW Exhaust Systems",
      price: 1299.99,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=200",
      addedOn: "May 15, 2023",
    },
    {
      id: 2,
      name: "Mercedes-Benz AMG Brake Kit",
      category: "Mercedes Braking Systems",
      price: 899.99,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
      addedOn: "May 20, 2023",
    },
    {
      id: 3,
      name: "BMW Carbon Fiber Mirror Caps",
      category: "BMW Exterior Accessories",
      price: 299.99,
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=200",
      addedOn: "June 1, 2023",
    },
    {
      id: 4,
      name: "Mercedes-Benz LED Interior Lighting Package",
      category: "Mercedes Interior Accessories",
      price: 149.99,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=200",
      addedOn: "June 5, 2023",
    },
    {
      id: 5,
      name: "BMW M Performance Steering Wheel",
      category: "BMW Interior Accessories",
      price: 599.99,
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=200",
      addedOn: "June 10, 2023",
    },
    {
      id: 6,
      name: "Mercedes-Benz Sport Pedal Covers",
      category: "Mercedes Interior Accessories",
      price: 99.99,
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=200",
      addedOn: "June 12, 2023",
    },
    {
      id: 7,
      name: "BMW Performance Air Intake System",
      category: "BMW Engine Components",
      price: 349.99,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
      addedOn: "June 15, 2023",
    },
  ])

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div>
      {wishlistItems.length === 0 ? (
        <Card className="p-6 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">Your Wishlist is Empty</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Save items you're interested in for later by clicking the heart icon on product pages.
          </p>
          <Button asChild className="mt-4 bg-red-600 hover:bg-red-700">
            <Link href="/shop">Browse Products</Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              You have <span className="font-medium">{wishlistItems.length}</span> items in your wishlist
            </p>
            <Button variant="outline" size="sm">
              Add All to Cart
            </Button>
          </div>

          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col items-start gap-4 p-4 sm:flex-row">
                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">{item.category}</div>
                      <Link href={`/shop/product/${item.id}`}>
                        <h3 className="font-medium hover:text-red-600">{item.name}</h3>
                      </Link>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{item.rating}</span>
                      </div>
                      <div className="mt-2 font-bold">€{item.price.toFixed(2)}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Added on {item.addedOn}</div>
                    </div>
                    <div className="flex w-full flex-col gap-2 sm:w-auto">
                      <Button className="bg-red-600 hover:bg-red-700">Add to Cart</Button>
                      <Button variant="outline" size="sm" onClick={() => removeFromWishlist(item.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
