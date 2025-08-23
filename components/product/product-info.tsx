"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Heart, ShieldCheck, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VehicleCompatibilityCheck } from "@/components/product/vehicle-compatibility-check"

interface ProductInfoProps {
  product: any // In a real app, you would define a proper type
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        <div className="mt-2">
          <Link
            href={`/categories/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-muted-foreground hover:text-red-600"
          >
            {product.category}
          </Link>
          {product.subcategory && (
            <>
              <span className="mx-2 text-muted-foreground">&middot;</span>
              <Link
                href={`/categories/${product.subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-muted-foreground hover:text-red-600"
              >
                {product.subcategory}
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
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
        <div className="text-sm text-muted-foreground">
          {product.rating} ({product.reviewCount} reviews)
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
        )}
      </div>

      <div className="space-y-2 rounded-lg border p-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Check className="h-3 w-3" />
          </div>
          <span className={product.inStock ? "text-green-600" : "text-red-600"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
          <span className="text-muted-foreground">|</span>
          <span>SKU: {product.sku}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <span>Estimated delivery: {product.estimatedDelivery}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-md border">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none rounded-l-md"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
            className="h-9 w-12 border-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none rounded-r-md" onClick={incrementQuantity}>
            +
          </Button>
        </div>
        <Button className="flex-1 bg-red-600 hover:bg-red-700">Add to Cart</Button>
        <Button variant="outline" size="icon" aria-label="Add to wishlist">
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <VehicleCompatibilityCheck compatibleVehicles={product.compatibleVehicles} />

      <div className="space-y-3 rounded-lg border p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-red-600" />
          <div>
            <h4 className="font-medium">Genuine OEM Part</h4>
            <p className="text-sm text-muted-foreground">
              This is an authentic {product.brand} Original Equipment Manufacturer part.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Truck className="h-5 w-5 text-red-600" />
          <div>
            <h4 className="font-medium">Free Shipping</h4>
            <p className="text-sm text-muted-foreground">On orders over $99 within Germany.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-red-600"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <div>
            <h4 className="font-medium">Satisfaction Guaranteed</h4>
            <p className="text-sm text-muted-foreground">30-day hassle-free returns.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
