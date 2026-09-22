import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Delay in ms. Useful for staggering. */
  delay?: number;
  className?: string;
}

export default function SectionReveal({ children, delay, className }: Props) {
  return (
    <div
      className={`section-reveal ${className ?? ""}`}
      data-reveal
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}