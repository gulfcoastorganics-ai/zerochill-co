const baseUrl = (process.env.ZEROCHILL_SITE_URL || "https://zerochill-co.vercel.app").trim().replace(/\/+$/, "");

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

const compatibilityPayload = {
  name: "ZeroChill Production Test",
  email: "test@example.com",
  organization: "ZeroChill QA",
  deploymentInterest: "launch-queue",
  projectType: "node-stack",
  message: "This is a controlled production intake delivery test for the ZeroChill launch pipeline.",
  budgetRange: "",
  timeline: "",
  honeypot: "",
};

async function postPayload(url, payload, label) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let responseBody = null;
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      responseBody = await response.json();
    } catch {
      responseBody = null;
    }
  }

  const summary = {
    label,
    status: response.status,
    ok: response.ok,
    apiOk: responseBody && typeof responseBody === "object" ? responseBody.ok : undefined,
    delivered: responseBody && typeof responseBody === "object" ? responseBody.delivered : undefined,
    deliveryMode: responseBody && typeof responseBody === "object" ? responseBody.deliveryMode : undefined,
    deliveryAttempted: responseBody && typeof responseBody === "object" ? responseBody.deliveryAttempted : undefined,
    error: responseBody && typeof responseBody === "object" ? responseBody.error : undefined,
  };

  console.log(`[${label}] POST /api/inquiry -> ${summary.status}`);
  console.log(`[${label}] apiOk=${summary.apiOk === undefined ? "unknown" : String(summary.apiOk)}`);
  console.log(`[${label}] delivered=${summary.delivered === undefined ? "unknown" : String(summary.delivered)}`);
  console.log(`[${label}] deliveryMode=${summary.deliveryMode === undefined ? "unknown" : summary.deliveryMode}`);
  console.log(`[${label}] deliveryAttempted=${summary.deliveryAttempted === undefined ? "unknown" : String(summary.deliveryAttempted)}`);

  return summary;
}

async function main() {
  const url = new URL("/api/inquiry", `${baseUrl}/`);
  const primary = await postPayload(url, diagnosticPayload, "primary");

  if (primary.ok && primary.apiOk !== false) {
    return;
  }

  if (primary.status === 400 && primary.error === "validation_failed") {
    console.log("[fallback] retrying with schema-compatible intake fields");
    const fallback = await postPayload(url, compatibilityPayload, "fallback");
    if (fallback.ok && fallback.apiOk !== false) {
      return;
    }
  }

  if (!primary.ok || primary.apiOk === false) {
    process.exitCode = 1;
  }
}

main().catch(() => {
  console.error("Intake diagnostic failed unexpectedly.");
  process.exitCode = 1;
});
