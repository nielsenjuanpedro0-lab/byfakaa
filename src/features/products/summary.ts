import type { Money, Product } from './types'

/** Lowest price in one currency (USD if present, else the most common): different currencies are not comparable. */
export function fromPrice(products: Product[]): Money | undefined {
  const counts = new Map<string, number>()
  for (const { price } of products) if (price) counts.set(price.currency, (counts.get(price.currency) ?? 0) + 1)
  // iPhones are priced in dollars in Argentina: USD wins whenever any unit has it
  const currency = counts.has('USD') ? 'USD' : [...counts].sort((a, b) => b[1] - a[1])[0]?.[0]
  const amounts = products.flatMap(({ price }) => (price && price.currency === currency ? [price.amount] : []))
  return currency ? { amount: Math.min(...amounts), currency } : undefined
}
