import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { errLog } from "@/utils/logger";
import { getErrorMessage } from "@/utils/errMsg";
import { createOrUpdateVerification } from "@/utils/otp";
import { sendVerificationEmail } from "@/lib/email";
import { resendOtpSchema, verifyEmailSchema } from "@/lib/zodSchema";
import { badRequestFromZod } from "@/utils/responseUtils";

export async function POST(req: Request) {
  try {
 const body = await req.json();

        // ✅ Zod handles all validation including required fields
    const parse = resendOtpSchema.safeParse(body);
    if (!parse.success) {
      return badRequestFromZod(parse.error);
    }

  const { userId, email } = parse.data;

    // Check if user exists and is not already verified
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { emailVerified: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      );
    }

    // Generate new OTP and send email
    const verification = await createOrUpdateVerification(userId);
    await sendVerificationEmail(email, verification.otp);

    return NextResponse.json(
      { message: `New verification code successfully sent to ${email}` },
      { status: 200 }
    );
  } catch (error: any) {
    errLog("Resend OTP error:", getErrorMessage(error));

    if (error.message.includes("Failed to send")) {
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
