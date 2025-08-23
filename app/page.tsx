import { BrandShowcase } from "@/components/brand-showcase"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HomeVehicleSelector } from "@/components/home-vehicle-selector"
import { Newsletter } from "@/components/newsletter"
import { ProductCategories } from "@/components/product-categories"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="min-h-screen bg-dp-black">
      <Header />
      <main>
        <HeroSection />
        <div className="bg-dp-gray">
          <HomeVehicleSelector />
        </div>
        <div className="bg-dp-black">
          <ProductCategories />
        </div>
        <div className="bg-dp-gray">
          <FeaturedProducts />
        </div>
        <BrandShowcase />
        <div className="bg-dp-gray">
          <Testimonials />
        </div>
        <div className="bg-dp-black">
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  )
}
