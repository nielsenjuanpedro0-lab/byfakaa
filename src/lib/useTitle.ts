import { useEffect } from 'react'

export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | By Faka, Mar del Plata` : 'By Faka | iPhone nuevos y usados en Mar del Plata'
  }, [title])
}
