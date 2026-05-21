export default function SectionHeader({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}
    >
      <p className="inline-flex rounded-full border border-[color:var(--line-soft)] bg-white/[0.03] px-2.5 py-1 text-[0.64rem] uppercase tracking-[0.3em] text-[color:var(--text-faint)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-2xl font-semibold leading-[1.08] tracking-[-0.04em] text-[color:var(--text)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)] sm:text-[0.98rem]">
          {copy}
        </p>
      ) : null}
    </div>
  );
}
