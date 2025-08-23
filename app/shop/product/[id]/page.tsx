import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { ProductTabs } from "@/components/product/product-tabs"
import { RelatedProducts } from "@/components/product/related-products"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export const metadata: Metadata = {
  title: "BMW OEM Brake Pads | Deutsche Point",
  description:
    "Genuine BMW OEM Brake Pads for optimal stopping power and performance. Compatible with multiple BMW models.",
}

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product data based on the ID
  // For this example, we'll use static data
  const product = {
    id: params.id,
    name: "BMW OEM Brake Pads (Front)",
    category: "BMW Braking System",
    subcategory: "Brake Pads",
    price: 89.99,
    rating: 4.8,
    reviewCount: 124,
    sku: "BMW-34116794916",
    brand: "BMW",
    condition: "New",
    inStock: true,
    estimatedDelivery: "2-4 business days",
    description: `
      <p>Genuine BMW OEM front brake pads designed specifically for your BMW vehicle. These brake pads provide optimal stopping power and performance while minimizing brake dust and noise.</p>
      <p>Manufactured to BMW's exacting standards, these brake pads ensure perfect fitment and operation with your vehicle's braking system. The advanced friction material offers excellent heat resistance and consistent performance in all driving conditions.</p>
      <h3>Features:</h3>
      <ul>
        <li>Genuine BMW OEM part</li>
        <li>Designed for optimal stopping power</li>
        <li>Reduced brake dust compared to aftermarket alternatives</li>
        <li>Minimized brake noise</li>
        <li>Excellent heat resistance</li>
        <li>Long service life</li>
      </ul>
    `,
    specifications: [
      { name: "Part Number", value: "34116794916" },
      { name: "Brand", value: "BMW" },
      { name: "Condition", value: "New" },
      { name: "Position", value: "Front" },
      { name: "Material", value: "Semi-metallic compound" },
      { name: "Includes", value: "Set of 4 brake pads" },
      { name: "Warranty", value: "2 years" },
    ],
    technicalDetails: [
      { name: "Thickness", value: "18mm" },
      { name: "Width", value: "155mm" },
      { name: "Length", value: "109mm" },
      { name: "Weight", value: "1.2kg" },
      { name: "Friction Coefficient", value: "0.38-0.42" },
      { name: "Temperature Range", value: "-40°C to 800°C" },
      { name: "Wear Indicator", value: "Yes" },
    ],
    compatibleVehicles: [
      { model: "3 Series", years: "2006-2011", series: "E90/E91/E92/E93" },
      { model: "3 Series", years: "2012-2018", series: "F30/F31/F34" },
      { model: "4 Series", years: "2014-2020", series: "F32/F33/F36" },
      { model: "5 Series", years: "2010-2016", series: "F10/F11" },
    ],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    reviews: [
      {
        id: 1,
        author: "Michael Schmidt",
        rating: 5,
        date: "2023-10-15",
        title: "Perfect fit and performance",
        content:
          "These OEM brake pads fit perfectly on my BMW 330i. Installation was straightforward, and the braking performance is noticeably better than the aftermarket pads I was using before. Highly recommended!",
        vehicle: "2018 BMW 330i",
        verified: true,
      },
      {
        id: 2,
        author: "Thomas Weber",
        rating: 5,
        date: "2023-09-22",
        title: "Worth the premium price",
        content:
          "I've tried several aftermarket options in the past, but nothing compares to the genuine BMW pads. They produce less dust and the braking feel is much more consistent. Yes, they cost more, but the quality is worth it.",
        vehicle: "2015 BMW 535i",
        verified: true,
      },
      {
        id: 3,
        author: "Anna Müller",
        rating: 4,
        date: "2023-08-05",
        title: "Good quality, fast shipping",
        content:
          "The brake pads arrived quickly and were well packaged. Installation was easy and they work great. Only giving 4 stars because they're a bit pricey, but the quality is definitely there.",
        vehicle: "2016 BMW 428i",
        verified: true,
      },
      {
        id: 4,
        author: "Klaus Fischer",
        rating: 5,
        date: "2023-07-18",
        title: "Perfect OEM replacement",
        content:
          "These are exactly the same as the original pads that came with my car. Perfect fit and excellent performance. The braking is smooth and quiet. Will definitely purchase again when needed.",
        vehicle: "2017 BMW 540i",
        verified: true,
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories/bmw-braking">BMW Braking System</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ProductGallery images={product.images} name={product.name} />
            <ProductInfo product={product} />
          </div>

          <ProductTabs product={product} />

          <section className="mt-16">
            <h2 className="text-2xl font-bold">Customers Also Bought</h2>
            <RelatedProducts />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
