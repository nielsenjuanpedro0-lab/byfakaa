# Asset manifest

| Asset | Status | Source | Notes |
|---|---|---|---|
| Official logo | Missing | Instagram profile (login-walled) | Replace the typeset wordmark in `src/components/Wordmark.tsx`. Prefer SVG; keep proportions. |
| Store interior / team photos | Missing | Instagram posts | Needs the owner's files and permission. Good candidates: storefront for the home store section, counter with real devices. |
| Product photos | From API | `images` field of each product | Shown with `object-fit: contain` on dark tiles, so ratios stay intact. Photos on dark or transparent backgrounds look best; white-background photos show as white rectangles. |
| Favicon | Placeholder | `public/favicon.svg` (white "F" on black) | Replace with a mark derived from the real logo. |
| Font | System + bundled | San Francisco on Apple devices; `@fontsource-variable/inter` (OFL) elsewhere | Self-hosted, no third-party requests. |
| Dev test images | Dev only | Inline SVGs in `src/features/products/fixtures.ts` | Labelled "Foto de prueba", never shipped. |

When real photos arrive: put them in `public/brand/`, export at 2x the largest display size in WebP/AVIF, and record the source post URL and permission here.
