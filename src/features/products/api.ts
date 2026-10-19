import { productsUrl } from '../../config/env'
import { getJson } from '../../lib/api-client'
import type { Catalog } from './types'
import { parseCatalog } from './upstream'

/** Thrown when no product API is configured, so the UI can say so instead of showing an empty store. */
export class ApiNotConfiguredError extends Error {
  constructor() {
    super('La API de productos no está configurada')
    this.name = 'ApiNotConfiguredError'
  }
}

export async function fetchCatalog(): Promise<Catalog> {
  // Written inline (not via a variable) so production builds drop the fixture branch and its chunk.
  if (import.meta.env.DEV && import.meta.env.VITE_USE_FIXTURES === 'true') {
    const { loadFixtureCatalog } = await import('./fixtures')
    return loadFixtureCatalog()
  }
  if (!productsUrl) throw new ApiNotConfiguredError()
  return { ...parseCatalog(await getJson(productsUrl)), source: 'api' }
}
