"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Station } from "@/data/stations";
import { WORLD_SPACING } from "@/data/stations";
import type { PortfolioData } from "@/data/portfolio";

import {
  clamp,
  hexToRgb,
  lerp,
  mixRgb,
  rgbCss,
  smootherstep,
  type RGB,
} from "@/lib/utils";
import { registerGsap } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { scrollToY } from "@/lib/lenis";

import Train from "./Train";
import Railway from "./Railway";
import Landscape from "./Landscape";
import StationSign from "./StationSign";
import JourneyProgress from "./JourneyProgress";
import { stationPanels } from "@/components/stations/registry";

/* ------------------------------------------------------------------ */
/* TUNING                                                              */
/* ------------------------------------------------------------------ */

const JOURNEY_VH = 11;
const DWELL = 0.17;
const ACT_NEAR = WORLD_SPACING * 0.07;
const ACT_FAR = WORLD_SPACING * 0.4;

const FAR = 0.2;
const MID = 0.55;
const NEAR = 1.32;

const SIGN_OFFSET = 330;
const THEME_STEPS = 70;

/* ------------------------------------------------------------------ */
/* TRAIN MOTION MODEL                                                  */
/* ------------------------------------------------------------------ */

function trainWorldX(p: number, centers: number[]): number {
  const n = centers.length;
  if (p <= centers[0]) return 0;
  if (p >= centers[n - 1]) return (n - 1) * WORLD_SPACING;

  for (let i = 0; i < n - 1; i++) {
    const a = centers[i];
    const b = centers[i + 1];
    if (p >= a && p <= b) {
      const t = (p - a) / (b - a || 1);
      const u = clamp((t - DWELL) / (1 - 2 * DWELL), 0, 1);
      return lerp(i * WORLD_SPACING, (i + 1) * WORLD_SPACING, smootherstep(u));
    }
  }
  return 0;
}

/* ------------------------------------------------------------------ */
/* COMPONENT                                                           */
/* ------------------------------------------------------------------ */

interface Props {
  stations: Station[];
  portfolio: PortfolioData;
}

