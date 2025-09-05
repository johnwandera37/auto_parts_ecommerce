import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingForm } from "@/components/admin/onboarding-form"

export const metadata: Metadata = {
  title: "Admin Onboarding | Deutsche Point",
  description: "Complete your admin setup by updating the default credentials.",
}

export default function AdminOnboardingPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-100">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />

      {/* Centered card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="w-full shadow-2xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">
              Super Admin Setup
            </CardTitle>
            <CardDescription>
              Update your default credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OnboardingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
