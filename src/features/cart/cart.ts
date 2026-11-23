import { useSyncExternalStore } from 'react'
import { conditionLabel, variantSummary } from '../products/format'
import type { Money, Product } from '../products/types'

/**
 * Inquiry cart: there is no online payment, so the cart is a list the customer sends us in one message.
 * Items are snapshots, so the cart survives reloads even before the catalog loads; the cart page
 * shows them with live prices and flags the ones that sold.
 */
export interface CartItem {
  id: string
  name: string
  details?: string
  price?: Money
  thumb?: string
}

const KEY = 'byfaka.cart'
const listeners = new Set<() => void>()

function read(): CartItem[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(raw) ? (raw as CartItem[]).filter((i) => i && typeof i.id === 'string' && typeof i.name === 'string') : []
  } catch {
    return []
  }
}

let items: CartItem[] = typeof localStorage === 'undefined' ? [] : read()

function write(next: CartItem[]) {
  items = next
  try {
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // private mode or full storage: the cart still works for this visit
  }
  listeners.forEach((l) => l())
}

// keep several open tabs in sync
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      items = read()
      listeners.forEach((l) => l())
    }
  })
}

export function toCartItem(product: Product): CartItem {
  const details = [variantSummary(product), product.condition && conditionLabel[product.condition]].filter(Boolean).join(' · ')
  return {
    id: product.id,
    name: product.name,
    details: details || undefined,
    price: product.price,
    thumb: product.thumbs[0] ?? product.images[0],
  }
}

export const cart = {
  add: (product: Product) => {
    if (!items.some((i) => i.id === product.id)) write([...items, toCartItem(product)])
  },
  remove: (id: string) => write(items.filter((i) => i.id !== id)),
  clear: () => write([]),
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, () => items, () => items)
}
