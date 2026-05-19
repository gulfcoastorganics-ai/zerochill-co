import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/ui/SectionHeader';
import TerminalCard from '../components/ui/TerminalCard';
import Panel from '../components/ui/Panel';
import {
  productComparison,
  productComparisonColumns,
  productSummaryCards,
} from '../data/site';

export default function Products() {
  return (
    <>
      <Seo
        title="Products"
        description="ZeroChill Co product comparison page for comparing Lite, Core, Blacksite, and DevKit deployment tiers."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeader
          eyebrow="Products"
          title="Product ladder"
          copy="A concise comparison layer for buyers and reviewers who need the operational differences in one place."
        />

        <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
          <a href="#product-summary" className="zc-nav-link">Summary</a>
          <a href="#product-comparison" className="zc-nav-link">Comparison</a>
          <a href="#product-fit" className="zc-nav-link">Fit</a>
          <Link to="/preorder" className="zc-nav-link text-[color:var(--accent-strong)]">
            Preorder
          </Link>
        </div>
      </section>

      <section id="product-summary" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-18 scroll-mt-28">
        <div className="grid gap-5 lg:grid-cols-4">
          {productSummaryCards.map((card) => (
            <TerminalCard key={card.title} label="SUMMARY" title={card.title} body={card.body} />
          ))}
        </div>
      </section>

      <section id="product-comparison" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <SectionHeader
          eyebrow="Comparison matrix"
          title="How the tiers differ."
          copy="This matrix is designed to make the ladder easy to scan during internal review or client approval."
        />

        <Panel className="shadow-telemetry mt-8 overflow-hidden">
          <div className="hidden grid-cols-5 border-b border-[color:var(--line)] bg-black/35 px-4 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-[color:var(--text-dim)] md:grid">
            <div>Product</div>
            {productComparisonColumns.map((column) => (
              <div key={column}>{column}</div>
            ))}
          </div>

          <div className="divide-y divide-[color:var(--line-soft)] md:hidden">
            {productComparison.map((product) => (
              <div key={product.name} className="space-y-4 px-4 py-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-sm uppercase tracking-[0.26em] text-[color:var(--text)]">
                    {product.name}
                  </div>
                  <span className="border border-[color:var(--line-soft)] px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                    {product.fit}
                  </span>
                </div>
                <div className="grid gap-3">
                  <div className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                    <div className="text-[0.66rem] uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                      Recommended use
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                      {product.audience}
                    </p>
                  </div>
                  <div className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                    <div className="text-[0.66rem] uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                      Deployment fit
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                      {product.environment}
                    </p>
                  </div>
                  <div className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                    <div className="text-[0.66rem] uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                      Offline posture
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                      {product.offline}
                    </p>
                  </div>
                  <div className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                    <div className="text-[0.66rem] uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                      Compute profile
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                      {product.compute}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden divide-y divide-[color:var(--line-soft)] md:block">
            {productComparison.map((product) => (
              <div key={product.name} className="grid gap-3 px-4 py-5 md:grid-cols-5 md:gap-4 md:px-4">
                <div className="text-sm uppercase tracking-[0.26em] text-[color:var(--text)]">
                  {product.name}
                </div>
                <div className="text-sm leading-7 text-[color:var(--text-muted)]">
                  {product.audience}
                </div>
                <div className="text-sm leading-7 text-[color:var(--text-muted)]">
                  {product.environment}
                </div>
                <div className="text-sm leading-7 text-[color:var(--text-muted)]">
                  {product.offline}
                </div>
                <div className="text-sm leading-7 text-[color:var(--text-muted)]">
                  {product.inference}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section id="product-fit" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18 scroll-mt-28">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <TerminalCard
            label="Deployment fit"
            title="Environment alignment"
            body="Each tier maps to a different type of deployment surface."
          >
            <div className="mt-5 space-y-4 border-t border-[color:var(--line-soft)] pt-4">
              {productComparison.map((product) => (
                <div key={product.name} className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                  <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
                    {product.name}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                    {product.environment}
                  </p>
                </div>
              ))}
            </div>
          </TerminalCard>

          <TerminalCard
            label="Buyer fit"
            title="Choose your node"
            body="Use this ladder to match operational needs to the right deployment class."
          >
            <div className="mt-5 space-y-4 border-t border-[color:var(--line-soft)] pt-4">
              {productComparison.map((product) => (
                <div key={product.name} className="border border-[color:var(--line-soft)] bg-black/25 p-4">
                  <div className="text-xs uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
                    {product.name}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                    {product.fit}
                  </p>
                </div>
              ))}
            </div>
          </TerminalCard>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <SectionHeader
          eyebrow="Terminal summaries"
          title="Quick read cards."
          copy="These summaries help buyers and clients compare the tiers without scanning the entire matrix."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {productComparison.map((product, index) => (
            <TerminalCard
              key={product.name}
              label={`0${index + 1}`}
              title={product.name}
              body={product.compute}
            >
              <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
                <li className="text-sm leading-7 text-[color:var(--text-muted)]">
                  Recommended fit: {product.fit}
                </li>
                <li className="text-sm leading-7 text-[color:var(--text-muted)]">
                  Deployment: {product.environment}
                </li>
                <li className="text-sm leading-7 text-[color:var(--text-muted)]">
                  Offline posture: {product.offline}
                </li>
              </ul>
            </TerminalCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <Panel className="shadow-telemetry border-[color:var(--line)] bg-black/35 p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
                Choose your node
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--text-muted)]">
                If you know your deployment profile, move directly into preorder review.
              </p>
            </div>
            <Link
              to="/preorder"
              className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-black"
            >
              Choose Your Node
            </Link>
          </div>
        </Panel>
      </section>

      <Footer />
    </>
  );
}
