import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { errLog } from "@/utils/logger";
import { getErrorMessage } from "@/utils/errMsg";
import { signupSchema } from "@/lib/zodSchema";
import { badRequestFromZod } from "@/utils/responseUtils";

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

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashed,
        role: "USER", // enforced unless changed later by admin
        acceptedTerms, // must be true to register
        marketingConsent, // default to false, can be updated later
      },
    });

    return NextResponse.json(
      { message: "User registered successfully" },
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
