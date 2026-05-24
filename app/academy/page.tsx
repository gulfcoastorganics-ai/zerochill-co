"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AcademyHealthIndicator from "@/components/AcademyHealthIndicator";

type OperatorProfile = {
  email: string;
  modelName: string;
  deviceType: string;
  inferenceLatencyMs: number;
  browserUserAgent: string;
  webgpuSupported: boolean;
  runtimeEndpoint: string;
  validationMethod: string;
  validatedAt: string;
};

type RuntimeStatus = {
  localNode: string;
  ollama: string;
  model: string;
  status: string;
  inferenceLatency: string;
  proofHash: string;
};

type ValidationLogEntry = {
  label: string;
  state: "complete" | "failed";
  detail?: string;
};

type RuntimeFailureClass =
  | "OLLAMA_NOT_RUNNING"
  | "LOCALHOST_UNREACHABLE"
  | "MODEL_NOT_FOUND"
  | "VALIDATION_RESPONSE_INVALID"
  | "NETWORK_PERMISSION_DENIED"
  | "UNKNOWN_RUNTIME_FAILURE";

type DiagnosticsState = {
  localhostReachable: string;
  modelDetected: string;
  inferenceLatency: string;
  webgpuSupport: string;
  browserType: string;
  runtimeEndpoint: string;
  validationState: string;
};

type SessionVisibilityState = {
  sessionActive: boolean;
  operatorEmail: string;
  currentTier: string;
};

type AcademyHealthSnapshot = {
  ok?: boolean;
  timestamp?: string;
  supabaseReachable?: boolean;
  academyTables?: Record<string, boolean>;
  env?: {
    hasSupabaseUrl?: boolean;
    hasSupabaseAnonKey?: boolean;
    hasServiceRole?: boolean;
    hasSiteUrl?: boolean;
  };
  readiness?: {
    authConfigured?: boolean;
    webhookConfigured?: boolean;
    supabaseConfigured?: boolean;
    runtimeValidationReady?: boolean;
    academyOperational?: boolean;
  };
  warnings?: string[];
};

type VerifyResponse =
  | {
      ok: true;
      status: string;
      email: string;
      modelName: string;
      deviceType: string;
      verificationHash: string;
      unlockedTier: number;
      gateName: string;
      rewardUnlock: string | null;
      validationPrompt: string;
      validationResponse: string;
      verifiedAt: string;
      operatorProfile: OperatorProfile;
    }
  | {
      ok: false;
      error: string;
      message: string;
    };

const initialStatus: RuntimeStatus = {
  localNode: "WAITING",
  ollama: "DISCONNECTED",
  model: "NONE",
  status: "TIER 1 LOCKED",
  inferenceLatency: "—",
  proofHash: "—",
};

const validationPrompt = "Return only the string ZERO_STATE_OK";
const runtimeEndpoint = "http://localhost:11434";
const completedValidationLog: ValidationLogEntry[] = [
  { label: "LOCAL NODE DETECTED", state: "complete" },
  { label: "MODEL ENUMERATED", state: "complete" },
  { label: "INFERENCE CHALLENGE SENT", state: "complete" },
  { label: "ZERO_STATE_OK CONFIRMED", state: "complete" },
  { label: "TIER_1_VALIDATED", state: "complete" },
  { label: "TIER_2_UNLOCKED", state: "complete" },
];

const initialDiagnostics: DiagnosticsState = {
  localhostReachable: "PENDING",
  modelDetected: "UNRESOLVED",
  inferenceLatency: "—",
  webgpuSupport: "PENDING",
  browserType: "PENDING",
  runtimeEndpoint,
  validationState: "IDLE",
};

const initialSessionVisibility: SessionVisibilityState = {
  sessionActive: false,
  operatorEmail: "UNRESOLVED",
  currentTier: "TIER 0",
};

const runtimeFailureCopy: Record<
  RuntimeFailureClass,
  { title: string; message: string; eventType: "localhost_failure" | "inference_failure" | "runtime_validation_failure" }
