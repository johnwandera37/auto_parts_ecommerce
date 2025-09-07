"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AccountNav } from "@/components/account/account-nav";
import { WishlistItems } from "@/components/account/wishlist-items";
import { useAuthBoundary } from "@/hooks/useAuthBoundary";
import { PageHeader } from "@/components/account/page-header";

export default function WishlistPage() {
  const { user, isLoading, userError, LoaderUI, ErrorUI } = useAuthBoundary();
  if (isLoading) return LoaderUI;
  if (!user && userError) return ErrorUI;
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <PageHeader
            title="My Wishlist"
            description="Items you've saved for later"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
            <AccountNav user={user} />

            <div>
              <WishlistItems />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
