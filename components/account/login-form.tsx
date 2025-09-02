"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcher } from "@/lib/fetcher";
import { endpoints } from "@/config/constants";
import { errLog } from "@/utils/logger";
import { handleFormError } from "@/utils/handleFormErrors";
import { loginSchema } from "@/lib/zodSchema";

import { useAlert } from "@/hooks/useAlert";
import { toast } from "@/hooks/use-toast";
import Loader from "../ui/loader";
import { usePasswordField } from "@/hooks/usePasswordField";

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const { showPassword, PasswordToggle } = usePasswordField();
  const [isLoading, setIsLoading] = useState(false);
  const { setError, setSuccess, AlertUI } = useAlert();
  const router = useRouter();

  const handleChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Validate + sanitize using schema
      const parsed = loginSchema.parse(formData);

      // 1. Call login endpoint
      const loginResponse = await fetcher<{
        message: string;
        user: {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
          role: string;
        };
      }>(endpoints.login, {
        method: "POST",
        body: parsed,
      });

      // 2. If success, redirect to dashboard
      if (loginResponse?.user) {
        setSuccess(loginResponse.message || "Login successful!");
        toast({
          title: loginResponse.message || "Login successful",
          description: "Welcome to Deutche Point",
        });

        setTimeout(() => {
          router.push("/account/dashboard");
        }, 2000);
      }
    } catch (err: any) {
      handleFormError(err, setError, toast);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AlertUI /> {/* ✅ directly rendered from hook */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/account/forgot-password"
            className="text-xs text-red-600 hover:text-red-700"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-10"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
          <PasswordToggle />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember"
          checked={formData.rememberMe}
          onCheckedChange={(checked) => handleChange("rememberMe", !!checked)}
        />
        <Label htmlFor="remember" className="text-sm font-normal">
          Remember me for 30 days
        </Label>
      </div>
      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader size="sm" variant="button" /> Please wait
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}
