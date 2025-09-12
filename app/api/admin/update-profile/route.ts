import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getUserFromToken } from "@/lib/auth"; // helper to extract user from token
import { comparePasswords, hashPassword } from "@/lib/hash"; // assuming you have a hash utility
import { errLog, log, warnLog } from "@/utils/logger";
import { getErrorMessage } from "@/utils/errMsg";
import { updateProfileSchema } from "@/lib/zodSchema";
import { badRequestFromZod } from "@/utils/responseUtils";
import { getRedisClient } from "@/lib/redis";
import { apiResponse, getRefreshTokenFromRequest } from "@/lib/cookieUtils";
import { signRefreshToken, signToken, verifyRefreshToken } from "@/lib/jwt";
import { randomUUID } from "crypto";
import { handleRedisError } from "@/lib/redisErrorMapperHandler";
import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
} from "@/config/constants";
import { createOrUpdateVerification } from "@/utils/otp";
import { sendVerificationEmail } from "@/lib/email";

export async function PATCH(req: NextRequest) {
  try {
    const userOrResponse = await getUserFromToken(req); // Extract user info from JWT / response

    // Check if it's a NextResponse (error case)
    if (userOrResponse instanceof NextResponse) {
      return userOrResponse; // Return the error response directly
    }

    // Now we know it's the user object
    const user = userOrResponse;

    // 1. Verify admin privileges
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized, Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body); //this checks if body is correct with zod schemas

    // 422 - Validation Errors
    if (!parsed.success) {
      return badRequestFromZod(parsed.error, 422);
    }

    // Now we have received data from the body
    const { firstName, lastName, email, currentPassword, newPassword } =
      parsed.data;

    // 2. Get default admin(This will proceed with the current admin trying to do this operation)
    const superAdmin = await prisma.user.findUnique({
      where: { id: user.id },
    });

    //Check admin with default credential, if not found, either admin was not seeded or was updated
    const defaultAdminExists = superAdmin?.email === "admin@example.com";
    if (!defaultAdminExists) {
      return NextResponse.json(
        {
          error:
            "Default Admin account not found, either it was updated or not seeded initially",
        },
        { status: 404 }
      );
    }

    // 3. Ensure admin proceeds with their unique email, not the default one  // 403 - Security Policy Violations
    if (
      email === superAdmin.email &&
      superAdmin.email === "admin@example.com"
    ) {
      return NextResponse.json(
        { error: "Must change default admin email" },
        { status: 403 }
      );
    }

    // 4. Verify current password against seeded credentials
    const passwordValid = await comparePasswords(
      currentPassword,
      superAdmin.password
    );

    // 401 - Credential Verification
    if (!passwordValid) {
      return NextResponse.json(
        {
          error:
            "Current password incorrect, Use the initially seeded credentials",
        },
        { status: 401 }
      );
    }

    // 5. Email uniqueness check (excluding self)
    if (email !== superAdmin.email) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email,
          id: { not: superAdmin.id },
        },
      });

      if (emailExists) {
        return NextResponse.json(
          { error: "Email already in use by another account" },
          { status: 409 }
        );
      }
    }

    // 6. Update admin credentials
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName,
        lastName,
        email, // ← This is the new email
        password: hashedPassword,
        emailVerified: false, // enforce that user needs to verify email
        // Update the adminProfile instead
        adminProfile: {
          update: {
            hasUpdatedCredentials: true,
          },
        },
      },
      include: {
        adminProfile: true,
      },
    });

    // ✅ 7. GENERATE OTP AND SEND VERIFICATION EMAIL
    try {
      const verification = await createOrUpdateVerification(updatedUser.id);
      await sendVerificationEmail(updatedUser.email, verification.otp);
      log("📧 Verification email sent to:", updatedUser.email);
    } catch (emailError) {
      // Log email error but don't fail the profile update
      errLog("Failed to send verification email:", getErrorMessage(emailError));
      // Continue - user can request a new OTP later from verification page
    }

    // 8. Generate NEW tokens with updated data
    const newAccessToken = signToken({
      id: updatedUser.id,
      role: updatedUser.role,
      email: updatedUser.email, // ← Updated email
      isDefaultAdmin: updatedUser.email === "admin@example.com",
      emailVerified: updatedUser.emailVerified, // This is false
      ...(updatedUser.role === "ADMIN" &&
        updatedUser.adminProfile && {
          hasUpdatedCredentials: updatedUser.adminProfile.hasUpdatedCredentials, // ← Now true
        }),
    });

    // Generate new refresh token with new session ID
    const newSessionId = randomUUID();
    const newRefreshToken = signRefreshToken({
      id: updatedUser.id,
      role: updatedUser.role,
      email: updatedUser.email, // ← Updated email
      sessionId: newSessionId,
    });

    try {
      const redis = await getRedisClient();

      // 9. Delete old session for the default admin from Redis (if exists)
      const oldRefreshToken = req.cookies.get("refresh_token")?.value;
      if (oldRefreshToken) {
        try {
          const oldPayload = verifyRefreshToken(oldRefreshToken) as {
            sessionId: string;
          };
          await redis.del(
            `auto_parts_ecommerce:session:${oldPayload.sessionId}`
          );
        } catch (redisError) {
          warnLog("Failed to delete old Redis session:", redisError);
          return handleRedisError(redisError, "login handler", {
            status: 503,
            message: "Unable to clear old session. Please try again later.",
          });
        }
      }

      // 10. Store new refresh token in Redis
      await redis.set(
        `auto_parts_ecommerce:session:${newSessionId}`,
        newRefreshToken,
        { EX: REFRESH_TOKEN_MAX_AGE }
      );
    } catch (redisError) {
      // It's a must to have a new valid session created so we stop if something happen and handle the error
      errLog("Cleanup error | Redis: ", getErrorMessage(redisError));
      warnLog("Failed to delete old Redis session:", redisError);
      return handleRedisError(redisError, "login handler", {
        status: 503,
        message: "Unable to create new session. Please try again later.",
      });
    }

    // 11. Return response with new tokens
    const response = apiResponse({
      status: 200,
      message: "Credentials updated successfully.",
      data: {
        requiresEmailVerification: true,
        userId: user.id, // for redirection verificatio
        email: user.email, // for redirection to verificatio
        user: {
          // ← Add the full user object, to update user in onboarding form
          id: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          role: updatedUser.role,
          emailVerified: updatedUser.emailVerified,
        },
      },
    });

    // 12. Set new cookies
    response.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ACCESS_TOKEN_MAX_AGE,
      sameSite: "lax",
    });

    response.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: REFRESH_TOKEN_MAX_AGE,
      sameSite: "lax",
    });

    return response;
    // THE END
    // 13. Force client-side to verify email, then redirect then directs them to respective dashboards since they have new active sesion
  } catch (err) {
    errLog("Admin credential update failed:", getErrorMessage(err));
    return NextResponse.json(
      { error: "Credential update failed" },
      { status: 500 }
    );
  }
}
