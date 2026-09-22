"use client";

import { forwardRef } from "react";
import type { Station } from "@/data/stations";
import Landmark from "./Landmark";

interface Props {
  stations: Station[];
  /** Layer parallax factor — the layer transform already applies it. */
  factor: number;
  offsetY?: string;
  opacity?: number;
  className?: string;
}

/**
 * Renders a horizontally-scrolling band of environmental landmarks.
 * Each landmark is placed at `stationWorldX * factor` so that it lines up
 * with the train when the train is stopped at that station.
 */
const Landscape = forwardRef<HTMLDivElement, Props>(function Landscape(
  { stations, factor, offsetY = "0px", opacity = 1, className },
  ref
) {
  return (
    <div
      className={className}
      ref={ref}
      style={{ opacity }}
      aria-hidden="true"
    >
      {stations.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: "50%",
            top: offsetY,
            transform: "translateX(-50%)",
            marginLeft: i * 1900 * factor - 0,
            width: 1200,
            pointerEvents: "none",
          }}
        >
          <Landmark kind={s.landmark} />
        </div>
      ))}
    </div>
  );
});

export default Landscape;