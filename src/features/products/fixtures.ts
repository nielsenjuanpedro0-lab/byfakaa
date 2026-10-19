/*
 * DEVELOPMENT ONLY. Demo catalog used while the real product API is not connected.
 * Loaded through a dynamic import guarded by `import.meta.env.DEV`, so it is not part of production builds.
 * Prices and stock are invented for layout testing; pages show a "datos de demostración" banner while it is active.
 * Scenarios for testing states: add ?demo=error, ?demo=empty or ?demo=slow to any URL.
 */
import type { Catalog } from './types'
import { parseCatalog } from './upstream'

// Plain labelled test images, so the gallery and image paths can be exercised without fake product photography.
const testImage = (label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#232325"/><rect x="250" y="190" width="300" height="620" rx="48" fill="none" stroke="#5a5a5e" stroke-width="6"/><text x="400" y="900" font-family="sans-serif" font-size="34" fill="#86868b" text-anchor="middle">${label}</text></svg>`,
  )}`

const demoItems: unknown[] = [
  { id: 'demo-15pro-256-nat', name: 'iPhone 15 Pro', storage: '256 GB', color: 'Titanio natural', condition: 'used', category: 'iPhone', price: 820, currency: 'USD', stock: 1, images: [testImage('Foto de prueba 1'), testImage('Foto de prueba 2'), testImage('Foto de prueba 3')], description: 'Equipo usado de demostración. Este texto viene del campo de descripción de la API.' },
  { id: 'demo-16-128-ultra', name: 'iPhone 16', storage: '128 GB', color: 'Ultramarino', condition: 'new', category: 'iPhone', price: 1050, currency: 'USD', stock: 4, images: [testImage('Foto de prueba')] },
  { id: 'demo-16pro-256-des', name: 'iPhone 16 Pro', storage: '256 GB', color: 'Titanio desierto', condition: 'new', category: 'iPhone', price: 1390, currency: 'USD', stock: 2 },
  { id: 'demo-14-128-med', name: 'iPhone 14', storage: '128 GB', color: 'Medianoche', condition: 'used', category: 'iPhone', price: 470, currency: 'USD', stock: 3 },
  { id: 'demo-13-128-est', name: 'iPhone 13', storage: '128 GB', color: 'Blanco estelar', condition: 'used', category: 'iPhone', price: 380, currency: 'USD', stock: 1, images: ['/demo-imagen-rota.jpg'] },
  { id: 'demo-15-256-rosa', name: 'iPhone 15', storage: '256 GB', color: 'Rosa', condition: 'new', category: 'iPhone', price: 1020, currency: 'USD', stock: 0 },
  { id: 'demo-12-64-negro', name: 'iPhone 12', storage: '64 GB', color: 'Negro', condition: 'used', category: 'iPhone', stock: 2 },
  { id: 'demo-15pro-1tb-neg', name: 'iPhone 15 Pro', storage: '1 TB', color: 'Titanio negro', condition: 'used', category: 'iPhone', price: 1080, currency: 'USD', stock: 1 },
  { id: 'demo-airpods-pro-2', name: 'AirPods Pro (2.ª generación) con estuche MagSafe (USB-C)', condition: 'new', category: 'AirPods', price: 290, currency: 'USD', stock: 5 },
  { id: 'demo-cargador-20w', name: 'Adaptador de corriente USB-C de 20 W', condition: 'new', category: 'Accesorios', price: 45000, currency: 'ARS', stock: 12 },
  { id: 'demo-funda-15pro', name: 'Funda de silicona con MagSafe para iPhone 15 Pro', color: 'Negro', condition: 'new', category: 'Accesorios', price: 62000, currency: 'ARS' },
  { id: 'demo-invalido', price: 100 },
]

export async function loadFixtureCatalog(): Promise<Catalog> {
  const scenario = new URLSearchParams(window.location.search).get('demo')
  await new Promise((resolve) => setTimeout(resolve, scenario === 'slow' ? 4000 : 350))
  if (scenario === 'error') throw new Error('Error simulado (?demo=error)')
  return { ...parseCatalog(scenario === 'empty' ? [] : demoItems), source: 'fixture' }
}
