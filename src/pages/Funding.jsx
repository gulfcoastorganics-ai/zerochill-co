import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import SectionHeader from '../components/ui/SectionHeader';
import TerminalCard from '../components/ui/TerminalCard';

const phaseOptions = [
  {
    label: 'Starter continuation',
    budget: '$1,500',
    deliverables: [
      'Domain registration and renewal setup',
      'Database layer for intake and review records',
      'Email and domain verification for client-facing delivery',
      'Product asset production for launch continuity',
      'Focused development pass on the current site',
    ],
    timeline: '1-2 weeks',
  },
  {
    label: 'Production expansion',
    budget: '$5,000',
    deliverables: [
      'Everything in Starter continuation',
      'Expanded product detail assets and sales materials',
      'Improved deployment and review workflows',
      'More complete client handoff package',
      'Additional development capacity for the next build cycle',
    ],
    timeline: '2-4 weeks',
  },
  {
    label: 'Full operational rollout',
    budget: 'Custom',
    deliverables: [
      'Phase definition based on final scope',
      'Expanded content and product launch system',
      'Coordination for operational, delivery, and follow-on work',
      'Tailored implementation timeline and milestones',
      'Scoped work across design, content, and platform layers',
    ],
    timeline: 'Scoped per agreement',
  },
];

const decisionPoints = [
  'Approve the continuation budget and phase tier.',
  'Confirm the domain and identity requirements for public delivery.',
  'Decide whether the next phase should prioritize product assets or platform plumbing first.',
  'Set the next review date and the expected handoff format.',
];

const risksIfPaused = [
  'The public site remains operational, but the platform stops advancing beyond the current frontend layer.',
  'Domain, email, and database work will remain deferred, which limits investor and client confidence.',
  'Product storytelling can stay visible, but it will not be backed by the next phase of delivery work.',
];

export default function Funding() {
  return (
    <>
      <Seo
        title="Funding Continuation"
        description="ZeroChill Co continuation proposal for domain, database, email verification, product assets, and continued development."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          eyebrow="Funding continuation"
          title="Phase 2 is now a funded build."
          copy="The zero-capital bootstrap phase has reached its practical limit. The site is live and operational, and the next phase needs explicit funding to keep the platform credible and moving."
        />

        <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
          <a href="#status" className="zc-nav-link">Status</a>
          <a href="#options" className="zc-nav-link">Options</a>
          <a href="#decision" className="zc-nav-link">Decision</a>
          <a href="#cta" className="zc-nav-link">Approve</a>
        </div>
      </section>

      <section id="status" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-18 scroll-mt-28">
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <TerminalCard
            label="Executive summary"
            title="What this proposal is"
            body="A continuation request for Danny Ford to move ZeroChill from bootstrap completion into a funded operational phase."
          >
            <div className="mt-5 space-y-4 border-t border-[color:var(--line-soft)] pt-4">
              <p className="text-sm leading-7 text-[color:var(--text-muted)]">
                ZeroChill has been built into a live frontend system with dedicated product pages, mission control views, review surfaces, and infrastructure storytelling that now reads like a real platform.
              </p>
              <p className="text-sm leading-7 text-[color:var(--text-muted)]">
                The next step is not a redesign. It is the funded continuation that gives the project the operational pieces buyers expect: domain ownership, database-backed records, verified email delivery, product assets, and focused development.
              </p>
            </div>
          </TerminalCard>

          <Panel className="shadow-telemetry p-6">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
              Current build status
            </div>
            <div className="mt-4 space-y-3">
              {[
                ['Site', 'Live and operational'],
                ['Routes', 'Products, review, admin, preorder, docs'],
                ['UI system', 'Cinematic terminal language'],
                ['Operational depth', 'Frontend complete, backend pending'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-[color:var(--line-soft)] pb-3">
                  <span className="text-sm uppercase tracking-[0.28em] text-[color:var(--text-dim)]">{label}</span>
                  <span className="font-mono text-sm text-[color:var(--text)]">{value}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <section id="options" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <SectionHeader
          eyebrow="Phase options"
          title="Choose the funding shape."
          copy="Each option keeps the current build intact and adds a different amount of follow-through."
        />

        <div className="mt-8 grid gap-5 xl:grid-cols-3">
          {phaseOptions.map((option, index) => (
            <TerminalCard
              key={option.label}
              label={`0${index + 1}`}
              title={option.label}
              body={option.budget}
            >
              <div className="mt-5 space-y-4 border-t border-[color:var(--line-soft)] pt-4">
                <div>
                  <div className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                    Deliverables
                  </div>
                  <ul className="mt-3 space-y-2">
                    {option.deliverables.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-7 text-[color:var(--text-muted)]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[color:var(--accent)] shadow-[0_0_14px_var(--accent)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                  <div className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                    Timeline
                  </div>
                  <div className="mt-3 font-mono text-sm uppercase tracking-[0.22em] text-[color:var(--accent-strong)]">
                    {option.timeline}
                  </div>
                </div>
              </div>
            </TerminalCard>
          ))}
        </div>
      </section>

      <section id="decision" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <TerminalCard
            label="Decision points"
            title="What Danny needs to decide"
            body="The next approval should set the scope and keep the project moving without ambiguity."
          >
            <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {decisionPoints.map((item) => (
                <div key={item} className="border border-[color:var(--line-soft)] bg-black/25 p-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  {item}
                </div>
              ))}
            </div>
          </TerminalCard>

          <TerminalCard
            label="Risks if paused"
            title="What stops if funding stops"
            body="Pausing does not break the current site, but it does freeze the next operational layer."
          >
            <div className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {risksIfPaused.map((item) => (
                <div key={item} className="flex gap-3 border border-[color:var(--line-soft)] bg-black/25 p-4 text-sm leading-7 text-[color:var(--text-muted)]">
                  <span className="mt-2 h-2 w-2 shrink-0 bg-[color:var(--accent-strong)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </TerminalCard>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <Panel className="shadow-telemetry p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Next approval steps
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--text-muted)]">
                Review the funding tier, confirm the next milestone, and set the follow-up meeting to lock scope and timing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/review"
                className="zc-button-secondary border border-[color:var(--line)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--text)]"
              >
                Schedule review
              </Link>
              <Link
                to="/preorder"
                className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
              >
                Approve continuation
              </Link>
            </div>
          </div>
        </Panel>
      </section>

      <section id="cta" className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-24">
        <Panel className="shadow-telemetry border-[color:var(--line)] bg-black/35 p-6">
          <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
            Recommended next milestone
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">
            Approve the Starter continuation budget, confirm the domain and database work, and schedule a short review to finalize the next phase scope.
          </p>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
