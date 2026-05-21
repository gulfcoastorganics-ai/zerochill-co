import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Panel from '../components/ui/Panel';

function IconButton({ to, label, children }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-[color:var(--text)] transition hover:bg-white/[0.08] hover:-translate-y-0.5"
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
        description="ZeroChill Design System: premium components, patterns, and styles for the ZeroChill ecosystem."
      />

      <section className="home-cover mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Panel className="home-cover__shell overflow-hidden p-3 sm:p-4">
          <div className="grid min-h-[calc(100vh-3rem)] gap-3 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="home-cover__left relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(12,13,16,0.98),rgba(8,9,12,0.98))] p-6 text-[color:var(--text)] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(157,255,208,0.08),transparent_18%),radial-gradient(circle_at_88%_10%,rgba(132,123,255,0.1),transparent_20%),radial-gradient(circle_at_40%_102%,rgba(91,183,255,0.08),transparent_20%)]" />

              <div className="relative flex items-start justify-between gap-6">
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[0.75rem] font-semibold tracking-[0.22em]">
                      ZC
                    </span>
                    <div className="leading-tight">
                      <div className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[color:var(--text-dim)]">
                        ZeroChill
                      </div>
                      <div className="mt-1 text-[0.64rem] uppercase tracking-[0.24em] text-[color:var(--text-faint)]">
                        Design system
                      </div>
                    </div>
                  </div>

                  <div className="max-w-xl">
                    <p className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-faint)]">
                      ZEROCHILL WORDMARK
                    </p>
                    <h1 className="mt-5 font-display text-5xl leading-[0.92] text-[color:var(--text)] sm:text-6xl lg:text-[5.7rem]">
                      ZeroChill
                      <br />
                      Design System
                    </h1>
                    <p className="mt-5 max-w-lg text-sm leading-8 text-[color:var(--text-muted)] sm:text-[0.98rem]">
                      Components, patterns, and styles for a premium digital experience.
                    </p>
                  </div>
                </div>

                <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[0.64rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)] lg:block">
                  Live
                </div>
              </div>

              <div className="relative mt-10 space-y-8">
                <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                  <span>Design system</span>
                  <span className="h-1 w-1 rounded-full bg-[color:var(--accent-soft)]" />
                  <span>2.3k</span>
                  <span className="h-1 w-1 rounded-full bg-[color:var(--accent-soft)]" />
                  <span>48.9k users</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/preorder"
                    className="inline-flex items-center justify-center rounded-full border border-[#9dffd0]/45 bg-[linear-gradient(135deg,#a8ffd5_0%,#7ef5ff_100%)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#06130d] shadow-[0_14px_34px_rgba(102,255,197,0.2)] transition hover:-translate-y-0.5"
                  >
                    Preorder
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

              <div className="relative mt-10 flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--text-faint)]">
                <span>Live</span>
                <span className="text-[color:var(--text-dim)]">/</span>
                <span>zerochill.co</span>
                <span className="text-[color:var(--text-dim)]">/</span>
                <span>Est. 2025</span>
              </div>
            </div>

            <div className="home-cover__right relative overflow-hidden rounded-[28px] border border-[rgba(12,14,18,0.08)] bg-[linear-gradient(180deg,#fbfaf6_0%,#f4f1ea_100%)] p-4 sm:p-5 lg:p-6">
              <div className="home-cover__right-surface relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[22px] border border-black/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,244,236,0.96))] p-5 sm:p-6 lg:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(157,255,208,0.18),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(132,123,255,0.16),transparent_22%),radial-gradient(circle_at_72%_78%,rgba(91,183,255,0.12),transparent_20%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.65),transparent_30%,rgba(255,255,255,0.18)_58%,transparent_82%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(15,16,18,0.028)_0,rgba(15,16,18,0.028)_1px,transparent_1px,transparent_10px)] opacity-25" />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-[0.72rem] font-semibold tracking-[0.22em] text-[#0f1115]">
                      ZC
                    </span>
                    <div>
                      <div className="text-[0.66rem] uppercase tracking-[0.34em] text-[color:var(--text-faint)]">
                        ZeroChill Design System
                      </div>
                      <div className="mt-1 text-[0.68rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                        v1.0 • Est. 2025
                      </div>
                    </div>
                  </div>

                  <div className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-[color:var(--text-dim)]">
                    ZEROCHILL.CO
                  </div>
                </div>

                <div className="relative mt-8 max-w-2xl">
                  <p className="text-[0.64rem] uppercase tracking-[0.34em] text-[color:var(--text-faint)]">
                    ZEROCHILL DESIGN SYSTEM
                  </p>
                  <h2 className="mt-4 font-display text-5xl leading-[0.9] text-[#0d0f13] sm:text-6xl lg:text-[5.7rem]">
                    Build.
                    <br />
                    Scale.
                    <br />
                    Stay ZeroChill.
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-8 text-[color:var(--text-muted)] sm:text-[0.98rem]">
                    UI components and design tokens for the ZeroChill ecosystem.
                  </p>
                </div>

                <div className="relative mt-auto grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                  <div className="rounded-[24px] border border-black/10 bg-white/55 p-4 backdrop-blur-md">
                    <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                      Liquid wallpaper
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                      Abstract gradients and glass layers define the showcase without adding clutter.
                    </p>
                  </div>

                  <div className="home-cover__graphic relative min-h-[18rem] overflow-hidden rounded-[28px] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(244,240,232,0.95))]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(157,255,208,0.26),transparent_22%),radial-gradient(circle_at_76%_16%,rgba(132,123,255,0.24),transparent_20%),radial-gradient(circle_at_62%_78%,rgba(91,183,255,0.2),transparent_24%),linear-gradient(145deg,rgba(255,255,255,0.32),transparent_34%,rgba(255,255,255,0.08)_62%,transparent_84%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(13,16,20,0.03)_0,rgba(13,16,20,0.03)_1px,transparent_1px,transparent_10px)] opacity-30" />
                    <div className="pointer-events-none absolute -left-8 top-12 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(157,255,208,0.28),transparent_66%)] blur-2xl" />
                    <div className="pointer-events-none absolute right-[-3rem] top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(132,123,255,0.22),transparent_62%)] blur-2xl" />
                    <div className="pointer-events-none absolute right-[12%] bottom-[-20%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(91,183,255,0.18),transparent_60%)] blur-2xl" />
                    <div className="relative flex h-full min-h-[18rem] flex-col justify-between p-4 sm:p-5">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                          Liquid glass field
                        </span>
                        <span className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-[color:var(--text-dim)]">
                          Mint / violet / blue
                        </span>
                      </div>

                      <div className="max-w-xs self-end rounded-[22px] border border-black/10 bg-white/55 p-4 backdrop-blur-md">
                        <div className="text-[0.64rem] uppercase tracking-[0.28em] text-[color:var(--text-faint)]">
                          ZEROCHILL.CO
                        </div>
                        <p className="mt-3 text-sm leading-7 text-[color:var(--text-muted)]">
                          Pure CSS wallpaper. No literal object. No clutter.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </section>
    </>
  );
}
