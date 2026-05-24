import { NextResponse, type NextRequest } from "next/server";
import {
  ACADEMY_ACCESS_TOKEN_COOKIE,
  clearAuthCookies,
  getUserFromAccessToken,
} from "@/lib/academyAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/academy")) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACADEMY_ACCESS_TOKEN_COOKIE)?.value ?? null;

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const user = await getUserFromAccessToken(accessToken);

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return clearAuthCookies(NextResponse.redirect(loginUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/academy", "/academy/:path*"],
};
