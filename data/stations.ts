export type LandmarkKind =
  | "city"
  | "campus"
  | "lab"
  | "factory"
  | "metropolis"
  | "mountains"
  | "archive";

export interface StationTheme {
  skyTop: string;
  skyBottom: string;
  horizon: string;
  accent: string;
}

export interface Station {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  /** Normalised scroll progress at which the train is fully stopped. */
  progress: number;
  landmark: LandmarkKind;
  theme: StationTheme;
  variant: "hero" | "standard" | "destination";
  /** Route this station boards into. */
  route: string;
}

/** Distance between stations in world space (px). */
export const WORLD_SPACING = 1900;

/* ------------------------------------------------------------------ */
/* THE SEVEN TRACK STATIONS                                            */
/* ------------------------------------------------------------------ */

export const stations: Station[] = [
  {
    id: "about",
    number: "01",
    title: "About",
    subtitle: "Who is on board",
    progress: 0.08,
    landmark: "city",
    variant: "standard",
    route: "/about",
    theme: {
      skyTop: "#0A0A0C",
      skyBottom: "#16161A",
      horizon: "#242028",
      accent: "#D98E4A",
    },
  },
  {
    id: "education",
    number: "02",
    title: "Education",
    subtitle: "Formal training",
    progress: 0.21,
    landmark: "campus",
    variant: "standard",
    route: "/education",
    theme: {
      skyTop: "#08090E",
      skyBottom: "#131626",
      horizon: "#1D2340",
      accent: "#C9A227",
    },
  },
  {
    id: "experience",
    number: "03",
    title: "Experience",
    subtitle: "Where the work happened",
    progress: 0.34,
    landmark: "metropolis",
    variant: "standard",
    route: "/experience",
    theme: {
      skyTop: "#090909",
      skyBottom: "#171514",
      horizon: "#26211D",
      accent: "#C98A3E",
    },
  },
  {
    id: "projects",
    number: "04",
    title: "Projects",
    subtitle: "Things that ship",
    progress: 0.47,
    landmark: "factory",
    variant: "standard",
    route: "/projects",
    theme: {
      skyTop: "#0B0708",
      skyBottom: "#1A1214",
      horizon: "#2A1A1C",
      accent: "#D64535",
    },
  },
  {
    id: "skills",
    number: "05",
    title: "Skills",
    subtitle: "The working toolkit",
    progress: 0.60,
    landmark: "lab",
    variant: "standard",
    route: "/skills",
    theme: {
      skyTop: "#06090C",
      skyBottom: "#0F1A1E",
      horizon: "#16262C",
      accent: "#4FA3A5",
    },
  },
  {
    id: "achievements",
    number: "06",
    title: "Achievements",
    subtitle: "Marks along the route",
    progress: 0.73,
    landmark: "mountains",
    variant: "standard",
    route: "/achievements",
    theme: {
      skyTop: "#0A0C10",
      skyBottom: "#182030",
      horizon: "#2A3448",
      accent: "#D9B26A",
    },
  },
  {
    id: "certifications",
    number: "07",
    title: "Certifications",
    subtitle: "The archive",
    progress: 0.86,
    landmark: "archive",
    variant: "standard",
    route: "/certifications",
    theme: {
      skyTop: "#08090B",
      skyBottom: "#14161A",
      horizon: "#212429",
      accent: "#9BA3AC",
    },
  },
];

export const STATION_IDS = stations.map((s) => s.id);

/* ------------------------------------------------------------------ */
/* OFF-TRACK ROUTE                                                     */
/*                                                                     */
/* /contact exists as a page but is not part of the train roadmap.     */
/* It is reached from the intro/outro overlays and from every detail   */
/* page footer. It carries a Station-shaped object so DetailShell can  */
/* render it with the same primitives.                                 */
/* ------------------------------------------------------------------ */

export const contactStation: Station = {
  id: "contact",
  number: "—",
  title: "Destination",
  subtitle: "Let's build something",
  progress: 1,
  landmark: "city",
  variant: "destination",
  route: "/contact",
  theme: {
    skyTop: "#0E0D12",
    skyBottom: "#2A211C",
    horizon: "#4A382A",
    accent: "#F0C27B",
  },
};

/** Full lookup including off-track routes. */
const allStations: Station[] = [...stations, contactStation];

export function getStationByRoute(route: string): Station | undefined {
  return allStations.find((s) => s.route === route);
}

export function getTrackStation(id: string): Station | undefined {
  return stations.find((s) => s.id === id);
}