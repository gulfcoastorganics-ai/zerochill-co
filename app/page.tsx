import type { Metadata } from "next";
import type { ReactNode } from "react";
import InquiryForm from "@/components/InquiryForm";

const systems = [
  {
    icon: "01",
    badge: "SecureOps Live",
    title: "Operator-grade security dashboards",
    copy: "AppSec visibility, deployment control, and live system state in one clean interface.",
    bullets: ["Threat surfaces at a glance", "Role-aware operator panels", "Audit-ready status views"],
  },
  {
    icon: "02",
    badge: "Startup Infrastructure",
    title: "Foundations for fast-moving teams",
    copy: "Production-ready startup systems that reduce drift and keep the launch path explicit.",
    bullets: ["Launch-ready stack architecture", "Environment and release planning", "Internal tooling for repeatable ops"],
  },
  {
    icon: "03",
    badge: "Mobile-First UX",
    title: "Interfaces that hold up on smaller screens",
    copy: "Responsive layouts, clean type, and touch-friendly controls built for real-world usage.",
    bullets: ["Readable card scaling", "Stacked CTA behavior", "Low-friction mobile navigation"],
  },
  {
    icon: "04",
    badge: "Backend/API Workflows",
    title: "Request flows that stay predictable",
    copy: "Backend and API systems designed for dependable handoffs, integrations, and internal automation.",
    bullets: ["Endpoint planning", "Integration mapping", "Operational request flow design"],
  },
  {
    icon: "05",
    badge: "Cinematic Branding",
    title: "Infrastructure identity with presence",
    copy: "A dark, premium visual system that makes technical work feel deliberate and launch-ready.",
    bullets: ["Premium motion cues", "Infra-inspired visual language", "High-contrast studio polish"],
  },
];

const hardwarePrinciples = [
  {
    title: "Constrained-environment engineering",
    copy: "Build for lightweight hardware, tight budgets, and real deployment constraints instead of idealized demos.",
  },
  {
    title: "Efficient builds",
    copy: "Keep the stack lean so shipping stays fast, maintainable, and easier to debug under pressure.",
  },
  {
    title: "Rapid deployment",
    copy: "Design for quick rollout paths, clear handoffs, and low-friction production movement.",
  },
  {
    title: "Optimization-first mindset",
    copy: "Treat performance, clarity, and operational simplicity as requirements, not afterthoughts.",
  },
];

const offers = [
  {
    title: "MVP Infrastructure Stack",
    price: "starting at $750",
    copy: "Core product scaffolding, deployment basics, and a practical operating foundation.",
  },
  {
    title: "Operator Dashboard Systems",
    price: "starting at $1,500",
    copy: "Control panels, status layers, and internal tooling for operators and team leads.",
  },
  {
    title: "Backend/API Systems",
    price: "starting at $1,000",
    copy: "Reliable endpoints, request flows, integrations, and backend structure for real work.",
  },
  {
    title: "Security UX & Visualization",
    price: "custom",
    copy: "Visualized security signals, secure workflow UX, and AppSec-forward interface systems.",
  },
];

const credibilityPoints = [
  "Live deployments",
  "AppSec/operator concepts",
  "Backend workflows",
  "Mobile-first UX",
  "SecureOps Live as flagship project",
];

export const metadata: Metadata = {
  title: "GulfCoast Labs | Operational Startup Systems",
  description:
    "GulfCoast Labs builds operational startup systems, AppSec dashboards, backend infrastructure, deployment UX, and cinematic infrastructure branding.",
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

function CtaLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-full border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black transition-transform hover:-translate-y-0.5"
      : "inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-[color:var(--accent)]/60 hover:text-white";

  return <a href={href} className={className}>{children}</a>;
}

