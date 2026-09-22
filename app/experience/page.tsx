import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailShell from "@/components/detail/DetailShell";
import ScrollSection from "@/components/scroll/ScrollSection";
import SectionReveal from "@/components/scroll/SectionReveal";
import PageEnter from "@/components/scroll/PageEnter";
import ProofGrid from "@/components/proof/ProofGrid";
import { portfolio, type ExperienceEntry } from "@/data/portfolio";
import { getStationByRoute } from "@/data/stations";

export const metadata: Metadata = {
  title: "Experience — Arsh Raza Zaidi",
  description:
    "Where the work happened. A live startup, a publication, an NGO, and an examination room.",
};

export default function ExperiencePage() {
  const station = getStationByRoute("/experience");
  if (!station) notFound();

  const { experience } = portfolio;
  const closingNumber = String(experience.length + 2).padStart(2, "0");

  return (
    <DetailShell station={station} kicker="Professional route">
      <PageEnter>
        {/* ---------------------------------------------------------- */}
        {/* 01 — OPENING + LIVE TIMELINE                                */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="01"
          title="Where the work happened."
          lead="Four roles across a live AI startup, a publication, an NGO, and a school examination room."
        >
          <div className="exp-intro" data-enter>
            <div className="exp-intro__stat">
              <div className="exp-intro__num">{experience.length}</div>
              <div className="exp-intro__label">Roles</div>
            </div>
            <div className="exp-intro__stat">
              <div className="exp-intro__num">12</div>
              <div className="exp-intro__label">Interns led</div>
            </div>
            <div className="exp-intro__stat">
              <div className="exp-intro__num">1</div>
              <div className="exp-intro__label">Product shipped</div>
            </div>
          </div>

          <SectionReveal delay={120}>
            <div className="exp-timeline" aria-label="Live timeline">
              <div className="exp-timeline__track">
                <div className="exp-timeline__year">
                  <span className="exp-timeline__marker" />
                  <span className="exp-timeline__label">2024</span>
                  <span className="exp-timeline__caption">MYRAQ.ai founded</span>
                </div>
                <div className="exp-timeline__year">
                  <span className="exp-timeline__marker" />
                  <span className="exp-timeline__label">2025</span>
                  <span className="exp-timeline__caption">HR365, MCP server</span>
                </div>
                <div className="exp-timeline__year exp-timeline__year--live">
                  <span className="exp-timeline__marker" />
                  <span className="exp-timeline__label">2026</span>
                  <span className="exp-timeline__caption">Present</span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 02+ — ROLES                                                 */}
        {/* ---------------------------------------------------------- */}
        {experience.map((entry, i) => (
          <ScrollSection
            key={entry.id}
            number={String(i + 2).padStart(2, "0")}
            title={entry.org}
            lead={entry.summary}
          >
            <ExperienceBlock entry={entry} />
          </ScrollSection>
        ))}

        {/* ---------------------------------------------------------- */}
        {/* CLOSING                                                     */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number={closingNumber}
          title="What it represents."
          lead="Not a résumé — a sequence of decisions."
        >
          <SectionReveal>
            <div className="exp-closing">
              <p>
                I&apos;ve never worked at a big company. Every role on this
                page is either something I started, something I volunteered
                for, or something I committed to because the work needed
                doing.
              </p>
              <p>
                That shapes how I think: ownership first, resources later. If a
                task needed to exist and no one was going to do it, I picked it
                up.
              </p>
            </div>
          </SectionReveal>
        </ScrollSection>
      </PageEnter>
    </DetailShell>
  );
}

/* ------------------------------------------------------------------ */
/* EXPERIENCE BLOCK                                                    */
/* ------------------------------------------------------------------ */

function ExperienceBlock({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="exp-entry">
      <div className="exp-entry__rail" aria-hidden="true">
        <span className="exp-entry__marker" />
        <span className="exp-entry__line" />
      </div>

      <div className="exp-entry__body">
        <div className="exp-entry__header">
          <div className="exp-entry__role">{entry.role}</div>
          <div className="exp-entry__period">{entry.period}</div>
        </div>

        <SectionReveal>
          <ul className="exp-entry__points">
            {entry.points.map((point, i) => (
              <li key={i}>
                <span className="exp-entry__bullet" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>

        {entry.proof && entry.proof.length > 0 && (
          <SectionReveal delay={120}>
            <div className="exp-entry__proof">
              <div className="exp-entry__proof-label">Proof</div>
              <ProofGrid ids={entry.proof} />
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
}