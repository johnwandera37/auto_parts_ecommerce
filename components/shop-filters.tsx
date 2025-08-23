"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export function ShopFilters() {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    category: true,
    price: true,
    condition: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleSection("brand")}>
          <h3 className="font-medium">Brand</h3>
          {expandedSections.brand ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        {expandedSections.brand && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="brand-bmw" />
              <label htmlFor="brand-bmw" className="text-sm">
                BMW
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="brand-mercedes" />
              <label htmlFor="brand-mercedes" className="text-sm">
                Mercedes-Benz
              </label>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleSection("category")}>
          <h3 className="font-medium">Category</h3>
          {expandedSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        {expandedSections.category && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="category-engine" />
              <label htmlFor="category-engine" className="text-sm">
                Engine Parts
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="category-braking" />
              <label htmlFor="category-braking" className="text-sm">
                Braking Systems
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="category-suspension" />
              <label htmlFor="category-suspension" className="text-sm">
                Suspension & Steering
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="category-electrical" />
              <label htmlFor="category-electrical" className="text-sm">
                Electrical Components
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="category-exterior" />
              <label htmlFor="category-exterior" className="text-sm">
                Body & Exterior
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="category-interior" />
              <label htmlFor="category-interior" className="text-sm">
                Interior Accessories
              </label>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleSection("price")}>
          <h3 className="font-medium">Price Range</h3>
          {expandedSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        {expandedSections.price && (
          <div className="mt-6 px-2">
            <Slider defaultValue={[0, 500]} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm">${priceRange[0]}</span>
              <span className="text-sm">${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex cursor-pointer items-center justify-between" onClick={() => toggleSection("condition")}>
          <h3 className="font-medium">Condition</h3>
          {expandedSections.condition ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
        {expandedSections.condition && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="condition-new" />
              <label htmlFor="condition-new" className="text-sm">
                New
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="condition-remanufactured" />
              <label htmlFor="condition-remanufactured" className="text-sm">
                Remanufactured
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="condition-used" />
              <label htmlFor="condition-used" className="text-sm">
                Used
              </label>
            </div>
          </div>
        )}
      </div>

      <Button className="w-full bg-red-600 hover:bg-red-700">Apply Filters</Button>
      <Button variant="outline" className="w-full">
        Reset Filters
      </Button>
    </div>
  )
}
