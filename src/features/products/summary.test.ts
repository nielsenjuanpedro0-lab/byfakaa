import { describe, expect, it } from 'vitest'
import { fromPrice } from './summary'
import type { Product } from './types'

const p = (name: string, amount: number, currency = 'USD', condition: Product['condition'] = 'used'): Product => ({
  id: `${name}${amount}`, name, images: [], availability: 'low_stock', price: { amount, currency }, condition,
})

describe('summary', () => {
  const products = [p('iPhone 14 Pro (detalle pantalla)', 200), p('iPhone 14 Pro', 300, 'USD', 'new'), p('iPhone SE (2da Gen)', 150, 'ARS'), p('iPhone 17', 900)]

  it('prefers USD for "desde"', () => {
    expect(fromPrice(products)).toEqual({ amount: 200, currency: 'USD' })
    expect(fromPrice([{ id: 'x', name: 'x', images: [], availability: 'unknown' }])).toBeUndefined()
  })

})
