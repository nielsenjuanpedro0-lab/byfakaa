import { describe, expect, it } from 'vitest'
import { toPublicItem } from '../../../api/catalog'
import { parseCatalog } from './upstream'

describe('toPublicItem', () => {
  it('keeps public fields only and feeds the storefront parser', () => {
    const item = toPublicItem({
      id: 10055, brand: 'Apple', model: 'iPhone 15 Pro Max', storage: '128GB', color: '', condition: 'new',
      price: 400, currency: 'USD', battery: 91, in_catalog: true, miniaturas: [], fotos: [], fotos_origen: null,
      // internal fields that must never leave the server
      ...({ imei: '123', notes: 'Golpe', deposit: 'x', supplier_id: 'y', cost_price: 300 } as object),
    })
    expect(JSON.stringify(item)).not.toMatch(/Golpe|123|cost|supplier|deposit/)
    expect(item).toMatchObject({ name: 'iPhone 15 Pro Max', storage: '128 GB', category: 'iPhone', stock: 1, description: 'Salud de batería: 91%.' })
    expect(parseCatalog({ data: [item] }).products[0]).toMatchObject({ id: '10055', price: { amount: 400, currency: 'USD' } })
  })

  it('passes ready-made photo links through and flags borrowed model photos', () => {
    const item = toPublicItem({
      id: 1, model: 'iPhone 13', in_catalog: true, fotos_origen: 'modelo',
      miniaturas: ['https://x.supabase.co/t/1.webp', null],
      fotos: ['https://x.supabase.co/f/1.webp', 'https://x.supabase.co/f/2.webp'],
    })
    const product = parseCatalog({ data: [item] }).products[0]
    expect(product).toMatchObject({
      thumbs: ['https://x.supabase.co/t/1.webp'],
      images: ['https://x.supabase.co/f/1.webp', 'https://x.supabase.co/f/2.webp'],
      illustrative: true,
    })
    expect(parseCatalog({ data: [toPublicItem({ id: 2, model: 'iPhone 12', fotos_origen: 'equipo' })] }).products[0]?.illustrative).toBe(false)
  })
})
