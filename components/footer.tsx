import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-dp-black border-t border-gray-800">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative h-12 w-12">
                <Image
                  src="/images/deutsche-point-logo.jpg"
                  alt="Deutsche Point"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <h3 className="text-lg font-bold text-dp-gold">Deutsche Point</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Premium auto parts for BMW and Mercedes-Benz vehicles. German engineering excellence since 1985.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-dp-gold transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-dp-gold transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-dp-gold transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-dp-gold transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-dp-gold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Featured Products
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Deals & Discounts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Vehicle Compatibility
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-dp-gold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Warranty Information
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-dp-gold">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-dp-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; 2024 Deutsche Point GmbH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
