import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

const GROUP_ORDER = [
  "AI / ML",
  "Computer Science",
  "Cloud",
  "Assessment",
  "Language",
] as const;

export default function CertificationsStation({
  data,
  active,
}: StationPanelProps) {
  const grouped = GROUP_ORDER.map((group) => ({
    group,
    count: data.certifications.filter((c) => c.group === group).length,
  })).filter((g) => g.count > 0);

  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>07 — Certifications</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="The archive." active={active} />
      </h2>

      <p className="panel__lead fade-up" style={{ transitionDelay: "120ms" }}>
        {data.certifications.length} records across {grouped.length} domains.
      </p>

      <div className="row-list">
        {grouped.map((g, i) => (
          <div
            className="row fade-up"
            key={g.group}
            style={{ transitionDelay: `${180 + i * 50}ms` }}
          >
            <div className="row__period">{String(g.count).padStart(2, "0")}</div>
            <div className="row__main">
              <strong>{g.group}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}