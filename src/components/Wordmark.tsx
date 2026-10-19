import { Link } from 'react-router'

// Typeset placeholder: the official logo could not be obtained. Swap this component's contents for the logo file.
export function Wordmark() {
  return (
    <Link to="/" className="wordmark" aria-label="By Faka, inicio" viewTransition>
      <span className="wordmark__name">By Faka</span>
      <span className="wordmark__place">Mar del Plata</span>
    </Link>
  )
}
