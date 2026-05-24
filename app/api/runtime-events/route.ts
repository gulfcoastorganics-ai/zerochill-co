import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getAccessTokenFromRequest, getUserFromAccessToken } from "@/lib/academyAuth";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const runtimeEventSchema = z.object({
  eventType: z.string().min(1).max(120),
  eventStatus: z.string().min(1).max(60),
  email: z.string().email().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_json",
        message: "Invalid telemetry payload.",
      },
      { status: 400 },
    );
  }

  const parsed = runtimeEventSchema.safeParse(body);

  if (!parsed.success) {
    return jsonResponse(
      {
        ok: false,
        error: "validation_failed",
        message: "Invalid telemetry event.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const accessToken = getAccessTokenFromRequest(request);
  const sessionUser = accessToken ? await getUserFromAccessToken(accessToken) : null;

  if (!sessionUser) {
    return jsonResponse(
      {
        ok: false,
        error: "unauthorized",
        message: "Telemetry requires an authenticated operator session.",
      },
      { status: 401 },
    );
  }

  const supabase = getSupabaseAdminClient();
  const eventEmail = sessionUser.email?.trim().toLowerCase() ?? parsed.data.email?.trim().toLowerCase() ?? null;
  const { error } = await supabase.from("runtime_events").insert({
    email: eventEmail,
    event_type: parsed.data.eventType,
    event_status: parsed.data.eventStatus,
    metadata: {
      ...(parsed.data.metadata ?? {}),
      sessionEmail: sessionUser.email ?? null,
    },
  });

  if (error) {
    console.error("[ZeroChill] runtime-events-insert-failed", error);
    return jsonResponse(
      {
        ok: false,
        error: "insert_failed",
        message: "Unable to record runtime telemetry.",
      },
      { status: 500 },
    );
  }

  return jsonResponse({
    ok: true,
    status: "RECORDED",
  });
}
