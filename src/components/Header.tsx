import { Search } from 'lucide-react'
import { Form, Link, NavLink, useSearchParams } from 'react-router'
import { InquiryActions } from '../features/products/components/InquiryActions'
import { Wordmark } from './Wordmark'

export function Header() {
  const [params] = useSearchParams()

  return (
    <header className="site-header">
      <div className="page site-header__inner">
        <Wordmark />
        <nav aria-label="Principal" className="site-nav">
          <NavLink to="/" end viewTransition>Inicio</NavLink>
          <NavLink to="/catalogo" viewTransition>Catálogo</NavLink>
          <NavLink to="/nosotros" viewTransition>Nosotros</NavLink>
          <NavLink to="/contacto" viewTransition>El local</NavLink>
        </nav>
        <Form action="/catalogo" role="search" className="header-search">
          <label htmlFor="header-q" className="visually-hidden">Buscar productos</label>
          <Search aria-hidden size={18} />
          {/* key resets the field when the catalog query changes elsewhere */}
          <input id="header-q" key={params.get('q') ?? ''} name="q" type="search" placeholder="Buscar iPhone, AirPods…" defaultValue={params.get('q') ?? ''} autoComplete="off" />
        </Form>
        <InquiryActions compact className="site-header__cta" />
        <Link to="/catalogo#buscar" className="header-search-link" aria-label="Buscar productos">
          <Search aria-hidden size={22} />
        </Link>
      </div>
    </header>
  )
}
