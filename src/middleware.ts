import { NextRequest, NextResponse } from "next/server";

const AUTH_FREE_ROUTES = ["/api"];
const AUTH_REDIRECT_ROUTES = ["/login"];
const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthFreeRoute = AUTH_FREE_ROUTES.some((route) => pathname.startsWith(route)) || PUBLIC_FILE.test(pathname);
  const isAuthRedirectRoutes = AUTH_REDIRECT_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthFreeRoute) {
    return NextResponse.next();
  } else if (isAuthRedirectRoutes) {
    const token = request.cookies.get("token")?.value;

    if (token) {
      return NextResponse.redirect(new URL("/workspaces", request.url));
    }
  } else {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
