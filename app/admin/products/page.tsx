"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin/admin-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("")

  const products = [
    {
      id: 1,
      name: "BMW Brake Pads - Series 3 (E90)",
      sku: "BMW-BP-001",
      category: "Brake System",
      brand: "BMW",
      price: 89.99,
      stock: 25,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Mercedes Oil Filter - C-Class",
      sku: "MB-OF-002",
      category: "Engine",
      brand: "Mercedes",
      price: 24.5,
      stock: 3,
      status: "low_stock",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Audi Spark Plugs Set - A4",
      sku: "AUDI-SP-003",
      category: "Engine",
      brand: "Audi",
      price: 45.0,
      stock: 0,
      status: "out_of_stock",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 4,
      name: "BMW Air Filter - X5",
      sku: "BMW-AF-004",
      category: "Engine",
      brand: "BMW",
      price: 32.75,
      stock: 18,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 5,
      name: "Mercedes Windshield Wipers",
      sku: "MB-WW-005",
      category: "Exterior",
      brand: "Mercedes",
      price: 28.9,
      stock: 12,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }
    if (status === "low_stock" || stock < 10) {
      return <Badge variant="secondary">Low Stock</Badge>
    }
    return <Badge variant="default">In Stock</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="lg:ml-64 p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600">Manage your auto parts inventory</p>
            </div>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products by name, SKU, or brand..."
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

        {/* Products Table */}
        <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
          <CardHeader>
            <CardTitle>All Products ({filteredProducts.length})</CardTitle>
            <CardDescription>Manage your product catalog and inventory levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.sku}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{product.brand}</Badge>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-medium">€{product.price}</p>
                      <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                    </div>

                    <div>{getStatusBadge(product.status, product.stock)}</div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
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
