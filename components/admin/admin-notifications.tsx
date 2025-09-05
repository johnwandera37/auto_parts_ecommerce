"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Check,
  X,
  AlertTriangle,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Settings,
  Mail,
  Smartphone,
  Monitor,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock notification data
const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order #12349 from Maria Fischer for €345.00",
    time: "2 minutes ago",
    read: false,
    priority: "high",
    icon: ShoppingCart,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "inventory",
    title: "Low Stock Alert",
    message: "BMW Engine Oil Filter is running low (5 units remaining)",
    time: "15 minutes ago",
    read: false,
    priority: "medium",
    icon: Package,
    color: "text-orange-600",
  },
  {
    id: 3,
    type: "customer",
    title: "Customer Support Request",
    message: "New support ticket from Klaus Weber regarding order #12340",
    time: "1 hour ago",
    read: true,
    priority: "medium",
    icon: Users,
    color: "text-blue-600",
  },
  {
    id: 4,
    type: "system",
    title: "Daily Sales Report",
    message: "Your daily sales report is ready for review",
    time: "3 hours ago",
    read: true,
    priority: "low",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    id: 5,
    type: "alert",
    title: "System Maintenance",
    message: "Scheduled maintenance will begin at 2:00 AM tonight",
    time: "5 hours ago",
    read: true,
    priority: "high",
    icon: AlertTriangle,
    color: "text-red-600",
  },
]

const notificationSettings = {
  orders: {
    email: true,
    push: true,
    desktop: false,
  },
  inventory: {
    email: true,
    push: true,
    desktop: true,
  },
  customers: {
    email: false,
    push: true,
    desktop: false,
  },
  reports: {
    email: true,
    push: false,
    desktop: false,
  },
  system: {
    email: true,
    push: true,
    desktop: true,
  },
}

export function AdminNotifications() {
  const [notifs, setNotifs] = useState(notifications)
  const [settings, setSettings] = useState(notificationSettings)

  const markAsRead = (id: number) => {
    setNotifs((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifs((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifs((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifs.filter((n) => !n.read).length

  const updateSetting = (category: string, type: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [type]: value,
      },
    }))
  }

  return (
    <Tabs defaultValue="notifications" className="space-y-4">
      <TabsList className="w-full justify-start border-b bg-transparent p-0">
        <TabsTrigger
          value="notifications"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="notifications" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Recent Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : "All notifications read"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {notifs.map((notification) => {
            const Icon = notification.icon
            return (
              <Card
                key={notification.id}
                className={cn(
                  "transition-all duration-200 hover:shadow-md",
                  !notification.read && "border-l-4 border-l-red-600 bg-red-50/30",
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={cn("mt-1", notification.color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Badge
                            variant={
                              notification.priority === "high"
                                ? "destructive"
                                : notification.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {notification.priority}
                          </Badge>
                          <div className="flex space-x-1">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {notifs.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-sm text-muted-foreground text-center">
                You're all caught up! New notifications will appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Choose how you want to receive different types of notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Orders */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <h4 className="font-medium">Order Notifications</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 ml-7">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="orders-email"
                    checked={settings.orders.email}
                    onCheckedChange={(checked) => updateSetting("orders", "email", checked)}
                  />
                  <Label htmlFor="orders-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="orders-push"
                    checked={settings.orders.push}
                    onCheckedChange={(checked) => updateSetting("orders", "push", checked)}
                  />
                  <Label htmlFor="orders-push" className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <span>Push</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="orders-desktop"
                    checked={settings.orders.desktop}
                    onCheckedChange={(checked) => updateSetting("orders", "desktop", checked)}
                  />
                  <Label htmlFor="orders-desktop" className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4" />
                    <span>Desktop</span>
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Inventory */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-orange-600" />
                <h4 className="font-medium">Inventory Alerts</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 ml-7">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="inventory-email"
                    checked={settings.inventory.email}
                    onCheckedChange={(checked) => updateSetting("inventory", "email", checked)}
                  />
                  <Label htmlFor="inventory-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="inventory-push"
                    checked={settings.inventory.push}
                    onCheckedChange={(checked) => updateSetting("inventory", "push", checked)}
                  />
                  <Label htmlFor="inventory-push" className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <span>Push</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="inventory-desktop"
                    checked={settings.inventory.desktop}
                    onCheckedChange={(checked) => updateSetting("inventory", "desktop", checked)}
                  />
                  <Label htmlFor="inventory-desktop" className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4" />
                    <span>Desktop</span>
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Customer Support */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium">Customer Support</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 ml-7">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="customers-email"
                    checked={settings.customers.email}
                    onCheckedChange={(checked) => updateSetting("customers", "email", checked)}
                  />
                  <Label htmlFor="customers-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="customers-push"
                    checked={settings.customers.push}
                    onCheckedChange={(checked) => updateSetting("customers", "push", checked)}
                  />
                  <Label htmlFor="customers-push" className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <span>Push</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="customers-desktop"
                    checked={settings.customers.desktop}
                    onCheckedChange={(checked) => updateSetting("customers", "desktop", checked)}
                  />
                  <Label htmlFor="customers-desktop" className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4" />
                    <span>Desktop</span>
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* System Alerts */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <h4 className="font-medium">System Alerts</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 ml-7">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="system-email"
                    checked={settings.system.email}
                    onCheckedChange={(checked) => updateSetting("system", "email", checked)}
                  />
                  <Label htmlFor="system-email" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="system-push"
                    checked={settings.system.push}
                    onCheckedChange={(checked) => updateSetting("system", "push", checked)}
                  />
                  <Label htmlFor="system-push" className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <span>Push</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="system-desktop"
                    checked={settings.system.desktop}
                    onCheckedChange={(checked) => updateSetting("system", "desktop", checked)}
                  />
                  <Label htmlFor="system-desktop" className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4" />
                    <span>Desktop</span>
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quiet Hours</CardTitle>
            <CardDescription>Set times when you don't want to receive non-urgent notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="quiet-hours" />
              <Label htmlFor="quiet-hours">Enable quiet hours</Label>
            </div>
            <div className="grid grid-cols-2 gap-4 ml-6">
              <div className="space-y-2">
                <Label htmlFor="quiet-start">Start time</Label>
                <input
                  id="quiet-start"
                  type="time"
                  defaultValue="22:00"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quiet-end">End time</Label>
                <input
                  id="quiet-end"
                  type="time"
                  defaultValue="08:00"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
