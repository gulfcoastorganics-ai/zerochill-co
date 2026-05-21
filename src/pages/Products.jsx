import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import TerminalCard from '../components/ui/TerminalCard';
import { productComparison, productComparisonColumns, productDetailCatalog } from '../data/site';

export default function Products() {
  return (
    <>
      <Seo
        title="Products"
        description="ZeroChill product index for Lite, Core, Blacksite, and DevKit inside a calmer app-like workspace."
      />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                Product index
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
                A product ladder with fewer theatrics.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
                The index now behaves like an internal workspace page: compact headers, clean hierarchy, and a comparison table that emphasizes operational differences.
              </p>
            </div>
            <Link
              to="/preorder"
              className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black"
            >
              Preorder
            </Link>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-2">
          {productDetailCatalog.map((product) => (
            <TerminalCard
              key={product.slug}
              label={product.eyebrow}
              title={product.title}
              body={product.positioning}
            >
              <div className="mt-5 flex flex-wrap gap-3 border-t border-[color:var(--line-soft)] pt-4">
                <Link
                  to={`/${product.slug}`}
                  className="zc-button-secondary border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text)]"
                >
                  Open detail
                </Link>
                <Link
                  to="/preorder"
                  className="zc-button-secondary border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
                >
                  Preorder
                </Link>
              </div>
            </TerminalCard>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-5">
        <Panel className="overflow-hidden">
          <div className="border-b border-[color:var(--line-soft)] px-6 py-4">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Comparison matrix
            </div>
          </div>
          <div className="hidden grid-cols-5 gap-4 border-b border-[color:var(--line-soft)] px-6 py-4 text-[0.66rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)] md:grid">
            <div>Product</div>
            {productComparisonColumns.map((column) => (
              <div key={column}>{column}</div>
            ))}
          </div>

          <div className="divide-y divide-[color:var(--line-soft)]">
            {productComparison.map((product) => (
              <div key={product.name} className="grid gap-4 px-6 py-5 md:grid-cols-5">
                <div>
                  <div className="text-sm font-medium text-[color:var(--text)]">{product.name}</div>
                  <div className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                    {product.fit}
                  </div>
                </div>
                <div className="text-sm leading-7 text-[color:var(--text-muted)]">{product.audience}</div>
                <div className="text-sm leading-7 text-[color:var(--text-muted)]">{product.environment}</div>
                <div className="text-sm leading-7 text-[color:var(--text-muted)]">{product.offline}</div>
                <div className="text-sm leading-7 text-[color:var(--text-muted)]">{product.compute}</div>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <TerminalCard
          label="Architecture"
          title="Cleaner information hierarchy"
          body="The product page is now designed for scanning and comparison rather than spectacle."
        />
        <TerminalCard
          label="CTA"
          title="Move from index to preorder"
          body="The product ladder funnels directly into preorder instead of framing itself as a campaign page."
        />
      </section>

      <Footer />
    </>
  );
}
