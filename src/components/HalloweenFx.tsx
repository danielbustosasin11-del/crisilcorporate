// Animación de Halloween para la portada: arañas que bajan colgando de su hilo y se mueven,
// y murciélagos que cruzan volando. Se vuelve a animar cada vez que aparece el anuncio.
// Con "reducir movimiento" activado, todo queda quieto en su lugar.

const spiders = [
  { left: "63%", y: "24vh", ym: "24vh", size: 34, delay: 0.2, bob: 3.2, hideMobile: true },
  { left: "93%", y: "46vh", ym: "26vh", size: 44, delay: 0.9, bob: 2.6, hideMobile: false },
  { left: "47%", y: "14vh", ym: "14vh", size: 26, delay: 1.6, bob: 3.8, hideMobile: true },
  { left: "8%", y: "20vh", ym: "17vh", size: 30, delay: 1.2, bob: 3.4, hideMobile: false },
];

const bats = [
  { top: "12%", size: 70, dur: 14, delay: 0.5 },
  { top: "22%", size: 44, dur: 19, delay: 4 },
  { top: "6%", size: 54, dur: 16, delay: 9 },
];

function Spider({ size }: { size: number }) {
  const legs = [
    [-1.1, -1], [-0.2, -1], [0.7, -1], [1.5, -1],
  ];
  return (
    <svg width={size * 2.4} height={size * 2.2} viewBox="-48 -40 96 88" className="hfx-spider-body" aria-hidden>
      <g stroke="#141414" strokeWidth="3" strokeLinecap="round" fill="none">
        {[-1, 1].map((side) => (
          <g key={side} className={side < 0 ? "hfx-legs-l" : "hfx-legs-r"}>
            {legs.map(([dy], k) => (
              <path key={k} d={`M0,4 Q${side * 22},${(dy ?? 0) * 12 - 6} ${side * 38},${(dy ?? 0) * 20 + 4}`} />
            ))}
          </g>
        ))}
      </g>
      <ellipse cx="0" cy="12" rx="12" ry="15" fill="#141414" />
      <circle cx="0" cy="-6" r="8" fill="#141414" />
      <circle cx="-3" cy="-7" r="1.8" fill="#F28C28" />
      <circle cx="3" cy="-7" r="1.8" fill="#F28C28" />
    </svg>
  );
}

function Bat({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 0.45} viewBox="-42 -18 84 36" aria-hidden>
      <g fill="#141414">
        <path className="hfx-wing-l" d="M0,0 C-10,-14 -26,-16 -40,-8 C-34,-6 -33,-1 -34,3 C-28,0 -22,2 -19,8 C-13,3 -6,4 0,12Z" />
        <path className="hfx-wing-r" d="M0,0 C10,-14 26,-16 40,-8 C34,-6 33,-1 34,3 C28,0 22,2 19,8 C13,3 6,4 0,12Z" />
        <ellipse cx="0" cy="3" rx="4" ry="7" />
      </g>
    </svg>
  );
}

export function HalloweenFx() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" aria-hidden>
      <style>{css}</style>
      {spiders.map((s, n) => (
        <div
          key={n}
          className={`hfx-spider ${s.hideMobile ? "hidden md:block" : ""}`}
          style={{ left: s.left, ["--yd" as string]: s.y, ["--ym" as string]: s.ym, ["--d" as string]: `${s.delay}s`, ["--b" as string]: `${s.bob}s` }}
        >
          <span className="hfx-thread" />
          <Spider size={s.size} />
        </div>
      ))}
      {bats.map((b, n) => (
        <div key={n} className="hfx-bat" style={{ top: b.top, ["--dur" as string]: `${b.dur}s`, ["--d" as string]: `${b.delay}s` }}>
          <div className="hfx-bat-bob">
            <Bat size={b.size} />
          </div>
        </div>
      ))}
    </div>
  );
}

const css = `
.hfx-spider{--y:var(--yd);position:absolute;top:0;transform:translate(-50%,-120%);
  animation:hfx-drop 1.8s cubic-bezier(.3,1.4,.5,1) var(--d) forwards, hfx-bob var(--b) ease-in-out calc(var(--d) + 1.8s) infinite alternate;}
.hfx-thread{position:absolute;left:50%;bottom:calc(100% - 22px);width:1.5px;height:120vh;background:rgba(30,30,30,.55);transform:translateX(-50%);}
.hfx-spider-body{display:block;animation:hfx-sway 2.4s ease-in-out infinite alternate;transform-origin:50% 0;}
.hfx-legs-l{animation:hfx-leg 0.5s ease-in-out infinite alternate;transform-origin:0 4px;}
.hfx-legs-r{animation:hfx-leg 0.5s ease-in-out .25s infinite alternate-reverse;transform-origin:0 4px;}
@keyframes hfx-drop{from{transform:translate(-50%,-120%)}to{transform:translate(-50%,var(--y))}}
@keyframes hfx-bob{
  0%{transform:translate(-50%,var(--y))}
  40%{transform:translate(-50%,calc(var(--y) - 7vh))}
  70%{transform:translate(-50%,calc(var(--y) + 2vh))}
  100%{transform:translate(-50%,calc(var(--y) - 3vh))}}
@keyframes hfx-sway{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
@keyframes hfx-leg{from{transform:rotate(-5deg)}to{transform:rotate(6deg)}}
.hfx-bat{position:absolute;left:0;transform:translateX(-15vw);animation:hfx-fly var(--dur) linear var(--d) infinite;}
.hfx-bat-bob{animation:hfx-wave 1.6s ease-in-out infinite alternate;}
.hfx-wing-l,.hfx-wing-r{transform-origin:0 0;animation:hfx-flap .22s ease-in-out infinite alternate;}
@keyframes hfx-fly{from{transform:translateX(-15vw)}to{transform:translateX(115vw)}}
@keyframes hfx-wave{from{transform:translateY(-14px) rotate(-6deg)}to{transform:translateY(14px) rotate(6deg)}}
@keyframes hfx-flap{from{transform:scaleY(1)}to{transform:scaleY(.25)}}
@media (max-width:767px){.hfx-spider{--y:var(--ym)}}
@media (prefers-reduced-motion: reduce){
  .hfx-spider{animation:none;transform:translate(-50%,var(--y))}
  .hfx-spider-body,.hfx-legs-l,.hfx-legs-r,.hfx-wing-l,.hfx-wing-r,.hfx-bat-bob{animation:none}
  .hfx-bat{animation:none;transform:translateX(70vw)}
}
`;
