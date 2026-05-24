import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import InquiryForm from "@/components/InquiryForm";
import { getLaunchTarget, isExternalLaunchHref, launchFallbackHref } from "@/lib/launchLinks";

const systems = [
  {
    icon: "01",
    badge: "Local Inference",
    title: "Private node deployment",
    copy: "Ship models onto controlled hardware with predictable operator handoff and no consumer wrapper layer.",
    bullets: ["Edge-first execution paths", "Hardware-bound rollout planning", "Low-drift system state"],
  },
  {
    icon: "02",
    badge: "Telemetry Isolation",
    title: "Separated signal planes",
    copy: "Keep operational telemetry, client visibility, and public surfaces distinct so the stack stays legible under pressure.",
    bullets: ["Role-aware visibility", "Telemetry segmentation", "Audit-ready status views"],
  },
  {
    icon: "03",
    badge: "Deployment Control",
    title: "Launch orchestration surfaces",
    copy: "Coordinate releases, handoffs, and rollout states with a command-center interface instead of a startup dashboard.",
    bullets: ["Operator task routing", "Release gate state", "Deployment queue control"],
  },
  {
    icon: "04",
    badge: "Edge Inference",
    title: "Localized execution fabric",
    copy: "Design for edge inference, constrained environments, and the realities of offline or partially connected deployments.",
    bullets: ["Constrained hardware planning", "Offline-tolerant systems", "Regional inference layers"],
  },
  {
    icon: "05",
    badge: "Zero-State Matrix",
    title: "Sovereign command language",
    copy: "Present the platform as operational infrastructure: dark, precise, and built to make machine state readable at a glance.",
    bullets: ["Terminal overlays", "Status-forward UI", "Enterprise hierarchy"],
  },
];

const deploymentPrinciples = [
  {
    title: "Sovereign by design",
    copy: "Treat deployment boundaries, local execution, and operator control as first-class system requirements.",
  },
  {
    title: "Telemetry isolation",
    copy: "Keep the observability path clean so status stays useful without leaking unnecessary surface area.",
  },
  {
    title: "Efficient builds",
    copy: "Keep the stack lean so shipping stays fast, maintainable, and easier to debug under pressure.",
  },
  {
    title: "Operational uptime",
    copy: "Build around predictable release movement, clear handoffs, and infrastructure that can be trusted in production.",
  },
];

const offers = [
  {
    title: "Sovereign Node Stack",
    price: "starting at $750",
    copy: "Deployment scaffolding, baseline monitoring, and launch-ready infrastructure surfaces.",
  },
  {
    title: "Operator Command Console",
    price: "starting at $1,500",
    copy: "Control panels, telemetry views, and internal tooling for operational teams.",
  },
  {
    title: "Edge Inference Workflow",
    price: "starting at $1,000",
    copy: "Reliable request flows, integrations, and inference handoffs for local systems.",
  },
  {
    title: "Zero-State Matrix UI",
    price: "custom",
    copy: "Infrastructure presentation, secure workflow UX, and a hardened visual system for private AI deployments.",
  },
];

const credibilityPoints = [
  "Localized deployment planning",
  "Telemetry-isolated surfaces",
  "Edge inference concepts",
  "Operator-grade workflow design",
  "Sovereign Zero as flagship hardware path",
];

const launchTargets = [
  {
    target: getLaunchTarget("sovereignZero"),
    title: "Sovereign Zero preorder",
    eyebrow: "Hardware queue",
    copy: "Reserve the operator-owned hardware path for private deployment and localized intelligence.",
    bullets: ["Payhip checkout handoff", "Local deployment posture", "Private infrastructure ownership"],
  },
  {
    target: getLaunchTarget("matrixAccess"),
    title: "Matrix access",
    eyebrow: "Control layer",
    copy: "Join the launch queue for operator access, release state, and deployment readiness.",
    bullets: ["Launch queue access", "Signal-plane separation", "Operational readiness tracking"],
  },
] as const;

export const metadata: Metadata = {
  title: "ZeroChill Co. | Sovereign AI Infrastructure",
  description:
    "ZeroChill Co. builds sovereign AI infrastructure, localized deployment systems, telemetry-isolated operator tools, and edge inference surfaces.",
  openGraph: {
    title: "ZeroChill Co. | Sovereign AI Infrastructure",
    description:
      "Localized deployment, edge inference, telemetry isolation, and the Zero-State Matrix for private AI operations.",
    type: "website",
  },
};

