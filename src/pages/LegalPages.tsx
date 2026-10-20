import { Check, Copy } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { NavLink } from 'react-router'
import { InstagramIcon } from '../components/InstagramIcon'
import { legalIdentity, store } from '../config/store'
import { whatsappUrl } from '../features/products/inquiry'
import { useTitle } from '../lib/useTitle'

/*
 * Legal texts for an Argentine store that sells in person and arranges sales by message.
 * Written against Ley 24.240 (consumidor), Ley 25.326 (datos personales), Código Civil y Comercial and
 * Res. SCI 424/2020 (botón de arrepentimiento). Have them reviewed by a lawyer before publishing.
 */

const links = {
  ley24240: 'https://www.argentina.gob.ar/normativa/nacional/ley-24240-638',
  ley25326: 'https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790',
  aaip: 'https://www.argentina.gob.ar/aaip/datospersonales',
  consumidorNacion: 'https://www.argentina.gob.ar/produccion/defensadelconsumidor',
  ventanillaFederal: 'https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario',
  consumidorMgp: 'https://www.mardelplata.gob.ar/defensadelconsumidor',
}

const docs = [
  { to: '/terminos', label: 'Términos y condiciones' },
  { to: '/privacidad', label: 'Política de privacidad' },
  { to: '/defensa-del-consumidor', label: 'Defensa del consumidor' },
  { to: '/arrepentimiento', label: 'Botón de arrepentimiento' },
]

