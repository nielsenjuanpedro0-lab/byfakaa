import { z } from 'zod/mini'
import { ApiError } from '../../lib/api-client'
import type { Availability, Product } from './types'

/*
 * PROVISIONAL UPSTREAM SCHEMA.
 * The real response shape of the product API is not known yet. This file is the only code that knows it:
 * when a real response sample is available, rewrite `upstreamProduct` and `toProduct` to match it.
 * The rest of the app only sees `Product`.
 */

const text = z.string().check(z.trim(), z.minLength(1))

const upstreamProduct = z.object({
  id: z.union([text, z.number()]),
  name: text,
  description: z.nullish(text),
  images: z.nullish(z.array(z.string())),
  price: z.nullish(z.number().check(z.nonnegative())),
  currency: z.nullish(z.string().check(z.length(3))),
  stock: z.nullish(z.int().check(z.nonnegative())),
  category: z.nullish(text),
  condition: z.nullish(z.enum(['new', 'used'])),
  storage: z.nullish(text),
  color: z.nullish(text),
})

type UpstreamProduct = z.infer<typeof upstreamProduct>

// Accepts a bare array or a `{ data: [...] }` envelope.
const upstreamList = z.union([z.array(z.unknown()), z.object({ data: z.array(z.unknown()) })])

const LOW_STOCK_MAX = 2

// Only http(s), root-relative and inline images; anything else from the API is dropped.
const SAFE_IMAGE = /^(https?:\/\/|\/(?!\/)|data:image\/)/i

function availabilityOf(stock: number | null | undefined): Availability {
  if (stock == null) return 'unknown'
  if (stock === 0) return 'out_of_stock'
  return stock <= LOW_STOCK_MAX ? 'low_stock' : 'in_stock'
}

function toProduct(raw: UpstreamProduct): Product {
  return {
    id: String(raw.id),
    name: raw.name,
    description: raw.description ?? undefined,
    images: (raw.images ?? []).map((src) => src.trim()).filter((src) => SAFE_IMAGE.test(src)),
    // A price without a currency cannot be shown honestly, so it is treated as missing.
    price: raw.price != null && raw.currency ? { amount: raw.price, currency: raw.currency.toUpperCase() } : undefined,
    availability: availabilityOf(raw.stock),
    stock: raw.stock ?? undefined,
    category: raw.category ?? undefined,
    condition: raw.condition ?? undefined,
    storage: raw.storage ?? undefined,
    color: raw.color ?? undefined,
  }
}

/** Validates an upstream response. Invalid items are skipped and counted instead of breaking the whole catalog. */
export function parseCatalog(json: unknown): { products: Product[]; skipped: number } {
  const list = upstreamList.safeParse(json)
  if (!list.success) throw new ApiError('La API devolvió un formato de catálogo inesperado')
  const items = Array.isArray(list.data) ? list.data : list.data.data

  const products: Product[] = []
  const seen = new Set<string>()
  for (const item of items) {
    const parsed = upstreamProduct.safeParse(item)
    if (!parsed.success) continue
    const product = toProduct(parsed.data)
    if (seen.has(product.id)) continue
    seen.add(product.id)
    products.push(product)
  }
  const skipped = items.length - products.length
  if (skipped > 0) console.warn(`[catalog] ${skipped} producto(s) de la API no pasaron la validación y no se muestran`)
  return { products, skipped }
}
