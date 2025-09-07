"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
// import router from "next/router";
import { errLog } from "@/utils/logger";
import { getErrorMessage } from "@/utils/errMsg";
import Loader from "../ui/loader";
import { pages } from "@/config/constants";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: "12" },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export type NavProps = {
  user: User;
};

export function AdminNav({ user }: NavProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { logout, isLoggingOut } = useAuth(); // Get logout from context

  const handleLogout = async () => {
    await logout(); // clear user, token, redis session
  };

  return (
    <>
    {isLoggingOut && <Loader variant="fullscreen" size="lg" />}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-dp-black">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/images/deutsche-point-logo.jpg"
                  alt="Deutsche Point"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <h1 className="text-lg font-bold text-dp-gold">Admin Panel</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:text-dp-gold transition-colors"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-300",
                  pathname === item.href
                    ? "bg-dp-gold text-dp-black"
                    : "text-gray-300 hover:bg-gray-800 hover:text-dp-gold"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="ml-auto bg-dp-red text-white"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:z-50">
        <div className="flex flex-col flex-grow bg-dp-black border-r border-gray-800">
          <div className="flex h-16 items-center px-4 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/images/deutsche-point-logo.jpg"
                  alt="Deutsche Point"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <h1 className="text-lg font-bold text-dp-gold">Admin Panel</h1>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-300",
                  pathname === item.href
                    ? "bg-dp-gold text-dp-black"
                    : "text-gray-300 hover:bg-gray-800 hover:text-dp-gold"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="ml-auto bg-dp-red text-white"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Top bar */}
      <div className="lg:ml-64">
        <div className="flex h-16 items-center justify-between bg-dp-black border-b border-gray-800 px-4 relative z-40">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:text-dp-gold transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4 ml-auto">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-dp-gold transition-colors"
            >
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-white hover:text-dp-gold transition-colors"
                >
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">
                      {`${user?.firstName ?? "Admin"} ${
                        user?.lastName ?? "User"
                      }`.trim()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user?.email ?? "admin@deutschepoint.de"}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
}
