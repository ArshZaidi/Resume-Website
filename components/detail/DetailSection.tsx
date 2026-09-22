import type { ReactNode } from "react";

interface Props {
  number: string;
  title: string;
  lead?: string;
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function DetailSection({
  number,
  title,
  lead,
  children,
  align = "left",
  className,
}: Props) {
  return (
    <section
      className={`detail-section detail-section--${align} ${className ?? ""}`}
      data-section
    >
      <header className="detail-section__header" data-reveal>
        <div className="detail-section__num">{number}</div>
        <h2 className="detail-section__title">{title}</h2>
        {lead && <p className="detail-section__lead">{lead}</p>}
      </header>
      <div className="detail-section__body">{children}</div>
    </section>
  );
}