export default function TrainJourney({ stations, portfolio }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);

  const signRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const reduced = usePrefersReducedMotion();

  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const themeStepRef = useRef(-1);
  const rgbCache = useRef<RGB[][]>([]);

  const centers = useMemo(() => stations.map((s) => s.progress), [stations]);
  const worldLength = (stations.length - 1) * WORLD_SPACING;
  const margin = WORLD_SPACING;

  /* Pre-compute RGB triples for every station theme. */
  useEffect(() => {
    rgbCache.current = stations.map((s) => [
      hexToRgb(s.theme.skyTop),
      hexToRgb(s.theme.skyBottom),
      hexToRgb(s.theme.horizon),
      hexToRgb(s.theme.accent),
    ]);
  }, [stations]);

  /* ---------------------------------------------------------------- */

  const render = useCallback(
    (p: number) => {
      const scene = sceneRef.current;
      if (!scene) return;

      const trainX = trainWorldX(p, centers);

      const v =
        trainWorldX(clamp(p + 0.0015, 0, 1), centers) -
        trainWorldX(clamp(p - 0.0015, 0, 1), centers);
      const lead = clamp(-v * 1.1, -70, 70);
      const camX = trainX + lead;

      if (worldRef.current)
        worldRef.current.style.transform = `translate3d(${-camX}px,0,0)`;
      if (midRef.current)
        midRef.current.style.transform = `translate3d(${-camX * MID}px,0,0)`;
      if (farRef.current)
        farRef.current.style.transform = `translate3d(${-camX * FAR}px,0,0)`;
      if (nearRef.current)
        nearRef.current.style.transform = `translate3d(${-camX * NEAR}px,0,0)`;

      if (trainRef.current)
        trainRef.current.style.transform = `translate3d(${-lead}px,0,0)`;

      const speed = clamp(Math.abs(v) / 34);
      scene.style.setProperty("--speed", speed.toFixed(3));

      let bestIdx = 0;
      let bestAct = -1;

      for (let i = 0; i < stations.length; i++) {
        const d = Math.abs(trainX - i * WORLD_SPACING);
        const act = 1 - smootherstep((d - ACT_NEAR) / (ACT_FAR - ACT_NEAR));

        if (act > bestAct) {
          bestAct = act;
          bestIdx = i;
        }

        const panel = panelRefs.current[i];
        if (panel) {
          panel.style.opacity = act.toFixed(3);
          panel.style.transform = `translate3d(0, ${((1 - act) * 26).toFixed(1)}px, 0)`;
          panel.style.visibility = act < 0.005 ? "hidden" : "visible";
        }

        const sign = signRefs.current[i];
        if (sign) {
          sign.dataset.active = act > 0.6 ? "true" : "false";
        }
      }

      if (bestIdx !== activeRef.current) {
        activeRef.current = bestIdx;
        setActiveIndex(bestIdx);
      }

      const step = Math.round(p * THEME_STEPS);
      if (step !== themeStepRef.current && rgbCache.current.length) {
        themeStepRef.current = step;

        let lo = 0;
        for (let i = 0; i < centers.length - 1; i++) {
          if (p >= centers[i] && p <= centers[i + 1]) {
            lo = i;
            break;
          }
          if (p > centers[i + 1]) lo = i + 1;
        }
        const hi = Math.min(lo + 1, centers.length - 1);
        const span = centers[hi] - centers[lo] || 1;
        const t = smootherstep(clamp((p - centers[lo]) / span));

        const A = rgbCache.current[lo];
        const B = rgbCache.current[hi];
        if (A && B) {
          scene.style.setProperty("--sky-top", rgbCss(mixRgb(A[0], B[0], t)));
          scene.style.setProperty("--sky-bottom", rgbCss(mixRgb(A[1], B[1], t)));
          scene.style.setProperty("--horizon", rgbCss(mixRgb(A[2], B[2], t)));
          scene.style.setProperty("--accent", rgbCss(mixRgb(A[3], B[3], t)));
        }
      }
    },
    [centers, stations]
  );

  const renderRef = useRef(render);
  useEffect(() => {
    renderRef.current = render;
  }, [render]);

  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reduced motion: the fallback JSX below handles everything.
    // No pinning, no scrub, no GSAP setup.
    if (reduced) return;

    registerGsap();

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * JOURNEY_VH}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          renderRef.current(self.progress);
        },
        onRefresh: (self) => {
          progressRef.current = self.progress;
          renderRef.current(self.progress);
        },
      });
    }, section);

    renderRef.current(0);

    const onTick = () => {
      setProgress((prev) => {
        const next = progressRef.current;
        return Math.abs(next - prev) > 0.002 ? next : prev;
      });
    };
    gsap.ticker.add(onTick);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      window.removeEventListener("orientationchange", onResize);
      gsap.ticker.remove(onTick);
      ctx.revert();
    };
  }, [render, reduced]);

  /* ---------------------------------------------------------------- */

  const goToStation = useCallback(
    (index: number) => {
      if (reduced) {
        const el = document.getElementById(`station-${stations[index].id}`);
        el?.scrollIntoView({ behavior: "auto" });
        return;
      }

      const section = sectionRef.current;
      if (!section) return;

      const top = section.offsetTop;
      const total = window.innerHeight * JOURNEY_VH;
      const y = top + stations[index].progress * total;
      scrollToY(y, 1.5);
    },
    [stations, reduced]
  );

  /* ---------------------------------------------------------------- */

  if (reduced) {
    return (
      <div className="fallback">
        <JourneyProgress
          stations={stations}
          activeIndex={activeIndex}
          progress={0}
          visible
          onSelect={goToStation}
        />
        {stations.map((s) => {
          const Panel = stationPanels[s.id];
          if (!Panel) return null;
          return (
            <section
              key={s.id}
              id={`station-${s.id}`}
              className="fallback__station"
            >
              <Panel data={portfolio} active />
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <JourneyProgress
        stations={stations}
        activeIndex={activeIndex}
        progress={progress}
        visible={progress > 0.015 && progress < 0.985}
        onSelect={goToStation}
      />

      <section className="journey" ref={sectionRef} aria-label="Journey">
        <div className="journey__scene" ref={sceneRef}>
          {/* SKY */}
          <div className="sky__glow" />
          <div className="sky__haze" />
          <div className="sky__dust" />

          {/* FAR */}
          <Landscape
            ref={farRef}
            className="layer layer--far"
            stations={stations}
            factor={FAR}
            offsetY="38%"
            opacity={0.5}
          />

          {/* MID */}
          <Landscape
            ref={midRef}
            className="layer layer--mid"
            stations={stations}
            factor={MID}
            offsetY="46%"
            opacity={0.85}
          />

          {/* WORLD — track, platforms, signs */}
          <div className="layer layer--world" ref={worldRef}>
            <Railway worldLength={worldLength} margin={margin} />

            {stations.map((s, i) => (
              <div
                key={`platform-${s.id}`}
                className="platform"
                style={{
                  left: i * WORLD_SPACING,
                  width: 900,
                }}
                aria-hidden="true"
              >
                <div className="platform__slab" />
                <div className="platform__edge" />
              </div>
            ))}

            {stations.map((s, i) => (
              <StationSign
                key={s.id}
                station={s}
                worldX={i * WORLD_SPACING}
                offsetX={SIGN_OFFSET}
                ref={(el) => {
                  signRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          {/* TRAIN */}
          <Train ref={trainRef} />

          {/* NEAR (foreground) */}
          <div className="layer layer--near" ref={nearRef}>
            {stations.map((s, i) => (
              <div
                key={`near-${s.id}`}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${i * WORLD_SPACING * NEAR}px)`,
                  top: "86%",
                  width: 620,
                  height: 2,
                  transform: "translateX(-50%)",
                  background:
                    "linear-gradient(90deg, transparent, rgb(255 255 255 / 0.09), transparent)",
                }}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* CONTENT PANELS */}
          <div className="panels">
            {stations.map((s, i) => {
              const Panel = stationPanels[s.id];
              if (!Panel) return null;
              return (
                <div
                  key={s.id}
                  className="panel-slot"
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  aria-hidden={i !== activeIndex}
                >
                  <Panel data={portfolio} active={i === activeIndex} />
                </div>
              );
            })}
          </div>

          {/* VIGNETTE */}
          <div className="vignette" />

          {/* HINT */}
          <div
            className="scroll-hint"
            style={{ opacity: progress > 0.02 ? 0 : 1 }}
            aria-hidden="true"
          >
            <span>Scroll</span>
            <span className="scroll-hint__line" />
          </div>
        </div>
      </section>
    </>
  );
}