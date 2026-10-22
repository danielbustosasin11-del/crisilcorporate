import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

// "¿Qué estás buscando crear?": las dos tarjetas aparecen con efecto pop al llegar a la sección.
// No es una ventana emergente: es parte de la página. Si la persona la cierra, se pliega y la página sigue.

export function PathChooser({ onGifts, onPackaging, nextId }: { onGifts: () => void; onPackaging: () => void; nextId: string }) {
  const { t } = useLang();
  const [closed, setClosed] = useState(false);

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
                "Vasos, copas, jarras y sets con tu logo, en caja de regalo, para clientes, colaboradores o fechas especiales. Como los que entregamos a médicos de todo el país para Laboratorios COFAR.",
                "Glasses, goblets, pitchers and sets with your logo, in a gift box, for clients, staff or special dates. Like the ones we delivered to doctors nationwide for COFAR Laboratories.",
              )}
              image="/images/cofar/entrega.webp"
              imageClassName="object-[50%_70%]"
              action={t("Ver regalos corporativos", "See corporate gifts")}
              onClick={onGifts}
            />
          </Reveal>
          <Reveal variant="pop" delay={350}>
            <Card
              index="02"
              title={t("Vidrio para tu marca", "Glass for your brand")}
              text={t(
                "Tu proveedor de botellas y frascos de vidrio para marcas de alimentos, bebidas, cosmética y restaurantes. Marcas como Del Valle ya llegan a la góndola en nuestros envases.",
                "Your supplier of glass bottles and jars for food, beverage and cosmetics brands, and restaurants. Brands like Del Valle already reach store shelves in our packaging.",
              )}
              image="/images/marcas/del-valle-gondola.webp"
              imageClassName="object-center"
              action={t("Ver botellas y frascos", "See bottles and jars")}
              onClick={onPackaging}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Card({ index, title, text, action, image, imageClassName, onClick }: { index: string; title: string; text: string; action: string; image: string; imageClassName: string; onClick: () => void }) {
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
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
        {action}
        <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1" />
      </span>
    </button>
  );
}
