import { ArrowUpRight } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function ProjectsStation({ data, active }: StationPanelProps) {
  const featured = data.projects.find((p) => p.featured);
  const rest = data.projects.filter((p) => !p.featured).slice(0, 3);

  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>04 — Projects</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="Things that ship." active={active} />
      </h2>

      <div className="row-list">
        {featured && (
          <div className="row fade-up" style={{ transitionDelay: "180ms" }}>
            <div className="row__period">{featured.role}</div>
            <div className="row__main">
              <strong>{featured.title}</strong>
              <span> · {featured.tagline}</span>
            </div>
          </div>
        )}

        {rest.map((p, i) => (
          <div
            className="row fade-up"
            key={p.id}
            style={{ transitionDelay: `${240 + i * 50}ms` }}
          >
            <div className="row__period">{p.status}</div>
            <div className="row__main">
              <strong>{p.title}</strong>
              <span> · {p.tagline}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="panel__chips fade-up" style={{ transitionDelay: "420ms" }}>
        <span className="panel__chip">
          {data.projects.length} total <ArrowUpRight size={10} strokeWidth={1.6} />
        </span>
      </div>
    </div>
  );
}