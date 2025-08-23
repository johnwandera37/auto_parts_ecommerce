import { ChevronRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-dp-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-background.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dp-black/80 via-dp-black/60 to-transparent" />

      <div className="container relative flex min-h-[700px] flex-col items-start justify-center px-4 py-24 md:px-6">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative h-16 w-16">
              <Image
                src="/images/deutsche-point-logo.jpg"
                alt="Deutsche Point Eagle"
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div className="inline-block rounded-full bg-dp-gold px-4 py-2 text-sm font-bold text-dp-black">
              PREMIUM GERMAN PARTS
            </div>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            <span className="text-dp-gold">DEUTSCHE</span>
            <br />
            <span className="text-dp-red">POINT</span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed">
            Precision-engineered parts and accessories for BMW and Mercedes-Benz.
            <span className="text-dp-gold font-semibold"> German excellence, uncompromising quality.</span>
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-dp-gold text-dp-black hover:bg-dp-red hover:text-white font-bold text-lg px-8 py-4 transition-all duration-300"
            >
              SHOP NOW
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-dp-red text-dp-red hover:bg-dp-gold hover:text-dp-black hover:border-dp-gold font-bold text-lg px-8 py-4 transition-all duration-300"
            >
              BROWSE CATEGORIES
            </Button>
          </div>

          <div className="flex items-center space-x-8 pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-dp-gold">50K+</div>
              <div className="text-sm text-gray-400">Parts Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dp-gold">25+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dp-gold">99%</div>
              <div className="text-sm text-gray-400">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
