import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailShell from "@/components/detail/DetailShell";
import ScrollSection from "@/components/scroll/ScrollSection";
import SectionReveal from "@/components/scroll/SectionReveal";
import PageEnter from "@/components/scroll/PageEnter";
import MarqueeRail from "@/components/scroll/MarqueeRail";
import { portfolio } from "@/data/portfolio";
import { getStationByRoute } from "@/data/stations";

export const metadata: Metadata = {
  title: "Skills — Arsh Zaidi",
  description:
    "The working toolkit — every language, framework and system tied to the projects and work where it was actually used.",
};

export default function SkillsPage() {
  const station = getStationByRoute("/skills");
  if (!station) notFound();

  const { skills } = portfolio;
  const totalSkills = skills.reduce((n, g) => n + g.items.length, 0);

  return (
    <DetailShell station={station} kicker="Technical toolkit">
      <PageEnter>
        {/* ---------------------------------------------------------- */}
        {/* 01 — OPENING                                                */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="01"
          title="Not a list of names."
          lead="Every skill below has a paper trail. Each one maps to a specific project, internship, course or piece of research where it was used to build something."
        >
          <SectionReveal>
            <div className="skills-intro">
              <div className="skills-intro__stat">
                <div className="skills-intro__num">{skills.length}</div>
                <div className="skills-intro__label">Skill groups</div>
              </div>
              <div className="skills-intro__stat">
                <div className="skills-intro__num">{totalSkills}</div>
                <div className="skills-intro__label">Skills tracked</div>
              </div>
              <div className="skills-intro__stat">
                <div className="skills-intro__num">7</div>
                <div className="skills-intro__label">Shipped projects</div>
              </div>
            </div>
          </SectionReveal>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 02 — AUTO-SCROLLING MARQUEE                                 */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="02"
          title="The full stack, in motion."
          lead="A moving catalogue. It scrolls on its own — hover to pause."
        >
          <SectionReveal>
            <MarqueeRail
              label="Skill categories"
              speed={36}
              direction="left"
            >
              {skills.map((group, i) => (
                <article key={group.id} className="skill-slide">
                  <div className="skill-slide__index">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="skill-slide__label">{group.label}</div>
                  <ul className="skill-slide__items">
                    {group.items.map((skill) => (
                      <li key={skill.name}>
                        <span className="skill-slide__name">{skill.name}</span>
                        <span className="skill-slide__count">
                          used in {skill.usedIn.length}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </MarqueeRail>
          </SectionReveal>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 03 — WHERE EACH SKILL WAS USED                              */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="03"
          title="Where each one was used."
          lead="Skills are only meaningful when they map to something you actually built."
        >
          <div className="skill-connections">
            {skills.map((group) => (
              <div key={group.id} className="skill-connection-group">
                <SectionReveal>
                  <div className="skill-connection-group__label">
                    {group.label}
                  </div>
                </SectionReveal>

                {group.items.map((skill, i) => (
                  <SectionReveal key={skill.name} delay={i * 40}>
                    <div className="skill-connection">
                      <div className="skill-connection__name">{skill.name}</div>
                      <div
                        className="skill-connection__line"
                        aria-hidden="true"
                      />
                      <div className="skill-connection__targets">
                        {skill.usedIn.map((target) => (
                          <span key={target} className="skill-target">
                            {target}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            ))}
          </div>
        </ScrollSection>
      </PageEnter>
    </DetailShell>
  );
}