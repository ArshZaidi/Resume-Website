import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerDetailGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * Reveal every [data-reveal] element inside a container on scroll.
 * Uses ScrollTrigger.batch for performance.
 */
export function revealOnScroll(
  container: HTMLElement,
  opts: { y?: number; stagger?: number; start?: string } = {}
) {
  const { y = 34, stagger = 0.08, start = "top 82%" } = opts;

  const targets = container.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!targets.length) return;

  gsap.set(targets, { opacity: 0, y });

  ScrollTrigger.batch(targets, {
    start,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger,
        ease: "power3.out",
      }),
  });
}

/**
 * Subtle vertical parallax for [data-parallax] elements.
 * Value is the data attribute — e.g. data-parallax="0.2" → 20% travel.
 */
export function parallaxOnScroll(container: HTMLElement) {
  const targets = container.querySelectorAll<HTMLElement>("[data-parallax]");
  targets.forEach((el) => {
    const factor = parseFloat(el.dataset.parallax ?? "0.15");
    gsap.fromTo(
      el,
      { yPercent: -factor * 100 },
      {
        yPercent: factor * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  });
}