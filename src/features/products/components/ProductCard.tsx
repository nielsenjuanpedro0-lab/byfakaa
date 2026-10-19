import { Link } from 'react-router'
import { vtName } from '../../../lib/viewTransition'
import { conditionLabel, variantSummary } from '../format'
import type { Product } from '../types'
import { Availability } from './Availability'
import { PriceTag } from './PriceTag'
import { ProductImage } from './ProductImage'

/** Dark tile; the name link is stretched over the whole card so any tap opens the product. */
export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const variant = variantSummary(product)
  const soldOut = product.availability === 'out_of_stock'

  return (
    <article className={`product-card${soldOut ? ' is-sold-out' : ''}`} style={{ viewTransitionName: vtName('pcard', product.id) }}>
      <ProductImage src={product.images[0]} alt={product.name} priority={priority} vtName={vtName('pimg', product.id)} />
      <div className="product-card__body">
        {product.condition && (
          <p className={`condition condition--${product.condition}`}>{conditionLabel[product.condition]}</p>
        )}
        <h3 className="product-card__name">
          <Link to={`/producto/${encodeURIComponent(product.id)}`} className="product-card__link" viewTransition>
            {product.name}
          </Link>
        </h3>
        {variant && <p className="product-card__variant">{variant}</p>}
        <div className="product-card__foot">
          <PriceTag price={product.price} size="sm" soldOut={soldOut} />
          <Availability product={product} />
        </div>
      </div>
    </article>
  )
}
