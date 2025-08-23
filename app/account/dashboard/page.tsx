import type { Metadata } from "next"
import Link from "next/link"
import { Car, Heart, ShoppingBag, Clock, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountNav } from "@/components/account/account-nav"

export const metadata: Metadata = {
  title: "Account Dashboard | Deutsche Point",
  description: "Manage your Deutsche Point account, orders, saved vehicles, and more.",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
            <p className="text-muted-foreground">Manage your account settings and view your order history</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
            <AccountNav />

            <div className="space-y-8">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-xl font-bold">Welcome back, John</h2>
                    <p className="text-sm text-muted-foreground">
                      Account created on <time dateTime="2023-01-15">January 15, 2023</time>
                    </p>
                  </div>
                  <Button asChild className="bg-red-600 hover:bg-red-700">
                    <Link href="/shop">Shop Now</Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+2 in the last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saved Vehicles</CardTitle>
                    <Car className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">BMW 3 Series, BMW X5, Mercedes C-Class</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">+3 in the last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1</div>
                    <p className="text-xs text-muted-foreground">Estimated delivery: June 15</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your most recent purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order #12345</p>
                          <p className="text-sm text-muted-foreground">June 1, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">€149.99</p>
                          <p className="text-xs rounded-full bg-green-100 px-2 py-1 text-green-700">Delivered</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order #12344</p>
                          <p className="text-sm text-muted-foreground">May 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">€89.99</p>
                          <p className="text-xs rounded-full bg-green-100 px-2 py-1 text-green-700">Delivered</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order #12343</p>
                          <p className="text-sm text-muted-foreground">April 28, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">€249.99</p>
                          <p className="text-xs rounded-full bg-green-100 px-2 py-1 text-green-700">Delivered</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="link" asChild className="text-red-600 hover:text-red-700">
                        <Link href="/account/orders" className="inline-flex items-center">
                          View all orders
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Saved Vehicles</CardTitle>
                    <CardDescription>Your garage for quick part lookup</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">BMW 3 Series</p>
                          <p className="text-sm text-muted-foreground">2018 330i xDrive</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Find Parts
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">BMW X5</p>
                          <p className="text-sm text-muted-foreground">2020 xDrive40i</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Find Parts
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mercedes-Benz C-Class</p>
                          <p className="text-sm text-muted-foreground">2019 C300 4MATIC</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Find Parts
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="link" asChild className="text-red-600 hover:text-red-700">
                        <Link href="/account/vehicles" className="inline-flex items-center">
                          Manage vehicles
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
