import { NextResponse } from "next/server";
import {
  buildInquiryBody,
  buildInquirySubject,
  checkInquiryRateLimit,
  formatInquiryLog,
  getClientKey,
  getInquiryFieldErrors,
  inquirySubmissionSchema,
  type InquiryLogSubmission,
} from "@/lib/inquiryIntake";

function jsonResponse(
  body: Record<string, unknown>,
  init?: ResponseInit,
) {
  return NextResponse.json(body, init);
}

async function sendInquiryNotification(submission: InquiryLogSubmission) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.ZEROCHILL_INTAKE_TO_EMAIL?.trim();
  const from = process.env.ZEROCHILL_INTAKE_FROM_EMAIL?.trim();
  const logContext = {
    name: submission.name,
    organization: submission.organization,
    deploymentInterest: submission.deploymentInterest,
    projectType: submission.projectType,
  };

  if (!apiKey || !to || !from) {
    console.info("[ZeroChill] intake logged locally", logContext);
    return { deliveryMode: "log" as const, delivered: false };
  }

  try {
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
      console.error("[ZeroChill] intake email delivery failed", {
        status: response.status,
        errorText,
        ...logContext,
      });
      console.info("[ZeroChill] intake logged locally", logContext);
      return { deliveryMode: "log" as const, delivered: false };
    }

    return { deliveryMode: "email" as const, delivered: true };
  } catch (error) {
    console.error("[ZeroChill] intake email delivery exception", {
      error,
      ...logContext,
    });
    console.info("[ZeroChill] intake logged locally", logContext);
    return { deliveryMode: "log" as const, delivered: false };
  }
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rateLimit = checkInquiryRateLimit(clientKey);

  if (!rateLimit.allowed) {
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
    return jsonResponse(
      {
        ok: false,
        message: "Submission rejected.",
        error: "spam_detected",
      },
      { status: 400 },
    );
  }

  const intakeId = crypto.randomUUID();
  const logPayload = formatInquiryLog(parsed.data);
  const delivery = await sendInquiryNotification(logPayload);

  console.info("[ZeroChill] intake received", {
    intakeId,
    deliveryMode: delivery.deliveryMode,
    name: logPayload.name,
    organization: logPayload.organization,
    deploymentInterest: logPayload.deploymentInterest,
    projectType: logPayload.projectType,
  });

  return jsonResponse({
    ok: true,
    message: "Intake captured. We will follow up with next steps.",
    intakeId,
    delivered: delivery.delivered,
    deliveryMode: delivery.deliveryMode,
  });
}
