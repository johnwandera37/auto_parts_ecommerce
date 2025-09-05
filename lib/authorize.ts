// lib/authorize.ts
import { stringConstants } from "@/config/constants";
import { verifyRequestAuth } from "@/lib/auth-core";
import { getUserById } from "@/utils/getUserById";
import { NextResponse } from "next/server";

export function authorize(roles: string[] = []) {
  return async function middleware(req: Request) {
    const result = await verifyRequestAuth(req, roles);

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error === "Forbidden" ? 403 : 401 }
      );
    }

    // ✅ Add null check for TypeScript safety
    if (!result.user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // 🚨 Block default admin
    if (result.user.email === stringConstants.defaultEmail) {
      return NextResponse.json(
        {
          error: "Default admin must update profile before using this feature",
        },
        { status: 403 }
      );
    }

    return { authorized: true, user: result.user };
  };
}
