export default function SectionHeader({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-xs uppercase tracking-[0.38em] text-[color:var(--text-dim)]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] text-[color:var(--text)] sm:text-5xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 text-base leading-8 text-[color:var(--text-muted)] sm:text-lg">{copy}</p>
      ) : null}
    </div>
  );
}
