# CHANGELOG — Landing CRISIL Corporate

Registro de cada cambio y arreglo. Lo más reciente arriba.

## 2026-10-22 (2) (rama oferta-ferneteras, pendiente de aprobar)
- **Halloween primero en la portada:** imagen nueva con fondo negro, el vaso con calabaza, telarañas, arañas y murciélagos (versión vertical aparte para celular). Texto: "Aceptamos pedidos corporativos con diseños personalizados de Halloween hasta el 26 de octubre, para entrega el 31." El botón abre WhatsApp directo.
- **Se quitó el anuncio y la sección del Vaso Fernetero** (el fernetero sigue en el catálogo, en "Bar y regalos"), y la sección aparte de Halloween (queda solo el anuncio de portada).
- **Un solo catálogo:** los envases ahora son una pestaña más ("Envases para tu marca") del mismo catálogo; se eliminó la sección de envases separada.
- **Fotos nuevas** en "Regalos corporativos" (brindis) y "Vidrio para tu marca" (frascos de la portada de COLLECTION 3). Ninguna foto se repite en la página.
- Ya no aparece "vidrio descartado": ahora dice "vidrio reciclado" / "100% reciclado".
- Número de WhatsApp y fechas de Halloween centralizados en `src/lib/offers.ts`.

## 2026-10-22 (rama oferta-ferneteras, pendiente de aprobar)
- **Portada nueva:** anuncios a pantalla completa con fotos grandes que rotan solos (Impacto social 500 familias, Vidrio 100% reciclado, Soplado a mano, Halloween 2026, Vaso Fernetero). Se editan en `AnnouncementCarousel.tsx`.
- **Catálogo nuevo de 44 productos** (fuente: catálogo CRISIL COLLECTION 3 y fotos de estudio de la carpeta "fotos catalogo"), en 5 categorías: Vasos, Copas, Jarras y sets, Bar y regalos, Hogar y floreros. Cada producto con galería de fotos y medidas. Se juntaron modelos parecidos en una sola ficha (ej. Copas de Champaña CH6/CF/CF2, Sets de Noche A/B/Dúo, Frasco de cocina T4G/T4M/T4P).
- **Nuevos productos:** Mate Vibes, Hielera H1, sets de whisky, cerveceros, martini y copa grande, bowls Aurora, compotera, floreros.
- **Envases:** quedan 6 visibles (FR, FR8, FR9, FR16, M3, FR7); FR1, FR2, FRP y M4 quedan ocultos (`active: false`) para no pasar de 50 productos en total.
- **Español e inglés:** al entrar por primera vez la página pregunta el idioma; se puede cambiar con ES/EN arriba. Los mensajes de WhatsApp siempre llegan en español.
- **Nueva sección "Diario de impacto social"** con fotos reales de la fábrica, cifras (80 empleos, ~500 familias, 100% reciclado) y los 5 pasos de cómo se hace el vidrio.
- **Nuevo orden de la página:** Portada → ¿Qué buscas crear? → Catálogo → Halloween → Vaso Fernetero → Envases → Cómo funciona → Historia → Rastreo.

## 2026-10-21 (rama oferta-ferneteras, pendiente de aprobar)
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
