import { NextResponse } from "next/server";
import { signToken, verifyRefreshToken } from "@/lib/jwt";
import { getRedisClient } from "@/lib/redis";
import { serialize } from "cookie";
import { errLog, log } from "@/utils/logger";
import { getErrorMessage } from "@/utils/errMsg";
import { ACCESS_TOKEN_MAX_AGE } from "@/config/constants";
import { getRefreshTokenFromRequest } from "@/lib/cookieUtils";
import { handleRedisError } from "@/lib/redisErrorMapperHandler";
import { email } from "zod/v4";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  // Get cookies from header string
  const result = getRefreshTokenFromRequest(req);
  if (!result.success) return result.response;

  try {
    // Validate refresh token via JWT
    const payload = verifyRefreshToken(result.refreshToken) as {
      id: string;
      role: string; // role could be stale but just keep will use fresh from the db
      email: string; // can be stale, use latest from db
      sessionId: string;
    };

    // Get FRESH user data from database
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: { adminProfile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    try {
      // Attempt to get Redis client
      const redis = await getRedisClient();
      const redisKey = `auto_parts_ecommerce:session:${payload.sessionId}`;
      const storedRefreshToken = await redis.get(redisKey);

      if (!storedRefreshToken || storedRefreshToken !== result.refreshToken) {
        log("❌ Session expired or invalid refresh token");
        return NextResponse.json({ error: "Session expired" }, { status: 403 });
      }

      // Create new access token, same structure as the one created during login
      log("Email verified flag in refresh route", user.emailVerified);
      const newAccessToken = signToken({
        id: user.id,
        role: user.role,
        email: user.email, // ← Current email from DB
        isDefaultAdmin: user.email === "admin@example.com",
        emailVerified: user.emailVerified,
        ...(user.role === "ADMIN" &&
          user.adminProfile && {
            hasUpdatedCredentials: user.adminProfile.hasUpdatedCredentials,
          }),
      });

      const accessCookie = serialize("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: ACCESS_TOKEN_MAX_AGE,
        sameSite: "lax",
      });

      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": accessCookie,
        },
      });
    } catch (redisError: any) {
      return handleRedisError(redisError, "refresh handler", {
        status: 401, // specific default error on redis error mapper provided
        message: "Session validation failed",
      });
    }
  } catch (error: any) {
    // Handle JWT verification errors
    const errorMessage = getErrorMessage(error);
    errLog("Refresh error from route: ", error);

    if (errorMessage.includes("jwt expired")) {
      log("❌ Expired refresh token");
      return NextResponse.json({ error: "Session expired" }, { status: 403 });
    }

    if (
      errorMessage.includes("jwt malformed") ||
      errorMessage.includes("invalid token")
    ) {
      log("❌ Invalid refresh token format");
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    // For all other errors
    errLog("Unexpected error during refresh:", errorMessage);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
