import Link from "next/link";
import PersistentNav from "@/components/navigation/PersistentNav";
import TechnicalIdentity from "@/components/technical/TechnicalIdentity";
import MagneticScroll from "@/components/scroll/MagneticScroll";
import ScrollProgress from "@/components/scroll/ScrollProgress";
import RealmLayer from "@/components/realm/RealmLayer";
import BackToJourney from "@/components/detail/BackToJourney";
import { getRealm } from "@/components/realm/realmMap";
import type { Station } from "@/data/stations";

interface Props {
  station: Station;
  children: React.ReactNode;
  kicker?: string;
}

export default function DetailShell({ station, kicker, children }: Props) {
  const realm = getRealm(station.id);

  return (
    <div className="detail" data-station={station.id}>
      {realm && <RealmLayer realm={realm} theme={station.theme} />}

      <MagneticScroll className="detail__scroll">
        <PersistentNav station={station} />

        <header className="detail__hero">
          <div className="detail__hero-inner">
            <BackToJourney />

            <div className="detail__eyebrow">
              <span>Station {station.number}</span>
              <span className="detail__eyebrow-sep" />
              <span>{kicker ?? station.subtitle}</span>
            </div>

            <h1 className="detail__title">{station.title}</h1>

            {realm && <div className="detail__realm">{realm.mood}</div>}
          </div>
        </header>

        <main className="detail__body">{children}</main>

        <footer className="detail__footer">
          <div className="detail__footer-title">Technical identity</div>
          <TechnicalIdentity variant="grid" />

          <div className="detail__footer-nav">
            <Link href="/" className="btn" data-cursor="BOARD">
              Return to journey
            </Link>
          </div>
        </footer>
      </MagneticScroll>

      <ScrollProgress />
    </div>
  );
}