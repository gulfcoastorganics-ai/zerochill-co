import Link from "next/link";
import { cookies } from "next/headers";
import AcademyHealthIndicator from "@/components/AcademyHealthIndicator";
import { getAccessTokenFromCookieStore, getUserFromAccessToken } from "@/lib/academyAuth";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

type AcademyProfile = {
  email: string;
  tier: number;
  academy_access: boolean;
  access_key: string;
};

type OrchestrationCard = {
  title: string;
  description: string;
};

const orchestrationCards: OrchestrationCard[] = [
  {
    title: "Agent Runtime",
    description: "Reserved for local agent lifecycles, task execution, and runtime boundaries.",
  },
  {
    title: "Workflow Matrix",
    description: "Maps operator workflows into deterministic orchestration paths.",
  },
  {
    title: "Live Parsing",
    description: "Tracks incoming signals, runtime events, and structured operator telemetry.",
  },
  {
    title: "Autonomous Tasks",
    description: "Allocates action queues once workflow proof is established.",
  },
  {
    title: "Bottleneck Resolution",
    description: "Identifies execution friction and prepares escalation lanes.",
  },
];

function StatusBadge({ state }: { state: "LOCKED" | "STANDBY" }) {
  const isActive = state === "STANDBY";

  return (
    <span
      className={
        isActive
          ? "inline-flex items-center rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--accent-soft)]"
          : "inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--steel)]"
      }
    >
      {state}
    </span>
  );
}

function OrchestrationCard({
  title,
  description,
  state,
}: OrchestrationCard & { state: "LOCKED" | "STANDBY" }) {
  return (
    <article className="glass-panel rounded-3xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="text-[0.64rem] uppercase tracking-[0.32em] text-[color:var(--steel)]">Tier 2</div>
          <h3 className="mt-2 text-xl font-semibold uppercase tracking-[-0.04em] text-white sm:text-2xl">{title}</h3>
        </div>
        <StatusBadge state={state} />
      </div>
      <p className="mt-4 text-sm leading-7 text-white/70">{description}</p>
    </article>
  );
}

export default async function OrchestrationConsolePage() {
  const cookieStore = await cookies();
  const accessToken = getAccessTokenFromCookieStore(cookieStore);
  const user = accessToken ? await getUserFromAccessToken(accessToken) : null;
  const email = user?.email?.trim().toLowerCase() ?? "";

  let profile: AcademyProfile | null = null;

  if (email) {
    const supabase = getSupabaseAdminClient();
    const { data } = await supabase
      .from("academy_profiles")
      .select("email, tier, academy_access, access_key")
      .eq("email", email)
      .maybeSingle();

    profile = (data as AcademyProfile | null) ?? null;
  }

  const tier = profile?.tier ?? 0;
  const isUnlocked = tier >= 2;
  const cardState: "LOCKED" | "STANDBY" = isUnlocked ? "STANDBY" : "LOCKED";

  return (
    <main className="zerochill-shell min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="glass-panel-strong rounded-3xl p-6 sm:p-8 lg:p-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_rgba(220,38,38,0.45)]" />
            Tier 2 / Orchestration Console
            <AcademyHealthIndicator />
          </div>

          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.8rem)] font-black uppercase leading-[0.9] tracking-[-0.08em]">
            Orchestration Console
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
            Multi-agent workflow systems unlock after Tier 1 runtime validation.
          </p>

          {isUnlocked ? (
            <div className="mt-6 rounded-2xl border border-[color:var(--accent)]/25 bg-[color:var(--accent)]/8 p-4 text-sm leading-7 text-[color:var(--accent-soft)]">
              Orchestration Access Initialized.
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/72">
              Tier 2 remains locked until Local Runtime Verification is completed.
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
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

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="terminal-surface rounded-2xl p-4">
              <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">Session</div>
              <div className="mt-2 font-mono text-sm uppercase tracking-[0.08em] text-white">
                {user ? "ACTIVE" : "INACTIVE"}
              </div>
            </div>
            <div className="terminal-surface rounded-2xl p-4">
              <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">
                Operator Email
              </div>
              <div className="mt-2 break-words font-mono text-[0.82rem] leading-6 text-white sm:text-sm">
                {profile?.email ?? email ?? "UNRESOLVED"}
              </div>
            </div>
            <div className="terminal-surface rounded-2xl p-4">
              <div className="text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--steel)]">Current Tier</div>
              <div className="mt-2 font-mono text-sm uppercase tracking-[0.08em] text-white">
                {profile?.tier ? `TIER ${profile.tier}` : "TIER 0"}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {orchestrationCards.map((card) => (
            <OrchestrationCard key={card.title} {...card} state={cardState} />
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="glass-panel rounded-3xl p-6 sm:p-8">
            <div className="border-b border-white/10 pb-4">
              <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">Operator Profile</div>
              <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[-0.04em] text-white sm:text-3xl">
                {isUnlocked ? "Tier 2 Standby" : "Tier 2 Locked"}
              </h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="terminal-surface rounded-2xl p-4">
                <div className="text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">Email</div>
                <div className="mt-2 break-words font-mono text-sm text-white">{profile?.email ?? "UNRESOLVED"}</div>
              </div>
              <div className="terminal-surface rounded-2xl p-4">
                <div className="text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--steel)]">Tier</div>
                <div className="mt-2 font-mono text-sm uppercase tracking-[0.1em] text-white">
                  {profile?.tier ? `TIER ${profile.tier}` : "LOCKED"}
                </div>
              </div>
            </div>
          </article>

          <article className="glass-panel-strong rounded-3xl p-6 sm:p-8">
            <div className="border-b border-white/10 pb-4">
              <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">Access State</div>
              <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[-0.04em] text-white sm:text-3xl">
                {isUnlocked ? "Initialized" : "Awaiting Verification"}
              </h2>
            </div>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-white/72">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <span>{isUnlocked ? "Tier 2 access is unlocked for orchestration scaffolding." : "Tier 2 remains gated until runtime proof is recorded."}</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <span>Agent execution is not enabled yet. This page is only the scaffold layer.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <span>Operator-controlled local runtime stays the prerequisite for future workflow systems.</span>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
