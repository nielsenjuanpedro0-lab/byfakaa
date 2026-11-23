import { store } from '../config/store'
import { InstagramIcon } from './InstagramIcon'
import { WhatsAppIcon } from './WhatsAppIcon'

const greeting = encodeURIComponent('Hola! Te escribo desde la web.')

/** Always-visible shortcuts to the store's two channels, bottom right. */
export function ContactButtons() {
  return (
    <nav className="contact-fab" aria-label="Contacto directo">
      <a
        className="contact-fab__btn contact-fab__btn--wa"
        href={`https://wa.me/${store.whatsappContact}?text=${greeting}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${store.whatsappDisplay}`}
      >
        <WhatsAppIcon aria-hidden size={24} />
      </a>
      <a
        className="contact-fab__btn contact-fab__btn--ig"
        href={store.instagramDmUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram @${store.instagramHandle}`}
      >
        <InstagramIcon aria-hidden size={24} />
      </a>
    </nav>
  )
}
