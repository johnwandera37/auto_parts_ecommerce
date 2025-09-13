// middleware.ts
/**
 * 🔐 ROUTE PROTECTION & AUTHENTICATION MIDDLEWARE
 *
 * Handles authentication, authorization, and token management across:
 * - /admin/* (Admin routes)
 * - /account/* (User account routes)
 *
 * 🎯 KEY BEHAVIORS:
 *
 * 1. 🟢 PUBLIC ACCESS: /login, /register always accessible
 * 2. 🔴 AUTH REQUIRED: Protected routes require valid authentication
 * 3. 🔄 AUTO-REFRESH: Handles expired access tokens automatically
 * 4. 🛡️ ROLE CONTROL: Enforces ADMIN/USER route permissions
 * 5. ⚠️ ERROR GRACE: Handles service issues without unnecessary logouts
 *
 * 🔐 TOKEN SCENARIOS:
 * - ❌❌ No tokens → Redirect to login (not authenticated)
 * - ❌✅ Refresh token only → Attempt refresh (service recovery)
 * - ✅✅ Both tokens → Verify auth + check roles (fully authenticated)
 * - ✅✅ Public route with tokens → Redirect to dashboard
 *
 * ⚡ PERFERENCE: Prefers axios-detected errors to avoid duplicate refresh attempts
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyCookieAuth } from "@/lib/auth-core";
import { errLog, log } from "./utils/logger";

export async function middleware(req: NextRequest) {
  log("🚀 Middleware hit:", req.nextUrl.pathname);
  const accessToken = req.cookies.get("access_token");
  const refreshToken = req.cookies.get("refresh_token");
  const { pathname } = req.nextUrl;
  log("🚀 access_token available: ", !!accessToken?.value);
  log("refresh_token available: ", !!refreshToken);

  const isProtectedRoutes =
    pathname.startsWith("/admin") || pathname.startsWith("/account");
  const publicAccountRoutes = [
    "/account/login",
    "/account/register",
    "/account/forgot-password",
    "/account/reset-password",
  ];
  const isPublicRoutes = publicAccountRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // 1. ✅ PUBLIC ROUTES - Handle them first and exit early
  if (isPublicRoutes) {
    log("🔥 Public route detected:", pathname);

    // If user has tokens and tries to access public routes, redirect to appropriate dashboard
    if (accessToken || refreshToken) {
      try {
        // Verify the token to get user role
        const authResult = await verifyCookieAuth(req);
        if (authResult?.valid) {
          const dashboardPath =
            authResult.user?.role === "ADMIN" ? "/admin" : "/account/dashboard";
          log(
            "🚫 Redirecting logged-in user from public route to:",
            dashboardPath
          );
          return NextResponse.redirect(new URL(dashboardPath, req.url));
        }
      } catch (error) {
        // If token verification fails, let them access the public route
        log("Token verification failed, allowing access to public route");
        return NextResponse.next();
      }
    }

    // No tokens or invalid tokens - allow access to public routes
    log("Allowing access to public route");
    return NextResponse.next();
  }

  // 2. No tokens at all + protected route = not logged in
  if (!accessToken && !refreshToken && isProtectedRoutes) {
    // Special access for from onboarding to verification
    if (pathname === "/account/verification") {
      const searchParams = req.nextUrl.searchParams;
      const userId = searchParams.get("userId");
      const email = searchParams.get("email");

      if (userId && email) {
        log("✅ Allowing verification page access with URL parameters");
        return NextResponse.next(); // ✅ This allows access
      }
    }
    log("❌ No tokens, redirecting to login");
    return NextResponse.redirect(new URL("/account/login", req.url));
  }

  // --- ATTEMPT TOKEN REFRESH IF ACCESS TOKEN EXPIRED BUT REFRESH EXISTS AND NOT ON PUBLIC PAGE ROUTES ---
  if (!accessToken && refreshToken && !isPublicRoutes) {
    log("🚀 Starting refresh in middleware");
    // ✅ Check if axios already detected session expiry(Avoid race conditions with axios)
    const axiosRefreshFailed = req.cookies.get("axios_refresh_failed")?.value;
    const axiosErrorType = req.cookies.get("axios_refresh_error")?.value;

    if (
      axiosRefreshFailed &&
      ["UNAUTHORIZED", "FORBIDDEN", "NOT_FOUND"].includes(axiosErrorType!)
    ) {
      // Clear the axios cookies
      const response = NextResponse.redirect(
        new URL("/account/login?session=expired", req.url)
      );
      response.cookies.delete("axios_refresh_failed");
      response.cookies.delete("axios_refresh_error");
      return response;
    }

    // ✅ ONLY attempt refresh if axios hasn't already detected session expiry
    try {
      // Attempt to refresh tokens via API (Edge-compatible fetch)
      const refreshUrl = new URL("/api/auth/refresh", req.url);
      const refreshResponse = await fetch(refreshUrl, {
        method: "POST",
        headers: {
          Cookie: req.headers.get("Cookie") || "",
        },
      });

      log("🚀 Refresh response status:", refreshResponse.status);

      if (refreshResponse.ok) {
        // Refresh successful - get the new access token from Set-Cookie header
        log("🚀 Refresh successful");
        const setCookieHeader = refreshResponse.headers.get("Set-Cookie");
        if (setCookieHeader && setCookieHeader.includes("access_token")) {
          // Create a response that preserves the new cookies
          const response = NextResponse.next();
          response.headers.set("Set-Cookie", setCookieHeader);
          return response;
        }
      }

      // Handle non-200 responses
      const status = refreshResponse.status;
      let responseData;

      try {
        responseData = await refreshResponse.json();
      } catch {
        responseData = {};
      }

      // ✅ Session expired errors - redirect with parameter
      if (
        [401, 403, 404].includes(status) ||
        responseData.error?.includes("expired") ||
        responseData.error?.includes("invalid") ||
        responseData.error === "Session expired"
      ) {
        log("🚀 Session expired - redirecting to login");
        return NextResponse.redirect(
          new URL("/account/login?session=expired", req.url)
        );
      }

      // ✅ For all other errors, set a short-lived cookie that AuthContext can read
      const response = NextResponse.next();
      response.cookies.set("refresh_attempt_failed", "true", {
        maxAge: 5, // 5 seconds - just enough for client to detect
        path: "/",
      });

      if (status === 503) {
        log("🚀 Service unavailable - continuing to page with error cookies");
        response.cookies.set("refresh_error_type", "service-unavailable", {
          maxAge: 5,
          path: "/",
        });
      } else if (status >= 500) {
        log("🚀 Server error - continuing to page with error cookies");
        response.cookies.set("refresh_error_type", "server-error", {
          maxAge: 5,
          path: "/",
        });
      }

      return response;
    } catch (error) {
      errLog("Token refresh attempt failed: ", error);
      errLog("🚀 Network error during refresh:", error);

      // ✅ Network errors - set error cookie
      const response = NextResponse.next();
      response.cookies.set("refresh_attempt_failed", "true", {
        maxAge: 5,
        path: "/",
      });

      response.cookies.set("refresh_error_type", "network-error", {
        maxAge: 5,
        path: "/",
      });
      return response;
    }
  }

  // VERIFY AUTH FOR ALL PROTECTED ROUTES CURRENTLY (IT WILL ALSO RUN ON PUBLIC ROUTES /account/login or /account/register)
  let authResult = null;
  if (
    accessToken &&
    (pathname.startsWith("/admin") || pathname.startsWith("/account"))
  ) {
    authResult = await verifyCookieAuth(req);
    log("🚀 Verification valid:", authResult.valid);
    log("🚀 Verification results ADMIN/USER:", authResult);
  }

  // --- 1. FIRST: ONBOARDING CHECK FOR DEFAULT ADMIN ---
  if (authResult && authResult.valid && authResult.user) {
    const { user } = authResult;

    // 🚨 DEFAULT ADMIN MUST COMPLETE ONBOARDING BEFORE ANYTHING ELSE
    if (user.email === "admin@example.com" && !user.hasUpdatedCredentials) {
      if (pathname !== "/admin/onboarding") {
        log("🔐 Default admin needs onboarding - redirecting");
        return NextResponse.redirect(new URL("/admin/onboarding", req.url));
      }
      return NextResponse.next(); // Allow access to onboarding
    }
  }

  // --- 2. VERIFICATION PAGE ACCESS CONTROL ---
  if (pathname === "/account/verification") {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");

    // ✅ ALLOW ACCESS if userId and email are provided (post-registration & post-admin-update)
    if (userId && email) {
      return NextResponse.next();
    }

    // ✅ ALLOW ACCESS if user is authenticated but not verified (logged-in but unverified)
    if (
      authResult?.valid &&
      authResult.user &&
      !authResult.user.emailVerified
    ) {
      return NextResponse.next();
    }

    // ✅ REDIRECT if user is authenticated and already verified
    if (authResult?.valid && authResult.user?.emailVerified) {
      const dashboardPath =
        authResult.user.role === "ADMIN" ? "/admin" : "/account/dashboard";
      return NextResponse.redirect(new URL(dashboardPath, req.url));
    }

    // ❌ REDIRECT TO LOGIN for all other cases (no params, not authenticated)
    return NextResponse.redirect(new URL("/account/login", req.url));
  }

  // --- 3. EMAIL VERIFICATION REDIRECTION (for logged-in users) ---
  if (authResult && authResult.valid && authResult.user) {
    // Redirect to verification if email is not verified AND not already on verification page
    if (
      !authResult.user.emailVerified &&
      pathname !== "/account/verification"
    ) {
      log("🔐 Email not verified - redirecting to verification");
      return NextResponse.redirect(
        new URL(
          `/account/verification?email=${authResult.user.email}&userId=${authResult.user.id}`,
          req.url
        )
      );
    }
  }

  // --- SPECIAL ONBOARDING PAGE PROTECTION as fallback, manually navigation ---
  if (pathname === "/admin/onboarding") {
    if (!authResult?.valid) {
      if (authResult?.error === "Token expired") {
        return NextResponse.redirect(
          new URL("/account/login?session=expired", req.url)
        );
      }
      return NextResponse.redirect(new URL("/account/login", req.url));
    }

    const { user } = authResult;

    // 🚫 NON-DEFAULT ADMINS → redirect to admin dashboard
    if (user?.email !== "admin@example.com") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // 🚫 DEFAULT ADMINS who have already updated credentials → redirect to admin dashboard
    // ✅ No DB call - uses flag from JWT token!
    if (user.hasUpdatedCredentials) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // ✅ Only default admin users who haven't updated credentials can access onboarding
    return NextResponse.next();
  }

  // --- ADMIN ROUTES PROTECTION (excluding onboarding) ---
  if (pathname.startsWith("/admin") && pathname !== "/admin/onboarding") {
    log("🚀 Executing Admin protection");
    // 🚫 Not logged in → login
    if (!authResult?.valid) {
      // ✅ Check for specific token expiration errors
      if (authResult?.error === "Token expired") {
        return NextResponse.redirect(
          new URL("/account/login?session=expired", req.url)
        );
      }
      // Other auth errors
      return NextResponse.redirect(new URL("/account/login", req.url));
    }

    // ✅ Logged in
    const { user } = authResult;

    // 🚫 Users trying to access admin routes → redirect to their respective dashboards
    if (user?.role === "USER") {
      return NextResponse.redirect(new URL("/account/dashboard", req.url));
    }

    // 🚫 Non-admins trying to access admin routes → redirect home
    if (user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 🚨 Default admin must complete onboarding first
    if (
      user?.email === "admin@example.com" && // default admin
      !user.hasUpdatedCredentials // not already on onboarding
    ) {
      return NextResponse.redirect(new URL("/admin/onboarding", req.url));
    }
  }

  // --- USER ACCOUNT ROUTES PROTECTION ---
  if (pathname.startsWith("/account")) {
    log("🚀 Executing User protection");
    // Public routes are already handled at the top, so this must be a protected route
    // 🔒 Protect account routes (dashboard, orders, settings, etc
    if (!authResult?.valid) {
      log("Protecting account routes...");
      // ✅ Check for specific token expiration errors
      if (authResult?.error === "Token expired") {
        log("❌ No valid auth for protected account route");
        return NextResponse.redirect(
          new URL("/account/login?session=expired", req.url)
        );
      }
      // Other auth errors (invalid token, no token, etc.)
      return NextResponse.redirect(new URL("/account/login", req.url));
    }

    // 🚫 Admins trying to access user account routes → redirect to admin dashboard
    if (authResult.user?.role === "ADMIN") {
      log(
        "🔥 Redirecting to your admin dashboard: ",
        `User ${authResult.user?.email} with Role ${authResult.user?.role}`
      );
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // 🚫 Non-users trying to access user account routes → redirect home
    if (authResult.user?.role !== "USER") {
      log("🔥 Redirecting none users to home...");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ✅ Users can access user account routes
    log("✅ User authorized to access account route");
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Add other protected paths if needed
export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
