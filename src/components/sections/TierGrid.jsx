import SectionHeader from '../ui/SectionHeader';
import TerminalCard from '../ui/TerminalCard';
import { productTiers } from '../../data/site';

export default function TierGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Product tiers"
        title="Launch hardware without the soft edges."
        copy="These tiers are staged for different operational depth. Each one keeps the same anti-cloud stance and the same visual language."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {productTiers.map((tier) => (
          <TerminalCard
            key={tier.name}
            label={tier.badge}
            title={tier.name}
            body={tier.description}
            className="h-full"
          >
            <ul className="mt-5 space-y-3 border-t border-[color:var(--line-soft)] pt-4">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-7 text-[color:var(--text-muted)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[color:var(--accent)] shadow-[0_0_14px_var(--accent)]" />
                  {feature}
                </li>
              ))}
            </ul>
          </TerminalCard>
        ))}
      </div>
    </section>
  );
}
