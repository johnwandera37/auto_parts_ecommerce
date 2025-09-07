"use client";

import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AccountNav } from "@/components/account/account-nav";
import { OrdersList } from "@/components/account/orders-list";
import { useAuthBoundary } from "@/hooks/useAuthBoundary";
import { PageHeader } from "@/components/account/page-header";

export default function OrdersPage() {
  const { user, isLoading, userError, LoaderUI, ErrorUI } = useAuthBoundary();
  if (isLoading) return LoaderUI;
  if (!user && userError) return ErrorUI;
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <PageHeader
            title="Order History"
            description="View and track your orders"
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
            <AccountNav user={user} />

            <div className="space-y-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="relative w-full max-w-sm">
                  <Input
                    type="search"
                    placeholder="Search orders..."
                    className="pr-10"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Filter by:
                  </span>
                  <select className="rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="all">All Orders</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <OrdersList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
