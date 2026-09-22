import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailShell from "@/components/detail/DetailShell";
import ScrollSection from "@/components/scroll/ScrollSection";
import SectionReveal from "@/components/scroll/SectionReveal";
import PageEnter from "@/components/scroll/PageEnter";
import ProofCard from "@/components/proof/ProofCard";
import { getProof } from "@/data/proof";
import { portfolio } from "@/data/portfolio";
import { getStationByRoute } from "@/data/stations";

export const metadata: Metadata = {
  title: "Achievements — Arsh Raza Zaidi",
  description:
    "Marks along the route. Academic honours, olympiad rankings, and recognition across nine years.",
};

export default function AchievementsPage() {
  const station = getStationByRoute("/achievements");
  if (!station) notFound();

  const { achievements, research } = portfolio;
  const total = achievements.reduce((n, g) => n + g.items.length, 0);

  return (
    <DetailShell station={station} kicker="Milestones">
      <PageEnter>
        {/* ---------------------------------------------------------- */}
        {/* 01 — OPENING                                                */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="01"
          title="Marks along the route."
          lead="Not a trophy case. A record of the work that accumulated evidence."
        >
          <div className="ach-intro" data-enter>
            <div className="ach-intro__stat">
              <div className="ach-intro__num">{total}</div>
              <div className="ach-intro__label">Recorded</div>
            </div>
            <div className="ach-intro__stat">
              <div className="ach-intro__num">{achievements.length}</div>
              <div className="ach-intro__label">Categories</div>
            </div>
            <div className="ach-intro__stat">
              <div className="ach-intro__num">9</div>
              <div className="ach-intro__label">Years of scholarship</div>
            </div>
          </div>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 02+ — GROUPS                                                */}
        {/* ---------------------------------------------------------- */}
        {achievements.map((group, gi) => (
          <ScrollSection
            key={group.id}
            number={String(gi + 2).padStart(2, "0")}
            title={group.label}
            lead={
              group.id === "academics"
                ? "Sustained performance across school — scores, honours, and a scholarship that held for nine straight years."
                : group.id === "olympiad"
                ? "Competitive rankings and platform ratings."
                : "External validation — from institutions and platforms."
            }
          >
            <div className="ach-list">
              {group.items.map((item, i) => (
                <SectionReveal key={item.title} delay={i * 50}>
                  <article className="ach-item">
                    <div className="ach-item__index">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="ach-item__body">
                      <h3 className="ach-item__title">{item.title}</h3>
                      {item.meta && (
                        <div className="ach-item__meta">{item.meta}</div>
                      )}
                    </div>
                    {item.proof && item.proof.length > 0 && (
                      <div className="ach-item__proof">
                        {item.proof.map((id) => {
                          const p = getProof(id);
                          if (!p) return null;
                          return <ProofCard key={id} proof={p} />;
                        })}
                      </div>
                    )}
                  </article>
                </SectionReveal>
              ))}
            </div>
          </ScrollSection>
        ))}

        {/* ---------------------------------------------------------- */}
        {/* RESEARCH                                                    */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number={String(achievements.length + 2).padStart(2, "0")}
          title="Research."
          lead="One preprint, in progress."
        >
          <SectionReveal>
            <article className="ach-research">
              <div className="ach-research__status">{research.status}</div>
              <h3 className="ach-research__title">{research.title}</h3>
              <p className="ach-research__abstract">{research.abstract}</p>
              <ul className="ach-research__notes">
                {research.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </article>
          </SectionReveal>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* CLOSING                                                     */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number={String(achievements.length + 3).padStart(2, "0")}
          title="What it represents."
          lead="Not the awards — the pattern."
        >
          <SectionReveal>
            <div className="ach-closing">
              <p>
                None of these were won in isolation. The National Cyber
                Olympiad gold came out of years of casual problem-solving. The
                nine-year scholarship is a slow average, not a single good
                semester. The HackerRank rating is 500+ problems of cumulative
                practice.
              </p>
              <p>
                The pattern is consistency. I&apos;m less interested in the
                spikes than in the fact that there aren&apos;t any dips.
              </p>
            </div>
          </SectionReveal>
        </ScrollSection>
      </PageEnter>
    </DetailShell>
  );
}