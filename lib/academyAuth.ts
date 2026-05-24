import { createClient, type Session, type SupabaseClient, type User } from "@supabase/supabase-js";
import type { NextRequest, NextResponse } from "next/server";

export const ACADEMY_ACCESS_TOKEN_COOKIE = "zerochill-academy-access-token";
export const ACADEMY_REFRESH_TOKEN_COOKIE = "zerochill-academy-refresh-token";

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

let anonSupabaseClient: SupabaseClient | null = null;

function getAnonSupabaseClient() {
  if (anonSupabaseClient) {
    return anonSupabaseClient;
  }

  anonSupabaseClient = createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  return anonSupabaseClient;
}

export function getSessionCookieOptions(expiresInSeconds: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.max(60, expiresInSeconds),
  };
}

export function setAuthCookies(response: NextResponse, session: Session) {
  const options = getSessionCookieOptions(session.expires_in);

  response.cookies.set(ACADEMY_ACCESS_TOKEN_COOKIE, session.access_token, options);
  response.cookies.set(ACADEMY_REFRESH_TOKEN_COOKIE, session.refresh_token, options);

  return response;
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACADEMY_ACCESS_TOKEN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(ACADEMY_REFRESH_TOKEN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export function getAccessTokenFromRequest(request: NextRequest) {
  return request.cookies.get(ACADEMY_ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export function getAccessTokenFromCookieStore(cookieStore: {
  get(name: string): { value: string } | undefined;
}) {
  return cookieStore.get(ACADEMY_ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export async function getUserFromAccessToken(accessToken: string): Promise<User | null> {
  if (!accessToken) {
    return null;
  }

  const supabase = getAnonSupabaseClient();
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data.user) {
    return null;
  }

  return data.user;
}
