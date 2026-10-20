# Product API integration

> **Connected to Stackr.** `api/catalog.ts` is a server-side proxy (Vercel function `/api/catalog`, and Vite dev middleware): it reads `GET /api/v1/stock` with `STACKR_API_KEY`, keeps only units with `in_catalog: true`, and strips internal fields (imei, notes, cost, supplier, deposit). Stackr rejects browser calls, so the key must stay server-side. Set `VITE_API_BASE_URL=/api`, `VITE_API_PRODUCTS_PATH=catalog` and `STACKR_API_KEY` in the host's environment. The text below is the original generic guide.

The storefront reads products from the existing management software's API. That API's endpoint, response shape and authentication were **not available** when this was built, so the integration is a clean boundary waiting for real details.

## Data flow

```
fetch (src/lib/api-client.ts)       timeout, HTTP and JSON errors → ApiError
  → parseCatalog (upstream.ts)      zod validation; invalid items skipped and counted
  → Product (types.ts)              internal model, the only shape UI code sees
  → useCatalog (useCatalog.ts)      one shared request per page load, retry, stale-result guard
  → pages and components
```

The product detail page reads from the same list, so no detail endpoint is assumed.

## To connect the live API

1. **Get a real response sample** (one page of products, as JSON) and the auth method.
2. **Rewrite `src/features/products/upstream.ts`**: the `upstreamProduct` schema and `toProduct()` mapping. The current schema is provisional and marked as such. Nothing else should need to change. If the API uses pagination, loop over pages in `fetchCatalog` (`api.ts`).
3. **Set environment variables** (see `.env.example`):
   - `VITE_API_BASE_URL`, `VITE_API_PRODUCTS_PATH`
   - `VITE_WHATSAPP_NUMBER` (digits, international format, e.g. `549223…`) once the official number is confirmed.
4. **Authentication.** Every `VITE_*` value ships to the browser.
   - **Public read-only endpoint:** call it directly. The API must allow the site's origin via CORS.
   - **Endpoint needing a secret key:** don't put the key in the frontend. Add a small server-side proxy (hosting edge function, or a Supabase Edge Function later) that holds the key, calls the API, and returns only public product fields. Point `VITE_API_BASE_URL` at the proxy. The proxy is also the right place to cache responses.
5. **Run** `npm test`, then open `/catalogo` and check the browser console: skipped items are logged as `[catalog] N producto(s) … no pasaron la validación`.

## Behavior when not configured

| Situation | What customers see |
|---|---|
| Production, API not configured | "El catálogo online todavía no está conectado" plus a link to message the store. Never an empty or fake store. |
| API error, timeout or unexpected shape | Error message with a "Reintentar" button. |
| API returns zero products | "Todavía no hay productos publicados" plus contact. |
| Unknown product id | "No encontramos este producto. Puede que ya se haya vendido." |

## Development fixtures

`VITE_USE_FIXTURES=true` in `.env.local` loads `fixtures.ts`. The data is in the provisional upstream shape, so it runs through the same validation. Every page shows a "Datos de demostración" banner. The import only exists in dev builds (verified: the fixture strings are absent from `dist/`). Add `?demo=error`, `?demo=empty` or `?demo=slow` to any URL to test states.

## Known limits

- One fetch per page load (`useCatalog.ts`, marked `shortcut:`). Add a TTL or background refresh if stock changes during long sessions.
- Client-side rendering: product pages aren't pre-rendered for search engines or link previews. Next phase: pre-render or server-render product routes (a proxy/SSR layer can do both).
- The host must serve `index.html` for unknown paths (SPA fallback) so `/producto/:id` deep links work.
- No responsive `srcset`, because the API's image URLs have no size variants. Add one if the API or a CDN can resize.

## Future: Supabase (not implemented)

The management software stays the source of truth for products. Supabase would hold only customer-generated data, keyed by the API's product `id`:

- **Customer accounts:** Supabase Auth. Sessions live in a new `features/account/` module and are never mixed into `Product`.
- **Favorites:** `favorites(user_id, product_id)`, joined client-side with the catalog.
- **Purchase requests:** `inquiries(id, user_id?, product_id, product_snapshot jsonb, channel, created_at)`. `InquiryActions` is the single place to also record an inquiry before opening WhatsApp.
- **Admin content** (banners, featured order, store hours): a small table read alongside the catalog. Store hours would then fill the gap in `src/config/store.ts`.
- **Inventory sync and caching:** an Edge Function that proxies or caches the product API (see point 4 above).
- **Cart and checkout:** only if the business decides to sell online. Inquiry-based selling needs neither.
