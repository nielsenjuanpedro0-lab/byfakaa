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
    title: 'Envío gratis en Mar del Plata',
    text: 'En compras desde $100.000. Te lo llevamos a tu casa.',
    image: '/brand/local-fachada.jpg',
    alt: 'Fachada del local By Faka',
    link: { to: '/catalogo', label: 'Ver catálogo' },
  },
  {
    title: 'Cable nuevo, funda y templado',
    text: 'Todos nuestros teléfonos se entregan listos: carga y protección desde el primer momento.',
    link: { to: '/catalogo', label: 'Ver equipos' },
  },
  {
    title: 'Visitanos en el local',
    text: 'Av. Independencia 1273, entre 11 de Septiembre y 3 de Febrero. De 11 a 18 h.',
    image: '/brand/local-vertical.webp',
    alt: 'Entrada del local By Faka',
    link: { to: '/contacto', label: 'Cómo llegar' },
  },
]
