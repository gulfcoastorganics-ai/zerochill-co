# Deployment

## Vercel Deployment Steps

1. Push the repository to GitHub.
2. Import the GitHub repository into Vercel.
3. Keep the default build command as `npm run build`.
4. Use `dist` as the output directory if Vercel does not auto-detect it.
5. Verify routes like `/manifest` and `/preorder` refresh correctly.

## Static Hosting Fallback Notes

- This site is a client-side SPA, so the host must rewrite unknown routes to `index.html`.
- If your host supports rewrite rules, route every non-asset request to the app shell.
- If your host supports a `404.html` fallback, point that fallback to the same SPA entry.

## SPA Route Fallback Explanation

React Router handles navigation in the browser, but the server must still serve the app shell on direct requests.
Without a fallback rewrite, refreshing `/docs` or opening `/preorder` directly can produce a 404 from the host.
The included `vercel.json` and `public/_redirects` are there to reduce that risk.

## Environment Variable Notes

- No backend environment variables are required yet.
- When the preorder backend exists, store keys and endpoints in `.env.local` during development.
- Keep secrets out of the frontend bundle and inject only public values that are safe for browser use.
- Add only the variables the form submission API actually needs, such as a public endpoint or feature flag.


## Live Deployment

Production: https://zerochill-mogelckj2-gulfcoastorganics-ais-projects.vercel.app
