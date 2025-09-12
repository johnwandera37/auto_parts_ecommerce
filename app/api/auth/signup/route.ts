import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { errLog } from "@/utils/logger";
import { getErrorMessage } from "@/utils/errMsg";
import { signupSchema } from "@/lib/zodSchema";
import { badRequestFromZod } from "@/utils/responseUtils";
import { createOrUpdateVerification } from "@/utils/otp";
import { sendVerificationEmail } from "@/lib/email";

//This creates user accounts, by default it has the role USER, unless changed to other levels by super admin or manager
export async function POST(req: Request) {
  try {
    // Find the highest-level admin (if any)
    const superAdmin = await prisma.user.findFirst({
      where: {
        role: "ADMIN",
        adminProfile: { level: 100 }, // Super Admin only
      },
      select: {
        email: true,
      },
    });

    // No Super Admin at all → block signup
    if (!superAdmin) {
      return NextResponse.json(
        { error: "Signup is disabled until a Super Admin is onboarded." },
        { status: 403 }
      );
    }

    // // Default seeded Super Admin still exists → block until updated
    if (superAdmin.email === "admin@example.com") {
      return NextResponse.json(
        {
          error:
            "Signup is disabled until the default Super Admin account is updated.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const parse = signupSchema.safeParse(body);
    if (!parse.success) {
      return badRequestFromZod(parse.error);
    }

    const {
      firstName,
      lastName,
      email,
      password,
      acceptedTerms,
      marketingConsent = false,
    } = parse.data;

    //   // ✅ Ensure email uniqueness
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    const hashed = await hashPassword(password);
    // Create user with emailVerified: false
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        emailVerified: false, // Force false for new registrations
        password: hashed,
        role: "USER", // enforced unless changed later by admin
        acceptedTerms, // must be true to register
        marketingConsent, // default to false, can be updated later
      },
    });

    // ✅ Generate OTP and send verification email
    try {
      const verification = await createOrUpdateVerification(user.id);
      await sendVerificationEmail(email, verification.otp);
    } catch (emailError) {
      // Log email error but don't fail the registration
      errLog("Failed to send verification email:", getErrorMessage(emailError));
      // Continue - user can request a new OTP later
    }

    return NextResponse.json(
      {
        message: "Please check your email for verification.",
        userId: user.id,
        requiresVerification: true,
      },
      { status: 200 }
    );
  } catch (error) {
    errLog("Signup error", getErrorMessage(error));
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
