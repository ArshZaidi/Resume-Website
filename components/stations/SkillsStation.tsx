import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function SkillsStation({ data, active }: StationPanelProps) {
  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>05 — Skills</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="The working toolkit." active={active} />
      </h2>

      <p className="panel__lead fade-up" style={{ transitionDelay: "120ms" }}>
        Every skill mapped to a project, a course, or a piece of research.
      </p>

      <div className="row-list">
        {data.skills.map((group, i) => (
          <div
            className="row fade-up"
            key={group.id}
            style={{ transitionDelay: `${180 + i * 50}ms` }}
          >
            <div className="row__period">
              {String(group.items.length).padStart(2, "0")}
            </div>
            <div className="row__main">
              <strong>{group.label}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}