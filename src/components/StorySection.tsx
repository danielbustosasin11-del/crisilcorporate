import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { CountUp, Reveal } from "@/components/Reveal";

// IMPACTO SOCIAL (textos del catálogo CRISIL COLLECTION 3) y CÓMO HACEMOS EL VIDRIO.

const stats: { to: number; prefix?: string; suffix?: string; es: string; en: string }[] = [
  { to: 80, es: "personas empleadas directamente", en: "people directly employed" },
  { to: 500, prefix: "~", es: "familias recolectoras apoyadas", en: "collector families supported" },
  { to: 100, suffix: "%", es: "vidrio reciclado", en: "recycled glass" },
  { to: 30, suffix: "+", es: "años soplando vidrio en Bolivia", en: "years blowing glass in Bolivia" },
];

const pillars = [
  {
    image: "/images/historia/reciclado.webp",
    title: ["Medio ambiente", "Environment"],
    text: [
      "Trabajamos con vidrio 100% reciclado, que seleccionamos y lavamos a mano. Los hornos funcionan con gas natural local, cuidamos el agua en cada proceso y el vidrio que no sale perfecto vuelve al horno.",
      "We work with 100% recycled glass, carefully sorted and hand-washed. Our furnaces run on local natural gas, we minimize water use, and any imperfect glass goes back into the kiln.",
    ],
  },
  {
    image: "/images/historia/artesanos.webp",
    title: ["Innovación", "Innovation"],
    text: [
      "Exploramos nuevas mezclas, colores y técnicas de decoración para acompañar las tendencias y lo que piden nuestros clientes.",
      "We constantly explore new blending, coloring and decoration techniques to keep up with trends and our customers' ideas.",
    ],
  },
  {
    image: "/images/historia/despacho.webp",
    title: ["Calidad", "Quality"],
    text: [
      "Cada pieza se revisa en todas las etapas: desde la materia prima hasta el empaque, el transporte y la atención al cliente.",
      "Every piece is checked at every stage: from raw materials to packaging, shipping and customer service.",
    ],
  },
];

export function StorySection() {
  const { lang, t } = useLang();
  const L = lang === "en" ? 1 : 0;
  const scroller = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  // En celular los pilares se deslizan de lado; los puntos marcan cuál se está viendo
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const w = el.firstElementChild?.clientWidth ?? 1;
    setSlide(Math.round(el.scrollLeft / (w + 16)));
  };

  return (
    <section id="historia" className="scroll-mt-4 bg-background px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Diario de impacto social", "Social impact journal")}</p>
          <h2 className="display max-w-4xl text-5xl leading-none md:text-6xl">{t("Hecho a mano en Cochabamba, con vidrio 100% reciclado", "Handmade in Cochabamba, from 100% recycled glass")}</h2>
        </Reveal>

        <Reveal className="relative mt-10 overflow-hidden" delay={100}>
          <video src="/videos/fabrica.mp4" poster="/videos/fabrica.webp" autoPlay muted loop playsInline preload="metadata" aria-label={t("Artesanos trabajando en la fábrica de CRISIL", "Artisans at work in the CRISIL factory")} className="aspect-[16/9] w-full object-cover object-center md:aspect-[21/9]" />
        </Reveal>

        <div className="mt-px grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.es} delay={i * 120} className="bg-card p-6 md:p-8">
              <p className="display text-5xl tabular-nums text-primary md:text-6xl">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{lang === "en" ? s.en : s.es}</p>
            </Reveal>
          ))}
        </div>

        {/* Pilares: deslizables en celular, 3 columnas en computadora */}
        <div ref={scroller} onScroll={onScroll} className="-mx-5 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:px-0">
          {pillars.map((d, i) => (
            <Reveal key={d.image} delay={i * 150} className="w-[82vw] shrink-0 snap-center md:w-auto">
              <article>
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img src={d.image} alt={d.title[L]} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <h3 className="display mt-5 text-3xl">{d.title[L]}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{d.text[L]}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-1.5 md:hidden" aria-hidden>
          {pillars.map((p, i) => (
            <span key={p.image} className={`h-1.5 rounded-full bg-primary transition-all ${i === slide ? "w-6" : "w-1.5 opacity-30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  ["Preparar el vidrio", "Preparing the glass", "El vidrio de los centros de acopio se rompe en trozos pequeños y se lava a mano.", "Glass from collection centers is broken into small pieces and washed by hand."],
  ["Fundir", "Melting", "Se calienta a 1200 °C hasta volverse una masa viscosa.", "It is heated to 1200 °C until it melts into a viscous mass."],
  ["Soplar", "Blowing", "Con la caña de soplado, los artesanos forman vasos, jarras y floreros.", "With a blowpipe, artisans shape glasses, pitchers and vases."],
  ["Dar forma", "Forming", "El tallo, el pie de una copa o el asa de una jarra se forman a mano.", "The stem and foot of a goblet or the handle of a pitcher are shaped by hand."],
  ["Templar y revisar", "Tempering & QC", "Las piezas se enfrían lentamente, pasan control de calidad y se empacan.", "Pieces cool slowly, pass quality control and are carefully packed."],
];

// Cinco pasos: la imagen queda fija y se funde con la siguiente a medida que se baja.
export function GlassSteps() {
  const { lang, t } = useLang();
  const en = lang === "en";
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset["i"]));
        }),
      { rootMargin: isDesktop ? "-45% 0px -45% 0px" : "-62% 0px -28% 0px" },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="como-se-hace" className="scroll-mt-4 bg-primary px-5 py-20 text-primary-foreground md:px-10 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase text-secondary">{t("Cómo hacemos el vidrio", "The making of glass")}</p>
          <h2 className="display text-5xl leading-none md:text-6xl">{t("Cinco pasos, todos a mano", "Five steps, all by hand")}</h2>
        </Reveal>

        <div className="mt-10 md:grid md:grid-cols-2 md:items-start md:gap-16">
          <div className="sticky top-3 z-10 h-[46svh] overflow-hidden bg-black md:order-2 md:top-10 md:h-[80vh]">
            {steps.map((s, i) => (
              <img
                key={s[0]}
                src={`/images/historia/proceso-${i + 1}.webp`}
                alt={en ? s[1] : s[0]}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform,filter] duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                  i === active ? "scale-100 opacity-100 blur-0" : i < active ? "scale-[1.06] opacity-0 blur-sm" : "scale-[1.02] opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <p className="text-xs font-bold uppercase text-secondary">
                {t("Paso", "Step")} {active + 1} / {steps.length}
              </p>
              <p className="display mt-1 text-2xl">{en ? steps[active]?.[1] : steps[active]?.[0]}</p>
            </div>
          </div>

          <div className="md:order-1">
            {steps.map((s, i) => (
              <article
                key={s[0]}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`flex min-h-[58svh] flex-col justify-center border-b border-primary-foreground/15 py-10 transition-all duration-700 ease-out last:border-0 md:min-h-[80vh] ${
                  i === active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-25"
                }`}
              >
                <p className="text-xs font-bold text-secondary">0{i + 1}</p>
                <h3 className="display mt-2 text-4xl md:text-5xl">{en ? s[1] : s[0]}</h3>
                <p className="mt-4 max-w-md text-lg leading-8 text-primary-foreground/75">{en ? s[3] : s[2]}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
