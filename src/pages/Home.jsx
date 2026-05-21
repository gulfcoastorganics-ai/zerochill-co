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

const heroStats = [
  {
    label: 'Focus',
    value: 'Private AI products',
    detail: 'A premium product hub for AI infrastructure, preorder, and review.',
  },
  {
    label: 'Surface',
    value: 'Dark glass',
    detail: 'Rounded cards, warm text, and subtle violet-blue glow layers.',
  },
  {
    label: 'Conversion',
    value: 'CTA-led',
    detail: 'Primary actions stay visible with a clean, modern hierarchy.',
  },
];

const previewRows = [
  { label: 'Runtime', value: 'Local-first' },
  { label: 'Access', value: 'Preorder ready' },
  { label: 'Support', value: 'Review workflow' },
];

const bentoCards = [
  {
    span: 'lg:col-span-7',
    eyebrow: 'Large preview',
    title: 'A product surface that feels shippable.',
    body:
      'The hero preview card is designed like a polished app window, with live-looking signals, compact summaries, and a clear path into preorder.',
  },
  {
    span: 'lg:col-span-5',
    eyebrow: 'Metric card',
    title: 'Clarity over spectacle.',
    body:
      'The layout keeps the business case readable: fewer competing elements, tighter spacing, and stronger emphasis on conversion points.',
    metrics: [
      { label: 'Layout', value: 'Bento-first' },
      { label: 'Color', value: 'Mint / violet / blue' },
      { label: 'Text', value: 'Warm off-white' },
    ],
  },
  {
    span: 'lg:col-span-4',
    eyebrow: 'Feature card',
    title: 'Build for calm review.',
    body:
      'Visual rhythm is controlled so the page reads well under investor review, product scrutiny, and mobile browsing.',
  },
  {
    span: 'lg:col-span-4',
    eyebrow: 'Testimonial card',
    title: 'Feels premium without being loud.',
    body:
      '“The page now reads like a serious AI product company. The structure is cleaner, the CTA is stronger, and the glass treatment feels intentional.”',
    attribution: 'Founding operator',
  },
  {
    span: 'lg:col-span-4',
    eyebrow: 'Integration card',
    title: 'Connects to the existing stack.',
    body:
      'Existing preorder, email, payment, and routing infrastructure stays in place while the homepage presentation moves up-market.',
  },
  {
    span: 'lg:col-span-8',
    eyebrow: 'Process card',
    title: 'A simple flow from discovery to action.',
    body:
      'The new sequence guides visitors through promise, features, pricing, proof, and a final conversion block without visual drag.',
  },
];

const deepDiveCards = [
  {
    title: 'Premium dark surfaces',
    copy:
      'Deep charcoal panels, controlled contrast, and soft edge light create a high-end startup feel without making the page glossy or noisy.',
  },
  {
    title: 'Modular bento rhythm',
    copy:
      'Cards vary in size and density so the eye can move from big proof to small detail naturally. The result is denser, cleaner, and more modern.',
  },
  {
    title: 'Conversion-first hierarchy',
    copy:
      'Primary CTA placement, compact proof, and short sections reduce friction. Visitors can understand the product and act in fewer scrolls.',
  },
  {
    title: 'Mobile-safe stacking',
    copy:
      'Every major block collapses into a single-column flow with predictable spacing, so the visual language stays intact on smaller screens.',
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
    copy: 'Banner-style layout, weaker hierarchy, and less visual structure for product browsing.',
  },
  {
    label: 'After',
    copy: 'Bento grid product hub with clearer conversion paths, cleaner card rhythm, and stronger polish.',
  },
];

