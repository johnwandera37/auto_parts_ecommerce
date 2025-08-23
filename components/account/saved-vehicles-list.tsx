"use client"

import { useState } from "react"
import Image from "next/image"
import { Car, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SavedVehiclesList() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: "BMW",
      model: "3 Series",
      year: 2018,
      variant: "330i xDrive",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      make: "BMW",
      model: "X5",
      year: 2020,
      variant: "xDrive40i",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2019,
      variant: "C300 4MATIC",
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  const [vehicleToDelete, setVehicleToDelete] = useState<number | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDeleteClick = (id: number) => {
    setVehicleToDelete(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (vehicleToDelete !== null) {
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleToDelete))
      setShowDeleteDialog(false)
      setVehicleToDelete(null)
    }
  }

  return (
    <div>
      {vehicles.length === 0 ? (
        <Card className="p-6 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <Car className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No Vehicles Saved</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Add your vehicles to quickly find compatible parts and accessories.
          </p>
          <Button className="mt-4 bg-red-600 hover:bg-red-700">Add Your First Vehicle</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-dp-gold/20 bg-gray-900 border-gray-800 transform hover:scale-105 hover:z-10 relative"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                <Image
                  src={vehicle.image || "/placeholder.svg"}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-sm text-muted-foreground">{vehicle.variant}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" size="sm">
                  Find Parts
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteClick(vehicle.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Vehicle</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert variant="destructive" className="bg-red-50 text-red-600">
              <AlertDescription>
                Deleting this vehicle will remove it from your saved vehicles list. You will need to add it again if you
                want to check part compatibility in the future.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
