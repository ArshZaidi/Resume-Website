import type { Proof } from "@/data/proof";

/**
 * Inline proof reference — used inside achievement rows and
 * certification entries where a full card would be too heavy.
 */
export default function ProofChip({ proof }: { proof: Proof }) {
  if (!proof.href) {
    return <span className="proof-chip proof-chip--static">{proof.type}</span>;
  }

  return (
    <a
      className="proof-chip"
      href={proof.href}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="VERIFY"
    >
      {proof.type} ↗
    </a>
  );
}