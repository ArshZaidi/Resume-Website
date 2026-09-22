import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function AboutStation({ data, active }: StationPanelProps) {
  const { profile } = data;

  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>01 — About</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="Builder first." active={active} />
      </h2>

      <div className="panel__lead">
        {profile.bio.map((p, i) => (
          <p
            key={i}
            className="fade-up"
            style={{
              transitionDelay: `${180 + i * 90}ms`,
              marginTop: i === 0 ? 0 : 14,
            }}
          >
            {p}
          </p>
        ))}
      </div>

      <dl className="meta-grid fade-up" style={{ transitionDelay: "420ms" }}>
        <div className="meta-cell">
          <dt>Location</dt>
          <dd>{profile.location}</dd>
        </div>
        <div className="meta-cell">
          <dt>Focus</dt>
          <dd>{profile.focus}</dd>
        </div>
        <div className="meta-cell">
          <dt>Currently</dt>
          <dd>{profile.currently}</dd>
        </div>
      </dl>
    </div>
  );
}