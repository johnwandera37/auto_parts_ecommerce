import type { Metadata } from "next"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountNav } from "@/components/account/account-nav"
import { AccountSettingsForm } from "@/components/account/account-settings-form"

export const metadata: Metadata = {
  title: "Account Settings | Deutsche Point",
  description: "Manage your account settings, personal information, and preferences.",
}

export default function AccountSettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
            <AccountNav />

            <div>
              <AccountSettingsForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
