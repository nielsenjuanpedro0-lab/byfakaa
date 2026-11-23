import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router'
import { useCart } from './cart'

export function CartButton() {
  const count = useCart().length
  return (
    <Link to="/carrito" className="cart-button" aria-label={count ? `Carrito, ${count} productos` : 'Carrito'} viewTransition>
      <ShoppingBag aria-hidden size={20} />
      {count > 0 && <span className="cart-button__count">{count}</span>}
    </Link>
  )
}
