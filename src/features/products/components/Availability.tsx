import { availabilityLabel } from '../format'
import type { Product } from '../types'

export function Availability({ product }: { product: Product }) {
  const label = availabilityLabel(product)
  if (!label) return null
  return <span className={`availability availability--${product.availability}`}>{label}</span>
}
