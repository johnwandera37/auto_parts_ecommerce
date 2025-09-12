"use client";

import type React from "react";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { endpoints, pages } from "@/config/constants";
import { handleFormError } from "@/utils/handleFormErrors";
import { useAlert } from "@/hooks/useAlert";
import { toast } from "@/hooks/use-toast";
import Loader from "../ui/loader";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { errLog, log, warnLog } from "@/utils/logger";
import { getErrorMessage } from "@/utils/errMsg";

export function EmailVerificationForm() {
  const [otp, setOtp] = useState(""); // Entered code from input
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { setError, setSuccess, AlertUI } = useAlert();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId"); // Provided in register form, onboarding form, middleware
  const email = searchParams.get("email"); // Provided in register form, onboarding form, middleware
  const { user, setUser } = useAuth(); // Get user from auth context if available

  // By this point, middleware has already ensured we have valid access
  // So we can safely use these values
  const targetUserId = userId || user?.id;
  const targetEmail = email || user?.email;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUserId) return;
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const { data } = await api.post<{
        message: string;
        hasActiveSession: boolean;
        requiresLogin: boolean;
      }>(
        endpoints.verifyEmail,
        {
          userId: targetUserId,
          otp,
        } // Direct properties
      );

      setSuccess(data.message || "Email verified successfully!");
      toast({
        title: "Email Verified!",
        description:
          data.message || "Your email has been successfully verified",
      });

      // ✅ USE THE FLAGS FROM THE ENDPOINT FOR REDIRECTION
      log("Flags in email verification page", "active", data.hasActiveSession, "requires login", data.requiresLogin)
      if (data.hasActiveSession) {
        // User had an active session → redirect to dashboard

        // Optional: Fetch fresh user data to update context
        try {
          const userResponse = await api.get(endpoints.getMe);
          if (userResponse?.data?.user) {
            setUser(userResponse.data.user);
          }
        } catch (fetchError) {
          warnLog("Failed to fetch user:", fetchError);
          // Continue to dashboard anyway - the token is valid
        }

        const dashboardPath =
          user?.role === "ADMIN" ? "/admin" : "/account/dashboard";
        router.push(dashboardPath);
      } else if (data.requiresLogin) {
        // New registration or expired session → redirect to logins
        router.push(pages.login);
      } else {
        // Fallback → redirect to login
        router.push(pages.login);
      }
      // }, 2000);
    } catch (err: any) {
      log("Error in catch in email verification form", err);
      handleFormError(err, setError, toast);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!targetUserId || !targetEmail) return;
    setIsResending(true);
    setError(null);

    try {
      const { data } = await api.post(endpoints.resendOtp, {
        userId: targetUserId,
        email: targetEmail,
      });

      setSuccess(
        data.message || "A new verification code has been sent to your email!"
      );

      toast({
        title: "New Code Sent",
        description:
          data.message ||
          "A new verification code has been sent to your email.",
      });
    } catch (err: any) {
      handleFormError(err, setError, toast);
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  // In your EmailVerificationForm component
  const handleCancelRegistration = async () => {
    if (!targetUserId) {
      router.push(pages.login);
      return;
    }

    try {
      // Call an API to delete the unverified user account
      const { data } = await api.delete<{ message: string }>(
        `${endpoints.cancelRegistration}?userId=${targetUserId}`
      );

      toast({
        title: "Registration Cancelled",
        description: data.message || "Your account has been removed.",
      });

      router.push(pages.register);
    } catch (error) {
      errLog(
        "Error in cancel registration button click handler: ",
        getErrorMessage(error),
        error
      );
      toast({
        title: "Error",
        description: "Failed to cancel registration. Please contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <AlertUI />

      <form onSubmit={handleVerify} className="space-y-4">
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
          <p className="text-xs text-muted-foreground">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? (
            <>
              <Loader size="sm" variant="button" /> Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </Button>
      </form>

      <div className="text-center space-y-4">
        <Button
          variant="outline"
          onClick={handleResendOtp}
          disabled={isResending}
          className="w-full"
        >
          {isResending ? (
            <>
              <Loader size="sm" variant="button" /> Sending...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Resend Code
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Didn't receive the code?</p>
          <div className="flex justify-center gap-4">
            <Button
              variant="link"
              size="sm"
              onClick={() => router.push("/support")}
              className="text-red-600 p-0 h-auto"
            >
              Contact support
            </Button>
            <span>•</span>
            <Button
              variant="link"
              size="sm"
              onClick={handleCancelRegistration}
              className="text-red-600 p-0 h-auto"
            >
              Cancel registration
            </Button>
          </div>
        </div>
      </div>

      {isResending && (
        <p className="text-xs text-muted-foreground text-center">
          Sending a new verification code...
        </p>
      )}
    </div>
  );
}