function SectionTitle({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[0.64rem] uppercase tracking-[0.5em] text-[color:var(--steel)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-pretty text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
        {copy}
      </p>
    </div>
  );
}

function ActionButton({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const className =
    variant === "primary"
      ? "zerochill-button zerochill-action inline-flex items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white sm:tracking-[0.22em]"
      : "zerochill-action inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white sm:tracking-[0.22em]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function LaunchSignalCard({
  target,
  title,
  eyebrow,
  copy,
  bullets,
}: {
  target: (typeof launchTargets)[number]["target"];
  title: string;
  eyebrow: string;
  copy: string;
  bullets: readonly string[];
}) {
  const usingFallback = target.href === launchFallbackHref;

  return (
    <article className="glass-panel rounded-3xl p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
            {eyebrow}
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
        </div>
        <span className="rounded-full border border-[color:var(--accent)]/35 bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--accent)]">
          {usingFallback ? "Queue local" : target.status}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/70">{copy}</p>

      <ul className="mt-5 space-y-3 border-t border-white/10 pt-4">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-6 text-white/75">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <ActionButton href={target.href} external={isExternalLaunchHref(target.href)}>
          {target.label}
        </ActionButton>
        <ActionButton href="#contact" variant="secondary">
          Operator Intake
        </ActionButton>
      </div>
    </article>
  );
}

export default function Home() {
  const sovereignZero = launchTargets[0].target;
  const matrixAccess = launchTargets[1].target;

  return (
    <main className="zerochill-shell overflow-x-clip bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 zerochill-hero-wallpaper" />
        <div className="pointer-events-none absolute inset-0 zerochill-grid-overlay zerochill-hero-grid-overlay" />
        <div className="pointer-events-none absolute inset-0 zerochill-scanlines zerochill-hero-scanlines" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(220,38,38,0.08),transparent_30%),linear-gradient(180deg,rgba(6,10,16,0.08)_0%,rgba(6,10,16,0.18)_58%,rgba(6,10,16,0.3)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-18 sm:px-8 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.64rem] uppercase tracking-[0.46em] text-[color:var(--steel)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_rgba(220,38,38,0.45)]" />
              ZeroChill Co. / Sovereign Zero
            </div>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[0.86] tracking-[-0.08em] sm:text-7xl lg:text-[clamp(4.4rem,8.2vw,8.6rem)]">
              Sovereign AI infrastructure for localized deployment.
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-white/70 sm:text-lg">
              Edge inference, private deployment systems, telemetry isolation, and command-center tooling built for
              operators who need the platform to feel hardened, not consumer-facing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ActionButton href="#launch-access">View Launch Access</ActionButton>
              <ActionButton href="/preorder" variant="secondary">
                Sovereign Zero Preorder
              </ActionButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-[0.64rem] uppercase tracking-[0.34em] text-[color:var(--steel)]">
              {["Private Infrastructure", "Edge Inference", "Telemetry Isolation", "Zero-State Matrix"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel-strong rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-[0.64rem] uppercase tracking-[0.48em] text-[color:var(--steel)]">
                  Command signal
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.22em] text-white/80">
                  Private AI / edge / deployment
                </div>
              </div>
              <span className="rounded-full border border-[color:var(--accent)]/35 bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--accent)]">
                ONLINE
              </span>
            </div>

            <div className="mt-5 grid gap-3 text-sm leading-7 text-white/70">
              {[
                "Telemetry stays isolated from the public surface.",
                "Deployment stays centered on local control and uptime.",
                "The Matrix keeps operator state readable at a glance.",
                "The interface stays dark, precise, and production-grade.",
              ].map((line) => (
                <div key={line} className="terminal-surface flex gap-3 rounded-2xl p-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                  <span>{line}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Edge", "Local"],
                ["Telemetry", "Isolated"],
                ["Mode", "Operator"],
                ["Queue", "Ready"],
              ].map(([label, value]) => (
                <div key={label} className="glass-card min-w-0 rounded-2xl p-3 sm:p-4">
                  <div className="text-[0.58rem] uppercase leading-none tracking-[0.28em] text-[color:var(--steel)] sm:text-[0.64rem] sm:tracking-[0.34em]">
                    {label}
                  </div>
                  <div className="mt-2 font-mono text-[0.72rem] uppercase leading-none tracking-[0.1em] text-white sm:text-sm sm:tracking-[0.14em]">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="systems" className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <SectionTitle
          eyebrow="Operational lanes"
          title="A sovereign interface architecture for private deployment."
          copy="Each lane keeps the platform readable under pressure: node deployment, telemetry isolation, launch control, edge execution, and the Zero-State Matrix view."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {systems.map((system, index) => (
            <article
              key={system.title}
              className="glass-card rounded-3xl p-6"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 font-mono text-sm uppercase tracking-[0.18em] text-[color:var(--accent)]">
                    {system.icon}
                  </div>
                  <div>
                    <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                      {system.badge}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">
                      {system.title}
                    </h3>
                  </div>
                </div>
                <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(220,38,38,0.85),transparent)]" />
              </div>
              <p className="mt-4 text-sm leading-7 text-white/70">{system.copy}</p>
              <ul className="mt-5 space-y-3 border-t border-white/10 pt-4">
                {system.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-6 text-white/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        id="launch-access"
        className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10"
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionTitle
            eyebrow="Launch access"
            title="Queue entry for Sovereign Zero and the Zero-State Matrix."
          copy="This local anchor routes preorder traffic. Live Payhip links go straight to checkout. Missing URLs fall back to the sovereign panel."
          />
          <div className="grid gap-4">
            {launchTargets.map((entry) => (
              <LaunchSignalCard
                key={entry.title}
                target={entry.target}
                title={entry.title}
                eyebrow={entry.eyebrow}
                copy={entry.copy}
                bullets={entry.bullets}
              />
            ))}
          </div>
        </div>

        <div className="terminal-surface mt-6 rounded-3xl p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                Launch routing
              </div>
              <div className="mt-2 font-mono text-sm uppercase tracking-[0.2em] text-white">
                {sovereignZero.href === launchFallbackHref || matrixAccess.href === launchFallbackHref
                  ? "Local launch panel active"
                  : "Payhip routes connected"}
              </div>
            </div>
            <span className="rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--accent)]">
              {sovereignZero.href === launchFallbackHref || matrixAccess.href === launchFallbackHref
                ? "Fallback"
                : "Armed"}
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-white/68">
            The shared launch config keeps checkout URLs centralized. If an environment variable is missing, the
            UI resolves to this local section instead of exposing a broken CTA.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionTitle
            eyebrow="Deployment posture"
            title="Built for constrained environments and efficient delivery."
          copy="The interface is designed for operators who need a fast path from plan to rollout without generic SaaS clutter."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {deploymentPrinciples.map((item, index) => (
              <article
                key={item.title}
                className="glass-card rounded-3xl p-5"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_rgba(220,38,38,0.35)]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <SectionTitle
          eyebrow="Work with ZeroChill"
          title="Scoped offers for teams that want a clear starting point."
          copy="These engagement paths stay practical: enough structure to move quickly, with room for heavier systems when needed."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {offers.map((offer, index) => (
            <article
              key={offer.title}
              className="glass-card rounded-3xl p-6"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                    Service offer
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-white">
                    {offer.title}
                  </h3>
                </div>
                <div className="rounded-full border border-[color:var(--accent)]/35 bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  {offer.price}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/70">{offer.copy}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-7 text-white/60">
          Final scope depends on complexity, integrations, timeline, and deployment requirements.
        </p>
      </section>

      <section className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <article className="glass-panel rounded-3xl p-6 sm:p-8">
            <div className="border-b border-[color:var(--accent)]/70 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
              Credibility
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
              Proof points that match the work.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              ZeroChill Co. is built around operator thinking, private deployment clarity, and systems that stay
              legible after launch.
            </p>
            <ul className="mt-5 space-y-4 border-t border-white/10 pt-4">
              {credibilityPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-7 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="glass-panel-strong rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                Flagship project
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.26em] text-white/70">
                Sovereign Zero
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Operator-owned hardware path",
                "Localized inference posture",
                "Telemetry-isolated surfaces",
                "Private deployment readiness",
              ].map((item) => (
                <div key={item} className="glass-card rounded-2xl p-4">
                  <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                    Signal
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white">{item}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-white/70">
              Sovereign Zero is the flagship hardware line: private deployment, local execution, and a controlled
              intelligence surface that feels closer to infrastructure software than a consumer AI product.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <SectionTitle
          eyebrow="Operator intake"
          title="Start the project conversation."
          copy="Send the essentials and we’ll use the details to shape scope, timing, and delivery path."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="glass-panel rounded-3xl p-6 sm:p-8">
            <div className="border-b border-white/10 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
              Intake notes
            </div>
            <ul className="mt-4 space-y-4">
              {[
                "Name the system you want built, not just the page you want changed.",
                "Tell us whether this needs edge inference, deployment support, or brand direction.",
                "Mention your timeline so scope matches the delivery window.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-white/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <InquiryForm />
        </div>
      </section>
    </main>
  );
}
