import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Deutsche Point",
  description: "Enter the verification code and set your new password.",
};

export default function ResetPasswordLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return <>{children}</>;
}