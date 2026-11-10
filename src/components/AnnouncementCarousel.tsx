import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PROMO_UNTIL, PROMO_UNTIL_EN, WHATSAPP } from "@/lib/offers";
import { useLang } from "@/lib/i18n";
import { ChristmasFx } from "@/components/ChristmasFx";

// PORTADA: anuncios con fotos grandes que van rotando.
// Para agregar un anuncio nuevo, sumar un objeto a `slides` (texto en español y en inglés).
// Cada anuncio es una foto a pantalla completa. `mobileImage` es opcional (recorte vertical para celular).
// `href` puede ser una sección (#regalos) o un enlace de WhatsApp.
type Slide = {
  tag: [string, string];
  title: [string, string];
  text: [string, string];
  cta: [string, string];
  href: string;
  image: string;
  mobileImage?: string;
  // Segunda foto en la que se "transforma" la primera (barrido dorado de izquierda a derecha)
  morph?: { image: string; mobileImage?: string };
  imageAlt: string;
  position?: string;
  // "dark": la foto ya es oscura, degradado suave solo detrás del texto.
  // "light": foto de fondo claro, texto oscuro.
  overlay?: "default" | "dark" | "light";
  accent?: string;
  // "navidad": nieve, esferas colgantes y destellos interactivos encima de la foto
  fx?: "navidad" | "navidad-trineo";
  // segundos que se queda este anuncio (por defecto 7)
  seconds?: number;
  // lista corta de puntos que se muestran debajo del texto
  bullets?: [string, string][];
};

const XMAS_MSG = encodeURIComponent(
  `Hola, quisiera cotizar regalos corporativos de fin de año con el logo de mi empresa en el vaso y en la caja (pedido mínimo 25 unidades). Empresa: `,
);
const WHOLESALE_MSG = encodeURIComponent(
  `Hola, quisiera el precio de fábrica para mayoristas de noviembre (válido hasta el ${PROMO_UNTIL}). Producto y cantidad: `,
);

const KIT_MSG = encodeURIComponent(
  `Hola, quisiera armar un kit de regalo corporativo con mi logo (dulceros con chocolates, decanters, floreros, frascos o vasos). Empresa y cantidad: `,
);

