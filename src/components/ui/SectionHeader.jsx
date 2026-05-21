export default function SectionHeader({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} zc-reveal`}
    >
      <p className="zc-surface-low inline-flex px-2 py-1 text-[0.68rem] uppercase tracking-[0.3em] text-[color:var(--text-dim)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black uppercase leading-[1.02] tracking-[-0.05em] text-[color:var(--text)] sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--text-muted)] sm:text-base">
          {copy}
        </p>
      ) : null}
    </div>
  );
}
