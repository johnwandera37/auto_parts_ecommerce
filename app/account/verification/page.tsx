"use client";

import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EmailVerificationForm } from "@/components/account/email-verification-form"

export default function VerificationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container flex items-center justify-center px-4 py-12 md:px-6 md:py-24">
          <Card className="mx-auto w-full max-w-md">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
              <CardDescription>Enter the verification code sent to your email</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailVerificationForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}