const slides: Slide[] = [
  {
    tag: [`Fin de año 2026 · Reservá hasta el ${PROMO_UNTIL}`, `Year-end 2026 · Book by ${PROMO_UNTIL_EN}`],
    title: ["Tu logo en el vaso, tu marca en la caja", "Your logo on the glass, your brand on the box"],
    text: [
      "El regalo de fin de año para tu equipo y tus clientes: vasos soplados a mano en Bolivia, personalizados con tu empresa.",
      "The year-end gift for your team and clients: glasses hand-blown in Bolivia, customized for your company.",
    ],
    cta: ["Cotizar regalo corporativo", "Quote corporate gift"],
    href: `https://wa.me/${WHATSAPP}?text=${XMAS_MSG}`,
    image: "/images/navidad/fernetglass-logo.webp",
    mobileImage: "/images/navidad/fernetglass-logo-movil.webp",
    morph: { image: "/images/navidad/fernetglass-regalo.webp", mobileImage: "/images/navidad/fernetglass-regalo-movil.webp" },
    imageAlt: "Vaso FernetGlass de vidrio soplado junto a su caja; la caja se transforma en una caja blanca de regalo con el logo de tu empresa",
    position: "object-top md:object-right",
    overlay: "light",
    accent: "#D4AF37",
    fx: "navidad-trineo",
    seconds: 14,
    bullets: [
      ["Logo grabado o arenado en el vaso", "Logo engraved or sandblasted on the glass"],
      ["Caja de regalo con tu marca", "Gift box with your brand"],
      ["Desde 25 unidades", "From 25 units"],
      ["Entrega a tiempo para diciembre", "Delivered in time for December"],
    ],
  },
  {
    tag: [`Kits de regalo corporativo · Hasta el ${PROMO_UNTIL}`, `Corporate gift kits · Until ${PROMO_UNTIL_EN}`],
    title: ["Regalos con tu logo para clientes y empleados", "Gifts with your logo for clients and employees"],
    text: [
      "Ideales para reconocer a tus empleados destacados y agradecer a tus clientes. Todo de vidrio soplado y con el logo de tu empresa.",
      "Perfect to recognize top employees and thank your clients. All hand-blown glass, with your company logo.",
    ],
    cta: ["Armar mi kit de regalo", "Build my gift kit"],
    href: `https://wa.me/${WHATSAPP}?text=${KIT_MSG}`,
    image: "/images/navidad/kit-corporativo.webp",
    mobileImage: "/images/navidad/kit-corporativo-movil.webp",
    imageAlt: "Productos CRISIL para regalo corporativo con espacio para logo: vaso fernetero, dulcero con chocolates, decanter, florero en caja, set de bar, jarra, tarro y vasos de vino",
    position: "object-top md:object-right",
    overlay: "light",
    accent: "#D4AF37",
    fx: "navidad",
    seconds: 10,
    bullets: [
      ["Dulcero con chocolates", "Candy jar with chocolates"],
      ["Decanters, jarras y sets de bar", "Decanters, pitchers and bar sets"],
      ["Floreros en caja de regalo", "Vases in gift boxes"],
      ["Tu logo en cada pieza", "Your logo on every piece"],
    ],
  },
  {
    tag: [`Solo noviembre · Hasta el ${PROMO_UNTIL}`, `November only · Until ${PROMO_UNTIL_EN}`],
    title: ["Precio de fábrica para mayoristas", "Factory prices for wholesalers"],
    text: [
      "Comprá directo a la fábrica: vasos, copas, jarras y frascos de vidrio reciclado, con stock y envíos a toda Bolivia. Más volumen, mejor precio.",
      "Buy direct from the factory: recycled-glass tumblers, goblets, pitchers and jars, in stock and shipped across Bolivia. More volume, better price.",
    ],
    cta: ["Pedir precio de fábrica", "Get factory price"],
    href: `https://wa.me/${WHATSAPP}?text=${WHOLESALE_MSG}`,
    image: "/images/historia/brindis.webp",
    imageAlt: "Dos copas de vidrio CRISIL brindando frente a las luces de la ciudad de noche",
    position: "object-center",
    overlay: "dark",
    accent: "#D4AF37",
  },
  {
    tag: ["Impacto social", "Social impact"],
    title: ["Vidrio que sostiene a 500 familias", "Glass that supports 500 families"],
    text: [
      "Damos empleo directo a 80 personas en Cochabamba y apoyamos a unas 500 familias que recolectan el vidrio que reciclamos.",
      "We directly employ 80 people in Cochabamba and support around 500 families who collect the glass we recycle.",
    ],
    cta: ["Conoce nuestra historia", "Discover our story"],
    href: "#historia",
    image: "/images/historia/familias.webp",
    imageAlt: "Equipo y familias de CRISIL compartiendo un almuerzo al aire libre",
    position: "object-[50%_35%]",
  },
  {
    tag: ["100% vidrio reciclado", "100% recycled glass"],
    title: ["Vidrio reciclado, diseño de hoy", "Recycled glass, modern design"],
    text: [
      "Le damos una segunda vida al vidrio: lo reciclamos y lo convertimos en piezas sopladas a mano para tu mesa y tu marca.",
      "We give glass a second life: we recycle it and turn it into hand-blown pieces for your table and your brand.",
    ],
    cta: ["Ver el catálogo", "See the catalog"],
    href: "#regalos",
    image: "/images/historia/jarra.webp",
    imageAlt: "Jarra de vidrio reciclado CRISIL sirviendo limonada con menta",
    position: "object-center",
  },
  {
    tag: ["Soplado a mano en Bolivia", "Hand-blown in Bolivia"],
    title: ["Cada pieza nace del fuego a 1200 °C", "Every piece is born from fire at 1200 °C"],
    text: [
      "Nuestros artesanos soplan y forman cada vaso, copa y jarra a mano. Regalos corporativos con historia de verdad.",
      "Our artisans blow and shape every glass, goblet and pitcher by hand. Corporate gifts with a real story.",
    ],
    cta: ["Crear mi regalo corporativo", "Create my corporate gift"],
    href: "#proyecto",
    image: "/images/historia/horno.webp",
    imageAlt: "Vidrio incandescente en la punta de la caña de soplado",
    position: "object-[30%_50%]",
  },
];

const INTERVAL_MS = 7000;

// Transformación de la caja: a los ~3 s un barrido dorado cruza la foto y revela la versión
// "regalo corporativo" (caja blanca con logo y fondo navideño). Se repite cada 13 s.
const morphCss = `
.morph-img{animation:morph-wipe 13s ease-in-out infinite both;}
@keyframes morph-wipe{0%,22%{clip-path:inset(0 100% 0 0);opacity:1}36%,93%{clip-path:inset(0 0 0 0);opacity:1}100%{clip-path:inset(0 0 0 0);opacity:0}}
.morph-bar{position:absolute;top:0;bottom:0;left:0;width:90px;margin-left:-45px;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(255,236,170,.0) 10%,rgba(255,226,140,.75) 48%,#fff 50%,rgba(255,226,140,.75) 52%,transparent);
  filter:blur(3px);animation:morph-bar 13s ease-in-out infinite both;}
@keyframes morph-bar{0%,22%{left:0;opacity:0}23%{opacity:1}35%{opacity:1}36%{left:100%;opacity:0}100%{left:100%;opacity:0}}
@media (prefers-reduced-motion: reduce){.morph-img{animation:none}.morph-bar{display:none}}
`;

