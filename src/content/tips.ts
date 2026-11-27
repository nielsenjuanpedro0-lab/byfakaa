/*
 * "Elevá tu experiencia de compra" (formerly "Sacale el jugo a tu iPhone"): the tips the owner asked for (chat, 21/10/2026): primeros pasos,
 * batería, and how to check an iPhone when buying it, including the parts history.
 * Menu paths are iOS 17/18 in Spanish. Keep them current when iOS changes.
 */

export interface TipSection {
  heading: string
  /** Paragraphs, or a list when `list` is true. */
  items: string[]
  list?: boolean
}

export interface Tip {
  slug: string
  tag: string
  title: string
  summary: string
  sections: TipSection[]
  /**
   * Video propio. Archivo: copiá el .mp4 en public/videos/ y poné '/videos/nombre.mp4'.
   * YouTube: pegá el link (watch, youtu.be o Shorts). Sin video, el tip muestra "Video próximamente".
   */
  video?: string
  /** Imagen de portada del video (opcional), por ejemplo '/videos/nombre.jpg'. */
  poster?: string
  /** True for tips that are meant to have a video, so the page shows a placeholder until it's uploaded. */
  hasVideo?: boolean
}

export const tips: Tip[] = [
  {
    slug: 'restablecer-iphone',
    tag: 'Video',
    title: 'Cómo restablecer tu iPhone',
    summary: 'Borrá todo y dejalo como recién salido de la caja, por ejemplo antes de venderlo o regalarlo.',
    hasVideo: true,
    video: '',
    sections: [
      {
        heading: 'Antes de empezar',
        items: [
          'Hacé una copia de seguridad en iCloud: Ajustes > [tu nombre] > iCloud > Copia en iCloud.',
          'Tené a mano la contraseña de tu cuenta de Apple: la vas a necesitar para desactivar Buscar mi iPhone.',
        ],
        list: true,
      },
      {
        heading: 'Paso a paso',
        items: [
          'Andá a Ajustes > General > Transferir o restablecer el iPhone.',
          'Tocá "Borrar contenidos y configuración" y seguí los pasos.',
          'Ingresá tu código y la contraseña de tu cuenta de Apple.',
          'Cuando termine, el iPhone se reinicia en la pantalla de bienvenida, listo para configurar.',
        ],
        list: true,
      },
    ],
  },
  {
    slug: 'esim',
    tag: 'Video',
    title: 'Cómo pedir tu eSIM',
    summary: 'La eSIM es un chip digital: no hace falta tarjeta física. Se pide a tu compañía y se activa desde el iPhone.',
    hasVideo: true,
    video: '',
    sections: [
      {
        heading: 'Paso a paso',
        items: [
          'Pedí la eSIM a tu compañía (Personal, Movistar o Claro) desde su app, su web o una sucursal.',
          'Te van a dar un código QR o una activación directa.',
          'En el iPhone, andá a Ajustes > Celular > Agregar eSIM y escaneá el QR o seguí las instrucciones.',
          'Esperá unos minutos a que aparezca la señal.',
        ],
        list: true,
      },
      {
        heading: '¿Dudas?',
        items: ['Escribinos y te ayudamos a activarla, o pasá por el local.'],
      },
    ],
  },
  {
    slug: 'para-los-mayores',
    tag: 'Video',
    title: 'Para los mayores',
    summary: 'Ajustes simples para que el iPhone sea más fácil de leer y de usar.',
    hasVideo: true,
    video: '',
    sections: [
      {
        heading: 'Más fácil de leer',
        items: [
          'Letra más grande: Ajustes > Pantalla y brillo > Tamaño del texto. También podés activar "Texto en negrita".',
          'Zoom: Ajustes > Accesibilidad > Zoom, para agrandar cualquier parte de la pantalla.',
        ],
        list: true,
      },
      {
        heading: 'Más fácil de usar',
        items: [
          'Acceso asistido: Ajustes > Accesibilidad > Acceso asistido. Deja solo las apps esenciales, con botones grandes.',
          'Emergencias: completá la Ficha médica en la app Salud y configurá contactos de Emergencia SOS.',
        ],
        list: true,
      },
    ],
  },
  {
    slug: 'encargar-desde-casa',
    tag: 'Video',
    title: 'Cómo encargar un producto desde tu casa',
    summary: 'Comprás sin moverte: elegís, nos escribís y coordinamos.',
    hasVideo: true,
    video: '',
    sections: [
      {
        heading: 'Paso a paso',
        items: [
          'Mirá el catálogo y agregá al carrito los equipos que te interesan. Si no está publicado, preguntanos igual.',
          'Mandanos el carrito por mensaje, o escribinos por Instagram o WhatsApp.',
          'Te confirmamos disponibilidad, precio y formas de pago.',
          'Lo retirás en el local o te lo enviamos: el envío es gratis en Mar del Plata en compras desde $100.000.',
        ],
        list: true,
      },
    ],
  },
  {
    slug: 'primeros-pasos',
    tag: 'Primeros pasos',
    title: 'Tu iPhone nuevo, listo en 15 minutos',
    summary: 'Pasar tus datos, protegerlo y dejarlo configurado desde el primer día.',
    sections: [
      {
        heading: 'Pasá todo desde tu celular anterior',
        items: [
          'Si venís de otro iPhone, usá Inicio rápido: prendé el nuevo cerca del viejo y seguí los pasos en pantalla. Se copian apps, fotos, chats y ajustes.',
          'Si venís de Android, durante la configuración elegí "Desde Android" y usá la app Move to iOS en tu teléfono anterior.',
          'Para WhatsApp, hacé una copia de seguridad del chat en el teléfono viejo antes de empezar.',
        ],
      },
      {
        heading: 'Protegelo antes de usarlo',
        items: [
          'Activá Buscar mi iPhone: Ajustes > [tu nombre] > Buscar. Si se pierde, lo ubicás y lo bloqueás.',
          'Configurá Face ID o Touch ID y un código de 6 dígitos.',
          'Activá la copia en iCloud: Ajustes > [tu nombre] > iCloud > Copia en iCloud.',
          'Poné la funda y el vidrio templado que vienen con tu compra antes de salir del local.',
        ],
        list: true,
      },
      {
        heading: 'Actualizalo',
        items: [
          'Andá a Ajustes > General > Actualización de software e instalá la última versión de iOS. Trae mejoras de seguridad y de batería.',
        ],
      },
    ],
  },
  {
    slug: 'bateria',
    tag: 'Batería',
    title: 'Cómo cuidar la batería de tu iPhone',
    summary: 'Qué significa el porcentaje de salud, qué la desgasta y qué es mito.',
    sections: [
      {
        heading: 'Dónde ver la salud de la batería',
        items: [
          'En Ajustes > Batería > Estado de la batería y carga ves la capacidad máxima: cuánto rinde hoy comparado con una batería nueva.',
          'Apple diseña las baterías para conservar el 80% de su capacidad después de 500 ciclos completos (iPhone 14 y anteriores) o 1000 ciclos (iPhone 15 y posteriores). Debajo del 80% conviene pensar en cambiarla.',
        ],
      },
      {
        heading: 'Lo que sí la cuida',
        items: [
          'Dejá activada la Carga optimizada: el iPhone aprende tu rutina y espera para pasar del 80% hasta justo antes de que lo desconectes.',
          'En iPhone 15 y posteriores podés limitar la carga al 80% desde el mismo menú.',
          'Evitá el calor: no lo dejes al sol, en el auto ni cargando debajo de la almohada.',
          'Usá cargadores y cables certificados.',
          'Si te vas a quedar sin carga, activá el Modo de bajo consumo desde el Centro de control.',
        ],
        list: true,
      },
      {
        heading: 'Mitos',
        items: [
          '"Hay que descargarla del todo antes de cargarla": falso. Las baterías de litio no tienen memoria; cargar de a ratos está bien.',
          '"Cargarlo de noche la arruina": con la Carga optimizada activa, el iPhone controla la carga solo.',
          '"Cerrar las apps ahorra batería": en general no. iOS congela las apps que no usás, y volver a abrirlas desde cero gasta más.',
        ],
        list: true,
      },
    ],
  },
  {
    slug: 'revisar-un-iphone',
    tag: 'Antes de comprar',
    title: 'Cómo revisar un iPhone antes de comprarlo',
    summary: 'La lista que usamos nosotros: piezas, batería, IMEI y funciones, en 10 minutos.',
    sections: [
      {
        heading: 'Piezas originales',
        items: [
          'Andá a Ajustes > General > Información y buscá "Historial de piezas y servicio" (con iOS actualizado). Muestra si la pantalla, la batería o la cámara se cambiaron y si son piezas genuinas de Apple. Si la sección no aparece, el equipo nunca tuvo piezas cambiadas.',
          'En Ajustes > Pantalla y brillo tiene que estar la opción True Tone: suele faltar cuando la pantalla no es original.',
        ],
      },
      {
        heading: 'Identidad del equipo',
        items: [
          'Marcá *#06# y compará el IMEI con el de la caja y el de Ajustes > General > Información.',
          'Revisá que el IMEI no esté denunciado en la consulta de ENACOM (enacom.gob.ar/imei).',
          'Buscar mi iPhone tiene que estar desactivado por el dueño anterior, o el equipo queda bloqueado a su cuenta.',
        ],
        list: true,
      },
      {
        heading: 'Que todo funcione',
        items: [
          'Face ID o Touch ID, las cámaras traseras y la frontal, con flash.',
          'Parlantes y micrófono: grabá una nota de voz y escuchala.',
          'Botones, vibración, carga por cable y, si tiene, MagSafe.',
          'Señal con tu chip o eSIM, Wi-Fi y Bluetooth.',
          'La salud de la batería, en Ajustes > Batería.',
        ],
        list: true,
      },
      {
        heading: 'En By Faka',
        items: [
          'Cada equipo usado lo revisamos así antes de publicarlo, y en el local lo podés revisar vos mismo antes de pagar.',
        ],
      },
    ],
  },
]

export const tipBySlug = (slug: string | undefined) => tips.find((t) => t.slug === slug)
