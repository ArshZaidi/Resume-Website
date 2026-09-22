import Preloader from "@/components/ui/Preloader";
import TrainJourney from "@/components/journey/TrainJourney";
import SiteFooter from "@/components/ui/SiteFooter";

import { portfolio } from "@/data/portfolio";
import { stations } from "@/data/stations";

export default function Page() {
  return (
    <>
      <Preloader />

      <main>
        <TrainJourney stations={stations} portfolio={portfolio} />
        <SiteFooter portfolio={portfolio} />
      </main>
    </>
  );
}