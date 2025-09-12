// app/api/auth/cancel-registration/route.ts
import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { getRedisClient } from "@/lib/redis";
import { verifyRefreshToken } from "@/lib/jwt";
import { warnLog } from "@/utils/logger";

export async function DELETE(req: NextRequest) {
  // ✅ Use NextRequest
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // 1. ✅ Check if user exists and is unverified
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { emailVerified: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        {
          error: "Cannot delete verified account",
        },
        { status: 400 }
      );
    }

    // 2. ✅ Clear Redis session if refresh token exists (simple check)
    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (refreshToken) {
      try {
        const payload = verifyRefreshToken(refreshToken) as {
          sessionId: string;
        };
        const redis = await getRedisClient();
        await redis.del(`auto_parts_ecommerce:session:${payload.sessionId}`);
      } catch (error) {
        // Silent fail - session might not exist or token invalid
        warnLog("Redis session cleanup optional:", error);
      }
    }

    // 3. ✅ Delete unverified user
    await prisma.user.delete({
      where: { id: userId },
    });

    // 4. ✅ Create response and clear only essential cookies
    const response = NextResponse.json({
      message: "Registration cancelled successfully",
    });

    // Clear only the essential auth cookies
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");

    return response;
  } catch (error: any) {
    console.error("Cancel registration error:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to cancel registration" },
      { status: 500 }
    );
  }
}
