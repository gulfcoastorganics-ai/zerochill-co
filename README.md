# ZeroChill Co

ZeroChill Co is a production-ready frontend for a sovereign AI infrastructure brand. The site uses Vite, React, and Tailwind CSS v4 to present a hardened launch experience with terminal styling, crimson accents, and a low-dependency footprint.

## Project Overview

- Local-first AI infrastructure positioning
- Anti-cloud, sovereignty-first brand narrative
- Obsidian-black UI with industrial paneling
- SPA routing for launch pages, product pages, docs, and preorder interest capture

## Brand Architecture

- `Home`: launch broadcast and brand overview
- `Sovereign Zero`: product platform story
- `Zero State Matrix`: control-plane and orchestration story
- `Manifest`: operating doctrine and brand stance
- `Docs`: technical notes and implementation preview
- `Preorder`: local-storage preorder interest form

## Setup

```bash
npm install
```

## Crostini Dev Command

```bash
npm run dev
```

If you need to call Vite directly:

```bash
npm run dev -- --host 0.0.0.0 --port 4173
```

## Build Command

```bash
npm run build
```

## Deployment Notes

- Vercel: the included `vercel.json` rewrites all routes to `index.html`, so direct navigation and refreshes work.
- Static hosting: configure an SPA fallback so every non-file request returns `index.html`.
- The preorder form currently stores submissions in `localStorage`; replace that path with an API when the backend is ready.
- `public/_redirects` is included for hosts that respect Netlify-style fallback rules.

## Route Map

- `/`
- `/sovereign-zero`
- `/zero-state-matrix`
- `/manifest`
- `/docs`
- `/preorder`

## Folder Structure

```text
zerochill/
├── index.html
├── package.json
├── public/
│   ├── _redirects
│   └── favicon.svg
├── src/
│   ├── App.jsx
│   ├── components/
│   ├── data/
│   ├── pages/
│   └── styles/
├── vercel.json
└── vite.config.js
```


## Live Deployment

Production: https://zerochill-mogelckj2-gulfcoastorganics-ais-projects.vercel.app
