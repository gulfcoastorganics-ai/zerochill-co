# Architecture Notes

## Runtime Model

This is a static-first App Router site:

- Pages render from `app/`
- Styling comes from Tailwind utility classes plus global tokens
- No backend services are required for the current homepage
- The inquiry form is frontend-only for now

## Important Files

- `app/page.tsx`
  - GulfCoast Labs homepage
  - Primary conversion surface
- `components/InquiryForm.tsx`
  - Client-side validated inquiry capture
- `app/globals.css`
  - Global palette, motion, and shared visual treatment
- `app/layout.tsx`
  - Metadata and root HTML/body wrapper
- `lib/launchLinks.ts`
  - Shared Payhip / launch link resolution
- `app/preorder/page.tsx`
  - Legacy preorder handoff page
- `app/success/page.tsx`
  - Legacy checkout success page

## Routing

Current routes:

- `/`
- `/preorder`
- `/success`

Important note:

- The homepage is GulfCoast Labs.
- `/preorder` and `/success` still carry the earlier launch-commerce branding and are candidates for later alignment if the studio wants a single consistent brand voice.

## Styling Mechanics

The site uses a layered visual system:

- Base black background
- Light infrastructure grid
- Ice-blue accent color
- Steel-gray secondary text
- Card shadows and subtle glow accents

The CSS is intentionally lightweight:

- no design-system dependency
- no animation library
- no component framework beyond React + Tailwind utilities

## Data Flow

The homepage is data-driven from local arrays inside `app/page.tsx`:

- systems
- hardwarePrinciples
- offers
- credibilityPoints

That makes the page easy to edit, but it also means content is hardcoded until moved into a config layer.

## Form Flow

`components/InquiryForm.tsx` currently:

1. Holds form state locally
2. Validates required fields and email format
3. Displays inline errors
4. Logs the submission to the console
5. Resets the form after a valid submit

This is enough for launch, but not enough for lead capture at scale.

## Deployment Model

The site is built to deploy cleanly on Vercel:

- environment variables are expected for Payhip links
- static generation should work
- no server state is required for the homepage

Recommended deployment checks:

- set production env vars
- run `npm run build`
- verify the homepage on mobile
- verify the inquiry form behavior

## Extension Points

Likely next integrations:

- wire the inquiry form to an API route or email service
- add case studies
- add screenshots or short video clips
- add analytics
- add CRM / pipeline handoff
- align the legacy `/preorder` and `/success` pages with the new GulfCoast Labs brand

