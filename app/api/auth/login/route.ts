import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { comparePasswords } from "@/lib/hash";
import { signToken, signRefreshToken } from "@/lib/jwt";
import { serialize } from "cookie"; //serialize data into a cookie header
import { getRedisClient } from "@/lib/redis";
import { randomUUID } from "crypto"; //for multiple sessions
import { errLog } from "@/utils/logger";
import { getErrorMessage } from "@/utils/errMsg";
import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  stringConstants,
} from "@/config/constants";
import { loginSchema } from "@/lib/zodSchema";
import { badRequestFromZod } from "@/utils/responseUtils";
import { handleRedisError } from "@/lib/redisErrorMapperHandler";
import { log } from "console";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parse = loginSchema.safeParse(body);
    if (!parse.success) {
      return badRequestFromZod(parse.error);
    }

    const { email, password } = parse.data;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        adminProfile: {
          select: {
            hasUpdatedCredentials: true,
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    log("Email verified flag in login route", user.emailVerified);

    //Create access token
    const accessToken = signToken({
      id: user.id,
      role: user.role,
      email: user.email, // include email to reduce db calls
      isDefaultAdmin: user.email === stringConstants.defaultEmail, // For easy clearing default user session
      emailVerified: user.emailVerified, //Used in middleware for redirection and route protection
      // Include admin profile info if user is admin
      ...(user.role === "ADMIN" &&
        user.adminProfile && {
          hasUpdatedCredentials: user.adminProfile.hasUpdatedCredentials,
        }), // add flag for middlware handling on onboarding redirection
    });

    const sessionId = randomUUID(); // or nanoid()
    //Create refresh token, n/b some fields  are unnecessary in the refresh 
    // token hence excluded, role can change when super admin upgrades user to admin, hence in refresh token use role from db
    const refreshToken = signRefreshToken({
      id: user.id,
      role: user.role,
      email: user.email, // Can be stale in the session tokens if updated but handled this when creating session, ensure updated one is used
      sessionId, // 👈 included in JWT payload for multiple session
    });

    // Set refresh token and user id in redis, ensure this is checked later, how keys are stored for cart, orders etc, whether to use differnt db
    try {
      const redis = await getRedisClient();
      await redis.set(
        `auto_parts_ecommerce:session:${sessionId}`,
        refreshToken,
        {
          EX: REFRESH_TOKEN_MAX_AGE,
        }
      ); // 7 days
    } catch (redisError) {
      return handleRedisError(redisError, "login handler", {
        status: 503,
        message: "Unable to create session. Please try again later.",
      });
    }

    //Set cookies
    const accessCookie = serialize("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ACCESS_TOKEN_MAX_AGE, // 15 minutes
      sameSite: "lax",
    });

    const refreshCookie = serialize("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: REFRESH_TOKEN_MAX_AGE, // 7 days
      sameSite: "lax",
    });

    const isDefaultAdmin = user.email === "admin@example.com";
    const emailNotVerified = user.emailVerified === false;
    const res = new NextResponse(
      JSON.stringify({
        message: "Login successful",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          emailVerified: user.emailVerified,
        },
        requiresProfileUpdate: isDefaultAdmin, // default needs update
        requiresEmailVerification: emailNotVerified, // email not verified
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.headers.append("Set-Cookie", accessCookie);
    res.headers.append("Set-Cookie", refreshCookie);

    return res;
  } catch (error) {
    const message = getErrorMessage(error);
    errLog("Login Error: ", message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
