import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function AchievementsStation({ data, active }: StationPanelProps) {
  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>06 — Achievements</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="Marks along the route." active={active} />
      </h2>

      <div className="row-list">
        {data.achievements.map((g, i) => (
          <div
            className="row fade-up"
            key={g.id}
            style={{
              transitionDelay: `${120 + i * 80}ms`,
              gridTemplateColumns: "130px 1fr",
              alignItems: "start",
            }}
          >
            <div className="row__period" style={{ letterSpacing: "0.16em" }}>
              {g.label}
            </div>
            <div>
              {g.items.map((it) => (
                <div
                  key={it.title}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "6px 0",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <span style={{ fontSize: "0.9rem" }}>{it.title}</span>
                  {it.meta && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: "var(--text-faint)",
                        textAlign: "right",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {it.meta}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="fade-up"
        style={{
          transitionDelay: "460ms",
          marginTop: 26,
          padding: 18,
          border: "1px solid var(--line)",
        }}
      >
        <div className="u-mono" style={{ color: "var(--accent)" }}>
          Research
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: "var(--font-display)",
            fontSize: "1.02rem",
          }}
        >
          {data.research.title}
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: "0.84rem",
            color: "var(--text-dim)",
            lineHeight: 1.6,
          }}
        >
          {data.research.abstract}
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.14em",
            color: "var(--text-faint)",
          }}
        >
          {data.research.status}
        </div>
      </div>
    </div>
  );
}