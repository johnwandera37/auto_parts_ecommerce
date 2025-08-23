import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="mt-12 rounded-lg bg-gray-900 py-12 relative transform hover:scale-105 hover:z-10 transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-dp-gold">Subscribe to Our Newsletter</h2>
            <p className="text-gray-300">
              Get the latest updates on BMW and Mercedes parts, promotions, and technical tips delivered to your inbox.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <form className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
              />
              <Button
                type="submit"
                className="bg-dp-red hover:bg-dp-gold hover:text-dp-black transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
