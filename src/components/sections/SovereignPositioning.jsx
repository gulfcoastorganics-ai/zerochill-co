import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';

const positioningCards = [
  {
    title: 'Why local AI matters',
    copy:
      'Local AI keeps inference close to the operator, lowers latency, narrows the dependency chain, and preserves useful work when the wider network is unreliable or unavailable.',
  },
  {
    title: 'Centralized dependency risks',
    copy:
      'When the core workflow depends on remote tenancy, pricing shifts, policy changes, access controls, and outages can all become operational risk instead of an external detail.',
  },
  {
    title: 'Sovereign infrastructure position',
    copy:
      'ZeroChill is framed as operator-owned infrastructure: local control, edge deployment, contained telemetry, and a machine room aesthetic that reads like equipment rather than a consumer app.',
  },
];

export default function SovereignPositioning() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Sovereign positioning"
        title="Control the runtime, not just the interface."
        copy="The platform narrative is stronger when it explains the operational consequences of local ownership. This section ties the product to the risk profile buyers already understand."
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-3">
        {positioningCards.map((card, index) => (
          <Panel key={card.title} className="shadow-telemetry zc-interactive p-6">
            <div className="text-xs uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
              0{index + 1}
            </div>
            <h3 className="mt-4 text-2xl font-bold uppercase tracking-[-0.03em] text-[color:var(--text)]">
              {card.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[color:var(--text-muted)]">{card.copy}</p>
          </Panel>
        ))}
      </div>
    </section>
  );
}
