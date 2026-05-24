"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AcademyHealthIndicator from "@/components/AcademyHealthIndicator";

type AcademyHealthResponse = {
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
  recommendedActions?: string[];
  warnings?: string[];
  webhookProcessingState?: "READY" | "DEGRADED" | "OFFLINE";
};

type AcademySessionResponse = {
  ok?: boolean;
  sessionActive?: boolean;
  email?: string | null;
  tier?: number;
  academyAccess?: boolean;
};

type StatusTone = "OPERATIONAL" | "DEGRADED" | "OFFLINE" | "STANDBY";

type StatusCard = {
  label: string;
  value: string;
  tone: StatusTone;
  detail: string;
};

const commandSnippets = ["ollama serve", "ollama list", "curl http://localhost:11434/api/tags", "npm run build"];

function statusClass(tone: StatusTone) {
  switch (tone) {
    case "OPERATIONAL":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
    case "DEGRADED":
      return "border-amber-400/20 bg-amber-400/10 text-amber-200";
    case "OFFLINE":
      return "border-[color:var(--accent)]/20 bg-[color:var(--accent)]/10 text-[color:var(--accent-soft)]";
    case "STANDBY":
    default:
      return "border-white/10 bg-white/[0.03] text-[color:var(--steel)]";
  }
}

function ToneDot({ tone }: { tone: StatusTone }) {
  return (
    <span
      className={
        tone === "OPERATIONAL"
          ? "h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(74,222,128,0.35)]"
          : tone === "DEGRADED"
            ? "h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.35)]"
            : tone === "OFFLINE"
              ? "h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_rgba(220,38,38,0.35)]"
              : "h-2 w-2 rounded-full bg-[color:var(--steel)]"
      }
    />
  );
}

