"use client";

import { useEffect, useRef, useState } from "react";
import { links } from "@/data/links";
import { prefersReducedMotion } from "@/lib/animations";

/**
 * Persistent, unobtrusive Linktree access.
 * - Desktop: fixed left edge, vertical rail.
 * - Mobile: fixed bottom-right pill.
 * - Keyboard accessible, never hover-only.
 */
export default function LinktreeButton() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const y = window.scrollY;
      // Hide when scrolling down past 400px; show when scrolling up.
      if (y > 400 && y > lastY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        el.style.transform = `translate3d(${dx * 0.15}px, ${dy * 0.15}px, 0)`;
      } else {
        el.style.transform = "translate3d(0,0,0)";
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <a
      ref={ref}
      href={links.linktree}
      target="_blank"
      rel="noreferrer noopener"
      className="linktree-access"
      data-visible={visible}
      aria-label="Open Linktree — all links"
      data-cursor="LINKS"
    >
      <span className="linktree-access__dot" aria-hidden="true" />
      <span className="linktree-access__label">Links</span>
    </a>
  );
}