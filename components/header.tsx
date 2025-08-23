"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-dp-black border-gray-800">
      <div className="container flex h-20 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="mr-2 md:hidden border-dp-gold text-dp-gold hover:bg-dp-red hover:text-white hover:border-dp-red transition-all duration-300"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-dp-black border-gray-800">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-bold text-dp-gold">
                Home
              </Link>
              <Link href="/shop" className="text-lg font-medium text-white hover:text-dp-gold transition-colors">
                Shop
              </Link>
              <Link href="/categories" className="text-lg font-medium text-white hover:text-dp-gold transition-colors">
                Categories
              </Link>
              <Link href="/brands" className="text-lg font-medium text-white hover:text-dp-gold transition-colors">
                Brands
              </Link>
              <Link href="/deals" className="text-lg font-medium text-white hover:text-dp-gold transition-colors">
                Deals
              </Link>
              <Link href="/about" className="text-lg font-medium text-white hover:text-dp-gold transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-lg font-medium text-white hover:text-dp-gold transition-colors">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-3">
          <div className="relative h-12 w-12">
            <Image
              src="/images/deutsche-point-logo.jpg"
              alt="Deutsche Point"
              fill
              className="object-contain rounded-full"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-dp-gold">Deutsche Point</span>
        </Link>

        <nav className="hidden md:flex md:flex-1 md:items-center md:gap-8">
          <Link
            href="/"
            className={`group relative text-sm font-medium transition-colors hover:text-dp-gold ${
              isActive("/") ? "text-dp-gold" : "text-white"
            }`}
          >
            Home
            <span
              className={`absolute -bottom-[21px] left-0 h-[2px] w-full origin-left scale-x-0 bg-dp-gold transition-transform duration-200 group-hover:scale-x-100 ${
                isActive("/") ? "scale-x-100" : ""
              }`}
            />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`group relative flex items-center text-sm font-medium transition-colors hover:text-dp-gold ${
                  isActive("/shop") ? "text-dp-gold" : "text-white"
                }`}
              >
                Shop
                <ChevronDown className="ml-1 h-4 w-4" />
                <span
                  className={`absolute -bottom-[21px] left-0 h-[2px] w-full origin-left scale-x-0 bg-dp-gold transition-transform duration-200 group-hover:scale-x-100 ${
                    isActive("/shop") ? "scale-x-100" : ""
                  }`}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px] bg-gray-900 border-gray-700">
              <DropdownMenuLabel className="text-dp-gold">Shop By</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild>
                <Link href="/shop" className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold">
                  All Products
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/shop/new-arrivals"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  New Arrivals
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/shop/best-sellers"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Best Sellers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/shop/clearance"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Clearance
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`group relative flex items-center text-sm font-medium transition-colors hover:text-dp-gold ${
                  isActive("/categories") ? "text-dp-gold" : "text-white"
                }`}
              >
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
                <span
                  className={`absolute -bottom-[21px] left-0 h-[2px] w-full origin-left scale-x-0 bg-dp-gold transition-transform duration-200 group-hover:scale-x-100 ${
                    isActive("/categories") ? "scale-x-100" : ""
                  }`}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px] bg-gray-900 border-gray-700">
              <DropdownMenuLabel className="text-dp-gold">Part Categories</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild>
                <Link
                  href="/categories/engine"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Engine Parts
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/categories/braking"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Braking Systems
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/categories/suspension"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Suspension & Steering
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/categories/electrical"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Electrical Components
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/categories/exterior"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Body & Exterior
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/categories/interior"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Interior Accessories
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild>
                <Link href="/categories" className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold">
                  View All Categories
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`group relative flex items-center text-sm font-medium transition-colors hover:text-dp-gold ${
                  isActive("/brands") ? "text-dp-gold" : "text-white"
                }`}
              >
                Brands
                <ChevronDown className="ml-1 h-4 w-4" />
                <span
                  className={`absolute -bottom-[21px] left-0 h-[2px] w-full origin-left scale-x-0 bg-dp-gold transition-transform duration-200 group-hover:scale-x-100 ${
                    isActive("/brands") ? "scale-x-100" : ""
                  }`}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px] bg-gray-900 border-gray-700">
              <DropdownMenuLabel className="text-dp-gold">Our Brands</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild>
                <Link href="/brands/bmw" className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold">
                  BMW
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/brands/mercedes"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Mercedes-Benz
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild>
                <Link href="/brands" className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold">
                  View All Brands
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/deals"
            className={`group relative text-sm font-medium transition-colors hover:text-dp-gold ${
              isActive("/deals") ? "text-dp-gold" : "text-white"
            }`}
          >
            Deals
            <span
              className={`absolute -bottom-[21px] left-0 h-[2px] w-full origin-left scale-x-0 bg-dp-gold transition-transform duration-200 group-hover:scale-x-100 ${
                isActive("/deals") ? "scale-x-100" : ""
              }`}
            />
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {isSearchOpen ? (
            <div className="relative flex items-center md:w-80">
              <Input
                type="search"
                placeholder="Search products..."
                className="pr-10 bg-gray-900 border-dp-gold text-white placeholder:text-gray-400"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <X
                className="absolute right-3 h-4 w-4 cursor-pointer text-dp-gold"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-dp-gold hover:bg-gray-900 transition-all duration-300"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-dp-gold hover:bg-gray-900 transition-all duration-300"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] bg-gray-900 border-gray-700">
              <DropdownMenuLabel className="text-dp-gold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild>
                <Link href="/account/login" className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/account/register"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Register
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild>
                <Link
                  href="/account/orders"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/account/wishlist"
                  className="cursor-pointer text-white hover:text-dp-gold focus:text-dp-gold"
                >
                  Wishlist
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-dp-gold hover:bg-gray-900 transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px] bg-gray-900 border-gray-700">
              <DropdownMenuLabel className="text-dp-gold">Shopping Cart</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <div className="p-4 text-center text-sm text-gray-400">Your cart is empty</div>
              <DropdownMenuSeparator className="bg-gray-700" />
              <div className="p-4">
                <Button className="w-full bg-dp-gold text-dp-black hover:bg-dp-red hover:text-white transition-all duration-300">
                  View Cart
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
