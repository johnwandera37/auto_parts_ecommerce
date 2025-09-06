"use client";


import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AccountNav } from "@/components/account/account-nav";
import { SavedVehiclesList } from "@/components/account/saved-vehicles-list";
import { useAuthBoundary } from "@/hooks/useAuthBoundary";

export default function VehiclesPage() {
  const { user, isLoading, userError, LoaderUI, ErrorUI } = useAuthBoundary();
  if (isLoading) return LoaderUI;
  if (!user && userError) return ErrorUI;
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Saved Vehicles
            </h1>
            <p className="text-muted-foreground">
              Manage your vehicles for quick part lookup
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
            <AccountNav user={user} />

            <div className="space-y-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-muted-foreground">
                  Save your vehicles to quickly find compatible parts and
                  accessories.
                </p>
                <Button className="bg-red-600 hover:bg-red-700">
                  Add New Vehicle
                </Button>
              </div>

              <SavedVehiclesList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
