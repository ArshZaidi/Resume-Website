"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import {
  registerDetailGsap,
  setupParallax,
  setupReveals,
  setupScramble,
} from "@/lib/motion";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticScroll({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Reduced motion: leave content in its natural state.
    if (reduced) return;

    registerDetailGsap();

    const ctx = gsap.context(() => {
      setupReveals(container);
      setupParallax(container);
      setupScramble(container);
    }, container);

    // Fonts affect layout metrics — refresh once they settle.
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        // Guard against unmount race
        if (ref.current) {
          const { ScrollTrigger } = require("gsap/ScrollTrigger");
          ScrollTrigger.refresh();
        }
      });
    }

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}