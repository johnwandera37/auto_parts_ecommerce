"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Car, Heart, Settings, LogOut, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AccountNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/account/dashboard",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      title: "Orders",
      href: "/account/orders",
      icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    },
    {
      title: "Saved Vehicles",
      href: "/account/vehicles",
      icon: <Car className="mr-2 h-4 w-4" />,
    },
    {
      title: "Wishlist",
      href: "/account/wishlist",
      icon: <Heart className="mr-2 h-4 w-4" />,
    },
    {
      title: "Account Settings",
      href: "/account/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="flex flex-col space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
            isActive(item.href)
              ? "bg-red-50 text-red-600"
              : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
          }`}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
      <Button variant="ghost" className="mt-4 justify-start text-sm font-medium text-red-600 hover:bg-red-50">
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </nav>
  )
}
