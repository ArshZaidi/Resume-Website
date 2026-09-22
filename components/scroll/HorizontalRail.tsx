"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { registerDetailGsap } from "@/lib/motion";

interface Props {
  children: ReactNode;
  /** Optional section label rendered above the rail. */
  label?: string;
  className?: string;
}

export default function HorizontalRail({
  children,
  label,
  className,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    registerDetailGsap();

    const ctx = gsap.context(() => {
      const getScrollAmount = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  // Reduced motion: plain horizontal overflow, no pinning.
  if (reduced) {
    return (
      <div className={`h-rail h-rail--static ${className ?? ""}`}>
        {label && <div className="h-rail__label">{label}</div>}
        <div className="h-rail__viewport">
          <div className="h-rail__track">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={`h-rail ${className ?? ""}`}
      data-horizontal
    >
      {label && (
        <div className="h-rail__label" data-reveal>
          {label}
        </div>
      )}
      <div className="h-rail__viewport">
        <div ref={trackRef} className="h-rail__track">
          {children}
        </div>
      </div>
    </div>
  );
}