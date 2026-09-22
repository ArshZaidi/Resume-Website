import type { RealmConfig, ParticleKind } from "./realmMap";

interface Props {
  realm: RealmConfig;
  theme: {
    skyTop: string;
    skyBottom: string;
    horizon: string;
    accent: string;
  };
}

export default function RealmLayer({ realm, theme }: Props) {
  return (
    <div
      className="realm"
      data-season={realm.season}
      aria-hidden="true"
      style={{
        ["--sky-top" as string]: theme.skyTop,
        ["--sky-bottom" as string]: theme.skyBottom,
        ["--horizon" as string]: theme.horizon,
        ["--accent" as string]: theme.accent,
      }}
    >
      <div className="realm__sky" />
      <div className="realm__glow" />
      <div className="realm__haze" />

      {realm.particle !== "none" && (
        <div className="realm__particles" data-particle={realm.particle}>
          {renderParticles(realm.particle)}
        </div>
      )}

      <div className="realm__vignette" />
    </div>
  );
}

function renderParticles(kind: ParticleKind) {
  // 12 particles max — cheap and enough to read as atmosphere.
  const count = 12;

  switch (kind) {
    case "rain":
      return Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="realm__particle realm__particle--rain"
          style={randomStyle(i)}
        />
      ));

    case "snow":
      return Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="realm__particle realm__particle--snow"
          style={randomStyle(i)}
        />
      ));

    case "leaves":
      return Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="realm__particle realm__particle--leaf"
          style={randomStyle(i)}
        />
      ));

    case "petals":
      return Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="realm__particle realm__particle--petal"
          style={randomStyle(i)}
        />
      ));

    case "pollen":
      return Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="realm__particle realm__particle--pollen"
          style={randomStyle(i)}
        />
      ));

    case "spark":
      return Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="realm__particle realm__particle--spark"
          style={randomStyle(i)}
        />
      ));

    case "dust":
    default:
      return Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="realm__particle realm__particle--dust"
          style={randomStyle(i)}
        />
      ));
  }
}

/**
 * Deterministic pseudo-random positioning per index.
 * Same index → same position, so SSR and CSR match.
 */
function randomStyle(i: number): React.CSSProperties {
  const a = ((i * 9301 + 49297) % 233280) / 233280;
  const b = ((i * 4321 + 12345) % 233280) / 233280;
  const c = ((i * 7919 + 104729) % 233280) / 233280;

  return {
    left: `${Math.floor(a * 100)}%`,
    animationDelay: `${(b * 12).toFixed(2)}s`,
    animationDuration: `${(8 + c * 14).toFixed(2)}s`,
    ["--drift" as string]: `${((a - 0.5) * 80).toFixed(1)}px`,
  };
}