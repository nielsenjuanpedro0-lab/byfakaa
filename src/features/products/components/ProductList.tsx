import type { Product } from '../types'
import { ProductCard } from './ProductCard'
import { ProductRow } from './ProductRow'

export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  return (
    <ul className="product-grid">
      {products.map((product, i) => (
        <li key={product.id}>
          <ProductCard product={product} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  )
}

export function ProductRows({ products }: { products: Product[] }) {
  return (
    <ul className="product-rows">
      {products.map((product, i) => (
        <ProductRow key={product.id} product={product} index={i} />
      ))}
    </ul>
  )
}
