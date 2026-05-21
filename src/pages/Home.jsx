import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/layout/Footer';
import Panel from '../components/ui/Panel';
import TerminalCard from '../components/ui/TerminalCard';
import {
  overviewCards,
  overviewHighlights,
  productHierarchy,
  workspaceStatus,
} from '../data/site';

export default function Home() {
  return (
    <>
      <Seo
        title="YOUR AI. UNPLUGGED."
        description="ZeroChill Co now reads as a dark product workspace for sovereign AI infrastructure, product tiers, and preorder review."
      />

      <section className="grid gap-5">
        <Panel className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                {workspaceStatus.map((signal) => (
                  <span key={signal.label} className="status-pill">
                    {signal.label} {signal.value}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--text)] sm:text-5xl lg:text-6xl">
                YOUR AI. UNPLUGGED.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)] sm:text-[0.98rem]">
                ZeroChill is now framed as an infrastructure workspace: fixed navigation, centered reading space, and a calmer product rhythm built for serious review.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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
                  Open product index
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="zc-panel p-4">
                <div className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                  Current system state
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  Workspace layout, product hierarchy, and preorder paths are now consolidated into a quieter operating surface.
                </p>
              </div>
              <div className="zc-panel p-4">
                <div className="text-[0.66rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
                  Primary posture
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                  Matte shell. Minimal borders. Editorial reading width. Signal accents only.
                </p>
              </div>
            </div>
          </div>
        </Panel>

        <div className="grid gap-5 lg:grid-cols-3">
          {overviewCards.map((card) => (
            <TerminalCard key={card.title} label={card.label} title={card.title} body={card.body} />
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Panel className="p-6">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Product hierarchy
            </div>
            <div className="mt-4 grid gap-3">
              {productHierarchy.map((product) => (
                <Link
                  key={product.name}
                  to={product.to}
                  className="zc-interactive flex items-center justify-between rounded-xl border border-[color:var(--line-soft)] bg-white/[0.02] px-4 py-4"
                >
                  <div>
                    <div className="text-sm font-medium text-[color:var(--text)]">{product.name}</div>
                    <div className="mt-1 text-sm leading-7 text-[color:var(--text-muted)]">
                      {product.detail}
                    </div>
                  </div>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                    open
                  </span>
                </Link>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="text-[0.66rem] uppercase tracking-[0.32em] text-[color:var(--text-faint)]">
              Mission statement
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--text)]">
              A local operating system for product review.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[color:var(--text-muted)]">
              The site keeps the original product stance, but the presentation now behaves like a serious internal app: composed, legible, and built around the work rather than the spectacle.
            </p>
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4 text-sm leading-7 text-[color:var(--text-muted)]">
              {overviewHighlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-soft)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>

      <Footer />
    </>
  );
}