> = {
  OLLAMA_NOT_RUNNING: {
    title: "OLLAMA_NOT_RUNNING",
    message: "The local Ollama runtime is not responding to the validation request.",
    eventType: "localhost_failure",
  },
  LOCALHOST_UNREACHABLE: {
    title: "LOCALHOST_UNREACHABLE",
    message: "The local endpoint could not be reached from this browser session.",
    eventType: "localhost_failure",
  },
  MODEL_NOT_FOUND: {
    title: "MODEL_NOT_FOUND",
    message: "No local model was returned by the runtime tag list.",
    eventType: "runtime_validation_failure",
  },
  VALIDATION_RESPONSE_INVALID: {
    title: "VALIDATION_RESPONSE_INVALID",
    message: "The runtime did not return the required ZERO_STATE_OK proof string.",
    eventType: "inference_failure",
  },
  NETWORK_PERMISSION_DENIED: {
    title: "NETWORK_PERMISSION_DENIED",
    message: "The browser blocked the local runtime request or denied network access.",
    eventType: "runtime_validation_failure",
  },
  UNKNOWN_RUNTIME_FAILURE: {
    title: "UNKNOWN_RUNTIME_FAILURE",
    message: "The runtime verification flow failed for an unknown reason.",
    eventType: "runtime_validation_failure",
  },
};

function statusPill(label: string, value: string, active = false) {
  return (
    <div className="terminal-surface flex items-center justify-between gap-4 rounded-2xl p-4">
      <span className="text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">{label}</span>
      <span
        className={
          active
            ? "font-mono text-sm uppercase tracking-[0.12em] text-[color:var(--accent)]"
            : "font-mono text-sm uppercase tracking-[0.12em] text-white"
        }
      >
        {value}
      </span>
    </div>
  );
}

function detectBrowserType() {
  if (typeof navigator === "undefined") {
    return "BROWSER";
  }

  const ua = navigator.userAgent;
  const navigatorWithClientHints = navigator as Navigator & {
    userAgentData?: { brands?: Array<{ brand?: string }> };
  };

  if (navigatorWithClientHints.userAgentData?.brands?.length) {
    const [brand] = navigatorWithClientHints.userAgentData.brands;
    return brand?.brand?.toUpperCase() || "BROWSER";
  }

  if (ua.includes("Firefox")) {
    return "FIREFOX";
  }

  if (ua.includes("Edg/")) {
    return "EDGE";
  }

  if (ua.includes("Chrome/")) {
    return "CHROME";
  }

  if (ua.includes("Safari/")) {
    return "SAFARI";
  }

  return "BROWSER";
}

function classifyRuntimeFailure(error: unknown, stage: "tags" | "generate"): RuntimeFailureClass {
  const message = error instanceof Error ? error.message : String(error);
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("mixed content") ||
    normalizedMessage.includes("permission") ||
    normalizedMessage.includes("blocked")
  ) {
    return "NETWORK_PERMISSION_DENIED";
  }

  if (normalizedMessage.includes("no models")) {
    return "MODEL_NOT_FOUND";
  }

  if (stage === "tags") {
    return normalizedMessage.includes("failed to fetch") || normalizedMessage.includes("networkerror")
      ? "LOCALHOST_UNREACHABLE"
      : "OLLAMA_NOT_RUNNING";
  }

  if (stage === "generate") {
    return normalizedMessage.includes("failed to fetch") || normalizedMessage.includes("networkerror")
      ? "LOCALHOST_UNREACHABLE"
      : "OLLAMA_NOT_RUNNING";
  }

  return "UNKNOWN_RUNTIME_FAILURE";
}

