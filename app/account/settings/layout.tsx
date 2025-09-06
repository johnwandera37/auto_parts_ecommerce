import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings | Deutsche Point",
  description:
    "Manage your account settings, personal information, and preferences.",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}