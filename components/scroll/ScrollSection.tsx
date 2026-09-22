import type { ReactNode } from "react";

interface Props {
  /** Section number shown as a large editorial element, e.g. "01". */
  number: string;
  /** Section title, used by ScrollProgress to label the current section. */
  title: string;
  /** Optional lead paragraph. */
  lead?: string;
  children: ReactNode;
  /** Full-viewport min-height for cinematic entrance sections. */
  full?: boolean;
  /** Center the header. Default: left. */
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export default function ScrollSection({
  number,
  title,
  lead,
  children,
  full = false,
  align = "left",
  className,
  id,
}: Props) {
  return (
    <section
      id={id}
      data-section
      data-section-num={number}
      data-section-title={title}
      className={`scroll-section scroll-section--${align}${
        full ? " scroll-section--full" : ""
      } ${className ?? ""}`}
    >
      <header className="scroll-section__header" data-reveal>
        <div className="scroll-section__num" data-scramble>
          {number}
        </div>
        <h2 className="scroll-section__title">{title}</h2>
        {lead && <p className="scroll-section__lead">{lead}</p>}
      </header>
      <div className="scroll-section__body">{children}</div>
    </section>
  );
}