export default function AcademyPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<RuntimeStatus>(initialStatus);
  const [feedback, setFeedback] = useState("Verify a local Ollama runtime to unlock Tier 2.");
  const [isVerifying, setIsVerifying] = useState(false);
  const [runtimeError, setRuntimeError] = useState("");
  const [runtimeFailureClass, setRuntimeFailureClass] = useState<RuntimeFailureClass | null>(null);
  const [deploymentProfile, setDeploymentProfile] = useState<OperatorProfile | null>(null);
  const [gateProfile, setGateProfile] = useState<{ gateName: string; rewardUnlock: string | null } | null>(null);
  const [validationLog, setValidationLog] = useState<ValidationLogEntry[]>([]);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [diagnostics, setDiagnostics] = useState<DiagnosticsState>(initialDiagnostics);
  const [sessionVisibility, setSessionVisibility] = useState<SessionVisibilityState>(initialSessionVisibility);
  const [healthSnapshot, setHealthSnapshot] = useState<AcademyHealthSnapshot | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSessionVisibility() {
      try {
        const response = await fetch("/api/academy-session", { cache: "no-store" });
        const result = (await response.json().catch(() => null)) as
          | {
              ok?: boolean;
              sessionActive?: boolean;
              email?: string | null;
              tier?: number;
            }
          | null;

        if (cancelled || !response.ok || !result?.ok) {
          return;
        }

        setSessionVisibility({
          sessionActive: Boolean(result.sessionActive),
          operatorEmail: result.email || "UNRESOLVED",
          currentTier: `TIER ${result.tier ?? 0}`,
        });
      } catch {
        if (!cancelled) {
          setSessionVisibility(initialSessionVisibility);
        }
      }
    }

    void loadSessionVisibility();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadHealth() {
      try {
        const response = await fetch("/api/academy-health", { cache: "no-store" });
        const result = (await response.json().catch(() => null)) as AcademyHealthSnapshot | null;

        if (!cancelled && response.ok) {
          setHealthSnapshot(result);
        }
      } catch {
        if (!cancelled) {
          setHealthSnapshot(null);
        }
      }
    }

    void loadHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  const progressState = useMemo(
    () => [
      { title: "Tier 1 Foundations", state: status.status === "TIER_1_VALIDATED" ? "ACTIVE" : "LOCKED" },
      {
        title: "Tier 2 Orchestration",
        state: status.status === "TIER_1_VALIDATED" ? "UNLOCKED" : "LOCKED UNTIL VALIDATION",
      },
      { title: "Tier 3 Sovereign Ops", state: "LOCKED" },
    ],
    [status.status],
  );

  const runtimeMetrics = [
    {
      label: "Last Validation Status",
      value: status.status,
    },
    {
      label: "Last Inference Latency",
      value: diagnostics.inferenceLatency,
    },
    {
      label: "Last Validation Timestamp",
      value: deploymentProfile?.validatedAt ?? "—",
    },
    {
      label: "Orchestration Unlock State",
      value: gateProfile?.rewardUnlock ?? (status.status.includes("TIER_1_VALIDATED") ? "TIER_2_ORCHESTRATION" : "LOCKED"),
    },
    {
      label: "Runtime Endpoint",
      value: diagnostics.runtimeEndpoint,
    },
  ];

  async function recordRuntimeEvent(
    eventType: string,
    eventStatus: string,
    metadata?: Record<string, unknown>,
  ) {
    try {
      await fetch("/api/runtime-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventType,
          eventStatus,
          metadata,
        }),
      });
    } catch {
      // Telemetry is best-effort only.
    }
  }

  function updateDiagnostics(partial: Partial<DiagnosticsState>) {
    setDiagnostics((current) => ({
      ...current,
      ...partial,
    }));
  }

  function resetRuntimeState() {
    setStatus(initialStatus);
    setFeedback("Verify a local Ollama runtime to unlock Tier 2.");
    setRuntimeError("");
    setRuntimeFailureClass(null);
    setDeploymentProfile(null);
    setGateProfile(null);
    setValidationLog([]);
    setValidationAttempted(false);
    setDiagnostics(initialDiagnostics);
  }

  async function handleVerifyRuntime() {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setFeedback("Enter the academy email tied to your purchase.");
      resetRuntimeState();
      return;
    }

    setIsVerifying(true);
    setFeedback("Probing the local node for Ollama runtime tags...");
    setRuntimeError("");
    setRuntimeFailureClass(null);
    setDeploymentProfile(null);
    setGateProfile(null);
    setValidationLog([]);
    setValidationAttempted(true);
    setDiagnostics({
      ...initialDiagnostics,
      runtimeEndpoint,
      validationState: "CHECKING LOCAL NODE",
    });

    const partialLog: ValidationLogEntry[] = [];
    const browserType = detectBrowserType();
    const navigatorWithUaData = navigator as Navigator & {
      userAgentData?: { platform?: string; brands?: Array<{ brand?: string }> };
    };
    const deviceType = navigatorWithUaData.userAgentData?.platform || navigator.platform || "browser";
    const browserUserAgent = navigator.userAgent;
    const webgpuSupported = "gpu" in navigator;

    updateDiagnostics({
      browserType,
      webgpuSupport: webgpuSupported ? "SUPPORTED" : "UNAVAILABLE",
      runtimeEndpoint,
      validationState: "PROBING LOCAL NODE",
    });

    try {
      const tagsResponse = await fetch(`${runtimeEndpoint}/api/tags`);

      if (!tagsResponse.ok) {
        throw new Error("OLLAMA_NOT_RUNNING::Local Ollama runtime did not respond.");
      }

      partialLog.push({ label: "LOCAL NODE DETECTED", state: "complete" });
      updateDiagnostics({
        localhostReachable: "REACHABLE",
      });

      const tagsData = (await tagsResponse.json().catch(() => null)) as
        | { models?: Array<{ name?: string }> }
        | null;
      const modelName = tagsData?.models?.[0]?.name?.trim() || "UNKNOWN";

      if (modelName === "UNKNOWN") {
        throw new Error("MODEL_NOT_FOUND::No Ollama models were returned.");
      }

      partialLog.push({ label: "MODEL ENUMERATED", state: "complete" });
      updateDiagnostics({
        modelDetected: modelName,
      });

      setFeedback("Running local generation proof against the Ollama node...");
      updateDiagnostics({
        validationState: "INFERENCE CHALLENGE SENT",
      });

      const generationStartedAt = performance.now();
      partialLog.push({ label: "INFERENCE CHALLENGE SENT", state: "complete" });

      const generateResponse = await fetch(`${runtimeEndpoint}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelName,
          prompt: validationPrompt,
          stream: false,
        }),
      });
      const generationLatencyMs = Math.round(performance.now() - generationStartedAt);

      if (!generateResponse.ok) {
        throw new Error("OLLAMA_NOT_RUNNING::Local inference request failed.");
      }

      const generationData = (await generateResponse.json().catch(() => null)) as
        | { response?: string; message?: string; done?: boolean }
        | null;
      const generationOutput = `${generationData?.response ?? generationData?.message ?? ""}`.trim();

      if (!generationOutput.includes("ZERO_STATE_OK")) {
        throw new Error("VALIDATION_RESPONSE_INVALID::Local inference did not return the required proof string.");
      }

      partialLog.push({ label: "ZERO_STATE_OK CONFIRMED", state: "complete" });
      updateDiagnostics({
        inferenceLatency: `${generationLatencyMs} MS`,
        validationState: "ZERO_STATE_OK CONFIRMED",
      });

      const response = await fetch("/api/verify-runtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          modelName,
          deviceType,
          inferenceLatencyMs: generationLatencyMs,
          browserUserAgent,
          webgpuSupported,
          validationResponse: generationOutput,
        }),
      });

      const result = (await response.json().catch(() => null)) as VerifyResponse | null;

      if (!response.ok || !result || !result.ok) {
        const failureMessage = result && !result.ok ? result.message : "Runtime verification failed.";
        throw new Error(`TIER_1_VALIDATED::${failureMessage}`);
      }

      partialLog.push({ label: "TIER_1_VALIDATED", state: "complete" });
      partialLog.push({ label: "TIER_2_UNLOCKED", state: "complete" });

      setStatus({
        localNode: "ONLINE",
        ollama: "AVAILABLE",
        model: modelName,
        status: `${result.status} / TIER ${result.unlockedTier}`,
        inferenceLatency: `${generationLatencyMs} MS`,
        proofHash: result.verificationHash,
      });
      setFeedback("Tier 1 validated. Tier 2 orchestration is now unlocked.");
      setDeploymentProfile(result.operatorProfile);
      setGateProfile({
        gateName: result.gateName,
        rewardUnlock: result.rewardUnlock,
      });
      setValidationLog(completedValidationLog);
      setRuntimeError("");
      setRuntimeFailureClass(null);
      updateDiagnostics({
        localhostReachable: "REACHABLE",
        modelDetected: modelName,
        inferenceLatency: `${generationLatencyMs} MS`,
        validationState: "TIER 1 VALIDATED",
        webgpuSupport: webgpuSupported ? "SUPPORTED" : "UNAVAILABLE",
        browserType,
        runtimeEndpoint,
      });

      setSessionVisibility((current) => ({
        ...current,
        operatorEmail: trimmedEmail,
        currentTier: `TIER ${result.unlockedTier}`,
        sessionActive: true,
      }));

      await recordRuntimeEvent("runtime_validation_success", "success", {
        modelName,
        inferenceLatencyMs: generationLatencyMs,
        runtimeEndpoint,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Verification failed.";
      const [step, detail] = message.includes("::") ? message.split("::", 2) : ["TIER_1_VALIDATED", message];
      const failedStep = step.trim() || "TIER_1_VALIDATED";
      const failureClass = runtimeFailureCopy[failedStep as RuntimeFailureClass]
        ? (failedStep as RuntimeFailureClass)
        : classifyRuntimeFailure(
            error,
            partialLog.some((entry) => entry.label === "INFERENCE CHALLENGE SENT") ? "generate" : "tags",
          );
      const failureCopy = runtimeFailureCopy[failureClass];

      setValidationLog([
        ...partialLog,
        {
          label: failureCopy.title,
          state: "failed",
          detail: detail?.trim() || failureCopy.message,
        },
      ]);
      setStatus({
        localNode: "OFFLINE",
        ollama: "UNAVAILABLE",
        model: "NONE",
        status: "TIER 1 LOCKED",
        inferenceLatency: "—",
        proofHash: "—",
      });
      setDeploymentProfile(null);
      setGateProfile(null);
      setRuntimeError(failureCopy.message);
      setRuntimeFailureClass(failureClass);
      setFeedback(failureCopy.message);
      setDiagnostics((current) => ({
        ...current,
        localhostReachable: partialLog.some((entry) => entry.label === "LOCAL NODE DETECTED") ? "REACHABLE" : "UNREACHABLE",
        modelDetected: partialLog.some((entry) => entry.label === "MODEL ENUMERATED") ? current.modelDetected : "UNRESOLVED",
        validationState: failureCopy.title,
      }));

      await Promise.all([
        recordRuntimeEvent("runtime_validation_failure", "failure", {
          failureClass,
          failureMessage: failureCopy.message,
          detail: detail?.trim() || message,
          failedStep,
          runtimeEndpoint,
        }),
        failureCopy.eventType !== "runtime_validation_failure"
          ? recordRuntimeEvent(failureCopy.eventType, "failure", {
              failureClass,
              failedStep,
              detail: detail?.trim() || message,
            })
          : Promise.resolve(),
      ]);
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <main className="zerochill-shell min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_rgba(220,38,38,0.45)]" />
          Zero-State Academy / Foundations Deployment Console
          <AcademyHealthIndicator />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="glass-panel-strong rounded-3xl p-6 sm:p-8">
            <div className="border-b border-white/10 pb-4">
              <p className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                Foundations Deployment Console
              </p>
              <h1 className="mt-3 text-[clamp(2.25rem,6vw,4.75rem)] font-black uppercase leading-[0.9] tracking-[-0.08em]">
                Verify the local runtime. Unlock the next tier.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
                The Master Toolkit activates the academy profile, validates the local Ollama node, and records proof
                for Tier 1 completion.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2">
                <span className="text-[0.64rem] uppercase tracking-[0.22em] text-[color:var(--steel)] sm:tracking-[0.3em]">
                  Academy email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="operator@company.com"
                  className="glass-field w-full rounded-2xl px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={handleVerifyRuntime}
                  disabled={isVerifying}
                  className="zerochill-action inline-flex w-full items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {isVerifying ? "Verifying Runtime..." : "Verify Local Runtime"}
                </button>
                <button
                  type="button"
                  onClick={handleVerifyRuntime}
                  disabled={isVerifying}
                  className="zerochill-action inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  Retry Validation
                </button>
                <button
                  type="button"
                  onClick={resetRuntimeState}
                  disabled={isVerifying}
                  className="zerochill-action inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white sm:w-auto"
                >
                  Reset Runtime State
                </button>
                <Link
                  href="/login"
                  className="zerochill-action inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white sm:w-auto"
                >
                  Magic Link Login
                </Link>
              </div>

              <div className="terminal-surface rounded-2xl p-4 text-sm leading-7 text-white/72" role="status" aria-live="polite">
                {feedback}
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {statusPill("Local Node", status.localNode, status.localNode === "ONLINE")}
              {statusPill("Ollama", status.ollama, status.ollama === "AVAILABLE")}
              {statusPill("Model", status.model, status.model !== "NONE")}
              {statusPill("Latency", status.inferenceLatency, status.inferenceLatency !== "—")}
              {statusPill("Status", status.status, status.status.includes("TIER_1_VALIDATED"))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {runtimeMetrics.map((metric) => (
                <div key={metric.label} className="terminal-surface rounded-2xl p-4">
                  <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                    {metric.label}
                  </div>
                  <div className="mt-2 break-words font-mono text-[0.82rem] leading-6 text-white sm:text-sm">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel mt-4 rounded-3xl p-4 sm:p-5">
              <div className="border-b border-white/10 pb-3">
                <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">
                  Deployment Diagnostics
                </div>
                <div className="mt-1.5 text-sm uppercase tracking-[0.08em] text-white/65">
                  Local node telemetry snapshot
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Localhost Reachable", diagnostics.localhostReachable],
                  ["Model Detected", diagnostics.modelDetected],
                  ["Inference Latency", diagnostics.inferenceLatency],
                  ["WebGPU Support", diagnostics.webgpuSupport],
                  ["Browser Type", diagnostics.browserType],
                  ["Runtime Endpoint", diagnostics.runtimeEndpoint],
                  ["Validation State", diagnostics.validationState],
                ].map(([label, value]) => (
                  <div key={label} className="terminal-surface rounded-2xl p-4">
                    <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                      {label}
                    </div>
                    <div className="mt-2 break-words font-mono text-[0.82rem] leading-6 text-white sm:text-sm">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel mt-4 rounded-3xl p-4 sm:p-5">
              <div className="border-b border-white/10 pb-3">
                <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">
                  Session Visibility
                </div>
                <div className="mt-1.5 text-sm uppercase tracking-[0.08em] text-white/65">
                  Operator session awareness
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="terminal-surface rounded-2xl p-4">
                  <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                    Session
                  </div>
                  <div className="mt-2 font-mono text-sm uppercase tracking-[0.08em] text-white">
                    {sessionVisibility.sessionActive ? "ACTIVE" : "INACTIVE"}
                  </div>
                </div>
                <div className="terminal-surface rounded-2xl p-4">
                  <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                    Operator Email
                  </div>
                  <div className="mt-2 break-words font-mono text-[0.82rem] leading-6 text-white sm:text-sm">
                    {sessionVisibility.operatorEmail}
                  </div>
                </div>
                <div className="terminal-surface rounded-2xl p-4">
                  <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                    Current Tier
                  </div>
                  <div className="mt-2 font-mono text-sm uppercase tracking-[0.08em] text-white">
                    {sessionVisibility.currentTier}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/academy/intake"
                className="zerochill-action inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white"
              >
                Operator Intake
              </Link>
              <Link
                href="/academy/orchestration"
                className="zerochill-action inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white"
              >
                Orchestration Console
              </Link>
            </div>

            {gateProfile ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="terminal-surface rounded-2xl p-4">
                  <div className="text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">Gate</div>
                  <div className="mt-2 font-mono text-sm uppercase tracking-[0.08em] text-white">
                    {gateProfile.gateName}
                  </div>
                </div>
                <div className="terminal-surface rounded-2xl p-4">
                  <div className="text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                    Unlock
                  </div>
                  <div className="mt-2 font-mono text-sm uppercase tracking-[0.08em] text-white">
                    {gateProfile.rewardUnlock ?? "—"}
                  </div>
                </div>
              </div>
            ) : null}

            {deploymentProfile ? (
              <div className="glass-panel mt-4 rounded-3xl p-4 sm:p-5">
                <div className="border-b border-white/10 pb-3">
                  <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">
                    Operator Deployment Profile
                  </div>
                  <div className="mt-1.5 text-sm uppercase tracking-[0.08em] text-white/65">
                    Tier 1 runtime proof captured
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {[
                    ["Runtime Endpoint", deploymentProfile.runtimeEndpoint],
                    ["Model", deploymentProfile.modelName],
                    ["Inference Latency", `${deploymentProfile.inferenceLatencyMs} ms`],
                    ["WebGPU Support", deploymentProfile.webgpuSupported ? "Supported" : "Unavailable"],
                    ["Device Type", deploymentProfile.deviceType],
                    ["Validation Method", deploymentProfile.validationMethod],
                    ["Proof Hash", status.proofHash],
                  ].map(([label, value], index) => {
                    const isProofHash = index === 6;

                    return (
                      <div
                        key={label}
                        className={
                          isProofHash
                            ? "md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                            : "rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                        }
                      >
                        <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                          {label}
                        </div>
                        <div className="mt-2 break-words font-mono text-[0.82rem] leading-6 text-white sm:text-sm">
                          {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mt-4 terminal-surface rounded-2xl p-4">
                <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">Proof hash</div>
                <div className="mt-2 break-all font-mono text-[0.82rem] leading-6 text-white sm:text-sm">
                  {status.proofHash}
                </div>
              </div>
            )}

            <div className="glass-panel mt-4 rounded-3xl p-4 sm:p-5">
              <div className="border-b border-white/10 pb-3">
                <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">
                  Validation Log
                </div>
                <div className="mt-1.5 text-sm uppercase tracking-[0.08em] text-white/65">
                  Runtime gate sequence
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                {validationLog.length > 0 ? (
                  validationLog.map((entry) => (
                    <div
                      key={entry.label}
                      className={
                        entry.state === "failed"
                          ? "terminal-surface flex items-start gap-3 rounded-2xl border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/8 p-3"
                          : "terminal-surface flex items-start gap-3 rounded-2xl p-3"
                      }
                    >
                      <span
                        className={
                          entry.state === "failed"
                            ? "mt-1 h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_rgba(220,38,38,0.35)]"
                            : "mt-1 h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]"
                        }
                      />
                      <div className="min-w-0">
                        <div
                          className={
                            entry.state === "failed"
                              ? "font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[color:var(--accent-soft)]"
                              : "font-mono text-[0.72rem] uppercase tracking-[0.14em] text-white"
                          }
                        >
                          {entry.label}
                        </div>
                        {entry.detail ? (
                          <div className="mt-1 text-xs leading-5 text-white/60">{entry.detail}</div>
                        ) : null}
                      </div>
                    </div>
                  ))
                ) : validationAttempted ? (
                  <div className="terminal-surface rounded-2xl p-4 text-sm leading-7 text-white/70">
                    Validation in progress.
                  </div>
                ) : (
                  <div className="terminal-surface rounded-2xl p-4 text-sm leading-7 text-white/60">
                    Runtime gate awaiting operator validation.
                  </div>
                )}
              </div>
            </div>

            {runtimeError ? (
              <div
                className="rounded-2xl border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 p-4 text-sm leading-7 text-[color:var(--accent-soft)]"
                role="alert"
              >
                <div className="text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">
                  {runtimeFailureClass ?? "RUNTIME_FAILURE"}
                </div>
                <div className="mt-2">{runtimeError}</div>
              </div>
            ) : null}

            <div className="mt-4 terminal-surface rounded-2xl p-4 text-sm leading-7 text-white/72">
              <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                Academy Health Snapshot
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-xs uppercase tracking-[0.12em] text-white/60">
                <span>Supabase: {healthSnapshot?.supabaseReachable ? "REACHABLE" : "UNVERIFIED"}</span>
                <span>Auth: {healthSnapshot?.readiness?.authConfigured ? "READY" : "PENDING"}</span>
                <span>Webhook: {healthSnapshot?.readiness?.webhookConfigured ? "READY" : "PENDING"}</span>
                <span>Runtime: {healthSnapshot?.readiness?.runtimeValidationReady ? "READY" : "PENDING"}</span>
              </div>
            </div>
          </article>

          <aside className="grid gap-4">
            <article className="glass-panel rounded-3xl p-6">
              <div className="border-b border-white/10 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                Tier progression
              </div>
              <div className="mt-4 grid gap-3">
                {progressState.map((item) => (
                  <div key={item.title} className="terminal-surface rounded-2xl p-4">
                    <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">
                      {item.title}
                    </div>
                    <div className="mt-2 font-mono text-sm uppercase tracking-[0.1em] text-white">
                      {item.state}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="glass-panel-strong rounded-3xl p-6">
              <div className="border-b border-white/10 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                Protocol
              </div>
              <ul className="mt-4 space-y-4 text-sm leading-7 text-white/70">
                {[
                  "Payhip purchase creates the academy profile and access key.",
                  "Local Ollama validation records runtime proof and unlocks Tier 2.",
                  "Tier 3 remains locked until orchestration verification is added.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
}
