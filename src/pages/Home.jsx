import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import { productHierarchy, productTiers, workspaceStatus } from '../data/site';

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
];

const heroSignals = ['Limited drop', 'Built for ZeroChill', 'Live product system'];

const storyPoints = [
  {
    eyebrow: 'What it is',
    title: 'A private AI product company with a sharper public surface.',
    copy:
      'ZeroChill now reads like a luxury digital magazine cover fused with a practical product landing page. It is designed to feel cinematic, premium, and easy to buy from.',
  },
  {
    eyebrow: 'Who it is for',
    title: 'Operators, founders, teams, and investors who want clarity fast.',
    copy:
      'The experience is built for people who need to understand the product quickly, trust the presentation, and move toward preorder without friction.',
  },
  {
    eyebrow: 'Why it feels different',
    title: 'Editorial hierarchy first, proof second, product evidence always visible.',
    copy:
      'Large type, split-screen rhythm, and restrained glass treatment carry the page. Bento cards stay as supporting evidence, not the main identity.',
  },
];

const previewStats = [
  { label: 'Runtime', value: 'Local-first' },
  { label: 'Access', value: 'Preorder ready' },
  { label: 'Support', value: 'Review workflow' },
];

const proofCards = [
  {
    span: 'lg:col-span-7',
    eyebrow: 'Product preview',
    title: 'Cinematic product window',
    copy:
      'A floating preview stack hints at the app surface, access state, and review workflow without turning the page into a dashboard.',
  },
  {
    span: 'lg:col-span-5',
    eyebrow: 'Key metric',
    title: 'High-trust, low-noise presentation',
    copy:
      'The composition reduces clutter, keeps the CTA visible, and uses dark glass to support a premium brand read.',
    metrics: [
      { label: 'Cards', value: '5 supporting blocks' },
      { label: 'CTA', value: 'Mint-led conversion' },
      { label: 'Tone', value: 'Warm off-white text' },
    ],
  },
  {
    span: 'lg:col-span-4',
    eyebrow: 'Signature feature',
    title: 'Editorial split-screen hero',
    copy:
      'The opening section behaves like a magazine cover: one side carries the story, the other side carries the product atmosphere.',
  },
  {
    span: 'lg:col-span-4',
    eyebrow: 'Testimonial',
    title: 'Feels premium without losing speed',
    copy:
      '“The homepage finally feels like a premium product launch page instead of an app shell. The hierarchy is much clearer.”',
    attribution: 'Product review partner',
  },
  {
    span: 'lg:col-span-4',
    eyebrow: 'Workflow',
    title: 'Simple path to action',
    copy:
      'Visitors move from promise to proof to preorder without navigating a dense grid or excessive content blocks.',
  },
];

const benefits = [
  {
    title: 'Sharper editorial hierarchy',
    copy:
      'Typography now does the heavy lifting. Headline scale, tighter rhythm, and calmer surfaces make the story more memorable.',
    detail:
      'The hero and story sections use size contrast, not decoration, to establish premium tone and conversion order.',
  },
  {
    title: 'Bento cards as proof, not the thesis',
    copy:
      'The product cards remain, but they are reduced to concise evidence blocks that support the bigger narrative.',
    detail:
      'This keeps the page useful for quick scanning while preserving a more brand-forward, cinematic lead.',
  },
  {
    title: 'Conversion without clutter',
    copy:
      'Mint CTA accents stay consistent across the page, and the paths to preorder, review, and product detail remain clear.',
    detail:
      'Primary actions are placed early and repeated at the end so the page still performs like a landing page.',
  },
  {
    title: 'Mobile-safe editorial stacking',
    copy:
      'The split-screen collapses into a readable single column, with spacing tuned so the cinematic feel survives on smaller screens.',
    detail:
      'Cards stack in a predictable order, keeping the experience controlled rather than crowded.',
  },
];

const proofStats = [
  { label: 'Product lanes', value: '4' },
  { label: 'Core routes', value: '6+' },
  { label: 'Primary CTA', value: '1 clear action' },
  { label: 'Motion policy', value: 'Reduced-motion safe' },
];

