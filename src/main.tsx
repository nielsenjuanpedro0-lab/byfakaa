import '@fontsource-variable/inter'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/products.css'
import './styles/pages.css'
import './styles/home.css'
import './styles/info-pages.css'
import './styles/motion.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { CatalogPage } from './pages/CatalogPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { ConsumerPage, PrivacyPage, TermsPage, WithdrawalPage } from './pages/LegalPages'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/catalogo', element: <CatalogPage /> },
      { path: '/producto/:id', element: <ProductPage /> },
      { path: '/contacto', element: <ContactPage /> },
      { path: '/nosotros', element: <AboutPage /> },
      { path: '/terminos', element: <TermsPage /> },
      { path: '/privacidad', element: <PrivacyPage /> },
      { path: '/defensa-del-consumidor', element: <ConsumerPage /> },
      { path: '/arrepentimiento', element: <WithdrawalPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
