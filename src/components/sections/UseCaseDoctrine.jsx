import SectionHeader from '../ui/SectionHeader';
import TerminalCard from '../ui/TerminalCard';
import { useCaseDoctrine } from '../../data/site';

export default function UseCaseDoctrine() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Use case doctrine"
        title="Designed for controlled work."
        copy="These are the operational situations ZeroChill is built to serve without overpromising the stack."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {useCaseDoctrine.map((item, index) => (
          <TerminalCard key={item.title} label={`0${index + 1}`} title={item.title} body={item.detail} />
        ))}
      </div>
    </section>
  );
}
