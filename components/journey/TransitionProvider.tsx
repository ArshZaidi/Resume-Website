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

/* Timings (seconds) — tuned for a smooth, cinematic feel */
const BG_IN = 0.55;
const CONTENT_STAGGER = 0.09;
const CONTENT = 0.75;
const HOLD = 0.28;
const POST_NAV = 0.25;
const BG_OUT = 0.6;

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
      if (reduced) {
        router.push(href);
        return;
      }

      tlRef.current?.kill();

      setState({ active: true, number, title, subtitle });

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
        gsap.set(animTargets, { opacity: 0, y: 22 });

        const tl = gsap.timeline({
          onComplete: () => {
            setState(IDLE);
            gsap.set(overlay, { display: "none" });
          },
        });

        tl.to(overlay, {
          opacity: 1,
          duration: BG_IN,
          ease: "power2.out",
        });

        tl.to(
          animTargets,
          {
            opacity: 1,
            y: 0,
            duration: CONTENT,
            stagger: CONTENT_STAGGER,
            ease: "power3.out",
          },
          `-=${BG_IN * 0.5}`
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