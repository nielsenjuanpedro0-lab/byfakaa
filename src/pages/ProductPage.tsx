import { ChevronLeft, MapPin } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { store } from '../config/store'
import { Availability } from '../features/products/components/Availability'
import { CatalogGate } from '../features/products/components/CatalogGate'
import { Gallery } from '../features/products/components/Gallery'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { PriceTag } from '../features/products/components/PriceTag'
import { ProductGrid } from '../features/products/components/ProductList'
import { conditionSlug, param } from '../features/products/filters'
import { conditionLabel, conditionLabelPlural, variantSummary } from '../features/products/format'
import type { Catalog, Product } from '../features/products/types'
import { findProduct, useCatalog } from '../features/products/useCatalog'
import { useTitle } from '../lib/useTitle'
import { vtName } from '../lib/viewTransition'

export function ProductPage() {
  const { id = '' } = useParams()
  const { state, retry } = useCatalog()

  return (
    <div className="page product-page">
      <CatalogGate state={state} retry={retry} loading={<DetailSkeleton />}>
        {(catalog) => {
          const product = findProduct(catalog, id)
          return product ? <ProductDetail key={product.id} product={product} catalog={catalog} /> : <ProductNotFound />
        }}
      </CatalogGate>
    </div>
  )
}

function ProductDetail({ product, catalog }: { product: Product; catalog: Catalog }) {
  useTitle(product.name)
  const soldOut = product.availability === 'out_of_stock'
  const variant = variantSummary(product)
  const back = product.condition
    ? { to: `/catalogo?${param.condition}=${conditionSlug[product.condition]}`, label: conditionLabelPlural[product.condition] }
    : { to: '/catalogo', label: 'Catálogo' }

  const specs: [string, string | undefined][] = [
    ['Estado', product.condition && conditionLabel[product.condition]],
    ['Capacidad', product.storage],
    ['Color', product.color],
    ['Categoría', product.category],
    ['Unidades', product.stock !== undefined && product.stock > 0 ? String(product.stock) : undefined],
  ]

  return (
    <>
      <nav aria-label="Ruta" className="crumbs">
        <Link to={back.to} className="text-link" viewTransition>
          <ChevronLeft aria-hidden size={18} />
          {back.label}
        </Link>
      </nav>

      <article className="detail">
        <div className="detail__media">
          <Gallery images={product.images} name={product.name} vtName={vtName('pimg', product.id)} />
        </div>

        <div className="detail__info">
          {product.condition && (
            <span className={`condition condition--${product.condition}`}>{conditionLabel[product.condition]}</span>
          )}
          <h1 className="detail__name">{product.name}</h1>
          {variant && <p className="detail__variant">{variant}</p>}

          <div className="detail__price">
            <PriceTag price={product.price} size="lg" soldOut={soldOut} />
            <Availability product={product} />
          </div>

          <div className="detail__actions">
            <InquiryActions product={product} />
            <p className="detail__note">
              {soldOut
                ? 'Este producto no tiene stock ahora. Consultanos si va a volver a entrar.'
                : 'La compra se coordina por mensaje o en el local.'}
            </p>
          </div>

          <dl className="specs">
            {specs.map(([label, value]) =>
              value ? (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ) : null,
            )}
          </dl>

          {product.description && <p className="detail__description">{product.description}</p>}

          <a className="text-link detail__visit" href={store.mapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPin aria-hidden size={18} />
            Verlo en el local: {store.address}
          </a>
        </div>
      </article>

      <Related product={product} catalog={catalog} />

      <div className="purchase-bar">
        <PriceTag price={product.price} size="sm" soldOut={soldOut} />
        <InquiryActions product={product} compact />
      </div>
    </>
  )
}

function Related({ product, catalog }: { product: Product; catalog: Catalog }) {
  const related = catalog.products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.availability !== 'out_of_stock' &&
        p.category === product.category &&
        p.condition === product.condition,
    )
    .slice(0, 4)
  if (related.length === 0) return null

  const label = product.condition ? conditionLabelPlural[product.condition].toLowerCase() : 'productos'
  return (
    <section className="related reveal" aria-labelledby="related-title">
      <h2 id="related-title">Otros {label} disponibles</h2>
      <ProductGrid products={related} />
    </section>
  )
}

function ProductNotFound() {
  useTitle('Producto no encontrado')
  return (
    <div className="notice">
      <h1>No encontramos este producto</h1>
      <p>Puede que ya se haya vendido o que el enlace esté incompleto.</p>
      <Link className="button" to="/catalogo" viewTransition>Ver el catálogo</Link>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="detail" aria-hidden>
      <div className="skeleton skeleton--image detail__media" />
      <div className="detail__info">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--line skeleton--short" />
        <div className="skeleton skeleton--line" />
      </div>
    </div>
  )
}
