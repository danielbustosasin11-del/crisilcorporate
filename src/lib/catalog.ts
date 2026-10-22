export type Product = {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  description: string;
  descriptionEn?: string;
  specifications?: string[];
  specificationsEn?: string[];
  gallery?: string[];
  fit?: "cover" | "contain";
  code?: string;
  image?: string;
  filledImage?: string;
  footerNote?: string;
  footerNoteEn?: string;
  customizationAvailable: boolean;
  minimumOrder?: number;
  featured: boolean;
  active: boolean;
};

export const packagingImage = "/images/envases-marca.png";

export const packagingProducts: Product[] = [
  {
    id: "envase-fr",
    name: "Frasco FR 300 ml",
    nameEn: "FR Jar 300 ml",
    category: "envases",
    code: "FR",
    description: "Frasco cilíndrico clásico de boca ancha en vidrio artesanal con tapa metálica hermética de 63 mm.",
    descriptionEn: "Classic wide-mouth cylindrical jar in handcrafted glass with a 63 mm airtight metal lid.",
    specifications: [
      "Altura: 11.2 cm aprox.",
      "Diámetro mayor: 7.5 cm aprox.",
      "Peso: 195 gr aprox.",
      "Capacidad: 300 ml",
      "Tapa metálica de 63 mm",
    ],
    image: "/images/envases/fr-vacio.webp",
    filledImage: "/images/envases/fr-lleno.webp",
    footerNote: "Ideal para confitería, dulces, caramelos, frutos secos, mermeladas y productos gourmet.",
    footerNoteEn: "Ideal for confectionery, sweets, nuts, jams and gourmet products.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: true,
  },
  {
    id: "envase-fr1",
    name: "Frasco FR1 220 ml",
    category: "envases",
    code: "FR1",
    description: "Frasco versátil de perfil recto y cuerpo compacto con cierre metálico de rosca continua de 63 mm.",
    specifications: [
      "Altura: 9.5 cm aprox.",
      "Diámetro mayor: 6.5 cm aprox.",
      "Peso: 161 gr aprox.",
      "Capacidad: 220 ml",
      "Tapa metálica de 63 mm",
    ],
    image: "/images/envases/fr1-vacio.webp",
    filledImage: "/images/envases/fr1-lleno.webp",
    footerNote: "Recomendado para mostazas artesanales, mayonesas, salsas emulsionadas, patés y cosmética natural.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: false, // oculto para mantener el máximo de 50 productos
  },
  {
    id: "envase-fr2",
    name: "Frasco FR2 300 ml",
    category: "envases",
    code: "FR2",
    description: "Diseño elegante con curvas anatómicas y hombro marcado que resalta la textura y color de conservas finas.",
    specifications: [
      "Altura: 13 cm aprox.",
      "Diámetro mayor: 6.5 cm aprox.",
      "Peso: 241 gr aprox.",
      "Capacidad: 300 ml",
      "Tapa metálica de 63 mm",
    ],
    image: "/images/envases/fr2-vacio.webp",
    filledImage: "/images/envases/fr2-lleno.webp",
    footerNote: "Excelente para mermeladas frutales, conservas dulces, mieles aromatizadas y jaleas artesanales.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: false, // oculto para mantener el máximo de 50 productos
  },
  {
    id: "envase-fr8",
    name: "Frasco Hexagonal FR8 150 ml",
    nameEn: "FR8 Hexagonal Jar 150 ml",
    category: "envases",
    code: "FR8",
    description: "Frasco de facetas hexagonales geométricas de gran presencia óptica para destacar productos premium.",
    descriptionEn: "Hexagonal faceted jar with strong visual presence for premium products.",
    specifications: [
      "Altura: 7.7 cm aprox.",
      "Diámetro mayor: 7 cm aprox.",
      "Peso: 157 gr aprox.",
      "Capacidad: 150 ml",
      "Tapa metálica de 63 mm",
    ],
    image: "/images/envases/fr8-vacio.webp",
    filledImage: "/images/envases/fr8-lleno.webp",
    footerNote: "Ideal para miel pura de abeja, polen, cremas untables premium, velas aromáticas y azafrán.",
    footerNoteEn: "Ideal for pure honey, pollen, premium spreads, scented candles and saffron.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: true,
  },
  {
    id: "envase-fr9",
    name: "Frasco Ánfora FR9 350 ml",
    nameEn: "FR9 Amphora Jar 350 ml",
    category: "envases",
    code: "FR9",
    description: "Silueta curva tipo ánfora tradicional con nervaduras verticales artesanales y máxima capacidad útil.",
    descriptionEn: "Traditional amphora silhouette with handcrafted vertical ribs.",
    specifications: [
      "Altura: 10.5 cm aprox.",
      "Diámetro mayor: 9.6 cm aprox.",
      "Peso: 200 gr aprox.",
      "Capacidad: 350 ml",
      "Tapa metálica de 63 mm",
    ],
    image: "/images/envases/fr9-vacio.webp",
    filledImage: "/images/envases/fr9-lleno.webp",
    footerNote: "Perfecto para mezclas de especias, condimentos secos, sales saborizadas, hierbas gourmet y té en hebras.",
    footerNoteEn: "Perfect for spice blends, dry seasonings, flavored salts, gourmet herbs and loose-leaf tea.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: true,
  },
  {
    id: "envase-fr16",
    name: "Frasco FR16 700 ml",
    nameEn: "FR16 Jar 700 ml",
    category: "envases",
    code: "FR16",
    description: "Frasco de gran formato y boca ancha en vidrio artesanal con tapa metálica de 70 mm, ideal para granel y repostería.",
    descriptionEn: "Large wide-mouth handcrafted jar with a 70 mm metal lid, for bulk goods and baking.",
    specifications: [
      "Altura: 14.5 cm aprox.",
      "Diámetro mayor: 9.3 cm aprox.",
      "Peso: 490 gr aprox.",
      "Capacidad: 700 ml",
      "Tapa metálica de 70 mm",
    ],
    image: "/images/envases/fr16-vacio.webp",
    filledImage: "/images/envases/fr16-lleno.webp",
    footerNote: "Excelente para galletitas, cookies, granolas, frutos secos, pastas secas y productos a granel.",
    footerNoteEn: "Great for cookies, granola, nuts, dry pasta and bulk products.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: true,
  },
  {
    id: "envase-frp",
    name: "Frasco FRP 200 ml",
    category: "envases",
    code: "FRP",
    description: "Frasco petaca compacto de hombro redondeado y excelente estabilidad con tapa metálica de 63 mm.",
    specifications: [
      "Altura: 7.7 cm aprox.",
      "Diámetro mayor: 7.5 cm aprox.",
      "Peso: 163 gr aprox.",
      "Capacidad: 200 ml",
      "Tapa metálica de 63 mm",
    ],
    image: "/images/envases/frp-vacio.webp",
    filledImage: "/images/envases/frp-lleno.webp",
    footerNote: "Ideal para hierbas secas, orégano, condimentos de cocina, semillas finas y té verde.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: false, // oculto para mantener el máximo de 50 productos
  },
  {
    id: "envase-m3",
    name: "Frasco Vaso M3 250 ml",
    nameEn: "M3 Glass Jar 250 ml",
    category: "envases",
    code: "M3",
    description: "Diseño cónico y estilizado en vidrio grueso con tapa plástica de 70 mm, reutilizable como vaso de mesa.",
    descriptionEn: "Slim conical jar in thick glass with a 70 mm plastic lid, reusable as a drinking glass.",
    specifications: [
      "Altura: 12.5 cm aprox.",
      "Diámetro mayor: 6.8 cm aprox.",
      "Peso: 161 gr aprox.",
      "Capacidad: 250 ml",
      "Tapa plástica de 70 mm",
    ],
    image: "/images/envases/m3-vacio.webp",
    filledImage: "/images/envases/m3-lleno.webp",
    footerNote: "Recomendado para mermeladas artesanales de frutilla, jaleas, postres en capas y yogures caseros.",
    footerNoteEn: "Recommended for artisan jams, jellies, layered desserts and homemade yogurt.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: true,
  },
  {
    id: "envase-m4",
    name: "Frasco Vaso M4 150 ml",
    category: "envases",
    code: "M4",
    description: "Vaso compacto de boca ancha con tapa plástica hermética de 70 mm, gran versatilidad para porciones individuales.",
    specifications: [
      "Altura: 8.2 cm aprox.",
      "Diámetro mayor: 6.8 cm aprox.",
      "Peso: 149 gr aprox.",
      "Capacidad: 150 ml",
      "Tapa plástica de 70 mm",
    ],
    image: "/images/envases/m4-vacio.webp",
    filledImage: "/images/envases/m4-lleno.webp",
    footerNote: "Perfecto para miel líquida, jarabes, mostazas gourmet, salsas para degustación y conservas de autor.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: false, // oculto para mantener el máximo de 50 productos
  },
  {
    id: "envase-fr7",
    name: "Botella FR7 300 ml",
    nameEn: "FR7 Bottle 300 ml",
    category: "envases",
    code: "FR7",
    description: "Botella artesanal estilizada para líquidos y bebidas saludables, con tapa metálica hermética de 38 mm.",
    descriptionEn: "Slender handcrafted bottle for juices and healthy drinks, with a 38 mm airtight metal lid.",
    specifications: [
      "Altura: 17.4 cm aprox.",
      "Diámetro mayor: 5.5 cm aprox.",
      "Peso: 300 gr aprox.",
      "Capacidad: 300 ml",
      "Tapa metálica de 38 mm",
    ],
    image: "/images/envases/fr7-vacio.webp",
    filledImage: "/images/envases/fr7-lleno.webp",
    footerNote: "Ideal para jugos naturales prensados en frío, néctares, leches vegetales, kombucha y aderezos líquidos.",
    footerNoteEn: "Ideal for cold-pressed juices, nectars, plant milks, kombucha and dressings.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: true,
  },
  {
    id: "envase-fr21",
    name: "Botella FR21 450 ml",
    nameEn: "FR21 Bottle 450 ml",
    category: "envases",
    code: "FR21",
    description: "Botella de boca ancha y cuerpo amplio, con tapa metálica de 38 mm.",
    descriptionEn: "Wide-mouth bottle with a generous body and a 38 mm metal lid.",
    specifications: ["Altura: 17.2 cm aprox.", "Diámetro mayor: 8 cm aprox.", "Peso: 345 gr aprox.", "Capacidad: 450 ml", "Tapa metálica de 38 mm"],
    image: "/images/envases/fr21-vacio.webp",
    filledImage: "/images/envases/fr21-lleno.webp",
    footerNote: "Ideal para jugos, limonadas, leches vegetales y bebidas de restaurante.",
    footerNoteEn: "Ideal for juices, lemonades, plant milks and restaurant drinks.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: true,
  },
  {
    id: "envase-fr13",
    name: "Botella FR13 400 ml",
    nameEn: "FR13 Bottle 400 ml",
    category: "envases",
    code: "FR13",
    description: "Botella tipo lechera de cuello corto, con tapa metálica de 38 mm.",
    descriptionEn: "Milk-style bottle with a short neck and a 38 mm metal lid.",
    specifications: ["Altura: 17.4 cm aprox.", "Diámetro mayor: 6.7 cm aprox.", "Peso: 320 gr aprox.", "Capacidad: 400 ml", "Tapa metálica de 38 mm"],
    image: "/images/envases/fr13-vacio.webp",
    filledImage: "/images/envases/fr13-lleno.webp",
    footerNote: "Perfecta para leche, yogur bebible, cold brew y jugos prensados.",
    footerNoteEn: "Perfect for milk, drinkable yogurt, cold brew and pressed juices.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: true,
  },
  {
    id: "envase-bt3",
    name: "Botella BT3 400 ml",
    nameEn: "BT3 Bottle 400 ml",
    category: "envases",
    code: "BT3",
    description: "Botella alta y esbelta de cuello largo, con tapa metálica de 34 mm.",
    descriptionEn: "Tall, slender long-neck bottle with a 34 mm metal lid.",
    specifications: ["Altura: 28 cm aprox.", "Diámetro mayor: 6 cm aprox.", "Peso: 536 gr aprox.", "Capacidad: 400 ml", "Tapa metálica de 34 mm"],
    image: "/images/envases/bt3-vacio.webp",
    filledImage: "/images/envases/bt3-lleno.webp",
    footerNote: "Ideal para aceites, vinagres, salsas, licores y jarabes.",
    footerNoteEn: "Ideal for oils, vinegars, sauces, liqueurs and syrups.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: true,
  },
  {
    id: "envase-btm",
    name: "Botella BTM 600 ml",
    nameEn: "BTM Bottle 600 ml",
    category: "envases",
    code: "BTM",
    description: "Botella clásica de cuello largo y gran capacidad, con tapa metálica de 34 mm.",
    descriptionEn: "Classic long-neck, large-capacity bottle with a 34 mm metal lid.",
    specifications: ["Altura: 29.5 cm aprox.", "Diámetro mayor: 7.5 cm aprox.", "Peso: 550 gr aprox.", "Capacidad: 600 ml", "Tapa metálica de 34 mm"],
    image: "/images/envases/btm-vacio.webp",
    filledImage: "/images/envases/btm-lleno.webp",
    footerNote: "Para jugos, agua saborizada, kombucha, licores y bebidas de autor.",
    footerNoteEn: "For juices, flavored water, kombucha, liqueurs and signature drinks.",
    customizationAvailable: true,
    minimumOrder: 50,
    featured: true,
    active: true,
  },
];

