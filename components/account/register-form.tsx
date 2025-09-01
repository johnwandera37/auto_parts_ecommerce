"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { fetcher } from "@/lib/fetcher";
import { endpoints } from "@/config/constants";
import { signupSchema } from "@/lib/zodSchema";
import { errLog, log } from "@/utils/logger";
import { getErrorMessage } from "@/utils/errMsg";
import { treeifyError, ZodError } from "zod/v4";
import { flattenTreeErrors } from "@/utils/flattenTreeErrors";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
    marketingConsent: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 4); // Cap at 4 for the visual indicator
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Validate frontend form with Zod
      const parsed = signupSchema.parse({
        ...formData,
        // Ensure checkboxes are properly handled
        acceptedTerms: formData.acceptedTerms,
        marketingConsent: formData.marketingConsent,
      });

      setLoading(true);
      const res = await fetcher<{ message: string }>(endpoints.register, {
        method: "POST",
        body: parsed,
        credentials: "omit", // don't send cookies here
      });

      setSuccess(res.message || "Account created successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      errLog("RAW ERROR CAUGHT:", err);
      if (err instanceof ZodError) {
        const tree = treeifyError(err); // 👇 now treeify on the frontend too
        const errors = flattenTreeErrors(tree);
        errLog("Frontend Zod errors: ", errors);
        // For more than one error from zod (line break or list)
        setError(Object.values(errors).join("\n"));
      } else if (err?.error && typeof err.error === "object") {
        // backend zod errors (already treeified) very unlikely to happen unless front end zod not working
        const errors = flattenTreeErrors(err.error);
        errLog("Backend zod errors: ", errors);
        setError(Object.values(errors).join("\n"));
      } else if (err?.error && typeof err.error === "string") {
        // backend single error message
        errLog("Backend plain error: ", err.error);
        setError(err.error);
      } else {
        if (err instanceof Error) {
          // generic JS/Fetch error, logout in prod through logger etc for better handling
          errLog("Generic error: ", err.message);
        }
        return setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive" className="bg-red-50 text-red-600">
          <AlertDescription className="whitespace-pre-line">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="bg-green-50 text-green-600">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="John"
              className="pl-10"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              className="pl-10"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            className="pl-10"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i < passwordStrength
                  ? [
                      "bg-red-500",
                      "bg-orange-500",
                      "bg-yellow-500",
                      "bg-green-500",
                    ][i]
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Password must be at least 8 characters and include uppercase, numbers,
          and special characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            className="pl-10"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="acceptedTerms"
            checked={formData.acceptedTerms}
            onCheckedChange={(checked) =>
              handleCheckboxChange("acceptedTerms", checked as boolean)
            }
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm font-normal">
            I agree to the{" "}
            <a href="/terms" className="text-red-600 hover:text-red-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-red-600 hover:text-red-700">
              Privacy Policy
            </a>
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="marketingConsent"
            checked={formData.marketingConsent}
            onCheckedChange={(checked) =>
              handleCheckboxChange("marketingConsent", checked as boolean)
            }
            className="mt-1"
          />
          <Label htmlFor="marketing" className="text-sm font-normal">
            I want to receive promotional emails about special offers, new
            products and exclusive promotions
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