const owner = legalIdentity ? `${store.name} (${legalIdentity})` : store.name
const contactLine = [
  store.legal.email && `por correo a ${store.legal.email}`,
  store.whatsappNumber && 'por WhatsApp',
  `por mensaje directo en Instagram (@${store.instagramHandle})`,
  `o en persona en ${store.address}, ${store.city}`,
]
  .filter(Boolean)
  .join(', ')

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function LegalLayout({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  useTitle(title)
  return (
    <div className="page legal">
      <aside className="legal__aside">
        <nav aria-label="Información legal">
          <p className="legal__aside-title">Información legal</p>
          {docs.map((doc) => (
            <NavLink key={doc.to} to={doc.to} viewTransition>
              {doc.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <article className="legal__body">
        <header className="legal__head">
          <h1>{title}</h1>
          <p className="legal__intro">{intro}</p>
          <p className="legal__updated">Última actualización: {store.legalUpdated}</p>
        </header>
        <div className="prose">{children}</div>
      </article>
    </div>
  )
}

export function TermsPage() {
  return (
    <LegalLayout
      title="Términos y condiciones"
      intro={`Estas condiciones regulan el uso de este sitio web, operado por ${owner}, con domicilio comercial en ${store.address}, ${store.city}.`}
    >
      <h2>1. Qué es este sitio</h2>
      <p>
        Este sitio es un catálogo informativo de los equipos que tenemos en el local. No es una tienda online: no tiene carrito,
        no procesa pagos y no realiza ventas por sí mismo. Las compras se coordinan por mensaje y se concretan en el local.
      </p>

      <h2>2. Productos, stock y precios</h2>
      <ul>
        <li>Cada equipo publicado corresponde a una unidad de nuestro inventario. El stock es limitado a las unidades indicadas.</li>
        <li>
          La información se actualiza desde nuestro sistema de gestión. Una unidad puede venderse en el local en los minutos
          previos a tu consulta; en ese caso te lo informamos al responder.
        </li>
        <li>
          Los precios publicados están expresados en la moneda indicada en cada equipo (dólares estadounidenses, US$, o pesos
          argentinos, $) y son los vigentes al momento de la publicación.
        </li>
        <li>Las formas de pago disponibles se informan al momento de la consulta, antes de concretar la compra.</li>
        <li>Las fotos, cuando las hay, muestran el equipo publicado o uno equivalente; ante cualquier duda, consultanos.</li>
      </ul>

      <h2>3. Estado de los equipos</h2>
      <p>
        Cada equipo se publica como “Nuevo” o “Usado”, según el estado registrado en nuestro inventario. En los usados, cuando
        contamos con el dato, informamos la salud de la batería. Podés revisar el equipo en el local antes de comprarlo.
      </p>

      <h2>4. Garantía</h2>
      <p>
        Todos los equipos cuentan con la garantía legal prevista en el artículo 11 de la{' '}
        <External href={links.ley24240}>Ley 24.240 de Defensa del Consumidor</External>: seis (6) meses para equipos nuevos y
        tres (3) meses para equipos usados, contados desde la entrega. Para hacerla valer, contactanos {contactLine}. Cualquier
        garantía adicional se informa por escrito al momento de la compra.
      </p>

      <h2>5. Marcas</h2>
      <p>
        Apple, iPhone, iPad, AirPods, Apple Watch, Mac y MagSafe son marcas registradas de Apple Inc. Su mención en este sitio
        es solo descriptiva, para identificar los productos que comercializamos.
      </p>

      <h2>6. Uso del sitio</h2>
      <p>
        Podés usar el sitio para informarte y consultarnos. No está permitido usarlo para fines ilícitos, intentar acceder a
        partes no públicas, interferir con su funcionamiento ni copiar sus contenidos de forma masiva o con fines comerciales.
      </p>

      <h2>7. Enlaces a otros servicios</h2>
      <p>
        El sitio enlaza a servicios de terceros como Instagram, WhatsApp y Google Maps. Al usarlos, se aplican sus propias
        condiciones y políticas de privacidad.
      </p>

      <h2>8. Cambios</h2>
      <p>
        Podemos actualizar estas condiciones. La versión vigente es la publicada en esta página, con su fecha de última
        actualización.
      </p>

      <h2>9. Ley aplicable</h2>
      <p>
        Estas condiciones se rigen por las leyes de la República Argentina. Si sos consumidor, podés reclamar ante los
        tribunales de tu domicilio, según el artículo 36 de la Ley 24.240. Para cualquier otro caso, son competentes los
        tribunales ordinarios del Departamento Judicial de Mar del Plata.
      </p>
    </LegalLayout>
  )
}

export function PrivacyPage() {
  return (
    <LegalLayout
      title="Política de privacidad"
      intro={`Cómo trata ${owner} tus datos personales, conforme a la Ley 25.326 de Protección de los Datos Personales.`}
    >
      <h2>Resumen</h2>
      <p>
        Este sitio no tiene registro de usuarios ni formularios que guarden datos, no usa cookies propias y no tiene
        herramientas de publicidad ni de seguimiento. El mapa de Google Maps que mostramos es un servicio de Google. Los únicos datos que recibimos son los que vos decidís mandarnos al
        consultarnos.
      </p>

      <h2>1. Responsable</h2>
      <p>
        El responsable de los datos es {owner}, con domicilio en {store.address}, {store.city}. Podés contactarnos {contactLine}.
      </p>

      <h2>2. Qué datos tratamos</h2>
      <ul>
        <li>
          <strong>Datos de tus consultas.</strong> Cuando nos escribís por Instagram o WhatsApp, recibimos tu nombre de usuario,
          número de teléfono (en WhatsApp) y el contenido del mensaje.
        </li>
        <li>
          <strong>Datos de la compra.</strong> Si comprás en el local, los datos necesarios para la operación y la
          facturación, según la normativa fiscal.
        </li>
        <li>
          <strong>Datos técnicos.</strong> Como cualquier sitio web, nuestro proveedor de alojamiento registra datos técnicos
          de las visitas (dirección IP, navegador, fecha y hora) para operar el servicio y protegerlo de abusos.
        </li>
      </ul>

      <h2>3. Para qué los usamos</h2>
      <p>
        Para responder tus consultas, coordinar y concretar compras, gestionar garantías y reclamos, y cumplir obligaciones
        legales y fiscales. No vendemos ni cedemos tus datos a terceros con fines comerciales, y no te enviamos publicidad sin
        tu consentimiento.
      </p>

      <h2>4. Servicios de terceros</h2>
      <ul>
        <li>
          <strong>Instagram y WhatsApp</strong> (Meta Platforms): las conversaciones ocurren en esas plataformas y se rigen
          también por sus políticas de privacidad.
        </li>
        <li>
          <strong>Google Maps</strong>: la página de inicio y “El local” muestran un mapa de Google Maps. Al cargarse, Google
          recibe datos técnicos de tu visita (como tu dirección IP) y puede usar cookies, según su propia política de privacidad.
        </li>
        <li>
          <strong>Sistema de gestión de inventario</strong>: el catálogo se obtiene de nuestro sistema de stock. Esa conexión no
          incluye datos tuyos.
        </li>
      </ul>

      <h2>5. Cuánto tiempo los conservamos</h2>
      <p>
        Mientras dure la consulta o la relación comercial, y después durante los plazos que exijan las leyes (por ejemplo,
        fiscales o de garantía).
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Podés pedirnos acceso, rectificación, actualización o supresión de tus datos {contactLine}. Respondemos dentro de los
        plazos de la Ley 25.326: diez (10) días corridos para el acceso y cinco (5) días hábiles para la rectificación o
        supresión.
      </p>
      <p className="prose__statutory">
        El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a
        intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en
        el artículo 14, inciso 3 de la Ley N° 25.326.
      </p>
      <p className="prose__statutory">
        La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la
        atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por
        incumplimiento de las normas vigentes en materia de protección de datos personales.{' '}
        <External href={links.aaip}>Sitio de la Agencia</External>.
      </p>

      <h2>7. Seguridad</h2>
      <p>
        El sitio funciona sobre conexión cifrada (HTTPS). Aplicamos medidas razonables para proteger los datos que nos
        confiás y limitamos su acceso a quienes los necesitan para atenderte.
      </p>

      <h2>8. Cambios</h2>
      <p>Si cambiamos esta política, publicamos la nueva versión en esta página con su fecha de actualización.</p>
    </LegalLayout>
  )
}

export function ConsumerPage() {
  return (
    <LegalLayout
      title="Defensa del consumidor"
      intro="Tus derechos al comprar, y dónde reclamar si algo no sale bien."
    >
      <h2>Tus derechos</h2>
      <ul>
        <li>
          <strong>Información clara.</strong> Precio, estado y características de cada equipo, antes de comprar.
        </li>
        <li>
          <strong>Garantía legal.</strong> Seis (6) meses para equipos nuevos y tres (3) meses para usados, desde la entrega
          (art. 11, Ley 24.240).
        </li>
        <li>
          <strong>Trato digno.</strong> Atención respetuosa y sin prácticas abusivas (art. 8 bis, Ley 24.240).
        </li>
        <li>
          <strong>Arrepentimiento.</strong> Si la compra se hizo a distancia o fuera del local, podés revocarla dentro de los
          diez (10) días corridos. Ver <NavLink to="/arrepentimiento">Botón de arrepentimiento</NavLink>.
        </li>
        <li>
          <strong>Comprobante.</strong> Recibís la factura o el comprobante correspondiente a tu compra.
        </li>
      </ul>

      <h2>Si tenés un problema</h2>
      <p>
        Escribinos primero: la mayoría de los inconvenientes se resuelven rápido. Podés contactarnos {contactLine}. Contanos
        qué equipo compraste, cuándo, y qué pasa.
      </p>

      <h2>Dónde reclamar</h2>
      <p>Si no quedás conforme con nuestra respuesta, podés reclamar ante:</p>
      <ul>
        <li>
          <External href={links.ventanillaFederal}>Ventanilla Única Federal de Defensa del Consumidor</External>, el
          formulario online de la Nación.
        </li>
        <li>
          <External href={links.consumidorMgp}>Defensa del Consumidor del Municipio de General Pueyrredon</External> (Mar del
          Plata), en el marco de la Ley provincial 13.133.
        </li>
        <li>
          <External href={links.consumidorNacion}>Dirección Nacional de Defensa del Consumidor</External>, con información
          general sobre tus derechos.
        </li>
      </ul>

      <h2>Normativa</h2>
      <p>
        <External href={links.ley24240}>Ley 24.240 de Defensa del Consumidor</External>, Ley 13.133 de la Provincia de Buenos
        Aires y Código Civil y Comercial de la Nación (arts. 1092 a 1122).
      </p>
    </LegalLayout>
  )
}

export function WithdrawalPage() {
  return (
    <LegalLayout
      title="Botón de arrepentimiento"
      intro="Si compraste a distancia, podés arrepentirte dentro de los 10 días. Acá te explicamos cómo."
    >
      <h2>Cuándo aplica</h2>
      <p>
        Si concretaste una compra con nosotros a distancia o fuera del local (por ejemplo, coordinada por mensaje y entregada
        en otro lugar), podés revocarla dentro de los diez (10) días corridos desde la entrega del equipo o desde la compra,
        lo que ocurra último, sin costo ni necesidad de dar explicaciones (art. 34 de la Ley 24.240 y arts. 1110 y siguientes
        del Código Civil y Comercial). Las compras hechas y retiradas en el local no están alcanzadas por este derecho, pero
        mantienen siempre la garantía legal.
      </p>

      <h2>Cómo hacerlo</h2>
      <ol>
        <li>Completá el formulario de abajo. No guardamos nada en este sitio: arma un mensaje para que nos lo envíes.</li>
        <li>Envianos el mensaje. Dentro de las 24 horas te respondemos con un código de identificación de tu solicitud.</li>
        <li>Coordinamos la devolución del equipo, en el mismo estado en que lo recibiste, y el reintegro de lo que pagaste.</li>
      </ol>

      <WithdrawalForm />

      <p>
        También podés pedirlo {contactLine}.
      </p>
    </LegalLayout>
  )
}

function WithdrawalForm() {
  const [message, setMessage] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (name: string) => String(data.get(name) ?? '').trim()
    setCopied(false)
    setMessage(
      [
        'Hola! Quiero ejercer mi derecho de arrepentimiento (art. 34, Ley 24.240).',
        `Nombre: ${field('name')}`,
        `Equipo: ${field('product')}`,
        `Fecha de compra o entrega: ${field('date').split('-').reverse().join('/')}`,
        field('detail') && `Detalle: ${field('detail')}`,
      ]
        .filter(Boolean)
        .join('\n'),
    )
  }

  const copy = async () => {
    if (!message) return
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const wa = message ? whatsappUrl(message) : null

  return (
    <div className="withdrawal">
      <form className="withdrawal__form" onSubmit={submit}>
        <label>
          Nombre y apellido
          <input name="name" required autoComplete="name" maxLength={120} />
        </label>
        <label>
          Equipo que compraste
          <input name="product" required placeholder="Ej.: iPhone 14 Pro 128 GB" maxLength={160} />
        </label>
        <label>
          Fecha de compra o de entrega
          <input name="date" type="date" required />
        </label>
        <label>
          Detalle (opcional)
          <textarea name="detail" rows={3} maxLength={600} />
        </label>
        <button type="submit" className="button">Preparar solicitud</button>
      </form>

      {message && (
        <div className="withdrawal__result" role="status">
          <p className="withdrawal__result-title">Tu solicitud está lista. Envianosla:</p>
          <pre>{message}</pre>
          <div className="withdrawal__actions">
            {wa ? (
              <a className="button" href={wa} target="_blank" rel="noopener noreferrer">Enviar por WhatsApp</a>
            ) : (
              <>
                <button type="button" className="button" onClick={copy}>
                  {copied ? <Check aria-hidden size={18} /> : <Copy aria-hidden size={18} />}
                  {copied ? 'Mensaje copiado' : 'Copiar mensaje'}
                </button>
                <a className="button button--outline" href={store.instagramDmUrl} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon aria-hidden size={18} />
                  Abrir Instagram
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
