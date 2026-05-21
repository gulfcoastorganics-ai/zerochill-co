import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import { missionControlSignals, productHierarchy, productTiers, workspaceStatus } from '../data/site';

const heroMetrics = [
  {
    label: 'Deployment',
    value: 'Local-first',
    detail: 'Private workloads stay on owned hardware and under operator control.',
  },
  {
    label: 'Surface',
    value: 'Premium dark',
    detail: 'Matte shells, restrained glow, and cleaner hierarchy guide the scan.',
  },
  {
    label: 'Motion',
    value: 'Quiet rhythm',
    detail: 'Sections breathe more evenly, with fewer competing visual signals.',
  },
];

const executiveNotes = [
  'Built for teams that want a serious AI business surface, not a launch-page collage.',
  'Structured product tiers make the ladder easy to read for operators and investors.',
  'Preorder, email, and payment flows remain intact behind the refreshed presentation.',
];

export default function Home() {
  return (
    <>
      <Seo
        title="YOUR AI. UNPLUGGED."
        description="ZeroChill presents a premium dark workspace for sovereign AI products, preorder access, and private infrastructure review."
      />

      <section className="grid gap-6">
        <Panel className="overflow-hidden">
          <div className="relative isolate grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_88%_12%,rgba(179,58,68,0.16),transparent_20%),linear-gradient(135deg,rgba(255,255,255,0.02),transparent_38%)]" />
            <div className="relative max-w-3xl">
              <div className="flex flex-wrap gap-2">
                {workspaceStatus.map((signal) => (
                  <span key={signal.label} className="status-pill">
                    {signal.label} {signal.value}
                  </span>
                ))}
              </div>

              <div className="mt-6 max-w-2xl space-y-5">
                <p className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-faint)]">
                  Private AI infrastructure
                </p>
                <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-[color:var(--text)] sm:text-5xl lg:text-7xl">
                  ZeroChill reads like a premium product company.
                </h1>
                <p className="max-w-xl text-sm leading-8 text-[color:var(--text-muted)] sm:text-[0.98rem]">
                  The homepage now behaves more like an executive console: darker surfaces, cleaner spacing,
                  sharper product hierarchy, and a restrained AI-business finish built for serious review.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/preorder"
                  className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black"
                >
                  Preorder access
                </Link>
                <Link
                  to="/products"
                  className="zc-button-secondary border border-[color:var(--line)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text)]"
                >
                  View products
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4"
                  >
                    <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                      {metric.label}
                    </div>
                    <div className="mt-3 text-lg font-medium tracking-[-0.04em] text-[color:var(--text)]">
                      {metric.value}
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-8 top-6 h-32 rounded-full bg-[radial-gradient(circle,rgba(211,111,120,0.24),transparent_70%)] blur-3xl" />
              <div className="relative grid gap-4">
                <div className="zc-panel border-[color:var(--line)] bg-[color:rgba(16,18,23,0.94)] p-5 sm:p-6">
                  <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                    Executive snapshot
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)]">
                    Clear product stack. Private delivery. Calm presentation.
                  </h2>
                  <div className="mt-5 space-y-3">
                    {missionControlSignals.slice(0, 3).map((signal) => (
                      <div
                        key={signal.label}
                        className="flex items-center justify-between rounded-xl border border-[color:var(--line-soft)] bg-black/15 px-4 py-3"
                      >
                        <span className="text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--text-faint)]">
                          {signal.label}
                        </span>
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text)]">
                          {signal.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="zc-panel p-5">
                    <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                      Product cadence
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                      Tighter spacing and glass depth make each product tier feel intentional rather than promotional.
                    </p>
                  </div>

                  <div className="zc-panel p-5">
                    <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                      Investor posture
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                      The surface now reads as a credible startup workspace with less theatrical noise.
                    </p>
                  </div>
                </div>

                <div className="zc-panel p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                        Product ladder
                      </div>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                        Four product paths, organized for fast scanning.
                      </p>
                    </div>
                    <Link
                      to="/products"
                      className="text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
                    >
                      Open index
                    </Link>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {productHierarchy.slice(0, 4).map((product) => (
                      <Link
                        key={product.name}
                        to={product.to}
                        className="zc-interactive rounded-2xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-medium tracking-[-0.03em] text-[color:var(--text)]">
                            {product.name}
                          </div>
                          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                            open
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{product.detail}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
          <Panel className="p-6 sm:p-8">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Composition
            </div>
            <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)] sm:text-3xl">
              Homepage rhythm now feels closer to a funded AI platform.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
              The layout is less banner-like and more like a working dashboard, with stronger alignment,
              clearer section breaks, and more premium surface depth.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[color:var(--line-soft)] bg-white/[0.02] p-5">
                <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                  Hero
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  Stronger CTA grouping, tighter column balance, and a more executive opening statement.
                </p>
              </div>
              <div className="rounded-2xl border border-[color:var(--line-soft)] bg-white/[0.02] p-5">
                <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                  Rhythm
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  Cards breathe more, with softer transitions between overview, product, and access sections.
                </p>
              </div>
            </div>
          </Panel>

          <Panel className="p-6 sm:p-8">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Operating model
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)] sm:text-3xl">
              Sleek enough for a pitch, restrained enough for review.
            </h2>
            <div className="mt-5 space-y-3">
              {executiveNotes.map((note) => (
                <div
                  key={note}
                  className="flex gap-3 rounded-2xl border border-[color:var(--line-soft)] bg-white/[0.02] px-4 py-4"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-soft)]" />
                  <p className="text-sm leading-7 text-[color:var(--text-muted)]">{note}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/preorder"
                className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black"
              >
                Start preorder
              </Link>
              <Link
                to="/review"
                className="zc-button-secondary border border-[color:var(--line)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text)]"
              >
                Open review
              </Link>
            </div>
          </Panel>
        </div>

        <section className="grid gap-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                Product sections
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)] sm:text-3xl">
                Investor-ready product ladder
              </h2>
            </div>
            <Link
              to="/products"
              className="text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
            >
              View full index
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {productTiers.map((tier) => (
              <Panel key={tier.name} className="zc-interactive p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                      {tier.badge}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[color:var(--text)]">
                      {tier.name}
                    </h3>
                  </div>
                  <span className="rounded-full border border-[color:var(--line-soft)] bg-white/[0.02] px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                    ready
                  </span>
                </div>
                <p className="mt-4 max-w-xl text-sm leading-8 text-[color:var(--text-muted)]">
                  {tier.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tier.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-[color:var(--line-soft)] bg-black/15 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-[color:var(--text-dim)]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/products"
                    className="zc-button-secondary border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text)]"
                  >
                    Read detail
                  </Link>
                  <Link
                    to="/preorder"
                    className="zc-button-secondary border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
                  >
                    Preorder
                  </Link>
                </div>
              </Panel>
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}
