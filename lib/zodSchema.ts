import { z } from "zod/v4";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

// 👤 Auth Schemas
// Signup
export const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.email().openapi({ example: "johndoe@gmail.com" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .openapi({
        description: "Account password (min 8 characters)",
        example: "Doe@12345",
      }),
    confirmPassword: z.string().openapi({
      description: "Confirm password (must match password)",
      example: "Doe@12345",
    }),
    acceptedTerms: z
      .boolean()
      .refine((val) => val === true, { message: "You must accept terms" })
      .openapi({
        description: "Must accept terms and conditions",
        example: true,
      }),
    marketingConsent: z.boolean().default(false).optional().openapi({
      description: "Opt-in to receive promotional emails",
      example: false,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .openapi("Signup");

//Login
export const loginSchema = z
  .object({
    email: z.email().openapi({ example: "johndoe@gmail.com" }),
    password: z.string().openapi({ example: "Doe@12345" }),
    rememberMe: z
      .boolean()
      .optional()
      .default(false)
      .openapi({ example: true }),
  })
  .openapi("Login");

// Update admin profile
export const updateProfileSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must not exceed 50 characters")
      .openapi({
        example: "Jane",
      }),
    lastName: z
      .string()
      .min(2)
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must not exceed 50 characters")
      .openapi({
        example: "Admin",
      }),
    email: z.email().openapi({
      example: "jane.admin@example.com",
    }),
    currentPassword: z
      .string()
      .min(1, "Current default password is required")
      .openapi({ example: "seededPassword123" }),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .openapi({
        description: "New password required for the admin",
        example: "newSecurePassword123",
      }),
    confirmNewPassword: z.string().openapi({
      description: "Confirm password (must match password)",
      example: "Doe@12345",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .openapi("AdminProfileUpdate");

// Verify email
export const verifyEmailSchema = z.object({
  userId: z.cuid("Valid user ID is required"),
  otp: z.string().length(6).regex(/^\d+$/, "OTP must be numeric"),
});

// Resend OTP
export const resendOtpSchema = z.object({
  userId: z.cuid("Valid user ID is required"),
  email: z.email("Valid email is required"),
});

//reusable department
const departmentSchema = z.string().openapi({
  example: "technical-support",
  description: "The department the agent is assigned to",
});
