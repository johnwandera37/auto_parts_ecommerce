import Link from "next/link"
import type { Metadata } from "next"
import { Mail, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Verify Your Email | Deutsche Point",
  description: "Please verify your email address to complete your registration.",
}

export default function VerificationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container flex items-center justify-center px-4 py-12 md:px-6 md:py-24">
          <Card className="mx-auto w-full max-w-md text-center">
            <CardHeader className="space-y-1">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <Mail className="h-10 w-10 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
              <CardDescription>
                We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to
                verify your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you don&apos;t see the email, please check your spam folder. The email should arrive within a few
                minutes.
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">Resend Verification Email</Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                <Link
                  href="/account/login"
                  className="inline-flex items-center font-medium text-red-600 hover:text-red-700"
                >
                  Return to login
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
