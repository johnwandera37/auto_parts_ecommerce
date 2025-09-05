"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, Users, ShoppingCart, Package, Euro, BarChart3 } from "lucide-react"

// Sample data for charts
const salesData = [
  { month: "Jan", sales: 45000, orders: 320, customers: 180 },
  { month: "Feb", sales: 52000, orders: 380, customers: 220 },
  { month: "Mar", sales: 48000, orders: 350, customers: 200 },
  { month: "Apr", sales: 61000, orders: 420, customers: 280 },
  { month: "May", sales: 55000, orders: 390, customers: 250 },
  { month: "Jun", sales: 67000, orders: 480, customers: 320 },
]

const categoryData = [
  { name: "Engine Parts", value: 35, color: "#dc2626" },
  { name: "Brake Systems", value: 25, color: "#ea580c" },
  { name: "Suspension", value: 20, color: "#d97706" },
  { name: "Electrical", value: 12, color: "#ca8a04" },
  { name: "Body Parts", value: 8, color: "#65a30d" },
]

const topProducts = [
  { name: "BMW Engine Oil Filter", sales: 1250, revenue: 18750 },
  { name: "Mercedes Brake Pads", sales: 980, revenue: 24500 },
  { name: "Audi Suspension Kit", sales: 750, revenue: 37500 },
  { name: "VW Headlight Assembly", sales: 650, revenue: 19500 },
  { name: "BMW Air Filter", sales: 580, revenue: 8700 },
]

const recentOrders = [
  { id: "#12345", customer: "John Mueller", amount: 245.5, status: "completed" },
  { id: "#12346", customer: "Anna Schmidt", amount: 189.99, status: "processing" },
  { id: "#12347", customer: "Klaus Weber", amount: 567.25, status: "shipped" },
  { id: "#12348", customer: "Maria Fischer", amount: 123.75, status: "pending" },
  { id: "#12349", customer: "Hans Bauer", amount: 345.0, status: "completed" },
]

export function AnalyticsDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="w-full justify-start border-b bg-transparent p-0">
        <TabsTrigger
          value="overview"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="sales"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Sales
        </TabsTrigger>
        <TabsTrigger
          value="products"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <Package className="mr-2 h-4 w-4" />
          Products
        </TabsTrigger>
        <TabsTrigger
          value="customers"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <Users className="mr-2 h-4 w-4" />
          Customers
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€328,000</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12.5%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,340</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +8.2%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,450</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-red-600">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  -2.1%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,210</div>
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +15.3%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly sales performance for the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3 transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Product category distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
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
                    >
                      {order.status}
                    </Badge>
                    <p className="text-sm font-medium">€{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sales" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
              <CardDescription>Monthly sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#dc2626" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader>
              <CardTitle>Orders vs Customers</CardTitle>
              <CardDescription>Order volume and customer acquisition</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#dc2626" name="Orders" />
                  <Bar dataKey="customers" fill="#ea580c" name="New Customers" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="products" className="space-y-4">
        <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Best selling products by units and revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-sm font-medium text-red-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">€{product.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="customers" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450</div>
              <p className="text-xs text-muted-foreground">Active customer accounts</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Repeat Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">Customer retention rate</p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€140</div>
              <p className="text-xs text-muted-foreground">Per customer order</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}
