GulfCoast Labs is a Next.js website for operational startup systems, AppSec/operator dashboards, backend workflows, deployment UX, and cinematic infrastructure branding.

## Main Files

- [app/page.tsx](./app/page.tsx)
- [components/InquiryForm.tsx](./components/InquiryForm.tsx)
- [lib/launchLinks.ts](./lib/launchLinks.ts)
- [app/globals.css](./app/globals.css)
- [app/preorder/page.tsx](./app/preorder/page.tsx)
- [app/success/page.tsx](./app/success/page.tsx)

## Local Commands

```bash
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

## Deployment Notes

- Set `NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL` and `NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL` in Vercel.
- Set the Payhip success redirect to `/success`.
- Verify the homepage, `/preorder`, and `/success` after deploy.

## Docs

- [Operator Runbook](./OPERATOR_RUNBOOK.md)
- [Developer Onboarding](./DEVELOPER_ONBOARDING.md)
- [Codebase Overview](./CODEBASE_OVERVIEW.md)
- [Architecture Notes](./ARCHITECTURE_NOTES.md)
- [Next Steps](./NEXT_STEPS.md)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Launch Commerce

Payhip checkout links are centralized in [`lib/launchLinks.ts`](./lib/launchLinks.ts).

Paste the live URLs into `.env.local` with these keys:

```bash
NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL=https://your-payhip-link-for-sovereign-zero
NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL=https://your-payhip-link-for-matrix-access
```

If either value is missing, the CTA buttons fall back to the local `/#launch-access` section so the build still works before launch day.

Recommended Payhip success redirect:

```bash
/success
```

Local testing:

```bash
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

Production deployment note:

- Set the Payhip success redirect to `/success`.
- Make sure the two `NEXT_PUBLIC_PAYHIP_*` env vars are present in your production deployment.
- Verify the `/preorder` and `/success` routes after deploy.

## Launch Deployment Checklist

- Copy the Payhip env vars into Vercel production and preview environments.
- Set the Payhip success redirect to `/success` or the absolute production URL.
- Run `npm run build` before deployment.
- Deploy to Vercel.
- Test the live preorder CTA after deploy.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
