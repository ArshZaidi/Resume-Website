import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function AboutStation({ data, active }: StationPanelProps) {
  const { profile } = data;

  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>01 — About</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="Builder first." active={active} />
      </h2>

      <p className="panel__lead fade-up" style={{ transitionDelay: "120ms" }}>
        {profile.tagline}
      </p>

      <div className="row-list">
        <div className="row fade-up" style={{ transitionDelay: "180ms" }}>
          <div className="row__period">Role</div>
          <div className="row__main">{profile.shortRole}</div>
        </div>
        <div className="row fade-up" style={{ transitionDelay: "220ms" }}>
          <div className="row__period">Focus</div>
          <div className="row__main">{profile.focus}</div>
        </div>
        <div className="row fade-up" style={{ transitionDelay: "260ms" }}>
          <div className="row__period">Based</div>
          <div className="row__main">{profile.location}</div>
        </div>
      </div>
    </div>
  );
}