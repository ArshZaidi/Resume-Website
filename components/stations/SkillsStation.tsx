import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function SkillsStation({ data, active }: StationPanelProps) {
  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>03 — Skills</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="The working toolkit." active={active} />
      </h2>

      <div className="row-list">
        {data.skills.map((g, i) => (
          <div
            className="row fade-up"
            key={g.id}
            style={{
              transitionDelay: `${120 + i * 70}ms`,
              gridTemplateColumns: "150px 1fr",
            }}
          >
            <div className="row__period" style={{ letterSpacing: "0.16em" }}>
              {g.label}
            </div>
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {g.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: "0.78rem",
                  color: "var(--text-faint)",
                }}
              >
                {g.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}