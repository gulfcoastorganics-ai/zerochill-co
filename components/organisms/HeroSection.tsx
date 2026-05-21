const HeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] items-center bg-black px-12 text-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 md:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-7xl font-extrabold tracking-tight">
            ZeroChill
            <br />
            Design System
          </h1>
          <p className="text-lg text-gray-400">
            Components, patterns, and styles for a premium digital experience.
          </p>
          <div className="grid gap-4">
            {['Foundations', 'Components', 'Patterns'].map((label) => (
              <div
                key={label}
                className="group cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-emerald-500/50"
              >
                <h3 className="font-semibold">{label}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-16 shadow-2xl backdrop-blur-2xl">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-white font-bold text-black">
            ZC
          </div>
          <h2 className="mb-6 text-5xl font-bold leading-tight">
            Build.
            <br />
            Scale.
            <br />
            Stay ZeroChill.
          </h2>
          <div className="mb-8 h-1 w-16 bg-emerald-500" />
          <p className="text-gray-300">
            UI components and design tokens for the ZeroChill ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
