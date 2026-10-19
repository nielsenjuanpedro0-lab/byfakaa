import { useCallback, useEffect, useState } from 'react'
import { fetchCatalog } from './api'
import type { Catalog, Product } from './types'

export type CatalogState =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; catalog: Catalog }

// shortcut: one fetch per page load, shared by every page; refreshing the browser reloads stock.
// Upgrade to a TTL or background refetch if customers keep tabs open for long.
let request: Promise<Catalog> | null = null
let loaded: Catalog | null = null

function loadCatalog(): Promise<Catalog> {
  request ??= fetchCatalog().then(
    (catalog) => (loaded = catalog),
    (error: unknown) => {
      request = null // allow retry
      throw error instanceof Error ? error : new Error(String(error))
    },
  )
  return request
}

/** The whole product catalog. The list endpoint is the only data source, so detail pages read from it too. */
export function useCatalog() {
  const [state, setState] = useState<CatalogState>(() =>
    loaded ? { status: 'success', catalog: loaded } : { status: 'loading' },
  )
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true // ignore results after unmount or a newer attempt
    loadCatalog().then(
      (catalog) => active && setState({ status: 'success', catalog }),
      (error: Error) => active && setState({ status: 'error', error }),
    )
    return () => {
      active = false
    }
  }, [attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((n) => n + 1)
  }, [])

  return { state, retry }
}

export function findProduct(catalog: Catalog, id: string): Product | undefined {
  return catalog.products.find((product) => product.id === id)
}
