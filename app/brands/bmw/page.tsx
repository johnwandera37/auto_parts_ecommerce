import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BmwVehicleSelector } from "@/components/brands/bmw-vehicle-selector"

export default function BmwPage() {
  // BMW-specific categories
  const categories = [
    {
      id: 1,
      name: "Engine Parts",
      image: "/placeholder.svg?height=200&width=200",
      count: 128,
      slug: "bmw-engine",
    },
    {
      id: 2,
      name: "Braking Systems",
      image: "/placeholder.svg?height=200&width=200",
      count: 87,
      slug: "bmw-braking",
    },
    {
      id: 3,
      name: "Suspension & Steering",
      image: "/placeholder.svg?height=200&width=200",
      count: 76,
      slug: "bmw-suspension",
    },
    {
      id: 4,
      name: "Electrical Components",
      image: "/placeholder.svg?height=200&width=200",
      count: 112,
      slug: "bmw-electrical",
    },
    {
      id: 5,
      name: "Body & Exterior",
      image: "/placeholder.svg?height=200&width=200",
      count: 65,
      slug: "bmw-exterior",
    },
    {
      id: 6,
      name: "Interior Accessories",
      image: "/placeholder.svg?height=200&width=200",
      count: 54,
      slug: "bmw-interior",
    },
  ]

  // BMW-specific featured products
  const featuredProducts = [
    {
      id: 1,
      name: "BMW OEM Brake Pads",
      category: "BMW Braking System",
      price: 89.99,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 2,
      name: "BMW Performance Air Filter",
      category: "BMW Engine Components",
      price: 49.99,
      rating: 4.7,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "BMW LED Headlight Set",
      category: "BMW Lighting",
      price: 199.99,
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "BMW M Sport Suspension Kit",
      category: "BMW Suspension",
      price: 349.99,
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  // BMW popular models
  const popularModels = [
    {
      id: 1,
      name: "3 Series",
      image: "/placeholder.svg?height=250&width=400",
      description: "The iconic sports sedan with dynamic performance and premium features.",
      generations: ["E90/E91/E92/E93 (2005-2012)", "F30/F31/F34 (2012-2019)", "G20/G21 (2019-Present)"],
    },
    {
      id: 2,
      name: "5 Series",
      image: "/placeholder.svg?height=250&width=400",
      description: "The perfect blend of luxury, comfort, and driving dynamics.",
      generations: ["E60/E61 (2003-2010)", "F10/F11/F07 (2010-2017)", "G30/G31 (2017-Present)"],
    },
    {
      id: 3,
      name: "X5",
      image: "/placeholder.svg?height=250&width=400",
      description: "The versatile Sports Activity Vehicle with commanding presence.",
      generations: ["E53 (2000-2006)", "E70 (2007-2013)", "F15 (2014-2018)", "G05 (2019-Present)"],
    },
    {
      id: 4,
      name: "M3",
      image: "/placeholder.svg?height=250&width=400",
      description: "The high-performance icon with motorsport DNA.",
      generations: ["E46 (2000-2006)", "E90/E92/E93 (2007-2013)", "F80 (2014-2018)", "G80 (2021-Present)"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* BMW Hero Section */}
        <section className="relative bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
            style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
          />
          <div className="container relative flex min-h-[500px] flex-col items-start justify-center px-4 py-24 md:px-6">
            <div className="max-w-lg space-y-4">
              <div className="inline-block rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                BMW Parts & Accessories
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                The Ultimate Driving Machine
              </h1>
              <p className="text-xl text-gray-200">
                Authentic BMW parts and accessories engineered to the same precision standards as your vehicle.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Shop All BMW Parts
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
          {/* BMW Vehicle Selector */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-7 lg:col-span-8">
              <div className="rounded-lg bg-gray-50 p-8">
                <h2 className="text-3xl font-bold tracking-tight">Find Parts for Your BMW</h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Use our vehicle selector to find parts that are guaranteed to fit your BMW
                </p>
                <div className="mt-6 aspect-video overflow-hidden rounded-lg bg-white shadow-sm">
                  <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/placeholder.svg?height=400&width=800')" }}
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    OEM Parts
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    Performance Upgrades
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    Maintenance Kits
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                    Genuine Accessories
                  </span>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 lg:col-span-4">
              <BmwVehicleSelector />
            </div>
          </div>

          {/* BMW Categories */}
          <section className="mt-24">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight">Shop BMW Parts by Category</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Find the perfect parts for your BMW from our extensive collection
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
                      <h3 className="font-medium">BMW {category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} products</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* BMW Featured Products */}
          <section className="mt-24">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Featured BMW Products</h2>
                <p className="text-muted-foreground">Top-quality parts for your BMW</p>
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

          {/* BMW Popular Models */}
          <section className="mt-24">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight">Popular BMW Models</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">Find parts for these popular BMW models and more</p>
            </div>

            <Tabs defaultValue="3-series" className="mt-8">
              <TabsList className="w-full justify-start border-b bg-transparent p-0">
                {popularModels.map((model) => (
                  <TabsTrigger
                    key={model.id}
                    value={model.name.toLowerCase().replace(/\s+/g, "-")}
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
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
                        alt={`BMW ${model.name}`}
                        width={400}
                        height={250}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">BMW {model.name}</h3>
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
                                className="h-4 w-4 text-blue-600"
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
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
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

          {/* BMW Heritage Section */}
          <section className="mt-24 rounded-lg bg-gray-50 p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">BMW Heritage</h2>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  <p>
                    Since its founding in 1916, BMW has been synonymous with performance, innovation, and quality. From
                    aircraft engines to motorcycles and automobiles, BMW has consistently pushed the boundaries of
                    engineering excellence.
                  </p>
                  <p>
                    The iconic kidney grille and blue and white roundel are recognized worldwide as symbols of precision
                    German engineering. BMW's commitment to "The Ultimate Driving Machine" philosophy ensures that every
                    vehicle delivers an exhilarating driving experience.
                  </p>
                  <p>
                    At Deutsche Point, we understand the passion that BMW owners have for their vehicles. That's why we
                    offer only genuine BMW parts and high-quality aftermarket alternatives that meet or exceed OEM
                    specifications.
                  </p>
                </div>
                <div className="mt-6">
                  <Button variant="outline">Learn More About BMW</Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image src="/placeholder.svg?height=400&width=600" alt="BMW Heritage" fill className="object-cover" />
              </div>
            </div>
          </section>

          {/* BMW Testimonials */}
          <section className="mt-24">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold tracking-tight">What BMW Owners Say</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">Trusted by thousands of BMW enthusiasts worldwide</p>
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
                    "The quality of these parts is exceptional. Perfect fit for my BMW and the delivery was faster than
                    expected. Will definitely be ordering again."
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Michael Schmidt"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">Michael Schmidt</h4>
                      <p className="text-sm text-muted-foreground">BMW 3 Series</p>
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
                    "I've been maintaining my M3 with parts from Deutsche Point for years. The technical support team
                    was very helpful in guiding me to the right components."
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Thomas Müller"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">Thomas Müller</h4>
                      <p className="text-sm text-muted-foreground">BMW M3</p>
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
                    "The performance upgrades I purchased for my X5 have made a noticeable difference. Great quality and
                    the installation guides were very helpful for a DIY enthusiast like me."
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Julia Weber"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-medium">Julia Weber</h4>
                      <p className="text-sm text-muted-foreground">BMW X5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* BMW Special Offers */}
          <section className="mt-24">
            <div className="rounded-lg bg-blue-50 p-8">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tight text-blue-900">Special BMW Offers</h2>
                <p className="mt-2 max-w-2xl text-blue-700">
                  Take advantage of these limited-time deals on premium BMW parts
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="overflow-hidden border-blue-200">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute left-0 top-0 z-10 bg-blue-600 px-3 py-1 text-sm font-bold text-white">
                      20% OFF
                    </div>
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="BMW Maintenance Kit"
                      width={300}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">BMW Maintenance Kit</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold">€119.99</span>
                      <span className="text-sm text-muted-foreground line-through">€149.99</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Complete kit with oil filter, air filter, cabin filter, and drain plug.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border-blue-200">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute left-0 top-0 z-10 bg-blue-600 px-3 py-1 text-sm font-bold text-white">
                      15% OFF
                    </div>
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="BMW Performance Brake Kit"
                      width={300}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">BMW Performance Brake Kit</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold">€254.99</span>
                      <span className="text-sm text-muted-foreground line-through">€299.99</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      High-performance brake pads and rotors for improved stopping power.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border-blue-200">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute left-0 top-0 z-10 bg-blue-600 px-3 py-1 text-sm font-bold text-white">
                      25% OFF
                    </div>
                    <Image
                      src="/placeholder.svg?height=200&width=300"
                      alt="BMW Interior LED Kit"
                      width={300}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">BMW Interior LED Kit</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold">€74.99</span>
                      <span className="text-sm text-muted-foreground line-through">€99.99</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Complete interior LED lighting upgrade kit with installation tools.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-8 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700">View All BMW Offers</Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
