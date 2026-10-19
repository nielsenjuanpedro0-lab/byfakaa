import { describe, expect, it, vi } from 'vitest'
import { parseCatalog } from './upstream'

describe('parseCatalog', () => {
  it('maps valid items, skips invalid and duplicate ones', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { products, skipped } = parseCatalog({
      data: [
        { id: 7, name: 'iPhone 13', price: 500, currency: 'usd', stock: 1, images: ['https://x/a.jpg', 'javascript:alert(1)', '//evil/b.jpg'] },
        { id: '8', name: 'Funda', price: 20 },
        { id: 7, name: 'iPhone 13 duplicado' },
        { name: 'sin id' },
        'basura',
      ],
    })
    expect(skipped).toBe(3)
    expect(products).toHaveLength(2)
    expect(products[0]).toMatchObject({
      id: '7',
      price: { amount: 500, currency: 'USD' },
      availability: 'low_stock',
      images: ['https://x/a.jpg'],
    })
    // price without currency is not shown; unknown stock stays unknown
    expect(products[1]).toMatchObject({ id: '8', price: undefined, availability: 'unknown' })
  })

  it('accepts a bare array and rejects unexpected shapes', () => {
    expect(parseCatalog([{ id: 1, name: 'AirPods', stock: 0 }]).products[0]?.availability).toBe('out_of_stock')
    expect(() => parseCatalog({ items: [] })).toThrow()
  })
})
