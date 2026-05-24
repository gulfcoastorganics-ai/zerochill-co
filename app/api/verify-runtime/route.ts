import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const verificationSchema = z.object({
  email: z.string().email().transform((value) => value.trim().toLowerCase()),
  modelName: z.string().min(1).max(180),
  deviceType: z.string().min(1).max(120),
  inferenceLatencyMs: z.number().int().nonnegative().max(60_000),
  browserUserAgent: z.string().min(1).max(1000),
  webgpuSupported: z.boolean(),
  validationResponse: z.string().min(1).max(10_000),
});

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

function buildVerificationHash(
  email: string,
  modelName: string,
  inferenceLatencyMs: number,
  validationResponse: string,
  timestamp: string,
) {
  return createHash("sha256")
    .update([email, modelName, inferenceLatencyMs, validationResponse, timestamp].join("|"))
    .digest("hex");
}

function truncateValidationResponse(value: string) {
  return value.slice(0, 500);
}

async function logRuntimeEvent(
  supabase: ReturnType<typeof getSupabaseAdminClient>,
  email: string | null,
  eventType: string,
  eventStatus: string,
  metadata: Record<string, unknown>,
) {
  const { error } = await supabase.from("runtime_events").insert({
    email,
    event_type: eventType,
    event_status: eventStatus,
    metadata,
  });

  if (error) {
    console.error("[ZeroChill] runtime-event-log-failed", error);
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_json",
        message: "Invalid runtime verification payload.",
      },
      { status: 400 },
    );
  }

  const parsed = verificationSchema.safeParse(body);

  if (!parsed.success) {
    return jsonResponse(
      {
        ok: false,
        error: "validation_failed",
        message: "Enter a valid email and runtime details.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdminClient();
  const {
    email,
    modelName,
    deviceType,
    inferenceLatencyMs,
    browserUserAgent,
    webgpuSupported,
    validationResponse,
  } = parsed.data;
  const verificationTimestamp = new Date().toISOString();
  const validationResponseSafe = truncateValidationResponse(validationResponse.trim());
  const verificationHash = buildVerificationHash(
    email,
    modelName,
    inferenceLatencyMs,
    validationResponseSafe,
    verificationTimestamp,
  );

  if (!validationResponseSafe.includes("ZERO_STATE_OK")) {
    await logRuntimeEvent(supabase, email, "runtime_validation_failure", "failure", {
      reason: "VALIDATION_RESPONSE_INVALID",
      modelName,
      inferenceLatencyMs,
      runtimeEndpoint: "http://localhost:11434",
      validationResponse: validationResponseSafe,
    });

    return jsonResponse(
      {
        ok: false,
        error: "validation_failed",
        message: "Runtime verification response did not confirm ZERO_STATE_OK.",
      },
      { status: 400 },
    );
  }

  const operatorProfile = {
    email,
    modelName,
    deviceType,
    inferenceLatencyMs,
    browserUserAgent,
    webgpuSupported,
    runtimeEndpoint: "http://localhost:11434",
    validationMethod: "OLLAMA_GENERATE_ZERO_STATE_OK",
    validatedAt: verificationTimestamp,
  } as const;

  try {
    const { data: tierOneGate, error: gateError } = await supabase
      .from("academy_gates")
      .select("id, tier, gate_name, reward_unlock, validation_type")
      .eq("validation_type", "OLLAMA_GENERATE_ZERO_STATE_OK")
      .maybeSingle();

    if (gateError) {
      throw gateError;
    }

    if (!tierOneGate) {
      await logRuntimeEvent(supabase, email, "runtime_validation_failure", "failure", {
        reason: "GATE_MISSING",
        validationType: "OLLAMA_GENERATE_ZERO_STATE_OK",
      });

      return jsonResponse(
        {
          ok: false,
          error: "gate_missing",
          message: "Tier 1 gate definition is missing.",
        },
        { status: 500 },
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("academy_profiles")
      .select("id, tier")
      .eq("email", email)
      .maybeSingle();

    if (profileError) {
      throw profileError;
    }

    if (!profile) {
      await logRuntimeEvent(supabase, email, "runtime_validation_failure", "failure", {
        reason: "PROFILE_NOT_FOUND",
        modelName,
      });

      return jsonResponse(
        {
          ok: false,
          error: "profile_not_found",
          message: "No academy profile exists for that email.",
        },
        { status: 404 },
      );
    }

    const { error: deploymentError } = await supabase.from("deployments").insert({
      academy_profile_id: profile.id,
      email,
      model_name: modelName,
      device_type: deviceType,
      runtime_endpoint: "http://localhost:11434",
      validation_prompt: "Return only the string ZERO_STATE_OK",
      validation_response: validationResponseSafe,
      verified_at: verificationTimestamp,
      inference_latency_ms: inferenceLatencyMs,
      browser_user_agent: browserUserAgent,
      webgpu_supported: webgpuSupported,
      verification_hash: verificationHash,
      operator_profile: operatorProfile,
      proof_payload: {
        email,
        modelName,
        deviceType,
        inferenceLatencyMs,
        browserUserAgent,
        webgpuSupported,
        validationResponse: validationResponseSafe,
        operatorProfile,
        verificationTimestamp,
        source: "ollama-local",
      },
    });

    if (deploymentError) {
      throw deploymentError;
    }

    const { error: gateCompletionError } = await supabase.from("gate_completions").insert({
      email,
      gate_id: tierOneGate.id,
      tier: tierOneGate.tier,
      validation_type: tierOneGate.validation_type,
      proof_hash: verificationHash,
      metadata: {
        operator_profile: operatorProfile,
        verificationHash,
      },
    });

    if (gateCompletionError) {
      throw gateCompletionError;
    }

    const { error: progressUpsertError } = await supabase.from("tier_progress").upsert(
      {
        profile_id: profile.id,
        tier_1_complete: true,
        tier_2_complete: false,
        tier_3_complete: false,
      },
      { onConflict: "profile_id" },
    );

    if (progressUpsertError) {
      throw progressUpsertError;
    }

    const nextTier = Math.max(profile.tier ?? 1, 2);

    const { error: profileUpdateError } = await supabase
      .from("academy_profiles")
      .update({
        tier: nextTier,
        academy_access: true,
      })
      .eq("id", profile.id);

    if (profileUpdateError) {
      throw profileUpdateError;
    }

    await logRuntimeEvent(supabase, email, "runtime_validation_success", "success", {
      modelName,
      deviceType,
      inferenceLatencyMs,
      webgpuSupported,
      validationMethod: operatorProfile.validationMethod,
      verificationHash,
      runtimeEndpoint: operatorProfile.runtimeEndpoint,
    });

    await logRuntimeEvent(supabase, email, "orchestration_unlock", "unlocked", {
      tier: nextTier,
      gateName: tierOneGate.gate_name,
      rewardUnlock: tierOneGate.reward_unlock,
      verificationHash,
    });

    return jsonResponse({
      ok: true,
      status: "TIER_1_VALIDATED",
      email,
      modelName,
      deviceType,
      verificationHash,
      unlockedTier: nextTier,
      gateName: tierOneGate.gate_name,
      rewardUnlock: tierOneGate.reward_unlock,
      validationPrompt: "Return only the string ZERO_STATE_OK",
      validationResponse: validationResponseSafe,
      verifiedAt: verificationTimestamp,
      operatorProfile,
    });
  } catch (error) {
    console.error("[ZeroChill] verify-runtime-error", error);

    await logRuntimeEvent(supabase, email, "runtime_validation_failure", "failure", {
      reason: "UNKNOWN_RUNTIME_FAILURE",
      message: error instanceof Error ? error.message : "Runtime verification failed.",
      modelName,
      deviceType,
      inferenceLatencyMs,
      webgpuSupported,
      verificationHash,
    });

    return jsonResponse(
      {
        ok: false,
        error: "verification_failed",
        message: "Runtime verification failed.",
      },
      { status: 500 },
    );
  }
}
