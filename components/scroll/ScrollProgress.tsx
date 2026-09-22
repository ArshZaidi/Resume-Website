"use client";

import { useEffect, useRef, useState } from "react";

interface SectionMeta {
  el: HTMLElement;
  num: string;
  title: string;
}

export default function ScrollProgress() {
  const [current, setCurrent] = useState<SectionMeta | null>(null);
  const [progress, setProgress] = useState(0);
  const sectionsRef = useRef<SectionMeta[]>([]);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const collect = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-section]")
      );
      sectionsRef.current = nodes.map((el) => ({
        el,
        num: el.dataset.sectionNum ?? "",
        title: el.dataset.sectionTitle ?? "",
      }));
    };

    collect();

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the viewport centre.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          );

        if (visible[0]) {
          const el = visible[0].target as HTMLElement;
          const meta = sectionsRef.current.find((s) => s.el === el);
          if (meta) setCurrent(meta);
        }
      },
      { threshold: [0.15, 0.4, 0.75] }
    );

    sectionsRef.current.forEach((s) => observer.observe(s.el));

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        frameRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Re-collect if the DOM changes (fonts, images loading in).
    const remeasure = setTimeout(collect, 1200);

    return () => {
      clearTimeout(remeasure);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const index = current
    ? sectionsRef.current.findIndex((s) => s.el === current.el) + 1
    : 0;
  const total = sectionsRef.current.length || 1;

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__meta">
        <span className="scroll-progress__num">
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        {current?.title && (
          <span className="scroll-progress__title">{current.title}</span>
        )}
      </div>
      <div className="scroll-progress__track">
        <div
          className="scroll-progress__fill"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}