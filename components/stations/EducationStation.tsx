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

      <p className="panel__lead fade-up" style={{ transitionDelay: "120ms" }}>
        Fourteen years at Delhi Public School. Extensions outward through IIT
        Madras and DELF French.
      </p>

      <div className="row-list">
        {data.education.map((entry, i) => (
          <div
            className="row fade-up"
            key={entry.id}
            style={{ transitionDelay: `${180 + i * 50}ms` }}
          >
            <div className="row__period">{entry.period.split("—")[0].trim()}</div>
            <div className="row__main">
              <strong>{entry.institution}</strong>
              <span> · {entry.credential}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}