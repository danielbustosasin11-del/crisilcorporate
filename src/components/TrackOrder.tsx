import { useState } from "react";
import { Search } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function TrackOrder() {
  const [code, setCode] = useState("");
  const { t } = useLang();

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    window.open(`https://crisil-erp.vercel.app/track/${trimmed}`, "_blank");
  }

  return (
    <section id="tracking" className="px-5 py-16 md:px-10 md:py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary-foreground/60">
              {t("Seguimiento en tiempo real", "Real-time tracking")}
            </p>
            <h2 className="display text-4xl leading-tight md:text-5xl mb-4">
              {t("Rastrea tu pedido", "Track your order")}
            </h2>
            <p className="text-primary-foreground/70 max-w-sm text-sm leading-7">
              {t("Ingresa el código que te envió tu ejecutivo de ventas y sigue cada etapa de tu pedido, desde producción hasta la entrega.", "Enter the code your sales representative sent you and follow every stage of your order, from production to delivery.")}
            </p>
          </div>

          {/* Right: form */}
          <div>
            <form onSubmit={handleTrack} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/40"
                />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="CRS-2026-0001"
                  className="w-full bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/40 pl-9 pr-4 py-3 text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <button
                type="submit"
                className="bg-white text-primary font-bold text-sm px-6 py-3 hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                {t("Ver estado", "Check status")} →
              </button>
            </form>
            <p className="mt-3 text-xs text-primary-foreground/40">
              {t("Tu código tiene el formato", "Your code looks like")} <span className="font-mono font-semibold text-primary-foreground/60">CRS-YYYY-XXXX</span>. {t("Lo recibes al confirmar tu pedido.", "You get it when your order is confirmed.")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
