import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Station } from "@/data/stations";
import PersistentNav from "@/components/navigation/PersistentNav";
import TechnicalIdentity from "@/components/technical/TechnicalIdentity";

interface Props {
  station: Station;
  children: React.ReactNode;
  /** Optional subtitle shown under the station title in the header. */
  kicker?: string;
}

export default function DetailShell({ station, kicker, children }: Props) {
  return (
    <div className="detail" style={{
      ["--sky-top" as string]: station.theme.skyTop,
      ["--sky-bottom" as string]: station.theme.skyBottom,
      ["--horizon" as string]: station.theme.horizon,
      ["--accent" as string]: station.theme.accent,
    }}>
      <PersistentNav station={station} />

      <header className="detail__hero">
        <div className="detail__hero-bg" aria-hidden="true" />
        <div className="detail__hero-inner">
          <Link href="/#station" className="detail__back" data-cursor="BOARD">
            <ArrowLeft size={12} strokeWidth={1.6} />
            <span>Back to journey</span>
          </Link>

          <div className="detail__eyebrow">
            <span>Station {station.number}</span>
            <span className="detail__eyebrow-sep" />
            <span>{kicker ?? station.subtitle}</span>
          </div>

          <h1 className="detail__title">{station.title}</h1>
        </div>
      </header>

      <main className="detail__body">{children}</main>

      <footer className="detail__footer">
        <div className="detail__footer-title">Technical identity</div>
        <TechnicalIdentity variant="grid" />

        <div className="detail__footer-nav">
          <Link href="/" className="btn">
            Return to journey
          </Link>
        </div>
      </footer>
    </div>
  );
}