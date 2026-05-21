import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const featurePanels = [
  {
    title: 'Foundations',
    copy: 'Design tokens, color, typography, and global settings.',
  },
  {
    title: 'Components',
    copy: 'Reusable, accessible, and production-ready UI.',
  },
  {
    title: 'Patterns',
    copy: 'Layout patterns and UI flows for real world products.',
  },
];

function IconButton({ to, label, children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.06] text-[color:var(--text)] transition hover:border-white/24 hover:bg-white/[0.1] hover:-translate-y-0.5 focus-visible:bg-white/[0.1]"
    >
      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="ZeroChill Design System"
        description="ZeroChill Design System: premium components, patterns, and styles for a premium digital experience."
      />

      <section className="home-mars-scene relative min-h-[100svh] overflow-hidden bg-[#030205] text-[color:var(--text)]">
        <div className="home-mars-scene__stars" aria-hidden="true" />
        <div className="home-mars-scene__space" aria-hidden="true" />
        <div className="home-mars-scene__ground" aria-hidden="true" />
        <div className="home-mars-scene__plant" aria-hidden="true" />

        <div className="mx-auto flex min-h-[100svh] w-full max-w-[1680px] items-stretch px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
          <div className="grid flex-1 gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-5">
            <div className="home-left-glass relative overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(9,10,14,0.28)] p-6 text-[color:var(--text)] shadow-[0_40px_80px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_22%,rgba(255,255,255,0.02)_74%,transparent_100%)]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.03))]" />

              <div className="relative flex h-full flex-col justify-between gap-10">
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.05] text-[0.75rem] font-semibold tracking-[0.22em]">
                      ZC
                    </span>
                    <div className="leading-tight">
                      <div className="text-[0.72rem] font-medium uppercase tracking-[0.32em] text-[color:var(--text-dim)]">
                        ZeroChill
                      </div>
                      <div className="mt-1 text-[0.64rem] uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
                        Design system
                      </div>
                    </div>
                  </div>

                  <div className="max-w-xl">
                    <p className="text-[0.66rem] uppercase tracking-[0.36em] text-[color:var(--text-faint)]">
                      ZeroChill wordmark
                    </p>
                    <h1 className="mt-6 font-display text-5xl leading-[0.9] text-[color:var(--text)] sm:text-6xl lg:text-[5.6rem]">
                      ZeroChill
                      <br />
                      Design System
                    </h1>
                    <p className="mt-5 max-w-lg text-sm leading-8 text-[color:var(--text-muted)] sm:text-[0.98rem]">
                      Components, patterns, and styles for a premium digital experience.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                    <span>Design system</span>
                    <span className="h-1 w-1 rounded-full bg-[#9dffd0]" />
                    <span>2.3k</span>
                    <span className="h-1 w-1 rounded-full bg-[#9dffd0]" />
                    <span>48.9k users</span>
                  </div>

                  <div className="grid gap-3">
                    {featurePanels.map((panel, index) => (
                      <div
                        key={panel.title}
                        className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
                        style={{ marginLeft: `${index * 10}px` }}
                      >
                        <div className="text-[0.68rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                          {panel.title}
                        </div>
                        <p className="mt-2 max-w-md text-sm leading-7 text-[color:var(--text-muted)]">
                          {panel.copy}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to="/preorder"
                      className="inline-flex items-center justify-center rounded-full border border-[#9dffd0]/45 bg-[linear-gradient(135deg,#a8ffd5_0%,#7ef5ff_100%)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#06130d] shadow-[0_16px_36px_rgba(102,255,197,0.22)] transition hover:-translate-y-0.5"
                    >
                      Preorder ZeroChill
                    </Link>
                    <IconButton to="/products" label="Open products">
                      <span aria-hidden="true" className="text-lg leading-none">
                        →
                      </span>
                    </IconButton>
                    <IconButton to="/review" label="Open review">
                      <span aria-hidden="true" className="text-lg leading-none">
                        ↗
                      </span>
                    </IconButton>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--text-faint)]">
                  <span>Live</span>
                  <span className="text-[color:var(--text-dim)]">|</span>
                  <span>zerochill.co</span>
                  <span className="text-[color:var(--text-dim)]">|</span>
                  <span>Est. 2025</span>
                </div>
              </div>
            </div>

            <div className="home-mvp-card relative overflow-hidden rounded-[34px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(248,245,238,0.94))] p-4 shadow-[0_35px_90px_rgba(0,0,0,0.26)] sm:p-5 lg:p-6">
              <div className="home-mvp-card__surface relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-[28px] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(246,243,236,0.96))] p-5 text-[#0f1115] sm:p-6 lg:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(157,255,208,0.18),transparent_18%),radial-gradient(circle_at_84%_18%,rgba(132,123,255,0.16),transparent_20%),radial-gradient(circle_at_72%_76%,rgba(91,183,255,0.12),transparent_18%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.7),transparent_30%,rgba(255,255,255,0.2)_58%,transparent_86%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(15,16,18,0.025)_0,rgba(15,16,18,0.025)_1px,transparent_1px,transparent_10px)] opacity-30" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-black/8 bg-black/[0.03] text-[0.72rem] font-semibold tracking-[0.22em] text-[#0f1115]">
                      ZC
                    </span>
                    <div>
                      <div className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-faint)]">
                        ZeroChill Design System
                      </div>
                      <div className="mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                        v1.0 • EST. 2025
                      </div>
                    </div>
                  </div>

                  <div className="rounded-full border border-black/8 bg-white/70 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                    ZEROCHILL.CO
                  </div>
                </div>

                <div className="relative mt-8 max-w-2xl">
                  <p className="text-[0.64rem] uppercase tracking-[0.34em] text-[color:var(--text-faint)]">
                    ZEROCHILL DESIGN SYSTEM
                  </p>
                  <h2 className="mt-4 font-display text-5xl leading-[0.9] text-[#0c0f14] sm:text-6xl lg:text-[5.7rem]">
                    Build.
                    <br />
                    Scale.
                    <br />
                    Stay ZeroChill.
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-8 text-[#49505b] sm:text-[0.98rem]">
                    UI components and design tokens
                    <br />
                    for the ZeroChill ecosystem.
                  </p>
                </div>

                <div className="relative mt-auto grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                  <div className="rounded-[24px] border border-black/8 bg-white/60 p-4 backdrop-blur-md">
                    <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                      Liquid wallpaper
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                      Mint and violet ribbons drift through a frosted surface.
                    </p>
                  </div>

                  <div className="home-mvp-card__graphic relative min-h-[18rem] overflow-hidden rounded-[30px] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(244,240,232,0.94))]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(157,255,208,0.32),transparent_22%),radial-gradient(circle_at_74%_16%,rgba(132,123,255,0.24),transparent_22%),radial-gradient(circle_at_60%_76%,rgba(91,183,255,0.2),transparent_24%),linear-gradient(145deg,rgba(255,255,255,0.34),transparent_34%,rgba(255,255,255,0.08)_62%,transparent_84%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(13,16,20,0.03)_0,rgba(13,16,20,0.03)_1px,transparent_1px,transparent_10px)] opacity-25" />
                    <div className="pointer-events-none absolute -left-8 top-10 h-52 w-52 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(157,255,208,0.3),transparent_66%)] blur-2xl" />
                    <div className="pointer-events-none absolute right-[-2.5rem] top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(132,123,255,0.22),transparent_62%)] blur-2xl" />
                    <div className="pointer-events-none absolute right-[10%] bottom-[-18%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(91,183,255,0.18),transparent_60%)] blur-2xl" />

                    <div className="relative flex h-full min-h-[18rem] flex-col justify-between p-4 sm:p-5">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-black/8 bg-white/80 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                          Liquid glass
                        </span>
                        <span className="rounded-full border border-black/8 bg-black/[0.03] px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                          Mint / violet / blue
                        </span>
                      </div>

                      <div className="self-end rounded-[22px] border border-black/8 bg-white/72 p-4 backdrop-blur-md">
                        <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                          ZEROCHILL.CO
                        </div>
                        <p className="mt-3 text-sm leading-7 text-[#4b5160]">
                          Frosted MVP panel with a soft liquid-glass field.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
