# Design tokens

Source of truth: `src/styles/tokens.css` (values) and `src/styles/motion.css` (all animation). This file explains the choices.

## Direction: dark, black and white, Apple-style

Set by the owner after the first version. The site borrows the Apple Store's language (black canvas, San Francisco type, dark product tiles, white pill buttons, two-tone section headings, a category icon strip, a swipeable product shelf) so a store that sells Apple products feels native to its customers. It is still By Faka's own site: no Apple logos or imagery, and a trademark notice in the footer.

## Color

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#000000` | Page. |
| `--surface` | `#161617` | Footer, sheets. |
| `--card` | `#1d1d1f` | Product tiles, image wells, inputs (Apple's dark gray). |
| `--card-raised` | `#2a2a2d` | Quiet buttons, paddles, chips. |
| `--ink` | `#f5f5f7` | Text and the solid pill button. |
| `--ink-soft` | `#a1a1a6` | Secondary text (8.3:1 on black). |
| `--ink-faint` | `#86868b` | Tertiary text, second half of two-tone headings (5.8:1). |
| `--ok` / `--warn` / `--muted` | `#30d158` / `#ff9f0a` / `#6e6e73` | Stock dots only. The only hue on the site, because it carries information. |

## Type

`-apple-system` first, so Apple devices render **San Francisco** (Display for headings, Text for body). Everywhere else **Inter** (self-hosted) stands in. Body is 17px, Apple's size. Headlines are semibold with tight tracking (−0.025 to −0.035em). The hero carries a white-to-silver gradient per word.

## Shape and space

- Pills (980px radius) for buttons and segmented controls, 18px for cards, 12px for inputs.
- 48px translucent nav with `saturate(180%) blur(20px)`, like apple.com.
- Generous vertical rhythm (`--s-8` 80px, `--s-9` 120px between major sections).

## Layout

- **Home:** centered hero → category strip (only categories the API returns) → "Disponible ahora. Lo que tenemos en stock." shelf that bleeds to the screen edge but aligns with the content → centered store address set at headline size.
- **Catalog:** sticky filter sidebar on desktop, bottom sheet on mobile, grid/list segmented control.
- **Product:** sticky gallery with zoom, specs as hairline rows, full-width white "Consultar" pill, translucent sticky purchase bar on mobile.
- Breakpoints: `<640px` two-column grid; `<900px` touch layout with bottom tab bar; `≥1100px` four columns.

## Motion (60fps rules)

Every animation moves only `transform` or `opacity`, or is a View Transition snapshot, so the GPU compositor can run it without layout or repaint.

| Moment | Technique |
|---|---|
| First visit: headline words rise behind masks; subhead, CTAs, categories and shelf cards follow in sequence | CSS animations, once per page load (`introPlayed` in `HomePage.tsx`) |
| Product photo flies from card into the product page; grid re-flows on filter/sort; grid↔list morph; tab indicator slides | View Transitions API (`viewTransition` on links and search-param updates; names from `lib/viewTransition.ts`) |
| Sections and headings settle in while scrolling; nav hairline appears | CSS scroll-driven animations (`animation-timeline: view()/scroll()`), off the main thread |
| Filter sheet and photo zoom enter and exit | `@starting-style` + `transition-behavior: allow-discrete` |
| Card hover lift, button press | transform transitions, pointer devices only |
| Loading shimmer | a translating highlight layer, never a repainted background |

`prefers-reduced-motion: reduce` disables all of it, including View Transitions. Browsers without View Transitions or scroll timelines get the same pages with instant changes.

## Measured performance

Production build in headless Chromium:
- **Main thread:** no task longer than 14ms during any interaction (budget: 16.7ms per frame). The only longer task, 32ms, is at initial load.
- **Desktop:** steady 60fps for scrolling, scroll-driven reveals, filter re-flow, zoom and the intro.
- **Mobile profile, 4× CPU throttle:** scrolling and zoom at 59–60fps.
- **Page-morph transitions** ran at 37–47fps, but the trace shows that time in the container's *software* compositor (GPU compositing was disabled there). On a device with a GPU that work is hardware-composited.

**Still to do:** verify on real phones with DevTools' Performance panel.
