"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcher } from "@/lib/fetcher";
import { endpoints, pages } from "@/config/constants";
import { handleFormError } from "@/utils/handleFormErrors";
import { useAlert } from "@/hooks/useAlert";
import { toast } from "@/hooks/use-toast";
import Loader from "../ui/loader";
import { usePasswordField } from "@/hooks/usePasswordField";
import { updateProfileSchema } from "@/lib/zodSchema";
import { log, warnLog } from "@/utils/logger";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

// Initial form state
const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export function OnboardingForm() {
  const [formData, setFormData] = useState(initialFormData);
  const { setUser } = useAuth();
  // independent states for each password field
  const {
    showPassword: showCurrentPassword,
    PasswordToggle: CurrentPasswordToggle,
  } = usePasswordField();
  const { showPassword: showNewPassword, PasswordToggle: NewPasswordToggle } =
    usePasswordField();
  const {
    showPassword: showConfirmPassword,
    PasswordToggle: ConfirmPasswordToggle,
  } = usePasswordField();

  const [isLoading, setIsLoading] = useState(false);
  const { setError, setSuccess, AlertUI } = useAlert();
  const router = useRouter();

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Function to clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // ✅ Validate with zod
      const parsed = updateProfileSchema.parse(formData);

      // 🔥 Use api instance instead of fetcher
      const { data } = await api.patch<{
        message: string;
        data: {
          requiresEmailVerification?: boolean;
          userId: string;
          email: string;
          user: User;
        };
      }>(endpoints.updateProfile, parsed);

      const { requiresEmailVerification, userId, email, user } = data.data;

      setSuccess(data.message || "Profile updated successfully!");
      toast({
        title: "Profile Update Complete",
        description: data.message,
      });

      // ✅ CLEAR THE FORM ON SUCCESS
      clearForm();

      // Ensure user is updated with new data in the context
      // Update AuthContext with returned data or fetch fresh
      if (user) {
        setUser(user); // Use returned data if available
      } else {
        // Fallback: fetch fresh data (though this should rarely be needed)
        try {
          const userResponse = await api.get(endpoints.getMe);
          if (userResponse?.data?.user) {
            setUser(userResponse.data.user);
          }
        } catch (fetchError) {
          warnLog("Failed to fetch updated user:", fetchError);
           // Not critical - the tokens are updated so it will work on next page load
        }
      }

      // Then direct admin to verify email
      if (requiresEmailVerification) {
        // setTimeout(() => {
        router.push(`${pages.verification}?userId=${userId}&email=${email}`);
        // }, 2000);
      }
    } catch (err: any) {
      log("Error in catch in onboarding form", err);
      handleFormError(err, setError, toast);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AlertUI />

      {/* First Name */}
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            className="pl-10"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Last Name */}
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            className="pl-10"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            className="pl-10"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Current default password */}
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Current Default Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Enter the current default password"
            className="pl-10"
            value={formData.currentPassword}
            onChange={(e) => handleChange("currentPassword", e.target.value)}
            required
          />
          <CurrentPasswordToggle />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter a strong password"
            className="pl-10"
            value={formData.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
            required
          />
          <NewPasswordToggle />
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="pl-10"
            value={formData.confirmNewPassword}
            onChange={(e) => handleChange("confirmNewPassword", e.target.value)}
            required
          />
          <ConfirmPasswordToggle />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader size="sm" variant="button" /> Updating...
          </>
        ) : (
          "Update Profile"
        )}
      </Button>
    </form>
  );
}
