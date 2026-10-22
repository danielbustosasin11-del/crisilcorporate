import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { WHATSAPP } from "@/lib/offers";

// CASO REAL: regalos corporativos para Laboratorios COFAR por el Día del Médico.
const doctors = ["/images/cofar/medico-1.webp", "/images/cofar/medico-2.webp", "/images/cofar/medico-3.webp", "/images/cofar/medico-4.webp"];

export function CaseStudy() {
  const { t } = useLang();
  const msg = encodeURIComponent("Hola, vi el caso de COFAR por el Día del Médico y quisiera cotizar un regalo corporativo similar para mi empresa. Empresa: ");
  return (
    <section id="casos" className="scroll-mt-4 bg-card px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Caso real · Laboratorios COFAR", "Real case · COFAR Laboratories")}</p>
            <h2 className="display text-5xl leading-none md:text-6xl">{t("Un regalo para cada médico, con la marca de su laboratorio", "A gift for every doctor, with their lab's brand")}</h2>
          </div>
          <p className="max-w-xl text-muted-foreground lg:justify-self-end">
            {t(
              "Para el Día del Médico, COFAR regaló a médicos de todo el país un vaso de vidrio soplado con el logo de Novadol Forte, en una caja con el mensaje «Feliz día del Médico». Así lo recibieron:",
              "For Doctor's Day, COFAR gave doctors across the country a hand-blown glass with the Novadol Forte logo, in a box reading «Happy Doctor's Day». This is how they received it:",
            )}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {doctors.map((src, i) => (
            <div key={src} className="aspect-[3/4] overflow-hidden bg-muted">
              <img src={src} alt={t(`Médico recibiendo su regalo de COFAR (${i + 1})`, `Doctor receiving their COFAR gift (${i + 1})`)} loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <a
          href={`https://wa.me/${WHATSAPP}?text=${msg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 bg-primary px-6 py-4 text-xs font-bold uppercase text-primary-foreground hover:opacity-90"
        >
          {t("Quiero algo así para mi empresa", "I want this for my company")} <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
