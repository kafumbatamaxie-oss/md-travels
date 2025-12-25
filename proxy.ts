import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Public routes (no auth required)
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/services",
  "/fleet",
  "/quote",
  "/contact",
  "/gallery",
  "/api/(.*)",
  "/confirmation",
  "/search",
  "/search/(.*)",
  "/views.mp4",
  '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|mp4|webm)).*)'
  
])

export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Protect non-public routes
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  // Continue request
  const response = NextResponse.next()

  // 🔐 Security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  return response
})

export const config = {
  matcher: [
    // Skip Next.js internals & static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