export const categories = [
  { id: "vasos", name: "Vasos", nameEn: "Tumblers" },
  { id: "copas", name: "Copas", nameEn: "Stemware" },
  { id: "jarras", name: "Jarras y sets", nameEn: "Pitchers & sets" },
  { id: "bar", name: "Bar y regalos", nameEn: "Bar & gifts" },
  { id: "hogar", name: "Hogar y floreros", nameEn: "Home & vases" },
  { id: "envases", name: "Envases para tu marca", nameEn: "Packaging for brands" },
];

// Catálogo de regalos y cristalería (fuente: CRISIL COLLECTION 3 + fotos de estudio). Máximo 50 productos en total con envases.
export const products: Product[] = [
  {
    id: "vg",
    name: "Vaso Globo",
    nameEn: "Globe Glass",
    category: "vasos",
    code: "VG",
    description: "Sin tallo y de silueta redondeada, cómodo en la mano. Para el día a día o una ocasión especial.",
    descriptionEn: "Stemless with a gently rounded silhouette that rests naturally in the hand. For daily use or special occasions.",
    specifications: [
        "Altura 9.5 cm",
        "Diámetro 6.5 cm",
        "Capacidad 250 ml",
        "Peso 130 g"
    ],
    specificationsEn: [
        "Height 9.5 cm",
        "Diameter 6.5 cm",
        "Capacity 250 ml",
        "Weight 130 g"
    ],
    image: "/images/productos/vg.webp",
    gallery: [
        "/images/productos/vg.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "bv-sp",
    name: "Vaso Urbano",
    nameEn: "Urban Glass",
    category: "vasos",
    code: "BV/SP",
    description: "Silueta moderna y elegante, de gran capacidad.",
    descriptionEn: "A modern, elegant silhouette with generous capacity.",
    specifications: [
        "Altura 12 cm",
        "Diámetro 9 cm",
        "Capacidad 500 ml",
        "Peso 230 g"
    ],
    specificationsEn: [
        "Height 12 cm",
        "Diameter 9 cm",
        "Capacity 500 ml",
        "Weight 230 g"
    ],
    image: "/images/productos/bv-sp.webp",
    gallery: [
        "/images/productos/bv-sp.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "c9",
    name: "Vaso Pinta",
    nameEn: "Pint Glass",
    category: "vasos",
    code: "C9",
    description: "Un clásico renovado, ideal para cerveza, jugos o gaseosas.",
    descriptionEn: "A timeless classic, perfect for beer, fresh juices or soft drinks.",
    specifications: [
        "Altura 11 cm",
        "Diámetro 7.5 cm",
        "Capacidad 450 ml",
        "Peso 210 g"
    ],
    specificationsEn: [
        "Height 11 cm",
        "Diameter 7.5 cm",
        "Capacity 450 ml",
        "Weight 210 g"
    ],
    image: "/images/productos/c9.webp",
    gallery: [
        "/images/productos/c9.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "vr5",
    name: "Vaso Barril",
    nameEn: "Barrel Glass",
    category: "vasos",
    code: "VR5",
    description: "Base anillada característica. Para bebidas frías, cócteles o cerveza.",
    descriptionEn: "Distinctive ringed base. For cold drinks, easy cocktails or beer.",
    specifications: [
        "Altura 13 cm",
        "Diámetro 8.4 cm",
        "Capacidad 450 ml",
        "Peso 300 g"
    ],
    specificationsEn: [
        "Height 13 cm",
        "Diameter 8.4 cm",
        "Capacity 450 ml",
        "Weight 300 g"
    ],
    image: "/images/productos/vr5.webp",
    gallery: [
        "/images/productos/vr5.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "fto3",
    name: "Vaso Multiuso",
    nameEn: "Multipurpose Glass",
    category: "vasos",
    code: "FTO3",
    description: "Bajo y ancho, de base gruesa. Para whisky, postres, velas o como mini florero.",
    descriptionEn: "Low and wide with a weighted base. For whiskey, desserts, candles or as a small vase.",
    specifications: [
        "Altura 6.5 cm",
        "Diámetro 8 cm",
        "Capacidad 200 ml",
        "Peso 150 g"
    ],
    specificationsEn: [
        "Height 6.5 cm",
        "Diameter 8 cm",
        "Capacity 200 ml",
        "Weight 150 g"
    ],
    image: "/images/productos/fto3.webp",
    gallery: [
        "/images/productos/fto3.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "l1m",
    name: "Vaso Clásico",
    nameEn: "Classic Glass",
    category: "vasos",
    code: "L1M",
    description: "Forma cónica invertida y resistente, pensado para restaurantes.",
    descriptionEn: "Inverted-conical and sturdy, built for busy restaurant service.",
    specifications: [
        "Altura 8.3 cm",
        "Diámetro 8 cm",
        "Capacidad 250 ml",
        "Peso 160 g"
    ],
    specificationsEn: [
        "Height 8.3 cm",
        "Diameter 8 cm",
        "Capacity 250 ml",
        "Weight 160 g"
    ],
    image: "/images/productos/l1m.webp",
    gallery: [
        "/images/productos/l1m.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "lrd",
    name: "Vaso Cilindro",
    nameEn: "Cylinder Tumbler",
    category: "vasos",
    code: "LRD",
    description: "Alto y delgado, ideal para coctelería.",
    descriptionEn: "Tall and slim, ideal for cocktails.",
    specifications: [
        "Altura 18 cm",
        "Diámetro 5 cm",
        "Capacidad 260 ml",
        "Peso 110 g"
    ],
    specificationsEn: [
        "Height 18 cm",
        "Diameter 5 cm",
        "Capacity 260 ml",
        "Weight 110 g"
    ],
    image: "/images/productos/lrd.webp",
    gallery: [
        "/images/productos/lrd.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "vr1-vr3",
    name: "Vaso Línea",
    nameEn: "Line Glass",
    category: "vasos",
    code: "VR1 / VR3",
    description: "Líneas horizontales finas que dan agarre y un detalle visual. En dos tamaños.",
    descriptionEn: "Fine horizontal lines for a secure grip and a distinctive look. Two sizes.",
    specifications: [
        "Línea 1: 9.5 cm, 250 ml",
        "Línea XL: 12.8 cm, 350 ml"
    ],
    specificationsEn: [
        "Line 1: 9.5 cm, 250 ml",
        "Line XL: 12.8 cm, 350 ml"
    ],
    image: "/images/productos/vr1-vr3.webp",
    gallery: [
        "/images/productos/vr1-vr3.webp",
        "/images/productos/vr1-vr3-2.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "g10",
    name: "Bowls y Compoteras",
    nameEn: "Bowls & Dessert Bowls",
    category: "vasos",
    code: "G10 / GL1 / GL2",
    description: "Bowl Natura y compoteras de vidrio para postres, helado, frutas, ensaladas o snacks.",
    descriptionEn: "Natura bowl and glass dessert bowls for desserts, ice cream, fruit, salads or snacks.",
    specifications: [
        "Bowl Natura: 8.8 cm, 450 ml",
        "Compoteras GL1 y GL2"
    ],
    specificationsEn: [
        "Natura bowl: 8.8 cm, 450 ml",
        "GL1 and GL2 dessert bowls"
    ],
    image: "/images/productos/g10.webp",
    gallery: [
        "/images/productos/g10.webp",
        "/images/productos/compotero.webp",
        "/images/productos/compotero-2.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "w1f",
    name: "Línea Floral",
    nameEn: "Floral Line",
    category: "vasos",
    code: "W1F / TFLO",
    description: "Vasos y florero XL con flores de colores estilo retro. Para jugos, agua o como pieza decorativa.",
    descriptionEn: "Glasses and an XL vase with colorful retro flowers. For juice, water or as a decorative piece.",
    specifications: [
        "Vaso: 8.6 cm, 250 ml",
        "Florero XL: 38 cm, 2750 ml",
        "Serigrafía de flores"
    ],
    specificationsEn: [
        "Glass: 8.6 cm, 250 ml",
        "XL vase: 38 cm, 2750 ml",
        "Screen-printed flowers"
    ],
    image: "/images/productos/w1f.webp",
    gallery: [
        "/images/productos/w1f.webp",
        "/images/productos/tflo.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "geo",
    name: "Vasos Geo Color",
    nameEn: "Geo Color Glasses",
    category: "vasos",
    code: "TL / W1 COLOR",
    description: "Patrones geométricos de color, en versión alta y baja.",
    descriptionEn: "Colorful geometric patterns, in tall and short versions.",
    specifications: [
        "Alto: 14 cm, 350 ml",
        "Bajo: 8.6 cm, 250 ml",
        "Líneas de color"
    ],
    specificationsEn: [
        "Tall: 14 cm, 350 ml",
        "Short: 8.6 cm, 250 ml",
        "Color lines"
    ],
    image: "/images/productos/geo.webp",
    gallery: [
        "/images/productos/geo.webp",
        "/images/productos/geo-2.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "polka",
    name: "Vasos Polka",
    nameEn: "Polka Glasses",
    category: "vasos",
    code: "LR / W1",
    description: "Tres diseños tallados a mano: líneas horizontales, verticales y puntos.",
    descriptionEn: "Three hand-carved patterns: horizontal lines, vertical lines and dots.",
    specifications: [
        "Alto: 16 cm, 300 ml",
        "Bajo: 8.6 cm, 250 ml",
        "Tallado a mano"
    ],
    specificationsEn: [
        "Tall: 16 cm, 300 ml",
        "Short: 8.6 cm, 250 ml",
        "Hand-carved"
    ],
    image: "/images/productos/polka.webp",
    gallery: [
        "/images/productos/polka.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "v7x",
    name: "Copa Festiva",
    nameEn: "Festiva Goblet",
    category: "copas",
    code: "V7X",
    description: "Alta y esbelta, conserva las burbujas. Para espumantes y cócteles.",
    descriptionEn: "Tall and slender to preserve bubbles. For sparkling wine and cocktails.",
    specifications: [
        "Altura 17.5 cm",
        "Diámetro 8 cm",
        "Capacidad 300 ml",
        "Peso 180 g"
    ],
    specificationsEn: [
        "Height 17.5 cm",
        "Diameter 8 cm",
        "Capacity 300 ml",
        "Weight 180 g"
    ],
    image: "/images/productos/v7x.webp",
    gallery: [
        "/images/productos/v7x.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "v7g",
    name: "Copa Envero",
    nameEn: "Envero Goblet",
    category: "copas",
    code: "V7G",
    description: "Copa de vino de diseño clásico y robusto.",
    descriptionEn: "A wine glass with a classic, robust design.",
    specifications: [
        "Altura 15 cm",
        "Diámetro 8 cm",
        "Capacidad 150 ml",
        "Peso 210 g"
    ],
    specificationsEn: [
        "Height 15 cm",
        "Diameter 8 cm",
        "Capacity 150 ml",
        "Weight 210 g"
    ],
    image: "/images/productos/v7g.webp",
    gallery: [
        "/images/productos/v7g.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "v9",
    name: "Copa Tradición",
    nameEn: "Tradition Wine Glass",
    category: "copas",
    code: "V9G / V9M",
    description: "Cáliz redondeado que deja respirar el vino. Para tinto o blanco.",
    descriptionEn: "A rounded bowl that lets wine breathe. For red or white.",
    specifications: [
        "Grande: 16 cm, 250 ml",
        "Mediana: 14 cm, 200 ml",
        "Peso 140 g"
    ],
    specificationsEn: [
        "Large: 16 cm, 250 ml",
        "Medium: 14 cm, 200 ml",
        "Weight 140 g"
    ],
    image: "/images/productos/v9.webp",
    gallery: [
        "/images/productos/v9.webp",
        "/images/productos/v9-2.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "v13",
    name: "Copa Vanguardia",
    nameEn: "Vanguard Wine Glass",
    category: "copas",
    code: "V13",
    description: "Diseño moderno y audaz. Lisa o con rayas talladas. Para cócteles, cava o postres.",
    descriptionEn: "Bold, modern design. Plain or with carved stripes. For cocktails, cava or desserts.",
    specifications: [
        "Altura 13.5 cm",
        "Capacidad 150 ml",
        "Lisa o con rayas"
    ],
    specificationsEn: [
        "Height 13.5 cm",
        "Capacity 150 ml",
        "Plain or striped"
    ],
    image: "/images/productos/v13.webp",
    gallery: [
        "/images/productos/v13.webp",
        "/images/productos/v13-2.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "vk",
    name: "Copa Viñedo",
    nameEn: "Vineyard Wine Glass",
    category: "copas",
    code: "VKM / VKG",
    description: "Tallo largo soplado a mano para resaltar los aromas del vino.",
    descriptionEn: "A long hand-blown stem that brings out every aroma of the wine.",
    specifications: [
        "Normal: 21 cm, 250 ml",
        "XL: 23 cm, 500 ml"
    ],
    specificationsEn: [
        "Regular: 21 cm, 250 ml",
        "XL: 23 cm, 500 ml"
    ],
    image: "/images/productos/vk.webp",
    gallery: [
        "/images/productos/vk.webp",
        "/images/productos/vk-2.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "ctm",
    name: "Copa Martini",
    nameEn: "Martini Glass",
    category: "copas",
    code: "CTM",
    description: "La copa icónica de coctelería. También para postres. También en set de 4 copas.",
    descriptionEn: "The iconic cocktail glass. Also lovely for desserts. Also available as a set of 4.",
    specifications: [
        "Altura 17 cm",
        "Diámetro 11.2 cm",
        "Capacidad 170 ml",
        "Peso 180 g"
    ],
    specificationsEn: [
        "Height 17 cm",
        "Diameter 11.2 cm",
        "Capacity 170 ml",
        "Weight 180 g"
    ],
    image: "/images/productos/ctm.webp",
    gallery: [
        "/images/productos/ctm.webp",
        "/images/productos/ctm-2.webp",
        "/images/productos/set-martini.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "ch9",
    name: "Copa Flauta",
    nameEn: "Flute Glass",
    category: "copas",
    code: "CH9",
    description: "Flauta reinterpretada para brindar con estilo.",
    descriptionEn: "A modern take on the flute for stylish toasts.",
    specifications: [
        "Altura 17.2 cm",
        "Capacidad 360 ml",
        "Peso 145 g"
    ],
    specificationsEn: [
        "Height 17.2 cm",
        "Capacity 360 ml",
        "Weight 145 g"
    ],
    image: "/images/productos/ch9.webp",
    gallery: [
        "/images/productos/ch9.webp",
        "/images/productos/ch9-2.webp"
    ],
    fit: "contain",
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "ch13-ch14",
    name: "Vasos con Pie Torre y Solidez",
    nameEn: "Tower & Solidity Stemless",
    category: "copas",
    code: "CH13 / CH14",
    description: "Cuerpo cilíndrico sobre base elevada. Ideal para coctelería, bebidas o postres.",
    descriptionEn: "A cylindrical body on a raised base. For cocktails, drinks or desserts.",
    specifications: [
        "Torre: 18 cm, 300 ml",
        "Solidez: 12 cm, 370 ml"
    ],
    specificationsEn: [
        "Tower: 18 cm, 300 ml",
        "Solidity: 12 cm, 370 ml"
    ],
    image: "/images/productos/ch13-ch14.webp",
    gallery: [
        "/images/productos/ch13-ch14.webp",
        "/images/productos/ch13-ch14-2.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "champana",
    name: "Copas de Champaña",
    nameEn: "Champagne Glasses",
    category: "copas",
    code: "CH6 / CF / CF2",
    description: "Tres modelos para brindar: Alta CF2, Elegante CH6 y Cónica CF.",
    descriptionEn: "Three models for toasting: Tall CF2, Elegant CH6 and Conical CF.",
    specifications: [
        "Alta CF2: 21 cm, 300 ml",
        "Elegante CH6: 19.5 cm, 100 ml",
        "Cónica CF: 19.5 cm, 150 ml"
    ],
    specificationsEn: [
        "Tall CF2: 21 cm, 300 ml",
        "Elegant CH6: 19.5 cm, 100 ml",
        "Conical CF: 19.5 cm, 150 ml"
    ],
    image: "/images/productos/champana.webp",
    gallery: [
        "/images/productos/champana.webp",
        "/images/productos/champana-2.webp",
        "/images/productos/champana-3.webp"
    ],
    fit: "contain",
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "ch3",
    name: "Copa Coupé",
    nameEn: "Coupe Glass",
    category: "copas",
    code: "CH3",
    description: "Cáliz ancho y bajo, para cócteles o postres.",
    descriptionEn: "A wide, shallow bowl for cocktails or desserts.",
    specifications: [
        "Altura 10 cm",
        "Diámetro 9 cm",
        "Capacidad 150 ml",
        "Peso 160 g"
    ],
    specificationsEn: [
        "Height 10 cm",
        "Diameter 9 cm",
        "Capacity 150 ml",
        "Weight 160 g"
    ],
    image: "/images/productos/ch3.webp",
    gallery: [
        "/images/productos/ch3.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "b1",
    name: "Copa Balón",
    nameEn: "Balloon Goblet",
    category: "copas",
    code: "B1",
    description: "Cuerpo amplio tipo balón, para destilados, cócteles o jugos.",
    descriptionEn: "A wide balloon body for spirits, cocktails or fresh juices.",
    specifications: [
        "Altura 12 cm",
        "Diámetro 10 cm",
        "Capacidad 480 ml",
        "Peso 220 g"
    ],
    specificationsEn: [
        "Height 12 cm",
        "Diameter 10 cm",
        "Capacity 480 ml",
        "Weight 220 g"
    ],
    image: "/images/productos/b1.webp",
    gallery: [
        "/images/productos/b1.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "bv",
    name: "Copa Bavaria",
    nameEn: "Bavaria Goblet",
    category: "copas",
    code: "BV",
    description: "Tallo corto, ideal para cerveza o cócteles. Un gran regalo.",
    descriptionEn: "A short stem, ideal for beer or cocktails. A great gift.",
    specifications: [
        "Altura 16 cm",
        "Diámetro 8.5 cm",
        "Capacidad 550 ml",
        "Peso 218 g"
    ],
    specificationsEn: [
        "Height 16 cm",
        "Diameter 8.5 cm",
        "Capacity 550 ml",
        "Weight 218 g"
    ],
    image: "/images/productos/bv.webp",
    gallery: [
        "/images/productos/bv.webp",
        "/images/productos/bv-2.webp"
    ],
    fit: "contain",
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "mix-rio",
    name: "Set Mix Río XL",
    nameEn: "Mix Río XL Set",
    category: "jarras",
    code: "TJAR / W1 / TL",
    description: "Jarra XL con vasos rectos en dos tamaños, para reuniones.",
    descriptionEn: "An XL pitcher with straight glasses in two sizes, for gatherings.",
    specifications: [
        "Jarra 38 cm, 2750 ml",
        "Vaso bajo 250 ml",
        "Vaso alto 350 ml"
    ],
    specificationsEn: [
        "Jug 38 cm, 2750 ml",
        "Short glass 250 ml",
        "Tall glass 350 ml"
    ],
    image: "/images/productos/mix-rio.webp",
    gallery: [
        "/images/productos/mix-rio.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "jf",
    name: "Jarra Anillada",
    nameEn: "Ringed Jug",
    category: "jarras",
    code: "JF",
    description: "Base anillada, firme y elegante para agua, jugos o limonada.",
    descriptionEn: "A ringed base, sturdy and elegant for water, juice or lemonade.",
    specifications: [
        "Altura 21 cm",
        "Diámetro 13 cm",
        "Capacidad 1600 ml",
        "Peso 1070 g"
    ],
    specificationsEn: [
        "Height 21 cm",
        "Diameter 13 cm",
        "Capacity 1600 ml",
        "Weight 1070 g"
    ],
    image: "/images/productos/jf.webp",
    gallery: [
        "/images/productos/jf.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "jch",
    name: "Jarra Chirimoya",
    nameEn: "Chirimoya Jug",
    category: "jarras",
    code: "JCH",
    description: "Cuerpo redondo con puntos en relieve que mejoran el agarre.",
    descriptionEn: "A round body with raised dots that improve the grip.",
    specifications: [
        "Altura 16.5 cm",
        "Diámetro 14 cm",
        "Capacidad 1500 ml",
        "Peso 920 g"
    ],
    specificationsEn: [
        "Height 16.5 cm",
        "Diameter 14 cm",
        "Capacity 1500 ml",
        "Weight 920 g"
    ],
    image: "/images/productos/jch.webp",
    gallery: [
        "/images/productos/jch.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "rio-alto",
    name: "Set Río Alto",
    nameEn: "Río Alto Set",
    category: "jarras",
    code: "JWX R / W1",
    description: "Jarra y vasos rectos en vidrio reciclado de tono verdoso. Liso o tallado.",
    descriptionEn: "A straight pitcher and glasses in greenish recycled glass. Plain or carved.",
    specifications: [
        "Jarra 21.7 cm, 1200 ml",
        "Vaso 8.6 cm, 250 ml"
    ],
    specificationsEn: [
        "Jug 21.7 cm, 1200 ml",
        "Glass 8.6 cm, 250 ml"
    ],
    image: "/images/productos/rio-alto.webp",
    gallery: [
        "/images/productos/rio-alto.webp",
        "/images/productos/rio-alto-2.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "noche",
    name: "Sets de Noche",
    nameEn: "Night Sets",
    category: "jarras",
    code: "JNS / JN1 / JN",
    description: "Garrafa con vaso que encaja arriba, para velador o escritorio. Tres modelos.",
    descriptionEn: "A carafe with a glass that fits on top, for nightstands or desks. Three models.",
    specifications: [
        "Set A: 700 ml + vaso 130 ml",
        "Set B: 1300 ml + vaso 220 ml",
        "Dúo: 700 ml + vaso 130 ml"
    ],
    specificationsEn: [
        "Set A: 700 ml + 130 ml glass",
        "Set B: 1300 ml + 220 ml glass",
        "Duo: 700 ml + 130 ml glass"
    ],
    image: "/images/productos/noche.webp",
    gallery: [
        "/images/productos/noche.webp",
        "/images/productos/noche-2.webp",
        "/images/productos/noche-3.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "jj4",
    name: "Garrafa Versalles",
    nameEn: "Versailles Carafe",
    category: "jarras",
    code: "JJ4 / VJ4",
    description: "Cuello alargado y su propio vaso como tapa.",
    descriptionEn: "An elongated neck with its own glass as a lid.",
    specifications: [
        "Garrafa 27.4 cm, 1200 ml",
        "Vaso 8.5 cm, 200 ml"
    ],
    specificationsEn: [
        "Carafe 27.4 cm, 1200 ml",
        "Glass 8.5 cm, 200 ml"
    ],
    image: "/images/productos/jj4.webp",
    gallery: [
        "/images/productos/jj4.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "de",
    name: "Decantador",
    nameEn: "Decanter",
    category: "jarras",
    code: "DE",
    description: "Forma de gota que oxigena el vino. También para agua o sangría.",
    descriptionEn: "A drop-shaped decanter that aerates wine. Also for water or sangria.",
    specifications: [
        "Altura 28 cm",
        "Diámetro 17 cm",
        "Capacidad 1400 ml",
        "Peso 830 g"
    ],
    specificationsEn: [
        "Height 28 cm",
        "Diameter 17 cm",
        "Capacity 1400 ml",
        "Weight 830 g"
    ],
    image: "/images/productos/de.webp",
    gallery: [
        "/images/productos/de.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "fernetero",
    name: "Vaso Fernetero",
    nameEn: "Fernet Glass",
    category: "bar",
    code: "F1",
    description: "El vaso fernetero de silueta ondulada, en su caja de regalo.",
    descriptionEn: "Our wavy-silhouette fernet glass, in its gift box.",
    specifications: [
        "Altura 15 cm",
        "Capacidad 600 ml",
        "Peso 500 g",
        "Incluye caja"
    ],
    specificationsEn: [
        "Height 15 cm",
        "Capacity 600 ml",
        "Weight 500 g",
        "Gift box included"
    ],
    image: "/images/productos/fernetero.webp",
    gallery: [
        "/images/productos/fernetero.webp",
        "/images/productos/fernetero-2.webp"
    ],
    fit: "contain",
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "mate",
    name: "Mate Vibes",
    nameEn: "Mate Vibes",
    category: "bar",
    code: "MATE VIBES",
    description: "Mate de vidrio con funda de cuero cosida a mano y bombilla, en su caja Mate Vibes.",
    descriptionEn: "A glass mate with a hand-stitched leather sleeve and straw, in its Mate Vibes box.",
    image: "/images/productos/mate.webp",
    gallery: [
        "/images/productos/mate.webp"
    ],
    fit: "contain",
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "hielera",
    name: "Hielera",
    nameEn: "Ice Bucket",
    category: "bar",
    code: "H1",
    description: "Hielera de vidrio artesanal para tu barra o mesa.",
    descriptionEn: "A handcrafted glass ice bucket for your bar or table.",
    image: "/images/productos/hielera.webp",
    gallery: [
        "/images/productos/hielera.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "set-whisky",
    name: "Set de 6 Vasos de Whisky",
    nameEn: "Set of 6 Whiskey Glasses",
    category: "bar",
    code: "W1",
    description: "Seis vasos de whisky de base gruesa, listos para regalar.",
    descriptionEn: "Six heavy-based whiskey glasses, ready to gift.",
    image: "/images/productos/set-whisky.webp",
    gallery: [
        "/images/productos/set-whisky.webp",
        "/images/productos/set-whisky-2.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "set-cervecero",
    name: "Set de 6 Vasos Cerveceros",
    nameEn: "Set of 6 Beer Glasses",
    category: "bar",
    code: "C8",
    description: "Seis vasos cerveceros con pie, para compartir.",
    descriptionEn: "Six footed beer glasses, made for sharing.",
    image: "/images/productos/set-cervecero.webp",
    gallery: [
        "/images/productos/set-cervecero.webp",
        "/images/productos/set-cervecero-2.webp",
        "/images/productos/set-cervecero-3.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "set-copa-grande",
    name: "Set de 3 Copas Grandes",
    nameEn: "Set of 3 Large Goblets",
    category: "bar",
    code: "CG",
    description: "Tres copas grandes tipo tulipa, para cerveza o cócteles.",
    descriptionEn: "Three large tulip goblets, for beer or cocktails.",
    image: "/images/productos/set-copa-grande.webp",
    gallery: [
        "/images/productos/set-copa-grande.webp",
        "/images/productos/set-copa-grande-2.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "t4",
    name: "Frasco de Cocina con Tapa",
    nameEn: "Kitchen Jar with Lid",
    category: "hogar",
    code: "T4G / T4M / T4P",
    description: "Tapa de vidrio que protege del aire y la humedad. En tres tamaños, liso, con círculo de color o esmerilado.",
    descriptionEn: "A glass lid that seals out air and moisture. Three sizes: plain, color circle or frosted.",
    specifications: [
        "Grande: 20 cm, 1200 ml",
        "Mediano: 15 cm, 800 ml",
        "Chico: 9 cm, 350 ml"
    ],
    specificationsEn: [
        "Large: 20 cm, 1200 ml",
        "Medium: 15 cm, 800 ml",
        "Small: 9 cm, 350 ml"
    ],
    image: "/images/productos/t4.webp",
    gallery: [
        "/images/productos/t4.webp",
        "/images/productos/t4-2.webp",
        "/images/productos/t4-3.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "bowls-aurora",
    name: "Set de 6 Bowls Apilables Aurora",
    nameEn: "Set of 6 Aurora Stackable Bowls",
    category: "hogar",
    code: "AURORA",
    description: "Seis bowls apilables para postres, snacks o salsas.",
    descriptionEn: "Six stackable bowls for desserts, snacks or sauces.",
    image: "/images/productos/bowls-aurora.webp",
    gallery: [
        "/images/productos/bowls-aurora.webp"
    ],
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
  {
    id: "floreros",
    name: "Colección de Floreros",
    nameEn: "Vase Collection",
    category: "hogar",
    code: "FN / DEG / F / FE",
    description: "Más de 30 modelos de floreros soplados a mano, como el escultórico FN, también en caja de regalo. Consúltanos el catálogo completo.",
    descriptionEn: "Over 30 hand-blown vase models, like the sculptural FN, also in a gift box. Ask us for the full catalog.",
    specifications: [
        "FN: 24 cm, 2850 ml",
        "Alturas de 7 a 38 cm",
        "Capacidades de 70 a 2850 ml"
    ],
    specificationsEn: [
        "FN: 24 cm, 2850 ml",
        "Heights from 7 to 38 cm",
        "Capacities from 70 to 2850 ml"
    ],
    image: "/images/productos/florero-fn.webp",
    gallery: [
        "/images/productos/florero-fn.webp",
        "/images/productos/florero-fn-2.webp",
        "/images/productos/floreros.webp",
        "/images/productos/floreros-2.webp",
        "/images/productos/floreros-3.webp"
    ],
    fit: "contain",
    customizationAvailable: true,
    minimumOrder: 25,
    featured: true,
    active: true,
  },
];
