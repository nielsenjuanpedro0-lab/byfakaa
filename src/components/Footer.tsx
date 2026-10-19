import { Link } from 'react-router'
import { store } from '../config/store'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <p className="site-footer__name">{store.fullName}</p>
        <p>
          {store.address}, {store.city}
        </p>
        <nav aria-label="Pie de página">
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/contacto">El local</Link>
          <a href={store.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
        </nav>
        <p className="site-footer__legal">Apple, iPhone y AirPods son marcas registradas de Apple Inc.</p>
      </div>
    </footer>
  )
}
