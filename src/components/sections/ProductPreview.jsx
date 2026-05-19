import { Link } from 'react-router-dom';
import Panel from '../ui/Panel';
import { productCards } from '../../data/site';

export default function ProductPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.38em] text-[color:var(--text-dim)]">
            Product preview
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
            Tactical modules.
          </h2>
        </div>
        <Link to="/docs" className="hidden text-xs uppercase tracking-[0.28em] text-[color:var(--accent-strong)] md:block">
          Read system docs
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {productCards.map((card) => (
          <Panel key={card.title} className="flex flex-col p-6">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--text-dim)]">
              {card.eyebrow}
            </div>
            <h3 className="mt-4 text-2xl font-bold uppercase tracking-[-0.03em] text-[color:var(--text)]">
              {card.title}
            </h3>
            <p className="mt-4 flex-1 text-sm leading-7 text-[color:var(--text-muted)]">{card.copy}</p>
            <div className="mt-6 border-t border-[color:var(--line-soft)] pt-4 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
              Standby // Local runtime
            </div>
          </Panel>
        ))}
      </div>
    </section>
  );
}
