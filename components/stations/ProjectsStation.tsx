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
        <div
          className="project-featured fade-up"
          style={{ transitionDelay: "180ms" }}
        >
          <div
            className="u-mono"
            style={{ color: "var(--accent)", marginBottom: 10 }}
          >
            {featured.role} · {featured.timeline}
          </div>

          <h3 className="project-featured__title">{featured.title}</h3>

          <p className="project-featured__desc">{featured.what}</p>

          <div className="tag-row">
            {featured.stack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>

          {featured.links.length > 0 && (
            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              {featured.links.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  className="btn"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="VISIT"
                >
                  {link.label} <ArrowUpRight size={12} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="project-list">
        {rest.map((project, i) => {
          const href = project.links[0]?.href;

          const inner = (
            <>
              <span className="project-item__idx">
                {String(i + 2).padStart(2, "0")}
              </span>
              <span>
                <span className="project-item__title">{project.title}</span>
                <br />
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.5,
                  }}
                >
                  {project.tagline}
                </span>
              </span>
              <span className="project-item__tag">{project.status}</span>
            </>
          );

          if (href) {
            return (
              <a
                className="project-item fade-up"
                key={project.id}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                style={{
                  transitionDelay: `${280 + i * 60}ms`,
                  textDecoration: "none",
                }}
                data-cursor="OPEN"
              >
                {inner}
              </a>
            );
          }

          return (
            <div
              className="project-item fade-up"
              key={project.id}
              style={{ transitionDelay: `${280 + i * 60}ms` }}
            >
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}