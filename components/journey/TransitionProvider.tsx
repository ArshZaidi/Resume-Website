"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import RealmTransition, { type TransitionState } from "./RealmTransition";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { stations } from "@/data/stations";

export interface NavigateOptions {
  href: string;
  number?: string;
  title?: string;
  subtitle?: string;
}

type NavigateFn = (options: NavigateOptions) => void;

const TransitionContext = createContext<NavigateFn>(() => {});

export function useRealmTransition(): NavigateFn {
  return useContext(TransitionContext);
}

const IDLE: TransitionState = { active: false };

/* Timeline timings (seconds) */
const BG_IN = 0.4;
const CONTENT = 0.55;
const HOLD = 0.18;
const POST_NAV = 0.15;
const BG_OUT = 0.45;

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<TransitionState>(IDLE);

  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* Prefetch all station routes when the browser is idle. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };

    const run = () => {
      stations.forEach((s) => router.prefetch(s.route));
      router.prefetch("/contact");
    };

    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(run);
    } else {
      const t = setTimeout(run, 1500);
      return () => clearTimeout(t);
    }
  }, [router]);

  const navigate = useCallback<NavigateFn>(
    ({ href, number, title, subtitle }) => {
      // Reduced motion → straight navigation, no overlay.
      if (reduced) {
        router.push(href);
        return;
      }

      tlRef.current?.kill();

      setState({ active: true, number, title, subtitle });

      // Wait one frame for the overlay to mount before animating it.
      requestAnimationFrame(() => {
        const overlay = overlayRef.current;
        if (!overlay) {
          router.push(href);
          return;
        }

        const animTargets = overlay.querySelectorAll<HTMLElement>(
          "[data-anim]"
        );

        gsap.set(overlay, { display: "flex", opacity: 0 });
        gsap.set(animTargets, { opacity: 0, y: 18 });

        const tl = gsap.timeline({
          onComplete: () => {
            setState(IDLE);
            gsap.set(overlay, { display: "none" });
          },
        });

        tl.to(overlay, {
          opacity: 1,
          duration: BG_IN,
          ease: "power2.in",
        });

        tl.to(
          animTargets,
          {
            opacity: 1,
            y: 0,
            duration: CONTENT,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.1"
        );

        tl.to({}, { duration: HOLD });

        tl.add(() => {
          router.push(href);
        });

        tl.to({}, { duration: POST_NAV });

        tl.to(overlay, {
          opacity: 0,
          duration: BG_OUT,
          ease: "power2.inOut",
        });

        tlRef.current = tl;
      });
    },
    [reduced, router]
  );

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <RealmTransition ref={overlayRef} state={state} />
    </TransitionContext.Provider>
  );
}