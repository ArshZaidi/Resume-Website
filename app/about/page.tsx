import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import DetailShell from "@/components/detail/DetailShell";
import ScrollSection from "@/components/scroll/ScrollSection";
import SectionReveal from "@/components/scroll/SectionReveal";
import PageEnter from "@/components/scroll/PageEnter";
import ProofGrid from "@/components/proof/ProofGrid";
import TechnicalIdentity from "@/components/technical/TechnicalIdentity";
import { portfolio } from "@/data/portfolio";
import { getStationByRoute } from "@/data/stations";

export const metadata: Metadata = {
  title: "About — Arsh Raza Zaidi",
  description:
    "Who is on board. A student, developer, AI builder and entrepreneur working across applied machine learning, product and research.",
};

export default function AboutPage() {
  const station = getStationByRoute("/about");
  if (!station) notFound();

  const { profile, achievements } = portfolio;

  const achievementCount = achievements.reduce(
    (n, g) => n + g.items.length,
    0
  );

  return (
    <DetailShell station={station} kicker="Passenger profile">
      <PageEnter>
        {/* ---------------------------------------------------------- */}
        {/* 01 — OPENING                                                */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="01"
          title="The person behind the journey."
          lead={profile.tagline}
        >
          <SectionReveal>
            <div className="about-lede">
              <p>
                I&apos;m {profile.name}. I build things — mostly software, mostly
                at the intersection of AI and product, and mostly because
                I&apos;ve never been able to leave a good question alone.
              </p>
            </div>
          </SectionReveal>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 02 — BIO                                                    */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="02"
          title="Who I am."
          lead="Two paragraphs, no filler."
        >
          <div className="about-bio">
            {profile.bio.map((p, i) => (
              <SectionReveal key={i} delay={i * 100}>
                <p className="about-bio__para">{p}</p>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={280}>
            <dl className="about-meta">
              <div className="about-meta__cell">
                <dt>Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="about-meta__cell">
                <dt>Focus</dt>
                <dd>{profile.focus}</dd>
              </div>
              <div className="about-meta__cell">
                <dt>Currently</dt>
                <dd>{profile.currently}</dd>
              </div>
            </dl>
          </SectionReveal>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 03 — WHAT I BUILD                                           */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="03"
          title="What I build."
          lead="Three areas, one habit: shipping."
        >
          <div className="about-pillars">
            <SectionReveal>
              <article className="about-pillar">
                <div className="about-pillar__num">01</div>
                <h3 className="about-pillar__title">AI systems</h3>
                <p className="about-pillar__text">
                  Language models wired into actual products — RAG pipelines,
                  MCP servers, agent tooling. The interesting part is never
                  the model; it&apos;s the plumbing around it.
                </p>
              </article>
            </SectionReveal>

            <SectionReveal delay={100}>
              <article className="about-pillar">
                <div className="about-pillar__num">02</div>
                <h3 className="about-pillar__title">Product</h3>
                <p className="about-pillar__text">
                  MYRAQ.ai is the flagship. It taught me that a working demo
                  and a shipped product are separated by 90% of the work — and
                  that the work is worth it.
                </p>
              </article>
            </SectionReveal>

            <SectionReveal delay={200}>
              <article className="about-pillar">
                <div className="about-pillar__num">03</div>
                <h3 className="about-pillar__title">Research</h3>
                <p className="about-pillar__text">
                  Neural network calibration, specifically. The ADAUC preprint
                  proposes a refinement to how confidence estimates are
                  corrected — a small problem with wide consequences.
                </p>
              </article>
            </SectionReveal>
          </div>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 04 — NUMBERS                                                */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="04"
          title="The numbers that matter."
          lead="Metrics you can verify, not vanity."
        >
          <SectionReveal>
            <div className="about-numbers">
              {profile.stats.map((s) => (
                <div key={s.label} className="about-numbers__cell">
                  <div className="about-numbers__value">{s.value}</div>
                  <div className="about-numbers__label">{s.label}</div>
                </div>
              ))}
              <div className="about-numbers__cell">
                <div className="about-numbers__value">
                  {achievementCount}
                </div>
                <div className="about-numbers__label">Recorded milestones</div>
              </div>
            </div>
          </SectionReveal>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 05 — TECHNICAL IDENTITY                                     */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="05"
          title="Technical identity."
          lead="Every place I write code, solve problems, or publish work."
        >
          <SectionReveal>
            <TechnicalIdentity variant="grid" />
          </SectionReveal>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 06 — PROOF                                                  */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="06"
          title="Proof."
          lead="Direct links, not claims."
        >
          <SectionReveal>
            <ProofGrid
              ids={[
                "myraq-live",
                "hackerrank-profile",
                "leetcode-profile",
                "medium-profile",
                "google-dev",
              ]}
            />
          </SectionReveal>

          <SectionReveal delay={200}>
            <div className="about-cta">
              <a
                href={profile.links.email}
                className="btn btn--solid"
                data-cursor="MAIL"
              >
                Get in touch <ArrowUpRight size={12} strokeWidth={1.6} />
              </a>
            </div>
          </SectionReveal>
        </ScrollSection>
      </PageEnter>
    </DetailShell>
  );
}