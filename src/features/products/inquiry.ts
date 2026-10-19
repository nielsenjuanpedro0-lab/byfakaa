import { store } from '../../config/store'
import { conditionLabel, formatPrice, variantSummary } from './format'
import type { Product } from './types'

/** Message prefilled in WhatsApp, built only from fields the API actually returned. */
export function inquiryMessage(product?: Product, productUrl?: string): string {
  if (!product) return 'Hola! Quería hacer una consulta.'
  const variant = variantSummary(product)
  const details = [
    variant,
    product.condition && conditionLabel[product.condition].toLowerCase(),
  ].filter(Boolean)
  const lines = [
    `Hola! Quería consultar por ${product.name}${details.length ? ` (${details.join(', ')})` : ''}.`,
    product.price ? `Lo vi publicado a ${formatPrice(product.price)}. ¿Sigue disponible?` : '¿Me pasás precio y disponibilidad?',
    productUrl,
  ]
  return lines.filter(Boolean).join('\n')
}

/** wa.me link, or null while the official number is not configured. */
export function whatsappUrl(message: string): string | null {
  return store.whatsappNumber ? `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}` : null
}
