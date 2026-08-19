import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

type PayhipWebhookPayload = Record<string, unknown>;

type NormalizedPayhipPurchase = {
  email: string;
  orderId: string;
  eventId: string;
  eventType: string;
  productName: string;
  productKey: string;
  amount: number;
  currency: string;
  payload: PayhipWebhookPayload;
};

type PayhipSignatureResult = {
  verified: boolean;
  reason: string;
};

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit) {
  return NextResponse.json(body, init);
}

function asObject(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function firstObject(value: unknown): Record<string, unknown> {
  return Array.isArray(value) && value.length > 0 ? asObject(value[0]) : {};
}

function toText(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return "";
}

function toAmount(value: unknown): number {
  const raw = typeof value === "number" ? value : Number.parseFloat(toText(value));
  return Number.isFinite(raw) ? raw : 0;
}

function pickFirstText(source: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = source[key];
    const text = toText(value);

    if (text) {
      return text;
    }
  }

  return "";
}

function pickFirstHeader(headers: Headers, keys: readonly string[]) {
  for (const key of keys) {
    const value = headers.get(key)?.trim();

    if (value) {
      return value;
    }
  }

  return "";
}

function isTruthyEnv(name: string) {
  return ["1", "true", "yes", "on"].includes((process.env[name] ?? "").trim().toLowerCase());
}

function secureTextEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function verifyPayhipSignature(_req: Request, rawBody: string): PayhipSignatureResult {
  const apiKey = (process.env.PAYHIP_API_KEY ?? process.env.PAYHIP_WEBHOOK_SECRET ?? "").trim();

  if (!apiKey) {
    return {
      verified: false,
      reason: "PAYHIP_API_KEY_NOT_CONFIGURED",
    };
  }

  let payload: Record<string, unknown>;

  try {
    payload = asObject(JSON.parse(rawBody));
  } catch {
    return {
      verified: false,
      reason: "PAYHIP_SIGNATURE_PAYLOAD_INVALID",
    };
  }

  const providedSignature = toText(payload.signature).toLowerCase();

  if (!providedSignature) {
    return {
      verified: false,
      reason: "PAYHIP_SIGNATURE_MISSING",
    };
  }

  const expectedSignature = createHash("sha256").update(apiKey).digest("hex").toLowerCase();

  return secureTextEqual(providedSignature, expectedSignature)
    ? { verified: true, reason: "PAYHIP_SIGNATURE_VERIFIED" }
    : { verified: false, reason: "PAYHIP_SIGNATURE_MISMATCH" };
}

