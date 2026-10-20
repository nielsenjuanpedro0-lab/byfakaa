import type { IncomingMessage, ServerResponse } from 'node:http'

/*
 * Server-side proxy for the Stackr inventory API. It holds the secret key (Stackr rejects browser calls
 * and the key must never reach the page), and returns only public fields in the shape upstream.ts expects.
 * Same code runs as a Vercel function (api/catalog) and as Vite dev middleware (vite.config.ts).
 */

const STACKR_URL = 'https://www.stackr.com.ar/api/v1/stock'
const PAGE_SIZE = 200

interface StackrUnit {
  id: number
  brand?: string | null
  model?: string | null
  storage?: string | null
  color?: string | null
  condition?: string | null
  price?: number | null
  currency?: string | null
  battery?: number | string | null
  in_catalog?: boolean
  created_at?: string
  photos?: unknown[]
}

const CATEGORY = /^(iPhone|iPad|AirPods|Apple Watch|MacBook|iMac|AirTag)/i

const photoUrl = (photo: unknown): string | undefined =>
  typeof photo === 'string' ? photo : ((photo as { url?: unknown } | null)?.url as string | undefined)

/** Maps one Stackr unit to the public catalog item. Internal fields (imei, notes, deposit, supplier, cost) are dropped. */
export function toPublicItem(unit: StackrUnit) {
  const model = unit.model?.trim() ?? ''
  const battery = unit.battery != null && unit.battery !== '' ? String(unit.battery) : undefined
  return {
    id: unit.id,
    name: model,
    storage: unit.storage?.replace(/^(\d+)\s*(GB|TB)$/i, '$1 $2').trim() || null,
    color: unit.color?.trim() || null,
    condition: unit.condition === 'new' || unit.condition === 'used' ? unit.condition : null,
    category: CATEGORY.exec(model)?.[1] ?? null,
    price: unit.price ?? null,
    currency: unit.currency ?? null,
    // each Stackr record is one physical unit
    stock: 1,
    added_at: unit.created_at ?? null,
    images: (unit.photos ?? []).map(photoUrl).filter((src): src is string => !!src),
    description: battery ? `Salud de batería: ${battery}${/^\d+$/.test(battery) ? '%' : ''}.` : null,
  }
}

export async function fetchPublicCatalog(apiKey: string) {
  const items: ReturnType<typeof toPublicItem>[] = []
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const url = `${STACKR_URL}?estado=available&limite=${PAGE_SIZE}&offset=${offset}`
    const response = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` }, signal: AbortSignal.timeout(15_000) })
    if (!response.ok) throw new Error(`Stackr respondió ${response.status}`)
    const { data, paginacion } = (await response.json()) as { data: StackrUnit[]; paginacion: { total: number } }
    items.push(...data.filter((unit) => unit.in_catalog && unit.model?.trim()).map(toPublicItem))
    if (offset + PAGE_SIZE >= paginacion.total) return items
  }
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  const apiKey = process.env.STACKR_API_KEY
  res.setHeader('Content-Type', 'application/json')
  if (!apiKey) {
    res.statusCode = 503
    return res.end(JSON.stringify({ error: 'STACKR_API_KEY no configurada' }))
  }
  try {
    const data = await fetchPublicCatalog(apiKey)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    res.end(JSON.stringify({ data }))
  } catch (error) {
    console.error('[catalog]', error)
    res.statusCode = 502
    res.end(JSON.stringify({ error: 'No se pudo leer el inventario' }))
  }
}
