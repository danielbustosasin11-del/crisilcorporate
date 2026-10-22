import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { WHATSAPP } from "@/lib/offers";
import { Reveal } from "@/components/Reveal";

// CRISIL x COFAR: regalo corporativo por el Día del Médico. Las fotos cambian solas o con las flechas.
const photos = ["/images/cofar/medico-1.webp", "/images/cofar/medico-2.webp", "/images/cofar/medico-3.webp", "/images/cofar/medico-4.webp"];

export function CaseStudy() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n: number) => setI((n + photos.length) % photos.length);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setI((c) => (c + 1) % photos.length), 4000);
    return () => window.clearInterval(id);
  }, [paused]);

  const msg = encodeURIComponent("Hola, vi el caso CRISIL x COFAR y quisiera cotizar un regalo corporativo similar para mi empresa. Empresa: ");

  return (
    <section id="casos" className="scroll-mt-4 bg-card px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
        <Reveal>
          <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Caso real · Día del Médico", "Real case · Doctor's Day")}</p>
          <h2 className="display text-6xl leading-none md:text-7xl">CRISIL × COFAR</h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">
            {t(
              "Para el Día del Médico, Laboratorios COFAR regaló a médicos de todo el país un vaso soplado a mano con el logo de Novadol Forte, en caja «Feliz día del Médico».",
              "For Doctor's Day, COFAR Laboratories gave doctors across the country a hand-blown glass with the Novadol Forte logo, in a «Happy Doctor's Day» box.",
            )}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${msg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-4 text-xs font-bold uppercase text-primary-foreground hover:opacity-90"
          >
            {t("Quiero algo así para mi empresa", "I want this for my company")} <ArrowRight size={15} />
          </a>
        </Reveal>

        <Reveal variant="pop" delay={150}>
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden bg-muted" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {photos.map((src, n) => (
              <img
                key={src}
                src={src}
                alt={t(`Médico recibiendo su regalo de COFAR (${n + 1} de ${photos.length})`, `Doctor receiving their COFAR gift (${n + 1} of ${photos.length})`)}
                loading={n === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out motion-reduce:transition-none ${n === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-4">
              <button type="button" onClick={() => go(i - 1)} aria-label={t("Foto anterior", "Previous photo")} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-primary hover:bg-white">
                <ArrowLeft size={16} />
              </button>
              <div className="flex gap-1.5">
                {photos.map((src, n) => (
                  <button key={src} type="button" onClick={() => setI(n)} aria-label={`${t("Foto", "Photo")} ${n + 1}`} className={`h-2 rounded-full bg-white transition-all ${n === i ? "w-6" : "w-2 opacity-60"}`} />
                ))}
              </div>
              <button type="button" onClick={() => go(i + 1)} aria-label={t("Foto siguiente", "Next photo")} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-primary hover:bg-white">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
