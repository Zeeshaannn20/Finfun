// Hand-drawn sketchnote marks (inline SVG so they stay crisp and need no extra requests).
type P = { className?: string };
const ink = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Loose double-stroke circle, drawn around a block of text. */
export function ScribbleCircle({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 600 520" preserveAspectRatio="none" aria-hidden="true">
      <path {...ink} strokeWidth="7" d="M318 16C470 14 590 128 584 270 578 410 450 506 292 502 132 498 18 392 20 250 22 112 150 30 340 26" />
      <path {...ink} strokeWidth="3" opacity=".6" d="M296 34C446 26 572 140 566 272 560 404 436 488 294 486 150 484 38 386 40 254 42 124 166 44 316 40" />
    </svg>
  );
}

/** Zigzag “energy” marks, like the ones drawn next to big lettering. */
export function Spark({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 70 40" aria-hidden="true">
      <path {...ink} strokeWidth="3.5" d="M3 34 12 10 20 30 30 4 38 26 48 8 56 28" />
    </svg>
  );
}

/** Curved hand-drawn arrow pointing right-down. */
export function Arrow({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 130 80" aria-hidden="true">
      <path {...ink} strokeWidth="4" d="M8 14C40 6 86 14 108 58" />
      <path {...ink} strokeWidth="4" d="M90 50 109 62 116 40" />
    </svg>
  );
}

/** Faded dot cluster for corners. */
export function Dots({ className }: P) {
  const pts = [[8, 10], [34, 4], [60, 16], [20, 34], [48, 40], [76, 38], [6, 60], [36, 66], [64, 70], [92, 62], [22, 90], [52, 94], [84, 92]];
  return (
    <svg className={className} viewBox="0 0 110 110" aria-hidden="true">
      {pts.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="currentColor" />
      ))}
    </svg>
  );
}
