import { getRealm, type RealmConfig } from "@/components/realm/realmMap";
import { getStationByRoute } from "@/data/stations";

export function realmForRoute(route: string): {
  realm?: RealmConfig;
  theme?: { skyTop: string; skyBottom: string; horizon: string; accent: string };
} {
  const station = getStationByRoute(route);
  if (!station) return {};
  return {
    realm: getRealm(station.id),
    theme: station.theme,
  };
}