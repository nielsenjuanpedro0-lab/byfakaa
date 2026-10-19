import { ChevronLeft, ChevronRight, Headphones, Package, Plug, RefreshCcw, Smartphone, Tablet, Watch, Laptop, type LucideIcon } from 'lucide-react'
import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { StoreInfo } from '../components/StoreInfo'
import { CatalogGate } from '../features/products/components/CatalogGate'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { ProductCard } from '../features/products/components/ProductCard'
import { conditionSlug, facetOptions, param } from '../features/products/filters'
import { conditionLabelPlural } from '../features/products/format'
import type { Catalog, Condition } from '../features/products/types'
import { useCatalog } from '../features/products/useCatalog'
import { useTitle } from '../lib/useTitle'

const SHELF_SIZE = 10
const HEADLINE = 'iPhone nuevos y usados.'

// The intro sequence plays once per page load; coming back to Home later shouldn't replay it.
let introPlayed = false

export function HomePage() {
  useTitle()
  const { state, retry } = useCatalog()
  const [intro] = useState(() => !introPlayed)
  useEffect(() => {
    introPlayed = true
  }, [])

  return (
    <div className={intro ? 'is-intro' : undefined}>
      <section className="page hero" aria-labelledby="hero-title">
        <p className="hero__eyebrow">By Faka, Mar del Plata</p>
        <h1 id="hero-title">
          {HEADLINE.split(' ').map((word, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="hero__word">
                <span style={{ '--i': i } as CSSProperties}>{word}</span>
              </span>
            </Fragment>
          ))}
        </h1>
        <p className="hero__sub">Mirá el stock, consultanos por mensaje y pasá a verlo por Av. Independencia 1273.</p>
        <div className="hero__actions">
          <Link className="button" to="/catalogo" viewTransition>Ver el catálogo</Link>
          <InquiryActions variant="link" />
        </div>
      </section>

      {state.status === 'success' && <Chapters catalog={state.catalog} />}

      <section className="shelf" aria-labelledby="shelf-title">
        <div className="page shelf__head">
          <h2 id="shelf-title">
            Disponible ahora. <span>Lo que tenemos en stock.</span>
          </h2>
        </div>
        <CatalogGate state={state} retry={retry} loading={<ShelfSkeleton />}>
          {(catalog) => <Shelf catalog={catalog} />}
        </CatalogGate>
      </section>

      <section className="page home-store reveal" id="local">
        <StoreInfo />
      </section>
    </div>
  )
}

const categoryIcons: [RegExp, LucideIcon][] = [
  [/iphone/i, Smartphone],
  [/airpods|auricular/i, Headphones],
  [/ipad/i, Tablet],
  [/watch|reloj/i, Watch],
  [/mac/i, Laptop],
  [/accesorio|cargador|cable|funda/i, Plug],
]
const conditionIcons: Record<Condition, LucideIcon> = { new: Package, used: RefreshCcw }

/** Apple-Store-style icon strip. Entries come from the data: only conditions and categories the catalog has. */
function Chapters({ catalog }: { catalog: Catalog }) {
  const items = [
    ...facetOptions(catalog.products, 'condition').map((o) => {
      const condition = o.value as Condition
      return {
        label: conditionLabelPlural[condition],
        to: `/catalogo?${param.condition}=${conditionSlug[condition]}`,
        count: o.count,
        Icon: conditionIcons[condition],
      }
    }),
    ...facetOptions(catalog.products, 'category').map((o) => ({
      label: o.value,
      to: `/catalogo?${param.category}=${encodeURIComponent(o.value)}`,
      count: o.count,
      Icon: categoryIcons.find(([re]) => re.test(o.value))?.[1] ?? Package,
    })),
  ]
  if (items.length < 2) return null

  return (
    <nav className="chapters" aria-label="Explorar por categoría">
      <ul className="chapters__list">
        {items.map(({ label, to, count, Icon }, i) => (
          <li key={to} style={{ '--i': i } as CSSProperties}>
            <Link to={to} viewTransition>
              <Icon aria-hidden size={36} strokeWidth={1.25} />
              <span className="chapters__label">{label}</span>
              <span className="chapters__count">{count === 1 ? '1 producto' : `${count} productos`}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** Horizontal, swipeable shelf of products in stock, with paddles on pointer devices. */
function Shelf({ catalog }: { catalog: Catalog }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const available = catalog.products.filter((p) => p.availability !== 'out_of_stock')

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
