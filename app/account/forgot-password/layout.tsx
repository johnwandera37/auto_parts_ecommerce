import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Deutsche Point",
  description:
    "Enter your email to receive a password reset verification code.",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
