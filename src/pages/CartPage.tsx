import { Check, Copy, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { InstagramIcon } from '../components/InstagramIcon'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
import { store } from '../config/store'
import { cart, toCartItem, useCart, type CartItem } from '../features/cart/cart'
import { formatPrice } from '../features/products/format'
import { cartMessage, whatsappUrl } from '../features/products/inquiry'
import { useCatalog } from '../features/products/useCatalog'
import { useTitle } from '../lib/useTitle'

const productUrl = (id: string) => `/producto/${encodeURIComponent(id)}`

/** Sum per currency: US$ and $ are never added together. */
function totals(items: CartItem[]) {
  const sums = new Map<string, number>()
  for (const { price } of items) if (price) sums.set(price.currency, (sums.get(price.currency) ?? 0) + price.amount)
  return [...sums].map(([currency, amount]) => formatPrice({ currency, amount }))
}

export function CartPage() {
  useTitle('Carrito')
  const saved = useCart()
  const { state } = useCatalog()
  const [copied, setCopied] = useState(false)

  // Check the saved cart against live stock: fresh prices for what is still there, and set aside what sold meanwhile.
  const byId = state.status === 'success' ? new Map(state.catalog.products.map((p) => [p.id, p])) : null
  const items: CartItem[] = []
  const gone: CartItem[] = []
  for (const item of saved) {
    const product = byId?.get(item.id)
    if (!byId) items.push(item)
    else if (product && product.availability !== 'out_of_stock') items.push(toCartItem(product))
    else gone.push(item)
  }

  if (items.length === 0) {
    return (
      <div className="page cart">
        <h1>Carrito</h1>
        {gone.length > 0 && <GoneNotice items={gone} />}
        <div className="cart__empty">
          <ShoppingBag aria-hidden size={40} />
          <p>Tu carrito está vacío. Sumá los equipos que te interesan y mandanos una sola consulta por todos.</p>
          <Link className="button" to="/catalogo" viewTransition>Ver el catálogo</Link>
        </div>
      </div>
    )
  }

  const message = cartMessage(items, `${window.location.origin}/carrito`)
  const wa = whatsappUrl(message)

  const copyAndOpenInstagram = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      setCopied(false)
    }
    window.open(store.instagramDmUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="page cart">
      <h1>Carrito</h1>
      <p className="cart__lead">
        No hay pago online: nos mandás el carrito, te confirmamos disponibilidad y coordinamos la compra en el local.
      </p>
      {gone.length > 0 && <GoneNotice items={gone} />}

      <div className="cart__layout">
        <ul className="cart__list">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <Link to={productUrl(item.id)} className="cart-item__media" viewTransition tabIndex={-1} aria-hidden>
                {item.thumb ? <img src={item.thumb} alt="" loading="lazy" /> : <ShoppingBag size={24} />}
              </Link>
              <div className="cart-item__body">
                <Link to={productUrl(item.id)} className="cart-item__name" viewTransition>{item.name}</Link>
                {item.details && <p className="cart-item__details">{item.details}</p>}
              </div>
              <p className="cart-item__price">{item.price ? formatPrice(item.price) : 'Consultar'}</p>
              <button type="button" className="cart-item__remove" onClick={() => cart.remove(item.id)} aria-label={`Quitar ${item.name}`}>
                <X aria-hidden size={18} />
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart__summary" aria-label="Resumen">
          <p className="cart__count">{items.length === 1 ? '1 producto' : `${items.length} productos`}</p>
          {totals(items).map((total) => (
            <p key={total} className="cart__total">{total}</p>
          ))}
          <p className="cart__hint">Precios publicados. Te confirmamos el valor final y las formas de pago al consultar.</p>
          {wa ? (
            <a className="button cart__send" href={wa} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon aria-hidden size={18} />
              Enviar por WhatsApp
            </a>
          ) : (
            <>
              <button type="button" className="button cart__send" onClick={copyAndOpenInstagram}>
                <InstagramIcon aria-hidden size={18} />
                Enviar por Instagram
              </button>
              <p className="cart__hint" aria-live="polite">
                {copied ? (
                  <>
                    <Check aria-hidden size={14} /> Copiamos tu carrito: pegalo en el chat de @{store.instagramHandle}.
                  </>
                ) : (
                  <>
                    <Copy aria-hidden size={14} /> Copiamos el carrito para que lo pegues en el chat.
                  </>
                )}
              </p>
            </>
          )}
          <button type="button" className="text-link cart__clear" onClick={cart.clear}>Vaciar carrito</button>
        </aside>
      </div>
    </div>
  )
}

/** Items that sold since they were added: named, left out of the message, removable. */
function GoneNotice({ items }: { items: CartItem[] }) {
  return (
    <div className="cart__gone" role="status">
      <p>{items.length === 1 ? 'Este producto ya no está disponible:' : 'Estos productos ya no están disponibles:'}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button type="button" className="text-link" onClick={() => items.forEach((i) => cart.remove(i.id))}>
        Quitar del carrito
      </button>
    </div>
  )
}
