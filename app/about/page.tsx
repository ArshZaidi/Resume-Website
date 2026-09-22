import type { Metadata } from "next";
import DetailShell from "@/components/detail/DetailShell";
import DetailSection from "@/components/detail/DetailSection";
import TechnicalIdentity from "@/components/technical/TechnicalIdentity";
import ProofGrid from "@/components/proof/ProofGrid";
import { portfolio } from "@/data/portfolio";
import { getStationByRoute } from "@/data/stations";

export const metadata: Metadata = {
  title: "About — Arsh Zaidi",
  description:
    "Who is on board. A student, developer, AI builder and entrepreneur working across applied machine learning, product and research.",
};

export default function AboutPage() {
  const station = getStationByRoute("/about")!;
  const { profile } = portfolio;

  return (
    <DetailShell station={station} kicker="Passenger profile">
      <DetailSection
        number="01"
        title="The person behind the journey."
        lead={profile.tagline}
      >
        <div className="prose">
          {profile.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </DetailSection>

      <DetailSection number="02" title="What I build.">
        <div className="meta-grid">
          <div className="meta-cell">
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
          <div className="meta-cell">
            <dt>Focus</dt>
            <dd>{profile.focus}</dd>
          </div>
          <div className="meta-cell">
            <dt>Currently</dt>
            <dd>{profile.currently}</dd>
          </div>
        </div>
      </DetailSection>

      <DetailSection number="03" title="Technical identity.">
        <TechnicalIdentity variant="grid" />
      </DetailSection>

      <DetailSection number="04" title="Proof.">
        <ProofGrid ids={["myraq-live", "hackerrank-profile", "leetcode-profile", "medium-profile"]} />
      </DetailSection>
    </DetailShell>
  );
}