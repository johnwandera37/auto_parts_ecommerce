import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { verifyOTP } from "@/utils/otp";
import { errLog } from "@/utils/logger";
import { resetPasswordSchema } from "@/lib/zodSchema";
import { badRequestFromZod } from "@/utils/responseUtils";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate with Zod
    const parse = resetPasswordSchema.safeParse(body);
    if (!parse.success) {
      return badRequestFromZod(parse.error);
    }

    const { email, otp, newPassword } = parse.data;

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Verify OTP
    const isValid = await verifyOTP(user.id, otp);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    // Update password
    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      message: "Password reset successfully",
    });
  } catch (error: any) {
    errLog("Reset password error:", error);

    if (
      error.message.includes("expired") ||
      error.message.includes("invalid") ||
      error.message.includes("attempts")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
