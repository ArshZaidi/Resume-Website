"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface Props {
  children: React.ReactNode;
  /** Base delay before the stagger begins, in seconds. */
  delay?: number;
  className?: string;
}

export default function PageEnter({
  children,
  delay = 0.15,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const root = ref.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-enter]");
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        delay,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "all",
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}