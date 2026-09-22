import { ArrowUpRight, Github, Award, FileText, Play, Linkedin, Globe } from "lucide-react";
import type { Proof } from "@/data/proof";

const ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  github: Github,
  live: Globe,
  certificate: Award,
  publication: FileText,
  video: Play,
  linkedin: Linkedin,
  document: FileText,
  award: Award,
  profile: Globe,
};

interface Props {
  proof: Proof;
  className?: string;
}

export default function ProofCard({ proof, className }: Props) {
  const Icon = ICONS[proof.type] ?? FileText;

  const inner = (
    <>
      <div className="proof__icon">
        <Icon size={14} strokeWidth={1.6} />
      </div>
      <div className="proof__body">
        <div className="proof__type">{proof.type.toUpperCase()}</div>
        <div className="proof__title">{proof.title}</div>
        <div className="proof__source">{proof.source}</div>
        {proof.note && <div className="proof__note">{proof.note}</div>}
      </div>
      {proof.href && (
        <div className="proof__action" aria-hidden="true">
          <ArrowUpRight size={14} strokeWidth={1.6} />
        </div>
      )}
    </>
  );

  if (proof.href) {
    return (
      <a
        className={`proof proof--link ${className ?? ""}`}
        href={proof.href}
        target="_blank"
        rel="noreferrer noopener"
        data-cursor="OPEN"
      >
        {inner}
      </a>
    );
  }

  return <div className={`proof ${className ?? ""}`}>{inner}</div>;
}