import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 🎯 Route Matchers
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/shop(.*)",
  "/product/(.*)",
  "/brand",
  "/gallery",
  "/contact",
  "/api/(.*)",
  "/hero-video.mp4",
  "/bg-video.mp4",
  "/video-collection.mp4"
]);

export function proxy(req: NextRequest, evt: any) {
  return clerkMiddleware(async (auth, request) => {
    const { userId, sessionClaims } = await auth();
    const role = sessionClaims?.metadata?.role;

    // 1. Handle Admin Route Protection
    if (isAdminRoute(request)) {
      // If not logged in, Clerk handles redirect to sign-in
      await auth.protect();
      
      // If logged in but NOT a super_user, redirect to client dashboard
      if (role !== "super_user") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    // 2. Handle Normal Dashboard Protection
    if (isDashboardRoute(request)) {
      await auth.protect();
      
      // If a super_user lands here, send them to the admin panel instead
      if (role === "super_user") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }

    // 3. Protect all other non-public routes
    if (!isPublicRoute(request)) {
      await auth.protect();
    }

    // 4. Finalize Response and Security Headers
    const response = NextResponse.next();
    
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "camera=(self), microphone=(self), geolocation=(self)");

    return response;
  })(req, evt);
}

export const config = {
  matcher: [
    // Skip Next.js internals & static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
