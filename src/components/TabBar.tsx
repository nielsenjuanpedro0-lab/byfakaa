import { Home, LayoutGrid, MapPin, MessageCircle } from 'lucide-react'
import { NavLink } from 'react-router'
import { store } from '../config/store'
import { inquiryMessage, whatsappUrl } from '../features/products/inquiry'

/** Mobile-only bottom navigation: discovery and the inquiry action within thumb reach. */
export function TabBar() {
  const inquiryHref = whatsappUrl(inquiryMessage()) ?? store.instagramDmUrl

  return (
    <nav aria-label="Accesos rápidos" className="tab-bar">
      <NavLink to="/" end viewTransition>
        {({ isActive }) => (
          <>
            {isActive && <span className="tab-bar__indicator" />}
            <Home aria-hidden size={22} strokeWidth={1.75} />
            Inicio
          </>
        )}
      </NavLink>
      <NavLink to="/catalogo" viewTransition>
        {({ isActive }) => (
          <>
            {isActive && <span className="tab-bar__indicator" />}
            <LayoutGrid aria-hidden size={22} strokeWidth={1.75} />
            Catálogo
          </>
        )}
      </NavLink>
      <NavLink to="/contacto" viewTransition>
        {({ isActive }) => (
          <>
            {isActive && <span className="tab-bar__indicator" />}
            <MapPin aria-hidden size={22} strokeWidth={1.75} />
            El local
          </>
        )}
      </NavLink>
      <a href={inquiryHref} target="_blank" rel="noopener noreferrer">
        <MessageCircle aria-hidden size={22} strokeWidth={1.75} />
        Consultar
      </a>
    </nav>
  )
}
