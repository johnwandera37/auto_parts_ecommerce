//Verify JWT to decoded user data from the access token, done separately from authorize middleware
import { errLog, log } from "@/utils/logger";
import { verifyAccessToken } from "./jwt";
import { getErrorMessage } from "@/utils/errMsg";
import { NextResponse } from "next/server";

export async function getUserFromToken(req: Request): Promise<{ id: string; role: string; email: string } | NextResponse> {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    errLog("No Authorization header or malformed");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token) as { id: string; role: string; email: string;};
    return decoded;
  } catch (err) {
    errLog("Invalid token:", getErrorMessage(err));
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
