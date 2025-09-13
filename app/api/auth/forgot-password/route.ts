import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { createOrUpdateVerification } from "@/utils/otp";
import { sendVerificationEmail } from "@/lib/email";
import { errLog, log } from "@/utils/logger";
import { forgotPasswordSchema } from "@/lib/zodSchema";
import { badRequestFromZod } from "@/utils/responseUtils";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate with Zod
    const parse = forgotPasswordSchema.safeParse(body);
    if (!parse.success) {
      return badRequestFromZod(parse.error);
    }

    const { email } = parse.data;

    // Check if user exists (but don't reveal it)
    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        message: "If this email exists, a verification code has been sent",
      });
    }

    // Generate OTP for password reset
    const verification = await createOrUpdateVerification(user.id);

    try {
      // Send email - let the email function handle error classification
      await sendVerificationEmail(email, verification.otp, "reset");
      return NextResponse.json({
        message: "If this email exists, a verification code has been sent.",
      });
    } catch (emailError: any) {
      // Only network/timeout errors will reach here (shouldRethrow = true)
      errLog("Error thrown from sendVerificationEmail:", emailError);

      return NextResponse.json(
        {
          error: emailError.customErrMsg || "Network error occurred",
          code: emailError.code, // can handle from front end but that is unnecessary extra work
        },
        { status: emailError.status || 503 }
      );
    }
  } catch (error) {
    errLog("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
