import type { Availability, Condition, Money, Product } from './types'

const priceFormatters = new Map<string, Intl.NumberFormat>()

/** Argentine formatting: "US$ 1.050", "$ 45.000", "$ 45.000,50". */
export function formatPrice({ amount, currency }: Money): string {
  const whole = Number.isInteger(amount)
  const key = `${currency}-${whole}`
  let formatter = priceFormatters.get(key)
  if (!formatter) {
    try {
      formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency,
        minimumFractionDigits: whole ? 0 : 2,
        maximumFractionDigits: whole ? 0 : 2,
      })
    } catch {
      // Unknown currency code from the API: show the number with the code as sent.
      return `${currency} ${amount.toLocaleString('es-AR')}`
    }
    priceFormatters.set(key, formatter)
  }
  // Intl uses a non-breaking space; keep it so the symbol never wraps away from the number.
  return formatter.format(amount)
}

export const conditionLabel: Record<Condition, string> = { new: 'Nuevo', used: 'Usado' }
export const conditionLabelPlural: Record<Condition, string> = { new: 'Nuevos', used: 'Usados' }

export function availabilityLabel(product: Pick<Product, 'availability' | 'stock'>): string | undefined {
  const labels: Record<Availability, string | undefined> = {
    in_stock: 'En stock',
    low_stock: product.stock === 1 ? 'Queda 1' : `Quedan ${product.stock}`,
    out_of_stock: 'Sin stock',
    unknown: undefined,
  }
  return labels[product.availability]
}

/** Storage and color, skipping whatever the name already says. */
export function variantSummary(product: Pick<Product, 'name' | 'storage' | 'color'>): string {
  const name = product.name.toLocaleLowerCase('es')
  return [product.storage, product.color]
    .filter((part): part is string => !!part && !name.includes(part.toLocaleLowerCase('es')))
    .join(', ')
}
