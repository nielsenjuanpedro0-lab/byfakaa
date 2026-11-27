import type { Product } from '../features/products/types'

/*
 * Ofertas del Inicio. Hay dos formas de marcar un equipo como oferta (sirven las dos a la vez):
 *
 * 1. En Stackr: poné la categoría del producto como "Ofertas" (o cualquier categoría que contenga "oferta").
 *    No hace falta tocar el código: aparece solo en el Inicio y desaparece cuando se vende.
 * 2. Acá: agregá el ID del producto (el que figura en la URL /producto/<id>) a `offerIds`,
 *    con una etiqueta corta opcional, por ejemplo "Precio especial" o "Últimas unidades".
 *
 * Si no hay ninguna oferta con stock, la sección no se muestra.
 */
export const offerIds: Record<string, string> = {
  // 'abc123': 'Precio especial',
}

const offerCategory = /oferta/i

export const isOffer = (p: Product) => p.id in offerIds || (!!p.category && offerCategory.test(p.category))
