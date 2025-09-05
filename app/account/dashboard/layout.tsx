import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Account Dashboard | Deutsche Point",
  description: "Manage your Deutsche Point account, orders, saved vehicles, and more.",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
