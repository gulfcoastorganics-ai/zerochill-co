import SectionHeader from '../ui/SectionHeader';
import TerminalCard from '../ui/TerminalCard';
import { docsPreviewBlocks } from '../../data/site';

export default function DocsPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <SectionHeader
        eyebrow="Technical documentation"
        title="Readable by operators."
        copy="The documentation language stays sparse, direct, and terminal-shaped. It looks like the machine, not like a sales deck."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {docsPreviewBlocks.map((block) => (
          <TerminalCard
            key={block.label}
            label={block.label}
            command={block.command}
            body={block.body}
            className="h-full"
          />
        ))}
      </div>
    </section>
  );
}