export default function Home() {
  return (
    <>
      <Seo
        title="ZeroChill | Product Hub"
        description="ZeroChill presents a premium bento-grid homepage for private AI products, preorder access, and review."
      />

      <section className="grid gap-6">
        <Panel className="overflow-hidden">
          <div className="relative isolate px-4 py-4 sm:px-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(140,255,206,0.16),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(132,123,255,0.18),transparent_22%),radial-gradient(circle_at_50%_115%,rgba(91,183,255,0.16),transparent_22%)]" />
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
                    Product hub
                  </div>
                </div>
              </Link>

              <nav
                aria-label="Homepage"
                className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-center"
              >
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
                  className="ml-auto inline-flex items-center justify-center rounded-full border border-[#9dffd0]/50 bg-[linear-gradient(135deg,#a8ffd5_0%,#7ef5ff_100%)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#06130d] shadow-[0_14px_34px_rgba(102,255,197,0.22)] hover:-translate-y-0.5"
                >
                  Preorder
                </Link>
              </nav>
            </div>
          </div>
        </Panel>

        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {workspaceStatus.map((signal, index) => (
                <span
                  key={signal.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--text-dim)]"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      index === 0
                        ? 'bg-[#9dffd0]'
                        : index === 1
                          ? 'bg-[#9bb8ff]'
                          : index === 2
                            ? 'bg-[#b59cff]'
                            : 'bg-[#8ff0ff]'
                    }`}
                  />
                  {signal.label} {signal.value}
                </span>
              ))}
            </div>

            <div className="max-w-3xl space-y-5">
              <p className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-faint)]">
                Private AI product hub
              </p>
              <h1 className="text-4xl font-semibold tracking-[-0.065em] text-[color:var(--text)] sm:text-5xl lg:text-7xl">
                Ship AI products with a cleaner, higher-trust surface.
              </h1>
              <p className="max-w-2xl text-sm leading-8 text-[color:var(--text-muted)] sm:text-[0.98rem]">
                ZeroChill now presents as a modern bento-grid homepage: premium dark cards, mint-led
                conversion accents, and a modular product story designed to move visitors from curiosity
                to preorder.
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
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text)] hover:bg-white/[0.06]"
              >
                View demo
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                    {item.label}
                  </div>
                  <div className="mt-3 text-lg font-medium tracking-[-0.04em] text-[color:var(--text)]">
                    {item.value}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_25%_20%,rgba(140,255,206,0.18),transparent_26%),radial-gradient(circle_at_80%_14%,rgba(138,125,255,0.22),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(86,178,255,0.2),transparent_24%)] blur-3xl" />
            <Panel className="relative overflow-hidden p-4 sm:p-5">
              <div
                id="product"
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                      Live preview
                    </div>
                    <div className="mt-2 text-sm text-[color:var(--text-muted)]">
                      Clean conversion surface for private AI products.
                    </div>
                  </div>
                  <span className="rounded-full border border-[#9dffd0]/30 bg-[#9dffd0]/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-[#aef8d0]">
                    Active
                  </span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
                  <div className="rounded-3xl border border-white/10 bg-[rgba(8,10,14,0.72)] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                          Product snapshot
                        </div>
                        <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[color:var(--text)]">
                          Preview what the product feels like.
                        </h3>
                      </div>
                      <div className="h-12 w-12 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(157,255,208,0.45),transparent_42%),linear-gradient(135deg,rgba(155,184,255,0.2),rgba(181,156,255,0.18))]" />
                    </div>

                    <div className="mt-4 space-y-3">
                      {previewRows.map((row) => (
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

                  <div className="space-y-4">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                        Product ladder
                      </div>
                      <div className="mt-4 space-y-3">
                        {productHierarchy.map((product) => (
                          <Link
                            key={product.name}
                            to={product.to}
                            className="flex items-center justify-between rounded-2xl border border-white/10 bg-[rgba(7,9,12,0.45)] px-4 py-3 transition hover:border-white/20 hover:bg-white/[0.05]"
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

                    <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(157,255,208,0.08),rgba(135,122,255,0.08))] p-4">
                      <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                        CTA strip
                      </div>
                      <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                        Mint accents, dark glass, and one clear call to action keep the page focused on
                        preorder conversion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </section>

        <section id="features" className="grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {bentoCards.map((card) => (
            <Panel key={card.title} className={`p-6 sm:p-7 ${card.span}`}>
              <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                {card.eyebrow}
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)]">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">{card.body}</p>

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
        </section>

        <section className="grid gap-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                Feature deep dive
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)] sm:text-3xl">
                Strongest selling points, broken into readable blocks.
              </h2>
            </div>
            <Link
              to="/products"
              className="text-[0.66rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
            >
              View product index
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {deepDiveCards.map((card) => (
              <Panel key={card.title} className="p-6 sm:p-7">
                <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                  Deep dive
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-[color:var(--text)]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">{card.copy}</p>
              </Panel>
            ))}
          </div>
        </section>

        <section id="pricing" className="grid gap-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                Pricing
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)] sm:text-3xl">
                Private access tiers built for conversion.
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
                    <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                      {tier.badge}
                    </div>
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

        <section id="reviews" className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel className="p-6 sm:p-7">
            <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
              Proof
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)]">
              Proof, logos, and before/after context.
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

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
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
                Reviews
              </div>
              <blockquote className="mt-4 text-lg leading-8 tracking-[-0.02em] text-[color:var(--text)]">
                “The homepage feels like a proper product hub now. The dark glass reads premium, and the
                CTA structure is much more conversion-friendly.”
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

        <Panel id="cta" className="overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="relative isolate grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(140,255,206,0.14),transparent_24%),radial-gradient(circle_at_90%_18%,rgba(132,123,255,0.16),transparent_20%),linear-gradient(135deg,rgba(255,255,255,0.02),transparent_40%)]" />
            <div className="relative max-w-3xl">
              <div className="text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                Final CTA
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-[color:var(--text)] sm:text-4xl">
                Ready to move from interest to preorder?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
                Use the cleaner product hub to guide visitors into preorder, demo review, or a waitlist-style
                next step without losing the premium feel.
              </p>
            </div>

            <div className="relative flex flex-wrap gap-3">
              <Link
                to="/preorder"
                className="inline-flex items-center justify-center rounded-full border border-[#9dffd0]/45 bg-[linear-gradient(135deg,#a8ffd5_0%,#7ef5ff_100%)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#06130d] shadow-[0_14px_34px_rgba(102,255,197,0.22)]"
              >
                Preorder
              </Link>
              <a
                href="#product"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--text)] hover:bg-white/[0.06]"
              >
                View demo
              </a>
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
