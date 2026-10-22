import { ArrowRight } from "lucide-react";
import { HALLOWEEN_OFFER, LOGO_CUTOFF } from "@/lib/offers";
import { useLang } from "@/lib/i18n";

export function HalloweenPromo({ whatsapp }: { whatsapp: string }) {
  const { t } = useLang();
  const message =
    "Hola, quisiera cotizar el Vaso Fernetero CRISIL de Halloween 2026 con el logo de mi empresa, para entrega antes de Halloween. Empresa: ";
  const open = () =>
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");

  return (
    <section id="halloween" className="bg-[#141414] px-5 py-20 text-white md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="mx-auto w-full max-w-md overflow-hidden lg:order-2 lg:max-w-none">
          <img
            src="/images/halloween/vaso-halloween-2026.webp"
            alt={t("Vaso Fernetero CRISIL con diseño de calabaza de Halloween 2026 y espacio para el logo de tu empresa", "CRISIL fernet glass with a Halloween 2026 pumpkin design and space for your company logo")}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-center"
          />
        </div>

        <div className="lg:order-1">
          <p className="mb-4 inline-block bg-[#F28C28] px-3 py-1 text-xs font-bold uppercase text-[#141414]">
            {t("Halloween 2026 · Cupos limitados", "Halloween 2026 · Limited spots")}
          </p>
          <h2 className="display text-5xl leading-[.95] md:text-7xl">
            {t("Tu logo, ", "Your logo, ")}<span className="text-[#F28C28]">{t("tu calabaza", "your pumpkin")}</span>{t(", tu vaso", ", your glass")}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/80">
            {t("Sorprende a tu equipo y a tus clientes con un vaso de vidrio soplado en Bolivia, con el logo de tu empresa y un diseño de Halloween hecho para ti.", "Surprise your team and clients with a glass hand-blown in Bolivia, with your company logo and a Halloween design made for you.")}
          </p>

          {HALLOWEEN_OFFER && (
            <p className="mt-5 inline-block border border-[#F28C28] px-4 py-2 text-sm font-bold text-[#F28C28]">{HALLOWEEN_OFFER}</p>
          )}

          <ul className="mt-6 space-y-2 text-sm text-white/80">
            <li>• {t("Pedidos desde 25 unidades", "Orders from 25 units")}</li>
            <li>• {t("Entrega antes de Halloween", "Delivered before Halloween")}{LOGO_CUTOFF ? ` · ${t("pedidos hasta el", "order by")} ${LOGO_CUTOFF}` : ""}</li>
            <li>• {t("Incluye caja de regalo", "Gift box included")}</li>
          </ul>

          <button
            type="button"
            onClick={open}
            className="mt-9 inline-flex items-center gap-2 bg-[#F28C28] px-7 py-4 text-sm font-bold uppercase text-[#141414] transition-opacity hover:opacity-90"
          >
            {t("Cotizar mi vaso de Halloween", "Quote my Halloween glass")} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
