"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function Preloader() {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Reduced motion: never start the animation. The `if (reduced)`
    // early return below keeps this component from rendering at all.
    if (reduced) return;

    const counter = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    tl.to(counter, {
      v: 100,
      duration: 0.9,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(counter.v);
        if (fillRef.current) fillRef.current.style.width = `${v}%`;
        if (pctRef.current) pctRef.current.textContent = `${v}%`;
      },
    }).to(rootRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
    };
  }, [reduced]);

  if (reduced || done) return null;

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__title">Arsh Zaidi</div>
        <div className="preloader__sub">Digital Journey · Initialising</div>
        <div className="preloader__bar">
          <div className="preloader__fill" ref={fillRef} />
        </div>
        <div className="preloader__pct">
          <span ref={pctRef}>0%</span>
        </div>
      </div>
    </div>
  );
}
