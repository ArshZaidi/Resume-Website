import type { ComponentType } from "react";
import type { StationPanelProps } from "./types";

import HeroStation from "./HeroStation";
import AboutStation from "./AboutStation";
import EducationStation from "./EducationStation";
import SkillsStation from "./SkillsStation";
import ProjectsStation from "./ProjectsStation";
import ExperienceStation from "./ExperienceStation";
import AchievementsStation from "./AchievementsStation";
import CertificationsStation from "./CertificationsStation";
import ContactStation from "./ContactStation";

export const stationPanels: Record<string, ComponentType<StationPanelProps>> = {
  departure: HeroStation,
  about: AboutStation,
  education: EducationStation,
  skills: SkillsStation,
  projects: ProjectsStation,
  experience: ExperienceStation,
  achievements: AchievementsStation,
  certifications: CertificationsStation,
  destination: ContactStation,
};