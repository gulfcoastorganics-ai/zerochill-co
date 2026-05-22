# Codebase Overview

## What This Site Is

`zerochill-site` is a Next.js App Router site for ZeroChill Co. The current homepage is a sovereign infrastructure landing page for private AI deployment and operational control:

- Sovereign AI deployment systems
- Edge inference and local execution surfaces
- Telemetry-isolated operator tooling
- Private infrastructure and launch queue flows
- Hardened command-center branding

## High-Level Architecture

- Framework: Next.js 16 with React 19 and TypeScript
- App structure: App Router under `app/`
- Routing:
  - `/` is the ZeroChill Co. homepage
  - `/preorder` is the Sovereign Zero preorder page
  - `/success` is the post-checkout page
- Styling system:
  - Tailwind v4 utility classes in components
  - Global theme and motion tokens in `app/globals.css`
  - Dark matte base with crimson indicators and steel overlays
- Key components:
  - `app/page.tsx` for the homepage
  - `components/InquiryForm.tsx` for the contact form
  - `lib/launchLinks.ts` for Payhip / launch link resolution
- Deployment assumptions:
  - Static-friendly build on Vercel
  - Environment variables provided through Vercel or `.env.local`
  - No database required for the current flow

## Homepage Flow

The homepage in `app/page.tsx` is a single long-form conversion page:

1. Hero
   - Headline: `Sovereign AI infrastructure for localized deployment.`
   - Supporting copy describes edge inference, private deployment systems, telemetry isolation, and command-center tooling.
   - Two CTAs:
     - `View Launch Access`
     - `Sovereign Zero Preorder`

2. Systems
   - Five operational cards:
     - Private node deployment
     - Separated signal planes
     - Launch orchestration surfaces
     - Localized execution fabric
     - Zero-State Matrix command language
   - Each card includes a short description, capability bullets, and a badge/icon treatment.

3. Launch Access
   - Centralized launch panel for the shared Payhip URLs
   - Includes local fallback behavior when env vars are missing

4. Deployment Posture
   - Explains the delivery advantage:
     - sovereign by design
     - telemetry isolation
     - efficient builds
     - operational uptime

5. Offers / Pricing
   - Shows starting prices for the core service offers:
     - Sovereign Node Stack
     - Operator Command Console
     - Edge Inference Workflow
     - Zero-State Matrix UI
   - Includes the scope disclaimer.

6. Credibility / Flagship
   - Reinforces proof points:
     - localized deployment planning
     - telemetry-isolated surfaces
     - edge inference concepts
     - operator-grade workflow design
     - Sovereign Zero as the flagship hardware path

7. Intake / Contact
   - Frontend-only form with validation
   - Collects:
     - name
     - email
     - project type
     - budget range
     - timeline
     - project notes
   - Submits to console for now and shows inline status feedback

## Shared Components

### `components/InquiryForm.tsx`

- Client component with local state
- Performs basic validation before submit
- Shows inline field errors
- Uses a console fallback instead of a backend
- Isolated so it can later be swapped for:
  - mailto flow
  - CRM integration
  - API route submission

### Shared UI Patterns in `app/page.tsx`

- `SectionTitle`
  - small reusable heading/eyebrow block
- `ActionButton`
  - consistent CTA button styling
- `LaunchSignalCard`
  - reusable launch access card with fallback-aware routing

## Styling System

### `app/globals.css`

- Defines the base tokens:
  - `--background`
  - `--foreground`
  - `--accent`
  - `--steel`
- Applies the global grid/background treatment
- Defines motion tokens for scanlines, pulsing, bars, shimmer, and fade-up
- Keeps cards and CTAs visually consistent across the site

### Visual Direction

- Dark matte / black surface
- Crimson accent color
- Minimal but premium infrastructure feel
- Infrastructure-grid and scanline treatment
- Responsive card layouts that stack cleanly on mobile

### Mobile Behavior

- `overflow-x-clip` on the page shell
- Grid sections collapse to one or two columns based on width
- CTA buttons stack on smaller screens
- Cards keep readable spacing and line lengths on mobile

## Content Model

### Hardcoded Content

Currently hardcoded in `app/page.tsx`:

- Hero copy
- System card content
- Launch access content
- Deployment principles
- Offer/pricing labels
- Credibility bullets
- Intake helper text

### Configurable Later

Good candidates to move into config or CMS later:

- Service cards
- Offer pricing
- Credibility items
- Contact form destinations
- Analytics and tracking IDs
- Case study data
- Media assets

## Validation

The current package scripts are:

```bash
npm run build
npm run lint
```

TypeScript validation is run separately with:

```bash
npx tsc --noEmit
```

`npm test` is not defined in `package.json`.
