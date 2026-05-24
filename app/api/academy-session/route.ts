import { NextResponse, type NextRequest } from "next/server";
import { getAccessTokenFromRequest, getUserFromAccessToken } from "@/lib/academyAuth";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

export async function GET(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);

  if (!accessToken) {
    return jsonResponse({
      ok: true,
      sessionActive: false,
      email: null,
      tier: 0,
      academyAccess: false,
    });
  }

  const user = await getUserFromAccessToken(accessToken);

  if (!user?.email) {
    return jsonResponse({
      ok: true,
      sessionActive: false,
      email: null,
      tier: 0,
      academyAccess: false,
    });
  }

  const supabase = getSupabaseAdminClient();
  const { data: profile } = await supabase
    .from("academy_profiles")
    .select("email, tier, academy_access")
    .eq("email", user.email.trim().toLowerCase())
    .maybeSingle();

  return jsonResponse({
    ok: true,
    sessionActive: true,
    email: profile?.email ?? user.email.trim().toLowerCase(),
    tier: profile?.tier ?? 1,
    academyAccess: profile?.academy_access ?? false,
  });
}
