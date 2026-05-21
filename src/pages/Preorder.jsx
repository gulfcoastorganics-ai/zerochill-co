import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import PreorderForm from '../components/forms/PreorderForm';
import { productTiers, preorderSidebarNotes } from '../data/site';

export default function Preorder() {
  return (
    <>
      <Seo
        title="Preorder"
        description="ZeroChill preorder page with a refined product form and quiet status copy."
      />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                Preorder
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
                Quiet, refined, and ready for review.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
                Interest is still captured through the existing API and email notification flow. The form now reads like a product intake screen instead of a campaign block.
              </p>
            </div>
            <div className="space-y-3">
              <Link
                to="/products"
                className="zc-button-secondary block border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
              >
                Compare products
              </Link>
              <Link
                to="/review"
                className="zc-button-secondary block border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
              >
                Review route
              </Link>
            </div>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <PreorderForm />

          <Panel className="p-6">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Form notes
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--text-muted)]">
              {preorderSidebarNotes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-soft)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-[color:var(--line-soft)] pt-4">
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                Tier map
              </div>
              <div className="mt-4 space-y-3">
                {productTiers.map((tier) => (
                  <div key={tier.name} className="rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] p-4">
                    <div className="text-sm font-medium text-[color:var(--text)]">{tier.name}</div>
                    <p className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">
                      {tier.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>
      </section>

      <Footer />
    </>
  );
}
