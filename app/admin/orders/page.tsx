"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin/admin-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("")

  const orders = [
    {
      id: "ORD-001",
      customer: "Hans Mueller",
      email: "hans.mueller@email.com",
      total: 250.0,
      status: "completed",
      items: 3,
      date: "2024-01-15",
      shippingAddress: "Hauptstraße 123, 10115 Berlin",
    },
    {
      id: "ORD-002",
      customer: "Anna Schmidt",
      email: "anna.schmidt@email.com",
      total: 180.5,
      status: "processing",
      items: 2,
      date: "2024-01-14",
      shippingAddress: "Müllerstraße 45, 80331 München",
    },
    {
      id: "ORD-003",
      customer: "Klaus Weber",
      email: "klaus.weber@email.com",
      total: 420.0,
      status: "shipped",
      items: 5,
      date: "2024-01-13",
      shippingAddress: "Königsallee 67, 40212 Düsseldorf",
    },
    {
      id: "ORD-004",
      customer: "Maria Fischer",
      email: "maria.fischer@email.com",
      total: 95.0,
      status: "pending",
      items: 1,
      date: "2024-01-12",
      shippingAddress: "Reeperbahn 89, 20359 Hamburg",
    },
    {
      id: "ORD-005",
      customer: "Stefan Bauer",
      email: "stefan.bauer@email.com",
      total: 310.75,
      status: "cancelled",
      items: 4,
      date: "2024-01-11",
      shippingAddress: "Zeil 12, 60313 Frankfurt",
    },
  ]

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending" },
      processing: { variant: "default" as const, icon: Package, label: "Processing" },
      shipped: { variant: "outline" as const, icon: Truck, label: "Shipped" },
      completed: { variant: "default" as const, icon: CheckCircle, label: "Completed" },
      cancelled: { variant: "destructive" as const, icon: AlertCircle, label: "Cancelled" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    completed: orders.filter((o) => o.status === "completed").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="lg:ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage customer orders and fulfillment</p>
        </div>

        {/* Order Stats */}
        <div className="grid gap-6 md:grid-cols-5 mb-8">
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{orderStats.total}</div>
              <p className="text-xs text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{orderStats.pending}</div>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{orderStats.processing}</div>
              <p className="text-xs text-muted-foreground">Processing</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{orderStats.shipped}</div>
              <p className="text-xs text-muted-foreground">Shipped</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{orderStats.completed}</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search orders by ID, customer name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
          <CardHeader>
            <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
            <CardDescription>Track and manage customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-medium">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-medium">€{order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.items} items</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>

                    <div>{getStatusBadge(order.status)}</div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
