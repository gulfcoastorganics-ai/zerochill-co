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
  const hasPayhipWebhookSecret = hasEnv(process.env.PAYHIP_WEBHOOK_SECRET);
  const allowUnverifiedPayhipWebhooks = (process.env.ALLOW_UNVERIFIED_PAYHIP_WEBHOOKS ?? "")
    .trim()
    .toLowerCase() === "true";

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

  if (!hasPayhipWebhookSecret) {
    warnings.push("Missing PAYHIP_WEBHOOK_SECRET.");
  }

  if (allowUnverifiedPayhipWebhooks) {
    warnings.push("ALLOW_UNVERIFIED_PAYHIP_WEBHOOKS enabled.");
  }

  if (hasSupabaseUrl && hasServiceRole) {
    try {
      const supabase = getSupabaseAdminClient();

      const { error: reachabilityError } = await supabase.from("academy_profiles").select("*").limit(1);
      supabaseReachable = !reachabilityError;

      for (const tableName of academyTableNames) {
        const { error } = await supabase.from(tableName).select("*").limit(1);
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

  const authConfigured = hasSupabaseUrl && hasSupabaseAnonKey && hasSiteUrl;
  const webhookConfigured = hasPayhipWebhookSecret && !allowUnverifiedPayhipWebhooks;
  const supabaseConfigured = hasSupabaseUrl && hasSupabaseAnonKey && hasServiceRole;
  const runtimeValidationReady = hasSupabaseUrl && hasSupabaseAnonKey && hasServiceRole;
  const academyOperational = authConfigured && webhookConfigured && supabaseConfigured && supabaseReachable;
  const webhookProcessingState = webhookConfigured
    ? "READY"
    : allowUnverifiedPayhipWebhooks
      ? "DEGRADED"
      : "OFFLINE";

  if (!authConfigured) {
    warnings.push("Auth redirect or Supabase browser config is incomplete.");
  }

  if (!webhookConfigured) {
    warnings.push("Configure Payhip signature verification before public launch.");
  }

  if (!supabaseConfigured) {
    warnings.push("Supabase server configuration is incomplete.");
  }

  if (!runtimeValidationReady) {
    warnings.push("Runtime validation is not fully ready.");
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
    readiness: {
      authConfigured,
      webhookConfigured,
      supabaseConfigured,
      runtimeValidationReady,
      academyOperational,
    },
    webhookProcessingState,
    recommendedActions: [
      !hasSiteUrl ? "Missing NEXT_PUBLIC_SITE_URL" : null,
      !hasPayhipWebhookSecret ? "Configure Payhip signature verification" : null,
      allowUnverifiedPayhipWebhooks ? "ALLOW_UNVERIFIED_PAYHIP_WEBHOOKS enabled" : null,
      !supabaseReachable ? "Verify Supabase connectivity" : null,
    ].filter((item): item is string => Boolean(item)),
    warnings,
  });
}
