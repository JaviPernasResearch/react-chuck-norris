import { NextResponse, NextRequest } from 'next/server'

const protectedRoutes = [
  "/dashboard",
  "/home",
  "/settings",
  "/onboarding",
  "/test",
  "/noaccess",
];
const authPages = ["/login", "/register"];


export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};