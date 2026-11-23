# Pendientes del chat con Faka (25/09 – 13/11/2026)

Revisión del chat de WhatsApp. Lo de la web se hizo en esta tanda; lo de Stackr y lo que depende de una decisión o dato de Faka queda anotado acá.

## Hecho en la web (esta tanda)

- **Botones directos de WhatsApp e Instagram** flotando abajo a la derecha, en todas las páginas (pedido del 29/10). El WhatsApp es el de la vidriera (223 542-3823), en `src/config/store.ts`. Las consultas por producto siguen yendo a Instagram, como pidió el 13/11 para no llenar el WhatsApp.
- **Carrito** (29/10): se pueden sumar varios equipos y mandar una sola consulta (por Instagram, o por WhatsApp si se configura `VITE_WHATSAPP_NUMBER`). No cobra: es una consulta. Si un equipo se vende mientras está en el carrito, aparece marcado y queda fuera del mensaje.
- **Franja de confianza** debajo del hero: funda, vidrio y cable incluidos; garantía por escrito; lo ves antes de pagar; local propio.
- **Categorías bien marcadas** (29/10): chips arriba de "Disponibles ahora" con cada categoría que tenga stock (iPhone, accesorios, etc.).
- **Sección Tips** (21/10 y 29/10): `/tips` con los tres temas que pidió: primeros pasos, batería y cómo revisar un iPhone al comprarlo (incluye el historial de piezas). Contenido en `src/content/tips.ts`.
- **Garantía, cambios y devoluciones** (29/10): página `/garantia`.
- **Preguntas frecuentes**: sumada "¿Qué viene con el equipo?" y actualizada la del carrito.
- **Logo miniatura en Google** (29/10): favicon "BF" en SVG y PNG de 48 px, ícono para iPhone y Android, imagen para compartir en WhatsApp/redes (`og-image.jpg`, con la foto del local).
- **Posicionamiento en Google** (29/10): título y descripción, datos del local para Google (tipo Store, dirección, teléfono, Instagram), `sitemap.xml`, `robots.txt` y URL canónica por página.

## Stackr / sistema (no se tocó)

1. **Costo en ingresos** (07/10): el vendedor no podía cargar el costo al dar de alta un ingreso, y desde el panel del dueño tampoco se podía editar. Confirmar si quedó resuelto con "el precio y el costo se cargan una sola vez" (novedades del 11/10).
2. **Accesorios sueltos** (07/10 y 09/10): no aparecían al vender. Se dio por corregido el 09/10 y salió en las novedades del 11/10. Confirmar con Faka.
3. **Pagos parciales** (13/10): venta de $1440 con un pago de $870 seguía mostrando deuda de $1440, y otra venta pagada completa seguía apareciendo como deudor.
4. **AirPods** (24/10): al cargarlos no se puede quitar el campo de almacenamiento.
5. **Descripción de productos** (24/10): poder cargar una descripción en nuevos y usados y que salga en la web. La web ya muestra `description` si la API la manda; falta que Stackr la permita cargar y la exponga.
6. **Métricas de origen del cliente** (03/11): de dónde vino cada cliente (referido, conocido, publicidad en IG, otras publicidades) para medir si rinde la publicidad.
7. **Catálogo de Stackr → Instagram** (13/11): que las consultas desde el catálogo de Stackr vayan a Instagram en vez de a WhatsApp, como en la web.
8. **Datos que la web necesita de la API** para cumplir el resto de la lista del 29/10:
   - salud de batería de cada usado, para filtrar por batería;
   - marca o precio de oferta, para la sección "Ofertas del mes";
   - accesorios y combos de accesorios como productos con categoría propia;
   - cotización del día y recargos de cuotas, para mostrar precios en pesos y en cuotas.
9. **Seguridad**: la API key de Stackr (`stk_live_…`) se mandó en texto plano por WhatsApp el 20/10. Conviene generar una nueva en Stackr, cargarla en Vercel como `STACKR_API_KEY`, hacer redeploy y revocar la vieja.

## Necesita un dato o una decisión de Faka

- **Garantía de 60 días**: la lista de stock que manda dice "60 días de garantía", pero la Ley 24.240 (art. 11) exige como mínimo 3 meses para usados y 6 para nuevos. La web dice lo que fija la ley. Conviene corregir el texto de las listas.
- **Qué no cubre la garantía y cambios por gusto**: la página `/garantia` dice que no cubre golpes, humedad ni equipos abiertos por terceros, y que los cambios sin falla se ven caso por caso. Confirmar que es así.
- **Pago con tarjeta y seña online** (29/10): hace falta una cuenta de Mercado Pago del local con sus credenciales, y definir cuánto es la seña y si es reembolsable.
- **Medios de pago y cuotas**: cuáles se aceptan y con qué recargo por cantidad de cuotas.
- **Precios en pesos**: con qué dólar se calculan (blue, cripto o uno propio).
- **Ofertas del mes**: cómo se van a marcar (en Stackr, ver punto 8).
- **Nosotros**: la historia del local y, si hay, un video.
- **Opiniones de clientes**: tienen que ser reales. Lo más práctico es crear el perfil de Google Business del local, pedir reseñas a los clientes y mostrar esas.
- **Frase del hero** (20/10): Faka quería pensar algo "con impacto" para poner debajo de "Tecnología a tu alcance".
- **Fotos del interior** del local cuando esté terminado.
- **Logo oficial en vector**: el wordmark de la web es tipográfico y el favicon "BF" es provisorio.
- **Horarios** del local.
- **Datos legales** para el pie y las páginas legales: razón social, CUIT, email y QR de Data Fiscal (`store.legal` en `src/config/store.ts`).
- **WhatsApp**: confirmar que 223 542-3823 es el número oficial.
- **Cartel "Apple Premium Reseller"** de la vidriera: no se usa en la web. Usarlo requiere autorización de Apple.
- **Referencia omnitech.ar** (05/11): revisar con Faka qué le gustó.
- **Audios**: el chat tiene unos 20 audios que no se transcribieron. Puede haber pedidos ahí, sobre todo en los del 12/11 y el 13/11.
- **Google Search Console**: dar de alta byfaka.store y enviar el sitemap.
