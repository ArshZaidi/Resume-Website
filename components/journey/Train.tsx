"use client";

import { forwardRef } from "react";

/**
 * Stylised side-view train. Locomotive on the right (direction of travel),
 * two carriages trailing to the left.
 */
const Train = forwardRef<HTMLDivElement>(function Train(_props, ref) {
  return (
    <div className="train" ref={ref} aria-hidden="true">
      <div className="train__glow" />
      <div className="train__inner">
        <svg viewBox="0 0 560 150" role="presentation">
          <defs>
            <linearGradient id="tBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A4E55" />
              <stop offset="18%" stopColor="#33373D" />
              <stop offset="52%" stopColor="#20232A" />
              <stop offset="78%" stopColor="#15171C" />
              <stop offset="100%" stopColor="#0C0D11" />
            </linearGradient>

            <linearGradient id="tGlass" x1="0" y1="0" x2="0.4" y2="1">
              <stop offset="0%" stopColor="#5E7488" />
              <stop offset="45%" stopColor="#2A3A48" />
              <stop offset="100%" stopColor="#131A21" />
            </linearGradient>

            <linearGradient id="tRoof" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6E737A" />
              <stop offset="100%" stopColor="#2A2D33" />
            </linearGradient>

            <linearGradient id="tStripe" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.55" />
            </linearGradient>

            <radialGradient id="tLamp" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF3D6" />
              <stop offset="45%" stopColor="#FFD79A" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFD79A" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="tShadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* undercarriage shadow */}
          <ellipse
            cx="280"
            cy="140"
            rx="255"
            ry="9"
            fill="url(#tShadow)"
            opacity="0.9"
          />

          {/* ---------- REAR CARRIAGE ---------- */}
          <g>
            <rect x="4" y="34" width="152" height="78" rx="7" fill="url(#tBody)" />
            <rect x="4" y="34" width="152" height="5" rx="2.5" fill="url(#tRoof)" />
            <rect x="4" y="86" width="152" height="4" fill="url(#tStripe)" opacity="0.75" />

            {[18, 56, 94, 132].map((x) => (
              <rect
                key={`rw-${x}`}
                x={x}
                y="46"
                width="22"
                height="24"
                rx="3"
                fill="url(#tGlass)"
              />
            ))}

            <rect x="150" y="52" width="8" height="42" rx="3" fill="#0C0D11" />
          </g>

          {/* ---------- FRONT CARRIAGE ---------- */}
          <g>
            <rect x="176" y="34" width="152" height="78" rx="7" fill="url(#tBody)" />
            <rect x="176" y="34" width="152" height="5" rx="2.5" fill="url(#tRoof)" />
            <rect x="176" y="86" width="152" height="4" fill="url(#tStripe)" opacity="0.75" />

            {[190, 228, 266, 304].map((x) => (
              <rect
                key={`fw-${x}`}
                x={x}
                y="46"
                width="22"
                height="24"
                rx="3"
                fill="url(#tGlass)"
              />
            ))}

            <rect x="322" y="52" width="8" height="42" rx="3" fill="#0C0D11" />
          </g>

          {/* ---------- LOCOMOTIVE ---------- */}
          <g>
            {/* nose profile: sloped front on the right */}
            <path
              d="M 552 112 L 552 68 C 552 42 530 28 496 24 L 352 24 L 352 112 Z"
              fill="url(#tBody)"
            />
            <path
              d="M 552 68 C 552 42 530 28 496 24 L 352 24 L 352 29 L 494 29 C 526 33 547 46 547 68 Z"
              fill="url(#tRoof)"
            />

            {/* windshield */}
            <path
              d="M 488 36 L 442 36 L 442 62 L 508 62 C 506 49 500 40 488 36 Z"
              fill="url(#tGlass)"
            />
            <path
              d="M 488 36 L 442 36"
              stroke="#7E93A6"
              strokeWidth="1"
              opacity="0.5"
              fill="none"
            />

            {/* cab side window */}
            <rect x="396" y="42" width="34" height="22" rx="3" fill="url(#tGlass)" />

            {/* accent stripe */}
            <rect x="352" y="86" width="200" height="4" fill="url(#tStripe)" />

            {/* headlight */}
            <circle cx="534" cy="94" r="6" fill="#FFF3D6" />
            <circle cx="534" cy="94" r="18" fill="url(#tLamp)" opacity="0.55" />

            {/* front lower vent */}
            <rect x="516" y="66" width="26" height="10" rx="2" fill="#0B0C10" opacity="0.8" />
          </g>

          {/* ---------- BOGIES + WHEELS ---------- */}
          {[
            [40, 240],
            [196, 396],
            [440, 620],
          ].map(([a, b], i) => (
            <rect
              key={`bogie-${i}`}
              x={a - 6}
              y="106"
              width={Math.min(b, 552) - a + 12}
              height="12"
              rx="3"
              fill="#0A0B0E"
            />
          ))}

          {[46, 96, 200, 250, 300, 452, 502].map((cx) => (
            <g key={`wheel-${cx}`}>
              <circle cx={cx} cy={124} r="12" fill="#0E1014" />
              <circle cx={cx} cy={124} r="12" fill="none" stroke="#3A3E45" strokeWidth="1.2" />
              <circle cx={cx} cy={124} r="4" fill="#55595F" />
            </g>
          ))}
        </svg>

        {/* speed streaks — opacity driven by --speed */}
        <div className="train__streaks">
          <span className="train__streak" style={{ top: "26%", left: "-14%", width: "12%" }} />
          <span className="train__streak" style={{ top: "48%", left: "-22%", width: "16%" }} />
          <span className="train__streak" style={{ top: "68%", left: "-10%", width: "10%" }} />
        </div>
      </div>
    </div>
  );
});

export default Train;