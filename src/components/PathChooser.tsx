import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { OFFERS } from "@/lib/offers";

// "¿Qué estás buscando crear?": las dos tarjetas aparecen con efecto pop al llegar a la sección.
// No es una ventana emergente: es parte de la página. Si la persona la cierra, se pliega y la página sigue.

export function PathChooser({ onGifts, onPackaging, nextId }: { onGifts: () => void; onPackaging: () => void; nextId: string }) {
  const { lang, t } = useLang();
  const [closed, setClosed] = useState(false);
  const L = lang === "en" ? 1 : 0;

  const close = () => {
    setClosed(true);
    window.setTimeout(() => document.querySelector(nextId)?.scrollIntoView({ behavior: "smooth" }), 350);
  };

  return (
    <section
      id="proyecto"
      aria-hidden={closed}
      className={`scroll-mt-4 overflow-hidden bg-primary text-primary-foreground transition-[max-height,opacity] duration-500 ease-out motion-reduce:transition-none ${
        closed ? "max-h-0 opacity-0" : "max-h-[3000px] opacity-100"
      }`}
    >
      <div className="relative mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-28">
        <button
          type="button"
          onClick={close}
          tabIndex={closed ? -1 : 0}
          className="absolute right-5 top-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-4 py-2 text-xs font-semibold hover:bg-primary-foreground/10 md:right-10 md:top-10"
        >
          {t("Ahora no, seguir viendo", "Not now, keep browsing")} <X size={14} />
        </button>

        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase text-secondary">{t("Comencemos", "Let's begin")}</p>
          <h2 className="display max-w-3xl pr-10 text-5xl leading-none md:text-6xl">{t("¿Qué estás buscando crear?", "What would you like to create?")}</h2>
          <p className="mt-5 text-primary-foreground/65">{t("Elige el camino que mejor describe tu proyecto.", "Choose the path that best fits your project.")}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal variant="pop" delay={150}>
            <Card
              index="01"
              title={t("Regalos corporativos", "Corporate gifts")}
              text={t(
                "Para empresas que quieren regalar a sus clientes o equipo: vasos, copas, jarras y sets con su logo y en caja con su marca. Como los que hicimos para Laboratorios COFAR.",
                "For companies gifting clients or staff: glasses, goblets, pitchers and sets with their logo, in a branded box. Like the ones we made for COFAR Laboratories.",
              )}
              image="/images/cofar/entrega.webp"
              imageClassName="object-[50%_70%]"
              points={[OFFERS.regalos.minLabel[L], t("Logo grabado en el vidrio", "Logo engraved on the glass"), t("Caja de regalo con tu marca", "Gift box with your brand"), t("Listo en 2 a 4 semanas", "Ready in 2 to 4 weeks")]}
              action={t("Elegir mi regalo", "Choose my gift")}
              onClick={onGifts}
            />
          </Reveal>
          <Reveal variant="pop" delay={350}>
            <Card
              index="02"
              title={t("Envases para tu marca", "Packaging for your brand")}
              text={t(
                "Para emprendedores y marcas que envasan bebidas, salsas, miel, licores o cosmética: botellas y frascos de vidrio con tapa, listos para tu etiqueta. Del Valle ya llega a la góndola en nuestros envases.",
                "For entrepreneurs and brands bottling drinks, sauces, honey, spirits or cosmetics: glass bottles and jars with caps, ready for your label. Del Valle already reaches store shelves in our packaging.",
              )}
              image="/images/marcas/del-valle-gondola.webp"
              imageClassName="object-center"
              points={[OFFERS.envases.minLabel[L] + t(" · venta por docena", " · sold by the dozen"), t("Tapas y corchos", "Caps and corks"), t("Con tu etiqueta", "With your label"), t("Stock estable para volver a pedir", "Steady stock for reorders")]}
              action={t("Ver botellas y frascos", "See bottles and jars")}
              onClick={onPackaging}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Card({ index, title, text, points, action, image, imageClassName, onClick }: { index: string; title: string; text: string; points: string[]; action: string; image: string; imageClassName: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-full min-w-0 flex-col rounded-sm bg-navy-soft/60 p-5 text-left shadow-[0_20px_60px_-20px_rgba(0,0,0,.5)] ring-1 ring-primary-foreground/15 transition-all duration-500 hover:-translate-y-1 hover:bg-navy-soft hover:ring-primary-foreground/40 sm:p-7 md:p-9"
    >
      <span className="text-xs text-secondary">{index}</span>
      <div className="my-6 aspect-[4/3] w-full overflow-hidden md:my-7">
        <img src={image} alt={title} loading="lazy" className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageClassName}`} />
      </div>
      <h3 className="display text-3xl sm:text-4xl">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/70">{text}</p>
      <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <Check size={15} className="mt-0.5 shrink-0 text-secondary" /> {p}
          </li>
        ))}
      </ul>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
        {action}
        <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}
