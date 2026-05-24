import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Success | ZeroChill Co.",
  description: "Post-checkout landing page for Sovereign Zero preorder confirmations.",
  openGraph: {
    title: "Success | ZeroChill Co.",
    description:
      "Checkout completion for Sovereign Zero preorder and launch access purchases.",
    type: "website",
  },
};

export default function SuccessPage() {
  return (
    <main className="zerochill-shell min-h-screen bg-black text-white">
      <section className="zerochill-section mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="glass-panel-strong rounded-3xl p-6 sm:p-8 lg:p-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.64rem] uppercase tracking-[0.46em] text-[color:var(--steel)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_14px_rgba(185,28,28,0.45)]" />
            Checkout complete
          </div>

          <h1 className="mt-6 text-4xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl">
            Thanks for joining the queue.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
            Your Sovereign Zero preorder or launch access purchase has been received. Confirmation, access details,
            and any next-step instructions will be sent to the email address used at checkout.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: "Order confirmation",
                copy: "Payhip will send the receipt and purchase confirmation by email.",
              },
              {
                title: "Access details",
                copy: "Any onboarding, vault, or launch queue instructions will arrive after checkout.",
              },
              {
                title: "Next steps",
                copy: "Watch your inbox for the handoff and keep your confirmation available.",
              },
            ].map((item) => (
              <article key={item.title} className="terminal-surface rounded-2xl p-5">
                <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                  {item.title}
                </div>
                <p className="mt-3 text-sm leading-7 text-white/70">{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="terminal-surface steel-crimson-border mt-8 rounded-2xl p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[0.64rem] uppercase tracking-[0.42em] text-[color:var(--steel)]">
                  Launch queue
                </div>
                <div className="mt-2 font-mono text-sm uppercase tracking-[0.2em] text-white">
                  Confirmation and access email pending delivery
                </div>
              </div>
              <span className="rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--accent)]/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[color:var(--accent)]">
                Active
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="zerochill-button inline-flex items-center justify-center border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white"
            >
              Return to ZeroChill
            </Link>
            <Link
              href="/preorder"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--steel)] transition-colors hover:border-[color:var(--accent)]/60 hover:text-white"
            >
              Review Preorder
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
