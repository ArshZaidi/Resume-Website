import type { LandmarkKind } from "@/data/stations";

const SKYLINES: Record<Exclude<LandmarkKind, "mountains" | "sunrise">, number[]> = {
  terminal: [26, 48, 34, 62, 40, 54, 30, 44, 38, 58, 34, 50],
  city: [38, 58, 44, 74, 50, 66, 40, 62, 46, 70, 42, 56],
  campus: [30, 36, 52, 44, 38, 56, 34, 46, 40, 52, 36, 48],
  lab: [22, 30, 26, 44, 24, 52, 28, 46, 22, 40, 26, 38],
  factory: [18, 34, 24, 46, 20, 58, 26, 42, 22, 50, 18, 44],
  metropolis: [46, 70, 52, 84, 58, 76, 48, 72, 54, 80, 50, 68],
  archive: [32, 40, 56, 46, 36, 58, 34, 44, 38, 54, 32, 46],
};

interface Props {
  kind: LandmarkKind;
}

export default function Landmark({ kind }: Props) {
  const W = 1200;
  const H = 300;

  if (kind === "mountains") {
    return (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 300 L0 210 L140 120 L250 178 L390 70 L520 168 L640 96 L760 190 L880 118 L1010 200 L1120 140 L1200 186 L1200 300 Z"
          fill="rgb(255 255 255 / 0.05)"
        />
        <path
          d="M0 300 L0 250 L160 190 L300 236 L440 168 L580 226 L720 178 L860 240 L1000 194 L1140 244 L1200 218 L1200 300 Z"
          fill="rgb(255 255 255 / 0.03)"
        />
      </svg>
    );
  }

  if (kind === "sunrise") {
    return (
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width={W}
        height={H}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <circle cx="600" cy="228" r="86" fill="var(--accent)" opacity="0.14" />
        <circle cx="600" cy="228" r="46" fill="var(--accent)" opacity="0.22" />
        <path
          d="M0 300 L0 268 L1200 268 L1200 300 Z"
          fill="rgb(255 255 255 / 0.04)"
        />
        <path
          d="M0 300 L0 282 L1200 282 L1200 300 Z"
          fill="rgb(255 255 255 / 0.05)"
        />
      </svg>
    );
  }

  const heights = SKYLINES[kind];
  const barW = W / heights.length;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {heights.map((h, i) => {
        const bh = h * 3.2;
        return (
          <rect
            key={i}
            x={i * barW + barW * 0.08}
            y={H - bh}
            width={barW * 0.84}
            height={bh}
            fill="rgb(255 255 255 / 0.045)"
          />
        );
      })}
      {heights.map((h, i) => {
        const bh = h * 3.2 * 0.62;
        return (
          <rect
            key={`inner-${i}`}
            x={i * barW + barW * 0.28}
            y={H - bh}
            width={barW * 0.44}
            height={bh}
            fill="rgb(255 255 255 / 0.03)"
          />
        );
      })}
    </svg>
  );
}