import { useState } from "react";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { WHATSAPP } from "@/lib/offers";
import { track } from "@/lib/track";

// Cotización rápida: 3 toques y se abre WhatsApp con el pedido ya escrito.
// Pensado para el comprador apurado (muchos frascos, regalos de fin de año) y para quien prefiere una reunión.

const NEEDS: { id: string; es: string; en: string; qty: string[]; unit: [string, string] }[] = [
  { id: "regalos", es: "Regalos corporativos con logo", en: "Corporate gifts with logo", qty: ["25–50", "50–100", "100–300", "300+"], unit: ["unidades", "units"] },
  { id: "envases", es: "Frascos y envases para mi marca", en: "Jars and packaging for my brand", qty: ["20–50", "50–200", "200–500", "500+"], unit: ["docenas", "dozens"] },
  { id: "mayorista", es: "Cristalería al por mayor", en: "Wholesale glassware", qty: ["10–50", "50–200", "200–500", "500+"], unit: ["unidades", "units"] },
];

export function QuickQuote() {
  const { t, lang } = useLang();
  const L = lang === "en";
  const [need, setNeed] = useState("regalos");
  const [qty, setQty] = useState("");
  const [company, setCompany] = useState("");
  const n = NEEDS.find((x) => x.id === need) ?? NEEDS[0]!;

  const open = (msg: string) => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  const send = () => {
    track("cotizacion_rapida", n.es, { cantidad: qty || "sin definir", empresa: company.slice(0, 80) });
    open(`Hola, quisiera una cotización de CRISIL.\n\nNecesito: ${n.es}\nCantidad aproximada: ${qty ? `${qty} ${n.unit[0]}` : "por definir"}\nEmpresa: ${company || "—"}`);
  };
  const meeting = () => {
    track("pedido_reunion", n.es, { empresa: company.slice(0, 80) });
    open(`Hola, quisiera agendar una reunión con CRISIL (presencial en Santa Cruz o videollamada).\n\nTema: ${n.es}\nEmpresa: ${company || "—"}\nDías y horarios que me sirven: `);
  };

  const chip = (on: boolean) =>
    `border px-4 py-2.5 text-sm font-semibold transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background text-foreground hover:border-primary"}`;

  return (
    <section id="cotizar" className="scroll-mt-4 border-b border-border bg-muted px-5 py-12 md:px-10 md:py-14">
      <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[0.8fr_1.6fr] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase text-primary">{t("Cotización rápida", "Quick quote")}</p>
          <h2 className="display mt-2 text-3xl md:text-4xl">{t("Cotizá en 30 segundos", "Get a quote in 30 seconds")}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {t("Directo de fábrica, sin intermediarios. Te respondemos por WhatsApp con precio según tu volumen.", "Factory direct, no middlemen. We reply on WhatsApp with pricing for your volume.")}
          </p>
        </div>
        <div className="border border-border bg-background p-5 md:p-7">
          <p className="text-xs font-bold uppercase text-muted-foreground">1. {t("¿Qué necesitás?", "What do you need?")}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {NEEDS.map((x) => (
              <button key={x.id} type="button" className={chip(x.id === need)} onClick={() => { setNeed(x.id); setQty(""); }}>
                {L ? x.en : x.es}
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs font-bold uppercase text-muted-foreground">2. {t("Cantidad aproximada", "Approximate quantity")} ({L ? n.unit[1] : n.unit[0]})</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {n.qty.map((q) => (
              <button key={q} type="button" className={chip(q === qty)} onClick={() => setQty(q)}>
                {q}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-end">
            <label className="flex-1 text-xs font-bold uppercase text-muted-foreground">
              3. {t("Tu empresa o marca (opcional)", "Your company or brand (optional)")}
              <input value={company} onChange={(e) => setCompany(e.target.value)} maxLength={80} className="mt-2 h-12 w-full border border-input bg-background px-4 text-base font-normal text-foreground" />
            </label>
            <button type="button" onClick={send} className="inline-flex h-12 items-center justify-center gap-2 bg-[#1f8f4e] px-6 text-sm font-bold uppercase text-white hover:bg-[#19793f]">
              <MessageCircle size={17} /> {t("Recibir cotización por WhatsApp", "Get quote on WhatsApp")} <ArrowRight size={15} />
            </button>
          </div>
          <button type="button" onClick={meeting} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <CalendarDays size={16} /> {t("Prefiero agendar una reunión o videollamada", "I'd rather schedule a meeting or video call")}
          </button>
        </div>
      </div>
    </section>
  );
}

// Botón flotante de WhatsApp, siempre visible.
export function WhatsAppFab() {
  const { t } = useLang();
  const msg = encodeURIComponent("Hola, quisiera una cotización de CRISIL. Necesito: ");
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      data-track="Botón flotante"
      aria-label={t("Escribinos por WhatsApp", "Message us on WhatsApp")}
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-[#1f8f4e] px-5 text-sm font-bold text-white shadow-lg shadow-black/25 hover:bg-[#19793f]"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline">{t("Cotizar por WhatsApp", "Quote on WhatsApp")}</span>
    </a>
  );
}
