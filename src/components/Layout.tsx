import { Outlet, ScrollRestoration } from 'react-router'
import { ContactButtons } from './ContactButtons'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <ContactButtons />
      <ScrollRestoration />
    </>
  )
}
