import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Vehicles | Deutsche Point",
  description:
    "Manage your saved vehicles for quick part lookup and compatibility checking.",
};

export default function VehiclesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}