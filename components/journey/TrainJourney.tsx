"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Station } from "@/data/stations";
import { WORLD_SPACING } from "@/data/stations";
import type { PortfolioData } from "@/data/portfolio";
import { profile } from "@/data/portfolio";

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
import { useRealmTransition } from "./TransitionProvider";

import Train from "./Train";
import Railway from "./Railway";
import Landscape from "./Landscape";
import StationSign from "./StationSign";
import JourneyProgress from "./JourneyProgress";
import { stationPanels } from "@/components/stations/registry";
import ContactStation from "@/components/stations/ContactStation";

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

const OUTRO_START = 0.9;
const OUTRO_FADE_RATE = 10;

const INTRO_START_DELAY = 0.35;
const INTRO_HOLD = 1.4;
const INTRO_FADE = 1.0;

/**
 * Camera lead-in at the start of the journey.
 *
 * At progress 0 the whole world is shifted right by this many pixels, so
 * the About station sign lands to the right of the train (the train is
 * approaching it from the left). The offset tapers to zero by the time
 * the train reaches About.
 *
 * Only affects the visual camera. Train world position, panel activation,
 * and sign lighting are unchanged.
 */
const LEAD_IN = WORLD_SPACING * 0.34; // ≈ 646px

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
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  const signRefs = useRef<(HTMLElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);

  const reduced = usePrefersReducedMotion();
  const navigate = useRealmTransition();

  const progressRef = useRef(0);
  const activeRef = useRef(0);
  const themeStepRef = useRef(-1);
  const rgbCache = useRef<RGB[][]>([]);

  const centers = useMemo(() => stations.map((s) => s.progress), [stations]);
  const worldLength = (stations.length - 1) * WORLD_SPACING;
  const margin = WORLD_SPACING;

  useEffect(() => {
    rgbCache.current = stations.map((s) => [
      hexToRgb(s.theme.skyTop),
      hexToRgb(s.theme.skyBottom),
      hexToRgb(s.theme.horizon),
      hexToRgb(s.theme.accent),
    ]);
  }, [stations]);

  const boardStation = useCallback(
    (station: Station) => {
      navigate({
        href: station.route,
        number: station.number,
        title: station.title,
        subtitle: station.subtitle,
      });
    },
    [navigate]
  );

  /* ---------------------------------------------------------------- */

  const render = useCallback(
    (p: number) => {
      const scene = sceneRef.current;
      if (!scene) return;

      const trainX = trainWorldX(p, centers);

      // Velocity-based camera nudge (unchanged).
      const v =
        trainWorldX(clamp(p + 0.0015, 0, 1), centers) -
        trainWorldX(clamp(p - 0.0015, 0, 1), centers);
      const velocityLead = clamp(-v * 1.1, -70, 70);

      // Intro lead-in — only active before the first station, tapering off.
      const firstStation = centers[0];
      const introLead =
        p < firstStation
          ? LEAD_IN * (1 - smootherstep(p / firstStation))
          : 0;

      const camX = trainX + velocityLead - introLead;

      if (worldRef.current)
        worldRef.current.style.transform = `translate3d(${-camX}px,0,0)`;
      if (midRef.current)
        midRef.current.style.transform = `translate3d(${-camX * MID}px,0,0)`;
      if (farRef.current)
        farRef.current.style.transform = `translate3d(${-camX * FAR}px,0,0)`;
      if (nearRef.current)
        nearRef.current.style.transform = `translate3d(${-camX * NEAR}px,0,0)`;

      if (trainRef.current)
        trainRef.current.style.transform = `translate3d(${-velocityLead}px,0,0)`;

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
          panel.style.transform = `translate3d(0, ${((1 - act) * 26).toFixed(
            1
          )}px, 0)`;
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

      if (outroRef.current) {
        const op = clamp((p - OUTRO_START) * OUTRO_FADE_RATE);
        outroRef.current.style.opacity = op.toFixed(3);
        outroRef.current.style.pointerEvents = op > 0.5 ? "auto" : "none";
        outroRef.current.style.visibility = op < 0.005 ? "hidden" : "visible";
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
          scene.style.setProperty(
            "--sky-bottom",
            rgbCss(mixRgb(A[1], B[1], t))
          );
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
  /* INTRO                                                             */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (reduced) {
      setIntroVisible(false);
      return;
    }

    const intro = introRef.current;
    if (!intro) return;

    registerGsap();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const inner = intro.querySelectorAll<HTMLElement>(
        ".intro-overlay__kicker, .intro-overlay__title, .intro-overlay__rule, .intro-overlay__tagline, .intro-overlay__actions, .intro-overlay__hint"
      );

      gsap.set(inner, { opacity: 0, y: 18 });
      gsap.set(intro, { opacity: 1, display: "flex" });

      const tl = gsap.timeline({
        delay: INTRO_START_DELAY,
        onComplete: () => {
          setIntroVisible(false);
          document.body.style.overflow = prevOverflow;
          ScrollTrigger.refresh();
        },
      });

      tl.to(inner, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      tl.to({}, { duration: INTRO_HOLD });

      tl.to(intro, {
        opacity: 0,
        duration: INTRO_FADE,
        ease: "power2.inOut",
      });
    }, intro);

    return () => {
      document.body.style.overflow = prevOverflow;
      ctx.revert();
    };
  }, [reduced]);

  /* ---------------------------------------------------------------- */
  /* SCROLL SCENE                                                      */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (typeof window === "undefined") return;
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
        <section
          id="station-contact"
          className="fallback__station fallback__station--contact"
        >
          <ContactStation data={portfolio} active />
        </section>
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
        onBoard={boardStation}
      />

      <section className="journey" ref={sectionRef} aria-label="Journey">
        <div className="journey__scene" ref={sceneRef}>
          <div className="sky__glow" />
          <div className="sky__haze" />
          <div className="sky__dust" />

          <Landscape
            ref={farRef}
            className="layer layer--far"
            stations={stations}
            factor={FAR}
            offsetY="38%"
            opacity={0.5}
          />

          <Landscape
            ref={midRef}
            className="layer layer--mid"
            stations={stations}
            factor={MID}
            offsetY="46%"
            opacity={0.85}
          />

          <div className="layer layer--world" ref={worldRef}>
            <Railway worldLength={worldLength} margin={margin} />

            {stations.map((s, i) => (
              <div
                key={`platform-${s.id}`}
                className="platform"
                style={{ left: i * WORLD_SPACING, width: 900 }}
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
                active={i === activeIndex}
                onBoard={boardStation}
                ref={(el) => {
                  signRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          <Train ref={trainRef} />

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

          <div className="vignette" />

          {introVisible && (
            <div
              ref={introRef}
              className="intro-overlay"
              aria-label="Introduction"
            >
              <div className="intro-overlay__bg" aria-hidden="true" />

              <div className="intro-overlay__inner">
                <div className="intro-overlay__kicker u-mono">
                  Digital Journey · {new Date().getFullYear()}
                </div>

                <h1 className="intro-overlay__title u-display">
                  {profile.name}
                </h1>

                <span className="intro-overlay__rule" aria-hidden="true" />

                <p className="intro-overlay__tagline">{profile.shortRole}</p>

                <div className="intro-overlay__actions">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn"
                    data-cursor="OPEN"
                  >
                    GitHub
                  </a>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn"
                    data-cursor="OPEN"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={profile.links.email}
                    className="btn btn--solid"
                    data-cursor="MAIL"
                  >
                    Get in touch
                  </a>
                </div>

                <div className="intro-overlay__hint" aria-hidden="true">
                  <span className="u-mono">Entering the journey</span>
                  <ArrowDown size={12} strokeWidth={1.6} />
                </div>
              </div>
            </div>
          )}

          <div
            ref={outroRef}
            className="outro-overlay"
            aria-label="Journey complete"
          >
            <ContactStation data={portfolio} active />
          </div>

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