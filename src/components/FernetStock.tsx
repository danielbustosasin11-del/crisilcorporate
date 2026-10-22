import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Oferta FernetGlass de pronta entrega en Santa Cruz (stock limitado).
// Para cambiar precios, stock, fecha de llegada o fotos, editar solo este bloque.
const STOCK_TOTAL = 60;
const ARRIVAL = "22 de octubre"; // cuando lleguen, cambiar a: "Pronta entrega"

const photos = [
  { src: "/images/fernetglass/fernetglass-ficha.webp", alt: "FernetGlass con su caja de regalo" },
  { src: "/images/fernetglass/fernetglass-fondo-claro.webp", alt: "Vaso FernetGlass de vidrio artesanal" },
  { src: "/images/fernetglass/fernetglass-fondo-negro.webp", alt: "Vaso FernetGlass sobre fondo oscuro" },
];

const specs = ["Altura: 15 cm", "Capacidad: 600 ml", "Peso: 500 g", "Incluye caja"];

const tiers = [
  {
    id: "unidad",
    label: "Por unidad",
    price: 60,
    range: "1 a 9 unidades",
    note: "Con su caja de regalo",
    message: "Hola, quisiera reservar FernetGlass de CRISIL (llegada 22 de octubre). Cantidad: ",
  },
  {
    id: "cantidad",
    label: "Por cantidad",
    price: 45,
    range: "Desde 10 unidades",
    note: "Ideal para regalos de equipo o reventa",
    message: "Hola, quisiera reservar FernetGlass de CRISIL por cantidad (desde 10 unidades). Cantidad: ",
    highlight: true,
  },
  {
    id: "logo",
    label: "Con tu logo",
    price: 80,
    range: "Desde 25 unidades",
    note: "Personalizado para tu empresa · plazo a coordinar",
    message: "Hola, quisiera cotizar FernetGlass de CRISIL personalizados con el logo de mi empresa (desde 25 unidades). Empresa: ",
  },
];

export function FernetStock({ whatsapp }: { whatsapp: string }) {
  const [photo, setPhoto] = useState(0);
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
                aria-label={`Ver foto ${i + 1}`}
                className={`aspect-square overflow-hidden border bg-card ${i === photo ? "border-primary" : "border-border opacity-70"}`}
              >
                <img src={p.src} alt="" loading="lazy" className="h-full w-full object-cover object-center" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase text-primary">Llega a Santa Cruz · {ARRIVAL}</p>
          <h2 className="display text-5xl leading-none md:text-6xl">FernetGlass</h2>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Vidrio auténtico soplado con pasión en Bolivia, en su caja de regalo. Stock limitado de {STOCK_TOTAL} unidades: reserva el tuyo.
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-foreground/80">
            {specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
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
                  {t.id === "logo" ? "Cotizar" : "Reservar"} <ArrowRight size={14} />
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
