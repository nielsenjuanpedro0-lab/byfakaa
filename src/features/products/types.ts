/** Internal product model. UI code depends on this, never on the upstream API shape. */

export type Condition = 'new' | 'used'

export type Availability = 'in_stock' | 'low_stock' | 'out_of_stock' | 'unknown'

export interface Money {
  amount: number
  /** ISO 4217 code as sent by the API (ARS, USD). */
  currency: string
}

export interface Product {
  id: string
  name: string
  description?: string
  /** Absolute or root-relative URLs, already checked to be safe image sources. */
  images: string[]
  price?: Money
  availability: Availability
  /** Units on hand, when the API reports it. */
  stock?: number
  category?: string
  condition?: Condition
  storage?: string
  color?: string
}

export type CatalogSource = 'api' | 'fixture'

export interface Catalog {
  products: Product[]
  source: CatalogSource
  /** Upstream items dropped because they failed validation. */
  skipped: number
}