function configuredAcademyProductKeys() {
  return new Set(
    (process.env.PAYHIP_ACADEMY_PRODUCT_KEYS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );
}

function buildWebhookMetadata(payload: unknown, headers: Headers) {
  const source = asObject(payload);
  const order = asObject(source.order);
  const payment = asObject(source.payment);
  const customer = asObject(source.customer);

  const email = pickFirstText(
    { ...source, ...customer, ...order, ...payment },
    ["customer_email", "buyer_email", "email", "customerEmail", "buyerEmail"],
  ).toLowerCase();

  const orderId = pickFirstText(
    { ...source, ...order, ...payment },
    ["order_id", "orderId", "id", "purchase_id", "invoice_id", "transaction_id"],
  );

  const eventType =
    pickFirstHeader(headers, ["x-payhip-event", "x-webhook-event", "x-event-type"]) ||
    pickFirstText({ ...source, ...order }, ["type", "event_type", "eventType", "action"]) ||
    "payhip.purchase";

  const eventId =
    pickFirstHeader(headers, ["x-payhip-event-id", "x-event-id", "x-webhook-event-id", "x-delivery-id"]) ||
    pickFirstText(
      { ...source, ...order, ...payment },
      ["event_id", "eventId", "id", "webhook_id", "delivery_id"],
    ) ||
    orderId ||
    `payhip-${randomUUID()}`;

  return {
    email: email || null,
    orderId: orderId || `payhip-${randomUUID()}`,
    eventId,
    eventType,
    payload: source,
  };
}

function normalizePayhipPayload(payload: unknown, headers: Headers): NormalizedPayhipPurchase | null {
  const source = asObject(payload);
  const order = asObject(source.order);
  const product = asObject(source.product);
  const payment = asObject(source.payment);
  const item = firstObject(source.items);
  const metadata = buildWebhookMetadata(payload, headers);

  if (!metadata.email) {
    return null;
  }

  const productName =
    pickFirstText(
      { ...source, ...product, ...item, ...order },
      ["product_name", "productName", "item_name", "itemName", "name", "title"],
    ) || "Unknown Payhip product";

  const productKey = pickFirstText(
    { ...source, ...product, ...item, ...order },
    ["product_key", "productKey", "product_id", "productId"],
  );

  const amount = toAmount(
    pickFirstText(
      { ...source, ...payment, ...order },
      ["amount", "price", "total", "total_amount", "gross_amount"],
    ) || source.amount,
  );

  const currency =
    pickFirstText({ ...source, ...payment, ...order }, ["currency", "currency_code"]).toLowerCase() || "usd";

  return {
    email: metadata.email,
    orderId: metadata.orderId,
    eventId: metadata.eventId,
    eventType: metadata.eventType,
    productName,
    productKey,
    amount,
    currency,
    payload: source,
  };
}

function buildAccessKey(email: string, orderId: string) {
  return createHash("sha256")
    .update(`${email}:${orderId}:${randomUUID()}`)
    .digest("hex")
    .slice(0, 24)
    .toUpperCase();
}

function isUniqueViolation(error: { code?: string; message?: string }) {
  return error.code === "23505" || error.message?.toLowerCase().includes("unique constraint");
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  let parsedBody: unknown = null;
  let parseFailed = false;

  try {
    parsedBody = rawBody ? JSON.parse(rawBody) : null;
  } catch {
    parseFailed = true;
    parsedBody = { rawBody: rawBody.slice(0, 2_000), parseError: true };
  }

  const webhookPayload = parsedBody ?? { rawBody: rawBody.slice(0, 2_000), parseError: true };
  const webhookMetadata = buildWebhookMetadata(webhookPayload, request.headers);
  const supabase = getSupabaseAdminClient();
  const signature = verifyPayhipSignature(request, rawBody);
  const allowUnverified = isTruthyEnv("ALLOW_UNVERIFIED_PAYHIP_WEBHOOKS");
  const verified = signature.verified;

  const { error: webhookInsertError } = await supabase
    .from("webhook_events")
    .insert({
      provider: "payhip",
      event_type: webhookMetadata.eventType,
      event_id: webhookMetadata.eventId,
      order_id: webhookMetadata.orderId,
      email: webhookMetadata.email,
      payload: webhookPayload,
      verified,
      processed: false,
    });

  if (webhookInsertError) {
    if (isUniqueViolation(webhookInsertError)) {
      return jsonResponse({
        ok: true,
        duplicate: true,
      });
    }

    console.error("[ZeroChill] payhip-webhook-event-log-failed", webhookInsertError);
    return jsonResponse(
      {
        ok: false,
        error: "event_logging_failed",
        message: "Unable to log webhook event.",
      },
      { status: 500 },
    );
  }

  if (parseFailed || parsedBody === null || !rawBody.trim()) {
    return jsonResponse(
      {
        ok: false,
        error: "invalid_json",
        message: "Invalid webhook payload.",
      },
      { status: 400 },
    );
  }

  if (!verified && !allowUnverified) {
    return jsonResponse(
      {
        ok: false,
        error: "signature_not_verified",
        message: "Payhip webhook signature verification failed.",
        reason: signature.reason,
      },
      { status: 401 },
    );
  }

  const eventType = webhookMetadata.eventType.trim().toLowerCase();

  if (eventType !== "paid") {
    const { error: ignoredEventUpdateError } = await supabase
      .from("webhook_events")
      .update({ processed: true, verified })
      .eq("provider", "payhip")
      .eq("event_id", webhookMetadata.eventId)
      .eq("order_id", webhookMetadata.orderId);

    if (ignoredEventUpdateError) {
      console.error("[ZeroChill] payhip-webhook-ignore-log-failed", ignoredEventUpdateError);
      return jsonResponse(
        {
          ok: false,
          error: "event_update_failed",
          message: "Unable to finalize ignored webhook event.",
        },
        { status: 500 },
      );
    }

    return jsonResponse({
      ok: true,
      ignored: true,
      eventType,
    });
  }

  const normalized = normalizePayhipPayload(parsedBody, request.headers);

  if (!normalized) {
    return jsonResponse(
      {
        ok: false,
        error: "missing_email",
        message: "Payhip webhook is missing a customer email.",
      },
      { status: 400 },
    );
  }

  const academyProductKeys = configuredAcademyProductKeys();

  if (academyProductKeys.size === 0) {
    return jsonResponse(
      {
        ok: false,
        error: "academy_product_allowlist_not_configured",
        message: "Payhip Academy product allowlist is not configured.",
      },
      { status: 503 },
    );
  }

  if (!normalized.productKey || !academyProductKeys.has(normalized.productKey)) {
    return jsonResponse(
      {
        ok: false,
        error: "product_not_authorized",
        message: "This Payhip product is not authorized to provision Academy access.",
      },
      { status: 403 },
    );
  }

  const accessKey = buildAccessKey(normalized.email, normalized.orderId);

  try {
    const { data: profile, error: profileError } = await supabase
      .from("academy_profiles")
      .select("id, tier, access_key")
      .eq("email", normalized.email)
      .maybeSingle();

    if (profileError) {
      throw profileError;
    }

    const nextTier = Math.max(profile?.tier ?? 1, 1);

    const { data: upsertedProfile, error: upsertProfileError } = await supabase
      .from("academy_profiles")
      .upsert(
        {
          email: normalized.email,
          tier: nextTier,
          academy_access: true,
          access_key: accessKey,
        },
        { onConflict: "email" },
      )
      .select("id, email, tier, academy_access, access_key")
      .single();

    if (upsertProfileError || !upsertedProfile) {
      throw upsertProfileError ?? new Error("Unable to provision academy profile.");
    }

    const { error: purchaseError } = await supabase.from("purchases").upsert(
      {
        academy_profile_id: upsertedProfile.id,
        payhip_order_id: normalized.orderId,
        customer_email: normalized.email,
        product_name: normalized.productName,
        amount: normalized.amount,
        currency: normalized.currency,
        payload: normalized.payload,
      },
      { onConflict: "payhip_order_id" },
    );

    if (purchaseError) {
      throw purchaseError;
    }

    const { data: existingProgress, error: progressLookupError } = await supabase
      .from("tier_progress")
      .select("profile_id")
      .eq("profile_id", upsertedProfile.id)
      .maybeSingle();

    if (progressLookupError) {
      throw progressLookupError;
    }

    if (!existingProgress) {
      const { error: progressInsertError } = await supabase.from("tier_progress").insert({
        profile_id: upsertedProfile.id,
        tier_1_complete: false,
        tier_2_complete: false,
        tier_3_complete: false,
      });

      if (progressInsertError) {
        throw progressInsertError;
      }
    }

    const { error: webhookUpdateError } = await supabase
      .from("webhook_events")
      .update({
        processed: true,
        verified,
      })
      .eq("provider", "payhip")
      .eq("event_id", normalized.eventId)
      .eq("order_id", normalized.orderId);

    if (webhookUpdateError) {
      throw webhookUpdateError;
    }

    return jsonResponse({
      ok: true,
      status: "PROVISIONED",
      email: normalized.email,
      orderId: normalized.orderId,
      eventId: normalized.eventId,
      accessKey,
      tier: upsertedProfile.tier,
    });
  } catch (error) {
    console.error("[ZeroChill] payhip-webhook-error", error);

    return jsonResponse(
      {
        ok: false,
        error: "provisioning_failed",
        message: "Unable to provision academy access.",
      },
      { status: 500 },
    );
  }
}
