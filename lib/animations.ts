import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out" });
  registered = true;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Staggered entrance for a set of elements. Used outside the pinned scene. */
export function staggerIn(
  targets: gsap.TweenTarget,
  opts: { delay?: number; y?: number; stagger?: number } = {}
) {
  const { delay = 0, y = 24, stagger = 0.06 } = opts;
  return gsap.from(targets, {
    y,
    opacity: 0,
    duration: 0.9,
    delay,
    stagger,
    ease: "power3.out",
  });
}