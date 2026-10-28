// Datos de contacto y ofertas activas. Para cambiar el número o las fechas, editar solo este archivo.

// Número de WhatsApp de ventas (formato internacional, sin + ni espacios)
export const WHATSAPP = "59175910264";

// Promoción mayorista de ferneteras (anuncio de la portada, en AnnouncementCarousel.tsx)
export const PROMO_UNTIL = "31 de octubre";
export const PROMO_UNTIL_EN = "October 31";

// ---------- Ofertas estándar (lo que se promete en la página y en los formularios) ----------
// Para cambiar mínimos, plazos o personalizaciones, editar solo esto.
export const OFFERS = {
  regalos: {
    min: 20,
    unit: ["unidades", "units"] as [string, string],
    minLabel: ["Desde 20 unidades", "From 20 units"] as [string, string],
    quantities: ["20", "50", "100", "250", "500"],
    custom: [
      ["Logo grabado / arenado en el vidrio", "Logo engraved / sandblasted on the glass"],
      ["Caja de regalo con mi marca", "Gift box with my brand"],
      ["Logo en el vidrio + caja con mi marca", "Logo on the glass + branded box"],
      ["Sin personalizar", "No customization"],
      ["Necesito asesoramiento", "I need advice"],
    ] as [string, string][],
    use: [
      ["Regalos para clientes", "Client gifts"], ["Regalos para colaboradores", "Team gifts"], ["Fin de año", "Year-end"],
      ["Evento corporativo", "Corporate event"], ["Aniversario o lanzamiento", "Anniversary or launch"], ["Otro", "Other"],
    ] as [string, string][],
  },
  envases: {
    min: 20,
    unit: ["docenas", "dozen"] as [string, string],
    minLabel: ["Desde 20 docenas", "From 20 dozen"] as [string, string],
    quantities: ["20", "50", "100", "200", "500"],
    custom: [
      ["Con tapa o corcho", "With cap or cork"],
      ["Con tapa + mi etiqueta", "With cap + my label"],
      ["Solo el envase (yo pongo tapa y etiqueta)", "Just the container (I add cap and label)"],
      ["Necesito asesoramiento", "I need advice"],
    ] as [string, string][],
    use: [
      ["Bebidas o jugos", "Beverages or juices"], ["Licores, vinos o singanis", "Spirits or wines"], ["Salsas, mermeladas o miel", "Sauces, jams or honey"],
      ["Cosmética o velas", "Cosmetics or candles"], ["Restaurante o cafetería", "Restaurant or café"], ["Otro", "Other"],
    ] as [string, string][],
  },
};

export const LEAD_TIMES: [string, string][] = [
  ["Stock inmediato en modelos seleccionados", "Immediate stock on selected models"],
  ["Producción a pedido en 2 a 4 semanas", "Made to order in 2 to 4 weeks"],
  ["Envíos a todo Bolivia", "Shipping across Bolivia"],
];
