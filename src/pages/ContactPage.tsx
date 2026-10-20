import { Clock, MapPin, MessageCircle, Navigation } from 'lucide-react'
import { StoreInfo } from '../components/StoreInfo'
import { store } from '../config/store'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { useTitle } from '../lib/useTitle'

export function ContactPage() {
  useTitle('El local')
  return (
    <div className="contact">
      <section className="page">
        <StoreInfo headingLevel={1} />
      </section>

      <section className="page contact__map" aria-label="Mapa">
        <StoreMap />
      </section>

      <section className="page contact__info" aria-label="Información para visitarnos">
        <div>
          <Clock aria-hidden size={24} strokeWidth={1.5} />
          <h2>Horarios</h2>
          <p>{store.hours || 'Escribinos antes de venir y te confirmamos el horario de atención del día.'}</p>
        </div>
        <div>
          <Navigation aria-hidden size={24} strokeWidth={1.5} />
          <h2>Cómo llegar</h2>
          <p>
            Estamos sobre {store.address}, {store.city}.{' '}
            <a href={store.mapsUrl} target="_blank" rel="noopener noreferrer">Abrí la ubicación en Google Maps</a> para ver el
            recorrido desde donde estés.
          </p>
        </div>
        <div>
          <MapPin aria-hidden size={24} strokeWidth={1.5} />
          <h2>Antes de venir</h2>
          <p>
            Cada equipo publicado es una unidad única. Si venís por uno en particular, consultanos y te confirmamos que siga
            disponible.
          </p>
        </div>
        <div>
          <MessageCircle aria-hidden size={24} strokeWidth={1.5} />
          <h2>Consultas</h2>
          <p>Respondemos por mensaje: disponibilidad, precio, estado del equipo o lo que necesites saber.</p>
          <InquiryActions variant="link" />
        </div>
      </section>
    </div>
  )
}

function StoreMap() {
  return (
    <iframe
      className="contact__map-frame"
      src={store.mapsEmbedUrl}
      title={`Mapa: ${store.address}, ${store.city}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
