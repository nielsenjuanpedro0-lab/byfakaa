import { ArrowRight, ChevronRight, Gift, MapPin, ShieldCheck, Store } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { InstagramIcon } from '../components/InstagramIcon'
import { store } from '../config/store'
import { CatalogGate } from '../features/products/components/CatalogGate'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { ProductCard } from '../features/products/components/ProductCard'
import { conditionSlug, facetOptions, param } from '../features/products/filters'
import type { Catalog, Product } from '../features/products/types'
import { useCatalog } from '../features/products/useCatalog'
import { useTitle } from '../lib/useTitle'
import { TipCards } from './TipsPage'

const GRID_SIZE = 8

const availableOf = (catalog: Catalog) => catalog.products.filter((p) => p.availability !== 'out_of_stock')

/** The four ways to buy, in the owner's words. Links go to the closest filter the catalog supports. */
const lines = [
  { title: 'Sellados', text: 'Equipos nuevos en caja cerrada.', to: `/catalogo?${param.condition}=${conditionSlug.new}`, cta: 'Ver stock' },
  { title: 'Like New', text: 'iPhones nuevos al precio de usados.', href: store.instagramDmUrl, cta: 'Consultar' },
  { title: 'Usados seleccionados', text: 'Revisados uno por uno, con estado de batería informado.', to: `/catalogo?${param.condition}=${conditionSlug.used}`, cta: 'Ver stock' },
  { title: 'Android', text: 'Motorola y otras marcas.', to: `/catalogo?${param.q}=motorola`, cta: 'Ver stock' },
]

/** What every purchase includes, as the owner lists it in his stock messages. */
const promises = [
  { icon: Gift, title: 'Funda, vidrio y cable', text: 'Incluidos con cada equipo.' },
  { icon: ShieldCheck, title: 'Garantía por escrito', text: 'En cada compra, nuevos y usados.' },
  { icon: Store, title: 'Lo ves antes de pagar', text: 'Lo revisás y probás en el local.' },
  { icon: MapPin, title: 'Local propio', text: `${store.address}, Mar del Plata.` },
]

const steps = [
  { title: 'Elegí tu equipo', text: 'Mirá el stock y los precios acá, actualizados desde el local.' },
  { title: 'Escribinos', text: 'Te confirmamos que siga disponible y coordinamos tu visita.' },
  { title: 'Retiralo en el local', text: `Lo ves, lo probás y te lo llevás en ${store.address}.` },
]

export function HomePage() {
  useTitle()
  const { state, retry } = useCatalog()
  const catalog = state.status === 'success' ? state.catalog : undefined
  const inStock = catalog ? availableOf(catalog).length : 0

  return (
    <div>
      <section className="hero" aria-labelledby="hero-title">
        {/* The real storefront, faded into the canvas: proof there is a shop you can walk into */}
        <img
          className="hero__bg"
          src="/brand/local-fachada.jpg"
          alt={`Fachada del local By Faka en ${store.address}`}
          width={1600}
          height={1200}
          fetchPriority="high"
        />
        <div className="page hero__inner">
          {inStock > 0 && (
            <p className="hero__pill">
              <span className="hero__dot" aria-hidden />
              {inStock === 1 ? '1 equipo en stock ahora' : `${inStock} equipos en stock ahora`}
            </p>
          )}
          <h1 id="hero-title">
            Tecnología <span>a tu alcance.</span>
          </h1>
          <p className="hero__sub">
            iPhones nuevos, sellados y usados seleccionados en Mar del Plata. Vení a verlos en persona a {store.address}.
          </p>
          <div className="hero__actions">
            <Link className="button" to={`/catalogo?${param.available}=1`} viewTransition>Ver equipos disponibles</Link>
            <a className="button button--outline" href={store.instagramDmUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon aria-hidden size={18} />
              Escribinos
            </a>
          </div>
        </div>
      </section>

      <section className="page promises" aria-label="Por qué comprar en By Faka">
        <ul className="promises__list">
          {promises.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon aria-hidden size={22} />
              <p>
                <strong>{title}</strong>
                <span>{text}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="page lines reveal" aria-labelledby="lines-title">
        <div className="section-head">
          <h2 id="lines-title">Elegí cómo lo querés.</h2>
          <p>Cuatro formas de tener tu próximo equipo. Todas con atención personalizada en el local.</p>
        </div>
        <ul className="lines__grid">
          {lines.map((line, i) => (
            <li key={line.title} className="line-card">
              <span className="line-card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{line.title}</h3>
              <p>{line.text}</p>
              {line.to ? (
                <Link className="line-card__cta" to={line.to} viewTransition>
                  {line.cta} <ArrowRight aria-hidden size={18} />
                </Link>
              ) : (
                <a className="line-card__cta" href={line.href} target="_blank" rel="noopener noreferrer">
                  {line.cta} <ArrowRight aria-hidden size={18} />
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="page available" aria-labelledby="available-title">
        <div className="section-head">
          <h2 id="available-title">Disponibles ahora.</h2>
          <Link className="text-link" to={`/catalogo?${param.available}=1`} viewTransition>
            Ver todo el catálogo <ChevronRight aria-hidden size={18} />
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

      <section className="steps reveal" aria-labelledby="steps-title">
        <div className="page">
          <h2 id="steps-title" className="steps__title">Comprar es así de simple.</h2>
          <ol className="steps__list">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="steps__actions">
            <Link className="button" to="/catalogo" viewTransition>Ver catálogo</Link>
            <InquiryActions />
          </div>
        </div>
      </section>

      <section className="page tips reveal" aria-labelledby="tips-title">
        <div className="section-head">
          <h2 id="tips-title">Sacale el jugo a tu iPhone.</h2>
          <Link className="text-link" to="/tips" viewTransition>
            Ver todos los tips <ChevronRight aria-hidden size={18} />
          </Link>
        </div>
        <TipCards />
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
        <p>Ahora no hay productos publicados. Escribinos y te contamos qué está por entrar.</p>
        <InquiryActions />
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

/** The store as a place: the real map, next to what you need to know before going. */
function Visit() {
  return (
    <section className="visit reveal" aria-labelledby="visit-title">
      <div className="page visit__inner">
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
          <Link className="button button--outline" to="/contacto" viewTransition>
            Cómo llegar y horarios
          </Link>
        </div>
        <div className="visit__map">
          <iframe src={store.mapsEmbedUrl} title={`Mapa: ${store.address}, ${store.city}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  )
}
