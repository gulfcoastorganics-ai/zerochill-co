import { NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/academyAuth";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

export const runtime = "nodejs";

function redirectWithError(request: Request, message: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return redirectWithError(request, "missing_code");
  }

  try {
    const supabase = getSupabaseBrowserClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session) {
      console.error("[ZeroChill] auth-callback-exchange-failed", error);
      return redirectWithError(request, "exchange_failed");
    }

    const response = NextResponse.redirect(new URL("/academy", request.url));
    setAuthCookies(response, data.session);
    return response;
  } catch (error) {
    console.error("[ZeroChill] auth-callback-error", error);
    return redirectWithError(request, "callback_failed");
  }
}
