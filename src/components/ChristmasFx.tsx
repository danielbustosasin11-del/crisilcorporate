import { useState, type MouseEvent } from "react";

// Animación navideña para la portada: nieve que cae, esferas colgantes que se balancean
// y estrellitas que brillan. Es interactiva: al pasar el mouse o tocar una esfera, se mece
// y suelta destellos; al tocar cualquier parte vacía del anuncio también salen destellos.
// Con "reducir movimiento" activado, todo queda quieto.

const ornaments = [
  { left: "52%", len: "16vh", size: 46, color: "#C8102E", delay: 0.2, hideMobile: true },
  { left: "60%", len: "28vh", size: 34, color: "#D4AF37", delay: 0.6, hideMobile: true },
  { left: "90%", len: "12vh", size: 52, color: "#D4AF37", delay: 0.4, hideMobile: false },
  { left: "97%", len: "24vh", size: 30, color: "#1F6F50", delay: 1.0, hideMobile: true },
  { left: "8%", len: "9vh", size: 32, color: "#C8102E", delay: 0.8, hideMobile: false },
];

const flakes = Array.from({ length: 34 }, (_, n) => ({
  left: (n * 37) % 100,
  size: 4 + ((n * 7) % 9),
  dur: 9 + ((n * 13) % 10),
  delay: -((n * 5) % 14),
  drift: ((n % 5) - 2) * 18,
  mobile: n % 2 === 0,
}));

const twinkles = [
  { left: "70%", top: "16%" }, { left: "82%", top: "30%" }, { left: "44%", top: "10%" },
  { left: "75%", top: "70%" }, { left: "95%", top: "60%" }, { left: "30%", top: "18%" },
];

type Burst = { id: number; x: number; y: number };

function Ornament({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="-20 -26 40 48" aria-hidden>
      <defs>
        <radialGradient id={`og-${color.slice(1)}`} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".85" />
          <stop offset="25%" stopColor={color} />
          <stop offset="100%" stopColor="#000" stopOpacity=".35" />
        </radialGradient>
      </defs>
      <rect x="-5" y="-25" width="10" height="7" rx="1.5" fill="#B8962E" />
      <circle cx="0" cy="0" r="19" fill={color} />
      <circle cx="0" cy="0" r="19" fill={`url(#og-${color.slice(1)})`} />
      <path d="M-17,4 Q0,10 17,4" stroke="#fff" strokeOpacity=".35" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function ChristmasFx() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [rung, setRung] = useState<Record<number, number>>({});

  const sparkle = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    setBursts((b) => [...b.slice(-6), { id, x, y }]);
    window.setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 900);
  };

  const fromEvent = (e: MouseEvent<HTMLElement>, el: HTMLElement) => {
    const r = el.closest(".xfx-root")?.getBoundingClientRect();
    if (r) sparkle(e.clientX - r.left, e.clientY - r.top);
  };

  const ring = (n: number, e: MouseEvent<HTMLButtonElement>) => {
    setRung((s) => ({ ...s, [n]: (s[n] ?? 0) + 1 }));
    fromEvent(e, e.currentTarget);
  };

  return (
    <div
      className="xfx-root absolute inset-0 z-[5] overflow-hidden"
      aria-hidden
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a,button")) return;
        fromEvent(e, e.currentTarget);
      }}
    >
      <style>{css}</style>
      {flakes.map((f, n) => (
        <span
          key={n}
          className={`xfx-flake ${f.mobile ? "" : "hidden md:block"}`}
          style={{ left: `${f.left}%`, width: f.size, height: f.size, ["--dur" as string]: `${f.dur}s`, ["--d" as string]: `${f.delay}s`, ["--dx" as string]: `${f.drift}px` }}
        />
      ))}
      {twinkles.map((t, n) => (
        <span key={n} className="xfx-twinkle hidden md:block" style={{ left: t.left, top: t.top, ["--d" as string]: `${n * 0.7}s` }}>✦</span>
      ))}
      {ornaments.map((o, n) => (
        <div
          key={n}
          className={`xfx-orn ${o.hideMobile ? "hidden md:block" : ""}`}
          style={{ left: o.left, ["--len" as string]: o.len, ["--d" as string]: `${o.delay}s` }}
        >
          <button
            type="button"
            tabIndex={-1}
            key={rung[n] ?? 0}
            className={`xfx-swing ${rung[n] ? "xfx-rung" : ""}`}
            onMouseEnter={(e) => ring(n, e)}
            onClick={(e) => ring(n, e)}
          >
            <span className="xfx-string" />
            <Ornament size={o.size} color={o.color} />
          </button>
        </div>
      ))}
      {bursts.map((b) => (
        <span key={b.id} className="xfx-burst" style={{ left: b.x, top: b.y }}>
          {Array.from({ length: 8 }, (_, k) => (
            <i key={k} style={{ ["--a" as string]: `${k * 45}deg` }}>✦</i>
          ))}
        </span>
      ))}
    </div>
  );
}

