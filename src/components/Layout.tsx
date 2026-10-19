import { Outlet, ScrollRestoration, useMatch } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'
import { TabBar } from './TabBar'

export function Layout() {
  // Product pages have their own sticky purchase bar on mobile instead of the tab bar.
  const onProduct = useMatch('/producto/:id')

  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      {!onProduct && <TabBar />}
      <ScrollRestoration />
    </>
  )
}