const proofLogos = ['Founders', 'Operators', 'Procurement', 'Security', 'Labs', 'Teams'];

const beforeAfter = [
  {
    label: 'Before',
    copy: 'Bento-heavy composition with a dashboard-like feel and denser supporting cards.',
  },
  {
    label: 'After',
    copy: 'Editorial split-screen landing page with selective proof cards and stronger cinematic flow.',
  },
];

function SectionEyebrow({ children }) {
  return (
    <div className="text-[0.64rem] uppercase tracking-[0.34em] text-[color:var(--text-faint)]">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="ZeroChill | Editorial Product Hub"
        description="ZeroChill presents a premium editorial split-screen homepage with selective bento proof cards, preorder access, and review."
      />

      <section className="grid gap-6">
        <Panel className="overflow-hidden">
          <div className="relative isolate px-4 py-4 sm:px-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(140,255,206,0.12),transparent_22%),radial-gradient(circle_at_88%_16%,rgba(132,123,255,0.16),transparent_22%),radial-gradient(circle_at_50%_115%,rgba(91,183,255,0.16),transparent_22%)]" />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[0.78rem] font-semibold tracking-[0.18em] text-[color:var(--text)]">
                  ZC
                </span>
                <div className="leading-tight">
                  <div className="text-[0.76rem] font-medium tracking-[-0.01em] text-[color:var(--text)]">
                    ZeroChill Co
                  </div>
                  <div className="mt-1 text-[0.64rem] uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
                    Editorial product hub
                  </div>
                </div>
              </Link>

              <nav aria-label="Homepage" className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">
                  {navLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="rounded-full px-3.5 py-2 text-[0.64rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)] hover:bg-white/[0.05] hover:text-[color:var(--text)] focus-visible:text-[color:var(--text)]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <Link
                  to="/preorder"
                  className="ml-auto inline-flex items-center justify-center rounded-full border border-[#9dffd0]/45 bg-[linear-gradient(135deg,#a8ffd5_0%,#7ef5ff_100%)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#06130d] shadow-[0_14px_34px_rgba(102,255,197,0.22)] hover:-translate-y-0.5"
                >
                  Preorder
                </Link>
              </nav>
            </div>
          </div>
        </Panel>

        <section className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr] lg:items-stretch">
          <div className="flex flex-col justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {workspaceStatus.map((signal) => (
                <span
                  key={signal.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--text-dim)]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#9dffd0]" />
                  {signal.label} {signal.value}
                </span>
              ))}
            </div>

            <div className="max-w-3xl space-y-5">
              <SectionEyebrow>Private AI product drop</SectionEyebrow>
              <h1 className="text-4xl font-semibold tracking-[-0.07em] text-[color:var(--text)] sm:text-5xl lg:text-7xl">
                A dark luxury homepage for AI products that need to convert.
              </h1>
              <p className="max-w-2xl text-sm leading-8 text-[color:var(--text-muted)] sm:text-[0.98rem]">
                ZeroChill now feels more like a cinematic magazine cover than a dashboard: editorial split
                layout, spacious typography, glassy surfaces, and selective product evidence that moves
                visitors toward preorder.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/preorder"
                className="inline-flex items-center justify-center rounded-full border border-[#9dffd0]/45 bg-[linear-gradient(135deg,#a8ffd5_0%,#7ef5ff_100%)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#06130d] shadow-[0_14px_34px_rgba(102,255,197,0.22)] hover:-translate-y-0.5"
              >
                Start preorder
              </Link>
              <a
                href="#product"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text)] hover:bg-white/[0.06]"
              >
                View demo
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {heroSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.64rem] uppercase tracking-[0.2em] text-[color:var(--text-dim)]"
                >
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[34rem] lg:min-h-full">
            <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_22%_20%,rgba(140,255,206,0.16),transparent_26%),radial-gradient(circle_at_80%_16%,rgba(138,125,255,0.24),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(86,178,255,0.18),transparent_24%)] blur-3xl" />
            <Panel className="relative h-full overflow-hidden p-4 sm:p-5">
              <div
                id="product"
                className="flex h-full min-h-[30rem] flex-col justify-between overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6"
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <SectionEyebrow>Live product system</SectionEyebrow>
                    <div className="mt-3 text-sm text-[color:var(--text-muted)]">
                      A floating preview panel for preorder, review, and product explanation.
                    </div>
                  </div>
                  <span className="rounded-full border border-[#9dffd0]/30 bg-[#9dffd0]/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-[#aef8d0]">
                    Active
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-[1.06fr_0.94fr]">
                  <div className="rounded-[28px] border border-white/10 bg-[rgba(8,10,14,0.72)] p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                          Visual panel
                        </div>
                        <h3 className="mt-2 max-w-sm text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)]">
                          Product atmosphere, not dashboard noise.
                        </h3>
                      </div>
                      <div className="h-14 w-14 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(157,255,208,0.5),transparent_40%),linear-gradient(135deg,rgba(155,184,255,0.22),rgba(181,156,255,0.2))]" />
                    </div>

                    <div className="mt-5 space-y-3">
                      {previewStats.map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                        >
                          <span className="text-[0.66rem] uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
                            {row.label}
                          </span>
                          <span className="text-sm font-medium text-[color:var(--text)]">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[28px] border border-white/10 bg-[rgba(7,9,12,0.54)] p-4 sm:p-5">
                      <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                        Product ladder
                      </div>
                      <div className="mt-4 space-y-3">
                        {productHierarchy.map((product) => (
                          <Link
                            key={product.name}
                            to={product.to}
                            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-white/20 hover:bg-white/[0.06]"
                          >
                            <div>
                              <div className="text-sm font-medium text-[color:var(--text)]">{product.name}</div>
                              <div className="mt-1 text-sm leading-6 text-[color:var(--text-muted)]">
                                {product.detail}
                              </div>
                            </div>
                            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                              open
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(157,255,208,0.08),rgba(135,122,255,0.08))] p-4 sm:p-5">
                      <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                        Conversion strip
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                        Mint accents and a clear preorder path keep the page conversion-focused while the
                        overall tone stays editorial and luxurious.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </section>

        <section className="grid gap-6">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-2xl">
              <SectionEyebrow>Brand narrative</SectionEyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[color:var(--text)] sm:text-4xl">
                Editorial by design, product-led by intent.
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-8 text-[color:var(--text-muted)] sm:text-[0.98rem]">
              This homepage is built to read like a feature spread. It explains the product in short,
              confident blocks, keeps the atmosphere cinematic, and uses visual contrast to guide the eye
              toward the product ladder and preorder actions.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {storyPoints.map((point) => (
              <Panel key={point.eyebrow} className="p-6 sm:p-7">
                <SectionEyebrow>{point.eyebrow}</SectionEyebrow>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)]">
                  {point.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">{point.copy}</p>
              </Panel>
            ))}
          </div>
        </section>

        <section className="grid gap-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <SectionEyebrow>Selective proof</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)] sm:text-3xl">
                Bento cards that support the story.
              </h2>
            </div>
            <Link
              to="/products"
              className="text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
            >
              View product index
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-12">
            {proofCards.map((card) => (
              <Panel key={card.title} className={`p-6 sm:p-7 ${card.span}`}>
                <SectionEyebrow>{card.eyebrow}</SectionEyebrow>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">{card.copy}</p>

                {card.metrics ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {card.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                          {metric.label}
                        </div>
                        <div className="mt-3 text-sm font-medium text-[color:var(--text)]">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {card.attribution ? (
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[color:var(--text-muted)]">
                    {card.attribution}
                  </div>
                ) : null}
              </Panel>
            ))}
          </div>
        </section>

        <section id="features" className="grid gap-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <SectionEyebrow>Feature deep dive</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)] sm:text-3xl">
                Strong selling points, presented as editorial rows.
              </h2>
            </div>
            <div className="text-sm text-[color:var(--text-muted)]">
              Cleaner, cinematic, and easier to scan.
            </div>
          </div>

          <div className="grid gap-5">
            {benefits.map((benefit, index) => (
              <Panel key={benefit.title} className="p-6 sm:p-7">
                <div className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
                  <div>
                    <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                      0{index + 1}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)] sm:text-3xl">
                      {benefit.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm leading-8 text-[color:var(--text-muted)]">{benefit.copy}</p>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-[color:var(--text-muted)]">
                      {benefit.detail}
                    </div>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </section>

        <section id="pricing" className="grid gap-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <SectionEyebrow>Pricing</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)] sm:text-3xl">
                Product tiers with a restrained, premium presentation.
              </h2>
            </div>
            <div className="text-sm text-[color:var(--text-muted)]">
              Preorder now, refine scope later.
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {productTiers.map((tier) => (
              <Panel key={tier.name} className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <SectionEyebrow>{tier.badge}</SectionEyebrow>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-[color:var(--text)]">
                      {tier.name}
                    </h3>
                  </div>
                  <span className="rounded-full border border-[#9dffd0]/30 bg-[#9dffd0]/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-[#aef8d0]">
                    Access
                  </span>
                </div>

                <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">{tier.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {tier.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-[color:var(--text-dim)]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/preorder"
                    className="inline-flex items-center justify-center rounded-full border border-[#9dffd0]/45 bg-[linear-gradient(135deg,#a8ffd5_0%,#7ef5ff_100%)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#06130d] shadow-[0_12px_28px_rgba(102,255,197,0.18)]"
                  >
                    Preorder
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text)] hover:bg-white/[0.06]"
                  >
                    Product detail
                  </Link>
                </div>
              </Panel>
            ))}
          </div>
        </section>

        <section id="reviews" className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Panel className="p-6 sm:p-7">
            <SectionEyebrow>Proof spread</SectionEyebrow>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)]">
              Reviews, stats, and visual proof in a magazine-style block.
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {proofStats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                    {item.label}
                  </div>
                  <div className="mt-3 text-lg font-medium tracking-[-0.04em] text-[color:var(--text)]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                Logos
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {proofLogos.map((logo) => (
                  <span
                    key={logo}
                    className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-[color:var(--text-dim)]"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </Panel>

          <div className="grid gap-5">
            <Panel className="p-6 sm:p-7">
              <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                Pull quote
              </div>
              <blockquote className="mt-4 text-lg leading-8 tracking-[-0.02em] text-[color:var(--text)] sm:text-xl">
                “The page feels like a luxury launch editorial now. The dark glass is restrained, and the
                product story is much easier to trust.”
              </blockquote>
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                Product review partner
              </p>
            </Panel>

            <Panel className="p-6 sm:p-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {beforeAfter.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                      {item.label}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">{item.copy}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </section>

        <Panel className="overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="relative isolate grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(140,255,206,0.14),transparent_24%),radial-gradient(circle_at_90%_18%,rgba(132,123,255,0.16),transparent_20%),linear-gradient(135deg,rgba(255,255,255,0.02),transparent_40%)]" />
            <div className="relative max-w-3xl">
              <SectionEyebrow>Final CTA</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-[color:var(--text)] sm:text-4xl">
                Ready to move from interest to action?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
                Choose preorder, browse the product ladder, or step into the review route. The homepage
                stays premium, cinematic, and conversion-focused through the last scroll.
              </p>
            </div>

            <div className="relative flex flex-wrap gap-3">
              <Link
                to="/preorder"
                className="inline-flex items-center justify-center rounded-full border border-[#9dffd0]/45 bg-[linear-gradient(135deg,#a8ffd5_0%,#7ef5ff_100%)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#06130d] shadow-[0_14px_34px_rgba(102,255,197,0.22)]"
              >
                Preorder
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text)] hover:bg-white/[0.06]"
              >
                Products
              </Link>
              <Link
                to="/review"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
              >
                Review
              </Link>
            </div>
          </div>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
