import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Idioma de la página: español o inglés.
// La primera vez que alguien entra se le pregunta; la elección se recuerda en su navegador.
export type Lang = "es" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (es: string, en: string) => string; asked: boolean };

const LangContext = createContext<Ctx>({ lang: "es", setLang: () => {}, t: (es) => es, asked: true });

const KEY = "crisil-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const [asked, setAsked] = useState(true);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(KEY);
    } catch {
      saved = null;
    }
    if (saved === "es" || saved === "en") {
      setLangState(saved);
    } else {
      // Sugerencia según el idioma del navegador, pero igual se pregunta
      if (navigator.language && !navigator.language.toLowerCase().startsWith("es")) setLangState("en");
      setAsked(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    setAsked(true);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      /* sin almacenamiento: se elige de nuevo en la próxima visita */
    }
  };

  const t = (es: string, en: string) => (lang === "en" ? en : es);

  return <LangContext.Provider value={{ lang, setLang, t, asked }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

// Traducción automática de fichas técnicas escritas en español (para productos sin versión en inglés)
const SPEC_WORDS: [RegExp, string][] = [
  [/Diámetro mayor/gi, "Max diameter"],
  [/Diámetro/gi, "Diameter"],
  [/Altura/gi, "Height"],
  [/Alto/gi, "Height"],
  [/Peso/gi, "Weight"],
  [/Capacidad/gi, "Capacity"],
  [/Tapa metálica/gi, "Metal lid"],
  [/Tapa plástica/gi, "Plastic lid"],
  [/Tapa/gi, "Lid"],
  [/aprox\./gi, "approx."],
  [/\bde\b/gi, "of"],
];
export function translateSpec(s: string) {
  return SPEC_WORDS.reduce((acc, [re, en]) => acc.replace(re, en), s);
}

export function LanguageGate() {
  const { asked, setLang } = useLang();
  if (asked) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Idioma / Language">
      <div className="w-full max-w-sm bg-background p-8 text-center">
        <img src="/images/logo-crisil.png" alt="CRISIL" className="mx-auto h-14 w-14 object-contain" />
        <p className="display mt-4 text-3xl">¿En qué idioma?</p>
        <p className="text-sm text-muted-foreground">Which language would you like?</p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <button type="button" onClick={() => setLang("es")} className="border border-primary bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90">
            Español
          </button>
          <button type="button" onClick={() => setLang("en")} className="border border-primary px-4 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground">
            English
          </button>
        </div>
      </div>
    </div>
  );
}

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center text-xs font-bold ${className}`} role="group" aria-label="Idioma / Language">
      <button type="button" onClick={() => setLang("es")} aria-pressed={lang === "es"} className={`px-2 py-1 ${lang === "es" ? "underline underline-offset-4" : "opacity-60 hover:opacity-100"}`}>
        ES
      </button>
      <span className="opacity-40">/</span>
      <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"} className={`px-2 py-1 ${lang === "en" ? "underline underline-offset-4" : "opacity-60 hover:opacity-100"}`}>
        EN
      </button>
    </div>
  );
}
