// Animación navideña para la portada:
// - Copos de nieve con forma de cristal que caen girando y meciéndose.
// - El trineo de Papá Noel con sus renos cruza de izquierda a derecha: los renos galopan
//   (patas, cuello y cuerpo se mueven), el trineo se mece y deja una estela de brillos.
// `sleigh` activa el trineo. Con "reducir movimiento" activado, no se anima nada.

const flakes = Array.from({ length: 26 }, (_, n) => ({
  left: (n * 41 + 7) % 100,
  size: 14 + ((n * 7) % 18),
  dur: 11 + ((n * 13) % 9),
  delay: -((n * 3.7) % 18),
  sway: 3 + (n % 4),
  spin: n % 2 ? 1 : -1,
  mobile: n % 2 === 0,
}));

function Flake({ size }: { size: number }) {
  // Copo de 6 brazos, cada brazo con dos pares de ramitas (estilo cristal de nieve).
  const arm = (
    <g>
      <path d="M0,0 L0,-44" />
      <path d="M0,-18 L-10,-28 M0,-18 L10,-28" />
      <path d="M0,-31 L-8,-39 M0,-31 L8,-39" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" aria-hidden>
      <g strokeLinecap="round" fill="none">
        <g stroke="#9fb3c8" strokeWidth="9" opacity=".55">
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <g key={r} transform={`rotate(${r})`}>{arm}</g>
          ))}
        </g>
        <g stroke="#ffffff" strokeWidth="5.5">
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <g key={r} transform={`rotate(${r})`}>{arm}</g>
          ))}
        </g>
      </g>
    </svg>
  );
}

// Un reno de perfil mirando a la derecha. Las patas están articuladas en cadera y rodilla.
function Reindeer({ x, y, phase }: { x: number; y: number; phase: number }) {
  const d = `${-phase}s`;
  const leg = (cls: string, px: number, py: number, delay: string) => (
    <g transform={`translate(${px} ${py})`}>
      <g className={`sl-up ${cls}`} style={{ animationDelay: delay }}>
        <path d="M0,0 L0,15" strokeWidth="5" />
        <g transform="translate(0 15)">
          <g className={`sl-low ${cls}-low`} style={{ animationDelay: delay }}>
            <path d="M0,0 L0,14" strokeWidth="3.6" />
            <path d="M0,14 l2.5,1.5" strokeWidth="3" />
          </g>
        </g>
      </g>
    </g>
  );
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="sl-bob" style={{ animationDelay: d }}>
        <g stroke="#1b1b1b" strokeLinecap="round" fill="none">
          {leg("sl-back", 14, 6, d)}
          {leg("sl-front", 44, 6, `${-phase - 0.06}s`)}
        </g>
        {/* cuerpo */}
        <path d="M6,-6 C10,-14 40,-15 50,-9 C56,-5 55,6 48,9 C36,13 16,13 8,8 C3,5 2,-1 6,-6Z" fill="#1b1b1b" />
        {/* cola */}
        <path d="M7,-6 C2,-10 -2,-9 -3,-6 C0,-5 3,-4 6,-2Z" fill="#1b1b1b" />
        {/* cuello y cabeza (se mueven con el galope) */}
        <g className="sl-neck" style={{ animationDelay: d }}>
          <path d="M44,-8 C48,-18 52,-26 56,-31 L63,-27 C59,-20 55,-10 52,-2Z" fill="#1b1b1b" />
          <path d="M55,-33 C58,-37 64,-37 67,-34 L74,-30 C75,-28 74,-26 71,-26 L63,-25 C59,-25 55,-28 55,-33Z" fill="#1b1b1b" />
          <path d="M57,-36 l-3,-5 l4,2Z" fill="#1b1b1b" />
          <g stroke="#1b1b1b" strokeWidth="2" strokeLinecap="round" fill="none">
            <path d="M60,-36 C58,-44 55,-49 50,-52 M57,-45 L52,-44 M55,-49 L57,-55" />
            <path d="M63,-36 C64,-44 66,-48 70,-51 M65,-45 L70,-46 M67,-48 L66,-54" />
          </g>
        </g>
      </g>
    </g>
  );
}

function Sleigh() {
  return (
    <svg viewBox="0 0 640 230" className="h-auto w-[78vw] max-w-[620px] md:w-[46vw]" aria-hidden>
      {/* riendas: del trineo a cada reno */}
      <g stroke="#1b1b1b" strokeWidth="1.6" fill="none" className="sl-reins">
        <path d="M150,150 C220,150 270,140 312,128" />
        <path d="M150,154 C230,158 280,146 316,134" />
        <path d="M368,124 C410,112 440,100 462,90" />
        <path d="M512,86 C540,76 560,64 580,56" />
      </g>
      <Reindeer x={300} y={128} phase={0} />
      <Reindeer x={448} y={90} phase={0.18} />
      <Reindeer x={566} y={54} phase={0.36} />
      {/* trineo con Papá Noel */}
      <g className="sl-sled">
        <g fill="#1b1b1b">
          {/* saco de regalos */}
          <path d="M40,128 C34,104 52,92 70,96 C84,99 90,112 86,128Z" />
          {/* Papá Noel */}
          <path d="M92,128 C90,112 96,100 108,98 C122,96 132,104 134,118 L136,128Z" />
          <circle cx="114" cy="92" r="9" />
          <path d="M106,88 C108,74 124,72 128,82 C131,88 134,92 138,92 L136,96 C130,94 124,90 120,86Z" />
          <circle cx="139" cy="94" r="3.5" />
          <path d="M120,96 C126,100 128,106 124,110 C120,106 116,102 114,98Z" />
          <path d="M126,112 C136,112 146,120 152,146 L146,148 C140,126 134,120 126,120Z" />
          {/* caja del trineo */}
          <path d="M28,124 L148,124 C160,124 166,114 160,104 C156,98 162,92 170,96 C178,100 178,114 170,124 C162,136 150,148 132,150 L52,150 C38,150 30,140 28,124Z" />
        </g>
        {/* patines */}
        <g stroke="#1b1b1b" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M60,150 L56,166 M120,150 L124,166" />
          <path d="M22,166 L150,166 C164,166 170,156 166,148" />
        </g>
      </g>
      {/* estela de brillos detrás del trineo */}
      <g className="sl-trail" fill="#D4AF37">
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <text key={k} x={10 - k * 22} y={168 + (k % 2) * 10} fontSize={14 - k} style={{ animationDelay: `${k * 0.12}s` }}>
            ✦
          </text>
        ))}
      </g>
    </svg>
  );
}

