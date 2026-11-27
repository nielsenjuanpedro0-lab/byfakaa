import { whatsappNumber } from './env'

// Business facts supplied by the owner (see docs/brand-research.md).
const address = 'Av. Independencia 1273'
const city = 'Mar del Plata, Buenos Aires'

export const store = {
  name: 'By Faka',
  /** Name shown in the footer. */
  storeName: 'By Faka Store',
  fullName: 'By Faka | Apple Store',
  address,
  /** Cross streets, shown under the address. */
  between: 'entre 11 de Septiembre y 3 de Febrero',
  city,
  /** Free delivery inside Mar del Plata from this order total (ARS). */
  freeShippingFrom: 100000,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${city}, Argentina`)}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(`${address}, ${city}, Argentina`)}&output=embed`,
  instagramHandle: 'apple.by.faka',
  instagramUrl: 'https://www.instagram.com/apple.by.faka/',
  instagramDmUrl: 'https://ig.me/m/apple.by.faka',
  whatsappNumber,
  /**
   * Number painted on the storefront window, for the floating "WhatsApp" button only.
   * Product inquiries still go to Instagram (owner's request, 13/11/2026: keep WhatsApp from filling up)
   * unless VITE_WHATSAPP_NUMBER is set.
   */
  whatsappContact: '5492235423823',
  whatsappDisplay: '223 542-3823',
  /** Opening hours as the owner wants them shown, e.g. "Lunes a viernes de 10 a 19 h". Empty: the site says to ask. */
  hours: 'De 11 a 18 h',
  /*
   * Legal identity, required by Ley 24.240 and AFIP for a commercial website. Fill in with the owner's real data:
   * the legal pages and footer show each field only once it is set.
   */
  legal: {
    /** Razón social or the owner's full name as registered with AFIP. */
    name: '',
    cuit: '',
    /** Contact email for privacy and consumer requests. */
    email: '',
    /** Image URL of AFIP's "Data Fiscal" QR (Formulario 960/D), e.g. /brand/data-fiscal.png. */
    dataFiscalQr: '',
    dataFiscalUrl: '',
  },
  /** Date shown on the legal pages. Update it when their text changes. */
  legalUpdated: '19 de octubre de 2026',
} as const

/** "By Faka" or "By Faka (Razón social, CUIT …)" for legal texts. */
export const legalIdentity = [store.legal.name, store.legal.cuit && `CUIT ${store.legal.cuit}`].filter(Boolean).join(', ')
