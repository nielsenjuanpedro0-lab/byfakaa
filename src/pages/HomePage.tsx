import { ArrowRight, ChevronRight, MapPin } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { InstagramIcon } from '../components/InstagramIcon'
import { store } from '../config/store'
import { CatalogGate } from '../features/products/components/CatalogGate'
import { ProductCard } from '../features/products/components/ProductCard'
import { conditionSlug, facetOptions, param } from '../features/products/filters'
import type { Catalog, Product } from '../features/products/types'
import { useCatalog } from '../features/products/useCatalog'
import { useTitle } from '../lib/useTitle'
import { TipCards } from './TipsPage'

const GRID_SIZE = 8

const availableOf = (catalog: Catalog) => catalog.products.filter((p) => p.availability !== 'out_of_stock')

// One label per intent across the page: "Ver stock" goes to the catalog, "Consultar" opens a conversation.
const STOCK_URL = `/catalogo?${param.available}=1`

/** The four ways to buy, in the owner's words. Links go to the closest filter the catalog supports. */
const lines = [
  {
    key: 'sealed',
    title: 'Sellados',
    text: 'Equipos nuevos, en caja cerrada, con la garantía de nuevo.',
    to: `/catalogo?${param.condition}=${conditionSlug.new}`,
    cta: 'Ver stock',
  },
  {
    key: 'used',
    title: 'Usados seleccionados',
    text: 'Revisados uno por uno, con la salud de la batería informada.',
    to: `/catalogo?${param.condition}=${conditionSlug.used}`,
    cta: 'Ver stock',
  },
  { key: 'likenew', title: 'Like New', text: 'iPhones nuevos al precio de usados.', href: store.instagramDmUrl, cta: 'Consultar' },
  { key: 'android', title: 'Android', text: 'Motorola y otras marcas.', to: `/catalogo?${param.q}=motorola`, cta: 'Ver stock' },
]

const steps = [
  { verb: 'Elegí.', text: 'Mirá el stock con precios, actualizado desde el local.' },
  { verb: 'Consultá.', text: 'Te confirmamos que siga disponible y coordinamos.' },
  { verb: 'Retiralo.', text: 'Lo ves, lo probás y te lo llevás en el momento.' },
]

