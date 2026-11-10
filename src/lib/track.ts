// Métricas de la landing: guarda visitas, clics y pedidos de cotización en la base de Crisil.OS
// (tabla `landing_events`). La llave de abajo es pública por diseño: solo permite INSERTAR en esa tabla.
// Si algo falla, nunca rompe la página.
const URL = "https://gktgxefhamnvzkvyqywb.supabase.co/rest/v1/landing_events";
const KEY = "sb_publishable_uT-99Y3n7TcZp8fufPzjXQ_WLcDCnyY";

export type TrackEvent = "visita" | "clic_whatsapp" | "cotizacion_rapida" | "cotizacion_configurador" | "pedido_reunion";

function sessionId(): string {
  try {
    let id = sessionStorage.getItem("crisil_sid");
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("crisil_sid", id);
    }
    return id;
  } catch {
    return "sin-sesion";
  }
}

export function track(event: TrackEvent, label?: string, data?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) return; // no contar pruebas locales
  try {
    const q = new URLSearchParams(window.location.search);
    const body = {
      event,
      label: label?.slice(0, 120) ?? null,
      session_id: sessionId(),
      device: window.innerWidth < 768 ? "celular" : "compu",
      lang: document.documentElement.lang?.slice(0, 5) || null,
      referrer: document.referrer.slice(0, 300) || null,
      utm_source: q.get("utm_source")?.slice(0, 80) ?? null,
      utm_campaign: q.get("utm_campaign")?.slice(0, 80) ?? null,
      data: data ?? null,
    };
    void fetch(URL, {
      method: "POST",
      keepalive: true,
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(body),
    }).catch(() => {});
  } catch {
    /* nunca romper la página por las métricas */
  }
}

// Cuenta la visita y cualquier clic en un enlace de WhatsApp de la página.
export function startTracking() {
  if (typeof window === "undefined") return () => {};
  track("visita");
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement | null)?.closest?.("a[href*='wa.me']") as HTMLAnchorElement | null;
    if (a && !a.dataset["noTrack"]) track("clic_whatsapp", (a.dataset["track"] || a.textContent || "").trim());
  };
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}
