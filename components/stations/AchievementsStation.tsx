import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function AchievementsStation({ data, active }: StationPanelProps) {
  const total = data.achievements.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>06 — Achievements</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="Marks along the route." active={active} />
      </h2>

      <p className="panel__lead fade-up" style={{ transitionDelay: "120ms" }}>
        {total} recorded milestones across academics, olympiad, and recognition.
      </p>

      <div className="row-list">
        {data.achievements.map((group, i) => (
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