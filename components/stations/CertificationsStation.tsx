"use client";

import { useMemo, useState } from "react";
import RevealText from "@/components/ui/RevealText";
import type { StationPanelProps } from "./types";

export default function CertificationsStation({
  data,
  active,
}: StationPanelProps) {
  const groups = useMemo(() => {
    const map = new Map<string, typeof data.certifications>();
    data.certifications.forEach((c) => {
      const arr = map.get(c.group) ?? [];
      arr.push(c);
      map.set(c.group, arr);
    });
    return Array.from(map.entries());
  }, [data.certifications]);

  const [openGroup, setOpenGroup] = useState<string | null>(groups[0]?.[0] ?? null);

  return (
    <div className="panel" data-variant="standard">
      <div className="panel__eyebrow fade-up">
        <span>07 — Certifications</span>
      </div>

      <h2 className="panel__title">
        <RevealText text="The archive." active={active} />
      </h2>

      <div className="row-list">
        {groups.map(([label, items], i) => (
          <div
            className="fade-up"
            key={label}
            style={{
              transitionDelay: `${120 + i * 60}ms`,
              borderBottom: "1px solid var(--line)",
            }}
          >
            <button
              onClick={() =>
                setOpenGroup((g) => (g === label ? null : label))
              }
              aria-expanded={openGroup === label}
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                gap: 12,
                alignItems: "center",
                padding: "14px 0",
                background: "none",
                border: 0,
                color: "inherit",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.98rem",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--text-faint)",
                }}
              >
                {items.length}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  color: "var(--accent)",
                  lineHeight: 1,
                }}
              >
                {openGroup === label ? "−" : "+"}
              </span>
            </button>

            {openGroup === label && (
              <div style={{ paddingBottom: 14 }}>
                {items.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "7px 0",
                      fontSize: "0.86rem",
                      color: "var(--text-dim)",
                    }}
                  >
                    <span>{c.title}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: "var(--text-faint)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.issuer}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}