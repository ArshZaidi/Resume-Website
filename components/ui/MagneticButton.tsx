"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/animations";

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "a" | "button";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  className,
  strength = 10,
  as = "a",
  href,
  onClick,
  target,
  rel,
  type = "button",
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const frame = useRef<number | null>(null);

  const move = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);

      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${(dx / rect.width) * strength * 2}px, ${
          (dy / rect.height) * strength * 2
        }px, 0)`;
      });
    },
    [strength]
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.transform = "translate3d(0,0,0)";
  }, []);

  const shared = {
    className: cn("btn magnetic", className),
    onMouseMove: move,
    onMouseLeave: reset,
    "aria-label": ariaLabel,
  };

  if (as === "button") {
    return (
      <button
        {...shared}
        type={type}
        onClick={onClick}
        ref={ref as React.RefObject<HTMLButtonElement>}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      {...shared}
      href={href}
      target={target}
      rel={rel ?? (target === "_blank" ? "noreferrer noopener" : undefined)}
      onClick={onClick}
      ref={ref as React.RefObject<HTMLAnchorElement>}
    >
      {children}
    </a>
  );
}