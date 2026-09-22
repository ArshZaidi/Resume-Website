import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;

/** Smoothly scroll to an absolute Y position, respecting reduced motion. */
export function scrollToY(y: number, duration = 1.6) {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    window.scrollTo({ top: y, behavior: "auto" });
    return;
  }

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(y, { duration, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}