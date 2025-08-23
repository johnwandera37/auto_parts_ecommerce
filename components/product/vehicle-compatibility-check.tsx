"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VehicleCompatibilityCheckProps {
  compatibleVehicles: {
    model: string
    years: string
    series: string
  }[]
}

export function VehicleCompatibilityCheck({ compatibleVehicles }: VehicleCompatibilityCheckProps) {
  const [make, setMake] = useState<string>("")
  const [model, setModel] = useState<string>("")
  const [year, setYear] = useState<string>("")
  const [checkResult, setCheckResult] = useState<"compatible" | "incompatible" | null>(null)

  // Get unique models from compatible vehicles
  const uniqueModels = Array.from(new Set(compatibleVehicles.map((v) => v.model)))

  // Get years for selected model
  const getYearsForModel = (selectedModel: string) => {
    const vehicles = compatibleVehicles.filter((v) => v.model === selectedModel)
    const yearRanges = vehicles.map((v) => v.years)
    return yearRanges.flatMap((range) => {
      const [start, end] = range.split("-").map(Number)
      return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString())
    })
  }

  const handleModelChange = (value: string) => {
    setModel(value)
    setYear("")
    setCheckResult(null)
  }

  const handleYearChange = (value: string) => {
    setYear(value)
    setCheckResult(null)
  }

  const checkCompatibility = () => {
    if (!make || !model || !year) return

    // Check if the selected vehicle is compatible
    const yearNum = Number.parseInt(year)
    const isCompatible = compatibleVehicles.some((v) => {
      if (v.model !== model) return false
      const [start, end] = v.years.split("-").map(Number)
      return yearNum >= start && yearNum <= end
    })

    setCheckResult(isCompatible ? "compatible" : "incompatible")
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-3 font-medium">Check Vehicle Compatibility</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Select value={make} onValueChange={setMake}>
          <SelectTrigger>
            <SelectValue placeholder="Select Make" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BMW">BMW</SelectItem>
          </SelectContent>
        </Select>

        <Select value={model} onValueChange={handleModelChange} disabled={!make}>
          <SelectTrigger>
            <SelectValue placeholder={make ? "Select Model" : "Select Make First"} />
          </SelectTrigger>
          <SelectContent>
            {uniqueModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={year} onValueChange={handleYearChange} disabled={!model}>
          <SelectTrigger>
            <SelectValue placeholder={model ? "Select Year" : "Select Model First"} />
          </SelectTrigger>
          <SelectContent>
            {model &&
              getYearsForModel(model).map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 flex justify-end">
        <Button
          onClick={checkCompatibility}
          disabled={!make || !model || !year}
          className="bg-red-600 hover:bg-red-700"
        >
          Check Compatibility
        </Button>
      </div>

      {checkResult && (
        <div
          className={`mt-3 flex items-center gap-2 rounded-md p-2 ${
            checkResult === "compatible" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {checkResult === "compatible" ? (
            <>
              <Check className="h-5 w-5" />
              <span>
                This part is compatible with your {make} {model} ({year})
              </span>
            </>
          ) : (
            <>
              <X className="h-5 w-5" />
              <span>
                This part is not compatible with your {make} {model} ({year})
              </span>
            </>
          )}
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-medium">Compatible with:</h4>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {compatibleVehicles.map((vehicle, index) => (
            <li key={index}>
              {vehicle.model} ({vehicle.years}) - {vehicle.series}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
