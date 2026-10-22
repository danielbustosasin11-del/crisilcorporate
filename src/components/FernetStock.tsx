import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ARRIVAL, LOGO_CUTOFF, STOCK_TOTAL } from "@/lib/offers";
import { useLang } from "@/lib/i18n";

// Vaso Fernetero CRISIL. Los precios NO se muestran: se cotizan por WhatsApp.

const photos = [
  { src: "/images/fernetglass/fernetglass-ficha.webp", alt: "Vaso Fernetero CRISIL con su caja de regalo" },
  { src: "/images/fernetglass/fernetglass-fondo-claro.webp", alt: "Vaso Fernetero CRISIL de vidrio artesanal" },
  { src: "/images/fernetglass/fernetglass-fondo-negro.webp", alt: "Vaso Fernetero CRISIL sobre fondo oscuro" },
];

const specs: [string, string][] = [["Altura: 15 cm", "Height: 15 cm"], ["Capacidad: 600 ml", "Capacity: 600 ml"], ["Peso: 500 g", "Weight: 500 g"], ["Incluye caja", "Gift box included"]];

const tiers = [
  {
    id: "unidad",
    label: ["Pedido por unidad", "Single order"],
    range: ["1 a 12 unidades", "1 to 12 units"],
    note: ["Con su caja de regalo", "With its gift box"],
    message: "Hola, quisiera reservar Vaso Fernetero CRISIL (llegada 22 de octubre). Cantidad: ",
  },
  {
    id: "mayorista",
    label: ["Pedido mayorista", "Wholesale order"],
    range: ["Desde 24 unidades", "From 24 units"],
    note: ["2 docenas o más · ideal para regalos de equipo, eventos o reventa", "2 dozen or more · ideal for team gifts, events or resale"],
    message: "Hola, quisiera cotizar Vaso Fernetero CRISIL al por mayor (desde 24 unidades). Cantidad: ",
    highlight: true,
  },
  {
    id: "logo",
    label: ["Personalizado con tu logo", "Custom with your logo"],
    range: ["Desde 25 unidades", "From 25 units"],
    note: ["Pedido para entrega antes de Halloween", "Delivered before Halloween"],
    message: "Hola, quisiera cotizar Vaso Fernetero CRISIL personalizado con el logo de mi empresa, para entrega antes de Halloween (desde 25 unidades). Empresa: ",
  },
];

export function FernetStock({ whatsapp }: { whatsapp: string }) {
  const [photo, setPhoto] = useState(0);
  const { lang, t } = useLang();
  const tr = t;
  const L = lang === "en" ? 1 : 0;
  const open = (message: string) =>
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

  return (
    <section id="fernet" className="bg-muted px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-16">
        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden bg-card">
            {photos.map((p, i) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ${
                  i === photo ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setPhoto(i)}
                aria-label={`${t("Ver foto", "View photo")} ${i + 1}`}
                className={`aspect-square overflow-hidden border bg-card ${i === photo ? "border-primary" : "border-border opacity-70"}`}
              >
                <img src={p.src} alt="" loading="lazy" className="h-full w-full object-cover object-center" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase text-primary">{t(`Llega a Santa Cruz · ${ARRIVAL}`, "Arriving in Santa Cruz")}</p>
          <h2 className="display text-5xl leading-none md:text-6xl">{t("Vaso Fernetero CRISIL", "CRISIL Fernet Glass")}</h2>
          <p className="mt-5 max-w-xl text-muted-foreground">
            {t(`Vidrio auténtico soplado con pasión en Bolivia, en su caja de regalo. Stock limitado de ${STOCK_TOTAL} unidades: reserva el tuyo. Mientras más unidades, mejor precio por unidad.`, `Authentic glass hand-blown in Bolivia, in its gift box. Limited stock of ${STOCK_TOTAL} units: reserve yours. The more units, the better the unit price.`)}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-foreground/80">
            {specs.map((s) => (
              <li key={s[0]}>{s[L]}</li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {tiers.map((t) => (
              <article
                key={t.id}
                className={`flex flex-col border p-5 ${t.highlight ? "border-primary bg-card" : "border-border bg-card"}`}
              >
                <p className="text-xs font-bold uppercase text-primary">{t.label[L]}</p>
                <p className="display mt-3 text-3xl leading-tight">{t.range[L]}</p>
                <p className="mt-3 flex-1 text-xs leading-5 text-muted-foreground">{t.note[L]}</p>
                <Button variant={t.highlight ? "default" : "outline"} className="mt-5 w-full" onClick={() => open(t.message)}>
                  {t.id === "unidad" ? tr("Reservar", "Reserve") : tr("Cotizar", "Get a quote")} <ArrowRight size={14} />
                </Button>
              </article>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">{tr("¿Necesitas entre 13 y 23 unidades? Escríbenos y te armamos el precio.", "Need 13 to 23 units? Message us and we'll put a price together.")}</p>

          <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary">
            <Check size={14} /> {tr("Pedidos con tu logo: mínimo 25 unidades, para entrega antes de Halloween", "Orders with your logo: minimum 25 units, delivered before Halloween")}{LOGO_CUTOFF ? ` · ${tr("pedidos hasta el", "order by")} ${LOGO_CUTOFF}` : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
