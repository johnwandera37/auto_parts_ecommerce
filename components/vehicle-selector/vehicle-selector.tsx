"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { vehicleData } from "./vehicle-data"

export function VehicleSelector() {
  const [make, setMake] = useState<string>("")
  const [model, setModel] = useState<string>("")
  const [series, setSeries] = useState<string>("")
  const [year, setYear] = useState<string>("")
  const [engine, setEngine] = useState<string>("")

  // Filter data based on current selections
  const availableModels = make ? vehicleData.find((m) => m.name === make)?.models || [] : []
  const availableSeries = model ? availableModels.find((m) => m.name === model)?.series || [] : []
  const availableYears = series ? availableSeries.find((s) => s.name === series)?.years || [] : []
  const availableEngines = year ? availableYears.find((y) => y.name === year)?.engines || [] : []

  // Reset dependent fields when parent field changes
  const handleMakeChange = (value: string) => {
    setMake(value)
    setModel("")
    setSeries("")
    setYear("")
    setEngine("")
  }

  const handleModelChange = (value: string) => {
    setModel(value)
    setSeries("")
    setYear("")
    setEngine("")
  }

  const handleSeriesChange = (value: string) => {
    setSeries(value)
    setYear("")
    setEngine("")
  }

  const handleYearChange = (value: string) => {
    setYear(value)
    setEngine("")
  }

  const isComplete = make && model && series && year && engine
  const searchUrl = isComplete
    ? `/compatibility?make=${make}&model=${model}&series=${series}&year=${year}&engine=${engine}`
    : "#"

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="px-6 py-5">
        <h3 className="text-xl font-bold">Find Parts For Your Vehicle</h3>
        <p className="text-sm text-muted-foreground">Select your vehicle details to find compatible parts</p>
      </div>
      <Separator />
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <label htmlFor="make" className="text-sm font-medium">
            Make
          </label>
          <Select value={make} onValueChange={handleMakeChange}>
            <SelectTrigger id="make">
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              {vehicleData.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="model" className="text-sm font-medium">
            Model
          </label>
          <Select value={model} onValueChange={handleModelChange} disabled={!make}>
            <SelectTrigger id="model">
              <SelectValue placeholder={make ? "Select model" : "Select make first"} />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="series" className="text-sm font-medium">
            Series/Generation
          </label>
          <Select value={series} onValueChange={handleSeriesChange} disabled={!model}>
            <SelectTrigger id="series">
              <SelectValue placeholder={model ? "Select series" : "Select model first"} />
            </SelectTrigger>
            <SelectContent>
              {availableSeries.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="year" className="text-sm font-medium">
            Year
          </label>
          <Select value={year} onValueChange={handleYearChange} disabled={!series}>
            <SelectTrigger id="year">
              <SelectValue placeholder={series ? "Select year" : "Select series first"} />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="engine" className="text-sm font-medium">
            Engine/Trim
          </label>
          <Select value={engine} onValueChange={setEngine} disabled={!year}>
            <SelectTrigger id="engine">
              <SelectValue placeholder={year ? "Select engine" : "Select year first"} />
            </SelectTrigger>
            <SelectContent>
              {availableEngines.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between p-6">
        <Button
          variant="ghost"
          onClick={() => {
            setMake("")
            setModel("")
            setSeries("")
            setYear("")
            setEngine("")
          }}
          size="sm"
        >
          Clear
        </Button>
        <Button
          className={`${isComplete ? "bg-red-600 hover:bg-red-700" : "bg-gray-400"}`}
          disabled={!isComplete}
          asChild
        >
          <Link href={searchUrl}>
            <Search className="mr-2 h-4 w-4" />
            Find Parts
          </Link>
        </Button>
      </div>
    </div>
  )
}
