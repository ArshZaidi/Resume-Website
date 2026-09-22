import { ArrowUpRight } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function ProjectsStation({ data, active }: StationPanelProps) {
  const featured = data.projects.find((p) => p.featured);
  const rest = data.projects.filter((p) => !p.featured);

  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>04 — Projects</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="Things that ship." active={active} />
      </h2>

      {featured && (
        <div className="project-featured fade-up" style={{ transitionDelay: "180ms" }}>
          <div
            className="u-mono"
            style={{ color: "var(--accent)", marginBottom: 10 }}
          >
            {featured.role} · {featured.year}
          </div>
          <h3 className="project-featured__title">{featured.title}</h3>
          <p className="project-featured__desc">{featured.description}</p>
          <div className="tag-row">
            {featured.technologies.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            {featured.links.map((l) => (
              <a
                key={l.href}
                className="btn"
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="VISIT"
              >
                {l.label} <ArrowUpRight size={12} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="project-list">
        {rest.map((p, i) => (
          <a
            className="project-item fade-up"
            key={p.id}
            href={p.links[0]?.href ?? "#"}
            target="_blank"
            rel="noreferrer noopener"
            style={{ transitionDelay: `${280 + i * 60}ms`, textDecoration: "none" }}
            data-cursor="OPEN"
          >
            <span className="project-item__idx">
              {String(i + 2).padStart(2, "0")}
            </span>
            <span>
              <span className="project-item__title">{p.title}</span>
              <br />
              <span
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-dim)",
                  lineHeight: 1.5,
                }}
              >
                {p.tagline}
              </span>
            </span>
            <span className="project-item__tag">{p.category}</span>
          </a>
        ))}
      </div>
    </div>
  );
}