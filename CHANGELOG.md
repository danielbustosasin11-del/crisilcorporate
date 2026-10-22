# CHANGELOG — Landing CRISIL Corporate

Registro de cada cambio y arreglo. Lo más reciente arriba.

## 2026-10-22 (4) (rama animaciones, pendiente de aprobar)
- **Animaciones al hacer scroll:** las secciones aparecen suavemente al llegar a ellas (respeta "reducir movimiento" del celular o computadora).
- **"¿Qué estás buscando crear?":** las dos tarjetas aparecen con efecto pop, una después de la otra. Botón "Ahora no, seguir viendo" que pliega la sección y lleva a "Así creamos tu proyecto".
- **"Así creamos tu proyecto":** misma animación, más fluida (transiciones más largas y suaves).
- **Impacto social:** los números (80, ~500, 100%, 30+) cuentan desde cero al aparecer; Medio ambiente / Innovación / Calidad se deslizan de lado en celular, con puntos.
- **"Cómo hacemos el vidrio"** ahora es una sección propia: la foto queda fija y se funde con la siguiente al bajar, con el paso actual indicado.
- **CRISIL × COFAR:** sección más simple, con título, descripción breve y fotos de los médicos que cambian solas o con flechas.
- **Nuevo orden:** Portada → ¿Qué buscas crear? → Así creamos tu proyecto → Impacto social → Rastrea tu pedido → Catálogo → Videos → Cómo hacemos el vidrio → CRISIL × COFAR → Instagram.

## 2026-10-22 (3) (publicado en main el 22/10)
- **Tarjeta "Regalos corporativos":** vuelve la foto de la entrega a Laboratorios COFAR (cajas Novadol Forte) y el texto menciona el caso.
- **Tarjeta "Vidrio para tu marca":** enfocada a empresas y restaurantes que buscan proveedor de botellas y frascos; foto real de mermeladas Del Valle en góndola (de un video de @crisil.srl).
- **4 botellas nuevas** del catálogo de frascos: FR21 (450 ml), FR13 (400 ml), BT3 (400 ml) y BTM (600 ml), con foto vacía y con producto. Para seguir en 50 productos se juntaron fichas: Línea Floral (vaso + florero XL), Copa Martini (incluye set de 4), Bowls y Compoteras, Colección de Floreros (incluye FN).
- **Nueva sección "Caso real · Laboratorios COFAR"** con las 4 fotos de médicos recibiendo su regalo del Día del Médico.
- **Nueva sección de videos** (6 clips cortos, sin sonido, se reproducen solos al verlos): soplado, templado, de la fábrica a tu mesa, empacando pedidos, envases en góndola y presentación. Se descartaron los videos marcados "AI-generated" por TikTok y el de Carnytek.
- **La historia de impacto social** ahora abre con un video de la fábrica.
- **Adelanto de Instagram @crisilbol** con 5 fotos que llevan al perfil, y enlace en el pie de página.

## 2026-10-22 (2) (publicado en main el 22/10)
- **Halloween primero en la portada:** imagen nueva con fondo negro, el vaso con calabaza, telarañas, arañas y murciélagos (versión vertical aparte para celular). Texto: "Aceptamos pedidos corporativos con diseños personalizados de Halloween hasta el 26 de octubre, para entrega el 31." El botón abre WhatsApp directo.
- **Se quitó el anuncio y la sección del Vaso Fernetero** (el fernetero sigue en el catálogo, en "Bar y regalos"), y la sección aparte de Halloween (queda solo el anuncio de portada).
- **Un solo catálogo:** los envases ahora son una pestaña más ("Envases para tu marca") del mismo catálogo; se eliminó la sección de envases separada.
- **Fotos nuevas** en "Regalos corporativos" (brindis) y "Vidrio para tu marca" (frascos de la portada de COLLECTION 3). Ninguna foto se repite en la página.
- Ya no aparece "vidrio descartado": ahora dice "vidrio reciclado" / "100% reciclado".
- Número de WhatsApp y fechas de Halloween centralizados en `src/lib/offers.ts`.

