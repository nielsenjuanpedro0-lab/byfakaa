import { formatPrice } from '../format'
import type { Money } from '../types'

/** Price set as plain type. Without a price it asks to inquire instead of guessing. */
export function PriceTag({ price, size = 'md', soldOut = false }: { price?: Money; size?: 'sm' | 'md' | 'lg'; soldOut?: boolean }) {
  if (!price) return <span className={`price price--${size} price--ask`}>Consultar precio</span>
  return (
    <span className={`price price--${size}${soldOut ? ' price--sold' : ''}`}>
      <span className="visually-hidden">Precio: </span>
      {formatPrice(price)}
    </span>
  )
}
