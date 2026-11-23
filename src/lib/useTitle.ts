import { useEffect } from 'react'
import { useLocation } from 'react-router'

const SITE = 'https://www.byfaka.store'

/** Sets the document title and keeps the canonical URL on the current page (the SPA serves every route from one HTML). */
export function useTitle(title?: string) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title ? `${title} | By Faka, Mar del Plata` : 'By Faka | iPhone nuevos y usados en Mar del Plata'
  }, [title])

  useEffect(() => {
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${SITE}${pathname}`)
  }, [pathname])
}
