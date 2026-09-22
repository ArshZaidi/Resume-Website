import type { Proof } from "@/data/proof";
import { getProof } from "@/data/proof";
import ProofCard from "./ProofCard";

interface Props {
  ids: string[];
  className?: string;
}

export default function ProofGrid({ ids, className }: Props) {
  const resolved = ids
    .map((id) => getProof(id))
    .filter((p): p is Proof => Boolean(p));

  if (resolved.length === 0) return null;

  return (
    <div className={`proof-grid ${className ?? ""}`}>
      {resolved.map((p) => (
        <ProofCard key={p.id} proof={p} />
      ))}
    </div>
  );
}