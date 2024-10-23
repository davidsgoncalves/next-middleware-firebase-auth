import { NextRequest, NextResponse } from "next/server";

// Rotas que não precisam de autenticação, rota root também está incluída implicitamente
const AUTH_FREE_ROUTES = ["/api"];
// Rotas que não são acessadas se o usuário estiver autenticado
const AUTH_REDIRECT_ROUTES = ["/login"];
// arquivos públicos ex: /favicon.ico, /robots.txt, /manifest.json
const PUBLIC_FILE = /\.(.*)$/;
// Rota que o login redirecionará
const POST_AUTH_ROUTE = "/workspaces"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthFreeRoute = AUTH_FREE_ROUTES.some((route) => pathname.startsWith(route)) || PUBLIC_FILE.test(pathname);
  const isAuthRedirectRoutes = AUTH_REDIRECT_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthFreeRoute) {
    return NextResponse.next();
  } else if (isAuthRedirectRoutes) {
    const token = request.cookies.get("token")?.value;

    if (token) {
      return NextResponse.redirect(new URL(POST_AUTH_ROUTE, request.url));
    }
  } else {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
