import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { vtName } from '../../../lib/viewTransition'
import { conditionLabel, variantSummary } from '../format'
import type { Product } from '../types'
import { Availability } from './Availability'
import { PriceTag } from './PriceTag'
import { ProductImage } from './ProductImage'

/** Dense stock-list row for the catalog list view. */
export function ProductRow({ product, index = 0 }: { product: Product; index?: number }) {
  const details = [variantSummary(product), product.condition && conditionLabel[product.condition]].filter(Boolean).join(', ')
  const soldOut = product.availability === 'out_of_stock'

  return (
    <li className={`product-row${soldOut ? ' is-sold-out' : ''}`} style={{ '--i': index } as CSSProperties}>
      <ProductImage src={product.thumbs[0] ?? product.images[0]} illustrative={product.illustrative} alt="" className="product-row__thumb" vtName={vtName('pimg', product.id)} />
      <div className="product-row__text">
        <Link to={`/producto/${encodeURIComponent(product.id)}`} className="product-row__name" viewTransition>
          {product.name}
        </Link>
        {details && <span className="product-row__details">{details}</span>}
      </div>
      <div className="product-row__price">
        <PriceTag price={product.price} size="sm" soldOut={soldOut} />
        <Availability product={product} />
      </div>
    </li>
  )
}
