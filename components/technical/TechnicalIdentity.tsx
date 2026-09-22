"use client";

import { useEffect, useRef } from "react";
import {
  Code,
  Award,
  Terminal,
  Activity,
  PenTool,
  Cloud,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { technicalLinks } from "@/data/links";
import { prefersReducedMotion } from "@/lib/animations";

type IconComponent = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

const ICONS: Record<string, IconComponent> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  code: Code,
  award: Award,
  terminal: Terminal,
  activity: Activity,
  "pen-tool": PenTool,
  cloud: Cloud,
  sparkles: Sparkles,
};

interface Props {
  variant?: "rail" | "grid";
  className?: string;
}

export default function TechnicalIdentity({
  variant = "rail",
  className,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = rootRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll<HTMLElement>("[data-node]");
    const handlers: Array<() => void> = [];

    nodes.forEach((node) => {
      const onMove = (e: PointerEvent) => {
        const rect = node.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        node.style.transform = `translate3d(${dx * 0.08}px, ${dy * 0.08}px, 0)`;
      };
      const onLeave = () => {
        node.style.transform = "translate3d(0,0,0)";
      };
      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerleave", onLeave);
      handlers.push(() => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => handlers.forEach((fn) => fn());
  }, []);

  return (
    <div
      ref={rootRef}
      className={`tech-identity tech-identity--${variant} ${className ?? ""}`}
    >
      {technicalLinks.map((link) => {
        const Icon = ICONS[link.icon] ?? Code;
        return (
          <a
            key={link.id}
            className="tech-node"
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            data-node
            data-cursor="OPEN"
          >
            <span className="tech-node__icon">
              <Icon size={16} strokeWidth={1.5} />
            </span>
            <span className="tech-node__body">
              <span className="tech-node__label">{link.label}</span>
              <span className="tech-node__desc">{link.description}</span>
            </span>
            <span className="tech-node__arrow" aria-hidden="true">
              <ArrowUpRight size={13} strokeWidth={1.6} />
            </span>
          </a>
        );
      })}
    </div>
  );
}