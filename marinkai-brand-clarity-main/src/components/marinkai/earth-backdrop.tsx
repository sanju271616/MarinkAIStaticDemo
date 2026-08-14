import earthImg from "@/assets/earth-signals-dark.jpg";

const SIGNALS = [
  { d: "M40 620 C 300 420, 640 500, 900 300", delay: "0s", color: "var(--gold)" },
  { d: "M120 720 C 420 640, 700 380, 980 240", delay: "1.1s", color: "var(--teal)" },
  { d: "M20 480 C 280 300, 620 340, 940 180", delay: "2.2s", color: "var(--gold-2)" },
  { d: "M180 800 C 500 700, 760 560, 1000 420", delay: "3.1s", color: "var(--teal)" },
  { d: "M60 560 C 360 540, 620 620, 960 520", delay: "4s", color: "var(--gold)" },
];

/**
 * Cinematic earth-from-space backdrop with animated emitting signal arcs.
 * Purely decorative — sits behind content.
 */
export function EarthBackdrop({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={earthImg}
        alt=""
        width={1536}
        height={1536}
        className="earth-media absolute inset-0 size-full object-cover"
      />
      <div className="earth-veil absolute inset-0" />
      <svg
        viewBox="0 0 1024 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
      >
        {SIGNALS.map((s) => (
          <g key={s.d}>
            <path d={s.d} fill="none" stroke={s.color} strokeWidth={0.8} opacity={0.16} />
            <path
              className="signal-dash"
              d={s.d}
              fill="none"
              stroke={s.color}
              strokeWidth={1.6}
              strokeLinecap="round"
              style={{ animationDelay: s.delay }}
            />
          </g>
        ))}
        {SIGNALS.map((s, i) => (
          <circle
            key={`node-${i}`}
            className="signal-pulse"
            r={3}
            fill={s.color}
            cx={[40, 120, 20, 180, 60][i]}
            cy={[620, 720, 480, 800, 560][i]}
            style={{ animationDelay: s.delay }}
          />
        ))}
      </svg>
    </div>
  );
}
