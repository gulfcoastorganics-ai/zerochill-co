import SectionHeader from '../ui/SectionHeader';
import TerminalCard from '../ui/TerminalCard';
import { problemBlueprint } from '../../data/site';

export default function Blueprint() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Problem State Blueprint"
        title="The failure pattern is visible."
        copy="ZeroChill exists because centralized systems create predictable failure states. We map the pressure points, then remove the dependency."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {problemBlueprint.map((item) => (
          <TerminalCard
            key={item.title}
            label={item.title}
            body={item.copy}
            className="min-h-full"
          >
            <div className="mt-5 border-t border-[color:var(--line-soft)] pt-4 font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
              ZeroChill response // local control, direct visibility, no cloud tether
            </div>
          </TerminalCard>
        ))}
      </div>
    </section>
  );
}
