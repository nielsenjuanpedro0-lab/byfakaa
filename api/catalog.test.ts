import { describe, expect, it } from 'vitest'
import { toPublicItem } from './catalog'
import { parseCatalog } from '../src/features/products/upstream'

describe('toPublicItem', () => {
  it('keeps public fields only and feeds the storefront parser', () => {
    const item = toPublicItem({
      id: 10055, brand: 'Apple', model: 'iPhone 15 Pro Max', storage: '128GB', color: '', condition: 'new',
      price: 400, currency: 'USD', battery: 91, in_catalog: true, photos: [],
      // internal fields that must never leave the server
      ...({ imei: '123', notes: 'Golpe', deposit: 'x', supplier_id: 'y', cost_price: 300 } as object),
    })
    expect(JSON.stringify(item)).not.toMatch(/Golpe|123|cost|supplier|deposit/)
    expect(item).toMatchObject({ name: 'iPhone 15 Pro Max', storage: '128 GB', category: 'iPhone', stock: 1, description: 'Salud de batería: 91%.' })
    expect(parseCatalog({ data: [item] }).products[0]).toMatchObject({ id: '10055', price: { amount: 400, currency: 'USD' } })
  })
})
