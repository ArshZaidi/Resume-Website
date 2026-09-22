"use client";

import { forwardRef } from "react";
import type { Station } from "@/data/stations";

interface Props {
  station: Station;
  /** World X of this station. Parent layer already carries the camera transform. */
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
      <div className="sign__lamp" />
      <div className="sign__plate">
        <div className="sign__num">{station.number}</div>
        <div className="sign__title">{station.title}</div>
        <div className="sign__sub">Arsh Zaidi · {station.subtitle}</div>
      </div>
      <div className="sign__pole" />
    </div>
  );
});

export default StationSign;