"use client";

import { forwardRef } from "react";
import type { Station } from "@/data/stations";

interface Props {
  station: Station;
  worldX: number;
  offsetX?: number;
}

const StationSign = forwardRef<HTMLDivElement, Props>(function StationSign(
  { station, worldX, offsetX = 0 },
  ref
) {
  return (
    <div
      className="sign"
      ref={ref}
      style={{ left: worldX + offsetX }}
      data-active="false"
      aria-hidden="true"
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
      </div>

      <span className="sign__pole" />
      <span className="sign__pole-base" />
    </div>
  );
});

export default StationSign;