export default function Home() {
  return (
    <main className="zerochill-shell overflow-x-clip bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 zerochill-grid-overlay" />
        <div className="pointer-events-none absolute inset-0 zerochill-scanlines" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-18 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.64rem] uppercase tracking-[0.46em] text-[color:var(--steel)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_rgba(96,165,250,0.45)]" />
              GulfCoast Labs
            </div>
            <h1 className="mt-6 text-5xl font-black uppercase leading-[0.86] tracking-[-0.08em] sm:text-7xl lg:text-[clamp(4.6rem,8.5vw,8.8rem)]">
              Operational startup systems built for speed.
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-white/70 sm:text-lg">
              AppSec dashboards, backend infrastructure, deployment systems, and cinematic operator-grade UX built
              on lightweight hardware.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="#contact">Start a Project</CtaLink>
              <CtaLink href="#systems" variant="secondary">
                View Systems
              </CtaLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-[0.64rem] uppercase tracking-[0.34em] text-[color:var(--steel)]">
              {["AppSec", "Backend APIs", "Deployment UX", "Studio Branding"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/50 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-[0.64rem] uppercase tracking-[0.48em] text-[color:var(--steel)]">
                  Studio signal
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.22em] text-white/80">
                  Infrastructure / security / deployment
                </div>
              </div>
              <span className="rounded-full border border-[color:var(--accent)]/35 bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--accent)]">
                READY
              </span>
            </div>
            <div className="mt-5 grid gap-3 text-sm leading-7 text-white/70">
              {[
                "Built for small teams that need operational clarity.",
                "Designed to ship on modest hardware without heavy overhead.",
                "Structured for live systems, not portfolio theater.",
                "Visual language stays dark, premium, and readable.",
              ].map((line) => (
                <div key={line} className="flex gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="systems" className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <SectionTitle
          eyebrow="Systems"
          title="Five production lanes for teams that need real infrastructure."
          copy="Each system is packaged to reduce noise, improve visibility, and turn technical work into something the client can actually run."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {systems.map((system, index) => (
            <article
              key={system.title}
              className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-6"
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
                <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(96,165,250,0.85),transparent)]" />
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

      <section className="mx-auto max-w-7xl border-b border-white/10 px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionTitle
            eyebrow="Lightweight hardware"
            title="Built on constrained environments and efficient delivery."
            copy="The differentiator is not just the interface. It is the ability to engineer for modest hardware, keep builds efficient, deploy quickly, and optimize the path before the rest of the stack gets heavier."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {hardwarePrinciples.map((item, index) => (
              <article
                key={item.title}
                className="zerochill-card rounded-3xl border border-white/10 bg-black/50 p-5"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[color:var(--accent)] shadow-[0_0_12px_rgba(96,165,250,0.35)]" />
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
          eyebrow="Work With GulfCoast Labs"
          title="Scoped offers for teams that want a clear starting point."
          copy="These packages are designed to move quickly, keep scope practical, and leave room for complexity when the build requires it."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {offers.map((offer, index) => (
            <article
              key={offer.title}
              className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-6"
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
          <article className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="border-b border-[color:var(--accent)]/70 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
              Credibility
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white">
              Proof points that match the work.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              GulfCoast Labs is built around live delivery, operator thinking, and systems that stay legible after
              launch.
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

          <article className="zerochill-card rounded-3xl border border-white/10 bg-black/50 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                Flagship project
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.26em] text-white/70">
                SecureOps Live
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Live deployment posture",
                "AppSec operator concepts",
                "Backend workflow systems",
                "Mobile-first UX delivery",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                    Signal
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white">{item}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-white/70">
              SecureOps Live is the flagship system expression: clean visibility, operator-grade status, and
              infrastructure presentation that feels ready for production.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <SectionTitle
          eyebrow="Work with us"
          title="Start the project conversation."
          copy="Send the essentials and we’ll use the details to shape scope, timing, and the right delivery path."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="zerochill-card rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="border-b border-white/10 pb-3 text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
              Inquiry notes
            </div>
            <ul className="mt-4 space-y-4">
              {[
                "Name the system you want built, not just the page you want changed.",
                "Tell us whether this needs AppSec, backend logic, deployment support, or brand direction.",
                "Mention your timeline so scope can be matched to the delivery window.",
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
