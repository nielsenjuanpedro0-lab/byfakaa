import { ChevronRight } from 'lucide-react'
import { store } from '../config/store'
import { inquiryMessage, whatsappUrl } from '../features/products/inquiry'

/** Address, hours and contact channels. Only owner-supplied facts. */
export function StoreInfo({ headingLevel = 2, heading = 'El local' }: { headingLevel?: 1 | 2 | 3; heading?: string }) {
  const Heading = `h${headingLevel}` as const
  const wa = whatsappUrl(inquiryMessage())
  const links = [
    { href: store.mapsUrl, label: 'Cómo llegar' },
    ...(wa ? [{ href: wa, label: 'Escribinos por WhatsApp' }] : []),
    { href: store.phoneHref, label: `Llamanos al ${store.phone}` },
    { href: store.instagramUrl, label: `Seguinos en @${store.instagramHandle}` },
  ]

  return (
    <div className="store-info">
      <Heading className="store-info__heading">{heading}</Heading>
      <address>
        <span className="store-info__street">{store.address}</span>
        <span className="store-info__city">{store.between}</span>
      </address>
      <p className="store-info__hours">
        <span>Horarios</span>
        {store.hours}
      </p>
      <ul className="store-info__links">
        {links.map((link) => (
          <li key={link.href}>
            <a className="text-link" href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
              <ChevronRight aria-hidden size={18} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
