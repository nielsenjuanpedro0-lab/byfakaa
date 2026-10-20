# By Faka: storefront

Product catalog and purchase-inquiry site for By Faka, an Apple products store in Mar del Plata. Dark "Noir" design with an orange accent. React 19, TypeScript, Vite, React Router; animation is CSS + View Transitions, no animation library.

```bash
npm install
cp .env.example .env.local
# see it with demo products (shown with a "Datos de demostración" banner):
sed -i.bak 's/VITE_USE_FIXTURES=false/VITE_USE_FIXTURES=true/' .env.local
npm run dev                  # http://localhost:5173

npm test && npm run lint && npm run build
```

Requires Node 20.19+ or 22.12+. Without `VITE_USE_FIXTURES=true` and without an API configured, the catalog honestly shows "El catálogo online todavía no está conectado".

- `src/config/`: environment and store facts (address, channels)
- `src/lib/api-client.ts`: fetch with timeout and typed errors
- `src/features/products/`: product model, upstream mapping, data hook, filters, formatting, inquiry messages, components
- `src/pages/`: home, catalog, product, store ("El local"), 404
- `src/styles/tokens.css`: design tokens

Docs: [brand research](docs/brand-research.md), [assets](docs/assets.md), [design tokens](docs/design-tokens.md), [API integration and future Supabase](docs/api-integration.md).
