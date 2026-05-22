# Codebase Explanation

## 1) What This Project Is

`zerochill-site` is the GulfCoast Labs website. It is a Next.js App Router site built to convert visitors into project inquiries and launch buyers. The positioning is an infrastructure studio:

- operational startup systems
- AppSec and operator dashboards
- backend/API workflows
- mobile-first deployment UX
- cinematic infrastructure branding

The site is intentionally lean. It avoids a backend, database, or heavy dependencies for the current launch.

## 2) How The App Is Structured

The app is organized around a small App Router surface:

- [app/page.tsx](/home/gulfcoastorganics/zerochill-site/app/page.tsx) is the main homepage and conversion page
- [app/preorder/page.tsx](/home/gulfcoastorganics/zerochill-site/app/preorder/page.tsx) is the preorder handoff page
- [app/success/page.tsx](/home/gulfcoastorganics/zerochill-site/app/success/page.tsx) is the checkout success page
- [components/InquiryForm.tsx](/home/gulfcoastorganics/zerochill-site/components/InquiryForm.tsx) is the client-side inquiry form
- [lib/launchLinks.ts](/home/gulfcoastorganics/zerochill-site/lib/launchLinks.ts) centralizes launch / Payhip link behavior
- [app/globals.css](/home/gulfcoastorganics/zerochill-site/app/globals.css) defines the visual system
- [app/layout.tsx](/home/gulfcoastorganics/zerochill-site/app/layout.tsx) sets the global metadata and root layout

The content is mostly hardcoded in local arrays inside `app/page.tsx`. That keeps the current implementation simple and easy to edit.

## 3) How Routing Works

Routing follows the App Router convention:

- `/` loads the GulfCoast Labs homepage
- `/preorder` explains Sovereign Zero preorder flow and Payhip checkout handoff
- `/success` shows the post-checkout confirmation state

The homepage also includes a `#launch-access` anchor used as the local fallback when Payhip env vars are missing.

## 4) How The Homepage Is Composed

The homepage in `app/page.tsx` is a long-form conversion page with a fixed section order:

1. Hero
   - Headline: `Operational startup systems built for speed.`
   - Supporting copy: AppSec dashboards, backend infrastructure, deployment systems, and cinematic operator-grade UX
   - Two CTAs:
     - `Start a Project`
     - `View Systems`

2. Systems
   - Five service cards:
     - SecureOps Live
     - Startup Infrastructure
     - Mobile-First UX
     - Backend/API Workflows
     - Cinematic Infrastructure Branding
   - Each card includes a short description and capability bullets

3. Lightweight Hardware
   - Explains the build philosophy:
     - constrained-environment engineering
     - efficient builds
     - rapid deployment
     - optimization-first mindset

4. Work With GulfCoast Labs
   - Shows the current offers and starting prices
   - Includes the scope disclaimer

5. Credibility
   - Summarizes proof points
   - Highlights SecureOps Live as the flagship project

6. Inquiry / Contact
   - Uses the `InquiryForm` component
   - Collects project details from prospects

The page is designed to sell a project conversation, not to act as a generic portfolio.

## 5) How The Inquiry Form Works

`components/InquiryForm.tsx` is a client component. It:

- stores form values in local React state
- validates required fields and email format
- shows inline error messages
- prevents submission when validation fails
- logs a successful submission to the console
- resets after a valid submit

There is no backend submission yet. This is deliberately frontend-only until a mail, API, or CRM destination is added.

## 6) How Styling And Theme Work

The visual system lives mainly in `app/globals.css`:

- dark matte / black background
- ice-blue accents
- steel-gray text tones
- grid and scanline overlays
- motion for cards, bars, and subtle button shimmer

Styling is done with utility classes in the components plus a few shared CSS classes:

- `zerochill-shell`
- `zerochill-card`
- `zerochill-button`
- `zerochill-grid-overlay`
- `zerochill-scanlines`

The layout is mobile-first:

- sections stack cleanly
- CTAs collapse to vertical flow on small screens
- cards use responsive grid breakpoints
- the shell prevents horizontal overflow

## 7) Where Core Content Is Edited

Most content is edited directly in `app/page.tsx`:

- hero copy
- system cards
- hardware principles
- offers and pricing
- credibility bullets

The following are the main extension points for configuration:

- [lib/launchLinks.ts](/home/gulfcoastorganics/zerochill-site/lib/launchLinks.ts) for Payhip URLs and fallback behavior
- [components/InquiryForm.tsx](/home/gulfcoastorganics/zerochill-site/components/InquiryForm.tsx) for lead capture behavior
- [app/preorder/page.tsx](/home/gulfcoastorganics/zerochill-site/app/preorder/page.tsx) and [app/success/page.tsx](/home/gulfcoastorganics/zerochill-site/app/success/page.tsx) for launch-commerce messaging

## 8) How To Run, Build, Lint, And Typecheck

Local development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Typecheck:

```bash
npx tsc --noEmit
```

`npm test` is not defined in `package.json`.

## 9) What Is Already Production-Ready

The following pieces are in a shippable state:

- the GulfCoast Labs homepage
- the `/preorder` page
- the `/success` page
- the centralized Payhip / launch link config
- the fallback path when launch env vars are missing
- the inquiry form validation and UI
- the current styling and responsive layout
- build / lint / typecheck passing

## 10) What Still Needs To Be Wired Next

The next realistic additions are:

- connect `InquiryForm` to email, a backend endpoint, or a CRM
- add case studies or proof-of-work sections
- add screenshots or short video clips
- add analytics
- add a real client pipeline / lead workflow
- align the legacy `/preorder` and `/success` pages more closely with the GulfCoast Labs brand if needed

## Practical Handoff

If you are taking over this codebase, start here:

1. Read `README.md`
2. Read `OPERATOR_RUNBOOK.md`
3. Read `DEVELOPER_ONBOARDING.md`
4. Edit `app/page.tsx` for homepage content
5. Edit `components/InquiryForm.tsx` if you need lead capture changes
6. Edit `lib/launchLinks.ts` for checkout routing behavior

