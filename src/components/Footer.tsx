import { Link } from 'react-router'
import { legalIdentity, store } from '../config/store'

const columns = [
  {
    title: 'Comprar',
    links: [
      { to: '/catalogo', label: 'Catálogo' },
      { to: '/catalogo?estado=nuevo', label: 'iPhone nuevos' },
      { to: '/catalogo?estado=usado', label: 'iPhone usados' },
    ],
  },
  {
    title: 'By Faka',
    links: [
      { to: '/nosotros', label: 'Nosotros' },
      { to: '/nosotros#faq-title', label: 'Preguntas frecuentes' },
      { to: '/contacto', label: 'El local' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/terminos', label: 'Términos y condiciones' },
      { to: '/privacidad', label: 'Política de privacidad' },
      { to: '/defensa-del-consumidor', label: 'Defensa del consumidor' },
      { to: '/arrepentimiento', label: 'Botón de arrepentimiento' },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="site-footer__name">{store.name}</p>
            <address>
              {store.address}
              <br />
              {store.city}
            </address>
            <a href={store.instagramUrl} target="_blank" rel="noopener noreferrer">@{store.instagramHandle}</a>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="site-footer__col">
              <p className="site-footer__col-title">{col.title}</p>
              {col.links.map((link) => (
                <Link key={link.to} to={link.to}>{link.label}</Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="site-footer__bottom">
          <div>
            <p>
              © {year} {store.name}
              {legalIdentity && ` · ${legalIdentity}`}. Todos los derechos reservados.
            </p>
            <p className="site-footer__legal">
              Apple, iPhone, iPad, AirPods, Apple Watch y Mac son marcas registradas de Apple Inc. Su mención es solo descriptiva.
            </p>
          </div>
          <Link to="/arrepentimiento" className="site-footer__withdraw">Botón de arrepentimiento</Link>
          {store.legal.dataFiscalQr && (
            <a href={store.legal.dataFiscalUrl || undefined} target="_blank" rel="noopener noreferrer" className="site-footer__fiscal">
              <img src={store.legal.dataFiscalQr} alt="Data Fiscal (AFIP)" width={48} height={64} />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
