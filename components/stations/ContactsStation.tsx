import { ArrowUpRight } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import type { StationPanelProps } from "./types";

export default function ContactStation({ data, active }: StationPanelProps) {
  const { profile } = data;

  return (
    <div className="panel" data-variant="destination">
      <div className="panel__eyebrow fade-up">
        <span>08 — Final Destination</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="Let's build something." active={active} />
      </h2>

      <p className="panel__lead fade-up" style={{ transitionDelay: "260ms" }}>
        The journey doesn&apos;t end here. If you&apos;re working on something
        worth building — or you just want to compare notes — the door is open.
      </p>

      <div
        className="fade-up"
        style={{
          transitionDelay: "400ms",
          marginTop: 34,
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <MagneticButton href={profile.links.email} className="btn--solid">
          Start a conversation <ArrowUpRight size={12} strokeWidth={1.6} />
        </MagneticButton>
        <MagneticButton href={profile.links.github} target="_blank">
          GitHub
        </MagneticButton>
        <MagneticButton href={profile.links.linkedin} target="_blank">
          LinkedIn
        </MagneticButton>
        <MagneticButton href={profile.links.leetcode} target="_blank">
          LeetCode
        </MagneticButton>
      </div>

      <dl
        className="meta-grid fade-up"
        style={{ transitionDelay: "520ms", textAlign: "left" }}
      >
        {profile.stats.map((s) => (
          <div className="meta-cell" key={s.label}>
            <dt>{s.label}</dt>
            <dd
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.3rem",
                letterSpacing: "-0.02em",
              }}
            >
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}