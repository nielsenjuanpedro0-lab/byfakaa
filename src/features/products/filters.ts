import { conditionLabel } from './format'
import type { Condition, Product } from './types'

export type SortKey = 'relevance' | 'price-asc' | 'price-desc' | 'name'
export type FacetKey = 'condition' | 'category' | 'storage' | 'color'

export const facetKeys: FacetKey[] = ['condition', 'category', 'storage', 'color']

export const facetTitle: Record<FacetKey, string> = {
  condition: 'Estado',
  category: 'Categoría',
  storage: 'Capacidad',
  color: 'Color',
}

export const sortLabel: Record<SortKey, string> = {
  relevance: 'Destacados',
  'price-asc': 'Menor precio',
  'price-desc': 'Mayor precio',
  name: 'Nombre',
}

/** URL search param names, in Spanish because they show up in shared links. */
export const param = {
  q: 'q',
  condition: 'estado',
  category: 'categoria',
  storage: 'capacidad',
  color: 'color',
  available: 'disponibles',
  sort: 'orden',
  view: 'vista',
} as const

export interface CatalogQuery {
  q: string
  facets: Partial<Record<FacetKey, string>>
  onlyAvailable: boolean
  sort: SortKey
}

const conditionParam: Record<string, Condition> = { nuevo: 'new', usado: 'used' }
export const conditionSlug: Record<Condition, string> = { new: 'nuevo', used: 'usado' }

export function readQuery(params: URLSearchParams): CatalogQuery {
  const sort = params.get(param.sort) as SortKey | null
  const facets: CatalogQuery['facets'] = {}
  for (const key of facetKeys) {
    const raw = params.get(param[key])
    const value = raw && key === 'condition' ? conditionParam[raw] : raw
    if (value) facets[key] = value
  }
  return {
    q: params.get(param.q)?.trim() ?? '',
    facets,
    onlyAvailable: params.get(param.available) === '1',
    sort: sort && sort in sortLabel ? sort : 'relevance',
  }
}

/** Value written to the URL for a facet (conditions use Spanish slugs). */
export function facetParamValue(key: FacetKey, value: string): string {
  return key === 'condition' ? conditionSlug[value as Condition] ?? value : value
}

export function facetValueLabel(key: FacetKey, value: string): string {
  return key === 'condition' ? conditionLabel[value as Condition] ?? value : value
}

const fold = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('es')

function searchText(product: Product): string {
  const condition = product.condition ? conditionLabel[product.condition] : ''
  return fold([product.name, product.category, product.storage, product.color, condition].join(' '))
}

/** "64 GB" < "128 GB" < "1 TB"; non-capacity strings sort after, alphabetically. */
function storageBytes(value: string): number {
  const match = /([\d.,]+)\s*(GB|TB)/i.exec(value)
  if (!match?.[1] || !match[2]) return Number.POSITIVE_INFINITY
  return parseFloat(match[1].replace(',', '.')) * (match[2].toUpperCase() === 'TB' ? 1024 : 1)
}

const byText = (a: string, b: string) => a.localeCompare(b, 'es')

/** Distinct values of a facet with counts, over the given products. */
export function facetOptions(products: Product[], key: FacetKey): { value: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const product of products) {
    const value = product[key]
    if (value) counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  const options = [...counts].map(([value, count]) => ({ value, count }))
  if (key === 'storage') return options.sort((a, b) => storageBytes(a.value) - storageBytes(b.value) || byText(a.value, b.value))
  if (key === 'condition') return options.sort((a, b) => Number(a.value !== 'new') - Number(b.value !== 'new'))
  return options.sort((a, b) => byText(a.value, b.value))
}

export function applyQuery(products: Product[], query: CatalogQuery): Product[] {
  const tokens = fold(query.q).split(/\s+/).filter(Boolean)
  const result = products.filter((product) => {
    if (query.onlyAvailable && product.availability === 'out_of_stock') return false
    for (const key of facetKeys) {
      const wanted = query.facets[key]
      if (wanted && product[key] !== wanted) return false
    }
    if (tokens.length === 0) return true
    const haystack = searchText(product)
    return tokens.every((token) => haystack.includes(token))
  })

  // "Destacados" keeps the API order but moves sold-out items to the end.
  const soldOutLast = (a: Product, b: Product) =>
    Number(a.availability === 'out_of_stock') - Number(b.availability === 'out_of_stock')

  // Amounts in different currencies are not comparable: group by currency (most used first), then by amount.
  // Products without a price go last.
  const currencyRank = new Map<string, number>()
  for (const p of result) if (p.price) currencyRank.set(p.price.currency, (currencyRank.get(p.price.currency) ?? 0) - 1)
  const byPrice = (direction: 1 | -1) => (a: Product, b: Product) => {
    if (!a.price || !b.price) return Number(!a.price) - Number(!b.price)
    const group = (currencyRank.get(a.price.currency) ?? 0) - (currencyRank.get(b.price.currency) ?? 0)
    return group || byText(a.price.currency, b.price.currency) || direction * (a.price.amount - b.price.amount)
  }

  switch (query.sort) {
    case 'price-asc':
      return result.sort(byPrice(1))
    case 'price-desc':
      return result.sort(byPrice(-1))
    case 'name':
      return result.sort((a, b) => byText(a.name, b.name))
    default:
      return result.sort(soldOutLast)
  }
}
