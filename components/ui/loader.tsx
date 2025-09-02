import { Loader2 as Spinner } from "lucide-react"
import { cn } from "@/lib/utils"

type LoaderProps = {
  variant?: "fullscreen" | "inline" | "button"
  size?: "sm" | "lg"
}

export default function Loader({ variant = "inline", size = "sm" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    lg: "w-8 h-8",
  }

  const spinner = (
    <Spinner className={cn("animate-spin", sizeClasses[size], "text-muted-foreground")} />
  )

  if (variant === "fullscreen") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  if (variant === "button") {
    return <div className="mr-2">{spinner}</div>
  }

  return spinner
}
