"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAlert } from "@/hooks/useAlert";
import { toast } from "@/hooks/use-toast";
import Loader from "../ui/loader";
import api from "@/lib/axios";
import { handleFormError } from "@/utils/handleFormErrors";
import { endpoints, pages } from "@/config/constants";
import { forgotPasswordSchema } from "@/lib/zodSchema";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setError, setSuccess, AlertUI } = useAlert();
  const router = useRouter();

  // Function to clear the form
  const clearForm = () => {
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Validate frontend with zod
      const parsed = forgotPasswordSchema.parse({
        email,
      });

      const { data } = await api.post<{ message: string; error?: string }>(
        endpoints.forgotPassword,
        parsed
      );

      setSuccess(data.message || "Verification code sent to your email");
      toast({
        title: "Code Sent",
        description: "Check your email for the password reset code",
      });

      // Clear form
      clearForm();

      // Redirect to reset password page with email
      router.push(`${pages.resetPassword}?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      handleFormError(err, setError, toast);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AlertUI />

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader size="sm" variant="button" /> Sending...
          </>
        ) : (
          "Send Reset Code"
        )}
      </Button>
    </form>
  );
}
