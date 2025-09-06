import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | Deutsche Point",
  description: "View and manage your saved items for future purchase.",
};

export default function VerificatiosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}