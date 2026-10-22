import { Instagram } from "lucide-react";
import { useLang } from "@/lib/i18n";

// ADELANTO DE INSTAGRAM: fotos fijas que llevan al perfil. Para cambiarlas, editar `posts`.
// (No es el feed en vivo: mostrarlo en vivo requiere conectar la cuenta de Instagram a una API.)
export const INSTAGRAM_USER = "crisilbol";
const PROFILE = `https://www.instagram.com/${INSTAGRAM_USER}/`;

const posts = [
  "/images/fernetglass/fernetglass-fondo-negro.webp",
  "/images/redes/ig-linea.webp",
  "/images/halloween/vaso-halloween-2026.webp",
  "/images/fernetglass/fernetglass-fondo-claro.webp",
  "/images/redes/ig-logo.webp",
];

export function InstagramPeek() {
  const { t } = useLang();
  return (
    <section id="instagram" className="scroll-mt-4 bg-card px-5 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-primary">{t("Síguenos", "Follow us")}</p>
            <h2 className="display text-5xl leading-none md:text-6xl">@{INSTAGRAM_USER}</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">{t("Lanzamientos, pedidos especiales y el día a día de la fábrica.", "Launches, special orders and everyday life at the factory.")}</p>
          </div>
          <a href={PROFILE} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 bg-primary px-6 py-4 text-xs font-bold uppercase text-primary-foreground hover:opacity-90">
            <Instagram size={16} /> {t("Ver en Instagram", "View on Instagram")}
          </a>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {posts.map((src) => (
            <a key={src} href={PROFILE} target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden bg-muted" aria-label={t("Abrir Instagram de CRISIL", "Open CRISIL Instagram")}>
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 flex items-center justify-center bg-primary/0 opacity-0 transition group-hover:bg-primary/40 group-hover:opacity-100">
                <Instagram className="text-white" size={26} />
              </span>
            </a>
          ))}
          <a href={PROFILE} target="_blank" rel="noopener noreferrer" className="flex aspect-square flex-col items-center justify-center gap-2 bg-primary p-3 text-center text-primary-foreground hover:opacity-90">
            <Instagram size={28} />
            <span className="text-xs font-bold uppercase">{t("Ver más", "See more")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
