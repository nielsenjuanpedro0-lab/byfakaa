# Design tokens

Source of truth: `src/styles/tokens.css` (values) and `src/styles/motion.css` (all animation). This file explains the choices.

## Direction: "Vitrina" layout, "Noir" look

Chosen by the owner from five landing proposals: the structure of proposal 01 "Vitrina" (centered hero, the four ways to buy, stock grid, three steps, Instagram tips, the store) with the aesthetic of proposal 02 "Noir" (near-black canvas, light geometric display type, wide-tracked uppercase wordmark, one orange accent, hairlines, a glowing product stage). No Apple logos or imagery, and a trademark notice in the footer.

## Color

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0b0b0b` | Page. |
| `--surface` | `#121212` | Footer, the steps band. |
| `--card` | `#161616` | Product tiles, line and tip cards, inputs. |
| `--card-raised` | `#222222` | Quiet buttons, chips. |
| `--accent` / `--accent-strong` | `#f08a3c` / `#ff9b4f` | Primary pill buttons, numbering, second hero line, hover borders. |
| `--accent-glow` | `rgb(240 138 60 / 0.35)` | The showcase stage glow. |
| `--ink` | `#f5f5f7` | Text. |
| `--ink-soft` | `#a1a1a6` | Secondary text. |
| `--ink-faint` | `#86868b` | Tertiary text. |
| `--ok` / `--warn` / `--muted` | `#30d158` / `#ff9f0a` / `#6e6e73` | Stock dots. |

## Type

**Montserrat** (variable, self-hosted) for display, mostly at weight 300–400; **Inter** for text. The wordmark and small labels are uppercase with wide tracking (`--track-wide`, 0.32em). Body is 17px.

## Shape and space

- Pills (980px radius) for buttons and segmented controls, 18px for cards, 12px for inputs.
- 48px translucent nav with `saturate(180%) blur(20px)`, like apple.com.
- Generous vertical rhythm (`--s-8` 80px, `--s-9` 120px between major sections).

## Layout

- **Home:** centered hero with stock pill and the newest unit on a glowing stage → "Elegí cómo lo querés" (Sellados, Like New, Usados seleccionados, Android) → "Disponibles ahora" grid of up to 8 units → "Comprar es así de simple" steps → Instagram tips → "Te esperamos en el local" with the map.
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
