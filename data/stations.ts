export type LandmarkKind =
  | "terminal"
  | "city"
  | "campus"
  | "lab"
  | "factory"
  | "metropolis"
  | "mountains"
  | "archive"
  | "sunrise";

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
  /** Hero + destination use a different layout. */
  variant: "hero" | "standard" | "destination";
}

export const stations: Station[] = [
  {
    id: "departure",
    number: "00",
    title: "Departure",
    subtitle: "Where this begins",
    progress: 0,
    landmark: "terminal",
    variant: "hero",
    theme: {
      skyTop: "#07080B",
      skyBottom: "#10131A",
      horizon: "#1B2029",
      accent: "#D64535",
    },
  },
  {
    id: "about",
    number: "01",
    title: "About",
    subtitle: "Who is on board",
    progress: 0.115,
    landmark: "city",
    variant: "standard",
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
    progress: 0.235,
    landmark: "campus",
    variant: "standard",
    theme: {
      skyTop: "#08090E",
      skyBottom: "#131626",
      horizon: "#1D2340",
      accent: "#C9A227",
    },
  },
  {
    id: "skills",
    number: "03",
    title: "Skills",
    subtitle: "The working toolkit",
    progress: 0.36,
    landmark: "lab",
    variant: "standard",
    theme: {
      skyTop: "#06090C",
      skyBottom: "#0F1A1E",
      horizon: "#16262C",
      accent: "#4FA3A5",
    },
  },
  {
    id: "projects",
    number: "04",
    title: "Projects",
    subtitle: "Things that ship",
    progress: 0.5,
    landmark: "factory",
    variant: "standard",
    theme: {
      skyTop: "#0B0708",
      skyBottom: "#1A1214",
      horizon: "#2A1A1C",
      accent: "#D64535",
    },
  },
  {
    id: "experience",
    number: "05",
    title: "Experience",
    subtitle: "Where the work happened",
    progress: 0.635,
    landmark: "metropolis",
    variant: "standard",
    theme: {
      skyTop: "#090909",
      skyBottom: "#171514",
      horizon: "#26211D",
      accent: "#C98A3E",
    },
  },
  {
    id: "achievements",
    number: "06",
    title: "Achievements",
    subtitle: "Marks along the route",
    progress: 0.755,
    landmark: "mountains",
    variant: "standard",
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
    progress: 0.87,
    landmark: "archive",
    variant: "standard",
    theme: {
      skyTop: "#08090B",
      skyBottom: "#14161A",
      horizon: "#212429",
      accent: "#9BA3AC",
    },
  },
  {
    id: "destination",
    number: "08",
    title: "Destination",
    subtitle: "Let's build something",
    progress: 1,
    landmark: "sunrise",
    variant: "destination",
    theme: {
      skyTop: "#0E0D12",
      skyBottom: "#2A211C",
      horizon: "#4A382A",
      accent: "#F0C27B",
    },
  },
];

export const STATION_IDS = stations.map((s) => s.id);