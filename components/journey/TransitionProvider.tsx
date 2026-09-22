"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import RealmTransition, { type TransitionState } from "./RealmTransition";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

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

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<TransitionState>(IDLE);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const navigate = useCallback<NavigateFn>(
    ({ href, number, title, subtitle }) => {
      if (reduced) {
        router.push(href);
        return;
      }

      // Kill any in-flight transition so rapid clicks don't stack.
      tlRef.current?.kill();

      setState({ active: true, number, title, subtitle });

      // Wait one frame for the overlay to mount before animating it.
      requestAnimationFrame(() => {
        const overlay = overlayRef.current;
        const content = contentRef.current;
        if (!overlay) {
          router.push(href);
          return;
        }

        gsap.set(overlay, { display: "block", opacity: 0 });
        if (content) gsap.set(content, { opacity: 0, y: 20 });

        const tl = gsap.timeline({
          onComplete: () => {
            setState(IDLE);
            gsap.set(overlay, { display: "none" });
          },
        });

        tl.to(overlay, {
          opacity: 1,
          duration: 0.35,
          ease: "power2.in",
        });

        if (content) {
          tl.to(
            content,
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "-=0.05"
          );
        }

        // Navigate mid-timeline — new page appears under the overlay.
        tl.add(() => router.push(href));

        tl.to(
          overlay,
          { opacity: 0, duration: 0.45, ease: "power2.in" },
          "+=0.25"
        );

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