const css = `
.xfx-flake{position:absolute;top:-20px;border-radius:50%;background:#fff;box-shadow:0 0 6px rgba(180,170,150,.9),0 0 1px rgba(120,110,90,.8);pointer-events:none;
  animation:xfx-fall var(--dur) linear var(--d) infinite;}
@keyframes xfx-fall{0%{transform:translate(0,-5vh)}50%{transform:translate(var(--dx),50vh)}100%{transform:translate(0,105vh)}}
.xfx-twinkle{position:absolute;color:#D4AF37;font-size:18px;pointer-events:none;animation:xfx-tw 2.4s ease-in-out var(--d) infinite;}
@keyframes xfx-tw{0%,100%{opacity:.15;transform:scale(.6) rotate(0)}50%{opacity:1;transform:scale(1.15) rotate(20deg)}}
.xfx-orn{position:absolute;top:72px;transform:translate(-50%,-110%);animation:xfx-drop 1.6s cubic-bezier(.3,1.4,.5,1) var(--d) forwards;}
@media (min-width:768px){.xfx-orn{top:80px}}
@keyframes xfx-drop{to{transform:translate(-50%,0)}}
.xfx-swing{display:flex;flex-direction:column;align-items:center;cursor:pointer;background:none;border:0;padding:0;transform-origin:top center;
  animation:xfx-sway 4s ease-in-out infinite alternate;}
.xfx-rung{animation:xfx-ring 1.4s ease-out, xfx-sway 4s ease-in-out 1.4s infinite alternate;}
@keyframes xfx-sway{from{transform:rotate(-3deg)}to{transform:rotate(3deg)}}
@keyframes xfx-ring{0%{transform:rotate(0)}15%{transform:rotate(22deg)}35%{transform:rotate(-16deg)}55%{transform:rotate(10deg)}75%{transform:rotate(-5deg)}100%{transform:rotate(0)}}
.xfx-string{display:block;width:1.5px;height:var(--len);background:linear-gradient(#B8962E,#D4AF37);}
.xfx-burst{position:absolute;pointer-events:none;}
.xfx-burst i{position:absolute;left:-7px;top:-9px;font-style:normal;font-size:14px;color:#D4AF37;text-shadow:0 0 6px #fff3c4;
  animation:xfx-pop .9s ease-out forwards;}
@keyframes xfx-pop{from{opacity:1;transform:rotate(var(--a)) translateY(0) scale(1)}to{opacity:0;transform:rotate(var(--a)) translateY(-46px) scale(.4)}}
@media (prefers-reduced-motion: reduce){
  .xfx-flake,.xfx-twinkle,.xfx-swing,.xfx-burst i{animation:none!important}
  .xfx-orn{animation:none;transform:translate(-50%,0)}
  .xfx-flake{display:none}
}
`;
