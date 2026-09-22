"use client";

import { forwardRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Station } from "@/data/stations";

interface Props {
  station: Station;
  worldX: number;
  offsetX?: number;
  /** When true, the sign shows the BOARD cue by default. */
  active?: boolean;
  onBoard?: (station: Station) => void;
}

const StationSign = forwardRef<HTMLButtonElement, Props>(function StationSign(
  { station, worldX, offsetX = 0, active = false, onBoard },
  ref
) {
  return (
    <button
      type="button"
      className="sign sign--interactive"
      ref={ref}
      style={{ left: worldX + offsetX }}
      data-active={active}
      onClick={() => onBoard?.(station)}
      aria-label={`Board station ${station.number} — ${station.title}`}
      data-cursor="BOARD"
    >
      <span className="sign__lamp" />
      <span className="sign__lamp-glow" />

      <div className="sign__plate">
        <div className="sign__row">
          <span className="sign__num">{station.number}</span>
          <span className="sign__rule" />
          <span className="sign__badge">STATION</span>
        </div>
        <div className="sign__title">{station.title}</div>
        <div className="sign__sub">
          <span>ARSH RAZA ZAIDI</span>
          <span className="sign__dot" />
          <span>{station.subtitle}</span>
        </div>

        <div className="sign__cta" aria-hidden="true">
          <span>BOARD</span>
          <ArrowRight size={11} strokeWidth={1.8} />
        </div>
      </div>

      <span className="sign__pole" />
      <span className="sign__pole-base" />
    </button>
  );
});

export default StationSign;