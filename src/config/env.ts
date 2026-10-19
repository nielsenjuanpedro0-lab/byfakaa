const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').trim().replace(/\/+$/, '')
const productsPath = (import.meta.env.VITE_API_PRODUCTS_PATH ?? '').trim()

/** Full URL of the product list endpoint, or null while the API is not configured. */
export const productsUrl: string | null =
  apiBaseUrl && productsPath ? `${apiBaseUrl}/${productsPath.replace(/^\/+/, '')}` : null

/** Digits only, international format (549223...). Empty until the official number is confirmed. */
export const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')
