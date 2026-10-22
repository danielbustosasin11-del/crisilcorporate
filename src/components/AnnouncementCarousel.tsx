import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WHATSAPP } from "@/lib/offers";
import { useLang } from "@/lib/i18n";

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
  imageAlt: string;
  position?: string;
  // "dark": la foto ya es oscura, se usa un degradado suave solo detrás del texto
  overlay?: "default" | "dark";
  accent?: string;
};

const HALLOWEEN_MSG = encodeURIComponent(
  "Hola, quisiera cotizar vasos con diseño personalizado de Halloween y el logo de mi empresa, para entrega el 31 de octubre. Empresa: ",
);

const slides: Slide[] = [
  {
    tag: ["Halloween 2026 · Pedidos hasta el 26 de octubre", "Halloween 2026 · Order by October 26"],
    title: ["Halloween con el logo de tu empresa", "Halloween with your company logo"],
    text: [
      "Aceptamos pedidos corporativos con diseños personalizados de Halloween hasta el 26 de octubre, para entrega el 31.",
      "We take corporate orders with custom Halloween designs until October 26, delivered on the 31st.",
    ],
    cta: ["Cotizar mi pedido de Halloween", "Quote my Halloween order"],
    href: `https://wa.me/${WHATSAPP}?text=${HALLOWEEN_MSG}`,
    image: "/images/halloween/halloween-hero.webp",
    mobileImage: "/images/halloween/halloween-hero-movil.webp",
    imageAlt: "Vaso de vidrio soplado con calabaza de Halloween 2026, telarañas y arañas sobre fondo negro",
    position: "object-top md:object-right",
    overlay: "dark",
    accent: "#F28C28",
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

export function AnnouncementCarousel() {
  const { lang } = useLang();
  const L = lang === "en" ? 1 : 0;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);
  const go = (n: number) => setI((n + slides.length) % slides.length);

  useEffect(() => {
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduce = false;
    }
    if (paused || reduce) return;
    const t = window.setInterval(() => setI((c) => (c + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [paused]);

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
        const content = (
          <div className="max-w-2xl">
            <p className="mb-4 inline-block px-3 py-1 text-[11px] font-bold uppercase" style={{ background: s.accent ?? "var(--secondary)", color: s.accent ? "#141414" : "var(--primary)" }}>{s.tag[L]}</p>
            <h1 className="display text-5xl leading-[.95] sm:text-6xl lg:text-7xl">{s.title[L]}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-primary-foreground/85 md:text-lg">{s.text[L]}</p>
            <a
              href={s.href}
              {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              tabIndex={active ? 0 : -1}
              className="mt-8 inline-flex items-center gap-2 bg-primary-foreground px-6 py-4 text-xs font-bold uppercase text-primary hover:opacity-90"
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
                className={`absolute inset-0 h-full w-full object-cover ${s.position ?? "object-center"} transition-transform duration-[7000ms] ease-out motion-reduce:transition-none ${active ? "scale-105" : "scale-100"}`}
              />
            </picture>
            {s.overlay === "dark" ? (
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/70 md:via-black/20 md:to-transparent" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/45 to-primary/25" />
            )}
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 to-transparent" />
            <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-end px-5 pb-28 pt-28 md:px-10 md:pb-32">{content}</div>
          </div>
        );
      })}

      <div className="absolute bottom-6 left-5 z-20 flex items-center gap-3 md:left-10">
        <button type="button" onClick={() => go(i - 1)} aria-label={lang === "en" ? "Previous" : "Anterior"} className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary/30 backdrop-blur-sm hover:bg-primary/60">
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
              className={`h-2 rounded-full bg-white transition-all ${n === i ? "w-7" : "w-2 opacity-50"}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(i + 1)} aria-label={lang === "en" ? "Next" : "Siguiente"} className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary/30 backdrop-blur-sm hover:bg-primary/60">
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
