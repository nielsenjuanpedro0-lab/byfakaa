import { Check, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'
import type { Product } from '../products/types'
import { cart, useCart } from './cart'

export function AddToCart({ product, className = '' }: { product: Product; className?: string }) {
  const inCart = useCart().some((i) => i.id === product.id)
  if (inCart) {
    return (
      <Link to="/carrito" className={`button button--outline ${className}`} viewTransition>
        <Check aria-hidden size={18} />
        En el carrito
      </Link>
    )
  }
  return (
    <button type="button" className={`button button--outline ${className}`} onClick={() => cart.add(product)}>
      <ShoppingBag aria-hidden size={18} />
      Agregar al carrito
    </button>
  )
}
