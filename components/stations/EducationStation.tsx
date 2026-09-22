import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function EducationStation({ data, active }: StationPanelProps) {
  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>02 — Education</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="Formal training." active={active} />
      </h2>

      <div className="row-list">
        {data.education.map((e, i) => (
          <div
            className="row fade-up"
            key={e.id}
            style={{ transitionDelay: `${140 + i * 70}ms` }}
          >
            <div className="row__period">{e.period}</div>
            <div className="row__main">
              <strong>{e.institution}</strong>
              <span> — {e.credential}</span>
              <br />
              <span style={{ fontSize: "0.86em" }}>{e.detail}</span>
            </div>
            {e.score ? <div className="row__score">{e.score}</div> : <div />}
          </div>
        ))}
      </div>
    </div>
  );
}