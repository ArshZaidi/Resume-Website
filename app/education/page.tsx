import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailShell from "@/components/detail/DetailShell";
import ScrollSection from "@/components/scroll/ScrollSection";
import SectionReveal from "@/components/scroll/SectionReveal";
import PageEnter from "@/components/scroll/PageEnter";
import ProofGrid from "@/components/proof/ProofGrid";
import Parallax from "@/components/scroll/Parallax";
import { portfolio } from "@/data/portfolio";
import { getStationByRoute } from "@/data/stations";

export const metadata: Metadata = {
  title: "Education — Arsh Zaidi",
  description:
    "Fourteen years at Delhi Public School — a single academic arc from primary through senior secondary.",
};

export default function EducationPage() {
  const station = getStationByRoute("/education");
  if (!station) notFound();

  const { education } = portfolio;
  const primary = education[0];

  return (
    <DetailShell station={station} kicker="Academic route">
      <PageEnter>
        {/* ---------------------------------------------------------- */}
        {/* 01 — OPENING                                                */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="01"
          title="Fourteen years."
          lead="A single school, a single arc. From primary through senior secondary at one of India's most demanding CBSE institutions — sustained, not episodic."
        >
          <div className="edu-opening" data-enter>
            <Parallax amount={0.18}>
              <div className="edu-opening__number">14</div>
            </Parallax>
            <div className="edu-opening__caption">
              <span>Apr 2012</span>
              <span className="edu-opening__line" />
              <span>Apr 2026</span>
            </div>
          </div>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 02 — DELHI PUBLIC SCHOOL                                    */}
        {/* ---------------------------------------------------------- */}
        {primary && (
          <ScrollSection
            number="02"
            title={primary.institution}
            lead={primary.credential}
          >
            <div className="edu-entry">
              <div className="edu-entry__meta">
                <div className="edu-entry__period">{primary.period}</div>
                {primary.score && (
                  <div className="edu-entry__score">{primary.score}</div>
                )}
              </div>

              <SectionReveal>
                <p className="edu-entry__detail">{primary.detail}</p>
              </SectionReveal>

              <SectionReveal delay={120}>
                <div className="edu-entry__timeline">
                  <div className="edu-milestone">
                    <div className="edu-milestone__year">Class X</div>
                    <div className="edu-milestone__body">
                      <strong>96%</strong>
                      <span>94 Mathematics · 97 AI</span>
                    </div>
                  </div>
                  <div className="edu-milestone">
                    <div className="edu-milestone__year">Class XII</div>
                    <div className="edu-milestone__body">
                      <strong>92%</strong>
                      <span>92 Mathematics · 94 CS</span>
                    </div>
                  </div>
                  <div className="edu-milestone">
                    <div className="edu-milestone__year">9 years</div>
                    <div className="edu-milestone__body">
                      <strong>DPS Scholar</strong>
                      <span>Certificate + trophy</span>
                    </div>
                  </div>
                  <div className="edu-milestone">
                    <div className="edu-milestone__year">Honours</div>
                    <div className="edu-milestone__body">
                      <strong>CS Valedictorian</strong>
                      <span>Mathematics top percentile</span>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              {primary.proof && primary.proof.length > 0 && (
                <SectionReveal delay={200}>
                  <div className="edu-entry__proof">
                    <div className="edu-entry__proof-label">Proof</div>
                    <ProofGrid ids={primary.proof} />
                  </div>
                </SectionReveal>
              )}
            </div>
          </ScrollSection>
        )}

        {/* ---------------------------------------------------------- */}
        {/* 03 — WHAT IT REPRESENTS                                     */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="03"
          title="What it represents."
          lead="Not the scores — the consistency behind them."
        >
          <SectionReveal>
            <div className="edu-closing">
              <p>
                The single number that matters most on this page is not 96 or
                92. It&apos;s <strong>fourteen</strong>. One school, one
                environment, one continuous academic community from age six to
                eighteen — through the years that decide what a person becomes.
              </p>
              <p>
                Everything else — the AI &amp; Data Science certification from
                IIT Madras, the three levels of DELF French — sits on the end of
                that arc as deliberate extensions outward. They belong to the
                certifications station, where the timeline continues past
                school.
              </p>
            </div>
          </SectionReveal>
        </ScrollSection>
      </PageEnter>
    </DetailShell>
  );
}