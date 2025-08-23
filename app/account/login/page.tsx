import Link from "next/link"
import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/account/login-form"

export const metadata: Metadata = {
  title: "Login | Deutsche Point",
  description: "Login to your Deutsche Point account to manage orders, saved vehicles, and more.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container flex items-center justify-center px-4 py-12 md:px-6 md:py-24">
          <Card className="mx-auto w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.4183 4.86566 20.1253 8.83848 21.4903C9.33848 21.5819 9.52535 21.2819 9.52535 21.0183C9.52535 20.7819 9.51285 19.9182 9.51285 19.0546C7.00098 19.5546 6.35098 18.4546 6.15098 17.9273C6.03848 17.6546 5.55098 16.8 5.12598 16.5637C4.77598 16.3819 4.27598 15.8819 5.11348 15.8692C5.90098 15.8546 6.46348 16.6182 6.65098 16.9037C7.55098 18.3692 8.98848 17.9637 9.56348 17.7C9.65098 17.1 9.91348 16.6909 10.201 16.4546C7.99035 16.2182 5.66348 15.3819 5.66348 11.4728C5.66348 10.3819 6.03848 9.47715 6.67598 8.76452C6.57598 8.51452 6.24035 7.51452 6.77598 6.13952C6.77598 6.13952 7.61348 5.87715 9.52535 7.16952C10.326 6.95065 11.176 6.84102 12.026 6.84102C12.876 6.84102 13.726 6.95065 14.5267 7.16952C16.4267 5.86452 17.2767 6.13952 17.2767 6.13952C17.8123 7.51452 17.4767 8.51452 17.3767 8.76452C18.0142 9.47715 18.3892 10.3692 18.3892 11.4728C18.3892 15.3946 16.0517 16.2182 13.8392 16.4546C14.2017 16.7546 14.5142 17.3273 14.5142 18.2273C14.5142 19.5 14.5017 20.6819 14.5017 21.0183C14.5017 21.2819 14.6892 21.5946 15.1892 21.4903C19.1538 20.1237 22.0011 16.4171 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"></path>
                  </svg>
                  GitHub
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/account/register" className="font-medium text-red-600 hover:text-red-700">
                  Sign up
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
