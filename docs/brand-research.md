# By Faka: brand research

Researched 2026-10-19. Facts are separated from assumptions on purpose: almost nothing about the brand could be verified from public sources.

## What was attempted

| Source | Result |
|---|---|
| `instagram.com/apple.by.faka` (curl, WebFetch) | Redirects anonymous visitors to the login page (HTTP 302, then 429). Not bypassed. |
| `ig.me/m/apple.by.faka` | Resolves (302), so the handle exists. Used as the DM link. |
| `linktr.ee/apple.by.faka` | 404 |
| Web searches ("By Faka" + Mar del Plata, address, handle) | No website, maps listing, directory entry or press for the business. |
| Screenshot of the Instagram profile mentioned in the brief | Not present in the session; never seen. |

## Verified

- The Instagram handle `@apple.by.faka` exists.
- Av. Independencia 1201–1299 (odd numbers) is a real block in Mar del Plata, postal code B7600DHI. A business at number 1273 was **not** confirmed.

## Supplied by the owner (used as given, not independently verified)

- Name: By Faka | Apple Store. Address: Av. Independencia 1273, Mar del Plata, Buenos Aires.
- Sells Apple products: new and used iPhones and accessories; advice; in-store and WhatsApp-assisted sales.
- Profile content: real people, hands-on product photos, store interior, stock/offer and educational posts.

## Unknown (not invented anywhere in the site)

Logo, brand colors and typography, photography, WhatsApp number, opening hours, payment methods, financing, warranty terms, trade-in, shipping, whether the store is an Apple Authorized Reseller.

## Assets

None could be obtained. See `docs/assets.md` for the manifest and where real assets go.

## Design decisions that follow

- **No fake imagery.** No AI or stock photos. Product images come only from the API; missing ones show a neutral "Sin foto" tile.
- **Visual direction set by the owner.** Dark, black and white, Apple-style (see `design-tokens.md`). The first version, a green-and-yellow "shelf tag" identity derived from retail vernacular, was replaced at the owner's request.
- **Physical store up front.** The address appears in the hero, on every product page, as a headline-size section, and in the footer.
- **Conversation instead of checkout.** Purchase intent becomes a prefilled WhatsApp message (Instagram DM + copyable message until the number is confirmed).
- **Wordmark placeholder.** "By Faka" is typeset in one component (`src/components/Wordmark.tsx`) to be replaced by the real logo.
- **Product photos on dark tiles.** Photos shot on white backgrounds will show as white rectangles inside the dark cards. For the best result, use photos on dark or transparent backgrounds (background removal on the product images in the management software).

## Risks to raise with the owner

- The Apple-style design must stay clearly By Faka's: no Apple logos or product imagery that isn't the store's own. "Apple Store" in a business name is an Apple trademark. The site uses "By Faka" as the brand and shows the full name only in the footer, with a trademark notice. Confirm how they want to present it.
- Do not claim "authorized reseller", warranty or financing until the owner confirms them in writing.
