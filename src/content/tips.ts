/*
 * Tips con videos propios. Para sumar un video:
 * - Archivo propio: copiá el .mp4 (vertical u horizontal) en public/videos/ y poné `video: '/videos/restablecer.mp4'`.
 * - YouTube: pegá el link, por ejemplo `video: 'https://www.youtube.com/watch?v=XXXX'` o un Short.
 * Opcional: `poster` con una imagen de portada en public/videos/.
 * Sin `video`, la tarjeta muestra "Video próximamente" y los pasos escritos.
 */
export interface Tip {
  id: string
  title: string
  summary: string
  steps: string[]
  video?: string
  poster?: string
}

export const tips: Tip[] = [
  {
    id: 'restablecer',
    title: 'Cómo restablecer tu iPhone',
    summary: 'Borrá todo y dejalo como recién salido de la caja, por ejemplo antes de venderlo o regalarlo.',
    steps: [
      'Hacé una copia de seguridad en iCloud: Ajustes > [tu nombre] > iCloud > Respaldo en iCloud.',
      'Andá a Ajustes > General > Transferir o restablecer el iPhone.',
      'Tocá “Borrar contenidos y configuración” y seguí los pasos.',
      'Ingresá tu código y la contraseña de tu cuenta de Apple para desactivar “Buscar mi iPhone”.',
    ],
  },
  {
    id: 'esim',
    title: 'Cómo pedir tu eSIM',
    summary: 'La eSIM es un chip digital: no hace falta tarjeta física. Se pide a tu compañía y se activa desde el iPhone.',
    steps: [
      'Pedí la eSIM a tu compañía (Personal, Movistar o Claro) desde su app, su web o una sucursal.',
      'Te van a dar un código QR o una activación directa.',
      'En el iPhone, andá a Ajustes > Celular > Agregar eSIM y escaneá el QR o seguí las instrucciones.',
      'Esperá unos minutos a que aparezca la señal. Si tenés dudas, escribinos y te ayudamos.',
    ],
  },
  {
    id: 'mayores',
    title: 'Para los mayores',
    summary: 'Ajustes simples para que el iPhone sea más fácil de leer y de usar.',
    steps: [
      'Letra más grande: Ajustes > Pantalla y brillo > Tamaño del texto. También podés activar “Texto en negrita”.',
      'Zoom: Ajustes > Accesibilidad > Zoom, para agrandar cualquier parte de la pantalla.',
      'Acceso asistido: Ajustes > Accesibilidad > Acceso asistido. Deja solo las apps esenciales con botones grandes.',
      'Emergencias: completá la Ficha médica en la app Salud y configurá contactos de Emergencia SOS.',
    ],
  },
  {
    id: 'encargar',
    title: 'Cómo encargar un producto desde tu casa',
    summary: 'Comprás sin moverte: elegís, nos escribís y coordinamos.',
    steps: [
      'Mirá el catálogo y elegí el equipo. Si no está publicado, preguntanos igual.',
      'Escribinos por Instagram o llamanos al 223 542 3823 con el modelo que te interesa.',
      'Te confirmamos disponibilidad, precio y formas de pago.',
      'Lo retirás en el local o te lo enviamos: el envío es gratis en Mar del Plata en compras desde $100.000.',
    ],
  },
]
