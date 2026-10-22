import { useEffect, useRef, useState, type ReactNode } from "react";

// Hace que un bloque aparezca suavemente cuando entra en pantalla al hacer scroll.
// variant "up": sube y aparece. "pop": crece desde un poco más chico (efecto ventana emergente).
// Si la persona tiene activado "reducir movimiento" en su equipo, aparece sin animación.

export function useInView<T extends Element>(threshold = 0.2, once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);
  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "pop" | "fade";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const hidden = variant === "pop" ? "opacity-0 scale-[.92] translate-y-6" : variant === "fade" ? "opacity-0" : "opacity-0 translate-y-8";
  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${inView ? "translate-y-0 scale-100 opacity-100" : hidden} ${className}`}
    >
      {children}
    </div>
  );
}

// Número que cuenta desde 0 hasta el valor final cuando aparece en pantalla.
export function CountUp({ to, prefix = "", suffix = "", duration = 1600 }: { to: number; prefix?: string | undefined; suffix?: string | undefined; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reduce = false;
    }
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
