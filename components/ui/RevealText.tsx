import { cn } from "@/lib/utils";

interface Props {
  text: string;
  active?: boolean;
  className?: string;
  delay?: number;
  step?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function RevealText({
  text,
  active = true,
  className,
  delay = 0,
  step = 42,
  as: Tag = "span",
}: Props) {
  const words = text.split(" ");

  return (
    <Tag className={cn("reveal", active && "is-active", className)}>
      {words.map((word, i) => (
        <span className="reveal__word" key={`${word}-${i}`}>
          <span
            className="reveal__inner"
            style={{ transitionDelay: `${delay + i * step}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}