# Operator Runbook

## What This Site Is

GulfCoast Labs is a conversion-focused infrastructure studio site. It sells:

- AppSec and operator dashboards
- Startup infrastructure systems
- Backend and API workflows
- Mobile-first deployment UX
- Cinematic infrastructure branding

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Lint and Typecheck

```bash
npm run lint
npx tsc --noEmit
```

## Deploy

1. Set the required Payhip env vars in Vercel.
2. Set the Payhip success redirect to `/success`.
3. Run `npm run build`.
4. Deploy to Vercel.
5. Verify `/`, `/preorder`, and `/success` in production.

## Update Homepage Content

- Edit the arrays and copy in [app/page.tsx](./app/page.tsx).
- Hero text and CTAs live near the top of the file.
- Section content is hardcoded in local arrays for now.

## Update Pricing and Offers

- Edit the `offers` array in [app/page.tsx](./app/page.tsx).
- Update the copy and starting prices together.
- Keep the disclaimer aligned with scope, integrations, and timeline.

## Update CTAs and Links

- Edit [lib/launchLinks.ts](./lib/launchLinks.ts) for Payhip URLs and fallback behavior.
- Keep homepage CTAs pointed at the centralized launch config.
- If env vars are missing, the site falls back to the local `#launch-access` panel.

## Troubleshoot Common Issues

- Build fails on missing env vars:
  - Check `.env.local` or Vercel environment variables.
- CTA opens the fallback panel:
  - The Payhip URL is missing or blank.
- Form does not submit:
  - The inquiry form is frontend-only and only validates/logs locally.
- Layout looks cramped on mobile:
  - Check the section spacing and card grid classes in [app/page.tsx](./app/page.tsx) and [app/globals.css](./app/globals.css).

## Current Limitations

- Inquiry submissions do not go to email or CRM yet.
- `/preorder` and `/success` still reflect the launch-commerce flow and may need brand alignment later.
- Case studies, screenshots, analytics, and CRM handoff are not wired yet.

