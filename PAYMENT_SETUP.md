# Payment Setup

## Scope

ZeroChill payment infrastructure is test-mode only until Danny Ford approves live ownership and production money collection.

The current checkout endpoint creates Stripe Checkout sessions for test-mode review and continuation planning. It does not enable live charges.

## Required Environment Variables

- `STRIPE_SECRET_KEY`
- `SITE_URL`

## Stripe Test Mode Setup

1. Create or open a Stripe account.
2. Use the Stripe test secret key only.
3. Set `STRIPE_SECRET_KEY` to the test secret key value.
4. Set `SITE_URL` to the deployed public URL, or leave it unset to use the fallback `https://zerochill-co.vercel.app`.
5. Deploy the app and confirm the private `/funding-summary` page can create Checkout sessions when it is intentionally used for test-mode review.

## Live Mode Warning

Do not switch to live mode until Danny Ford explicitly approves payment ownership and live collection.

Live mode requires a separate decision because it changes financial responsibility, support expectations, and operational risk.

## Ownership and Handoff Notes for Danny

- gulfcoastorganics-ai is the builder/operator until handoff is approved.
- Stripe test mode is safe for validating flow and messaging.
- The repository should not be treated as live payment infrastructure until Danny signs off on production ownership.
- Payment URLs should be reviewed before live launch, even if the test flow is working.

## Switching From Test Mode to Live Mode

After approval:

1. Replace the test secret key with the live Stripe secret key.
2. Confirm `SITE_URL` matches the production domain.
3. Verify the success and cancel routes on the live site.
4. Review the payment copy and ownership terms one more time.
5. Enable live checkout only after Danny confirms the handoff.

## Operational Notes

- The checkout flow should stay limited to the approved funding tiers.
- Custom operational rollout should continue to route through review before payment planning.
- The frontend should continue to say that payment infrastructure is pending activation when the secret key is not configured.
