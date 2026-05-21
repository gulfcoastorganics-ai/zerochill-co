import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import TerminalCard from '../components/ui/TerminalCard';

const options = [
  {
    label: '$1,500 continuation',
    unlocks: [
      'Domain registration and ownership setup',
      'Database foundation for submissions and review records',
      'Email and domain verification',
      'Product asset continuation and focused development',
    ],
  },
  {
    label: '$5,000 production expansion',
    unlocks: [
      'Everything in the continuation tier',
      'Expanded product assets and launch materials',
      'More complete review and handoff workflows',
      'More development capacity for the next phase',
    ],
  },
  {
    label: 'Custom rollout',
    unlocks: [
      'Scope defined with Danny Ford before execution',
      'Tailored platform, content, and operational work',
      'Phase planning matched to actual requirements',
      'Agreement-driven timeline and deliverables',
    ],
  },
];

const completedWork = [
  'Public site is deployed and operational.',
  'Dedicated product pages are live.',
  'Mission control, topology, and admin review systems are in place.',
  'Preorder and email notification workflows are implemented.',
];

const requiredReasons = [
  'The bootstrap phase has reached its practical limit.',
  'The next phase needs owned domain infrastructure and verification.',
  'Funding is required to add database-backed records and continue development.',
  'The current site is strong, but it is not yet the full operating platform.',
];

export default function FundingSummary() {
  return (
    <>
      <Seo
        title="Funding Summary"
        description="Private funding summary for ZeroChill continuation planning."
      />

      <section className="funding-summary-page grid gap-5">
        <div className="funding-summary-toolbar flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Private funding summary
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
              ZeroChill continuation
            </h1>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="funding-summary-print-hide zc-button-secondary border border-[color:var(--line)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
          >
            Print / Save PDF
          </button>
        </div>

        <Panel className="p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Client summary
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-4xl">
              Phase 2 requires funded continuation.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">
              Danny Ford is reviewing the next step. The platform is built, live, and credible. The remaining work is the budget that carries it into the next operational phase.
            </p>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <TerminalCard
            label="Current status"
            title="Build status"
            body="Live site, routed product pages, mission control, review surfaces, and email notification handling are already in place."
          >
            <div className="mt-5 grid gap-3 border-t border-[color:var(--line-soft)] pt-4">
              {[
                ['Site', 'Deployed and operational'],
                ['Scope', 'Frontend complete / backend pending'],
                ['Support', 'Notification-only email flow'],
                ['Next phase', 'Owned infrastructure and continued development'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] px-4 py-3">
                  <span className="text-[0.66rem] uppercase tracking-[0.26em] text-[color:var(--text-faint)]">
                    {label}
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text)]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </TerminalCard>

          <Panel className="p-6">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Decision needed
            </div>
            <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">
              Danny Ford should choose the next phase budget and confirm whether the build continues now or pauses at the current bootstrap state.
            </p>
            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4">
                <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                  Recommended next step
                </div>
                <div className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  Approve the $1,500 continuation to cover domain, database, verification, assets, and focused development.
                </div>
              </div>
              <div className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4">
                <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                  What it unlocks
                </div>
                <div className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  The next phase can move from presentation-layer completion into owned infrastructure and operational continuity.
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <TerminalCard
            label="Completed work"
            title="What has been built"
            body="The current platform already carries the core brand and product story."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-muted)]">
              {completedWork.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-soft)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </TerminalCard>

          <TerminalCard
            label="Why funding is needed"
            title="Why the next phase matters"
            body="The platform needs the infrastructure layer that turns a strong frontend into a funded operating asset."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-muted)]">
              {requiredReasons.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-soft)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </TerminalCard>
        </div>

        <section className="grid gap-5">
          <Panel className="p-6">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Requested next-step options
            </div>
            <div className="mt-4 grid gap-5 lg:grid-cols-3">
              {options.map((option) => (
                <div key={option.label} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4">
                  <div className="text-sm font-medium text-[color:var(--text)]">{option.label}</div>
                  <div className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">What this unlocks</div>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--text-muted)]">
                    {option.unlocks.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-soft)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className="funding-summary-print-hide">
          <Panel className="p-6">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Next approval
            </div>
            <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">
              Danny Ford needs to approve the continuation tier or request a scoped custom rollout review before the next phase starts.
            </p>
          </Panel>
        </section>

        <div className="funding-summary-print-hide flex flex-wrap gap-3">
          <Link
            to="/review"
            className="zc-button-secondary border border-[color:var(--line)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
          >
            Back to review
          </Link>
          <Link
            to="/manifest"
            className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
          >
            Return to site
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
