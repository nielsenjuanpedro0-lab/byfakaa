import { describe, expect, it } from 'vitest'
import { applyQuery, facetOptions, readQuery } from './filters'
import { availabilityLabel, formatPrice, variantSummary } from './format'
import { inquiryMessage } from './inquiry'
import { vtName } from '../../lib/viewTransition'
import type { Product } from './types'

const p = (over: Partial<Product>): Product => ({ id: over.name ?? 'x', name: 'x', images: [], thumbs: [], illustrative: false, availability: 'in_stock', ...over })

const products = [
  p({ name: 'iPhone 15 Pro', storage: '1 TB', condition: 'used', price: { amount: 1080, currency: 'USD' } }),
  p({ name: 'iPhone 13', storage: '128 GB', condition: 'used', availability: 'out_of_stock', price: { amount: 380, currency: 'USD' } }),
  p({ name: 'iPhone 16', storage: '64 GB', condition: 'new' }),
  p({ name: 'Adaptador de corriente', category: 'Accesorios', condition: 'new', price: { amount: 45000, currency: 'ARS' } }),
]

describe('catalog query', () => {
  it('reads Spanish URL params', () => {
    const q = readQuery(new URLSearchParams('estado=usado&disponibles=1&orden=price-asc&q=%20pro%20'))
    expect(q).toEqual({ q: 'pro', facets: { condition: 'used' }, onlyAvailable: true, sort: 'price-asc' })
    expect(readQuery(new URLSearchParams('orden=hack&estado=roto')).sort).toBe('relevance')
    expect(readQuery(new URLSearchParams('estado=roto')).facets).toEqual({})
  })

  it('filters by facets, availability and accent-insensitive search', () => {
    const names = (query: string) => applyQuery(products, readQuery(new URLSearchParams(query))).map((x) => x.name)
    expect(names('estado=usado&disponibles=1')).toEqual(['iPhone 15 Pro'])
    expect(names('q=ACCESÓRIOS')).toEqual(['Adaptador de corriente'])
    expect(names('q=iphone usado')).toEqual(['iPhone 15 Pro', 'iPhone 13'])
    expect(names('')).toEqual(['iPhone 15 Pro', 'iPhone 16', 'Adaptador de corriente', 'iPhone 13'])
    expect(names('orden=price-asc')[0]).toBe('iPhone 13')
    expect(names('orden=price-asc').at(-1)).toBe('iPhone 16') // no price goes last
    // USD (most used) before ARS; never compare 45.000 ARS against 1.080 USD
    expect(names('orden=price-desc')).toEqual(['iPhone 15 Pro', 'iPhone 13', 'Adaptador de corriente', 'iPhone 16'])
  })

  it('sorts storage by capacity', () => {
    expect(facetOptions(products, 'storage').map((o) => o.value)).toEqual(['64 GB', '128 GB', '1 TB'])
    expect(facetOptions(products, 'condition').map((o) => o.value)).toEqual(['new', 'used'])
  })
})

describe('formatting and inquiry', () => {
  it('formats Argentine prices', () => {
    expect(formatPrice({ amount: 45000, currency: 'ARS' }).replace(/\s/g, ' ')).toBe('$ 45.000')
    expect(formatPrice({ amount: 1050, currency: 'USD' }).replace(/\s/g, ' ')).toBe('US$ 1.050')
    expect(formatPrice({ amount: 10.5, currency: 'ARS' }).replace(/\s/g, ' ')).toBe('$ 10,50')
    expect(formatPrice({ amount: 5, currency: 'not-a-code' })).toBe('not-a-code 5')
  })

  it('labels availability and avoids repeating variant info', () => {
    expect(availabilityLabel({ availability: 'low_stock', stock: 1 })).toBe('Queda 1')
    expect(variantSummary({ name: 'iPhone 15 Pro 256 GB', storage: '256 GB', color: 'Negro' })).toBe('Negro')
  })

  it('builds an inquiry only from real fields', () => {
    expect(inquiryMessage(products[0], 'https://x/producto/1').replace(/\u00a0/g, ' ')).toBe(
      'Hola! Quería consultar por iPhone 15 Pro (1 TB, usado).\nLo vi publicado a US$ 1.080. ¿Sigue disponible?\nhttps://x/producto/1',
    )
    expect(inquiryMessage(products[2])).toContain('¿Me pasás precio y disponibilidad?')
  })
})

describe('vtName', () => {
  it('is a valid ident and never collides', () => {
    expect(vtName('pimg', '123')).toBe('pimg-123')
    expect(vtName('pimg', 'a.b')).not.toBe(vtName('pimg', 'a_b'))
    expect(vtName('pcard', 'x y/z')).toMatch(/^[a-zA-Z][a-zA-Z0-9_-]*$/)
  })
})
