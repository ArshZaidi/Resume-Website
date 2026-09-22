import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function ExperienceStation({ data, active }: StationPanelProps) {
  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>03 — Experience</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="Where the work happened." active={active} />
      </h2>

      <p className="panel__lead fade-up" style={{ transitionDelay: "120ms" }}>
        A live startup, a publication, an NGO, and an examination room.
      </p>

      <div className="row-list">
        {data.experience.map((x, i) => (
          <div
            className="row fade-up"
            key={x.id}
            style={{ transitionDelay: `${180 + i * 50}ms` }}
          >
            <div className="row__period">{x.period.split("—")[0].trim()}</div>
            <div className="row__main">
              <strong>{x.role}</strong>
              <span> · {x.org}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}