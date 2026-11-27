import { store } from '../config/store'

export interface FaqItem {
  q: string
  a: string
}

export const freeShippingLabel = `$${store.freeShippingFrom.toLocaleString('es-AR')}`

/** Shared by Inicio and Nosotros. */
export const faqs: FaqItem[] = [
  {
    q: '¿Hacen envíos?',
    a: `Sí. El envío es gratis dentro de Mar del Plata en compras desde ${freeShippingLabel}. Para montos menores o fuera de la ciudad, consultanos y te pasamos el costo.`,
  },
  {
    q: '¿El stock de la web está actualizado?',
    a: 'Sí. La web toma los equipos directamente de nuestro inventario, así que lo que ves está disponible. Puede haber unos minutos de diferencia con una venta reciente, por eso te recomendamos consultar antes de venir.',
  },
  {
    q: '¿Puedo comprar desde la web?',
    a: 'No hay carrito ni pagos online. Elegís el equipo, nos escribís y coordinamos la compra: lo retirás en el local o te lo enviamos.',
  },
  {
    q: '¿Qué viene con el teléfono?',
    a: 'Todos nuestros teléfonos se entregan con cable nuevo, funda y templado. Carga y protección desde el primer momento.',
  },
  {
    q: '¿Puedo ver el equipo antes de comprarlo?',
    a: `Sí, siempre. Pasá por ${store.address}, ${store.between}, ${store.hours.toLowerCase()}. Si venís por un equipo puntual, avisanos antes y te confirmamos que siga disponible.`,
  },
  {
    q: '¿Qué garantía tienen los equipos?',
    a: 'Nuestras garantías cubren desde 30 a 90 días en los usados, y de 6 meses a 1 año en los equipos nuevos. Te informamos la garantía de cada equipo al comprar.',
  },
  {
    q: '¿Qué significa “Nuevo” y “Usado”?',
    a: 'Es el estado con el que cada unidad está registrada en nuestro inventario. En los usados, cuando tenemos el dato, mostramos la salud de la batería. Para más detalle sobre estética, consultanos por el equipo puntual.',
  },
  {
    q: '¿En qué moneda están los precios? ¿Cómo se paga?',
    a: 'Cada equipo muestra su precio en la moneda en que está publicado: dólares (US$) o pesos ($). Las formas de pago disponibles te las confirmamos al consultar.',
  },
  {
    q: '¿Cómo los contacto?',
    a: `Por teléfono al ${store.phone}, por Instagram (@${store.instagramHandle}), o pasando directamente por el local.`,
  },
]
