export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications?: string[];
  code?: string;
  customizationAvailable: boolean;
  minimumOrder?: number;
  featured: boolean;
  active: boolean;
};

export const categories = [
  { id: "individuales", name: "Regalos individuales", description: "Una pieza especial para cada persona." },
  { id: "copas", name: "Copas", description: "Sets artesanales para eventos y celebraciones." },
  { id: "hogar", name: "Sets para el hogar", description: "Regalos completos para disfrutar y compartir." },
  { id: "bar", name: "Sets de bar", description: "Combinaciones sofisticadas para clientes y VIPs." },
  { id: "premium", name: "Regalos premium", description: "Piezas seleccionadas para ocasiones especiales." },
];

export const products: Product[] = [
  { id: "fernet", name: "Vaso Fernet", category: "individuales", description: "Una pieza artesanal creada para convertirse en un regalo corporativo memorable.", customizationAvailable: true, minimumOrder: 25, featured: true, active: true },
  { id: "mate", name: "Mate de vidrio", category: "individuales", description: "Una opción artesanal original para clientes, colaboradores y eventos.", customizationAvailable: true, minimumOrder: 25, featured: true, active: true },
  { id: "decanter", name: "Decantador", category: "individuales", description: "Decantador de cuello estrecho y cuerpo amplio, pensado para airear y servir vino con elegancia.", specifications: ["Alto: 28 cm aprox.", "Diámetro: 17 cm aprox.", "Peso: 830 g aprox.", "Capacidad: 1.400 ml"], code: "DE", customizationAvailable: true, minimumOrder: 25, featured: true, active: true },
  { id: "night", name: "Set de noche A", category: "individuales", description: "Una jarra compacta con un vaso que encaja en la parte superior, ideal para mesas de noche y escritorios.", specifications: ["Jarra: 15,5 cm · 700 ml", "Vaso: 7,5 cm · 130 ml"], code: "JNS + VJN", customizationAvailable: true, minimumOrder: 25, featured: true, active: true },
  { id: "florero-fn", name: "Florero FN", category: "individuales", description: "Una pieza escultórica de vidrio artesanal para un regalo de presencia excepcional.", specifications: ["Alto: 24 cm aprox.", "Diámetro máximo: 15 cm aprox.", "Peso: 1.300 g aprox.", "Capacidad: 2.850 ml"], customizationAvailable: true, minimumOrder: 25, featured: true, active: true },
  { id: "vkg", name: "VKG", category: "copas", description: "Copa artesanal de gran capacidad y silueta contemporánea.", specifications: ["Alto: 23,4 cm aprox.", "Diámetro: 8 cm aprox.", "Capacidad: 500 ml"], customizationAvailable: true, minimumOrder: 25, featured: false, active: true },
  { id: "ch11", name: "CH11", category: "copas", description: "Una copa estilizada para presentaciones corporativas refinadas.", specifications: ["Alto: 19,5 cm aprox.", "Diámetro: 6 cm aprox.", "Capacidad: 190 ml"], customizationAvailable: true, minimumOrder: 25, featured: false, active: true },
  { id: "bv", name: "BV", category: "copas", description: "Una pieza amplia y versátil para bebidas y celebraciones.", specifications: ["Alto: 16 cm aprox.", "Diámetro: 8,5 cm aprox.", "Capacidad: 550 ml"], customizationAvailable: true, minimumOrder: 25, featured: false, active: true },
  { id: "cf2", name: "CF2", category: "copas", description: "Proporciones ligeras y elegantes en vidrio artesanal.", specifications: ["Alto: 21 cm aprox.", "Diámetro: 6,5 cm aprox.", "Capacidad: 300 ml"], customizationAvailable: true, minimumOrder: 25, featured: false, active: true },
  { id: "ch9", name: "CH9", category: "copas", description: "Una copa equilibrada para regalos y eventos.", specifications: ["Alto: 17,2 cm aprox.", "Diámetro: 6 cm aprox.", "Capacidad: 360 ml"], customizationAvailable: true, minimumOrder: 25, featured: false, active: true },
];