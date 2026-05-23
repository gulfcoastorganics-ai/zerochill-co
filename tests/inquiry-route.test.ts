import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetInquiryRateLimitBuckets } from "@/lib/inquiryIntake";

async function loadRoute() {
  vi.resetModules();
  return import("@/app/api/inquiry/route");
}

function buildRequest(body: Record<string, unknown>, ip = "203.0.113.10") {
  return new Request("http://localhost/api/inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@zerochill.co",
  organization: "ZeroChill Co.",
  deploymentInterest: "edge-inference",
  projectType: "inference",
  message: "Need a localized inference deployment with isolated telemetry and operator control.",
  budgetRange: "1k-3k",
  timeline: "2-4-weeks",
  honeypot: "",
};

const diagnosticPayload = {
  name: "ZeroChill Production Test",
  email: "test@example.com",
  organization: "ZeroChill QA",
  deploymentInterest: "Production intake delivery validation",
  projectType: "sovereign-infrastructure",
  message: "This is a controlled production intake delivery test for the ZeroChill launch pipeline.",
  budgetRange: "",
  timeline: "",
  honeypot: "",
};

beforeEach(() => {
  resetInquiryRateLimitBuckets();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("inquiry route", () => {
  it("responds to safe OPTIONS probes", async () => {
    const { OPTIONS } = await loadRoute();
    const response = OPTIONS();

    expect(response.status).toBe(204);
    expect(response.headers.get("Allow")).toBe("POST, OPTIONS");
  });

  it("returns structured validation errors for incomplete payloads", async () => {
    const { POST } = await loadRoute();
    const response = await POST(buildRequest({}));
    const payload = (await response.json()) as {
      ok: boolean;
      error: string;
      fieldErrors: Record<string, string>;
    };

    expect(response.status).toBe(400);
    expect(payload.ok).toBe(false);
    expect(payload.error).toBe("validation_failed");
    expect(payload.fieldErrors.name).toBe("Name is required.");
    expect(payload.fieldErrors.email).toBe("Email is required.");
  });

  it("accepts the controlled production intake diagnostic payload", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const { POST } = await loadRoute();
    const response = await POST(buildRequest(diagnosticPayload, "203.0.113.20"));
    const payload = (await response.json()) as {
      ok: boolean;
      delivered: boolean;
      deliveryMode: string;
      deliveryAttempted: boolean;
    };

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.delivered).toBe(false);
    expect(payload.deliveryMode).toBe("log");
    expect(payload.deliveryAttempted).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(infoSpy.mock.calls.map(([message]) => message)).toEqual(
      expect.arrayContaining([
        "[ZeroChill] intake-email-config-missing",
        "[ZeroChill] intake-log-fallback",
        "[ZeroChill] intake-received",
      ]),
    );
  });

  it("rejects honeypot submissions", async () => {
    const { POST } = await loadRoute();
    const response = await POST(
      buildRequest({
        ...validPayload,
        honeypot: "http://spam.example",
      }),
    );
    const payload = (await response.json()) as {
      ok: boolean;
      error: string;
      message: string;
    };

    expect(response.status).toBe(400);
    expect(payload.ok).toBe(false);
    expect(payload.error).toBe("spam_detected");
    expect(payload.message).toBe("Submission rejected.");
  });

  it("falls back to local logging when email delivery env vars are missing", async () => {
    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const { POST } = await loadRoute();
    const response = await POST(buildRequest(validPayload));
    const payload = (await response.json()) as {
      ok: boolean;
      delivered: boolean;
      deliveryMode: string;
      deliveryAttempted: boolean;
    };

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.delivered).toBe(false);
    expect(payload.deliveryMode).toBe("log");
    expect(payload.deliveryAttempted).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(infoSpy.mock.calls.map(([message]) => message)).toEqual(
      expect.arrayContaining([
        "[ZeroChill] intake-email-config-missing",
        "[ZeroChill] intake-log-fallback",
        "[ZeroChill] intake-received",
      ]),
    );
  });

  it("uses preferred ZEROCHILL intake env vars when present", async () => {
    const fetchSpy = vi.fn(async () => {
      return new Response(JSON.stringify({ id: "email_123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    vi.stubGlobal("fetch", fetchSpy);
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
    vi.stubEnv("ZEROCHILL_INTAKE_FROM_EMAIL", "intake@zerochill.co");
    vi.stubEnv("ZEROCHILL_INTAKE_TO_EMAIL", "ops@zerochill.co");
    vi.stubEnv("PREORDER_FROM_EMAIL", "legacy-from@zerochill.co");
    vi.stubEnv("PREORDER_NOTIFY_TO", "legacy-to@zerochill.co");

    const { POST } = await loadRoute();
    const response = await POST(buildRequest(validPayload, "203.0.113.11"));
    const payload = (await response.json()) as {
      ok: boolean;
      delivered: boolean;
      deliveryMode: string;
      deliveryAttempted: boolean;
    };

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.delivered).toBe(true);
    expect(payload.deliveryMode).toBe("email");
    expect(payload.deliveryAttempted).toBe(true);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const firstCall = fetchSpy.mock.calls[0] as unknown as [string, RequestInit] | undefined;
    expect(firstCall?.[0]).toBe("https://api.resend.com/emails");
    const requestBody = JSON.parse(String(firstCall?.[1]?.body ?? "{}")) as {
      from?: string;
      to?: string[];
    };
    expect(requestBody.from).toBe("intake@zerochill.co");
    expect(requestBody.to).toEqual(["ops@zerochill.co"]);
    expect(infoSpy.mock.calls.map(([message]) => message)).toEqual(
      expect.arrayContaining([
        "[ZeroChill] intake-resend-attempted",
        "[ZeroChill] intake-resend-success",
        "[ZeroChill] intake-received",
      ]),
    );
  });

  it("falls back to legacy PREORDER env vars when preferred intake env vars are absent", async () => {
    const fetchSpy = vi.fn(async () => {
      return new Response(JSON.stringify({ id: "email_123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    });

    const infoSpy = vi.spyOn(console, "info").mockImplementation(() => {});
    vi.stubGlobal("fetch", fetchSpy);
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
    vi.stubEnv("PREORDER_FROM_EMAIL", "legacy-from@zerochill.co");
    vi.stubEnv("PREORDER_NOTIFY_TO", "legacy-to@zerochill.co");

    const { POST } = await loadRoute();
    const response = await POST(buildRequest(validPayload, "203.0.113.12"));
    const payload = (await response.json()) as {
      ok: boolean;
      delivered: boolean;
      deliveryMode: string;
      deliveryAttempted: boolean;
    };

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.delivered).toBe(true);
    expect(payload.deliveryMode).toBe("email");
    expect(payload.deliveryAttempted).toBe(true);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const firstCall = fetchSpy.mock.calls[0] as unknown as [string, RequestInit] | undefined;
    const requestBody = JSON.parse(String(firstCall?.[1]?.body ?? "{}")) as {
      from?: string;
      to?: string[];
    };
    expect(requestBody.from).toBe("legacy-from@zerochill.co");
    expect(requestBody.to).toEqual(["legacy-to@zerochill.co"]);
    expect(infoSpy.mock.calls.map(([message]) => message)).toEqual(
      expect.arrayContaining([
        "[ZeroChill] intake-resend-attempted",
        "[ZeroChill] intake-resend-success",
        "[ZeroChill] intake-received",
      ]),
    );
  });

  it("rate limits repeated submissions from the same client key", async () => {
    const { POST } = await loadRoute();

    for (let index = 0; index < 5; index += 1) {
      const response = await POST(buildRequest(validPayload, "203.0.113.50"));
      expect(response.status).toBe(200);
    }

    const limitedResponse = await POST(buildRequest(validPayload, "203.0.113.50"));
    const payload = (await limitedResponse.json()) as {
      ok: boolean;
      error: string;
      retryAfterSeconds: number;
    };

    expect(limitedResponse.status).toBe(429);
    expect(payload.ok).toBe(false);
    expect(payload.error).toBe("rate_limited");
    expect(payload.retryAfterSeconds).toBeGreaterThan(0);
  });
});
