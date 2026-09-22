import type { ComponentType } from "react";
import type { StationPanelProps } from "./types";

import AboutStation from "./AboutStation";
import EducationStation from "./EducationStation";
import ExperienceStation from "./ExperienceStation";
import ProjectsStation from "./ProjectsStation";
import SkillsStation from "./SkillsStation";
import AchievementsStation from "./AchievementsStation";
import CertificationsStation from "./CertificationsStation";

export const stationPanels: Record<string, ComponentType<StationPanelProps>> = {
  about: AboutStation,
  education: EducationStation,
  experience: ExperienceStation,
  projects: ProjectsStation,
  skills: SkillsStation,
  achievements: AchievementsStation,
  certifications: CertificationsStation,
};