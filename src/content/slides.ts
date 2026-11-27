/*
 * Carrusel del Inicio. Para cambiar o sumar fotos, copiá la imagen en public/brand/ (horizontal, idealmente
 * 1920×800, en .jpg o .webp) y poné su ruta en `image`, por ejemplo '/brand/slides/promo.jpg'.
 * Sin `image`, el slide se muestra como texto sobre fondo oscuro.
 */
export interface Slide {
  title: string
  text?: string
  image?: string
  /** Describe the photo. Required when `image` is set. */
  alt?: string
  link?: { to: string; label: string }
}

export const slides: Slide[] = [
  {
    title: 'Te esperamos en el local',
    text: 'Av. Independencia 1273, entre 11 de Septiembre y 3 de Febrero. De 11 a 18 h.',
    image: '/brand/local-fachada.jpg',
    alt: 'Fachada del local By Faka',
    link: { to: '/contacto', label: 'Cómo llegar' },
  },
  {
    title: 'Elevá tu experiencia de compra',
    text: 'Guías simples para empezar a usarlo, cuidarlo y hacer de tu compra, algo seguro.',
    link: { to: '/tips', label: 'Ver los tips' },
  },
  {
    title: 'Encargalo desde tu casa',
    text: 'Armá tu carrito, mandanos el mensaje y coordinamos la entrega.',
    image: '/brand/local-vertical.webp',
    alt: 'Entrada del local By Faka',
    link: { to: '/catalogo', label: 'Ver catálogo' },
  },
]
