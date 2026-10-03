import { useEffect, useRef, useState } from "react";
import { Sparkles, PenTool, Package, Check } from "lucide-react";

const steps = [
  { n: "01", t: "Elige", d: "Elige qué quieres regalar.", icon: Sparkles, img: "/images/pasos/01-elige.webp", pos: "object-right" },
  { n: "02", t: "Personaliza", d: "Añade tu marca y define la presentación.", icon: PenTool, img: "/images/pasos/02-personaliza.webp", pos: "object-[75%_50%]" },
  { n: "03", t: "Creamos tu propuesta", d: "Cuéntanos cantidad, ocasión y requisitos.", icon: Package, img: "/images/pasos/03-propuesta.webp", pos: "object-center" },
  { n: "04", t: "Recibe", d: "Tus regalos, listos para representar tu marca.", icon: Check, img: "/images/pasos/04-recibe.webp", pos: "object-[90%_10%]" },
];

export function ProcessScroll() {
  const [active, setActive] = useState(0);
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
            <p className="mb-3 text-xs font-bold uppercase text-primary">Una idea, hecha en vidrio</p>
            <h2 className="display text-5xl leading-none md:text-6xl">Así creamos tu proyecto</h2>
          </div>
          <p className="max-w-md self-end text-muted-foreground">
            Un proceso acompañado de principio a fin, pensado para que elegir sea simple y el resultado sea verdaderamente propio.
          </p>
        </div>

        <div className="md:grid md:grid-cols-2 md:items-start md:gap-16">
          <div className="sticky top-3 z-10 h-[42svh] overflow-hidden bg-secondary/40 md:order-2 md:top-10 md:h-[75vh]">
            {steps.map((s, i) => (
              <img
                key={s.n}
                src={s.img}
                alt={s.t}
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
            {steps.map(({ n, t, d, icon: Icon }, i) => (
              <article
                key={n}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`flex min-h-[60svh] flex-col justify-center border-b border-border py-10 transition-all duration-500 last:border-0 md:min-h-[75vh] ${
                  i === active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-30"
                }`}
              >
                <div className="mb-8 flex items-start justify-between md:max-w-md">
                  <span className="text-xs font-bold text-primary">{n}</span>
                  <Icon className="text-primary" size={25} strokeWidth={1.4} />
                </div>
                <h3 className="display mb-2 text-4xl md:text-5xl">{t}</h3>
                <p className="text-base leading-7 text-muted-foreground md:max-w-md">{d}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-7 inline-flex items-center gap-2 border border-secondary bg-secondary/35 px-4 py-2 text-xs font-semibold text-primary">
          <Check size={14} /> Pedido corporativo mínimo: 25 unidades
        </div>
      </div>
    </section>
  );
}
