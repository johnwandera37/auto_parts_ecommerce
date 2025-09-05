// lib/auth-core.ts
import { verifyAccessToken } from "@/lib/jwt";
import { getErrorMessage } from "@/utils/errMsg";
import { getUserById } from "@/utils/getUserById";
import { errLog, log } from "@/utils/logger";
import { NextRequest } from "next/server";
import { edgeCaseVerifyAccessToken } from "./jwt-edge";

export async function verifyRequestAuth(
  req: Request,
  roles: string[] = []
): Promise<{
  valid: boolean;
  user?: { id: string; role: string; email: string;  hasUpdatedCredentials: string; };
  error?: string;
}> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { valid: false, error: "Unauthorized" };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token) as {
      id: string;
      role: string;
      email: string;
      hasUpdatedCredentials: string;
    };

    if (roles.length && !roles.includes(decoded.role)) {
      return { valid: false, error: "Forbidden" };
    }

    return { valid: true, user: decoded };
  } catch (err) {
    errLog("Auth error:", getErrorMessage(err), err);
    return { valid: false, error: "Invalid token" };
  }
}

// lib/auth-middleware.ts - NEW FUNCTION FOR MIDDLEWARE
export async function verifyCookieAuth(
  req: NextRequest,
  requiredRoles?: string[]
) {
  // This works ONLY with cookies for middleware
  const token = req.cookies.get("access_token")?.value;
  log("🔐 Token from cookie found:", !!token);

  if (!token) {
    return { valid: false, error: "No token provided" };
  }

  try {
    log("🔐 Attempting to verify token...");

    const decoded = (await edgeCaseVerifyAccessToken(token)) as {
      id: string;
      role: string;
      email: string;
      hasUpdatedCredentials: string; 
    };

    log("🔐 Decoded token:", !!decoded);

    if (requiredRoles && requiredRoles.length > 0) {
      if (!requiredRoles.includes(decoded.role)) {
        return { valid: false, error: "Forbbiden" };
      }
    }

    return { valid: true, user: decoded };
  } catch (error: any) {
    errLog("🔐 Token verification error:", error);
    // Return the specific error message from edgeCaseVerifyAccessToken
    return {
      valid: false,
      error: error.message || "Invalid token",
    };
  }
}
