import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountNav } from "@/components/account/account-nav"
import { WishlistItems } from "@/components/account/wishlist-items"

export const metadata: Metadata = {
  title: "Wishlist | Deutsche Point",
  description: "View and manage your saved items for future purchase.",
}

export default function WishlistPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
            <p className="text-muted-foreground">Items you've saved for later</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
            <AccountNav />

            <div>
              <WishlistItems />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
