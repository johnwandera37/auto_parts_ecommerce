"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin/admin-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, Mail, Phone, MapPin, Calendar, ShoppingBag } from "lucide-react"

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState("")

  const customers = [
    {
      id: 1,
      name: "Hans Mueller",
      email: "hans.mueller@email.com",
      phone: "+49 30 12345678",
      location: "Berlin, Germany",
      joinDate: "2023-06-15",
      totalOrders: 12,
      totalSpent: 1250.5,
      status: "active",
      lastOrder: "2024-01-15",
    },
    {
      id: 2,
      name: "Anna Schmidt",
      email: "anna.schmidt@email.com",
      phone: "+49 89 87654321",
      location: "München, Germany",
      joinDate: "2023-08-22",
      totalOrders: 8,
      totalSpent: 890.25,
      status: "active",
      lastOrder: "2024-01-14",
    },
    {
      id: 3,
      name: "Klaus Weber",
      email: "klaus.weber@email.com",
      phone: "+49 211 55566677",
      location: "Düsseldorf, Germany",
      joinDate: "2023-03-10",
      totalOrders: 15,
      totalSpent: 2100.75,
      status: "vip",
      lastOrder: "2024-01-13",
    },
    {
      id: 4,
      name: "Maria Fischer",
      email: "maria.fischer@email.com",
      phone: "+49 40 99988877",
      location: "Hamburg, Germany",
      joinDate: "2023-11-05",
      totalOrders: 3,
      totalSpent: 320.0,
      status: "new",
      lastOrder: "2024-01-12",
    },
    {
      id: 5,
      name: "Stefan Bauer",
      email: "stefan.bauer@email.com",
      phone: "+49 69 44433322",
      location: "Frankfurt, Germany",
      joinDate: "2023-01-18",
      totalOrders: 0,
      totalSpent: 0,
      status: "inactive",
      lastOrder: "Never",
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default" as const, label: "Active" },
      vip: { variant: "default" as const, label: "VIP" },
      new: { variant: "secondary" as const, label: "New" },
      inactive: { variant: "outline" as const, label: "Inactive" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]

    return (
      <Badge variant={config.variant} className={status === "vip" ? "bg-yellow-500 hover:bg-yellow-600" : ""}>
        {config.label}
      </Badge>
    )
  }

  const customerStats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    vip: customers.filter((c) => c.status === "vip").length,
    new: customers.filter((c) => c.status === "new").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="lg:ml-64 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer relationships</p>
        </div>

        {/* Customer Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{customerStats.total}</div>
              <p className="text-xs text-muted-foreground">Total Customers</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{customerStats.active}</div>
              <p className="text-xs text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{customerStats.vip}</div>
              <p className="text-xs text-muted-foreground">VIP</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{customerStats.new}</div>
              <p className="text-xs text-muted-foreground">New</p>
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
                    placeholder="Search customers by name, email, or location..."
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

        {/* Customers Table */}
        <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
          <CardHeader>
            <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
            <CardDescription>View and manage customer information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-medium">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{customer.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {customer.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {customer.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Joined: {customer.joinDate}
                        </span>
                        <span className="flex items-center">
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          Last order: {customer.lastOrder}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-medium">€{customer.totalSpent.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{customer.totalOrders} orders</p>
                    </div>

                    <div>{getStatusBadge(customer.status)}</div>

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
