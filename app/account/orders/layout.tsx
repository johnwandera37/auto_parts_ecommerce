import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order History | Deutsche Point",
  description: "View and manage your order history and track current orders.",
};


export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}



