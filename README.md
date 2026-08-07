# ZeroChill Co.

ZeroChill Co. is a production Next.js site for sovereign AI infrastructure, localized deployment systems, telemetry-isolated operator tools, and edge-inference surfaces.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Server-side inquiry intake with Resend-compatible email delivery
- Payhip checkout links

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

```bash
npm run build
npm run lint
npx tsc --noEmit
npm test
npm run check:production
npm run check:intake
```

The production checks target `https://zerochill-co.vercel.app` by default and accept `ZEROCHILL_SITE_URL` as an override.

## Architecture

- `app/`: pages, layouts, and API route handlers
- `components/InquiryForm.tsx`: inquiry form UI
- `lib/inquiryIntake.ts`: intake validation, rate limiting, and mail formatting
- `lib/launchLinks.ts`: centralized checkout-link configuration

See [CODEBASE_OVERVIEW.md](CODEBASE_OVERVIEW.md), [ARCHITECTURE_NOTES.md](ARCHITECTURE_NOTES.md), and [DEVELOPER_ONBOARDING.md](DEVELOPER_ONBOARDING.md).

## Live site

[zerochill-co.vercel.app](https://zerochill-co.vercel.app)

No screenshot gallery is currently linked; add current product captures if visual review is important.
