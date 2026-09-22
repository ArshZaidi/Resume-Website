"use client";

import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import type { Certification } from "@/data/portfolio";
import { getProof } from "@/data/proof";
import ProofCard from "@/components/proof/ProofCard";

interface Props {
  certification: Certification;
  index: number;
}

export default function CertificationEntry({ certification, index }: Props) {
  const [open, setOpen] = useState(false);
  const proofs = (certification.proof ?? [])
    .map((id) => getProof(id))
    .filter(Boolean);

  return (
    <article className="cert-entry" data-open={open}>
      <button
        className="cert-entry__header"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`cert-${certification.id}`}
        data-cursor={open ? "CLOSE" : "OPEN"}
      >
        <span className="cert-entry__index">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="cert-entry__main">
          <span className="cert-entry__title">{certification.title}</span>
          <span className="cert-entry__issuer">{certification.issuer}</span>
        </span>

        <span className="cert-entry__meta">
          {certification.year && (
            <span className="cert-entry__year">{certification.year}</span>
          )}
          {certification.duration && (
            <span className="cert-entry__duration">
              {certification.duration}
            </span>
          )}
        </span>

        <span className="cert-entry__toggle" aria-hidden="true">
          {open ? <Minus size={14} strokeWidth={1.6} /> : <Plus size={14} strokeWidth={1.6} />}
        </span>
      </button>

      <div
        id={`cert-${certification.id}`}
        className="cert-entry__body"
        aria-hidden={!open}
      >
        <div className="cert-entry__body-inner">
          <div className="cert-field">
            <div className="cert-field__label">What it covers</div>
            <p className="cert-field__text">{certification.covers}</p>
          </div>

          <div className="cert-field">
            <div className="cert-field__label">Why it matters</div>
            <p className="cert-field__text">{certification.why}</p>
          </div>

          {proofs.length > 0 && (
            <div className="cert-field">
              <div className="cert-field__label">Proof</div>
              <div className="cert-entry__proofs">
                {proofs.map((p) =>
                  p ? <ProofCard key={p.id} proof={p} /> : null
                )}
              </div>
            </div>
          )}

          {proofs.length === 0 && (
            <div className="cert-field cert-field--muted">
              <div className="cert-field__label">Proof</div>
              <p className="cert-field__text">
                Certificate available on request.
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}