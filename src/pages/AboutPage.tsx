import { ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { Faq } from '../components/Faq'
import { store } from '../config/store'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { useTitle } from '../lib/useTitle'

// Only facts the owner supplied or the site itself guarantees (live inventory, legal warranty). See docs/brand-research.md.
const principles = [
  {
    term: 'Stock real',
    text: 'La web lee el inventario de nuestro sistema de gestión. Cada equipo publicado es una unidad que tenemos disponible, con su capacidad, color, estado y precio.',
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
    term: 'Garantía',
    text: 'Nuestras garantías cubren desde 30 a 90 días en los usados, y de 6 meses a 1 año en los equipos nuevos.',
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
        <h1>Sobre nosotros</h1>
        <div className="about__story">
          <p className="about__lead">
            Mi nombre es Facundo, y me dedico a la venta de productos Apple desde 2021. Donde en un escenario de pandemia y
            con objetivos claros de crear algo propio relacionado a la tecnología que tanto me apasiona, comenzó “Apple By
            Faka”.
          </p>
          <p>
            Lo que hoy se plasma en un local sobre Avenida Independencia, por mucho tiempo fue vender en cafés, a domicilio,
            en oficinas. Hoy, verlo convertido en realidad representa mucho más que un espacio físico: es el resultado de todo
            el camino recorrido.
          </p>
          <p>
            Desde el primer día, mi idea fue la misma: ofrecer buenos productos, asesoramiento sincero y, sobre todo, una
            atención cercana y personalizada. Siempre con la mirada en mejorar día a día.
          </p>
          <p>
            Creo que lo más importante no es solamente lo que vendemos, sino la confianza que construimos con cada cliente.
          </p>
          <p>Gracias por ser parte de esta historia.</p>
          <p className="about__signature">Facundo — By Faka Store</p>
        </div>
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
        <Faq />
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
