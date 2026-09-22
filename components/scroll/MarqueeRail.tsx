"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface Props {
  children: ReactNode;
  /** Pixels per second. Default 42. */
  speed?: number;
  /** Direction of travel. */
  direction?: "left" | "right";
  /** Pause the loop while the pointer is over the track. */
  pauseOnHover?: boolean;
  /** Optional label rendered above the rail. */
  label?: string;
  className?: string;
}

export default function MarqueeRail({
  children,
  speed = 42,
  direction = "left",
  pauseOnHover = true,
  label,
  className,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let offset = 0;
    let last = performance.now();
    let raf = 0;
    let contentWidth = 0;
    let paused = false;

    const measure = () => {
      // The track contains exactly two copies of `children`.
      contentWidth = track.scrollWidth / 2;
    };

    const tick = (now: number) => {
      // Clamp dt so background tabs don't cause a huge jump on return.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!paused && contentWidth > 0) {
        offset += speed * dt * (direction === "left" ? -1 : 1);

        // Seamless wrap.
        if (offset <= -contentWidth) offset += contentWidth;
        else if (offset >= 0) offset -= contentWidth;
      }

      track.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    measure();
    raf = requestAnimationFrame(tick);

    if (pauseOnHover) {
      wrap.addEventListener("pointerenter", onEnter);
      wrap.addEventListener("pointerleave", onLeave);
    }

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => measure());
    }

    return () => {
      cancelAnimationFrame(raf);
      if (pauseOnHover) {
        wrap.removeEventListener("pointerenter", onEnter);
        wrap.removeEventListener("pointerleave", onLeave);
      }
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, speed, direction, pauseOnHover]);

  // Reduced motion: static, horizontally scrollable fallback.
  if (reduced) {
    return (
      <div className={`marquee marquee--static ${className ?? ""}`}>
        {label && <div className="marquee__label">{label}</div>}
        <div className="marquee__viewport">
          <div className="marquee__track">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`marquee ${className ?? ""}`}>
      {label && <div className="marquee__label">{label}</div>}
      <div ref={wrapRef} className="marquee__viewport">
        <div ref={trackRef} className="marquee__track">
          <div className="marquee__copy">{children}</div>
          <div className="marquee__copy" aria-hidden="true">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}