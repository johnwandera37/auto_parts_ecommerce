"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AdminNav } from "@/components/admin/admin-nav"
import {
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
  DollarSign,
  Plus,
  Truck,
  Star,
  ArrowUp,
  ArrowDown,
  Activity,
  BarChart3,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "€45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      period: "from last month",
    },
    {
      title: "Orders",
      value: "2,350",
      change: "+180.1%",
      trend: "up",
      icon: ShoppingCart,
      period: "from last month",
    },
    {
      title: "Products",
      value: "12,234",
      change: "+19%",
      trend: "up",
      icon: Package,
      period: "from last month",
    },
    {
      title: "Active Users",
      value: "573",
      change: "+201",
      trend: "up",
      icon: Users,
      period: "since last hour",
    },
  ]

  const recentOrders = [
    { id: "ORD-001", customer: "Hans Mueller", amount: "€250.00", status: "completed", items: 3, time: "2 min ago" },
    { id: "ORD-002", customer: "Anna Schmidt", amount: "€180.50", status: "processing", items: 2, time: "5 min ago" },
    { id: "ORD-003", customer: "Klaus Weber", amount: "€420.00", status: "shipped", items: 5, time: "12 min ago" },
    { id: "ORD-004", customer: "Maria Fischer", amount: "€95.00", status: "pending", items: 1, time: "18 min ago" },
    { id: "ORD-005", customer: "Stefan Bauer", amount: "€310.75", status: "completed", items: 4, time: "25 min ago" },
  ]

  const lowStockItems = [
    { name: "BMW Brake Pads - Series 3", sku: "BMW-BP-001", stock: 5, threshold: 10, category: "Brake System" },
    { name: "Mercedes Oil Filter", sku: "MB-OF-002", stock: 3, threshold: 15, category: "Engine" },
    { name: "Audi Spark Plugs", sku: "AUDI-SP-003", stock: 8, threshold: 20, category: "Engine" },
    { name: "BMW Air Filter", sku: "BMW-AF-004", stock: 2, threshold: 12, category: "Engine" },
  ]

  const topProducts = [
    { name: "BMW Brake Pads", sales: 156, revenue: "€14,040", trend: "up" },
    { name: "Mercedes Oil Filter", sales: 134, revenue: "€3,284", trend: "up" },
    { name: "Audi Spark Plugs", sales: 98, revenue: "€4,410", trend: "down" },
    { name: "BMW Air Filter", sales: 87, revenue: "€2,849", trend: "up" },
  ]

  const recentActivity = [
    { type: "order", message: "New order #ORD-001 from Hans Mueller", time: "2 min ago", icon: ShoppingCart },
    { type: "product", message: "Product 'BMW Brake Pads' stock updated", time: "15 min ago", icon: Package },
    { type: "user", message: "New customer registration: Anna Schmidt", time: "32 min ago", icon: Users },
    { type: "alert", message: "Low stock alert: Mercedes Oil Filter", time: "1 hour ago", icon: AlertTriangle },
    { type: "order", message: "Order #ORD-003 shipped to Klaus Weber", time: "2 hours ago", icon: Truck },
  ]

  const systemHealth = [
    { name: "Server Status", status: "healthy", value: 99.9, color: "green" },
    { name: "Database", status: "healthy", value: 98.5, color: "green" },
    { name: "Payment Gateway", status: "warning", value: 95.2, color: "yellow" },
    { name: "Email Service", status: "healthy", value: 99.1, color: "green" },
  ]

  return (
    <div className="min-h-screen bg-dp-black">
      <AdminNav />

      <div className="lg:ml-64 p-6">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Welcome back! Here's what's happening with your store today.</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-dp-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="flex items-center text-xs">
                  {stat.trend === "up" ? (
                    <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="text-gray-500 ml-1">{stat.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Recent Orders */}
          <Card className="lg:col-span-2 transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recent Orders</CardTitle>
                  <CardDescription className="text-gray-400">Latest orders from your customers</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Link href="/admin/orders">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-dp-gold"></div>
                      <div>
                        <p className="font-medium text-white">{order.id}</p>
                        <p className="text-sm text-gray-400">{order.customer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{order.amount}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : order.status === "shipped"
                              ? "outline"
                              : "destructive"
                      }
                      className="bg-dp-gold text-dp-black"
                    >
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Activity className="mr-2 h-5 w-5 text-dp-gold" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-400">Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      <activity.icon className="h-4 w-4 text-dp-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* Low Stock Alert */}
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                Low Stock Alert ({lowStockItems.length})
              </CardTitle>
              <CardDescription className="text-gray-400">Items running low on inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockItems.map((item) => (
                  <div key={item.sku} className="p-3 border border-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm text-white">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.sku} • {item.category}
                        </p>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        Low
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        Stock: {item.stock}/{item.threshold}
                      </span>
                      <Progress value={(item.stock / item.threshold) * 100} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Link href="/admin/inventory">
                    <Package className="mr-2 h-4 w-4" />
                    Manage Inventory
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Star className="mr-2 h-5 w-5 text-dp-gold" />
                Top Products
              </CardTitle>
              <CardDescription className="text-gray-400">Best performing products this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-dp-gold text-dp-black flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{product.revenue}</p>
                      <div className="flex items-center">
                        {product.trend === "up" ? (
                          <ArrowUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health & Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {/* System Health */}
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Activity className="mr-2 h-5 w-5 text-green-500" />
                System Health
              </CardTitle>
              <CardDescription className="text-gray-400">Monitor system performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((system) => (
                  <div key={system.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          system.color === "green"
                            ? "bg-green-500"
                            : system.color === "yellow"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-white">{system.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">{system.value}%</span>
                      <Progress value={system.value} className="w-16 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">Frequently used admin tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 grid-cols-2">
                <Button
                  asChild
                  className="h-16 bg-dp-gold hover:bg-dp-red text-dp-black hover:text-white transition-all duration-300"
                >
                  <Link href="/admin/products/new" className="flex flex-col items-center">
                    <Plus className="h-5 w-5 mb-1" />
                    <span className="text-xs">Add Product</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-16 border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Link href="/admin/orders" className="flex flex-col items-center">
                    <ShoppingCart className="h-5 w-5 mb-1" />
                    <span className="text-xs">View Orders</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-16 border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Link href="/admin/customers" className="flex flex-col items-center">
                    <Users className="h-5 w-5 mb-1" />
                    <span className="text-xs">Customers</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-16 border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Link href="/admin/analytics" className="flex flex-col items-center">
                    <BarChart3 className="h-5 w-5 mb-1" />
                    <span className="text-xs">Analytics</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
