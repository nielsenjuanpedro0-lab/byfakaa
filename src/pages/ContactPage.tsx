import { StoreInfo } from '../components/StoreInfo'
import { useTitle } from '../lib/useTitle'

export function ContactPage() {
  useTitle('El local')
  return (
    <div className="page contact">
      <StoreInfo headingLevel={1} />
      <p className="contact__lead">
        Podés ver los equipos en persona antes de decidir, o consultarnos por mensaje y coordinar desde ahí.
      </p>
    </div>
  )
}