export function AnnouncementCarousel() {
  const { lang } = useLang();
  const L = lang === "en" ? 1 : 0;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);
  const lightNow = slides[i]?.overlay === "light";
  const go = (n: number) => setI((n + slides.length) % slides.length);

  useEffect(() => {
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduce = false;
    }
    if (paused || reduce) return;
    const ms = (slides[i]?.seconds ?? INTERVAL_MS / 1000) * 1000;
    const t = window.setTimeout(() => setI((c) => (c + 1) % slides.length), ms);
    return () => window.clearTimeout(t);
  }, [paused, i]);

  return (
    <section
      id="inicio"
      aria-roledescription="carrusel"
      aria-label={lang === "en" ? "Announcements" : "Anuncios"}
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-primary text-primary-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => setTouchX(e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const d = touchX - (e.changedTouches[0]?.clientX ?? touchX);
        if (d > 40) go(i + 1);
        else if (d < -40) go(i - 1);
        setTouchX(null);
      }}
    >
      {slides.map((s, n) => {
        const active = n === i;
        const light = s.overlay === "light";
        const content = (
          <div className="max-w-2xl">
            <p className="mb-4 inline-block px-3 py-1 text-[11px] font-bold uppercase" style={{ background: s.accent ?? "var(--secondary)", color: s.accent ? "#141414" : "var(--primary)" }}>{s.tag[L]}</p>
            <h1 className={`display text-5xl leading-[.95] sm:text-6xl lg:text-7xl ${light ? "text-[#1a1a1a]" : ""}`}>{s.title[L]}</h1>
            <p className={`mt-5 max-w-xl text-base leading-7 md:text-lg ${light ? "text-[#2b2b2b]" : "text-primary-foreground/85"}`}>{s.text[L]}</p>
            {s.bullets && (
              <ul className={`mt-5 hidden max-w-xl grid-cols-1 gap-2 md:grid text-sm font-semibold sm:grid-cols-2 ${light ? "text-[#1a1a1a]" : ""}`}>
                {s.bullets.map((b) => (
                  <li key={b[0]} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px]" style={{ background: s.accent ?? "var(--secondary)", color: "#141414" }}>✓</span>
                    {b[L]}
                  </li>
                ))}
              </ul>
            )}
            <a
              href={s.href}
              {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              tabIndex={active ? 0 : -1}
              className={`mt-8 inline-flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase hover:opacity-90 ${light ? "bg-primary text-primary-foreground" : "bg-primary-foreground text-primary"}`}
            >
              {s.cta[L]} <ArrowRight size={15} />
            </a>
          </div>
        );
        return (
          <div
            key={s.image}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <picture>
              {s.mobileImage && <source media="(max-width: 767px)" srcSet={s.mobileImage} />}
              <img
                src={s.image}
                alt={s.imageAlt}
                loading={n === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover ${s.position ?? "object-center"} transition-transform duration-[7000ms] ease-out motion-reduce:transition-none ${active && !s.morph ? "scale-105" : "scale-100"}`}
              />
            </picture>
            {s.morph && active && (
              <>
                <style>{morphCss}</style>
                <picture>
                  {s.morph.mobileImage && <source media="(max-width: 767px)" srcSet={s.morph.mobileImage} />}
                  <img src={s.morph.image} alt="" aria-hidden className={`morph-img absolute inset-0 h-full w-full object-cover ${s.position ?? "object-center"}`} />
                </picture>
                <div className="morph-bar" aria-hidden />
              </>
            )}
            {light ? (
              <div className="absolute inset-0 bg-gradient-to-t from-[#ece8df] via-[#ece8df]/60 to-transparent md:bg-gradient-to-r md:from-[#ece8df]/90 md:via-[#ece8df]/40 md:to-transparent" />
            ) : s.overlay === "dark" ? (
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/20 md:to-transparent" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/45 to-primary/25" />
            )}
            {s.fx?.startsWith("navidad") && active && <ChristmasFx sleigh={s.fx === "navidad-trineo"} />}
            <div className={`absolute inset-x-0 top-0 h-36 bg-gradient-to-b to-transparent ${light ? "from-black/50" : "from-black/60"}`} />
            <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-end px-5 pb-28 pt-28 md:px-10 md:pb-32">{content}</div>
          </div>
        );
      })}

      <div className="absolute bottom-6 left-5 z-20 flex items-center gap-3 md:left-10">
        <button type="button" onClick={() => go(i - 1)} aria-label={lang === "en" ? "Previous" : "Anterior"} className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm ${lightNow ? "border-primary/50 bg-primary/10 text-primary hover:bg-primary/20" : "border-primary-foreground/40 bg-primary/30 hover:bg-primary/60"}`}>
          <ArrowLeft size={16} />
        </button>
        <div className="flex gap-1.5">
          {slides.map((s, n) => (
            <button
              key={s.image}
              type="button"
              onClick={() => setI(n)}
              aria-label={`${lang === "en" ? "Slide" : "Anuncio"} ${n + 1}`}
              aria-current={n === i}
              className={`h-2 rounded-full transition-all ${lightNow ? "bg-primary" : "bg-white"} ${n === i ? "w-7" : "w-2 opacity-50"}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(i + 1)} aria-label={lang === "en" ? "Next" : "Siguiente"} className={`flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm ${lightNow ? "border-primary/50 bg-primary/10 text-primary hover:bg-primary/20" : "border-primary-foreground/40 bg-primary/30 hover:bg-primary/60"}`}>
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
