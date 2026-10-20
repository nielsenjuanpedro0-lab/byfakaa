import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { InstagramIcon } from '../components/InstagramIcon'
import { store } from '../config/store'
import { CatalogGate } from '../features/products/components/CatalogGate'
import { Finder } from '../features/products/components/Finder'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { ProductCard } from '../features/products/components/ProductCard'
import { ProductImage } from '../features/products/components/ProductImage'
import { param } from '../features/products/filters'
import { conditionLabel, formatPrice, variantSummary } from '../features/products/format'
import type { Catalog, Product } from '../features/products/types'
import { useCatalog } from '../features/products/useCatalog'
import { useTitle } from '../lib/useTitle'

const SHELF_SIZE = 10

const availableOf = (catalog: Catalog) => catalog.products.filter((p) => p.availability !== 'out_of_stock')
const productUrl = (p: Product) => `/producto/${encodeURIComponent(p.id)}`

export function HomePage() {
  useTitle()
  const { state, retry } = useCatalog()
  const catalog = state.status === 'success' ? state.catalog : undefined
  const inStock = catalog ? availableOf(catalog).length : 0

  return (
    <div>
      <section className="page hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="hero__place">
            {store.address} · Mar del Plata
          </p>
          <h1 id="hero-title">iPhone nuevos y usados</h1>
          <p className="hero__sub">
            Mirá qué hay en stock y a qué precio. Consultanos por mensaje y pasá a verlo por el local.
          </p>
          <div className="hero__actions">
            <Link className="button" to="/catalogo" viewTransition>Ver catálogo</Link>
            <a className="button button--outline" href={store.instagramDmUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon aria-hidden size={18} />
              Escribinos
            </a>
          </div>
          {inStock > 0 && (
            <p className="hero__stock">
              {inStock === 1 ? '1 equipo en stock' : `${inStock} equipos en stock`}
            </p>
          )}
        </div>
        {catalog && <Featured catalog={catalog} />}
      </section>

      <section className="shelf" aria-labelledby="shelf-title">
        <div className="page shelf__head">
          <h2 id="shelf-title">En stock</h2>
        </div>
        <CatalogGate state={state} retry={retry} loading={<ShelfSkeleton />}>
          {(c) => <Shelf products={availableOf(c)} />}
        </CatalogGate>
      </section>

      {catalog && <FinderSection catalog={catalog} />}

      <Visit />

      <Messages />
    </div>
  )
}

/** The newest unit in stock. Falls back to the first one when dates are missing. */
function Featured({ catalog }: { catalog: Catalog }) {
  const available = availableOf(catalog)
  const unit = [...available].sort((a, b) => (b.addedAt ?? 0) - (a.addedAt ?? 0))[0]
  if (!unit) return null
  const details = [variantSummary(unit), unit.condition && conditionLabel[unit.condition]].filter(Boolean).join(' · ')

  return (
    <Link className="featured" to={productUrl(unit)} viewTransition>
      <p className="featured__tag">Último ingreso</p>
      {unit.images[0] && <ProductImage src={unit.images[0]} alt={unit.name} priority className="featured__photo" />}
      <p className="featured__name">{unit.name}</p>
      {details && <p className="featured__meta">{details}</p>}
      <div className="featured__foot">
        <span className="featured__price">{unit.price ? formatPrice(unit.price) : 'Consultar precio'}</span>
        <span className="featured__cta">
          Ver equipo <ChevronRight aria-hidden size={18} />
        </span>
      </div>
    </Link>
  )
}

/** The store as a place: the real map, next to what you need to know before going. */
function Visit() {
  return (
    <section className="visit reveal" aria-labelledby="visit-title">
      <div className="page visit__inner">
        <div className="visit__map">
          <iframe src={store.mapsEmbedUrl} title={`Mapa: ${store.address}, ${store.city}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="visit__copy">
          <h2 id="visit-title">Dónde estamos</h2>
          <address>
            <span className="visit__address">{store.address}</span>
            <span className="visit__city">{store.city}</span>
          </address>
          <p>
            {store.hours
              ? store.hours
              : 'Antes de venir, escribinos: te confirmamos el horario y que el equipo que querés siga disponible.'}
          </p>
          <Link className="text-link" to="/contacto" viewTransition>
            Cómo llegar y horarios
            <ChevronRight aria-hidden size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/** Three quick questions that narrow the stock live: the store clerk's "¿qué estás buscando?". */
function FinderSection({ catalog }: { catalog: Catalog }) {
  const available = availableOf(catalog)
  if (available.length < 3) return null
  return (
    <section className="page finder-section reveal" aria-labelledby="finder-title">
      <h2 id="finder-title">Buscá por estado y presupuesto</h2>
      <Finder products={available} />
    </section>
  )
}

/** Closing band for models that are not published. */
function Messages() {
  return (
    <section className="page messages reveal" aria-labelledby="messages-title">
      <div>
        <h2 id="messages-title">¿No encontrás el modelo que buscás?</h2>
        <p>Escribinos por Instagram a @{store.instagramHandle} y te contamos qué tenemos.</p>
      </div>
      <a className="button" href={store.instagramDmUrl} target="_blank" rel="noopener noreferrer">
        <InstagramIcon aria-hidden size={18} />
        Enviar mensaje
      </a>
    </section>
  )
}

/** Horizontal, swipeable shelf of products, with paddles on pointer devices. */
function Shelf({ products: available }: { products: Product[] }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const updateEdges = (el: HTMLUListElement) =>
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })

  // Paddles start disabled when everything already fits on screen.
  useEffect(() => {
    if (trackRef.current) updateEdges(trackRef.current)
  }, [available.length])

  if (available.length === 0) {
    return (
      <div className="page shelf__empty">
        <p>Ahora no hay productos publicados. Escribinos y te contamos qué está por entrar.</p>
        <InquiryActions />
      </div>
    )
  }

  const page = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <>
      <ul ref={trackRef} className="shelf__track" onScroll={(e) => updateEdges(e.currentTarget)}>
        {available.slice(0, SHELF_SIZE).map((product, i) => (
          <li key={product.id} style={{ '--i': i } as CSSProperties}>
            <ProductCard product={product} priority={i < 3} />
          </li>
        ))}
      </ul>
      <div className="page shelf__foot">
        <Link className="text-link" to={`/catalogo?${param.available}=1`} viewTransition>
          Ver los {available.length} productos disponibles
          <ChevronRight aria-hidden size={18} />
        </Link>
        <div className="shelf__paddles">
          <button type="button" aria-label="Anteriores" disabled={edges.start} onClick={() => page(-1)}>
            <ChevronLeft aria-hidden size={22} />
          </button>
          <button type="button" aria-label="Siguientes" disabled={edges.end} onClick={() => page(1)}>
            <ChevronRight aria-hidden size={22} />
          </button>
        </div>
      </div>
    </>
  )
}

function ShelfSkeleton() {
  return (
    <ul className="shelf__track" aria-hidden>
      {Array.from({ length: 4 }, (_, i) => (
        <li key={i}>
          <div className="skeleton skeleton--card" />
        </li>
      ))}
    </ul>
  )
}
