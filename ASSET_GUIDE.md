# Asset Guide

## Naming Conventions

- Use lowercase, hyphenated filenames.
- Keep the system prefix consistent: `zerochill-...`.
- Use `primary`, `monogram`, `terminal`, `monochrome`, `crimson`, and `icon` for logo variants.
- Use descriptive suffixes for campaign assets, such as `x-twitter-banner` or `terminal-splash-screen`.

## Export Recommendations

- Prefer pure SVG for all brand and campaign assets.
- Keep artwork vector-native unless a raster format is required by a platform.
- If a raster export is needed later, export from the SVG master at platform-native dimensions.
- Avoid unnecessary effects, filters, or embedded bitmaps.
- Keep any future PNG/WebP exports out of the repo unless they are required for deployment.

## Favicon Usage Notes

- Use `assets/logos/zerochill-icon.svg` as the source icon asset.
- The site favicon currently lives in `public/favicon.svg` for browser delivery.
- When generating app icons or masks, preserve the angular mark and the crimson accent line.
- Avoid replacing the favicon with a generic lettermark or a bitmap export.

## Asset Structure

```text
assets/
├── banners/
├── logos/
├── mockups/
├── social/
└── wallpapers/
```

## Brand References

- Obsidian black and deep charcoal surfaces
- Crimson telemetry glow
- Industrial UI framing
- Tactical minimalism
- Cyberpunk infrastructure language
- Terminal-inspired symbolism