export function HomePage() {
  useTitle()
  const { state, retry } = useCatalog()
  const catalog = state.status === 'success' ? state.catalog : undefined
  const inStock = catalog ? availableOf(catalog).length : 0

  return (
    <div>
      <section className="hero" aria-labelledby="hero-title">
        {/* The real storefront carries the hero: proof there is a shop you can walk into */}
        <img
          className="hero__photo"
          src="/brand/local-frente.webp"
          alt={`Fachada del local By Faka en ${store.address}, Mar del Plata`}
          width={1800}
          height={1350}
          fetchPriority="high"
        />
        <div className="page hero__inner">
          <div className="hero__copy">
            <h1 id="hero-title">
              Tecnología
              <span>a tu alcance.</span>
            </h1>
            <p className="hero__sub">
              iPhones nuevos, sellados y usados seleccionados. Vení a verlos a {store.address}, Mar del Plata.
            </p>
            <div className="hero__actions">
              {/* the stock count lives in the action itself instead of a badge */}
              <Link className="hero__cta" to={STOCK_URL} viewTransition>
                {inStock > 1 ? `Ver los ${inStock} equipos` : 'Ver el stock'}
                <ArrowRight aria-hidden size={22} strokeWidth={1.5} />
              </Link>
              <a className="hero__alt" href={store.instagramDmUrl} target="_blank" rel="noopener noreferrer">
                o consultanos por Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What every purchase includes, as the owner lists it in his stock messages: said once, as a sentence */}
      <section className="page promise" aria-label="Qué incluye tu compra">
        <p>
          Cada equipo sale con <strong>funda, vidrio templado y cable</strong>, y con <strong>garantía por escrito</strong>.
          Antes de pagar, <strong>lo revisás y lo probás en el local</strong>.
        </p>
      </section>

      <section className="page available" aria-labelledby="available-title">
        <div className="available__head">
          <h2 id="available-title">Disponibles ahora.</h2>
          <Link className="text-link" to={STOCK_URL} viewTransition>
            Ver todo el stock <ChevronRight aria-hidden size={18} />
          </Link>
        </div>
        <CatalogGate state={state} retry={retry} loading={<GridSkeleton />}>
          {(c) => (
            <>
              <Categories products={availableOf(c)} />
              <ProductGrid products={availableOf(c)} />
            </>
          )}
        </CatalogGate>
      </section>

      <section className="page lines reveal" aria-labelledby="lines-title">
        <h2 id="lines-title">Elegí cómo lo querés.</h2>
        <p className="lines__lead">Cuatro formas de tener tu próximo equipo, todas con atención en el local.</p>
        <ul className="lines__bento">
          {lines.map((line) => (
            <li key={line.key} className={`line-tile line-tile--${line.key}`}>
              <h3>{line.title}</h3>
              <p>{line.text}</p>
              {line.to ? (
                <Link className="line-tile__cta" to={line.to} viewTransition>
                  {line.cta} <ArrowRight aria-hidden size={18} />
                </Link>
              ) : (
                <a className="line-tile__cta" href={line.href} target="_blank" rel="noopener noreferrer">
                  {line.cta} <ArrowRight aria-hidden size={18} />
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="steps reveal" aria-labelledby="steps-title">
        <div className="page">
          <h2 id="steps-title" className="visually-hidden">Cómo comprar</h2>
          <ol className="steps__list">
            {steps.map((step) => (
              <li key={step.verb}>
                <p className="steps__verb">{step.verb}</p>
                <p className="steps__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page tips reveal" aria-labelledby="tips-title">
        <div className="tips__head">
          <h2 id="tips-title">Sacale el jugo a tu iPhone.</h2>
          <Link className="text-link" to="/tips" viewTransition>
            Todos los tips <ChevronRight aria-hidden size={18} />
          </Link>
        </div>
        <TipCards featured />
      </section>

      <Visit />
    </div>
  )
}

/** One chip per category the stock actually has, so the store's lines (iPhone, accesorios…) are one tap away. */
function Categories({ products }: { products: Product[] }) {
  const options = facetOptions(products, 'category')
  if (options.length < 2) return null
  return (
    <nav className="categories" aria-label="Categorías">
      {options.map(({ value, count }) => (
        <Link key={value} className="categories__chip" to={`/catalogo?${param.category}=${encodeURIComponent(value)}&${param.available}=1`} viewTransition>
          {value}
          <span>{count}</span>
        </Link>
      ))}
    </nav>
  )
}

function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="available__empty">
        <p>Ahora no hay equipos publicados. Escribinos y te contamos qué está por entrar.</p>
        <a className="button" href={store.instagramDmUrl} target="_blank" rel="noopener noreferrer">
          <InstagramIcon aria-hidden size={18} />
          Consultar
        </a>
      </div>
    )
  }
  return (
    <ul className="available__grid">
      {products.slice(0, GRID_SIZE).map((product, i) => (
        <li key={product.id} style={{ '--i': i } as CSSProperties}>
          <ProductCard product={product} priority={i < 4} />
        </li>
      ))}
    </ul>
  )
}

function GridSkeleton() {
  return (
    <ul className="available__grid" aria-hidden>
      {Array.from({ length: 4 }, (_, i) => (
        <li key={i}>
          <div className="skeleton skeleton--card" />
        </li>
      ))}
    </ul>
  )
}

/** The store as a place: a second angle of the storefront, the address, and the way there. */
function Visit() {
  return (
    <section className="visit reveal" aria-labelledby="visit-title">
      <div className="page visit__inner">
        <img
          className="visit__photo"
          src="/brand/local-vertical.webp"
          alt={`Entrada del local By Faka en ${store.address}`}
          width={825}
          height={1100}
          loading="lazy"
        />
        <div className="visit__copy">
          <h2 id="visit-title">Te esperamos en el local.</h2>
          <address>
            <span className="visit__address">{store.address}</span>
            <span className="visit__city">{store.city}</span>
          </address>
          <p>
            {store.hours
              ? store.hours
              : 'Antes de venir, escribinos: te confirmamos el horario y que el equipo que querés siga disponible.'}
          </p>
          <div className="visit__actions">
            <a className="button" href={store.mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin aria-hidden size={18} />
              Cómo llegar
            </a>
            <a className="button button--outline" href={store.instagramDmUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon aria-hidden size={18} />
              Consultar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
