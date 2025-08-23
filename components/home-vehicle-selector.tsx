import { VehicleSelector } from "@/components/vehicle-selector/vehicle-selector"

export function HomeVehicleSelector() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7 lg:col-span-8">
            <div className="rounded-lg bg-gray-50 p-8">
              <h2 className="text-3xl font-bold tracking-tight">Find the Right Parts for Your Vehicle</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Use our vehicle selector to find parts that are guaranteed to fit your BMW or Mercedes-Benz
              </p>
              <div className="mt-6 aspect-video overflow-hidden rounded-lg bg-white shadow-sm">
                <div
                  className="h-full w-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/placeholder.svg?height=400&width=800')" }}
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">OEM Parts</span>
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">Genuine Accessories</span>
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">Performance Upgrades</span>
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">Maintenance Kits</span>
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">Warranty Coverage</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 lg:col-span-4">
            <VehicleSelector />
          </div>
        </div>
      </div>
    </section>
  )
}
