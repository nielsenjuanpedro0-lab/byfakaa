import { ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { store } from '../config/store'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { useTitle } from '../lib/useTitle'

// Only facts the owner supplied or the site itself guarantees (live inventory, legal warranty). See docs/brand-research.md.
const principles = [
  {
    term: 'Stock real',
    text: 'La web lee el inventario de nuestro sistema de gestión. Cada equipo publicado es una unidad que tenemos en el local, con su capacidad, color, estado y precio.',
  },
  {
    term: 'Lo ves antes de pagar',
    text: `No vendemos a ciegas. Te acercás a ${store.address}, mirás el equipo, lo revisás y recién ahí decidís.`,
  },
  {
    term: 'Te asesoramos',
    text: 'Si dudás entre dos modelos o no sabés qué capacidad te conviene, te ayudamos a elegir según cómo lo vas a usar y cuánto querés invertir.',
  },
  {
    term: 'Garantía legal',
    text: 'Todo equipo tiene la garantía que fija la Ley 24.240: seis meses los nuevos y tres meses los usados, desde la entrega.',
  },
]

const faqs = [
  {
    q: '¿El stock de la web está actualizado?',
    a: 'Sí. La web toma los equipos directamente de nuestro inventario, así que lo que ves está disponible. Puede haber unos minutos de diferencia con una venta reciente, por eso te recomendamos consultar antes de venir.',
  },
  {
    q: '¿Puedo comprar desde la web?',
    a: 'No hay carrito ni pagos online. Elegís el equipo, nos escribís y coordinamos. La compra se concreta en el local.',
  },
  {
    q: '¿Puedo ver el equipo antes de comprarlo?',
    a: `Sí, siempre. Pasá por ${store.address}, ${store.city}. Si venís por un equipo puntual, avisanos antes y te confirmamos que siga disponible.`,
  },
  {
    q: '¿Qué garantía tienen los equipos?',
    a: 'Todos tienen la garantía legal de la Ley de Defensa del Consumidor: 6 meses para equipos nuevos y 3 meses para usados, contados desde la entrega. Si un equipo tiene una garantía adicional, te la informamos por escrito al comprar.',
  },
  {
    q: '¿Qué significa “Nuevo” y “Usado”?',
    a: 'Es el estado con el que cada unidad está registrada en nuestro inventario. En los usados, cuando tenemos el dato, mostramos la salud de la batería. Para más detalle sobre estética o accesorios incluidos, consultanos por el equipo puntual.',
  },
  {
    q: '¿En qué moneda están los precios? ¿Cómo se paga?',
    a: 'Cada equipo muestra su precio en la moneda en que está publicado: dólares (US$) o pesos ($). Las formas de pago disponibles te las confirmamos al consultar.',
  },
  {
    q: '¿Cómo los contacto?',
    a: store.whatsappNumber
      ? `Por WhatsApp o por Instagram (@${store.instagramHandle}). También podés pasar directamente por el local.`
      : `Por mensaje directo en Instagram (@${store.instagramHandle}), o pasando directamente por el local.`,
  },
]

export function AboutPage() {
  useTitle('Nosotros')
  const { hash } = useLocation()
  // Footer links to the FAQ by anchor; the router doesn't scroll to hashes by itself.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])
  return (
    <div className="about">
      <section className="page about__intro">
        <h1>Sobre By Faka</h1>
        <p className="about__lead">
          By Faka es una tienda de productos Apple en {store.address}. Vendemos iPhone nuevos y usados y accesorios, en el
          local y por mensaje. Hablás directamente con nosotros, ves el equipo y te lo llevás.
        </p>
      </section>

      <section className="page about__principles" aria-labelledby="principles-title">
        <h2 id="principles-title">Cómo trabajamos</h2>
        <dl>
          {principles.map(({ term, text }) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="page about__faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Preguntas frecuentes</h2>
        <div className="faq">
          {faqs.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="page about__cta">
        <p>¿Tenés otra duda?</p>
        <div className="about__cta-actions">
          <InquiryActions />
          <Link className="text-link" to="/catalogo" viewTransition>
            Ver el catálogo
            <ChevronRight aria-hidden size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
