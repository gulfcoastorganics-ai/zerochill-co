import { cookies } from "next/headers";
import type { ReactNode } from "react";
import Link from "next/link";
import AcademyHealthIndicator from "@/components/AcademyHealthIndicator";
import { getAccessTokenFromCookieStore, getUserFromAccessToken } from "@/lib/academyAuth";
import { getSupabaseAdminClient } from "@/lib/supabaseAdmin";

const requiredTools = [
  "Android device, laptop, or local workstation",
  "Termux for Android operators",
  "Ollama for local inference",
  "Supported local model",
  "Browser with localhost access",
];

const checklist = [
  "Install Termux or prepare a local terminal",
  "Install Ollama",
  "Pull first model",
  "Start Ollama runtime",
  "Confirm localhost endpoint",
  "Return to deployment console",
];

const commandCards = ["ollama serve", "ollama pull mistral", "curl http://localhost:11434/api/tags"];

function SectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="glass-panel rounded-3xl p-6 sm:p-8">
      <div className="border-b border-white/10 pb-4">
        <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">{eyebrow}</div>
        <h2 className="mt-3 text-2xl font-semibold uppercase tracking-[-0.04em] text-white sm:text-3xl">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </article>
  );
}

type AcademyProfile = {
  email: string;
  tier: number;
  academy_access: boolean;
};

export default async function AcademyIntakePage() {
  const cookieStore = await cookies();
  const accessToken = getAccessTokenFromCookieStore(cookieStore);
  const user = accessToken ? await getUserFromAccessToken(accessToken) : null;
  const email = user?.email?.trim().toLowerCase() ?? "";

  let profile: AcademyProfile | null = null;

  if (email) {
    const supabase = getSupabaseAdminClient();
    const { data } = await supabase
      .from("academy_profiles")
      .select("email, tier, academy_access")
      .eq("email", email)
      .maybeSingle();

    profile = (data as AcademyProfile | null) ?? null;
  }

  return (
    <main className="zerochill-shell min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="glass-panel-strong rounded-3xl p-6 sm:p-8 lg:p-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_rgba(220,38,38,0.45)]" />
            Operator Intake
            <AcademyHealthIndicator />
          </div>

          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.8rem)] font-black uppercase leading-[0.9] tracking-[-0.08em]">
            Operator Intake
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
            Prepare your local node for sovereign runtime validation.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">
            Validation runs against your local Ollama endpoint. No model files are uploaded.
          </p>

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

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/academy"
              className="zerochill-action inline-flex items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-white transition-transform hover:-translate-y-0.5"
            >
              Open Deployment Console
            </Link>
            <Link
              href="/login"
              className="zerochill-action inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white"
            >
              Access Gate
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <SectionCard eyebrow="A. Welcome Operator" title="Functional infrastructure, not passive completion.">
            <p className="text-sm leading-7 text-white/70">
              This environment verifies that the operator can stand up a local runtime, prove generation, and earn
              access through infrastructure behavior rather than static content consumption.
            </p>
          </SectionCard>

          <SectionCard eyebrow="B. Local-First Philosophy" title="Private runtime, operator-controlled deployment.">
            <ul className="grid gap-3 text-sm leading-7 text-white/70">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <span>Local inference stays on the operator’s machine.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <span>Private runtime keeps the validation loop isolated.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <span>No mandatory centralized cloud dependency is required for Tier 1.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                <span>Deployment remains under operator control.</span>
              </li>
            </ul>
          </SectionCard>

          <SectionCard eyebrow="C. Required Tools" title="Core operator stack.">
            <ul className="grid gap-3 text-sm leading-7 text-white/70">
              {requiredTools.map((tool) => (
                <li key={tool} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard eyebrow="D. Install Checklist" title="Prepare the local node.">
            <div className="grid gap-3">
              {checklist.map((item, index) => (
                <div key={item} className="terminal-surface flex items-center gap-3 rounded-2xl p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[color:var(--accent)]/35 bg-[color:var(--accent)]/10 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--accent)]">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-6 text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard eyebrow="E. Runtime Launch Commands" title="Command cards.">
            <div className="grid gap-3">
              {commandCards.map((command) => (
                <div key={command} className="terminal-surface rounded-2xl border border-white/10 p-4">
                  <div className="text-[0.62rem] uppercase tracking-[0.3em] text-[color:var(--steel)]">Command</div>
                  <pre className="mt-2 overflow-x-auto font-mono text-sm leading-7 text-white">
                    <code>{command}</code>
                  </pre>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard eyebrow="F. Open Deployment Console" title="Return to validation.">
            <p className="text-sm leading-7 text-white/70">
              Complete the checklist, launch the runtime, then return to the deployment console to run the Tier 1
              validation gate.
            </p>
            <div className="mt-5">
              <Link
                href="/academy"
                className="zerochill-button zerochill-action inline-flex items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] leading-tight text-white transition-transform hover:-translate-y-0.5"
              >
                Open Deployment Console
              </Link>
            </div>
          </SectionCard>
        </div>
      </section>
    </main>
  );
}
