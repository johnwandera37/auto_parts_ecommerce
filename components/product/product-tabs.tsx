"use client"

import { useState } from "react"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductTabsProps {
  product: any // In a real app, you would define a proper type
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [showAllReviews, setShowAllReviews] = useState(false)
  const displayedReviews = showAllReviews ? product.reviews : product.reviews.slice(0, 2)

  return (
    <Tabs defaultValue="description" className="mt-12">
      <TabsList className="w-full justify-start border-b bg-transparent p-0">
        <TabsTrigger
          value="description"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="specifications"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger
          value="compatibility"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Vehicle Compatibility
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Reviews ({product.reviews.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-medium">Product Specifications</h3>
            <div className="space-y-2">
              {product.specifications.map((spec: any, index: number) => (
                <div key={index} className="grid grid-cols-2 gap-4 py-2">
                  <div className="font-medium">{spec.name}</div>
                  <div>{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Technical Details</h3>
            <div className="space-y-2">
              {product.technicalDetails.map((detail: any, index: number) => (
                <div key={index} className="grid grid-cols-2 gap-4 py-2">
                  <div className="font-medium">{detail.name}</div>
                  <div>{detail.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="compatibility" className="mt-6">
        <h3 className="mb-4 text-lg font-medium">Compatible Vehicles</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left font-medium">Model</th>
                <th className="py-2 text-left font-medium">Series</th>
                <th className="py-2 text-left font-medium">Years</th>
              </tr>
            </thead>
            <tbody>
              {product.compatibleVehicles.map((vehicle: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{vehicle.model}</td>
                  <td className="py-2">{vehicle.series}</td>
                  <td className="py-2">{vehicle.years}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Note: This compatibility list is provided as a guide. Please use the compatibility checker above to confirm
          fitment for your specific vehicle.
        </p>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Customer Reviews</h3>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span>
                {product.rating} out of 5 ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
          <Button variant="outline">Write a Review</Button>
        </div>

        <div className="space-y-6">
          {displayedReviews.map((review: any) => (
            <div key={review.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{review.title}</h4>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      by {review.author} on {review.date}
                    </span>
                  </div>
                </div>
                {review.verified && (
                  <div className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                    Verified Purchase
                  </div>
                )}
              </div>
              <p className="mt-3 text-muted-foreground">{review.content}</p>
              <div className="mt-2 text-sm text-muted-foreground">Vehicle: {review.vehicle}</div>
            </div>
          ))}
        </div>

        {product.reviews.length > 2 && (
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={() => setShowAllReviews(!showAllReviews)}>
              {showAllReviews ? "Show Less" : `Show All ${product.reviews.length} Reviews`}
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
