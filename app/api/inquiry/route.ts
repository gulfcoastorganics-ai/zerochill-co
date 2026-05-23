import { NextResponse } from "next/server";
import {
  buildInquiryBody,
  buildInquirySubject,
  checkInquiryRateLimit,
  formatInquiryLog,
  getClientKey,
  getInquiryFieldErrors,
  inquirySubmissionSchema,
  resolveInquiryMailEnv,
  type InquiryLogSubmission,
} from "@/lib/inquiryIntake";

function jsonResponse(
  body: Record<string, unknown>,
  init?: ResponseInit,
) {
  return NextResponse.json(body, init);
}

function logIntakeEvent(event: string, details: Record<string, unknown>) {
  console.info(`[ZeroChill] ${event}`, details);
}

async function sendInquiryNotification(intakeId: string, submission: InquiryLogSubmission) {
  const { apiKey, to, from } = resolveInquiryMailEnv();

  if (!apiKey || !to || !from) {
    logIntakeEvent("intake-email-config-missing", {
      intakeId,
      deliveryMode: "log",
    });
    logIntakeEvent("intake-log-fallback", {
      intakeId,
      deliveryMode: "log",
    });
    return { deliveryMode: "log" as const, delivered: false, deliveryAttempted: false };
  }

  try {
    logIntakeEvent("intake-resend-attempted", {
      intakeId,
      deliveryMode: "email",
    });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submission.email,
        subject: buildInquirySubject(submission),
        text: buildInquiryBody(submission),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("[ZeroChill] intake-resend-failure", {
        intakeId,
        status: response.status,
        deliveryMode: "log",
        errorText: errorText ? "present" : "empty",
      });
      logIntakeEvent("intake-log-fallback", {
        intakeId,
        deliveryMode: "log",
      });
      return { deliveryMode: "log" as const, delivered: false, deliveryAttempted: true };
    }

    logIntakeEvent("intake-resend-success", {
      intakeId,
      deliveryMode: "email",
    });
    return { deliveryMode: "email" as const, delivered: true, deliveryAttempted: true };
  } catch (error) {
    console.error("[ZeroChill] intake-resend-failure", {
      intakeId,
      deliveryMode: "log",
      error: error instanceof Error ? error.name : "unknown",
    });
    logIntakeEvent("intake-log-fallback", {
      intakeId,
      deliveryMode: "log",
    });
    return { deliveryMode: "log" as const, delivered: false, deliveryAttempted: true };
  }
}

export async function POST(request: Request) {
  const intakeId = crypto.randomUUID();
  const clientKey = getClientKey(request);
  const rateLimit = checkInquiryRateLimit(clientKey);

  if (!rateLimit.allowed) {
    logIntakeEvent("intake-rate-limit-rejected", {
      intakeId,
      retryAfterSeconds: rateLimit.retryAfterSeconds,
    });
    return jsonResponse(
      {
        ok: false,
        message: "Too many intake submissions. Try again shortly.",
        error: "rate_limited",
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    logIntakeEvent("intake-validation-failed", {
      intakeId,
      fields: ["json"],
    });
    return jsonResponse(
      {
        ok: false,
        message: "Invalid JSON payload.",
        error: "invalid_json",
      },
      { status: 400 },
    );
  }

  const parsed = inquirySubmissionSchema.safeParse(body);

  if (!parsed.success) {
    logIntakeEvent("intake-validation-failed", {
      intakeId,
      fields: Object.keys(getInquiryFieldErrors(parsed.error)),
    });
    return jsonResponse(
      {
        ok: false,
        message: "Check the highlighted fields and submit again.",
        error: "validation_failed",
        fieldErrors: getInquiryFieldErrors(parsed.error),
      },
      { status: 400 },
    );
  }

  if (parsed.data.honeypot) {
    logIntakeEvent("intake-honeypot-rejected", {
      intakeId,
    });
    return jsonResponse(
      {
        ok: false,
        message: "Submission rejected.",
        error: "spam_detected",
      },
      { status: 400 },
    );
  }

  const logPayload = formatInquiryLog(parsed.data);
  const delivery = await sendInquiryNotification(intakeId, logPayload);

  logIntakeEvent("intake-received", {
    intakeId,
    deliveryMode: delivery.deliveryMode,
    deliveryAttempted: delivery.deliveryAttempted,
  });

  return jsonResponse({
    ok: true,
    message: "Intake captured. We will follow up with next steps.",
    intakeId,
    delivered: delivery.delivered,
    deliveryMode: delivery.deliveryMode,
    deliveryAttempted: delivery.deliveryAttempted,
  });
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}
