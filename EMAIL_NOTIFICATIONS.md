# Email Notifications

## Current Status

Working in production.

The preorder API sends email notifications when the required Vercel environment variables are present. If the email path is not configured, the preorder submission is still accepted and the response reports the email state explicitly.

## Live API Endpoint

- `POST /api/preorder`

## Confirmed Response Example

```json
{
  "ok": true,
  "message": "preorder submission accepted",
  "submission": {
    "id": "sub_01",
    "createdAt": "2026-05-19T18:30:00.000Z",
    "name": "Danny Ford",
    "email": "danny@example.com",
    "intendedUse": "Private AI deployment review",
    "preferredTier": "Sovereign Zero Core"
  },
  "emailConfigured": true,
  "emailSent": true
}
```

## Required Vercel Environment Variables

- `RESEND_API_KEY`
- `PREORDER_NOTIFY_TO`
- `PREORDER_FROM_EMAIL`

## Current Limitation

There is no durable database yet.

The function accepts submissions and attempts notification delivery, but serverless memory is not persistent and should not be treated as storage.

## Inbox / Spam Troubleshooting

- Confirm the sender domain is verified in Resend.
- Check that `PREORDER_FROM_EMAIL` uses a verified sender address.
- Verify the destination inbox is not filtering transactional mail into spam or promotions.
- Confirm the `PREORDER_NOTIFY_TO` address is correct and active.
- Review Resend delivery logs if the message does not reach the mailbox.

## Changing the Recipient Email

Update `PREORDER_NOTIFY_TO` in the Vercel environment settings.

The API reads this value on each request, so the next submission uses the new destination without a code change.

## Changing the Sender Email

After domain verification in Resend, update `PREORDER_FROM_EMAIL` to the new verified sender address.

Keep the sender aligned with the verified domain to reduce delivery problems.

## Recommended Next Step

Add persistent lead storage.

The next practical layer is a small database-backed submission store, followed by an export and CRM pipeline.

## Handoff Notes for Danny Ford

- Email notifications are active when the environment variables are configured correctly.
- The frontend still behaves safely if notification delivery fails.
- No secret values are stored in the repository.
- The current system is suitable for launch review, but not yet for long-term lead retention without storage.

