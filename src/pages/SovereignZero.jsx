import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import TerminalCard from '../components/ui/TerminalCard';
import { productHierarchy, sovereignZeroNotes, productTiers } from '../data/site';

export default function SovereignZero() {
  return (
    <>
      <Seo
        title="Sovereign Zero"
        description="Sovereign Zero as a calm product-family page for local execution and operator-owned compute."
      />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
                Product family
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
                Sovereign Zero stays local, legible, and quiet.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)]">
                This family page frames the platform as a practical local compute stack rather than a dramatic launch campaign.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="zc-button-secondary border border-[color:var(--line)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-[color:var(--text-muted)]"
              >
                Product index
              </Link>
              <Link
                to="/preorder"
                className="zc-button-primary border border-[color:var(--accent)] bg-[color:var(--accent)] px-4 py-3 text-xs uppercase tracking-[0.22em] text-black"
              >
                Preorder
              </Link>
            </div>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <TerminalCard
            label="Core posture"
            title="Black steel, not soft chrome"
            body="The console should feel industrial and controlled. It should read like equipment planning, not a SaaS landing page."
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-muted)]">
              {sovereignZeroNotes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-soft)]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </TerminalCard>

          <Panel className="p-6">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Product ladder
            </div>
            <div className="mt-4 grid gap-3">
              {productHierarchy.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="zc-interactive rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] px-4 py-4"
                >
                  <div className="text-sm font-medium text-[color:var(--text)]">{item.name}</div>
                  <div className="mt-2 text-sm leading-7 text-[color:var(--text-muted)]">{item.detail}</div>
                </Link>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        {productTiers.map((tier) => (
          <TerminalCard key={tier.name} label={tier.badge} title={tier.name} body={tier.description}>
            <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
              {tier.features.join(' // ')}
            </div>
          </TerminalCard>
        ))}
      </section>

      <Footer />
    </>
  );
}
