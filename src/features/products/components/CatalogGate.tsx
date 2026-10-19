import { CloudOff, RotateCcw } from 'lucide-react'
import { InstagramIcon } from '../../../components/InstagramIcon'
import type { ReactNode } from 'react'
import { store } from '../../../config/store'
import { ApiNotConfiguredError } from '../api'
import type { Catalog } from '../types'
import type { CatalogState } from '../useCatalog'

interface Props {
  state: CatalogState
  retry: () => void
  /** Skeleton shaped like the content it replaces. */
  loading: ReactNode
  children: (catalog: Catalog) => ReactNode
}

/** Renders loading, error and "not connected" states, and the demo-data warning, for anything that needs the catalog. */
export function CatalogGate({ state, retry, loading, children }: Props) {
  if (state.status === 'loading') {
    return (
      <div aria-busy="true">
        <span className="visually-hidden" role="status">Cargando productos…</span>
        {loading}
      </div>
    )
  }

  if (state.status === 'error') {
    if (state.error instanceof ApiNotConfiguredError) {
      return (
        <div className="notice">
          <CloudOff aria-hidden size={28} strokeWidth={1.5} />
          <h2>El catálogo online todavía no está conectado</h2>
          <p>Mientras tanto, preguntanos qué hay en stock por Instagram o pasá por {store.address}.</p>
          <a className="button" href={store.instagramDmUrl} target="_blank" rel="noopener noreferrer">
            <InstagramIcon aria-hidden size={18} />
            Escribinos por Instagram
          </a>
        </div>
      )
    }
    return (
      <div className="notice" role="alert">
        <CloudOff aria-hidden size={28} strokeWidth={1.5} />
        <h2>No pudimos cargar los productos</h2>
        <p>{state.error.message}. Revisá tu conexión y volvé a intentar.</p>
        <button type="button" className="button" onClick={retry}>
          <RotateCcw aria-hidden size={18} />
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <>
      {state.catalog.source === 'fixture' && (
        <p className="demo-banner" role="note">
          Datos de demostración: estos productos y precios no son el stock real.
        </p>
      )}
      {children(state.catalog)}
    </>
  )
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul className="product-grid" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="skeleton-card">
          <div className="skeleton skeleton--image" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line skeleton--short" />
        </li>
      ))}
    </ul>
  )
}
