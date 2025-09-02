"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export function usePasswordField() {
  const [showPassword, setShowPassword] = useState(false)

  const PasswordToggle = () => (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground"
      tabIndex={-1}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  )

  return { showPassword, PasswordToggle }
}
