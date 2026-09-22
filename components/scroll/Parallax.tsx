import type { ReactNode } from "react";

interface Props {
  /** Fraction of travel per direction. 0.1 = subtle, 0.3 = dramatic. */
  amount?: number;
  children: ReactNode;
  className?: string;
}

export default function Parallax({
  amount = 0.15,
  children,
  className,
}: Props) {
  return (
    <div
      className={`parallax ${className ?? ""}`}
      data-parallax={amount}
    >
      {children}
    </div>
  );
}