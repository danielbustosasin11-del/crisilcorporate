import { useLang } from "@/lib/i18n";

// DIARIO DE IMPACTO SOCIAL Y PROCESO (textos del catálogo CRISIL COLLECTION 3).
// Para sumar una nueva entrada al diario, agregar un objeto a `diary`.

const stats: [string, string, string][] = [
  ["80", "personas empleadas directamente", "people directly employed"],
  ["~500", "familias recolectoras apoyadas", "collector families supported"],
  ["100%", "vidrio reciclado", "recycled glass"],
  ["30+", "años soplando vidrio en Bolivia", "years blowing glass in Bolivia"],
];

const diary = [
  {
    image: "/images/historia/reciclado.webp",
    title: ["Medio ambiente", "Environment"],
    text: [
      "Nuestra materia prima es vidrio blanco descartado, seleccionado y lavado a mano. Los hornos funcionan con gas natural local, cuidamos el agua en cada proceso y el vidrio que no sale perfecto vuelve al horno.",
      "Our raw material is discarded white glass, carefully sorted and hand-washed. Our furnaces run on local natural gas, we minimize water use, and any imperfect glass goes back into the kiln.",
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

const steps = [
  ["Preparar el vidrio", "Preparing the glass", "El vidrio de los centros de acopio se rompe en trozos pequeños y se lava a mano.", "Glass from collection centers is broken into small pieces and washed by hand."],
  ["Fundir", "Melting", "Se calienta a 1200 °C hasta volverse una masa viscosa.", "It is heated to 1200 °C until it melts into a viscous mass."],
  ["Soplar", "Blowing", "Con la caña de soplado, los artesanos forman vasos, jarras y floreros.", "With a blowpipe, artisans shape glasses, pitchers and vases."],
  ["Dar forma", "Forming", "El tallo, el pie de una copa o el asa de una jarra se forman a mano.", "The stem and foot of a goblet or the handle of a pitcher are shaped by hand."],
  ["Templar y revisar", "Tempering & QC", "Las piezas se enfrían lentamente, pasan control de calidad y se empacan.", "Pieces cool slowly, pass quality control and are carefully packed."],
];

export function StorySection() {
  const { lang, t } = useLang();
  const L = lang === "en" ? 1 : 0;

  return (
    <section id="historia" className="scroll-mt-4 bg-background px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Diario de impacto social", "Social impact journal")}</p>
        <h2 className="display max-w-4xl text-5xl leading-none md:text-6xl">
          {t("Hecho a mano en Cochabamba, con vidrio que otros descartan", "Handmade in Cochabamba, from glass others throw away")}
        </h2>

        <div className="relative mt-10 overflow-hidden">
          <img src="/images/historia/familias.webp" alt={t("Equipo y familias de CRISIL", "CRISIL team and families")} loading="lazy" className="aspect-[16/9] w-full object-cover object-[50%_35%] md:aspect-[21/9]" />
        </div>

        <div className="mt-px grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {stats.map(([n, es, en]) => (
            <div key={n} className="bg-card p-6 md:p-8">
              <p className="display text-5xl text-primary md:text-6xl">{n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{lang === "en" ? en : es}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {diary.map((d) => (
            <article key={d.image}>
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img src={d.image} alt={d.title[L]} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <h3 className="display mt-5 text-3xl">{d.title[L]}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{d.text[L]}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-14">
          <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Cómo hacemos el vidrio", "The making of glass")}</p>
          <h3 className="display text-4xl md:text-5xl">{t("Cinco pasos, todos a mano", "Five steps, all by hand")}</h3>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
            {steps.map(([es, en, des, den], n) => (
              <article key={es}>
                <div className="aspect-[3/5] overflow-hidden bg-muted">
                  <img src={`/images/historia/proceso-${n + 1}.webp`} alt={lang === "en" ? en : es} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <p className="mt-4 text-xs font-bold text-primary">{n + 1}</p>
                <h4 className="mt-1 text-base font-semibold">{lang === "en" ? en : es}</h4>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{lang === "en" ? den : des}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
