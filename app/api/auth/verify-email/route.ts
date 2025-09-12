import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { errLog, log, warnLog } from "@/utils/logger";
import { getErrorMessage } from "@/utils/errMsg";
import { verifyOTP } from "@/utils/otp";
import { verifyEmailSchema } from "@/lib/zodSchema";
import { badRequestFromZod } from "@/utils/responseUtils";
import { signToken, verifyAccessToken, verifyRefreshToken } from "@/lib/jwt";
import { getRedisClient } from "@/lib/redis";
import { ACCESS_TOKEN_MAX_AGE } from "@/config/constants";

export async function POST(req: NextRequest) {
  try {
    // const { userId, otp } = await req.json();
    const body = await req.json();

    // Validate with zod
    const parse = verifyEmailSchema.safeParse(body);
    if (!parse.success) {
      return badRequestFromZod(parse.error);
    }

    const { userId, otp } = parse.data;

    // Verify the OTP
    const isValid = await verifyOTP(userId, otp);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired verification code" },
        { status: 400 }
      );
    }

    // ✅ Get the updated user with fresh emailVerified status
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { adminProfile: true },
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ SMART CHECK: Generate new token only if user has valid refresh token
    const existingRefreshToken = req.cookies.get("refresh_token")?.value;

    if (existingRefreshToken) {
      try {
        const refreshDecoded = verifyRefreshToken(existingRefreshToken) as any;

        if (refreshDecoded && refreshDecoded.id === userId) {
          const newAccessToken = signToken({
            id: updatedUser.id,
            role: updatedUser.role,
            email: updatedUser.email,
            isDefaultAdmin: updatedUser.email === "admin@example.com",
            emailVerified: updatedUser.emailVerified,
            ...(updatedUser.role === "ADMIN" &&
              updatedUser.adminProfile && {
                hasUpdatedCredentials:
                  updatedUser.adminProfile.hasUpdatedCredentials,
              }),
          });

          // ✅ Create response AFTER determining session status
          const response = NextResponse.json(
            {
              message: "Email verified successfully",
              hasActiveSession: true, // ✅ Correct value
              requiresLogin: false, // ✅ Correct value
            },
            { status: 200 }
          );

          response.cookies.set("access_token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: ACCESS_TOKEN_MAX_AGE,
            sameSite: "lax",
          });

          log("✅ New access token generated for active session");
          return response; // ✅ Return early for active session
        }
      } catch (refreshError) {
        errLog("ℹ️ Refresh token invalid, not generating new access token");
      }
    }

    // ✅ DEFAULT RESPONSE for no active session
    return NextResponse.json(
      {
        message: "Email verified successfully",
        hasActiveSession: false, // ✅ Correct value
        requiresLogin: true, // ✅ Correct value
      },
      { status: 200 }
    );
  } catch (error: any) {
    errLog("Email verification error:", getErrorMessage(error));

    if (error.message.includes("expired")) {
      return NextResponse.json(
        { error: "Verification code has expired" },
        { status: 400 }
      );
    }

    if (error.message.includes("Invalid")) {
      return NextResponse.json(
        { error: "The OTP provided is invalid" },
        { status: 400 }
      );
    }

    if (error.message.includes("attempts")) {
      return NextResponse.json(
        { error: "Too many failed attempts. Please request a new code." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get the access token from cookies to check original email if true
// const authHeader = req.headers.get("Authorization");
// let isDefaultAdmin: boolean | undefined;
// if (authHeader && authHeader.startsWith("Bearer ")) {
//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = verifyAccessToken(token) as {
//       isDefaultAdmin?: boolean;
//     };
//     isDefaultAdmin = decoded.isDefaultAdmin;
//   } catch (error) {
//     warnLog("Could not decode access token:", error);
//   }
// }

// // Clear session if it was originally the default admin
// if (isDefaultAdmin) {
//   // Clear session for default admin
//   response.cookies.delete("access_token");
//   response.cookies.delete("refresh_token");

//   // Also clear Redis session
//   try {
//     const redis = await getRedisClient();
//     // Get session ID from refresh token if available
//     const refreshToken = req.cookies.get("refresh_token")?.value;
//     if (refreshToken) {
//       const payload = verifyRefreshToken(refreshToken) as {
//         sessionId: string;
//       };
//       await redis.del(`auto_parts_ecommerce:session:${payload.sessionId}`);
//     }
//   } catch (error) {
//     warnLog("Redis cleanup optional:", error);
//   }
// }
