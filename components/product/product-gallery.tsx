"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-2 z-10 bg-white/80 backdrop-blur-sm"
              aria-label="Zoom image"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <div className="relative aspect-square">
              <Image
                src={images[currentImage] || "/placeholder.svg"}
                alt={`${name} - Image ${currentImage + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
          onClick={prevImage}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${name} - Image ${currentImage + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
          onClick={nextImage}
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex space-x-2 overflow-auto pb-1">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative aspect-square w-20 overflow-hidden rounded-md border-2 ${
              currentImage === index ? "border-red-600" : "border-transparent"
            }`}
            onClick={() => setCurrentImage(index)}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${name} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
