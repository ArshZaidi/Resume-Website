import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function ExperienceStation({ data, active }: StationPanelProps) {
  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>05 — Experience</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="Where the work happened." active={active} />
      </h2>

      <div className="row-list">
        {data.experience.map((x, i) => (
          <div
            className="row fade-up"
            key={x.id}
            style={{
              transitionDelay: `${120 + i * 80}ms`,
              gridTemplateColumns: "96px 1fr",
              alignItems: "start",
            }}
          >
            <div className="row__period">{x.period}</div>
            <div className="row__main">
              <strong>{x.role}</strong>
              <span> · {x.org}</span>
              <p
                style={{
                  marginTop: 6,
                  color: "var(--text-dim)",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                }}
              >
                {x.summary}
              </p>
              <ul
                style={{
                  marginTop: 8,
                  paddingLeft: 16,
                  color: "var(--text-faint)",
                  fontSize: "0.82rem",
                  lineHeight: 1.7,
                }}
              >
                {x.points.map((pt, k) => (
                  <li key={k}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}