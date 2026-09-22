"use client";

import { ArrowLeft } from "lucide-react";
import { useRealmTransition } from "@/components/journey/TransitionProvider";

interface Props {
  className?: string;
  label?: string;
}

export default function BackToJourney({
  className,
  label = "Back to journey",
}: Props) {
  const navigate = useRealmTransition();

  return (
    <button
      type="button"
      className={`detail__back ${className ?? ""}`}
      onClick={() =>
        navigate({
          href: "/",
          number: "00",
          title: "Departure",
          subtitle: "Returning to the railway",
        })
      }
      data-cursor="BOARD"
    >
      <ArrowLeft size={12} strokeWidth={1.6} />
      <span>{label}</span>
    </button>
  );
}