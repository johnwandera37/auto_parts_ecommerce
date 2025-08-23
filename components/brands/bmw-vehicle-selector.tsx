"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// BMW-specific vehicle data
const bmwVehicleData = [
  {
    name: "1 Series",
    series: [
      {
        name: "E87 (1st Gen)",
        years: [
          {
            name: "2004-2007",
            engines: ["116i", "118i", "120i", "130i", "118d", "120d"],
          },
          {
            name: "2007-2011",
            engines: ["116i", "118i", "120i", "130i", "116d", "118d", "120d", "123d"],
          },
        ],
      },
      {
        name: "F20/F21 (2nd Gen)",
        years: [
          {
            name: "2011-2015",
            engines: ["114i", "116i", "118i", "125i", "M135i", "116d", "118d", "120d", "125d"],
          },
          {
            name: "2015-2019",
            engines: ["116i", "118i", "120i", "125i", "M140i", "116d", "118d", "120d", "125d"],
          },
        ],
      },
      {
        name: "F40 (3rd Gen)",
        years: [
          {
            name: "2019-Present",
            engines: ["118i", "120i", "128ti", "M135i", "116d", "118d", "120d"],
          },
        ],
      },
    ],
  },
  {
    name: "3 Series",
    series: [
      {
        name: "E90/E91/E92/E93 (5th Gen)",
        years: [
          {
            name: "2005-2008",
            engines: [
              "316i",
              "318i",
              "320i",
              "325i",
              "330i",
              "335i",
              "M3",
              "316d",
              "318d",
              "320d",
              "325d",
              "330d",
              "335d",
            ],
          },
          {
            name: "2008-2012",
            engines: [
              "316i",
              "318i",
              "320i",
              "325i",
              "328i",
              "330i",
              "335i",
              "M3",
              "316d",
              "318d",
              "320d",
              "325d",
              "330d",
              "335d",
            ],
          },
        ],
      },
      {
        name: "F30/F31/F34 (6th Gen)",
        years: [
          {
            name: "2012-2015",
            engines: ["316i", "320i", "328i", "335i", "316d", "318d", "320d", "325d", "330d", "335d"],
          },
          {
            name: "2015-2019",
            engines: ["318i", "320i", "330i", "340i", "316d", "318d", "320d", "330d", "335d"],
          },
        ],
      },
      {
        name: "G20/G21 (7th Gen)",
        years: [
          {
            name: "2019-Present",
            engines: ["318i", "320i", "330i", "M340i", "318d", "320d", "330d", "M3"],
          },
        ],
      },
    ],
  },
  {
    name: "5 Series",
    series: [
      {
        name: "E60/E61 (5th Gen)",
        years: [
          {
            name: "2003-2007",
            engines: ["520i", "523i", "525i", "530i", "540i", "545i", "550i", "M5", "520d", "525d", "530d", "535d"],
          },
          {
            name: "2007-2010",
            engines: ["520i", "523i", "525i", "528i", "530i", "540i", "550i", "M5", "520d", "525d", "530d", "535d"],
          },
        ],
      },
      {
        name: "F10/F11/F07 (6th Gen)",
        years: [
          {
            name: "2010-2013",
            engines: ["520i", "523i", "528i", "530i", "535i", "550i", "M5", "518d", "520d", "525d", "530d", "535d"],
          },
          {
            name: "2013-2017",
            engines: ["520i", "528i", "530i", "535i", "550i", "M5", "518d", "520d", "525d", "530d", "535d", "550d"],
          },
        ],
      },
      {
        name: "G30/G31 (7th Gen)",
        years: [
          {
            name: "2017-2020",
            engines: ["520i", "530i", "540i", "M550i", "M5", "518d", "520d", "525d", "530d", "540d"],
          },
          {
            name: "2020-Present",
            engines: ["520i", "530i", "540i", "M550i", "M5", "518d", "520d", "530d", "540d"],
          },
        ],
      },
    ],
  },
  {
    name: "X5",
    series: [
      {
        name: "E53 (1st Gen)",
        years: [
          {
            name: "2000-2003",
            engines: ["3.0i", "4.4i", "4.6is", "3.0d"],
          },
          {
            name: "2003-2006",
            engines: ["3.0i", "4.4i", "4.8is", "3.0d"],
          },
        ],
      },
      {
        name: "E70 (2nd Gen)",
        years: [
          {
            name: "2006-2010",
            engines: ["3.0si", "4.8i", "X5 M", "3.0d", "3.5d", "4.0d"],
          },
          {
            name: "2010-2013",
            engines: ["3.5i", "5.0i", "X5 M", "3.0d", "4.0d"],
          },
        ],
      },
      {
        name: "F15 (3rd Gen)",
        years: [
          {
            name: "2013-2018",
            engines: ["35i", "40i", "50i", "X5 M", "25d", "30d", "40d", "M50d"],
          },
        ],
      },
      {
        name: "G05 (4th Gen)",
        years: [
          {
            name: "2018-Present",
            engines: ["40i", "50i", "X5 M", "25d", "30d", "40d", "M50d"],
          },
        ],
      },
    ],
  },
]

export function BmwVehicleSelector() {
  const [model, setModel] = useState<string>("")
  const [series, setSeries] = useState<string>("")
  const [year, setYear] = useState<string>("")
  const [engine, setEngine] = useState<string>("")

  // Filter data based on current selections
  const availableSeries = model ? bmwVehicleData.find((m) => m.name === model)?.series || [] : []
  const availableYears = series ? availableSeries.find((s) => s.name === series)?.years || [] : []
  const availableEngines = year ? availableYears.find((y) => y.name === year)?.engines || [] : []

  // Reset dependent fields when parent field changes
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

  const isComplete = model && series && year && engine
  const searchUrl = isComplete
    ? `/compatibility?make=BMW&model=${model}&series=${series}&year=${year}&engine=${engine}`
    : "#"

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="px-6 py-5">
        <h3 className="text-xl font-bold">Find Parts For Your BMW</h3>
        <p className="text-sm text-muted-foreground">Select your BMW details to find compatible parts</p>
      </div>
      <Separator />
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <label htmlFor="model" className="text-sm font-medium">
            Model
          </label>
          <Select value={model} onValueChange={handleModelChange}>
            <SelectTrigger id="model">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {bmwVehicleData.map((item) => (
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
          className={`${isComplete ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"}`}
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
