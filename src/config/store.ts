import { whatsappNumber } from './env'

// Business facts supplied by the owner (see docs/brand-research.md). Opening hours are unknown, so they are not shown.
const address = 'Av. Independencia 1273'
const city = 'Mar del Plata, Buenos Aires'

export const store = {
  name: 'By Faka',
  fullName: 'By Faka | Apple Store',
  address,
  city,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${city}, Argentina`)}`,
  instagramHandle: 'apple.by.faka',
  instagramUrl: 'https://www.instagram.com/apple.by.faka/',
  instagramDmUrl: 'https://ig.me/m/apple.by.faka',
  whatsappNumber,
} as const