## 2026-10-22 (publicado en main el 22/10)
- **Portada nueva:** anuncios a pantalla completa con fotos grandes que rotan solos (Impacto social 500 familias, Vidrio 100% reciclado, Soplado a mano, Halloween 2026, Vaso Fernetero). Se editan en `AnnouncementCarousel.tsx`.
- **Catálogo nuevo de 44 productos** (fuente: catálogo CRISIL COLLECTION 3 y fotos de estudio de la carpeta "fotos catalogo"), en 5 categorías: Vasos, Copas, Jarras y sets, Bar y regalos, Hogar y floreros. Cada producto con galería de fotos y medidas. Se juntaron modelos parecidos en una sola ficha (ej. Copas de Champaña CH6/CF/CF2, Sets de Noche A/B/Dúo, Frasco de cocina T4G/T4M/T4P).
- **Nuevos productos:** Mate Vibes, Hielera H1, sets de whisky, cerveceros, martini y copa grande, bowls Aurora, compotera, floreros.
- **Envases:** quedan 6 visibles (FR, FR8, FR9, FR16, M3, FR7); FR1, FR2, FRP y M4 quedan ocultos (`active: false`) para no pasar de 50 productos en total.
- **Español e inglés:** al entrar por primera vez la página pregunta el idioma; se puede cambiar con ES/EN arriba. Los mensajes de WhatsApp siempre llegan en español.
- **Nueva sección "Diario de impacto social"** con fotos reales de la fábrica, cifras (80 empleos, ~500 familias, 100% reciclado) y los 5 pasos de cómo se hace el vidrio.
- **Nuevo orden de la página:** Portada → ¿Qué buscas crear? → Catálogo → Halloween → Vaso Fernetero → Envases → Cómo funciona → Historia → Rastreo.

## 2026-10-21 (publicado en main el 22/10)
- **Sección "Vaso Fernetero CRISIL" (llega a Santa Cruz el 22/10):** galería de 3 fotos, ficha (15 cm, 600 ml, 500 g, incluye caja) y 3 tramos SIN precios visibles (1 a 12 unidades, mayorista desde 24, personalizado con logo desde 25) con botón a WhatsApp. Stock: 60 unidades, pedido ERP CRS-2026-VCD6HN.
- **Sección Halloween 2026:** vaso con calabaza y "Tu logo, tu calabaza, tu vaso", botón a WhatsApp. Oferta especial opcional en `src/lib/offers.ts` (HALLOWEEN_OFFER).
- **Carrusel de anuncios rotativos** en la página principal (Halloween, Vaso Fernetero, Rastreo de pedidos). Pensado para sumar luego el Diario de conciencia social y Nuestro proceso: agregar un objeto a `slides` en `AnnouncementCarousel.tsx`.
- Fechas, cupos y oferta centralizados en `src/lib/offers.ts`.

## 2026-10-21
- **Proceso "Así creamos tu proyecto":** pasos reformulados con textos más claros, centrados respecto a la imagen; se quitaron los números (01, 02…) y los íconos.
- **Envases (Vidrio para tu marca):** la segunda foto (envase lleno) ya no se corta; el carrusel ahora usa formato vertical.
- **Envases:** las tarjetas ya no muestran descripción, medidas ni aplicación sugerida; todo eso queda solo en el botón "Detalle".

## 2026-10-09
- Envases nuevos FR, FR1, FR2, FR8, FR9, FR16, FRP, M3, M4 y FR7 con carrusel de dos fotos (vacío / en uso).
- Foto del paso 4 ("Recibe") en alta calidad.

## 2026-10-03
- Logo del tracking corregido para usar el de la corporativa.

## 2026-10-02
- Sección "Rastrea tu pedido" conectada al ERP (`/track/CRS-AAAA-XXXX`).

## Pendientes conocidos
- Las fotos de los envases están en baja resolución (200–270 px de ancho); conviene reemplazarlas por versiones más grandes.
- Recibir número final de WhatsApp de ventas para el configurador.
