import { Link } from 'react-router'
import { useTitle } from '../lib/useTitle'

export function NotFoundPage() {
  useTitle('Página no encontrada')
  return (
    <div className="page">
      <div className="notice">
        <h1>Esta página no existe</h1>
        <p>Revisá la dirección o seguí desde el catálogo.</p>
        <Link className="button" to="/catalogo">Ver el catálogo</Link>
      </div>
    </div>
  )
}
