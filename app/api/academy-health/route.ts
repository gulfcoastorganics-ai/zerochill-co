import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const academyTableNames = [
  "academy_profiles",
  "purchases",
  "deployments",
  "tier_progress",
  "academy_gates",
  "gate_completions",
  "webhook_events",
  "runtime_events",
] as const;

type AcademyTableName = (typeof academyTableNames)[number];

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

function hasEnv(value: string | undefined) {
  return Boolean(value && value.trim());
}

export async function GET() {
  const hasSupabaseUrl = hasEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasSupabaseAnonKey = hasEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const hasServiceRole = hasEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const hasSiteUrl = hasEnv(process.env.NEXT_PUBLIC_SITE_URL);

  const warnings: string[] = [];
  const academyTables: Record<AcademyTableName, boolean> = {
    academy_profiles: false,
    purchases: false,
    deployments: false,
    tier_progress: false,
    academy_gates: false,
    gate_completions: false,
    webhook_events: false,
    runtime_events: false,
  };

  let supabaseReachable = false;

  if (!hasSupabaseUrl) {
    warnings.push("Missing NEXT_PUBLIC_SUPABASE_URL.");
  }

  if (!hasSupabaseAnonKey) {
    warnings.push("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  if (!hasServiceRole) {
    warnings.push("Missing SUPABASE_SERVICE_ROLE_KEY.");
  }

  if (!hasSiteUrl) {
    warnings.push("Missing NEXT_PUBLIC_SITE_URL.");
  }

  if (hasSupabaseUrl && hasServiceRole) {
    try {
      const supabase = getSupabaseAdminClient();

      const { error: reachabilityError } = await supabase.from("academy_profiles").select("id").limit(1);
      supabaseReachable = !reachabilityError;

      for (const tableName of academyTableNames) {
        const { error } = await supabase.from(tableName).select("id").limit(1);
        academyTables[tableName] = !error;

        if (error) {
          warnings.push(`Table check failed for ${tableName}.`);
        }
      }
    } catch (error) {
      warnings.push(error instanceof Error ? error.message : "Supabase health probe failed.");
    }
  } else {
    warnings.push("Supabase probe skipped because the required server variables are not configured.");
  }

  return jsonResponse({
    ok: true,
    timestamp: new Date().toISOString(),
    supabaseReachable,
    academyTables,
    env: {
      hasSupabaseUrl,
      hasSupabaseAnonKey,
      hasServiceRole,
      hasSiteUrl,
    },
    warnings,
  });
}
