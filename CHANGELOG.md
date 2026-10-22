# CHANGELOG — Landing CRISIL Corporate

Registro de cada cambio y arreglo. Lo más reciente arriba.

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
