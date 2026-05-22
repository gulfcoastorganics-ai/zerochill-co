# Codebase Overview

## What This Site Is

`zerochill-site` is a Next.js App Router site for GulfCoast Labs. The current homepage is a conversion-focused studio landing page for operational startup systems:

- AppSec / operator dashboards
- Backend and API workflows
- Deployment UX
- Cinematic infrastructure branding
- Lightweight-hardware-friendly delivery

## High-Level Architecture

- Framework: Next.js 16 with React 19 and TypeScript
- App structure: App Router under `app/`
- Routing:
  - `/` is the GulfCoast Labs homepage
  - `/preorder` is the Sovereign Zero preorder page
  - `/success` is the post-checkout page
- Styling system:
  - Tailwind v4 utility classes in components
  - Global theme and motion tokens in `app/globals.css`
  - Dark matte base with ice-blue accents
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
   - Headline: `Operational startup systems built for speed.`
   - Supporting copy describes AppSec dashboards, backend infrastructure, deployment systems, and cinematic UX.
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
   - Each card includes a short description, capability bullets, and a badge/icon treatment.

3. Lightweight Hardware
   - Explains the delivery advantage:
     - constrained-environment engineering
     - efficient builds
     - rapid deployment
     - optimization-first mindset

4. Offers / Pricing
   - Shows starting prices for the core service offers:
     - MVP Infrastructure Stack
     - Operator Dashboard Systems
     - Backend/API Systems
     - Security UX & Visualization
   - Includes the scope disclaimer.

5. Credibility / Flagship
   - Reinforces proof points:
     - live deployments
     - AppSec/operator concepts
     - backend workflows
     - mobile-first UX
     - SecureOps Live as the flagship project

6. Inquiry / Contact
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
- `CtaLink`
  - consistent CTA button styling

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
- Ice-blue accent color
- Minimal but premium startup-studio feel
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
- Hardware principles
- Offer/pricing labels
- Credibility bullets
- Inquiry helper text

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

