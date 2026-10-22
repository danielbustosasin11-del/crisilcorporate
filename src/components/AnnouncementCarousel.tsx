import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ARRIVAL } from "@/lib/offers";

// Anuncios rotativos de la página principal.
// Para agregar uno nuevo (ej: Diario de conciencia social, Nuestro proceso), sumar un objeto a `slides`.
type Slide = { tag: string; title: string; text: string; cta: string; href: string; image: string; imageAlt: string };

const slides: Slide[] = [
  {
    tag: "Halloween 2026 · Cupos limitados",
    title: "Tu logo, tu calabaza, tu vaso",
    text: "Vasos de vidrio soplado en Bolivia con el logo de tu empresa y diseño de Halloween, para entrega antes de Halloween.",
    cta: "Cotizar para Halloween",
    href: "#halloween",
    image: "/images/halloween/vaso-halloween-2026.webp",
    imageAlt: "Vaso con calabaza de Halloween 2026",
  },
  {
    tag: `Llega a Santa Cruz · ${ARRIVAL}`,
    title: "Vaso Fernetero CRISIL",
    text: "Vidrio artesanal en su caja de regalo. Stock limitado: reserva el tuyo antes de que se acabe.",
    cta: "Reservar el mío",
    href: "#fernet",
    image: "/images/fernetglass/fernetglass-ficha.webp",
    imageAlt: "Vaso Fernetero CRISIL con su caja",
  },
  {
    tag: "Seguimiento de pedidos",
    title: "Rastrea tu pedido",
    text: "Ingresa tu código CRS y mira en qué etapa va tu pedido, sin tener que escribirnos.",
    cta: "Rastrear mi pedido",
    href: "#tracking",
    image: "/images/portada-corporativos.jpg",
    imageAlt: "Colección de vidrio artesanal CRISIL",
  },
];

const INTERVAL_MS = 6000;

export function AnnouncementCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);
  const go = (n: number) => setI((n + slides.length) % slides.length);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;
    const t = window.setInterval(() => setI((c) => (c + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <section
      aria-label="Anuncios"
      className="bg-primary text-primary-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX === null) return;
        const d = touchX - e.changedTouches[0].clientX;
        if (d > 40) go(i + 1);
        else if (d < -40) go(i - 1);
        setTouchX(null);
      }}
    >
      <div className="relative mx-auto h-[560px] max-w-[1440px] overflow-hidden md:h-[420px]">
        {slides.map((s, n) => (
          <div
            key={s.title}
            aria-hidden={n !== i}
            className={`absolute inset-0 grid grid-rows-[220px_1fr] transition-opacity duration-500 md:grid-cols-[1fr_.8fr] md:grid-rows-1 ${
              n === i ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="flex flex-col justify-center px-5 py-6 md:order-1 md:px-10">
              <p className="mb-3 text-xs font-bold uppercase text-secondary">{s.tag}</p>
              <h2 className="display text-4xl leading-none md:text-6xl">{s.title}</h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-primary-foreground/85 md:text-base">{s.text}</p>
              <a
                href={s.href}
                tabIndex={n === i ? 0 : -1}
                className="mt-6 inline-flex w-fit items-center gap-2 bg-primary-foreground px-5 py-3 text-xs font-bold uppercase text-primary hover:opacity-90"
              >
                {s.cta} <ArrowRight size={14} />
              </a>
            </div>
            <div className="row-start-1 overflow-hidden md:order-2 md:row-start-auto">
              <img src={s.image} alt={s.imageAlt} loading={n === 0 ? "eager" : "lazy"} className="h-full w-full object-cover object-center" />
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-5 z-10 flex items-center gap-3 md:left-10">
          <button type="button" onClick={() => go(i - 1)} aria-label="Anuncio anterior" className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20 hover:bg-background/40">
            <ArrowLeft size={15} />
          </button>
          <div className="flex gap-1.5">
            {slides.map((s, n) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Ver anuncio ${n + 1}`}
                className={`h-2 rounded-full bg-white transition-all ${n === i ? "w-6" : "w-2 opacity-50"}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(i + 1)} aria-label="Anuncio siguiente" className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20 hover:bg-background/40">
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
