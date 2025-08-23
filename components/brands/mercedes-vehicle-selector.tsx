"use client"

import { useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Mercedes-specific vehicle data
const mercedesVehicleData = [
  {
    name: "A-Class",
    series: [
      {
        name: "W176 (3rd Gen)",
        years: [
          {
            name: "2012-2015",
            engines: ["A180", "A200", "A250", "A45 AMG", "A160 CDI", "A180 CDI", "A200 CDI", "A220 CDI"],
          },
          {
            name: "2015-2018",
            engines: ["A160", "A180", "A200", "A250", "A45 AMG", "A160d", "A180d", "A200d", "A220d"],
          },
        ],
      },
      {
        name: "W177 (4th Gen)",
        years: [
          {
            name: "2018-Present",
            engines: ["A180", "A200", "A220", "A250", "A35 AMG", "A45 AMG", "A180d", "A200d", "A220d"],
          },
        ],
      },
    ],
  },
  {
    name: "C-Class",
    series: [
      {
        name: "W204 (3rd Gen)",
        years: [
          {
            name: "2007-2010",
            engines: [
              "C180",
              "C200",
              "C230",
              "C250",
              "C280",
              "C300",
              "C350",
              "C63 AMG",
              "C200 CDI",
              "C220 CDI",
              "C320 CDI",
              "C350 CDI",
            ],
          },
          {
            name: "2010-2014",
            engines: [
              "C180",
              "C200",
              "C250",
              "C300",
              "C350",
              "C63 AMG",
              "C180 CDI",
              "C200 CDI",
              "C220 CDI",
              "C250 CDI",
              "C350 CDI",
            ],
          },
        ],
      },
      {
        name: "W205 (4th Gen)",
        years: [
          {
            name: "2014-2018",
            engines: [
              "C160",
              "C180",
              "C200",
              "C250",
              "C300",
              "C350",
              "C400",
              "C450 AMG",
              "C43 AMG",
              "C63 AMG",
              "C180d",
              "C200d",
              "C220d",
              "C250d",
              "C300d",
            ],
          },
          {
            name: "2018-2021",
            engines: ["C180", "C200", "C300", "C43 AMG", "C63 AMG", "C180d", "C200d", "C220d", "C300d"],
          },
        ],
      },
      {
        name: "W206 (5th Gen)",
        years: [
          {
            name: "2021-Present",
            engines: ["C180", "C200", "C300", "C43 AMG", "C63 AMG", "C200d", "C220d", "C300d"],
          },
        ],
      },
    ],
  },
  {
    name: "E-Class",
    series: [
      {
        name: "W211 (3rd Gen)",
        years: [
          {
            name: "2002-2006",
            engines: [
              "E200",
              "E240",
              "E280",
              "E320",
              "E500",
              "E55 AMG",
              "E200 CDI",
              "E220 CDI",
              "E270 CDI",
              "E320 CDI",
              "E400 CDI",
            ],
          },
          {
            name: "2006-2009",
            engines: [
              "E200",
              "E230",
              "E280",
              "E300",
              "E350",
              "E500",
              "E63 AMG",
              "E200 CDI",
              "E220 CDI",
              "E280 CDI",
              "E300 CDI",
              "E320 CDI",
              "E420 CDI",
            ],
          },
        ],
      },
      {
        name: "W212 (4th Gen)",
        years: [
          {
            name: "2009-2013",
            engines: [
              "E200",
              "E250",
              "E300",
              "E350",
              "E500",
              "E63 AMG",
              "E200 CDI",
              "E220 CDI",
              "E250 CDI",
              "E300 CDI",
              "E350 CDI",
            ],
          },
          {
            name: "2013-2016",
            engines: [
              "E200",
              "E250",
              "E300",
              "E350",
              "E400",
              "E500",
              "E63 AMG",
              "E200 CDI",
              "E220 CDI",
              "E250 CDI",
              "E300 BlueTEC",
              "E350 BlueTEC",
            ],
          },
        ],
      },
      {
        name: "W213 (5th Gen)",
        years: [
          {
            name: "2016-2020",
            engines: [
              "E180",
              "E200",
              "E250",
              "E300",
              "E350",
              "E400",
              "E450",
              "E43 AMG",
              "E53 AMG",
              "E63 AMG",
              "E200d",
              "E220d",
              "E300d",
              "E350d",
              "E400d",
            ],
          },
          {
            name: "2020-Present",
            engines: [
              "E200",
              "E300",
              "E350",
              "E450",
              "E53 AMG",
              "E63 AMG",
              "E200d",
              "E220d",
              "E300d",
              "E350d",
              "E400d",
            ],
          },
        ],
      },
    ],
  },
  {
    name: "GLE-Class",
    series: [
      {
        name: "W166 (1st Gen)",
        years: [
          {
            name: "2015-2019",
            engines: [
              "GLE300",
              "GLE350",
              "GLE400",
              "GLE450 AMG",
              "GLE43 AMG",
              "GLE63 AMG",
              "GLE250d",
              "GLE350d",
              "GLE400d",
            ],
          },
        ],
      },
      {
        name: "W167 (2nd Gen)",
        years: [
          {
            name: "2019-Present",
            engines: ["GLE350", "GLE450", "GLE53 AMG", "GLE63 AMG", "GLE300d", "GLE350d", "GLE400d"],
          },
        ],
      },
    ],
  },
]

export function MercedesVehicleSelector() {
  const [model, setModel] = useState<string>("")
  const [series, setSeries] = useState<string>("")
  const [year, setYear] = useState<string>("")
  const [engine, setEngine] = useState<string>("")

  // Filter data based on current selections
  const availableSeries = model ? mercedesVehicleData.find((m) => m.name === model)?.series || [] : []
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
    ? `/compatibility?make=Mercedes-Benz&model=${model}&series=${series}&year=${year}&engine=${engine}`
    : "#"

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="px-6 py-5">
        <h3 className="text-xl font-bold">Find Parts For Your Mercedes</h3>
        <p className="text-sm text-muted-foreground">Select your Mercedes-Benz details to find compatible parts</p>
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
              {mercedesVehicleData.map((item) => (
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
          className={`${isComplete ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-400"}`}
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
