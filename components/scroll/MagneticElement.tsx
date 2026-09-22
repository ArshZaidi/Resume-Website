"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface Props {
  children: React.ReactNode;
  /** Max pixels of pull toward the cursor. Keep 5–14. */
  strength?: number;
  /** Radius in px within which the magnet activates. */
  radius?: number;
  className?: string;
  as?: "div" | "span";
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function MagneticElement({
  children,
  strength = 10,
  radius = 140,
  className,
  as = "div",
  href,
  onClick,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (dist < radius) {
          const pull = (1 - dist / radius) * strength;
          const ang = Math.atan2(dy, dx);
          el.style.transform = `translate3d(${
            Math.cos(ang) * pull
          }px, ${Math.sin(ang) * pull}px, 0)`;
        } else {
          el.style.transform = "translate3d(0,0,0)";
        }
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0,0,0)";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, strength, radius]);

  const shared = {
    className: `magnetic-el ${className ?? ""}`,
    "aria-label": ariaLabel,
    onClick,
  };

  if (as === "span") {
    return (
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        {...shared}
      >
        {children}
      </span>
    );
  }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
        {...shared}
      >
        {children}
      </a>
    );
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} {...shared}>
      {children}
    </div>
  );
}