import { apiResponse, getRefreshTokenFromRequest } from "@/lib/cookieUtils";
import { verifyRefreshToken } from "@/lib/jwt";
import { getRedisClient } from "@/lib/redis";
import { handleRedisError } from "@/lib/redisErrorMapperHandler";
import { getErrorMessage } from "@/utils/errMsg";
import { errLog, log } from "@/utils/logger";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Get cookies from header string
  const result = getRefreshTokenFromRequest(req);
  if (!result.success) return result.response;

  try {
    const payload = verifyRefreshToken(result.refreshToken) as {
      sessionId: string;
    };

    // Delete the refresh token from Redis
    try {
      //delete the refresh token that is in redis
      const redis = await getRedisClient();
      await redis.del(`auto_parts_ecommerce:session:${payload.sessionId}`);
    } catch (redisError) {
      errLog(
        "❌ Logout cleanup: failed to delete session from Redis",
        redisError
      );
      // For better user experience, logout cannot happen if user is not connected 
      // to internet or if there is connection issues, that way proper messages can be shown
      return handleRedisError(redisError, "logout handler", {
        status: 503,
        message: "Unable to clear session. Please try again later.",
      });
    }

    // Return the response and clear cookies after redis session is cleared
    return apiResponse({
      status: 200,
      message: "Logout successful.",
      cookiesToClear: ["access_token", "refresh_token"],
    });
  } catch (err) {
    errLog("Error in logout:", "Invalid token: ", err);
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
