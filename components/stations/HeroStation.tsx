import { ArrowDown } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import type { StationPanelProps } from "./types";

export default function HeroStation({ data, active }: StationPanelProps) {
  const { profile } = data;

  return (
    <div className="panel" data-variant="hero">
      <div className="panel__eyebrow fade-up">
        <span>Departure · {new Date().getFullYear()}</span>
      </div>

      <h1 className="panel__title">
        <RevealText text={profile.name} active={active} delay={120} />
      </h1>

      <p
        className="panel__lead fade-up"
        style={{ transitionDelay: "320ms" }}
      >
        {profile.shortRole}
      </p>

      <div
        className="fade-up"
        style={{
          transitionDelay: "440ms",
          marginTop: 34,
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <MagneticButton href={profile.links.github} target="_blank">
          GitHub
        </MagneticButton>
        <MagneticButton href={profile.links.linkedin} target="_blank">
          LinkedIn
        </MagneticButton>
        <MagneticButton href={profile.links.email} className="btn--solid">
          Get in touch
        </MagneticButton>
      </div>

      <div
        className="fade-up"
        style={{
          transitionDelay: "560ms",
          marginTop: 40,
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArrowDown size={13} strokeWidth={1.5} />
        <span className="u-mono">Scroll to depart</span>
      </div>
    </div>
  );
}