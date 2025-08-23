import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MercedesVehicleSelector } from "@/components/brands/mercedes-vehicle-selector"

export default function MercedesPage() {
  // Mercedes-specific categories
  const categories = [
    {
      id: 1,
      name: "Engine Parts",
      image: "/placeholder.svg?height=200&width=200",
      count: 95,
      slug: "mercedes-engine",
    },
    {
      id: 2,
      name: "Braking Systems",
      image: "/placeholder.svg?height=200&width=200",
      count: 143,
      slug: "mercedes-braking",
    },
    {
      id: 3,
      name: "Suspension & Steering",
      image: "/placeholder.svg?height=200&width=200",
      count: 82,
      slug: "mercedes-suspension",
    },
    {
      id: 4,
      name: "Electrical Components",
      image: "/placeholder.svg?height=200&width=200",
      count: 98,
      slug: "mercedes-electrical",
    },
    {
      id: 5,
      name: "Body & Exterior",
      image: "/placeholder.svg?height=200&width=200",
      count: 72,
      slug: "mercedes-exterior",
    },
    {
      id: 6,
      name: "Interior Accessories",
      image: "/placeholder.svg?height=200&width=200",
      count: 61,
      slug: "mercedes-interior",
    },
  ]

  // Mercedes-specific featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Mercedes OEM Brake Pads",
      category: "Mercedes Braking System",
      price: 99.99,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "Mercedes Performance Air Filter",
      category: "Mercedes Engine Components",
      price: 59.99,
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Mercedes LED Headlight Set",
      category: "Mercedes Lighting",
      price: 249.99,
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Mercedes AMG Suspension Kit",
      category: "Mercedes Suspension",
      price: 399.99,
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  // Mercedes popular models
  const popularModels = [
    {
      id: 1,
      name: "C-Class",
      image: "/placeholder.svg?height=250&width=400",
      description: "The sporty and sophisticated compact luxury sedan with cutting-edge technology.",
      generations: ["W204 (2007-2014)", "W205 (2014-2021)", "W206 (2021-Present)"],
    },
    {
      id: 2,
      name: "E-Class",
      image: "/placeholder.svg?height=250&width=400",
      description: "The executive luxury sedan that combines elegance with advanced innovation.",
      generations: ["W211 (2002-2009)", "W212 (2009-2016)", "W213 (2016-Present)"],
    },
    {
      id: 3,
      name: "S-Class",
      image: "/placeholder.svg?height=250&width=400",
      description: "The flagship luxury sedan that sets the standard for automotive excellence.",
      generations: ["W220 (1998-2005)", "W221 (2005-2013)", "W222 (2013-2020)", "W223 (2020-Present)"],
    },
    {
      id: 4,
      name: "GLE-Class",
      image: "/placeholder.svg?height=250&width=400",
      description: "The versatile luxury SUV with commanding presence and refined comfort.",
      generations: ["W166 (2015-2019)", "W167 (2019-Present)"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Mercedes Hero Section */}
        <section className="relative bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
          />
          <div className="container relative flex min-h-[500px] flex-col items-start justify-center px-4 py-24 md:px-6">
            <div className="max-w-lg space-y-4">
              <div className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800">
                Mercedes-Benz Parts & Accessories
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                The Best or Nothing
              </h1>
              <p className="text-xl text-gray-200">
                Authentic Mercedes-Benz parts and accessories engineered for uncompromising quality and performance.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button size="lg" className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                  Shop All Mercedes Parts
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Find by Vehicle
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="container px-4 py-12 md:px-6 md:py-24">
          {/* Mercedes Vehicle Selector */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-7 lg:col-span-8">
              <div className="rounded-lg bg-gray-50 p-8">
                <h2 className="text-3xl font-bold tracking-tight">Find Parts for Your Mercedes-Benz</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Use our vehicle selector to find parts that are guaranteed to fit your Mercedes-Benz
                </p>
                <div className="mt-6 aspect-video overflow-hidden rounded-lg bg-white shadow-sm">
                  <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/placeholder.svg?height=400&width=800')" }}
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800">
                    OEM Parts
                  </span>
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800">
                    Performance Upgrades
                  </span>
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800">
                    Maintenance Kits
                  </span>
                  <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-800">
                    Genuine Accessories
                  </span>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 lg:col-span-4">
              <MercedesVehicleSelector />
            </div>
          </div>

          {/* Mercedes Categories */}
          <section className="mt-24">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight">Shop Mercedes-Benz Parts by Category</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Find the perfect parts for your Mercedes-Benz from our extensive collection
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`} className="group">
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-medium">Mercedes {category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} products</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Mercedes Featured Products */}
          <section className="mt-24">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Featured Mercedes-Benz Products</h2>
                <p className="text-muted-foreground">Top-quality parts for your Mercedes-Benz</p>
              </div>
              <Button variant="outline">View All</Button>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">{product.category}</div>
                    <h3 className="mt-1 font-medium">{product.name}</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={i < Math.floor(product.rating) ? "#FBBF24" : "#D1D5DB"}
                            className="h-4 w-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{product.rating}</span>
                    </div>
                    <div className="mt-3 font-bold">${product.price.toFixed(2)}</div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    <Button className="w-full bg-red-600 hover:bg-red-700">Add to Cart</Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Mercedes Popular Models */}
          <section className="mt-24">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight">Popular Mercedes-Benz Models</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Find parts for these popular Mercedes-Benz models and more
              </p>
            </div>

            <Tabs defaultValue="c-class" className="mt-8">
              <TabsList className="w-full justify-start border-b bg-transparent p-0">
                {popularModels.map((model) => (
                  <TabsTrigger
                    key={model.id}
                    value={model.name.toLowerCase().replace(/\s+/g, "-")}
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-gray-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    {model.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {popularModels.map((model) => (
                <TabsContent
                  key={model.id}
                  value={model.name.toLowerCase().replace(/\s+/g, "-")}
                  className="mt-6 rounded-lg border p-6"
                >
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                      <Image
                        src={model.image || "/placeholder.svg"}
                        alt={`Mercedes-Benz ${model.name}`}
                        width={400}
                        height={250}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Mercedes-Benz {model.name}</h3>
                      <p className="mt-2 text-muted-foreground">{model.description}</p>
                      <div className="mt-4">
                        <h4 className="font-medium">Generations:</h4>
                        <ul className="mt-2 space-y-1 text-sm">
                          {model.generations.map((gen, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-4 w-4 text-gray-600"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {gen}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <Button asChild className="bg-gray-800 hover:bg-gray-900">
                          <Link href={`/shop?model=${model.name.toLowerCase().replace(/\s+/g, "-")}`}>
                            Shop {model.name} Parts
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* Mercedes Heritage Section */}
          <section className="mt-24 rounded-lg bg-gray-50 p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Mercedes-Benz Heritage</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    Since 1886, Mercedes-Benz has been synonymous with luxury, innovation, and engineering excellence.
                    From the invention of the first automobile to today's cutting-edge vehicles, Mercedes-Benz has
                    consistently set the standard for automotive design and technology.
                  </p>
                  <p>
                    The iconic three-pointed star represents the company's dominance of land, sea, and air, while the
                    "The Best or Nothing" philosophy ensures that every vehicle delivers an unparalleled driving
                    experience.
                  </p>
                  <p>
                    At Deutsche Point, we understand the passion that Mercedes-Benz owners have for their vehicles.
                    That's why we offer only genuine Mercedes-Benz parts and high-quality aftermarket alternatives that
                    meet or exceed OEM specifications.
                  </p>
                </div>
                <div className="mt-6">
                  <Button variant="outline">Learn More About Mercedes-Benz</Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Mercedes-Benz Heritage"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Mercedes Testimonials */}
          <section className="mt-24">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight">What Mercedes-Benz Owners Say</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Trusted by thousands of Mercedes-Benz enthusiasts worldwide
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#FBBF24"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "I've been buying parts for my Mercedes here for years. The customer service is outstanding and the
                    parts are always authentic. Perfect fit every time."
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Anna Weber"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">Anna Weber</h4>
                      <p className="text-sm text-muted-foreground">Mercedes-Benz C-Class</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#FBBF24"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "The technical support team was incredibly helpful in finding the right parts for my E-Class. The
                    quality is exceptional and delivery was faster than expected."
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Markus Bauer"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">Markus Bauer</h4>
                      <p className="text-sm text-muted-foreground">Mercedes-Benz E-Class</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#FBBF24"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "The AMG performance parts I purchased have transformed my GLE. Installation was straightforward
                    with the provided guides, and the quality is indistinguishable from dealer parts."
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Stefan Hoffmann"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">Stefan Hoffmann</h4>
                      <p className="text-sm text-muted-foreground">Mercedes-Benz GLE</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Mercedes Special Offers */}
          <section className="mt-24">
            <div className="rounded-lg bg-gray-100 p-8">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Special Mercedes-Benz Offers</h2>
                <p className="mt-2 max-w-2xl text-gray-700">
                  Take advantage of these limited-time deals on premium Mercedes-Benz parts
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden border-gray-200">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute left-0 top-0 z-10 bg-gray-800 px-3 py-1 text-sm font-bold text-white">
                      20% OFF
                    </div>
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Mercedes Maintenance Kit"
                      width={300}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">Mercedes Maintenance Kit</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold">€127.99</span>
                      <span className="text-sm text-muted-foreground line-through">€159.99</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Complete kit with oil filter, air filter, cabin filter, and drain plug.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border-gray-200">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute left-0 top-0 z-10 bg-gray-800 px-3 py-1 text-sm font-bold text-white">
                      15% OFF
                    </div>
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Mercedes AMG Brake Kit"
                      width={300}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">Mercedes AMG Brake Kit</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold">€339.99</span>
                      <span className="text-sm text-muted-foreground line-through">€399.99</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      High-performance brake pads and rotors for improved stopping power.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border-gray-200">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute left-0 top-0 z-10 bg-gray-800 px-3 py-1 text-sm font-bold text-white">
                      25% OFF
                    </div>
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="Mercedes Interior LED Kit"
                      width={300}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">Mercedes Interior LED Kit</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold">€89.99</span>
                      <span className="text-sm text-muted-foreground line-through">€119.99</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Complete interior LED lighting upgrade kit with installation tools.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-8 text-center">
                <Button className="bg-gray-800 hover:bg-gray-900">View All Mercedes-Benz Offers</Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
