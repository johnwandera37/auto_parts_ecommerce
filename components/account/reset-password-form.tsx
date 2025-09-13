"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAlert } from "@/hooks/useAlert";
import { toast } from "@/hooks/use-toast";
import Loader from "../ui/loader";
import api from "@/lib/axios";
import { handleFormError } from "@/utils/handleFormErrors";
import { endpoints, pages } from "@/config/constants";
import { usePasswordField } from "@/hooks/usePasswordField";
import { resetPasswordSchema } from "@/lib/zodSchema";
import { log } from "@/utils/logger";

export function ResetPasswordForm() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showPassword, PasswordToggle } = usePasswordField();
  const {
    showPassword: showConfirmPassword,
    PasswordToggle: ConfirmPasswordToggle,
  } = usePasswordField();
  const { setError, setSuccess, AlertUI } = useAlert();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // email sent via router navigation

  const clearForm = () => {
    setOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate that we have the email
    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);

    try {
      // Validate frontend form with Zod
      const parsed = resetPasswordSchema.parse({
        email, // take email passed from router
        otp,
        newPassword,
        confirmNewPassword,
      });

      const { data } = await api.post(endpoints.resetPassword, {
        email: parsed.email,
        otp: parsed.otp,
        newPassword: parsed.newPassword,
        confirmNewPassword: parsed.confirmNewPassword,
      });

      setSuccess(data.message || "Password reset successfully");
      toast({
        title: "Password Reset",
        description:
          data.message || "Your password has been updated successfully",
      });

      // Clear the form
      clearForm();

      // Redirect to login
      router.push(pages.login);
    } catch (err: any) {
      handleFormError(err, setError, toast);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AlertUI />

      {email && (
        <p className="text-sm text-muted-foreground">
          Reset password for <strong>{email}</strong>
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="otp">Verification Code</Label>
        <Input
          id="otp"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter 6-digit code"
          value={otp}
          onChange={handleOtpChange}
          className="text-center text-lg font-mono tracking-widest"
          maxLength={6}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            className="pl-10"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <PasswordToggle />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            className="pl-10"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <ConfirmPasswordToggle />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700"
        disabled={
          isLoading || otp.length !== 6 || !newPassword || !confirmNewPassword
        }
      >
        {isLoading ? (
          <>
            <Loader size="sm" variant="button" /> Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