export function ChristmasFx({ sleigh = false }: { sleigh?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden>
      <style>{css}</style>
      {flakes.map((f, n) => (
        <div
          key={n}
          className={`xfx-fall ${f.mobile ? "" : "hidden md:block"}`}
          style={{ left: `${f.left}%`, ["--dur" as string]: `${f.dur}s`, ["--d" as string]: `${f.delay}s` }}
        >
          <div className="xfx-sway" style={{ ["--s" as string]: `${f.sway}s` }}>
            <div className="xfx-spin" style={{ ["--dir" as string]: f.spin }}>
              <Flake size={f.size} />
            </div>
          </div>
        </div>
      ))}
      {sleigh && (
        <div className="sl-fly">
          <div className="sl-wave">
            <Sleigh />
          </div>
        </div>
      )}
    </div>
  );
}

const GALLOP = "0.62s";
const css = `
.xfx-fall{position:absolute;top:-40px;animation:xfx-fall var(--dur) linear var(--d) infinite;}
@keyframes xfx-fall{from{transform:translateY(-5vh)}to{transform:translateY(108vh)}}
.xfx-sway{animation:xfx-sway var(--s) ease-in-out infinite alternate;}
@keyframes xfx-sway{from{transform:translateX(-22px)}to{transform:translateX(22px)}}
.xfx-spin{animation:xfx-spin 9s linear infinite;filter:drop-shadow(0 1px 2px rgba(60,70,90,.35));}
@keyframes xfx-spin{to{transform:rotate(calc(360deg * var(--dir)))}}

/* Vuelo del trineo: entra por la izquierda, cruza subiendo en curva y sale por la derecha.
   Tarda ~11 s en cruzar y se repite cada 22 s mientras el anuncio está visible. */
.sl-fly{position:absolute;left:0;top:6%;width:max-content;animation:sl-fly 22s linear .6s infinite both;}
@keyframes sl-fly{
  0%{transform:translate(-100%,8vh) rotate(-3deg);opacity:1}
  50%{transform:translate(105vw,-4vh) rotate(-7deg);opacity:1}
  50.1%,100%{transform:translate(105vw,-4vh);opacity:0}
}
@media (max-width:767px){.sl-fly{top:8%}}
.sl-wave{animation:sl-wave 1.9s ease-in-out infinite alternate;}
@keyframes sl-wave{from{transform:translateY(-6px)}to{transform:translateY(8px)}}

/* Galope de los renos */
.sl-bob{animation:sl-bob ${GALLOP} ease-in-out infinite;transform-box:fill-box;}
@keyframes sl-bob{0%,100%{transform:translateY(0) rotate(0)}25%{transform:translateY(-4px) rotate(-4deg)}60%{transform:translateY(2px) rotate(3deg)}}
.sl-neck{transform-origin:48px -6px;animation:sl-neck ${GALLOP} ease-in-out infinite;}
@keyframes sl-neck{0%,100%{transform:rotate(0)}30%{transform:rotate(-7deg)}70%{transform:rotate(5deg)}}
.sl-up{transform-origin:0 0;animation:${GALLOP} ease-in-out infinite;}
.sl-low{transform-origin:0 0;animation:${GALLOP} ease-in-out infinite;}
.sl-front{animation-name:sl-front}
.sl-front-low{animation-name:sl-front-low}
.sl-back{animation-name:sl-back}
.sl-back-low{animation-name:sl-back-low}
/* patas delanteras: se estiran hacia adelante y se recogen */
@keyframes sl-front{0%,100%{transform:rotate(-65deg)}50%{transform:rotate(15deg)}}
@keyframes sl-front-low{0%,100%{transform:rotate(-20deg)}50%{transform:rotate(85deg)}}
/* patas traseras: empujan hacia atrás y vuelven */
@keyframes sl-back{0%,100%{transform:rotate(25deg)}50%{transform:rotate(70deg)}}
@keyframes sl-back-low{0%,100%{transform:rotate(-70deg)}50%{transform:rotate(-10deg)}}
.sl-sled{animation:sl-sled 1.3s ease-in-out infinite alternate;transform-origin:100px 140px;}
@keyframes sl-sled{from{transform:rotate(-3deg)}to{transform:rotate(3deg) translateY(3px)}}
.sl-trail text{animation:sl-tw .8s ease-in-out infinite alternate;}
@keyframes sl-tw{from{opacity:.15}to{opacity:1}}

@media (prefers-reduced-motion: reduce){
  .xfx-fall,.xfx-sway,.xfx-spin,.sl-fly,.sl-wave,.sl-bob,.sl-neck,.sl-up,.sl-low,.sl-sled,.sl-trail text{animation:none!important}
  .xfx-fall,.sl-fly{display:none}
}
`;
