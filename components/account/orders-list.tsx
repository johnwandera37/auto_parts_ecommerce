import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function OrdersList() {
  // Sample orders data - in a real app, this would come from an API or database
  const orders = [
    {
      id: "ORD-12345",
      date: "June 1, 2023",
      total: 149.99,
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
      items: [
        {
          id: 1,
          name: "BMW OEM Brake Pads (Front)",
          image: "/placeholder.svg?height=80&width=80",
          price: 89.99,
          quantity: 1,
        },
        {
          id: 2,
          name: "BMW Oil Filter",
          image: "/placeholder.svg?height=80&width=80",
          price: 19.99,
          quantity: 3,
        },
      ],
    },
    {
      id: "ORD-12344",
      date: "May 15, 2023",
      total: 89.99,
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
      items: [
        {
          id: 3,
          name: "Mercedes Performance Air Filter",
          image: "/placeholder.svg?height=80&width=80",
          price: 49.99,
          quantity: 1,
        },
        {
          id: 4,
          name: "Mercedes Cabin Air Filter",
          image: "/placeholder.svg?height=80&width=80",
          price: 39.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-12343",
      date: "April 28, 2023",
      total: 249.99,
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
      items: [
        {
          id: 5,
          name: "BMW LED Headlight Set",
          image: "/placeholder.svg?height=80&width=80",
          price: 199.99,
          quantity: 1,
        },
        {
          id: 6,
          name: "BMW Wiper Blades",
          image: "/placeholder.svg?height=80&width=80",
          price: 49.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-12342",
      date: "April 10, 2023",
      total: 349.99,
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
      items: [
        {
          id: 7,
          name: "Mercedes Suspension Kit",
          image: "/placeholder.svg?height=80&width=80",
          price: 349.99,
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-12341",
      date: "March 22, 2023",
      total: 129.99,
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
      items: [
        {
          id: 8,
          name: "BMW Brake Discs (Pair)",
          image: "/placeholder.svg?height=80&width=80",
          price: 129.99,
          quantity: 1,
        },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card
          key={order.id}
          className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative"
        >
          <CardContent className="p-0">
            <div className="border-b bg-gray-800 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Order {order.id}</h3>
                    <span className={`rounded-full px-2 py-1 text-xs ${order.statusColor}`}>{order.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">€{order.total.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium">€{item.price.toFixed(2)}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/shop/product/${item.id}`}>View Product</Link>
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/account/orders/${order.id}`}>
                    View Order Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Track Package
                  </Button>
                  <Button variant="outline" size="sm">
                    Buy Again
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
