// lib/jwt-edge.ts
import { errLog } from "@/utils/logger";
import { jwtVerify } from "jose";

// lib/jwt-edge.ts - Add debugging
export async function edgeCaseVerifyAccessToken(token: string) {
  try {
    // console.log('🔐 Secret being used:', process.env.ACCESS_TOKEN_SECRET);
    // console.log('🔐 Token being verified:', token);

    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    // console.log('🔐 Verification successful:', payload);
    return payload;
  } catch (error: any) {
    errLog("🔐 Verification failed with error:", error);

    // Provide specific error messages
    if (error.code === "ERR_JWT_EXPIRED") {
      throw new Error("Token expired");
    }

    if (
      error.code === "ERR_JWT_INVALID" ||
      error.message?.includes("invalid")
    ) {
      throw new Error("Invalid token format");
    }

    if (
      error.message?.includes("signature") ||
      error.message?.includes("verification")
    ) {
      throw new Error("Invalid token signature");
    }

    // Generic error for other cases

    throw new Error("Invalid token");
  }
}
