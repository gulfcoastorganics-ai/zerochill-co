# Launch QA Checklist

Use this checklist before production launch and after any Payhip link change.

## Page Checks

- [ ] Homepage loads at `/`
- [ ] Preorder page loads at `/preorder`
- [ ] Success page loads at `/success`
- [ ] All preorder and launch CTA buttons resolve correctly
- [ ] Missing env vars fall back safely to the local launch access section
- [ ] Payhip links open correctly when env vars are present
- [ ] Mobile viewport renders cleanly at narrow widths

## Build Checks

- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] `npx tsc --noEmit`

## Deployment Checks

- [ ] Add `NEXT_PUBLIC_PAYHIP_SOVEREIGN_ZERO_URL` to Vercel environment variables
- [ ] Add `NEXT_PUBLIC_PAYHIP_MATRIX_ACCESS_URL` to Vercel environment variables
- [ ] Set the Payhip success redirect to `/success` or the absolute production URL
- [ ] Verify the live preorder CTA points to Payhip
- [ ] Verify the live success page shows the post-checkout handoff

## Notes

- The homepage includes the local `#launch-access` fallback.
- The preorder page shows fallback messaging only when the Payhip URL is missing.
