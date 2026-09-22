import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DetailShell from "@/components/detail/DetailShell";
import ScrollSection from "@/components/scroll/ScrollSection";
import SectionReveal from "@/components/scroll/SectionReveal";
import PageEnter from "@/components/scroll/PageEnter";
import CertificationEntry from "@/components/certifications/CertificationEntry";
import { portfolio } from "@/data/portfolio";
import { getStationByRoute } from "@/data/stations";

export const metadata: Metadata = {
  title: "Certifications — Arsh Raza Zaidi",
  description:
    "The archive. Every course, certification, and skill validation — grouped by domain.",
};

const GROUP_ORDER = [
  "AI / ML",
  "Computer Science",
  "Cloud",
  "Assessment",
  "Language",
] as const;

const GROUP_LEADS: Record<string, string> = {
  "AI / ML":
    "The applied stack — from classical ML foundations to RAG pipelines and the Model Context Protocol.",
  "Computer Science":
    "The fundamentals. Formal grounding in the maths and software engineering that everything else sits on.",
  Cloud:
    "Production ML at Google Cloud scale — skill badges, arcade labs, and the vision API.",
  Assessment:
    "Platform-verified skill certifications. HackerRank's own tests of what I can actually do.",
  Language:
    "Three successive levels of the official French-language diploma issued by the French Ministry of Education — each an independent, externally examined qualification.",
};

export default function CertificationsPage() {
  const station = getStationByRoute("/certifications");
  if (!station) notFound();

  const { certifications } = portfolio;

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    items: certifications.filter((c) => c.group === group),
  })).filter((g) => g.items.length > 0);

  let runningIndex = 0;

  return (
    <DetailShell station={station} kicker="The archive">
      <PageEnter>
        {/* ---------------------------------------------------------- */}
        {/* 01 — OPENING                                                */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number="01"
          title="The archive."
          lead="Every certificate, course, and skill validation — indexed, grouped, and openable."
        >
          <div className="cert-intro" data-enter>
            <div className="cert-intro__stat">
              <div className="cert-intro__num">{certifications.length}</div>
              <div className="cert-intro__label">Records</div>
            </div>
            <div className="cert-intro__stat">
              <div className="cert-intro__num">{grouped.length}</div>
              <div className="cert-intro__label">Domains</div>
            </div>
            <div className="cert-intro__stat">
              <div className="cert-intro__num">2022</div>
              <div className="cert-intro__label">Earliest entry</div>
            </div>
          </div>
        </ScrollSection>

        {/* ---------------------------------------------------------- */}
        {/* 02+ — ARCHIVE GROUPS                                        */}
        {/* ---------------------------------------------------------- */}
        {grouped.map((g, gi) => {
          const startIndex = runningIndex;
          runningIndex += g.items.length;

          const isLanguage = g.group === "Language";

          return (
            <ScrollSection
              key={g.group}
              number={String(gi + 2).padStart(2, "0")}
              title={g.group}
              lead={GROUP_LEADS[g.group] ?? `${g.items.length} records.`}
            >
              <div className="cert-list">
                {g.items.map((cert, i) => (
                  <CertificationEntry
                    key={cert.id}
                    certification={cert}
                    index={startIndex + i}
                    featured={isLanguage && cert.id === "delf-cert"}
                  />
                ))}
              </div>
            </ScrollSection>
          );
        })}

        {/* ---------------------------------------------------------- */}
        {/* CLOSING                                                     */}
        {/* ---------------------------------------------------------- */}
        <ScrollSection
          number={String(grouped.length + 2).padStart(2, "0")}
          title="What it represents."
          lead="Not collection — direction."
        >
          <SectionReveal>
            <div className="cert-closing">
              <p>
                These aren&apos;t trophies. They&apos;re a working map of where
                I&apos;ve trained myself, in what order, and for what reason.
                CS50 came first, then the mathematical foundations at MIT,
                then the machine learning stack, then the RAG and MCP tooling
                that only makes sense once you know how models actually work.
              </p>
              <p>The order matters more than the certificates.</p>
            </div>
          </SectionReveal>
        </ScrollSection>
      </PageEnter>
    </DetailShell>
  );
}