function StatusPill({ tone, label }: { tone: StatusTone; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.2em] ${statusClass(tone)}`}
    >
      <ToneDot tone={tone} />
      {label}
    </span>
  );
}

function classifyTone(operational: boolean, degraded?: boolean): StatusTone {
  if (operational) {
    return "OPERATIONAL";
  }

  if (degraded) {
    return "DEGRADED";
  }

  return "OFFLINE";
}

export default function SystemStatusPage() {
  const [health, setHealth] = useState<AcademyHealthResponse | null>(null);
  const [session, setSession] = useState<AcademySessionResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [healthResponse, sessionResponse] = await Promise.all([
        fetch("/api/academy-health", { cache: "no-store" }).catch(() => null),
        fetch("/api/academy-session", { cache: "no-store" }).catch(() => null),
      ]);

      if (!cancelled && healthResponse) {
        const healthResult = (await healthResponse.json().catch(() => null)) as AcademyHealthResponse | null;
        if (healthResponse.ok) {
          setHealth(healthResult);
        }
      }

      if (!cancelled && sessionResponse) {
        const sessionResult = (await sessionResponse.json().catch(() => null)) as AcademySessionResponse | null;
        if (sessionResponse.ok) {
          setSession(sessionResult);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const cards: StatusCard[] = useMemo(() => {
    const academyOperational = Boolean(health?.readiness?.academyOperational);
    const supabaseReachable = Boolean(health?.supabaseReachable);
    const authConfigured = Boolean(health?.readiness?.authConfigured);
    const webhookConfigured = Boolean(health?.readiness?.webhookConfigured);
    const runtimeValidationReady = Boolean(health?.readiness?.runtimeValidationReady);
    const sessionActive = Boolean(session?.sessionActive);

    return [
      {
        label: "Academy API",
        value: health?.ok ? "ONLINE" : "OFFLINE",
        tone: classifyTone(Boolean(health?.ok), !health?.ok),
        detail: "Health route response",
      },
      {
        label: "Supabase Reachable",
        value: supabaseReachable ? "REACHABLE" : "UNREACHABLE",
        tone: classifyTone(supabaseReachable, Boolean(health?.ok && !supabaseReachable)),
        detail: "Server-side probe status",
      },
      {
        label: "Webhook Processing",
        value: health?.webhookProcessingState ?? (webhookConfigured ? "READY" : "DEGRADED"),
        tone:
          health?.webhookProcessingState === "READY"
            ? "OPERATIONAL"
            : health?.webhookProcessingState === "DEGRADED"
              ? "DEGRADED"
              : "OFFLINE",
        detail: "Payhip verification readiness",
      },
      {
        label: "Runtime Validation",
        value: runtimeValidationReady ? "OPERATIONAL" : "DEGRADED",
        tone: runtimeValidationReady ? "OPERATIONAL" : "DEGRADED",
        detail: "Local Ollama gate readiness",
      },
      {
        label: "Auth Session",
        value: sessionActive ? "ACTIVE" : "INACTIVE",
        tone: sessionActive ? "OPERATIONAL" : "OFFLINE",
        detail: "Operator session state",
      },
      {
        label: "Current Tier",
        value: session?.tier ? `TIER ${session.tier}` : "TIER 0",
        tone: sessionActive ? "STANDBY" : "OFFLINE",
        detail: "Academy profile tier",
      },
      {
        label: "Environment Readiness",
        value: academyOperational ? "READY" : "NOT READY",
        tone: academyOperational ? "OPERATIONAL" : "DEGRADED",
        detail: "Launch readiness aggregate",
      },
      {
        label: "Auth Configured",
        value: authConfigured ? "YES" : "NO",
        tone: authConfigured ? "OPERATIONAL" : "OFFLINE",
        detail: "Supabase Auth and site URL",
      },
    ];
  }, [health, session]);

  const operationalTone: StatusTone = health?.readiness?.academyOperational ? "OPERATIONAL" : health ? "DEGRADED" : "STANDBY";

  return (
    <main className="zerochill-shell min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="glass-panel-strong rounded-3xl p-6 sm:p-8 lg:p-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_rgba(220,38,38,0.45)]" />
            System Status
            <AcademyHealthIndicator />
          </div>

          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.8rem)] font-black uppercase leading-[0.9] tracking-[-0.08em]">
            Academy System Status
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
            Internal operational overview for authenticated operators. This surface summarizes academy readiness,
            runtime availability, and launch-state diagnostics.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <StatusPill tone={operationalTone} label={operationalTone} />
            <StatusPill tone={session?.sessionActive ? "OPERATIONAL" : "STANDBY"} label={session?.sessionActive ? "SESSION ACTIVE" : "SESSION STANDBY"} />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <article key={card.label} className="terminal-surface rounded-2xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                      {card.label}
                    </div>
                    <div className="mt-2 font-mono text-sm uppercase tracking-[0.1em] text-white">{card.value}</div>
                  </div>
                  <StatusPill tone={card.tone} label={card.tone} />
                </div>
                <div className="mt-3 text-xs leading-5 text-white/60">{card.detail}</div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
            <article className="glass-panel rounded-3xl p-6 sm:p-8">
              <div className="border-b border-white/10 pb-4">
                <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                  Environment Readiness
                </div>
                <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[-0.04em] text-white sm:text-3xl">
                  {health?.readiness?.academyOperational ? "OPERATIONAL" : "DEGRADED"}
                </h2>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["Auth Configured", health?.readiness?.authConfigured ? "YES" : "NO"],
                  ["Webhook Configured", health?.readiness?.webhookConfigured ? "YES" : "NO"],
                  ["Supabase Configured", health?.readiness?.supabaseConfigured ? "YES" : "NO"],
                  ["Runtime Validation Ready", health?.readiness?.runtimeValidationReady ? "YES" : "NO"],
                ].map(([label, value]) => (
                  <div key={label} className="terminal-surface rounded-2xl p-4">
                    <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">{label}</div>
                    <div className="mt-2 font-mono text-sm uppercase tracking-[0.1em] text-white">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-7 text-white/72">
                {health?.warnings?.length ? health.warnings.join(" ") : "No active warnings returned by the health probe."}
              </div>

              <div className="mt-4 grid gap-2">
                <div className="text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">
                  Recommended Actions
                </div>
                <ul className="space-y-2 text-sm leading-6 text-white/70">
                  {health?.recommendedActions?.length ? (
                    health.recommendedActions.map((action) => (
                      <li key={action} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                        <span>{action}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-white/50">No recommended actions.</li>
                  )}
                </ul>
              </div>
            </article>

            <article className="glass-panel-strong rounded-3xl p-6 sm:p-8">
              <div className="border-b border-white/10 pb-4">
                <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                  Operator Commands
                </div>
                <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[-0.04em] text-white sm:text-3xl">
                  Read-only snippets
                </h2>
              </div>

              <div className="mt-5 grid gap-3">
                {commandSnippets.map((command) => (
                  <div key={command} className="terminal-surface rounded-2xl p-4">
                    <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">Command</div>
                    <pre className="mt-2 overflow-x-auto font-mono text-sm leading-7 text-white">
                      <code>{command}</code>
                    </pre>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/academy"
                  className="zerochill-action inline-flex items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-white transition-transform hover:-translate-y-0.5"
                >
                  Back to Deployment Console
                </Link>
                <Link
                  href="/academy/intake"
                  className="zerochill-action inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white"
                >
                  Operator Intake
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
