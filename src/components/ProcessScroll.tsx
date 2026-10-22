import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n";

const steps = [
  { t: "Elige tu producto", te: "Choose your product", d: "Explora el catálogo y selecciona las piezas que quieres regalar o personalizar.", de: "Browse the catalog and pick the pieces you want to gift or customize.", img: "/images/pasos/01-elige.webp", pos: "object-right" },
  { t: "Personaliza con tu marca", te: "Add your brand", d: "Agrega tu logo o un mensaje y define cómo quieres presentarlo: caja, empaque y detalles.", de: "Add your logo or a message and choose how to present it: box, packaging and details.", img: "/images/pasos/02-personaliza.webp", pos: "object-[75%_50%]" },
  { t: "Recibe tu propuesta", te: "Get your proposal", d: "Cuéntanos cantidad, fecha y ocasión, y te enviamos una propuesta con precio y plazo de entrega.", de: "Tell us quantity, date and occasion, and we send you a proposal with price and lead time.", img: "/images/pasos/03-propuesta.webp", pos: "object-center" },
  { t: "Recibe tu pedido", te: "Receive your order", d: "Producimos, empacamos y entregamos tus piezas, y puedes seguir tu pedido con tu código.", de: "We produce, pack and deliver your pieces, and you can track your order with your code.", img: "/images/pasos/04-recibe.webp", pos: "object-[90%_10%]" },
];

export function ProcessScroll() {
  const [active, setActive] = useState(0);
  const { lang, t: tr } = useLang();
  const en = lang === "en";
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const rootMargin = isDesktop ? "-45% 0px -45% 0px" : "-65% 0px -25% 0px";

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }),
      { rootMargin },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="proceso" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-10 grid gap-6 md:mb-14 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-primary">{tr("Una idea, hecha en vidrio", "An idea, made in glass")}</p>
            <h2 className="display text-5xl leading-none md:text-6xl">{tr("Así creamos tu proyecto", "How we create your project")}</h2>
          </div>
          <p className="max-w-md self-end text-muted-foreground">
            {tr("Un proceso acompañado de principio a fin, pensado para que elegir sea simple y el resultado sea verdaderamente propio.", "A guided process from start to finish, so choosing is simple and the result is truly yours.")}
          </p>
        </div>

        <div className="md:grid md:grid-cols-2 md:items-start md:gap-16">
          <div className="sticky top-3 z-10 h-[42svh] overflow-hidden bg-secondary/40 md:order-2 md:top-10 md:h-[75vh]">
            {steps.map((s, i) => (
              <img
                key={s.t}
                src={s.img}
                alt={en ? s.te : s.t}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover ${s.pos} transition-all duration-700 ease-out motion-reduce:transition-none ${
                  i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full bg-white/90 transition-all duration-300 ${
                    i === active ? "w-5" : "w-1.5 opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="md:order-1">
            {steps.map(({ t, te, d, de }, i) => (
              <article
                key={t}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`flex min-h-[60svh] flex-col items-center justify-center border-b border-border px-2 py-10 text-center transition-all duration-500 last:border-0 md:min-h-[75vh] ${
                  i === active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-30"
                }`}
              >
                <h3 className="display mb-4 text-4xl md:text-5xl">{en ? te : t}</h3>
                <p className="mx-auto max-w-sm text-lg leading-8 text-muted-foreground">{en ? de : d}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-7 inline-flex items-center gap-2 border border-secondary bg-secondary/35 px-4 py-2 text-xs font-semibold text-primary">
          <Check size={14} /> {tr("Pedido corporativo mínimo: 25 unidades", "Minimum corporate order: 25 units")}
        </div>
      </div>
    </section>
  );
}
