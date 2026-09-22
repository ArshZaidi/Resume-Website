import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import DetailShell from "@/components/detail/DetailShell";
import ScrollSection from "@/components/scroll/ScrollSection";
import SectionReveal from "@/components/scroll/SectionReveal";
import PageEnter from "@/components/scroll/PageEnter";
import Parallax from "@/components/scroll/Parallax";
import ProofGrid from "@/components/proof/ProofGrid";
import { portfolio, type Project } from "@/data/portfolio";
import { getStationByRoute } from "@/data/stations";

export const metadata: Metadata = {
  title: "Projects — Arsh Zaidi",
  description:
    "Things that ship. One live AI startup, three major technical builds, and a cluster of open-source work.",
};

export default function ProjectsPage() {
  const station = getStationByRoute("/projects");
  if (!station) notFound();

  const { projects } = portfolio;
  const flagship = projects.find((p) => p.tier === "flagship");
  const major = projects.filter((p) => p.tier === "major");
  const minor = projects.filter((p) => p.tier === "minor");

  const closingNumber = String(
    1 + (flagship ? 1 : 0) + major.length + (minor.length > 0 ? 1 : 0) + 1
  ).padStart(2, "0");

  return (
    <DetailShell station={station} kicker="The workshop">
      <PageEnter>
        {/* ---------------------------------------------------------- */}
        {/* 01 — OPENING                                                */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="01"
          title="Things that ship."
          lead="Seven projects across two years. One is a live product with a team behind it. The rest are deliberate exercises in whatever I wanted to learn next."
        >
          <div className="proj-intro" data-enter>
            <div className="proj-intro__stat">
              <div className="proj-intro__num">{projects.length}</div>
              <div className="proj-intro__label">Projects</div>
            </div>
            <div className="proj-intro__stat">
              <div className="proj-intro__num">1</div>
              <div className="proj-intro__label">Live product</div>
            </div>
            <div className="proj-intro__stat">
              <div className="proj-intro__num">3</div>
              <div className="proj-intro__label">Open source</div>
            </div>
          </div>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 02 — FLAGSHIP                                               */}
        {/* ---------------------------------------------------------- */}
        {flagship && (
          <ScrollSection
            number="02"
            title="Flagship."
            lead={flagship.tagline}
          >
            <ProjectFlagship project={flagship} />
          </ScrollSection>
        )}

        {/* ---------------------------------------------------------- */}
        {/* 03+ — MAJOR PROJECTS                                        */}
        {/* ---------------------------------------------------------- */}
        {major.map((p, i) => (
          <ScrollSection
            key={p.id}
            number={String(i + 3).padStart(2, "0")}
            title={p.title}
            lead={p.tagline}
          >
            <ProjectMajor project={p} />
          </ScrollSection>
        ))}

        {/* ---------------------------------------------------------- */}
        {/* MINOR CLUSTER                                               */}
        {/* ---------------------------------------------------------- */}
        {minor.length > 0 && (
          <ScrollSection
            number={String(3 + major.length).padStart(2, "0")}
            title="Smaller work."
            lead="Each one started with a question I wanted to answer."
          >
            <div className="proj-minor-grid">
              {minor.map((p) => (
                <ProjectMinorCard key={p.id} project={p} />
              ))}
            </div>
          </ScrollSection>
        )}

        {/* ---------------------------------------------------------- */}
        {/* CLOSING                                                     */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number={closingNumber}
          title="What it represents."
          lead="Not a portfolio — a track record of finishing."
        >
          <SectionReveal>
            <div className="proj-closing">
              <p>
                The through-line across every project on this page is the
                same: I start things and I finish them. MYRAQ is a shipped
                product with a live URL. HR365 is a working RAG pipeline. The
                smaller projects are questions answered in public.
              </p>
              <p>
                None of them are perfect. All of them exist. That gap — between
                almost finished and actually shipped — is where I&apos;ve
                learned the most.
              </p>
            </div>
          </SectionReveal>
        </ScrollSection>
      </PageEnter>
    </DetailShell>
  );
}

/* ------------------------------------------------------------------ */
/* FLAGSHIP                                                            */
/* ------------------------------------------------------------------ */

function ProjectFlagship({ project }: { project: Project }) {
  return (
    <div className="proj-flagship">
      <div className="proj-flagship__visual">
        <Parallax amount={0.12}>
          <div className="proj-flagship__mark">{project.title}</div>
        </Parallax>
      </div>

      <div className="proj-flagship__meta">
        <div className="proj-meta-row">
          <span className="proj-meta-label">Role</span>
          <span className="proj-meta-value">{project.role}</span>
        </div>
        <div className="proj-meta-row">
          <span className="proj-meta-label">Timeline</span>
          <span className="proj-meta-value">{project.timeline}</span>
        </div>
        <div className="proj-meta-row">
          <span className="proj-meta-label">Status</span>
          <span className="proj-meta-value proj-meta-value--accent">
            {project.status}
          </span>
        </div>
      </div>

      <div className="proj-flagship__body">
        <SectionReveal>
          <div className="proj-field">
            <div className="proj-field__label">What</div>
            <p className="proj-field__text">{project.what}</p>
          </div>
        </SectionReveal>

        <SectionReveal delay={80}>
          <div className="proj-field">
            <div className="proj-field__label">Why</div>
            <p className="proj-field__text">{project.why}</p>
          </div>
        </SectionReveal>

        <SectionReveal delay={160}>
          <div className="proj-field">
            <div className="proj-field__label">Stack</div>
            <div className="proj-field__tags">
              {project.stack.map((tech) => (
                <span className="tag" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={240}>
          <div className="proj-field">
            <div className="proj-field__label">Taught me</div>
            <p className="proj-field__text">{project.taught}</p>
          </div>
        </SectionReveal>
      </div>

      {(project.links.length > 0 ||
        (project.proof && project.proof.length > 0)) && (
        <SectionReveal delay={320}>
          <div className="proj-flagship__footer">
            {project.links.length > 0 && (
              <div className="proj-flagship__links">
                {project.links.map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    className="btn"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="VISIT"
                  >
                    {link.label}{" "}
                    <ArrowUpRight size={12} strokeWidth={1.6} />
                  </a>
                ))}
              </div>
            )}

            {project.proof && project.proof.length > 0 && (
              <div className="proj-flagship__proof">
                <div className="proj-field__label">Proof</div>
                <ProofGrid ids={project.proof} />
              </div>
            )}
          </div>
        </SectionReveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAJOR                                                               */
/* ------------------------------------------------------------------ */

function ProjectMajor({ project }: { project: Project }) {
  return (
    <div className="proj-major">
      <div className="proj-major__left">
        <div className="proj-meta">
          <div className="proj-meta-row">
            <span className="proj-meta-label">Role</span>
            <span className="proj-meta-value">{project.role}</span>
          </div>
          <div className="proj-meta-row">
            <span className="proj-meta-label">Timeline</span>
            <span className="proj-meta-value">{project.timeline}</span>
          </div>
          <div className="proj-meta-row">
            <span className="proj-meta-label">Status</span>
            <span className="proj-meta-value proj-meta-value--accent">
              {project.status}
            </span>
          </div>
        </div>

        <div className="proj-major__stack">
          <div className="proj-field__label">Stack</div>
          <div className="proj-field__tags">
            {project.stack.map((tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.links.length > 0 && (
          <div className="proj-major__links">
            {project.links.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                className="btn"
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="VISIT"
              >
                {link.label}{" "}
                <ArrowUpRight size={12} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="proj-major__right">
        <SectionReveal>
          <div className="proj-field">
            <div className="proj-field__label">What</div>
            <p className="proj-field__text">{project.what}</p>
          </div>
        </SectionReveal>

        <SectionReveal delay={80}>
          <div className="proj-field">
            <div className="proj-field__label">Why</div>
            <p className="proj-field__text">{project.why}</p>
          </div>
        </SectionReveal>

        <SectionReveal delay={160}>
          <div className="proj-field">
            <div className="proj-field__label">Taught me</div>
            <p className="proj-field__text">{project.taught}</p>
          </div>
        </SectionReveal>

        {project.proof && project.proof.length > 0 && (
          <SectionReveal delay={240}>
            <div className="proj-major__proof">
              <div className="proj-field__label">Proof</div>
              <ProofGrid ids={project.proof} />
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MINOR                                                               */
/* ------------------------------------------------------------------ */

function ProjectMinorCard({ project }: { project: Project }) {
  const firstLink = project.links[0];

  return (
    <SectionReveal>
      <article className="proj-minor">
        <div className="proj-minor__tag">{project.status}</div>
        <h3 className="proj-minor__title">{project.title}</h3>
        <p className="proj-minor__tagline">{project.tagline}</p>
        <p className="proj-minor__what">{project.what}</p>

        <div className="proj-minor__stack">
          {project.stack.map((tech) => (
            <span className="tag" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        {firstLink && (
          <a
            className="proj-minor__link"
            href={firstLink.href}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="OPEN"
          >
            {firstLink.label}{" "}
            <ArrowUpRight size={11} strokeWidth={1.6} />
          </a>
        )}
      </article>
    </SectionReveal>
  );
}