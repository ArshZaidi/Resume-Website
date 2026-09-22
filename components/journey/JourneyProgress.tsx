"use client";

import { useState } from "react";
import type { Station } from "@/data/stations";

interface Props {
  stations: Station[];
  activeIndex: number;
  progress: number;
  visible: boolean;
  onSelect: (index: number) => void;
}

export default function JourneyProgress({
  stations,
  activeIndex,
  progress,
  visible,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const active = stations[activeIndex] ?? stations[0];
  const lastNumber = stations[stations.length - 1]?.number ?? "00";

  return (
    <>
      <div
        className="journey-progress"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <div className="journey-progress__brand">Arsh Zaidi</div>

        <button
          className="journey-progress__btn"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Open station index"
        >
          <div className="journey-progress__track">
            <div
              className="journey-progress__fill"
              style={{ ["--p" as string]: `${progress * 100}%` }}
            />
            <div className="journey-progress__dots">
              {stations.map((s, i) => (
                <span
                  key={s.id}
                  className="journey-progress__dot"
                  data-active={i === activeIndex}
                  style={{ left: `${s.progress * 100}%` }}
                />
              ))}
            </div>
          </div>
          <span className="journey-progress__label">
            {active.number} / {lastNumber} · {active.title}
          </span>
        </button>
      </div>

      <div
        className="station-index"
        data-open={open}
        onClick={() => setOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Station index"
      >
        <nav
          className="station-index__list"
          onClick={(e) => e.stopPropagation()}
        >
          {stations.map((s, i) => (
            <button
              key={s.id}
              className="station-index__item"
              data-active={i === activeIndex}
              onClick={() => {
                onSelect(i);
                setOpen(false);
              }}
            >
              <span className="station-index__num">{s.number}</span>
              <span>{s.title}</span>
              <span className="station-index__num">{s.subtitle}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}