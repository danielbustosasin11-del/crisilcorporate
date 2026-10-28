import { useEffect, useState } from "react";
import { ArrowRight, Factory, Layers, MessageCircle, PackageCheck, TrendingDown, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { LEAD_TIMES, OFFERS, WHATSAPP } from "@/lib/offers";
import { Reveal } from "@/components/Reveal";

// GANCHOS para compradores mayoristas: somos fabricantes, venta por mayor, stock estable, más cantidad = mejor precio.
// Va justo después de la portada. También exporta el botón flotante de WhatsApp que acompaña toda la página.

const HOOK_MSG = encodeURIComponent("Hola, busco proveedor directo de cristalería. Quisiera precios por mayor. Producto y cantidad: ");

export function WholesaleHooks({ onCatalog }: { onCatalog: () => void }) {
  const { lang, t } = useLang();
  const L = lang === "en" ? 1 : 0;
  const tiles = [
    { Icon: Factory, title: t("Somos fabricantes", "We are the manufacturer"), text: t("Soplamos el vidrio en nuestra planta de Cochabamba desde hace más de 30 años. Sin intermediarios.", "We blow the glass in our own Cochabamba plant, for 30+ years. No middlemen.") },
    { Icon: Layers, title: t("Venta por mayor", "Wholesale"), text: t(`Envases por docena (${OFFERS.envases.minLabel[0].toLowerCase()}). Regalos corporativos ${OFFERS.regalos.minLabel[0].toLowerCase()}.`, `Packaging by the dozen (${OFFERS.envases.minLabel[1].toLowerCase()}). Corporate gifts ${OFFERS.regalos.minLabel[1].toLowerCase()}.`) },
    { Icon: PackageCheck, title: t("Stock estable", "Steady stock"), text: t("Modelos que fabricamos todo el año, para que puedas volver a pedir lo mismo sin sorpresas.", "Models we make all year round, so you can reorder the same thing without surprises.") },
    { Icon: TrendingDown, title: t("Más cantidad, mejor precio", "More volume, better price"), text: t("Precio directo de fábrica: mientras más pides, menos pagas por unidad.", "Factory-direct pricing: the more you order, the less you pay per unit.") },
  ];
  return (
    <section id="mayoristas" className="scroll-mt-4 border-b border-border bg-card px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Directo de fábrica · Precios por mayor", "Factory direct · Wholesale prices")}</p>
          <h2 className="display max-w-4xl text-4xl leading-[1.02] md:text-6xl">
            {t("¿No encuentras proveedor directo de cristalería en Santa Cruz?", "Can't find a direct glassware supplier in Bolivia?")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("Te vendemos directo de fábrica, con los mejores precios y stock estable. Enviamos a Santa Cruz y a todo Bolivia.", "We sell straight from the factory, with the best prices and steady stock. We ship to Santa Cruz and all of Bolivia.")}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map(({ Icon, title, text }, i) => (
            <Reveal key={title} variant="pop" delay={i * 110} className="bg-card p-6 md:p-7">
              <Icon className="text-primary" size={26} strokeWidth={1.6} />
              <h3 className="display mt-4 text-2xl leading-tight">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-muted-foreground">
          {LEAD_TIMES.map((x) => (
            <span key={x[0]} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {x[L]}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`https://wa.me/${WHATSAPP}?text=${HOOK_MSG}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary px-6 py-4 text-xs font-bold uppercase text-primary-foreground hover:opacity-90">
            {t("Pedir precios por mayor", "Get wholesale prices")} <MessageCircle size={15} />
          </a>
          <button type="button" onClick={onCatalog} className="inline-flex items-center gap-2 border border-border px-6 py-4 text-xs font-bold uppercase text-primary hover:bg-muted">
            {t("Ver catálogo", "See the catalog")} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

// Botón flotante: aparece al pasar la portada, con un gancho corto. Se puede cerrar el texto.
export function WhatsAppFloat() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  const [bubble, setBubble] = useState(true);
  const [hideForForm, setHideForForm] = useState(false);
  // La burbuja se esconde sola a los 10 segundos; todo el botón se esconde mientras se llena el formulario
  useEffect(() => {
    const id = window.setTimeout(() => setBubble(false), 10000);
    const obs = new IntersectionObserver((e) => setHideForForm(e.some((x) => x.isIntersecting)), { threshold: 0.05 });
    const watch = () => {
      const el = document.querySelector("#configurador");
      if (el) obs.observe(el);
    };
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(id);
      obs.disconnect();
      mo.disconnect();
    };
  }, []);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed bottom-4 right-4 z-40 flex items-end gap-2 transition-all duration-500 md:bottom-6 md:right-6 ${show && !hideForForm ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}>
      {bubble && (
        <div className="relative max-w-[210px] rounded-lg border border-border bg-card px-4 py-3 text-xs leading-5 shadow-lg">
          <button type="button" onClick={() => setBubble(false)} aria-label={t("Cerrar", "Close")} className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <X size={11} />
          </button>
          <strong className="block text-primary">{t("Precios directo de fábrica", "Factory-direct prices")}</strong>
          {t("Cotiza por mayor en minutos.", "Get a wholesale quote in minutes.")}
        </div>
      )}
      <a href={`https://wa.me/${WHATSAPP}?text=${HOOK_MSG}`} target="_blank" rel="noopener noreferrer" aria-label={t("Escribir por WhatsApp", "Message us on WhatsApp")} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105">
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
