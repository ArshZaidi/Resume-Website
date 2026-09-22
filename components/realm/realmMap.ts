export type ParticleKind =
  | "none"
  | "dust"
  | "petals"
  | "pollen"
  | "leaves"
  | "rain"
  | "spark"
  | "snow";

export interface RealmConfig {
  id: string;
  season:
    | "dawn"
    | "spring"
    | "summer"
    | "autumn"
    | "rain"
    | "golden"
    | "mountain"
    | "winter"
    | "night";
  particle: ParticleKind;
  mood: string;
}

export const realmMap: Record<string, RealmConfig> = {
  departure: {
    id: "departure",
    season: "dawn",
    particle: "dust",
    mood: "Before the journey",
  },
  about: {
    id: "about",
    season: "spring",
    particle: "petals",
    mood: "Open country, clear air",
  },
  education: {
    id: "education",
    season: "summer",
    particle: "pollen",
    mood: "Long afternoons, campus light",
  },
  skills: {
    id: "skills",
    season: "autumn",
    particle: "leaves",
    mood: "Industrial workshop, cooling air",
  },
  projects: {
    id: "projects",
    season: "rain",
    particle: "rain",
    mood: "Futuristic city, wet streets, neon reflections",
  },
  experience: {
    id: "experience",
    season: "golden",
    particle: "spark",
    mood: "Golden hour across the metropolis",
  },
  achievements: {
    id: "achievements",
    season: "mountain",
    particle: "none",
    mood: "High altitude, thin clear air",
  },
  certifications: {
    id: "certifications",
    season: "winter",
    particle: "snow",
    mood: "The archive — cold light, quiet paper",
  },
  contact: {
    id: "contact",
    season: "night",
    particle: "spark",
    mood: "The last terminal, lights on",
  },
};

export function getRealm(id: string): RealmConfig | undefined {
  return realmMap[id];
}