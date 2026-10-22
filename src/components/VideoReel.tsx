import { useEffect, useRef } from "react";
import { useLang } from "@/lib/i18n";

// VIDEOS: clips cortos, sin sonido, que se reproducen solos cuando aparecen en pantalla.
// Para agregar uno, subir el .mp4 y su foto de portada (.webp) a /public/videos y sumarlo a `videos`.
const videos: { src: string; es: string; en: string }[] = [
  { src: "soplado", es: "Soplado a mano", en: "Hand-blown" },
  { src: "templado", es: "Templado de vasos", en: "Tempering line" },
  { src: "fabrica-a-tu-mesa", es: "De la fábrica a tu mesa", en: "From our factory to your table" },
  { src: "empacando", es: "Empacando pedidos", en: "Packing orders" },
  { src: "del-valle", es: "Nuestros envases en góndola", en: "Our jars on the shelf" },
  { src: "presentacion", es: "CRISIL, cristalería de mesa", en: "CRISIL tableware" },
];

function AutoVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduce = false;
    }
    if (reduce) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);
  return (
    <figure className="w-[62vw] max-w-[260px] shrink-0 snap-start md:w-auto md:max-w-none">
      <div className="aspect-[9/16] overflow-hidden bg-muted">
        <video ref={ref} src={`/videos/${src}.mp4`} poster={`/videos/${src}.webp`} muted loop playsInline preload="none" aria-label={label} className="h-full w-full object-cover" />
      </div>
      <figcaption className="mt-3 text-sm font-semibold">{label}</figcaption>
    </figure>
  );
}

export function VideoReel() {
  const { lang, t } = useLang();
  return (
    <section id="videos" className="scroll-mt-4 bg-background px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <p className="mb-3 text-xs font-bold uppercase text-primary">{t("CRISIL en video", "CRISIL on video")}</p>
        <h2 className="display text-5xl leading-none md:text-6xl">{t("Así trabajamos todos los días", "How we work every day")}</h2>
        <div className="-mx-5 mt-10 flex snap-x gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
          {videos.map((v) => (
            <AutoVideo key={v.src} src={v.src} label={lang === "en" ? v.en : v.es} />
          ))}
        </div>
      </div>
    </section>
  );
}
