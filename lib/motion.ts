import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerDetailGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * Batch-reveal every [data-reveal] element inside the container.
 * Elements start visible in CSS (a11y-safe); we hide them in JS
 * right before animating, so a JS failure or reduced-motion leaves
 * content readable.
 */
export function setupReveals(container: HTMLElement) {
  const targets = Array.from(
    container.querySelectorAll<HTMLElement>("[data-reveal]")
  );
  if (!targets.length) return;

  gsap.set(targets, { opacity: 0, y: 34 });

  ScrollTrigger.batch(targets, {
    start: "top 85%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        overwrite: true,
      }),
  });
}

/**
 * Vertical parallax for [data-parallax="0.15"] elements.
 * Value = fraction of travel in each direction.
 */
export function setupParallax(container: HTMLElement) {
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

/**
 * Text-scramble reveal for [data-scramble]. Optional flourish —
 * use sparingly (station numbers, hero words).
 */
export function setupScramble(container: HTMLElement) {
  const targets = container.querySelectorAll<HTMLElement>("[data-scramble]");
  targets.forEach((el) => {
    const final = el.textContent ?? "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const obj = { p: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          p: 1,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            const reveal = Math.floor(obj.p * final.length);
            let out = final.slice(0, reveal);
            for (let i = reveal; i < final.length; i++) {
              out += chars[Math.floor(Math.random() * chars.length)];
            }
            el.textContent = out;
          },
          onComplete: () => {
            el.textContent = final;
          },
        });
      },
    });
  });
}