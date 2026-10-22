import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Oferta de pronta entrega en Santa Cruz (stock limitado).
// Para cambiar precios, cantidades o stock, editar solo este bloque.
const STOCK_TOTAL = 60;

const tiers = [
  {
    id: "unidad",
    label: "Por unidad",
    price: 60,
    range: "1 a 9 unidades",
    note: "Pronta entrega en Santa Cruz",
    message: "Hola, quisiera comprar Fernetera(s) CRISIL de pronta entrega. Cantidad: ",
  },
  {
    id: "cantidad",
    label: "Por cantidad",
    price: 45,
    range: "Desde 10 unidades",
    note: "Ideal para regalos de equipo o reventa",
    message: "Hola, quisiera comprar Fernetera(s) CRISIL por cantidad (desde 10 unidades). Cantidad: ",
    highlight: true,
  },
  {
    id: "logo",
    label: "Con tu logo",
    price: 80,
    range: "Desde 25 unidades",
    note: "Personalizado para tu empresa · plazo a coordinar",
    message: "Hola, quisiera cotizar Fernetera(s) CRISIL personalizadas con el logo de mi empresa (desde 25 unidades). Empresa: ",
  },
];

export function FernetStock({ whatsapp }: { whatsapp: string }) {
  const open = (message: string) =>
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

  return (
    <section id="fernet" className="bg-muted px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16">
        <div className="mx-auto w-full max-w-md overflow-hidden bg-card lg:max-w-none">
          <img
            src="/images/regalos-fernetera.jpg"
            alt="Vaso fernet CRISIL en caja de regalo"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-bottom"
          />
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase text-primary">Pronta entrega · Santa Cruz</p>
          <h2 className="display text-5xl leading-none md:text-6xl">Fernetera CRISIL</h2>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Vaso fernet de vidrio artesanal boliviano en caja de regalo, listo para regalar. Stock limitado de {STOCK_TOTAL} unidades.
          </p>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {tiers.map((t) => (
              <article
                key={t.id}
                className={`flex flex-col border p-5 ${t.highlight ? "border-primary bg-card" : "border-border bg-card"}`}
              >
                <p className="text-xs font-bold uppercase text-primary">{t.label}</p>
                <p className="display mt-3 text-5xl leading-none">
                  {t.price} <span className="text-xl">Bs</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">por unidad</p>
                <p className="mt-4 text-sm font-semibold">{t.range}</p>
                <p className="mt-1 flex-1 text-xs leading-5 text-muted-foreground">{t.note}</p>
                <Button variant={t.highlight ? "default" : "outline"} className="mt-5 w-full" onClick={() => open(t.message)}>
                  {t.id === "logo" ? "Cotizar" : "Pedir"} <ArrowRight size={14} />
                </Button>
              </article>
            ))}
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-primary">
            <Check size={14} /> Pedidos con logo: pedido mínimo de 25 unidades
          </p>
        </div>
      </div>
    </section>
  );
}
